import { Mixins, executeTransform, toNumber, toString, toBoolean, Format } from '../../src';

describe('【Mixins】装饰器测试', () => {
    describe('装饰器测试', () => {
        class Parent1 {
            @toNumber()
            value!: number;
        }

        class Parent2 {
            @toString()
            value2!: string;
        }

        @Mixins(Parent1, Parent2)
        class Test implements Parent1, Parent2 {
            value!: number;
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
        class Parent1 {
            @toNumber()
            value!: unknown;
        }
        class Parent2 {
            @toString()
            value2!: string;
        }

        @Mixins(Parent1, Parent2)
        class Test implements Parent1, Parent2 {
            @toBoolean()
            value!: boolean;
            value2!: string;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ value: false, value2: '' });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1, value2: 1 })).toEqual({ value: false, value2: '1' });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1', value2: '2' })).toEqual({ value: false, value2: '2' });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false, value2: false })).toEqual({ value: false, value2: '' });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true, value2: true })).toEqual({ value: true, value2: '' });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2], value2: [1, 2] })).toEqual({ value: false, value2: '' });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' }, value2: { name: '1' } })).toEqual({ value: false, value2: '' });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined, value2: undefined })).toEqual({ value: false, value2: '' });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null, value2: null })).toEqual({ value: false, value2: '' });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/, value2: /^132$/ })).toEqual({ value: false, value2: '' });
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol(), value2: Symbol() })).toEqual({ value: false, value2: '' });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { }, value2: () => { } })).toEqual({ value: false, value2: '' });
        });
    });

    describe('额外属性测试', () => {
        class Parent1 {
            @toNumber()
            value!: unknown;
        }
        class Parent2 {
            @toString()
            value2!: string;
        }

        @Mixins(Parent1, Parent2)
        class Test implements Parent1, Parent2 {
            @toBoolean()
            value!: boolean;
            value2!: string;

            @toString('张三')
            @Format(value => `${value}大哥`)
            value3!: number;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ value: false, value2: '', value3: '张三大哥' });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1, value2: 1, value3: 1 })).toEqual({ value: false, value2: '1', value3: '1大哥' });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1', value2: '2', value3: '3' })).toEqual({ value: false, value2: '2', value3: '3大哥' });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false, value2: false, value3: false })).toEqual({ value: false, value2: '', value3: '张三大哥' });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true, value2: true, value3: true })).toEqual({ value: true, value2: '', value3: '张三大哥' });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2], value2: [1, 2], value3: [1, 2] })).toEqual({ value: false, value2: '', value3: '张三大哥' });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' }, value2: { name: '1' }, value3: { name: '1' } })).toEqual({ value: false, value2: '', value3: '张三大哥' });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined, value2: undefined, value3: undefined })).toEqual({ value: false, value2: '', value3: '张三大哥' });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null, value2: null, value3: null })).toEqual({ value: false, value2: '', value3: '张三大哥' });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/, value2: /^132$/, value3: /^132$/ })).toEqual({ value: false, value2: '', value3: '张三大哥' });
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol(), value2: Symbol(), value3: Symbol() })).toEqual({ value: false, value2: '', value3: '张三大哥' });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { }, value2: () => { }, value3: () => { } })).toEqual({ value: false, value2: '', value3: '张三大哥' });
        });
    });

    describe('覆盖测试', () => {
        class Parent1 {
            @toNumber()
            value!: number;
        }
        class Parent2 {
            @toString()
            value!: string;
        }

        @Mixins(Parent1, Parent2)
        class Test implements Parent1, Parent2 {
            value!: any;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ value: '' });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 })).toEqual({ value: '1' });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' })).toEqual({ value: '1' });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false })).toEqual({ value: '' });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true })).toEqual({ value: '' });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] })).toEqual({ value: '' });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } })).toEqual({ value: '' });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined })).toEqual({ value: '' });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null })).toEqual({ value: ''});
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ })).toEqual({ value: '' });
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() })).toEqual({ value: '' });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } })).toEqual({ value: '' });
        });
    });
});