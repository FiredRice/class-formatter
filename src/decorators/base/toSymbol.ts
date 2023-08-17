import isSymbol from 'lodash/isSymbol';
import { commandsRegister } from '../../config';
import { ClassFieldDecorator, SymbolConfig } from '../../types';
import { useModelKeys } from '../../utils';

/**
 * 转换为Symbol，默认 Symbol()
 * @param value 配置项
 */
export function toSymbol(value: SymbolConfig | symbol = Symbol()): ClassFieldDecorator {
    return function (_, context) {
        if (context.kind === 'field') {
            let defaultValue = Symbol();
            let keys;
            if (isSymbol(value)) {
                defaultValue = value;
            } else {
                defaultValue = value.defaultValue || Symbol();
                keys = value.keys;
            }
            commandsRegister.push(context.name, {
                type: 'symbol',
                value: defaultValue,
                modelKeys: useModelKeys(keys),
            });
        } else {
            console.error('【toSymbol Error】: This decorator can only be used on properties of the Class');
        }
    };
}