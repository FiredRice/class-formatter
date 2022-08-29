import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import { transtargetMap } from '../config';
import { Commands, FormatOptions, Type } from '../types';

/**
 * 数字校验
 * @param target 被校验值
 * @param options 被校验信息
 * @param defaultValue 默认值
 * @param autoTrans 是否自动转换为数字
 * @returns 转换结果
 */
export function transNumber(target, options: any): number {
    const { defaultValue, autoTrans } = options;
    if (!isNumber(target)) {
        if (autoTrans && isString(target)) {
            const result = parseFloat(target);
            return isNaN(result) ? defaultValue : result;
        } else {
            return isNumber(defaultValue) ? defaultValue : 0;
        }
    } else {
        return target;
    }
}

/**
 * 字符串校验
 * @param target 被校验值
 * @param options 被校验信息
 * @param defaultValue 默认值
 * @param autoTrans 是否自动转换为字符串
 * @returns 转换结果
 */
export function transString(target, options: any): string {
    const { defaultValue, autoTrans } = options;
    if (!isString(target)) {
        if (autoTrans && isNumber(target) && !isNaN(target)) {
            return `${target}`;
        } else {
            return isString(defaultValue) ? defaultValue : '';
        }
    } else {
        return target;
    }
}

/**
 * 布尔校验
 * @param target 被校验值
 * @param defaultValue 默认值
 * @returns 转换结果
 */
export function transBoolean(target, defaultValue: boolean): boolean {
    if (!isBoolean(target)) {
        return defaultValue;
    } else {
        return target;
    }
}

/**
 * 数组校验
 * @param target 被校验值
 * @param options 被校验信息
 * @param defaultValue 默认值
 * @param ClassType 对象类
 * @returns 转换结果
 */
export function transArray(target, options, transOptions?: any): any {
    const { defaultValue, ClassType } = options;
    const isArr = isArray(target);
    if (ClassType && !transtargetMap.has(target)) {
        const executeArr = isArr ? target : defaultValue || [];
        if (executeArr.length) {
            if (isArr) {
                transtargetMap.set(target, true);
            }
            return executeArr.map(item => subTransform(ClassType, item, transOptions));
        }
        return defaultValue || [];
    }
    if (isArr) {
        return target;
    }
    return defaultValue || [];
}

/**
 * 对象校验
 * @param target 被校验值
 * @param options 被校验信息
 * @param defaultValue 默认值
 * @param ClassType 对象类
 * @returns 转换结果
 */
export function transObject(target, options, transOptions?: any): any {
    const { defaultValue, ClassType } = options;
    const isObj = isObject(target) && !isArray(target);
    if (ClassType && !transtargetMap.has(target)) {
        if (isObj) {
            transtargetMap.set(target, true);
        }
        return subTransform(ClassType, isObj ? target : defaultValue || {}, transOptions) || defaultValue || {};
    }
    if (isObj) {
        return target;
    }
    return defaultValue || {};
}

/**
 * 自定义校验
 * @param values 待格式化的源数据
 * @param callback 自定义回调
 * @param args 回调参数
 * @returns 转换结果
 */
export function transCustom(values, shareData, callback, args): any {
    return callback(values, shareData, ...args);
}


/**
 * 转换函数
 * @param ClassType 模板类型
 * @param values 源数据
 * @param options 配置项
 * @param deep 转换深度
 * @returns 转换结果
 */
export function subTransform(ClassType: Type, values, options: FormatOptions) {
    const { mergeSource = false, key: modelKey, shareValue } = options;

    const model: any = new ClassType();

    // 结果集
    const result: any = {};

    // 转换指令集
    const executePlan = model.__proto__;

    // 模板字段集合
    const templateKeysMap: any = {};
    // 模板默认值
    // 记录模板默认值，防止与原型上的指令冲突
    const initResults: any = {};

    Object.keys(model).forEach(key => {
        templateKeysMap[key] = true;
        initResults[key] = model[key];
    });


    // 对源数据进行格式化
    for (const key in values) {
        // 当前属性值
        const element = values[key];
        // 执行命令数组
        const execute: Commands = executePlan[key] || [];
        // 过滤出本次格式化需要执行的指令
        const filterExecutes = execute.filter(item => !item.modelKeys.length || (modelKey != null && item.modelKeys.includes(modelKey)));
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
                        result[key] = value(result[key] === undefined ? element : result[key], values, shareValue);
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
        const filterExecutes = execute.filter(item => !item.modelKeys.length || (modelKey != null && item.modelKeys.includes(modelKey)));
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
                        result[key] = value(result[key], values, shareValue);
                        break;
                    case 'custom':
                        result[key] = transCustom(values, shareValue, value.callback, value.args);
                        break;
                    case 'rename':
                        result[value] = result[key];
                        delete result[key];
                        break;
                    default:
                        result[key] = initResults[key];
                        break;
                }
            }
        } else {
            // 不存在装饰器的属性取默认值
            result[key] = initResults[key];
        }
    }

    return result;
}
