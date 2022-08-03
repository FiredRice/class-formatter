import { HIGH_PRORITY } from '../../config';
import { BooleanConfig } from '../../types';
import { useModelKeys } from '../../utils';

/**
 * 转换为布尔，默认 false
 * @param value 配置项
 */
export function toBoolean(value: BooleanConfig | boolean = false) {
    return (target, propertyKey: string) => {
        let defaultValue = false;
        let keys;
        if (typeof value === 'boolean') {
            defaultValue = value;
        } else {
            defaultValue = value.defaultValue || false;
            keys = value.keys;
        }
        target[propertyKey] = target[propertyKey] || [];
        target[propertyKey].push({
            type: 'boolean',
            value: defaultValue,
            modalKeys: useModelKeys(keys),
            priority: HIGH_PRORITY
        });
    };
}