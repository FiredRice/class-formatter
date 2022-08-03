import { HIGH_PRORITY } from '../../config';
import { StringConfig } from '../../types';
import { useModelKeys } from '../../utils';

/**
 * 转换为字符串，默认 ''
 * @param value 配置项
 */
export function toString(value: StringConfig | string = '') {
    return (target, propertyKey: string) => {
        let defaultValue = '';
        let autoTrans = true;
        let keys;
        if (typeof value === 'string') {
            defaultValue = value;
        } else {
            defaultValue = value.defaultValue || '';
            autoTrans = value.autoTrans || true;
            keys = value.keys;
        }
        target[propertyKey] = target[propertyKey] || [];
        target[propertyKey].push({
            type: 'string',
            value: {
                defaultValue,
                autoTrans
            },
            modalKeys: useModelKeys(keys),
            priority: HIGH_PRORITY
        });
    };
}