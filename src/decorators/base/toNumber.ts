import { HIGH_PRORITY } from '../../config';
import { NumberConfig } from '../../types';
import { commandsRegist, useModelKeys } from '../../utils';

/**
 * 转换为数字，默认 0
 * @param value 配置项
 */
export function toNumber(value: NumberConfig | number = 0): PropertyDecorator {
    return function (target, propertyKey) {
        let defaultValue = 0;
        let autoTrans = true;
        let keys;
        if (typeof value === 'number') {
            defaultValue = value;
        } else {
            defaultValue = value.defaultValue || 0;
            autoTrans = value.autoTrans || true;
            keys = value.keys;
        }
        commandsRegist(target, propertyKey, {
            type: 'number',
            value: {
                defaultValue,
                autoTrans
            },
            modelKeys: useModelKeys(keys),
            priority: HIGH_PRORITY
        });
    };
}