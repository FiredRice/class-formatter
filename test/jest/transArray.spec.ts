import { toString, executeTransArray, toNumber, TransModel } from '../../src';

describe('【executeTransArray】测试', () => {
    describe('合并源1', () => {
        @TransModel
        class Test {
            @toString()
            value!: string;
        }

        test(`不存在的属性`, () => {
            expect(executeTransArray(Test, [], { mergeSource: true })).toEqual([]);
        });
        test(`数字类型的属性`, () => {
            expect(executeTransArray(Test, [{ value: 1, value2: 1 }], { mergeSource: true })).toEqual([{ value: '1', value2: 1 }]);
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransArray(Test, [{ value: '1', value2: '1' }], { mergeSource: true })).toEqual([{ value: '1', value2: '1' }]);
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransArray(Test, [{ value: false, value2: false }], { mergeSource: true })).toEqual([{ value: '', value2: false }]);
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransArray(Test, [{ value: true, value2: true }], { mergeSource: true })).toEqual([{ value: '', value2: true }]);
        });
        test(`数组类型的属性`, () => {
            expect(executeTransArray(Test, [{ value: [1, 2], value2: [1, 2] }], { mergeSource: true })).toEqual([{ value: '', value2: [1, 2] }]);
        });
        test(`对象类型的属性`, () => {
            expect(executeTransArray(Test, [{ value: { name: '1' }, value2: { name: '1' } }], { mergeSource: true })).toEqual([{ value: '', value2: { name: '1' } }]);
        });
        test(`undefined 属性`, () => {
            expect(executeTransArray(Test, [{ value: undefined, value2: undefined }], { mergeSource: true })).toEqual([{ value: '', value2: undefined }]);
        });
        test(`null 属性`, () => {
            expect(executeTransArray(Test, [{ value: null, value2: null }], { mergeSource: true })).toEqual([{ value: '', value2: null }]);
        });
        test(`正则属性`, () => {
            const value2 = /123456/;
            expect(executeTransArray(Test, [{ value: /^132$/, value2 }], { mergeSource: true })).toEqual([{ value: '', value2 }]);
        });
        test(`Symbol 属性`, () => {
            const value2 = Symbol();
            expect(executeTransArray(Test, [{ value: Symbol(), value2 }], { mergeSource: true })).toEqual([{ value: '', value2 }]);
        });
        test(`Function 属性`, () => {
            const value2 = () => { };
            expect(executeTransArray(Test, [{ value: () => { }, value2 }], { mergeSource: true })).toEqual([{ value: '', value2 }]);
        });
    });

    describe('合并源2', () => {
        @TransModel
        class Test {
            @toString()
            value!: string;
        }

        test(`不存在的属性`, () => {
            expect(executeTransArray(Test, [], { mergeSource: true })).toEqual([]);
        });
        test(`数字类型的属性`, () => {
            expect(executeTransArray(Test, [
                { value: 1, value2: 1 },
                { value: 2, value2: 2 },
            ], { mergeSource: true })).toEqual([
                { value: '1', value2: 1 },
                { value: '2', value2: 2 },
            ]);
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransArray(Test, [
                { value: '1', value2: '1' },
                { value: '2', value2: '2' },
            ], { mergeSource: true })).toEqual([
                { value: '1', value2: '1' },
                { value: '2', value2: '2' },
            ]);
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransArray(Test, [
                { value: false, value2: false },
                { value: false, value2: false },
            ], { mergeSource: true })).toEqual([
                { value: '', value2: false },
                { value: '', value2: false },
            ]);
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransArray(Test, [
                { value: true, value2: true },
                { value: true, value2: true },
            ], { mergeSource: true })).toEqual([
                { value: '', value2: true },
                { value: '', value2: true },
            ]);
        });
        test(`数组类型的属性`, () => {
            expect(executeTransArray(Test, [
                { value: [1, 2], value2: [1, 2] },
                { value: [3, 4], value2: [3, 4] },
            ], { mergeSource: true })).toEqual([
                { value: '', value2: [1, 2] },
                { value: '', value2: [3, 4] },
            ]);
        });
        test(`对象类型的属性`, () => {
            expect(executeTransArray(Test, [
                { value: { name: '1' }, value2: { name: '1' } },
                { value: { name: null }, value2: { name: null } },
            ], { mergeSource: true })).toEqual([
                { value: '', value2: { name: '1' } },
                { value: '', value2: { name: null } },
            ]);
        });
        test(`undefined 属性`, () => {
            expect(executeTransArray(Test, [
                { value: undefined, value2: undefined },
                { value: undefined, value2: undefined },
            ], { mergeSource: true })).toEqual([
                { value: '', value2: undefined },
                { value: '', value2: undefined },
            ]);
        });
        test(`null 属性`, () => {
            expect(executeTransArray(Test, [
                { value: null, value2: null },
                { value: null, value2: null },
            ], { mergeSource: true })).toEqual([
                { value: '', value2: null },
                { value: '', value2: null },
            ]);
        });
        test(`正则属性`, () => {
            const value2 = /123456/;
            expect(executeTransArray(Test, [
                { value: /^132$/, value2 },
                { value: /^456$/, value2 },
            ], { mergeSource: true })).toEqual([
                { value: '', value2 },
                { value: '', value2 },
            ]);
        });
        test(`Symbol 属性`, () => {
            const value2 = Symbol();
            expect(executeTransArray(Test, [
                { value: Symbol(), value2 },
                { value: Symbol(), value2 },
            ], { mergeSource: true })).toEqual([
                { value: '', value2 },
                { value: '', value2 },
            ]);
        });
        test(`Function 属性`, () => {
            const value2 = () => { };
            expect(executeTransArray(Test, [
                { value: () => { }, value2 },
                { value: () => { }, value2 },
            ], { mergeSource: true })).toEqual([
                { value: '', value2 },
                { value: '', value2 },
            ]);
        });
    });

    describe('map', () => {
        @TransModel
        class Test {
            @toNumber()
            value!: number;
        }
        test(`不存在的属性`, () => {
            expect(executeTransArray(Test, [
                { value: 1 },
                { value: '20' },
            ], {
                map: (item, index) => ({ value: item.value! + index + 1 })
            })).toEqual([
                { value: 2 },
                { value: 22 },
            ]);
        });
    })
})