import { commandsRegister } from '../../config';
import { ClassFieldDecorator, NumberConfig } from '../../types';
import { useModelKeys } from '../../utils';

/**
 * 转换为数字，默认 0
 * @param value 配置项
 */
export function toNumber(value: NumberConfig | number = 0): ClassFieldDecorator {
    return function (_, context) {
        if (context.kind === 'field') {
            let defaultValue = 0;
            let autoTrans = true;
            let keys;
            if (typeof value === 'number') {
                defaultValue = value;
            } else {
                defaultValue = value.defaultValue || 0;
                autoTrans = value.autoTrans ?? true;
                keys = value.keys;
            }
            commandsRegister.push(context.name, {
                type: 'number',
                value: {
                    defaultValue,
                    autoTrans
                },
                modelKeys: useModelKeys(keys),
            });
        } else {
            console.error('【toNumber Error】: This decorator can only be used on properties of the Class');
        }
    };
}