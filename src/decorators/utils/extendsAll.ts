import { Type } from '../../types';

export function ExtendsAll(...parents: Type[]) {
    return function (constructor: Function) {
        parents.forEach(parent => {
            Object.getOwnPropertyNames(parent.prototype).forEach(name => {
                if (name !== 'constructor') {
                    constructor.prototype[name] = parent.prototype[name];
                }
            });
        });
    };
}