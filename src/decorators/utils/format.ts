import { commandsRegister } from '../../config';
import { ClassFieldDecorator, ModelKey } from '../../types';
import { useModelKeys } from '../../utils';

/**
 * 格式化属性
 * @param callback 执行回调 
 * @param keys 执行键
 */
export function Format(callback: (value: any, target: Readonly<any>, shareValue: any) => any, keys?: ModelKey | ModelKey[]): ClassFieldDecorator {
    return function (_, context) {
        if (context.kind === 'field') {
            commandsRegister.push(context.name, {
                type: 'format',
                value: callback,
                modelKeys: useModelKeys(keys),
            });
        } else {
            console.error('【Format Error】: This decorator can only be used on properties of the Class');
        }
    };
}