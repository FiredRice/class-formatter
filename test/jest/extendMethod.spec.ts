import { Extend, executeTransform, TransModel, toNumber } from '../../src';

describe('【ExtendMethod】装饰器测试', () => {
    describe('装饰器测试', () => {
        @TransModel
        class Test {
            @toNumber()
            value!: number;

            @Extend()
            public getValue() {
                return this.value;
            }
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).getValue()).toBe(0);
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 }).getValue()).toBe(1);
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' }).getValue()).toBe(1);
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false }).getValue()).toBe(0);
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true }).getValue()).toBe(0);
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] }).getValue()).toBe(0);
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } }).getValue()).toBe(0);
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined }).getValue()).toBe(0);
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null }).getValue()).toBe(0);
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ }).getValue()).toBe(0);
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() }).getValue()).toBe(0);
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } }).getValue()).toBe(0);
        });
        test(`合并源数据`, () => {
            expect(executeTransform(Test, { value: 5 }, { mergeSource: true }).getValue()).toBe(5);
        });
    });

    describe('访问器测试1', () => {
        @TransModel
        class Test {
            @toNumber()
            private value!: number;

            @Extend()
            public get value2() {
                return this.value + 1;
            }
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).value2).toBe(1);
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 }).value2).toBe(2);
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' }).value2).toBe(2);
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false }).value2).toBe(1);
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true }).value2).toBe(1);
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] }).value2).toBe(1);
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } }).value2).toBe(1);
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined }).value2).toBe(1);
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null }).value2).toBe(1);
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /^132$/ }).value2).toBe(1);
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() }).value2).toBe(1);
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } }).value2).toBe(1);
        });
    });

    describe('访问器测试2', () => {
        @TransModel
        class Test {
            @toNumber()
            value!: number;

            @Extend()
            public set value2(v: number) {
                this.value = this.value + v + 1;
            }
        }

        test(`不存在的属性`, () => {
            const res = executeTransform(Test, {});
            res.value2 = 5;
            expect(res.value).toBe(6);
        });
        test(`数字类型的属性`, () => {
            const res = executeTransform(Test, { value: 1 });
            res.value2 = 5;
            expect(res.value).toBe(7);
        });
        test(`字符串类型的属性`, () => {
            const res = executeTransform(Test, { value: '1' });
            res.value2 = 5;
            expect(res.value).toBe(7);
        });
        test(`boolean 类型的属性 false`, () => {
            const res = executeTransform(Test, { value: false });
            res.value2 = 5;
            expect(res.value).toBe(6);
        });
        test(`boolean 类型的属性 true`, () => {
            const res = executeTransform(Test, { value: true });
            res.value2 = 5;
            expect(res.value).toBe(6);
        });
        test(`数组类型的属性`, () => {
            const res = executeTransform(Test, { value: [1, 2] });
            res.value2 = 5;
            expect(res.value).toBe(6);
        });
        test(`对象类型的属性`, () => {
            const res = executeTransform(Test, { value: { name: '1' } });
            res.value2 = 5;
            expect(res.value).toBe(6);
        });
        test(`undefined 属性`, () => {
            const res = executeTransform(Test, { value: undefined });
            res.value2 = 5;
            expect(res.value).toBe(6);
        });
        test(`null 属性`, () => {
            const res = executeTransform(Test, { value: null });
            res.value2 = 5;
            expect(res.value).toBe(6);
        });
        test(`正则属性`, () => {
            const res = executeTransform(Test, { value: /^132$/ });
            res.value2 = 5;
            expect(res.value).toBe(6);
        });
        test(`Symbol 属性`, () => {
            const res = executeTransform(Test, { value: Symbol() });
            res.value2 = 5;
            expect(res.value).toBe(6);
        });
        test(`Function 属性`, () => {
            const res = executeTransform(Test, { value: () => { } });
            res.value2 = 5;
            expect(res.value).toBe(6);
        });
    });
});