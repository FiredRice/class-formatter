import { HIGH_PRORITY } from '../../config';
import { ArrayConfig, Type } from '../../types';
import { useModelKeys } from '../../utils';

/**
 * 转换为数组，默认 []
 * @param value 配置项
 */
export function toArray<T = any>(value?: ArrayConfig<T> | Type<T>): PropertyDecorator {
    return (target, propertyKey) => {
        let defaultValue: any[] = [];
        let ClassType;
        let keys;
        if (typeof value === 'function') {
            ClassType = value;
        } else if (value) {
            defaultValue = value.defaultValue || [];
            ClassType = value.ClassType;
            keys = value.keys;
        }

        target[propertyKey] = target[propertyKey] || [];
        target[propertyKey].push({
            type: 'array',
            value: {
                defaultValue,
                ClassType
            },
            modelKeys: useModelKeys(keys),
            priority: HIGH_PRORITY
        });
    };
}