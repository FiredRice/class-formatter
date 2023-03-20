import { toType, executeTransform, toString } from '../../src';

describe('【toType】装饰器测试', () => {
    describe('装饰器测试', () => {
        class Test {
            @toType()
            value!: any;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ value: {} });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 })).toEqual({ value: {} });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' })).toEqual({ value: {} });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false })).toEqual({ value: {} });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true })).toEqual({ value: {} });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] })).toEqual({ value: {} });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } })).toEqual({ value: { name: '1' } });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined })).toEqual({ value: {} });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null })).toEqual({ value: {} });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /132/ })).toEqual({ value: {} });
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() })).toEqual({ value: {} });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } })).toEqual({ value: {} });
        });
    });

    describe('模板默认值测试', () => {
        class Test {
            @toType()
            value: any = { key: '1' };
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ value: { key: '1' } });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 })).toEqual({ value: { key: '1' } });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' })).toEqual({ value: { key: '1' } });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false })).toEqual({ value: { key: '1' } });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true })).toEqual({ value: { key: '1' } });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] })).toEqual({ value: { key: '1' } });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } })).toEqual({ value: { name: '1' } });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined })).toEqual({ value: { key: '1' } });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null })).toEqual({ value: { key: '1' } });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /132/ })).toEqual({ value: { key: '1' } });
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() })).toEqual({ value: { key: '1' } });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } })).toEqual({ value: { key: '1' } });
        });
    });

    describe('装饰器默认值测试1', () => {
        class Test {
            @toType({ defaultValue: { key: '1' } })
            value!: any;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ value: { key: '1' } });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 })).toEqual({ value: { key: '1' } });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' })).toEqual({ value: { key: '1' } });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false })).toEqual({ value: { key: '1' } });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true })).toEqual({ value: { key: '1' } });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] })).toEqual({ value: { key: '1' } });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } })).toEqual({ value: { name: '1' } });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined })).toEqual({ value: { key: '1' } });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null })).toEqual({ value: { key: '1' } });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /132/ })).toEqual({ value: { key: '1' } });
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() })).toEqual({ value: { key: '1' } });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } })).toEqual({ value: { key: '1' } });
        });
    });


    describe('装饰器默认值优先级', () => {
        class Test {
            @toType({ defaultValue: { key: '2' } })
            value: any = { key: '1' };
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ value: { key: '1' } });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { value: 1 })).toEqual({ value: { key: '1' } });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { value: '1' })).toEqual({ value: { key: '1' } });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { value: false })).toEqual({ value: { key: '1' } });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { value: true })).toEqual({ value: { key: '1' } });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { value: [1, 2] })).toEqual({ value: { key: '1' } });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { value: { name: '1' } })).toEqual({ value: { name: '1' } });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { value: undefined })).toEqual({ value: { key: '1' } });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { value: null })).toEqual({ value: { key: '1' } });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { value: /132/ })).toEqual({ value: { key: '1' } });
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { value: Symbol() })).toEqual({ value: { key: '1' } });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { value: () => { } })).toEqual({ value: { key: '1' } });
        });
    });


    describe('类型转换测试', () => {

        describe('单层转换', () => {
            class Target {
                @toString()
                key!: string;
            }
            class Test {
                @toType(Target)
                value!: Target;
            }

            test(`不存在的属性`, () => {
                expect(executeTransform(Test, {})).toEqual({
                    value: { key: '' }
                });
            });

            test(`有非法值`, () => {
                expect(executeTransform(Test, { value: [{}] })).toEqual({
                    value: { key: '' }
                });
            });

            test(`数组有合非法值`, () => {
                expect(executeTransform(Test, { value: { key: '张三' } })).toEqual({
                    value: { key: '张三' }
                });
            });
        });

        describe('多层转换', () => {
            class Target2 {
                @toString()
                key!: string;
            }
            class Target1 {
                @toType({ ClassType: Target2, defaultValue: {} })
                value!: Target2;
            }

            class Test {
                @toType(Target1)
                value!: Target1;
            }

            test(`不存在的属性`, () => {
                expect(executeTransform(Test, {})).toEqual({
                    value: { value: { key: '' } }
                });
            });

            test(`数组有非法值1`, () => {
                expect(executeTransform(Test, { value: [{}] })).toEqual({
                    value: { value: { key: '' } }
                });
            });

            test(`数组有非法值2`, () => {
                expect(executeTransform(Test, { value: { value: 2 } })).toEqual({
                    value: { value: { key: '' } }
                });
            });

            test(`数组有非法值3`, () => {
                expect(executeTransform(Test, { value: { value: { key: 9 } } })).toEqual({
                    value: { value: { key: '9' } }
                });
            });
        });

        describe('模板自循环', () => {
            class Test {
                @toType({ ClassType: Test })
                value!: Test;
            }

            const value: any = {};
            let target = value;
            for (let i = 0; i < 50; i++) {
                target.value = {};
                target = target.value;
            }
            test(`不存在的属性`, () => {
                expect(executeTransform(Test, {})).toEqual({
                    value
                });
            });

            test(`存在空属性1`, () => {
                expect(executeTransform(Test, { value: {} })).toEqual({
                    value
                });
            });

            test(`深度限制`, () => {
                const value: any = {};
                let target = value;
                for (let i = 0; i < 3; i++) {
                    target.value = {};
                    target = target.value;
                }
                expect(executeTransform(Test, {}, { deep: 3 })).toEqual({
                    value
                });
            });
        });
    });
});