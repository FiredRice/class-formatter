import { LOWER_MIDDLE_PRORITY } from '../../config';
import { Callback, ModalKey } from '../../types';
import { useModelKeys } from '../../utils';

/**
 * 创建自定义属性装饰器
 * @param callback 执行回调
 * @param keys 执行键
 * @return (...args) => DecoratorFun
 */
export function createFormatDecorator<T = any>(callback: Callback<T>, keys?: ModalKey | ModalKey[]) {
    return (...args) => {
        return (target, propertyKey: string) => {
            target[propertyKey] = target[propertyKey] || [];
            target[propertyKey].push({
                type: 'custom',
                value: {
                    args,
                    callback
                },
                modalKeys: useModelKeys(keys),
                priority: LOWER_MIDDLE_PRORITY
            });
        };
    };
}