import { LOW_PRORITY } from '../../config';
import { ModelKey } from '../../types';
import { useModelKeys } from '../../utils';

/**
 * 重命名属性
 * @param name 新名字
 * @param keys 执行键
 */
export function Rename(name: string, keys?: ModelKey | ModelKey[]): PropertyDecorator {
    return (target, propertyKey) => {
        target[propertyKey] = target[propertyKey] || [];
        target[propertyKey].push({
            type: 'rename',
            value: name,
            modelKeys: useModelKeys(keys),
            priority: LOW_PRORITY
        });
    };
}