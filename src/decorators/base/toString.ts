import { commandsRegister } from '../../config';
import { ClassFieldDecorator, StringConfig } from '../../types';
import { useModelKeys } from '../../utils';

/**
 * 转换为字符串，默认 ''
 * @param value 配置项
 */
export function toString(value: StringConfig | string = ''): ClassFieldDecorator {
    return function (_, context) {
        if (context.kind === 'field') {
            let defaultValue = '';
            let autoTrans = true;
            let keys;
            if (typeof value === 'string') {
                defaultValue = value;
            } else {
                defaultValue = value.defaultValue || '';
                autoTrans = value.autoTrans ?? true;
                keys = value.keys;
            }
            commandsRegister.push(context.name, {
                type: 'string',
                value: {
                    defaultValue,
                    autoTrans
                },
                modelKeys: useModelKeys(keys),
            });
        } else {
            console.error('【toString Error】: This decorator can only be used on properties of the Class');
        }
    };
}