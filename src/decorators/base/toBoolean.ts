import { commandsRegister } from '../../config';
import { BooleanConfig, ClassFieldDecorator } from '../../types';
import { useModelKeys } from '../../utils';

/**
 * 转换为布尔，默认 false
 * @param value 配置项
 */
export function toBoolean(value: BooleanConfig | boolean = false): ClassFieldDecorator {
    return function (_, context) {
        if (context.kind === 'field') {
            let defaultValue = false;
            let keys;
            if (typeof value === 'boolean') {
                defaultValue = value;
            } else {
                defaultValue = value.defaultValue || false;
                keys = value.keys;
            }
            commandsRegister.push(context.name, {
                type: 'boolean',
                value: defaultValue,
                modelKeys: useModelKeys(keys),
            });
        } else {
            console.error('【toBoolean Error】: This decorator can only be used on properties of the Class');
        }
    };
}