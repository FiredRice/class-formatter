import { HIGH_PRORITY } from '../../config';
import { ObjectConfig, Type } from '../../types';
import { commandsRegist, useModelKeys } from '../../utils';

/**
 * 转换为指定类型，默认 {}
 * @param value 配置项
 */
export function toType<T = any>(value?: ObjectConfig<T> | Type<T>): PropertyDecorator {
    return function (target, propertyKey) {
        let defaultValue = {};
        let ClassType;
        let keys;
        if (typeof value === 'function') {
            ClassType = value;
        } else if (value) {
            defaultValue = value.defaultValue || {};
            ClassType = value.ClassType;
            keys = value.keys;
        }
        commandsRegist(target, propertyKey, {
            type: 'object',
            value: {
                defaultValue,
                ClassType
            },
            modelKeys: useModelKeys(keys),
            priority: HIGH_PRORITY
        });
    };
}