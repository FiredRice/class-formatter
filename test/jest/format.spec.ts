import { isNumber } from 'lodash';
import { Format, executeTransform, toNumber } from '../../src';

describe('【Format】装饰器测试', () => {

    describe('装饰器测试', () => {
        class Test {
            @Format(value => (isNumber(value) ? value : 0) + 1)
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

    describe('共享数据测试', () => {
        class Test {
            @Format((value, target, shareValue) => (isNumber(value) ? value : 0) + shareValue + 1)
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
    });

    describe('联动测试', () => {
        class Test {
            @Format((value, target) => (isNumber(value) ? value : 0) + (isNumber(target.value2) ? target.value2 : 0) + 1)
            value!: number;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ value: 1 });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1, value2: 2 })).toEqual({ value: 4 });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1', value2: 2 })).toEqual({ value: 3 });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false, value2: 2 })).toEqual({ value: 3 });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true, value2: 2 })).toEqual({ value: 3 });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2], value2: 2 })).toEqual({ value: 3 });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' }, value2: 2 })).toEqual({ value: 3 });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined, value2: 2 })).toEqual({ value: 3 });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null, value2: 2 })).toEqual({ value: 3 });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/, value2: 2 })).toEqual({ value: 3 });
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol(), value2: 2 })).toEqual({ value: 3 });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => {}, value2: 2 })).toEqual({ value: 3 });
        });
    });

    describe('优先级测试', () => {
        class Test {
            @toNumber(1)
            @Format(value => value + 1)
            value!: number;
        }
        
        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ value: 2 });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 2 })).toEqual({ value: 3 });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '3' })).toEqual({ value: 4 });
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
})