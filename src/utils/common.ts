import isArray from 'lodash/isArray';
import { classCommandMap } from '../config';
import { Command, CommandMap, ModelKey, Type } from '../types';

export function useModelKeys(modelKeys: ModelKey | ModelKey[] = []) {
    const result = isArray(modelKeys) ? modelKeys : [modelKeys];
    return result;
}

/**
 * 混入
 * @param child 子类
 * @param parents 父类
 */
export function mixins<T extends Function>(child: T, parents: Type[]) {
    const commandList: CommandMap[] = [];
    for (let i = parents.length - 1; i >= 0; i--) {
        const parent = parents[i];
        if (classCommandMap.has(parent.prototype)) {
            commandList.push(cloneCommands(classCommandMap.get(parent.prototype)!));
        }
        const keys = Object.getOwnPropertyNames(parent);
        for (let j = keys.length - 1; j >= 0; j--) {
            const name = keys[j];
            if (name !== 'constructor') {
                child.prototype[name] = parent.prototype[name];
            }
        }
    }
    classCommandMap.set(child.prototype, Object.assign({}, ...commandList, classCommandMap.get(child.prototype) || {}));
}

/**
 * 获取所有属性
 */
export function getOwnKeys(target) {
    return [...Object.keys(target), ...Object.getOwnPropertySymbols(target)];
}

/**
 * 拷贝指令集
 */
export function cloneCommands(command: CommandMap) {
    const keys = getOwnKeys(command);
    const result: CommandMap = {};
    for (let i = keys.length - 1; i >= 0; i--) {
        const key = keys[i];
        result[key] = [...command[key]];
    }
    return result;
}

/**
 * 注册装饰器
 */
export function commandsRegist(target, propertyKey, command: Command) {
    let commands = classCommandMap.get(target) || {};
    commands[propertyKey] = commands[propertyKey] || [];
    commands[propertyKey].push(command);
    // 继承父类装饰器
    if (classCommandMap.has(target.__proto__)) {
        const parent = cloneCommands(classCommandMap.get(target.__proto__)!);
        commands = Object.assign({}, parent, commands);
    }
    classCommandMap.set(target, commands);
}