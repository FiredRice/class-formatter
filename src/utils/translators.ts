import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import _isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import isSymbol from 'lodash/isSymbol';
import isRegExp from 'lodash/isRegExp';
import isNaN from 'lodash/isNaN';
import { classCommandMap, __CLASS_FORMATTER_LEVEL__ } from '../config';
import { Commands, FormatOptions, ModelKey } from '../types';
import { getOwnKeys } from './common';

function isNumber(value?: any): value is number {
    return _isNumber(value) && !isNaN(value);
}

/**
 * 数字校验
 * @param target 被校验值
 * @param options 被校验信息
 * @param - defaultValue 默认值
 * @param - autoTrans 是否自动转换为数字
 * @param modalDefault 模板默认值
 * @returns 转换结果
 */
function transNumber(target, options: any, modalDefault): number {
    if (isNumber(target)) return target;
    const { defaultValue, autoTrans } = options;
    const _defaultValue = modalDefault ?? defaultValue;
    const isDefaultNumber = isNumber(_defaultValue);
    const _defaultResult = isDefaultNumber ? _defaultValue : 0;
    if (autoTrans && isString(target)) {
        const result = Number(target);
        return isNaN(result) ? _defaultResult : result;
    }
    return _defaultResult;
}

/**
 * 字符串校验
 * @param target 被校验值
 * @param options 被校验信息
 * @param - defaultValue 默认值
 * @param - autoTrans 是否自动转换为字符串
 * @param modalDefault 模板默认值
 * @returns 转换结果
 */
function transString(target, options: any, modalDefault): string {
    if (isString(target)) return target;
    const { defaultValue, autoTrans } = options;
    if (autoTrans && isNumber(target)) return String(target);
    const _defaultValue = modalDefault ?? defaultValue;
    return isString(_defaultValue) ? _defaultValue : '';
}

/**
 * 布尔校验
 * @param target 被校验值
 * @param defaultValue 默认值
 * @param modalDefault 模板默认值
 * @returns 转换结果
 */
function transBoolean(target, defaultValue: boolean, modalDefault): boolean {
    if (isBoolean(target)) return target;
    const _defaultValue = modalDefault ?? defaultValue;
    return isBoolean(_defaultValue) ? _defaultValue : false;
}

/**
 * Symbol校验
 * @param target 被校验值
 * @param defaultValue 默认值
 * @param modalDefault 模板默认值
 * @returns 转换结果
 */
function transSymbol(target, defaultValue: symbol, modalDefault): symbol {
    if (isSymbol(target)) return target;
    const _defaultValue = modalDefault ?? defaultValue;
    return isSymbol(_defaultValue) ? _defaultValue : Symbol();
}

/**
 * 正则校验
 * @param target 被校验值
 * @param defaultValue 默认值
 * @param modalDefault 模板默认值
 * @returns 转换结果
 */
function transRegExp(target, defaultValue, modalDefault): RegExp {
    const _defaultValue = modalDefault ?? defaultValue;
    if (isRegExp(target)) return target;
    if (isString(target)) return new RegExp(target);
    if (isString(_defaultValue)) return new RegExp(_defaultValue);
    if (isRegExp(_defaultValue)) return _defaultValue;
    return new RegExp('');
}

/**
 * 数组校验
 * @param target 被校验值
 * @param options 被校验信息
 * @param - defaultValue 默认值
 * @param - ClassType 对象类
 * @param transTargetMap 引用对象集合
 * @param modalDefault 模板默认值
 * @param transOptions 转换配置
 * @returns 转换结果
 */
function transArray(target, options, transTargetMap, modalDefault, transOptions?: any): any {
    const { defaultValue, ClassType, map } = options;
    const { deep = 50 } = transOptions || {};
    const isArr = isArray(target);
    const _defaultValue = modalDefault ?? defaultValue;
    const _default = isArray(_defaultValue) ? (_defaultValue || []) : [];
    const currentLevel = transTargetMap.get(__CLASS_FORMATTER_LEVEL__) || 1;
    // 超过循环深度
    // 直接返回源数据
    if (currentLevel > deep) {
        if (isArr) return map ? target.map(map) : target;
        return _default;
    }
    // 若指定转换类型，则进行转换
    if (ClassType && !transTargetMap.has(target)) {
        const executeArr = isArr ? target : _default;
        const { length } = executeArr;
        if (length) {
            isArr && transTargetMap.set(target, true);
            transTargetMap.set(__CLASS_FORMATTER_LEVEL__, currentLevel + 1);
            const instance: any = new ClassType();
            const result: any[] = [];
            for (let i = 0; i < length; i++) {
                let element = subTransform(instance, executeArr[i], transTargetMap, transOptions);
                map && (element = map(element, i, executeArr));
                result.push(element);
            }
            transTargetMap.set(__CLASS_FORMATTER_LEVEL__, currentLevel);
            return result;
        }
        return executeArr;
    }
    // 非自循环时返回源数据
    if (isArr) return map ? target.map(map) : target;
    return _default;
}

/**
 * 对象校验
 * @param target 被校验值
 * @param options 被校验信息
 * @param - defaultValue 默认值
 * @param - ClassType 对象类
 * @param transTargetMap 引用对象集合
 * @param modalDefault 模板默认值
 * @param transOptions 转换配置
 * @returns 转换结果
 */
function transObject(target, options, transTargetMap, modalDefault, transOptions?: any): any {
    const { defaultValue, ClassType } = options;
    const { deep = 50 } = transOptions || {};
    const isObj = isObject(target) && !isArray(target);
    const currentLevel = transTargetMap.get(__CLASS_FORMATTER_LEVEL__) || 1;
    if (currentLevel > deep) {
        if (isObj) return target;
        return {};
    }
    const _defaultValue = modalDefault ?? defaultValue;
    const _default = isObject(_defaultValue) ? (_defaultValue || {}) : {};
    if (ClassType && !transTargetMap.has(target)) {
        isObj && transTargetMap.set(target, true);
        transTargetMap.set(__CLASS_FORMATTER_LEVEL__, currentLevel + 1);
        const instance: any = new ClassType();
        const result = subTransform(instance, isObj ? target : _default, transTargetMap, transOptions) || _default;
        transTargetMap.set(__CLASS_FORMATTER_LEVEL__, currentLevel);
        return result;
    }
    if (isObj) return target;
    return _default;
}

/**
 * 自定义校验
 * @param values 待格式化的源数据
 * @param callback 自定义回调
 * @param args 回调参数
 * @returns 转换结果
 */
function transCustom(values, shareData, callback, args): any {
    return callback(values, shareData, ...args);
}

/**
 * 过滤指令
 */
function getEffectCommands(commands: Commands, modelKey?: ModelKey) {
    const result: Commands = [];
    const { length } = commands;
    if (length) {
        for (let i = 0; i < length; i++) {
            const element = commands[i];
            const modelKeys = element.modelKeys;
            if (!modelKeys.length || (modelKey != null && modelKeys.includes(modelKey))) {
                result.push(element);
            }
        }
        // 指令逆序执行，因此排序时应降序
        (result.length > 1) && result.sort((a, b) => b.priority - a.priority);
    }
    return result;
}

/**
 * 转换函数
 * @param ClassType 模板类型
 * @param values 源数据
 * @param transTargetMap 引用对象集合
 * @param options 配置项
 * @returns 转换结果
 */
export function subTransform(model, values, transTargetMap, options: FormatOptions) {
    const { key: modelKey, shareValue, mergeSource = false } = options || {};

    // 结果集
    const result: any = {};

    // 转换指令集
    const executePlan = classCommandMap.get(Object.getPrototypeOf(model)) || {};

    // 执行指令
    const commandKeys = getOwnKeys(executePlan);

    for (let i = commandKeys.length - 1; i >= 0; i--) {
        const key = commandKeys[i];
        // 当前属性值
        const element = values[key];
        // 过滤出本次格式化需要执行的指令
        const filterExecutes = getEffectCommands(executePlan[key] || [], modelKey);
        const { length } = filterExecutes;
        if (length) {
            // 模板默认值
            const modalDefault = Object.prototype.hasOwnProperty.call(model, key) ? model[key] : undefined;
            for (let i = filterExecutes.length - 1; i >= 0; i--) {
                const { type, value } = filterExecutes[i];
                switch (type) {
                    case 'number':
                        result[key] = transNumber(element, value, modalDefault);
                        break;
                    case 'string':
                        result[key] = transString(element, value, modalDefault);
                        break;
                    case 'boolean':
                        result[key] = transBoolean(element, value, modalDefault);
                        break;
                    case 'object':
                        result[key] = transObject(element, value, transTargetMap, modalDefault, options);
                        break;
                    case 'array':
                        result[key] = transArray(element, value, transTargetMap, modalDefault, options);
                        break;
                    case 'symbol':
                        result[key] = transSymbol(element, value, modalDefault);
                        break;
                    case 'reg_exp':
                        result[key] = transRegExp(element, value, modalDefault);
                        break;
                    case 'extend_method':
                        Object.defineProperty(result, key, value);
                        break;
                    case 'keep':
                        result[key] = element;
                        break;
                    case 'remove':
                        Reflect.deleteProperty(result, key);
                        break;
                    case 'format':
                        result[key] = value(result[key] ?? element, values, shareValue);
                        break;
                    case 'custom':
                        result[key] = transCustom(values, shareValue, value.callback, value.args);
                        break;
                    case 'rename':
                        result[value] = result[key];
                        Reflect.deleteProperty(result, key);
                        break;
                    default:
                        break;
                }
            }
        }
    }

    if (mergeSource) {
        return {
            ...values,
            ...result
        };
    }
    return result;
}
