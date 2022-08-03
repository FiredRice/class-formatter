import { MEDIUM_PRORITY } from '../../config';
import { ModalKey } from '../../types';
import { useModelKeys } from '../../utils';

/**
 * 格式化属性
 * @param callback 执行回调 
 * @param keys 执行键
 */
export function Format(callback: (value: any, target: Readonly<any>, shareValue: any) => any, keys?: ModalKey | ModalKey[]) {
    return (target, propertyKey: string) => {
        target[propertyKey] = target[propertyKey] || [];
        target[propertyKey].push({
            type: 'format',
            value: callback,
            modalKeys: useModelKeys(keys),
            priority: MEDIUM_PRORITY
        });
    };
}