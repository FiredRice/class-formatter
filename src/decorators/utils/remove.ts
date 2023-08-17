import { commandsRegister } from '../../config';
import { ClassFieldAndMethodDecorator, ModelKey } from '../../types';
import { useModelKeys } from '../../utils';

/**
 * 从模板中移除字段
 * @param keys 执行键
 */
export function Remove(keys?: ModelKey | ModelKey[]): ClassFieldAndMethodDecorator {
    return function (_, context) {
        if (
            context.kind === 'field' ||
            context.kind === 'method'
        ) {
            commandsRegister.push(context.name, {
                type: 'remove',
                value: {},
                modelKeys: useModelKeys(keys),
            });
        } else {
            console.error('【Remove Error】: This decorator can only be used on properties or methods of the Class');
        }
    };
}