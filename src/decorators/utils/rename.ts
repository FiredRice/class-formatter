import { ModelKey } from '../../types';
import { commandsRegist, useModelKeys } from '../../utils';

/**
 * 重命名属性
 * @param name 新名字
 * @param keys 执行键
 */
export function Rename(name: string, keys?: ModelKey | ModelKey[]): PropertyDecorator {
    return function (target, propertyKey) {
        commandsRegist(target, propertyKey, {
            type: 'rename',
            value: name,
            modelKeys: useModelKeys(keys),
        });
    };
}