import { classCommandMap, commandsRegister } from '../../config';
import { ClassDecorator, ClassMethodDecorator, ModelKey, Type } from '../../types';
import { cloneCommands, useModelKeys } from '../../utils';

/**
 * 继承装饰器
 * - 可继承父类
 * - 可继承方法
 * - 可继承访问器
 * @param value 父类 | 执行键
 */
export function Extend(value?: ModelKey | ModelKey[]): ClassMethodDecorator;
export function Extend(value: Type): ClassDecorator;
export function Extend(value: any): any {
    return function (constructor, context: DecoratorContext) {
        if (context.kind === 'class') {
            const parentCommands = classCommandMap.has(value) ? cloneCommands(classCommandMap.get(value)!) : {};
            classCommandMap.set(
                constructor,
                Object.assign(
                    {},
                    parentCommands,
                    classCommandMap.get(constructor) || {}
                )
            );
        } else if (
            context.kind === 'method' ||
            context.kind === 'getter' ||
            context.kind === 'setter'
        ) {
            commandsRegister.push(context.name, {
                type: 'extend_method',
                value: undefined,
                modelKeys: useModelKeys(value),
            });
        } else {
            console.error('【Extend Error】: This decorator can only be used on methods、getter or setter of the Class');
        }
    };
}