import { isNumber } from 'lodash';
import { createFormatDecorator, executeTransform } from '../../src';

describe('【custom】装饰器测试', () => {

    describe('装饰器测试', () => {
        const toCustom = createFormatDecorator((test: Test) => {
            const { value } = test
            return (isNumber(value) ? value : 0) + 1;
        });
        class Test {
            @toCustom()
            value!: number;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ value: 1 });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 })).toEqual({ value: 2 });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' })).toEqual({ value: 1 });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false })).toEqual({ value: 1 });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true })).toEqual({ value: 1 });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] })).toEqual({ value: 1 });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } })).toEqual({ value: 1 });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined })).toEqual({ value: 1 });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null })).toEqual({ value: 1 });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ })).toEqual({ value: 1 });
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() })).toEqual({ value: 1 });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => {} })).toEqual({ value: 1 });
        });
    });

    describe('共享值测试1', () => {
        const toCustom = createFormatDecorator((test: Test, shareValue) => {
            const { value } = test
            return (isNumber(value) ? value : 0) + shareValue.value + 1;
        });
        class Test {
            @toCustom()
            value!: number;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}, { shareValue: { value: 1 } })).toEqual({ value: 2 });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 }, { shareValue: { value: 1 } })).toEqual({ value: 3 });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' }, { shareValue: { value: 1 } })).toEqual({ value: 2 });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false }, { shareValue: { value: 1 } })).toEqual({ value: 2 });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true }, { shareValue: { value: 1 } })).toEqual({ value: 2 });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] }, { shareValue: { value: 1 } })).toEqual({ value: 2 });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } }, { shareValue: { value: 1 } })).toEqual({ value: 2 });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined }, { shareValue: { value: 1 } })).toEqual({ value: 2 });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null }, { shareValue: { value: 1 } })).toEqual({ value: 2 });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ }, { shareValue: { value: 1 } })).toEqual({ value: 2 });
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() }, { shareValue: { value: 1 } })).toEqual({ value: 2 });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => {} }, { shareValue: { value: 1 } })).toEqual({ value: 2 });
        });
    })

    describe('共享值测试2', () => {
        const toCustom = createFormatDecorator((test: Test, shareValue) => {
            const { value } = test
            return (isNumber(value) ? value : 0) + shareValue + 1;
        });
        class Test {
            @toCustom()
            value!: number;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}, { shareValue: 1 })).toEqual({ value: 2 });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 }, { shareValue: 1 })).toEqual({ value: 3 });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' }, { shareValue: 1 })).toEqual({ value: 2 });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false }, { shareValue: 1 })).toEqual({ value: 2 });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true }, { shareValue: 1 })).toEqual({ value: 2 });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] }, { shareValue: 1 })).toEqual({ value: 2 });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } }, { shareValue: 1 })).toEqual({ value: 2 });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined }, { shareValue: 1 })).toEqual({ value: 2 });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null }, { shareValue: 1 })).toEqual({ value: 2 });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ }, { shareValue: 1 })).toEqual({ value: 2 });
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() }, { shareValue: 1 })).toEqual({ value: 2 });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => {} }, { shareValue: 1 })).toEqual({ value: 2 });
        });
    })

    describe('额外参数测试', () => {
        const toCustom = createFormatDecorator((test: Test, shareValue, extra) => {
            const { value } = test
            return (isNumber(value) ? value : 0) + extra + 1;
        });
        class Test {
            @toCustom(1)
            value!: number;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ value: 2 });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 })).toEqual({ value: 3 });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' })).toEqual({ value: 2 });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false })).toEqual({ value: 2 });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true })).toEqual({ value: 2 });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] })).toEqual({ value: 2 });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } })).toEqual({ value: 2 });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined })).toEqual({ value: 2 });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null })).toEqual({ value: 2 });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ })).toEqual({ value: 2 });
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() })).toEqual({ value: 2 });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => {} })).toEqual({ value: 2 });
        });
    })
});