import { Commands, FormatOptions } from '../types';
import { transArray, transBoolean, transCustom, transNumber, transObject, transString } from './translators';

/**
 * 格式化类装饰器
 * - 被装饰类可通过 executeTransform 对数据进行格式化
 */
export function Formatter(constructor: Function) {
    const cacheKey = Symbol.for('formatter_cacheValue');
    const resultKey = Symbol.for('formatter_resultValue');

    // 保存需要格式化的值
    constructor.prototype[Symbol.for('formatter_setValues')] = function (value) {
        this.__proto__[cacheKey] = value;
        this.__proto__[resultKey] = {};
    };

    // 获取格式化结果
    constructor.prototype[Symbol.for('formatter_getFormatResult')] = function () {
        return this.__proto__[resultKey];
    };

    // 数据格式化
    constructor.prototype[Symbol.for('formatter_toFormat')] = function (options: FormatOptions) {
        const { mergeSource = false, key: modalKey, shareValue } = options;

        const executePlan = this.__proto__;

        // 模板字段集合
        const templateKeysMap: any = {};
        Object.keys(this).forEach(key => {
            templateKeysMap[key] = true;
        });

        // 源属性值
        const values = executePlan[cacheKey];
        // 结果集
        const result = executePlan[resultKey];

        // 对源数据进行格式化
        for (const key in values) {
            // 当前属性值
            const element = values[key];
            // 执行命令数组
            const execute: Commands = executePlan[key] || [];
            // 过滤出本次格式化需要执行的指令
            const filterExecutes = execute.filter(item => !item.modalKeys.length || (modalKey != null && item.modalKeys.includes(modalKey)));
            if (!!filterExecutes.length) {
                // 按命令优先级排序
                filterExecutes.sort((a, b) => a.priority - b.priority);
                for (const item of filterExecutes) {
                    const { type, value } = item;
                    // 对匹配上 key 的字段格式化
                    switch (type) {
                        case 'number':
                            result[key] = transNumber(element, value);
                            break;
                        case 'string':
                            result[key] = transString(element, value);
                            break;
                        case 'boolean':
                            result[key] = transBoolean(element, value);
                            break;
                        case 'object':
                            result[key] = transObject(element, value, options);
                            break;
                        case 'array':
                            result[key] = transArray(element, value, options);
                            break;
                        case 'remove':
                            break;
                        case 'format':
                            result[key] = value(result[key] === undefined ? element : result[key], { ...values }, { ...shareValue });
                            break;
                        case 'custom':
                            result[key] = transCustom(values, shareValue, value.callback, value.args);
                            break;
                        case 'rename':
                            result[value] = result[key];
                            delete result[key];
                            delete templateKeysMap[value];
                            break;
                        default:
                            if (mergeSource) {
                                result[key] = element;
                            }
                            break;
                    }
                }
            } else if (templateKeysMap[key] || !templateKeysMap[key] && mergeSource) {
                result[key] = element;
            }
            delete templateKeysMap[key];
        }

        // 对未在源数据中出现，且在模板中存在的属性进行格式化
        for (const key in templateKeysMap) {
            const execute: Commands = executePlan[key] || [];
            // 过滤出本次格式化需要执行的指令
            const filterExecutes = execute.filter(item => !item.modalKeys.length || (modalKey != null && item.modalKeys.includes(modalKey)));
            // 存在装饰器的属性执行格式化
            if (!!filterExecutes.length) {
                // 按命令优先级排序
                filterExecutes.sort((a, b) => a.priority - b.priority);
                for (const item of filterExecutes) {
                    const { type, value } = item;
                    // 对匹配到 key 的属性格式化
                    switch (type) {
                        case 'number':
                            result[key] = transNumber(result[key], value);
                            break;
                        case 'string':
                            result[key] = transString(result[key], value);
                            break;
                        case 'boolean':
                            result[key] = transBoolean(result[key], value);
                            break;
                        case 'array':
                            result[key] = transArray(result[key], value, options);
                            break;
                        case 'object':
                            result[key] = transObject(result[key], value, options);
                            break;
                        case 'remove':
                            delete result[key];
                            break;
                        case 'format':
                            result[key] = value(result[key], { ...values }, { ...shareValue });
                            break;
                        case 'custom':
                            result[key] = transCustom(values, shareValue, value.callback, value.args);
                            break;
                        case 'rename':
                            result[value] = result[key];
                            delete result[key];
                            break;
                        default:
                            result[key] = undefined;
                            break;
                    }
                }
            } else {
                // 不存在装饰器的属性默认为 undefined
                result[key] = undefined;
            }
        }
    };
};
