import { classCommandMap, HIGH_PRORITY } from '../../config';
import { commandsRegist } from '../../utils';

/**
 * 继承方法
 */
export function ExtendMethod(): MethodDecorator {
    return function (target, propertyKey, descriptor) {
        const command: any = {
            type: 'extend_method',
            value: descriptor,
            modelKeys: [],
            priority: HIGH_PRORITY
        }
        commandsRegist(target, propertyKey, command)
        const commands = classCommandMap.get(target) || {};
        commands[propertyKey] = commands[propertyKey] || [];
        if (commands[propertyKey].length > 1) {
            // 方法继承只能存在一个
            commands[propertyKey] = [command];
            classCommandMap.set(target, commands);
        }
    };
}
