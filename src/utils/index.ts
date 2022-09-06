import { ModelKey, Type } from '../types';

export function useModelKeys(modelKeys: ModelKey | ModelKey[] = []) {
    const result = typeof modelKeys === 'object' ? modelKeys : [modelKeys];
    return result;
}

export function mixins(child: Type, parents: Type[]) {
    //遍历父类中的所有的属性，添加到子类的属性中中
    parents.forEach(parent => {
        //获取遍历到的父类中的所有属性
        Object.getOwnPropertyNames(parent.prototype).forEach(name => {
            if (name !== 'constructor') {
                //父类中的属性，添加到子类的属性中
                child.prototype[name] = parent.prototype[name];
            }
        });
    });
}

export * from './translators';