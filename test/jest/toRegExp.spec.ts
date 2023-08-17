import { isRegExp } from 'lodash';
import { toRegExp, executeTransform, TransModel } from '../../src';

describe('【toRegExp】装饰器测试', () => {

    describe('装饰器测试', () => {
        @TransModel
        class Test {
            @toRegExp()
            value!: RegExp;
        }

        test(`不存在的属性`, () => {
            expect(isRegExp(executeTransform(Test, {}).value)).toBe(true);
        });
        test(`数字类型的属性`, () => {
            expect(isRegExp(executeTransform(Test, { value: 1 }).value)).toBe(true);
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' }).value.toString()).toBe('/1/');
        });
        test(`boolean 类型的属性 false`, () => {
            expect(isRegExp(executeTransform(Test, { value: false }).value)).toBe(true);
        });
        test(`boolean 类型的属性 true`, () => {
            expect(isRegExp(executeTransform(Test, { value: true }).value)).toBe(true);
        });
        test(`数组类型的属性`, () => {
            expect(isRegExp(executeTransform(Test, { value: [1, 2] }).value)).toBe(true);
        });
        test(`对象类型的属性`, () => {
            expect(isRegExp(executeTransform(Test, { value: { name: '1' } }).value)).toBe(true);
        });
        test(`undefined 属性`, () => {
            expect(isRegExp(executeTransform(Test, { value: undefined }).value)).toBe(true);
        });
        test(`null 属性`, () => {
            expect(isRegExp(executeTransform(Test, { value: null }).value)).toBe(true);
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ }).value.toString()).toBe('/^132$/');
        });
        test(`Symbol 属性`, () => {
            expect(isRegExp(executeTransform(Test, { value: Symbol() }).value)).toBe(true);
        });
        test(`Function 属性`, () => {
            expect(isRegExp(executeTransform(Test, { value: () => { } }).value)).toBe(true);
        });
    });

    describe('模板默认值测试', () => {
        @TransModel
        class Test {
            @toRegExp()
            value: RegExp = /123/;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).value.toString()).toBe('/123/');
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 }).value.toString()).toBe('/123/');
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' }).value.toString()).toBe('/1/');
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false }).value.toString()).toBe('/123/');
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true }).value.toString()).toBe('/123/');
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] }).value.toString()).toBe('/123/');
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } }).value.toString()).toBe('/123/');
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined }).value.toString()).toBe('/123/');
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null }).value.toString()).toBe('/123/');
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ }).value.toString()).toBe('/^132$/');
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() }).value.toString()).toBe('/123/');
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } }).value.toString()).toBe('/123/');
        });
    });

    describe('装饰器默认值测试1', () => {
        @TransModel
        class Test {
            @toRegExp(/123/)
            value!: RegExp;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).value.toString()).toBe('/123/');
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 }).value.toString()).toBe('/123/');
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' }).value.toString()).toBe('/1/');
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false }).value.toString()).toBe('/123/');
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true }).value.toString()).toBe('/123/');
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] }).value.toString()).toBe('/123/');
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } }).value.toString()).toBe('/123/');
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined }).value.toString()).toBe('/123/');
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null }).value.toString()).toBe('/123/');
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ }).value.toString()).toBe('/^132$/');
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() }).value.toString()).toBe('/123/');
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } }).value.toString()).toBe('/123/');
        });
    });

    describe('装饰器默认值测试2', () => {
        @TransModel
        class Test {
            @toRegExp({ defaultValue: /123/ })
            value!: RegExp;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).value.toString()).toBe('/123/');
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 }).value.toString()).toBe('/123/');
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' }).value.toString()).toBe('/1/');
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false }).value.toString()).toBe('/123/');
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true }).value.toString()).toBe('/123/');
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] }).value.toString()).toBe('/123/');
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } }).value.toString()).toBe('/123/');
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined }).value.toString()).toBe('/123/');
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null }).value.toString()).toBe('/123/');
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ }).value.toString()).toBe('/^132$/');
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() }).value.toString()).toBe('/123/');
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } }).value.toString()).toBe('/123/');
        });
    });

    describe('装饰器默认值测试3', () => {
        @TransModel
        class Test {
            @toRegExp('123')
            value!: RegExp;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).value.toString()).toBe('/123/');
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 }).value.toString()).toBe('/123/');
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' }).value.toString()).toBe('/1/');
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false }).value.toString()).toBe('/123/');
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true }).value.toString()).toBe('/123/');
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] }).value.toString()).toBe('/123/');
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } }).value.toString()).toBe('/123/');
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined }).value.toString()).toBe('/123/');
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null }).value.toString()).toBe('/123/');
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ }).value.toString()).toBe('/^132$/');
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() }).value.toString()).toBe('/123/');
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } }).value.toString()).toBe('/123/');
        });
    });

    describe('装饰器默认值测试4', () => {
        @TransModel
        class Test {
            @toRegExp({ defaultValue: '123' })
            value!: RegExp;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).value.toString()).toBe('/123/');
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 }).value.toString()).toBe('/123/');
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' }).value.toString()).toBe('/1/');
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false }).value.toString()).toBe('/123/');
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true }).value.toString()).toBe('/123/');
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] }).value.toString()).toBe('/123/');
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } }).value.toString()).toBe('/123/');
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined }).value.toString()).toBe('/123/');
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null }).value.toString()).toBe('/123/');
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ }).value.toString()).toBe('/^132$/');
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() }).value.toString()).toBe('/123/');
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } }).value.toString()).toBe('/123/');
        });
    });

    describe('装饰器默认值优先级1', () => {
        @TransModel
        class Test {
            @toRegExp({ defaultValue: /456/ })
            value: RegExp = /123/;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).value.toString()).toBe('/123/');
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 }).value.toString()).toBe('/123/');
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' }).value.toString()).toBe('/1/');
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false }).value.toString()).toBe('/123/');
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true }).value.toString()).toBe('/123/');
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] }).value.toString()).toBe('/123/');
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } }).value.toString()).toBe('/123/');
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined }).value.toString()).toBe('/123/');
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null }).value.toString()).toBe('/123/');
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ }).value.toString()).toBe('/^132$/');
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() }).value.toString()).toBe('/123/');
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } }).value.toString()).toBe('/123/');
        });
    });

    describe('装饰器默认值优先级2', () => {
        @TransModel
        class Test {
            @toRegExp(/456/)
            value: RegExp = /123/;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).value.toString()).toBe('/123/');
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 }).value.toString()).toBe('/123/');
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' }).value.toString()).toBe('/1/');
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false }).value.toString()).toBe('/123/');
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true }).value.toString()).toBe('/123/');
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] }).value.toString()).toBe('/123/');
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } }).value.toString()).toBe('/123/');
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined }).value.toString()).toBe('/123/');
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null }).value.toString()).toBe('/123/');
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ }).value.toString()).toBe('/^132$/');
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() }).value.toString()).toBe('/123/');
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } }).value.toString()).toBe('/123/');
        });
    });

    describe('装饰器默认值优先级3', () => {
        @TransModel
        class Test {
            @toRegExp('456')
            value: RegExp = /123/;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).value.toString()).toBe('/123/');
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 }).value.toString()).toBe('/123/');
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' }).value.toString()).toBe('/1/');
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false }).value.toString()).toBe('/123/');
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true }).value.toString()).toBe('/123/');
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] }).value.toString()).toBe('/123/');
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } }).value.toString()).toBe('/123/');
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined }).value.toString()).toBe('/123/');
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null }).value.toString()).toBe('/123/');
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ }).value.toString()).toBe('/^132$/');
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() }).value.toString()).toBe('/123/');
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } }).value.toString()).toBe('/123/');
        });
    });
});
