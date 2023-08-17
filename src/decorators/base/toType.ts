import { commandsRegister } from '../../config';
import { ClassFieldDecorator, ObjectConfig, Type } from '../../types';
import { useModelKeys } from '../../utils';

/**
 * 转换为指定类型，默认 {}
 * @param value 配置项
 */
export function toType<T = any>(value?: ObjectConfig<T> | Type<T>): ClassFieldDecorator {
    return function (_, context) {
        if (context.kind === 'field') {
            let defaultValue = {};
            let ClassType;
            let keys;
            if (typeof value === 'function') {
                ClassType = value;
            } else if (value) {
                defaultValue = value.defaultValue || {};
                ClassType = value.ClassType;
                keys = value.keys;
            }
            commandsRegister.push(context.name, {
                type: 'object',
                value: {
                    defaultValue,
                    ClassType
                },
                modelKeys: useModelKeys(keys),
            });
        } else {
            console.error('【toType Error】: This decorator can only be used on properties of the Class');
        }
    };
}