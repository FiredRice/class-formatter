import isRegExp from 'lodash/isRegExp';
import isString from 'lodash/isString';
import { commandsRegister } from '../../config';
import { ClassFieldDecorator, RegConfig } from '../../types';
import { useModelKeys } from '../../utils';

/**
 * 转换为正则，默认 new RegExp('')
 * @param value 配置项
 */
export function toRegExp(value: RegConfig | RegExp | string = ''): ClassFieldDecorator {
    return function (_, context) {
        if (context.kind === 'field') {
            let defaultValue: RegExp | string = '';
            let keys;
            if (isRegExp(value) || isString(value)) {
                defaultValue = value;
            } else {
                defaultValue = value.defaultValue || '';
                keys = value.keys;
            }
            commandsRegister.push(context.name, {
                type: 'reg_exp',
                value: defaultValue,
                modelKeys: useModelKeys(keys),
            });
        } else {
            console.error('【toRegExp Error】: This decorator can only be used on properties of the Class');
        }
    };
}