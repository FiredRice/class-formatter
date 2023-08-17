import { Type } from '../../types';
import { mixins } from '../../utils';

/**
 * 混入
 * @param baseCtors 其余模板
 */
export function Mixins(...baseCtors: Type[]) {
    return function (constructor, context: ClassDecoratorContext) {
        if (context.kind === 'class') {
            mixins(constructor, baseCtors);
        } else {
            console.error('【Mixins Error】: This decorator can only be used on Class');
        }
    };
}