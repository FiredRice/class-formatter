import { HIGH_PRORITY } from '../../config';
import { BooleanConfig } from '../../types';
import { commandsRegist, useModelKeys } from '../../utils';

/**
 * 转换为布尔，默认 false
 * @param value 配置项
 */
export function toBoolean(value: BooleanConfig | boolean = false): PropertyDecorator {
    return function (target, propertyKey) {
        let defaultValue = false;
        let keys;
        if (typeof value === 'boolean') {
            defaultValue = value;
        } else {
            defaultValue = value.defaultValue || false;
            keys = value.keys;
        }
        commandsRegist(target, propertyKey, {
            type: 'boolean',
            value: defaultValue,
            modelKeys: useModelKeys(keys),
            priority: HIGH_PRORITY
        });
    };
}