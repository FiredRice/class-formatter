import { Type } from '../../types';
import { mixins } from '../../utils';

/**
 * 混入
 * @param baseCtors 其余模板
 */
export function Mixins(...baseCtors: Type[]): ClassDecorator {
    return function (constructor) {
        mixins(constructor, baseCtors);
    };
}