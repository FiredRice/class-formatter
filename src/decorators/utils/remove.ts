import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import { LOW_PRORITY } from '../../config';
import { ModelKey, RemoveCallback, RemoveConfig } from '../../types';
import { commandsRegist, useModelKeys } from '../../utils';

/**
 * 从模板中移除字段
 * @param keys 执行键
 */
export function Remove(value: RemoveConfig | RemoveCallback | ModelKey | ModelKey[] = []): PropertyDecorator {
    return function (target, propertyKey) {
        const defaultValue = () => true;
        if (isFunction(value)) {
            commandsRegist(target, propertyKey, {
                type: 'remove',
                value,
                modelKeys: [],
                priority: LOW_PRORITY
            });
        } else if (isArray(value) || isString(value) || isNumber(value)) {
            commandsRegist(target, propertyKey, {
                type: 'remove',
                value: defaultValue,
                modelKeys: useModelKeys(value),
                priority: LOW_PRORITY
            });
        } else {
            commandsRegist(target, propertyKey, {
                type: 'remove',
                value: value.beforeRemove || defaultValue,
                modelKeys: useModelKeys(value.keys),
                priority: LOW_PRORITY
            });
        }
    };
}