import { Extend, executeTransform, toNumber, toString, TransModel } from '../../src';

describe('【Extend】装饰器测试', () => {
    describe('装饰器测试', () => {
        @TransModel
        class Parent {
            @toNumber()
            value!: number;
        }

        @Extend(Parent)
        @TransModel
        class Test extends Parent {
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ value: 0 });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 })).toEqual({ value: 1 });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' })).toEqual({ value: 1 });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false })).toEqual({ value: 0 });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true })).toEqual({ value: 0 });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] })).toEqual({ value: 0 });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } })).toEqual({ value: 0 });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined })).toEqual({ value: 0 });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null })).toEqual({ value: 0 });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ })).toEqual({ value: 0 });
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() })).toEqual({ value: 0 });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } })).toEqual({ value: 0 });
        });
    });

    describe('装饰器测试2', () => {
        @TransModel
        class Parent {
            @toNumber()
            value!: number;
        }

        @Extend(Parent)
        @TransModel
        class Test extends Parent {
            @toString()
            value2!: string;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ value: 0, value2: '' });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1, value2: 1 })).toEqual({ value: 1, value2: '1' });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1', value2: '2' })).toEqual({ value: 1, value2: '2' });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false, value2: false })).toEqual({ value: 0, value2: '' });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true, value2: true })).toEqual({ value: 0, value2: '' });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2], value2: [1, 2] })).toEqual({ value: 0, value2: '' });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' }, value2: { name: '1' } })).toEqual({ value: 0, value2: '' });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined, value2: undefined })).toEqual({ value: 0, value2: '' });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null, value2: null })).toEqual({ value: 0, value2: '' });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/, value2: /^132$/ })).toEqual({ value: 0, value2: '' });
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol(), value2: Symbol() })).toEqual({ value: 0, value2: '' });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { }, value2: () => { } })).toEqual({ value: 0, value2: '' });
        });
    });

    describe('重写测试', () => {
        @TransModel
        class Parent {
            @toNumber()
            value!: any;
        }

        @TransModel
        @Extend(Parent)
        class Test extends Parent {
            @toString()
            value: string = '';

            @toString()
            value2!: string;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ value: '', value2: '' });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1, value2: 1 })).toEqual({ value: '1', value2: '1' });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1', value2: '2' })).toEqual({ value: '1', value2: '2' });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false, value2: false })).toEqual({ value: '', value2: '' });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true, value2: true })).toEqual({ value: '', value2: '' });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2], value2: [1, 2] })).toEqual({ value: '', value2: '' });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' }, value2: { name: '1' } })).toEqual({ value: '', value2: '' });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined, value2: undefined })).toEqual({ value: '', value2: '' });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null, value2: null })).toEqual({ value: '', value2: '' });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/, value2: /^132$/ })).toEqual({ value: '', value2: '' });
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol(), value2: Symbol() })).toEqual({ value: '', value2: '' });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { }, value2: () => { } })).toEqual({ value: '', value2: '' });
        });
    });
});