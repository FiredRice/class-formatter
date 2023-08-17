import { commandsRegister } from '../../config';
import { ArrayConfig, ClassFieldDecorator, Type } from '../../types';
import { useModelKeys } from '../../utils';

/**
 * 转换为数组，默认 []
 * @param value 配置项
 */
export function toArray<T = any>(value?: ArrayConfig<T> | Type<T>): ClassFieldDecorator {
    return function (_, context) {
        if (context.kind === 'field') {
            let defaultValue: any[] = [];
            let ClassType;
            let map;
            let keys;
            if (typeof value === 'function') {
                ClassType = value;
            } else if (value) {
                defaultValue = value.defaultValue || [];
                ClassType = value.ClassType;
                keys = value.keys;
                map = value.map;
            }
            commandsRegister.push(context.name, {
                type: 'array',
                value: {
                    defaultValue,
                    ClassType,
                    map
                },
                modelKeys: useModelKeys(keys),
            });
        } else {
            console.error('【toArray Error】: This decorator can only be used on properties of the Class');
        }
    };
}