import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import isNumber from 'lodash/isNumber';
import { commandsRegister } from '../../config';
import { ClassFieldAndMethodDecorator, ModelKey, RemoveCallback, RemoveConfig } from '../../types';
import { useModelKeys } from '../../utils';

/**
 * 从模板中移除字段
 * @param keys 执行键
 */
export function Remove(value: RemoveConfig | RemoveCallback | ModelKey | ModelKey[] = []): ClassFieldAndMethodDecorator {
    return function (_, context) {
        if (
            context.kind === 'field' ||
            context.kind === 'method'
        ) {
            const defaultValue = () => true;
            if (isFunction(value)) {
                commandsRegister.push(context.name, {
                    type: 'remove',
                    value,
                    modelKeys: [],
                });
            } else if (isArray(value) || isString(value) || isNumber(value)) {
                commandsRegister.push(context.name, {
                    type: 'remove',
                    value: defaultValue,
                    modelKeys: useModelKeys(value),
                });
            } else {
                commandsRegister.push(context.name, {
                    type: 'remove',
                    value: value.beforeRemove || defaultValue,
                    modelKeys: useModelKeys(value.keys),
                });
            }
        } else {
            console.error('【Remove Error】: This decorator can only be used on properties or methods of the Class');
        }
    };
}