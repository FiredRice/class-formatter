import { isSymbol } from 'lodash';
import { toSymbol, executeTransform, TransModel } from '../../src';

describe('【toSymbol】装饰器测试', () => {

    describe('装饰器测试', () => {
        @TransModel
        class Test {
            @toSymbol()
            value!: symbol;
        }

        test(`不存在的属性`, () => {
            expect(isSymbol(executeTransform(Test, {}).value)).toBe(true);
        });
        test(`数字类型的属性`, () => {
            expect(isSymbol(executeTransform(Test, { value: 1 }).value)).toBe(true);
        });
        test(`字符串类型的属性`, () => {
            expect(isSymbol(executeTransform(Test, { value: '1' }).value)).toBe(true);
        });
        test(`boolean 类型的属性 false`, () => {
            expect(isSymbol(executeTransform(Test, { value: false }).value)).toBe(true);
        });
        test(`boolean 类型的属性 true`, () => {
            expect(isSymbol(executeTransform(Test, { value: true }).value)).toBe(true);
        });
        test(`数组类型的属性`, () => {
            expect(isSymbol(executeTransform(Test, { value: [1, 2] }).value)).toBe(true);
        });
        test(`对象类型的属性`, () => {
            expect(isSymbol(executeTransform(Test, { value: { name: '1' } }).value)).toBe(true);
        });
        test(`undefined 属性`, () => {
            expect(isSymbol(executeTransform(Test, { value: undefined }).value)).toBe(true);
        });
        test(`null 属性`, () => {
            expect(isSymbol(executeTransform(Test, { value: null }).value)).toBe(true);
        });
        test(`正则属性`, () => {
            expect(isSymbol(executeTransform(Test, { value: /132/ }).value)).toBe(true);
        });
        test(`Symbol 属性`, () => {
            const value = Symbol();
            expect(executeTransform(Test, { value })).toEqual({ value });
        });
        test(`Function 属性`, () => {
            expect(isSymbol(executeTransform(Test, { value: () => { } }).value)).toBe(true);
        });
    });
    
    describe('模板默认值测试', () => {
        const value = Symbol();
        @TransModel
        class Test {
            @toSymbol()
            value: symbol = value;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ value });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 })).toEqual({ value });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' })).toEqual({ value });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false })).toEqual({ value });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true })).toEqual({ value });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] })).toEqual({ value });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } })).toEqual({ value });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined })).toEqual({ value });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null })).toEqual({ value });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /132/ })).toEqual({ value });
        });
        test(`Symbol 属性`, () => {
            const value2 = Symbol()
            expect(executeTransform(Test, { value: value2 })).toEqual({ value: value2 });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } })).toEqual({ value });
        });
    });

    describe('装饰器默认值测试1', () => {
        const value = Symbol();
        @TransModel
        class Test {
            @toSymbol(value)
            value!: symbol;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ value });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 })).toEqual({ value });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' })).toEqual({ value });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false })).toEqual({ value });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true })).toEqual({ value });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] })).toEqual({ value });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } })).toEqual({ value });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined })).toEqual({ value });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null })).toEqual({ value });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /132/ })).toEqual({ value });
        });
        test(`Symbol 属性`, () => {
            const value2 = Symbol()
            expect(executeTransform(Test, { value: value2 })).toEqual({ value: value2 });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } })).toEqual({ value });
        });
    });

    describe('装饰器默认值测试2', () => {
        const value = Symbol();
        @TransModel
        class Test {
            @toSymbol({ defaultValue: value })
            value!: symbol;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ value });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 })).toEqual({ value });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' })).toEqual({ value });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false })).toEqual({ value });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true })).toEqual({ value });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] })).toEqual({ value });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } })).toEqual({ value });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined })).toEqual({ value });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null })).toEqual({ value });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /132/ })).toEqual({ value });
        });
        test(`Symbol 属性`, () => {
            const value2 = Symbol()
            expect(executeTransform(Test, { value: value2 })).toEqual({ value: value2 });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } })).toEqual({ value });
        });
    });

    describe('装饰器默认值优先级1', () => {
        const value = Symbol();
        @TransModel
        class Test {
            @toSymbol({ defaultValue: Symbol() })
            value: symbol = value;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ value });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 })).toEqual({ value });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' })).toEqual({ value });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false })).toEqual({ value });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true })).toEqual({ value });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] })).toEqual({ value });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } })).toEqual({ value });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined })).toEqual({ value });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null })).toEqual({ value });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /132/ })).toEqual({ value });
        });
        test(`Symbol 属性`, () => {
            const value2 = Symbol()
            expect(executeTransform(Test, { value: value2 })).toEqual({ value: value2 });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } })).toEqual({ value });
        });
    });

    describe('装饰器默认值优先级2', () => {
        const value = Symbol();
        @TransModel
        class Test {
            @toSymbol(Symbol())
            value: symbol = value;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ value });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 })).toEqual({ value });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' })).toEqual({ value });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false })).toEqual({ value });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true })).toEqual({ value });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] })).toEqual({ value });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } })).toEqual({ value });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined })).toEqual({ value });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null })).toEqual({ value });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /132/ })).toEqual({ value });
        });
        test(`Symbol 属性`, () => {
            const value2 = Symbol()
            expect(executeTransform(Test, { value: value2 })).toEqual({ value: value2 });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } })).toEqual({ value });
        });
    });

});