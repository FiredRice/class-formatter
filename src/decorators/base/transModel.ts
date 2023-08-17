import { classCommandMap, commandsRegister } from '../../config';

export function TransModel(value: Function, context: ClassDecoratorContext) {
    if (context.kind === 'class') {
        const commands = classCommandMap.get(value) || {};
        classCommandMap.set(value, Object.assign({}, commands, commandsRegister.clone()));
        commandsRegister.clear();
    } else {
        console.error('【TransModel Error】: This decorator can only be used on Class');
    }
}
