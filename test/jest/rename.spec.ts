import { Rename, executeTransform, toNumber, Format } from '../../src';

describe('【Rename】装饰器测试', () => {
    describe('装饰器测试', () => {
        class Test {
            @Rename('value2')
            value!: number;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({});
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 })).toEqual({ value2: 1 });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' })).toEqual({ value2: '1' });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false })).toEqual({ value2: false });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true })).toEqual({ value2: true });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] })).toEqual({ value2: [1, 2] });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } })).toEqual({ value2: { name: '1' } });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined })).toEqual({ value2: undefined });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null })).toEqual({ value2: null });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ })['value2'].toString()).toBe('/^132$/');
        });
        test(`Symbol 属性`, () => {
            const value = Symbol();
            expect(executeTransform(Test, { value })).toEqual({ value2: value });
        });
        test(`Function 属性`, () => {
            const value = () => { };
            expect(executeTransform(Test, { value })).toEqual({ value2: value });
        });
    });

    describe('组合测试1', () => {
        class Test {
            @toNumber()
            @Format(value => value + 1)
            @Rename('value2')
            value!: number;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ value2: 1 });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 })).toEqual({ value2: 2 });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' })).toEqual({ value2: 2 });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false })).toEqual({ value2: 1 });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true })).toEqual({ value2: 1 });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] })).toEqual({ value2: 1 });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } })).toEqual({ value2: 1 });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined })).toEqual({ value2: 1 });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null })).toEqual({ value2: 1 });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ })).toEqual({ value2: 1 });
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() })).toEqual({ value2: 1 });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } })).toEqual({ value2: 1 });
        });
    });

    describe('组合测试2', () => {
        class Test {
            @toNumber()
            @Format(value => undefined)
            @Rename('value2')
            value!: number;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ value2: undefined });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 })).toEqual({ value2: undefined });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' })).toEqual({ value2: undefined });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false })).toEqual({ value2: undefined });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true })).toEqual({ value2: undefined });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] })).toEqual({ value2: undefined });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } })).toEqual({ value2: undefined });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined })).toEqual({ value2: undefined });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null })).toEqual({ value2: undefined });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ })).toEqual({ value2: undefined });
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() })).toEqual({ value2: undefined });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } })).toEqual({ value2: undefined });
        });
    });
});