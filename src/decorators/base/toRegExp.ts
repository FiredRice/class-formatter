import isRegExp from 'lodash/isRegExp';
import isString from 'lodash/isString';
import { HIGH_PRORITY } from '../../config';
import { RegConfig } from '../../types';
import { commandsRegist, useModelKeys } from '../../utils';

/**
 * 转换为正则，默认 new RegExp('')
 * @param value 配置项
 */
export function toRegExp(value: RegConfig | RegExp | string = ''): PropertyDecorator {
    return function (target, propertyKey) {
        let defaultValue: RegExp | string = '';
        let keys;
        if (isRegExp(value) || isString(value)) {
            defaultValue = value;
        } else {
            defaultValue = value.defaultValue || '';
            keys = value.keys;
        }
        commandsRegist(target, propertyKey, {
            type: 'reg_exp',
            value: defaultValue,
            modelKeys: useModelKeys(keys),
            priority: HIGH_PRORITY
        });
    };
}