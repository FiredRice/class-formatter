import isArray from 'lodash/isArray';
import { classCommandMap } from '../config';
import { CommandMap, ModelKey, Type } from '../types';

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
    for (let i = 0; i < parents.length; i++) {
        const parent = parents[i];
        if (classCommandMap.has(parent)) {
            commandList.push(cloneCommands(classCommandMap.get(parent)!));
        }
        const keys = Object.getOwnPropertyNames(parent.prototype);
        for (let j = keys.length - 1; j >= 0; j--) {
            const name = keys[j];
            if (name !== 'constructor') {
                child.prototype[name] = parent.prototype[name];
            }
        }
    }
    classCommandMap.set(
        child,
        Object.assign(
            {},
            ...commandList,
            classCommandMap.get(child) || {}
        )
    );
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