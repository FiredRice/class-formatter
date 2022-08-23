import { ModalKey, Type } from '../types';

export function useModelKeys(modalKeys: ModalKey | ModalKey[] = []) {
    const result = typeof modalKeys === 'object' ? modalKeys : [modalKeys];
    return result;
}

export function extendsAll(child: Type, parents: Type[]) {
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