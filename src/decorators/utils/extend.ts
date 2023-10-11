import { classCommandMap } from '../../config';
import { ModelKey, Type } from '../../types';
import { cloneCommands, commandsRegist, useModelKeys } from '../../utils';

/**
 * 继承方法
 */
export function ExtendMethod(keys?: ModelKey | ModelKey[]): MethodDecorator {
    return function (target, propertyKey, descriptor) {
        commandsRegist(target, propertyKey, {
            type: 'extend_method',
            value: descriptor,
            modelKeys: useModelKeys(keys),
        });
    };
}

/**
 * 继承父类装饰器
 * @param parent 父类
 */
export function Extend(parent: Type): ClassDecorator {
    return function (constructor) {
        const parentProto = parent.prototype;
        const parentCommands = classCommandMap.has(parentProto) ? cloneCommands(classCommandMap.get(parentProto)!) : {};
        classCommandMap.set(constructor.prototype, Object.assign({}, parentCommands, classCommandMap.get(constructor.prototype) || {}));
    };
}