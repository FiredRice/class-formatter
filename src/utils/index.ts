import { ModalKey } from '../types';

export function useModelKeys(modalKeys: ModalKey | ModalKey[] = []) {
    const result = typeof modalKeys === 'object' ? modalKeys : [modalKeys];
    return result;
}

/**
 * 判断是否存在循环引用
 * @param obj 被判断对象
 * @returns boolean
 */
export function hasLoop(obj) {
    // 判断对象内部是否有和源相同的属性
    function findLoop(target, src) {
        // 源数组，并将自身传入
        const source = src.slice().concat([target]);
        for (const key in target) {
            // 如果是对象才需要判断
            if (typeof target[key] === 'object') {
                // 如果在源数组中找到 || 递归查找内部属性找到相同
                if (source.indexOf(target[key]) > -1 || findLoop(target[key], source)) {
                    return true;
                }
            }
        }
        return false;
    }
    // 如果传入值是对象，则执行判断，否则返回false
    return typeof obj === 'object' ? findLoop(obj, []) : false;
}