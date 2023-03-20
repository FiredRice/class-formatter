import { toString, executeTransform } from '../../src';

describe('【executeTransform】测试', () => {
    describe('合并源', () => {
        class Test {
            @toString()
            value!: string;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}, { mergeSource: true })).toEqual({ value: '' });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1, value2: 1 }, { mergeSource: true })).toEqual({ value: '1', value2: 1 });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1', value2: '1' }, { mergeSource: true })).toEqual({ value: '1', value2: '1' });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false, value2: false }, { mergeSource: true })).toEqual({ value: '', value2: false });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true, value2: true }, { mergeSource: true })).toEqual({ value: '', value2: true });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2], value2: [1, 2] }, { mergeSource: true })).toEqual({ value: '', value2: [1, 2] });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' }, value2: { name: '1' } }, { mergeSource: true })).toEqual({ value: '', value2: { name: '1' } });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined, value2: undefined }, { mergeSource: true })).toEqual({ value: '', value2: undefined });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null, value2: null }, { mergeSource: true })).toEqual({ value: '', value2: null });
        });
        test(`正则属性`, () => {
            const value2 = /123456/;
            expect(executeTransform(Test, { value: /^132$/, value2 }, { mergeSource: true })).toEqual({ value: '', value2 });
        });
        test(`Symbol 属性`, () => {
            const value2 = Symbol();
            expect(executeTransform(Test, { value: Symbol(), value2 }, { mergeSource: true })).toEqual({ value: '', value2 });
        });
        test(`Function 属性`, () => {
            const value2 = () => { };
            expect(executeTransform(Test, { value: () => { }, value2 }, { mergeSource: true })).toEqual({ value: '', value2 });
        });
    });
});