import { commandsRegister } from '../../config';
import { ClassFieldAndMethodDecorator, ModelKey } from '../../types';
import { useModelKeys } from '../../utils';

/**
 * 重命名属性
 * @param name 新名字
 * @param keys 执行键
 */
export function Rename(name: string, keys?: ModelKey | ModelKey[]): ClassFieldAndMethodDecorator {
    return function (_, context) {
        if (
            context.kind === 'field' || 
            context.kind === 'method'
        ) {
            commandsRegister.push(context.name, {
                type: 'rename',
                value: name,
                modelKeys: useModelKeys(keys),
            });
        } else {
            console.error('【Rename Error】: This decorator can only be used on properties or methods of the Class');
        }
    };
}