import { commandsRegister } from '../../config';
import { Callback, ClassFieldDecorator, ModelKey } from '../../types';
import { useModelKeys } from '../../utils';

/**
 * 创建自定义属性装饰器
 * @param callback 执行回调
 * @param keys 执行键
 * @return (...args) => ClassFieldDecorator
 */
export function createFieldDecorator<T = any>(callback: Callback<T>, keys?: ModelKey | ModelKey[]) {
    return function (...args): ClassFieldDecorator {
        return function (_, context) {
            if (context.kind === 'field') {
                commandsRegister.push(context.name, {
                    type: 'custom',
                    value: {
                        args,
                        callback
                    },
                    modelKeys: useModelKeys(keys),
                });
            } else {
                console.error('【createFieldDecorator Error】: This decorator can only be used on properties of the Class');
            }
        };
    };
}

/**
 * 批量管理属性装饰器
 * @returns () => ClassFieldDecorator
 */
export function createBatchDecorators(...decorators: ClassFieldDecorator[]) {
    return function (): ClassFieldDecorator {
        return function (_, context) {
            if (context.kind === 'field') {
                const { length } = decorators;
                for (let i = length - 1; i >= 0; i--) {
                    decorators[i](_, context);
                }
            } else {
                console.error('【createBatchDecorators Error】: This decorator can only be used on properties of the Class');
            }
        };
    };
}