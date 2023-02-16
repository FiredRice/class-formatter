import { LOWER_MIDDLE_PRORITY } from '../../config';
import { Callback, ModelKey } from '../../types';
import { commandsRegist, useModelKeys } from '../../utils';

/**
 * 创建自定义属性装饰器
 * @param callback 执行回调
 * @param keys 执行键
 * @return (...args) => DecoratorFun
 */
export function createFormatDecorator<T = any>(callback: Callback<T>, keys?: ModelKey | ModelKey[]) {
    return function (...args): PropertyDecorator {
        return function (target, propertyKey) {
            commandsRegist(target, propertyKey, {
                type: 'custom',
                value: {
                    args,
                    callback
                },
                modelKeys: useModelKeys(keys),
                priority: LOWER_MIDDLE_PRORITY
            });
        };
    };
}

/**
 * 批量管理属性装饰器
 * @returns () => PropertyDecorator
 */
export function createBatchDecorators(...decorators: PropertyDecorator[]) {
    return function (): PropertyDecorator {
        return function (target, propertyKey) {
            const { length } = decorators;
            for (let i = 0; i < length; i++) {
                decorators[i](target, propertyKey);
            }
        };
    };
}