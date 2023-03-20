import { HIGH_PRORITY } from '../../config';
import { StringConfig } from '../../types';
import { commandsRegist, useModelKeys } from '../../utils';

/**
 * 转换为字符串，默认 ''
 * @param value 配置项
 */
export function toString(value: StringConfig | string = ''): PropertyDecorator {
    return function (target: any, propertyKey) {
        let defaultValue = '';
        let autoTrans = true;
        let keys;
        if (typeof value === 'string') {
            defaultValue = value;
        } else {
            defaultValue = value.defaultValue || '';
            autoTrans = value.autoTrans ?? true;
            keys = value.keys;
        }
        commandsRegist(target, propertyKey, {
            type: 'string',
            value: {
                defaultValue,
                autoTrans
            },
            modelKeys: useModelKeys(keys),
            priority: HIGH_PRORITY
        });
    };
}