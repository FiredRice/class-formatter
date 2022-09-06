import { Type } from '../../types';

export function Mixins(...baseCtors: Type[]): ClassDecorator {
    return function (constructor) {
        baseCtors.forEach(parent => {
            Object.getOwnPropertyNames(parent.prototype).forEach(name => {
                if (name !== 'constructor') {
                    constructor.prototype[name] = parent.prototype[name];
                }
            });
        });
    };
}