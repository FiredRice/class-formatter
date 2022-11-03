import { UPPER_MIDDLE_PRORITY } from '../../config';
import { ModelKey } from '../../types';
import { commandsRegist, useModelKeys } from '../../utils';

/**
 * 保持源数据
 * @param value 配置项
 */
export function toKeep(keys?: ModelKey | ModelKey[]): PropertyDecorator {
    return function (target, propertyKey) {
        commandsRegist(target, propertyKey, {
            type: 'keep',
            value: {},
            modelKeys: useModelKeys(keys),
            priority: UPPER_MIDDLE_PRORITY
        });
    };
}