import { MEDIUM_PRORITY } from '../../config';
import { ModalKey } from '../../types';
import { useModelKeys } from '../../utils';

/**
 * 从模板中移除字段
 * @param keys 执行键
 */
export function Remove(keys?: ModalKey | ModalKey[]) {
    return (target, propertyKey: string) => {
        target[propertyKey] = target[propertyKey] || [];
        target[propertyKey].push({
            type: 'remove',
            value: {},
            modalKeys: useModelKeys(keys),
            priority: MEDIUM_PRORITY
        });
    };
}