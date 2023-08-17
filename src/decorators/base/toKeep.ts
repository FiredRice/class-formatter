import { commandsRegister } from '../../config';
import { ClassFieldDecorator, ModelKey } from '../../types';
import { useModelKeys } from '../../utils';

/**
 * 保持源数据
 * @param value 配置项
 */
export function toKeep(keys?: ModelKey | ModelKey[]): ClassFieldDecorator {
    return function (_, context) {
        if (context.kind === 'field') {
            commandsRegister.push(context.name, {
                type: 'keep',
                value: undefined,
                modelKeys: useModelKeys(keys),
            });
        } else {
            console.error('【toKeep Error】: This decorator can only be used on properties of the Class');
        }
    };
}