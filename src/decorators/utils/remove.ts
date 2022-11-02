import { MEDIUM_PRORITY } from '../../config';
import { ModelKey } from '../../types';
import { commandsRegist, useModelKeys } from '../../utils';

/**
 * 从模板中移除字段
 * @param keys 执行键
 */
export function Remove(keys?: ModelKey | ModelKey[]): PropertyDecorator {
    return function (target, propertyKey) {
        commandsRegist(target, propertyKey, {
            type: 'remove',
            value: {},
            modelKeys: useModelKeys(keys),
            priority: MEDIUM_PRORITY
        });
    };
}