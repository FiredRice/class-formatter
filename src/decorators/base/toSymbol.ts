import isSymbol from 'lodash/isSymbol';
import { HIGH_PRORITY } from '../../config';
import { SymbolConfig } from '../../types';
import { commandsRegist, useModelKeys } from '../../utils';

/**
 * 转换为Symbol，默认 Symbol()
 * @param value 配置项
 */
export function toSymbol(value: SymbolConfig | symbol = Symbol()): PropertyDecorator {
    return function (target, propertyKey) {
        let defaultValue = Symbol();
        let keys;
        if (isSymbol(value)) {
            defaultValue = value;
        } else {
            defaultValue = value.defaultValue || Symbol();
            keys = value.keys;
        }
        commandsRegist(target, propertyKey, {
            type: 'symbol',
            value: defaultValue,
            modelKeys: useModelKeys(keys),
            priority: HIGH_PRORITY
        });
    };
}