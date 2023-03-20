import { Remove, executeTransform, toNumber, Format } from '../../src';

describe('【Remove】装饰器测试', () => {

    describe('装饰器测试', () => {
        class Test {
            @Remove()
            value!: number;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({});
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 })).toEqual({});
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' })).toEqual({});
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false })).toEqual({});
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true })).toEqual({});
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] })).toEqual({});
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } })).toEqual({});
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined })).toEqual({});
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null })).toEqual({});
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ })).toEqual({});
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() })).toEqual({});
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } })).toEqual({});
        });
    });


    describe('优先级测试', () => {
        class Test {
            @toNumber(1)
            @Format(value => value + 1)
            @Remove()
            value!: number;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({});
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 2 })).toEqual({});
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '3' })).toEqual({});
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false })).toEqual({});
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true })).toEqual({});
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] })).toEqual({});
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } })).toEqual({});
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined })).toEqual({});
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null })).toEqual({});
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ })).toEqual({});
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() })).toEqual({});
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } })).toEqual({});
        });
    });
});