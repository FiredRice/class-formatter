import { subTransform } from '../utils';
import { Type, MergeOptions, NotMergeOptions } from '../types';

/**
 * 执行转换
 * @param ClassType 目标 class 类型
 * @param values 被转换数据
 * @param options 额外配置项
 * @param - key 格式化匹配键
 * @param - mergeSource 是否将源数据多余的字段合并
 * @returns 转换结果
 */
export function executeTransform<T = any, K = any>(ClassType: Type<T>, values: K, options?: NotMergeOptions): Required<T>;
export function executeTransform<T = any, K = any>(ClassType: Type<T>, values: K, options?: MergeOptions): K & Required<T>;
export function executeTransform<T = any, K = any>(ClassType: Type<T>, values: K, options = {}) {
    const transTargetMap = new Map();
    transTargetMap.set(values, true);
    const instance: any = new ClassType();
    const result = subTransform(instance, values, transTargetMap, options);
    transTargetMap.clear();
    return result;
}