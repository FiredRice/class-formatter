import { ModelKey } from '../../types';
import { commandsRegist, useModelKeys } from '../../utils';

/**
 * 格式化属性
 * @param callback 执行回调 
 * @param keys 执行键
 */
export function Format(callback: (value: any, target: Readonly<any>, shareValue: any) => any, keys?: ModelKey | ModelKey[]): PropertyDecorator {
    return function (target, propertyKey) {
        commandsRegist(target, propertyKey, {
            type: 'format',
            value: callback,
            modelKeys: useModelKeys(keys),
        });
    };
}