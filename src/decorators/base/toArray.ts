import { HIGH_PRORITY } from '../../config';
import { ArrayConfig, Type } from '../../types';
import { commandsRegist, useModelKeys } from '../../utils';

/**
 * 转换为数组，默认 []
 * @param value 配置项
 */
export function toArray<T = any>(value?: ArrayConfig<T> | Type<T>): PropertyDecorator {
    return function (target, propertyKey) {
        let defaultValue: any[] = [];
        let ClassType;
        let map;
        let keys;
        if (typeof value === 'function') {
            ClassType = value;
        } else if (value) {
            defaultValue = value.defaultValue || [];
            ClassType = value.ClassType;
            keys = value.keys;
            map = value.map;
        }
        commandsRegist(target, propertyKey, {
            type: 'array',
            value: {
                defaultValue,
                ClassType,
                map
            },
            modelKeys: useModelKeys(keys),
            priority: HIGH_PRORITY
        });
    };
}