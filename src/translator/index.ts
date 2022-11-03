import { subTransform } from '../utils';
import { Type, MergeOptions, NotMergeOptions } from '../types';
import { __CLASS_FORMATTER_LEVEL__ } from '../config';

/**
 * 执行转换对象
 * @param ClassType 目标 class 类型
 * @param values 被转换数据
 * @param options 额外配置项
 * @returns 转换结果
 */
export function executeTransform<T, K extends object>(ClassType: Type<T>, values: K, options?: Omit<NotMergeOptions, 'map'>): Required<T>;
export function executeTransform<T, K extends object>(ClassType: Type<T>, values: K, options?: Omit<MergeOptions, 'map'>): K & Required<T>;
export function executeTransform<T, K extends object>(ClassType: Type<T>, values: K, options = {}) {
    const transTargetMap = new Map();
    transTargetMap.set(values, true);
    transTargetMap.set(__CLASS_FORMATTER_LEVEL__, 1);
    const instance: any = new ClassType();
    const result = subTransform(instance, values, transTargetMap, options);
    transTargetMap.clear();
    return result;
}

/**
 * 执行转换数组
 * @param ClassType 目标 class 类型
 * @param values 被转换数据
 * @param options 额外配置项
 * @returns 转换结果
 */
export function executeTransArray<T, K extends object>(ClassType: Type<T>, values: K[], options?: NotMergeOptions<Partial<T>>): Required<T>[];
export function executeTransArray<T, K extends object>(ClassType: Type<T>, values: K[], options?: MergeOptions<Partial<T>>): (K & Required<T>)[];
export function executeTransArray<T, K extends object>(ClassType: Type<T>, values: K[], options?: any) {
    const { map, ...otherOptions } = options || {};
    const { length } = values;
    if (!length) {
        return values;
    }
    const transTargetMap = new Map();
    transTargetMap.set(values, true);
    transTargetMap.set(__CLASS_FORMATTER_LEVEL__, 1);
    const instance: any = new ClassType();
    const result: any[] = [];
    for (let i = 0; i < length; i++) {
        const element = values[i];
        transTargetMap.set(element, true);
        let item = subTransform(instance, element, transTargetMap, otherOptions);
        map && (item = map(item, i, values));
        result.push(item);
    }
    transTargetMap.clear();
    return result;
}