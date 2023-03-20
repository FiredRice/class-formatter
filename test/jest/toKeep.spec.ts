import { toKeep, executeTransform } from '../../src';

describe('【toKeep】装饰器测试', () => {

    describe('装饰器测试', () => {
        class Test {
            @toKeep()
            value!: any;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ value: undefined });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 })).toEqual({ value: 1 });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' })).toEqual({ value: '1' });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false })).toEqual({ value: false });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true })).toEqual({ value: true });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] })).toEqual({ value: [1, 2] });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } })).toEqual({ value: { name: '1' } });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined })).toEqual({ value: undefined });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null })).toEqual({ value: null });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ }).value.toString()).toBe('/^132$/');
        });
        test(`Symbol 属性`, () => {
            const value = Symbol();
            expect(executeTransform(Test, { value })).toEqual({ value });
        });
        test(`Function 属性`, () => {
            const value = () => { };
            expect(executeTransform(Test, { value })).toEqual({ value });
        });
    });

    describe('模板默认值测试', () => {
        class Test {
            @toKeep()
            value: RegExp = /123/;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ value: undefined });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 })).toEqual({ value: 1 });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' })).toEqual({ value: '1' });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false })).toEqual({ value: false });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true })).toEqual({ value: true });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] })).toEqual({ value: [1, 2] });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } })).toEqual({ value: { name: '1' } });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined })).toEqual({ value: undefined });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null })).toEqual({ value: null });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ }).value.toString()).toBe('/^132$/');
        });
        test(`Symbol 属性`, () => {
            const value = Symbol();
            expect(executeTransform(Test, { value })).toEqual({ value });
        });
        test(`Function 属性`, () => {
            const value = () => { };
            expect(executeTransform(Test, { value })).toEqual({ value });
        });
    });
});