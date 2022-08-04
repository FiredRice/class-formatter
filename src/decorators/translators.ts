import { executeTransform } from '../translator';
import { isArray, isBoolean, isNaN, isNumber, isObject, isString } from '../utils';

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
    if (ClassType) {
        const executeArr = isArr ? target : defaultValue || [];
        if (executeArr.length) {
            return executeArr.map(item => executeTransform(ClassType, item, transOptions));
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
    const isObj = isObject(target);
    if (ClassType) {
        return executeTransform(ClassType, isObj ? target : defaultValue || {}, transOptions) || defaultValue || {};
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
    return callback({ ...values }, { ...shareData }, ...args);
}