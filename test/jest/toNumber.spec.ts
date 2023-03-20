import { toNumber, executeTransform } from '../../src';

describe('【toNumber】装饰器测试', () => {

    describe('装饰器测试', () => {
        class Test {
            @toNumber()
            age!: number;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).age).toBe(0);
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { age: 1 }).age).toBe(1);
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { age: '1' }).age).toBe(1);
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { age: false }).age).toBe(0);
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { age: true }).age).toBe(0);
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { age: [1, 2] }).age).toBe(0);
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { age: {} }).age).toBe(0);
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { age: undefined }).age).toBe(0);
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { age: null }).age).toBe(0);
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { age: /123/ }).age).toBe(0);
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { age: Symbol() }).age).toBe(0);
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { age: () => { } }).age).toBe(0);
        });
    });

    describe('模板默认值测试', () => {
        class Test {
            @toNumber()
            age: number = 100;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).age).toBe(100);
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { age: 1 }).age).toBe(1);
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { age: '1' }).age).toBe(1);
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { age: false }).age).toBe(100);
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { age: true }).age).toBe(100);
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { age: [1, 2] }).age).toBe(100);
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { age: {} }).age).toBe(100);
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { age: undefined }).age).toBe(100);
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { age: null }).age).toBe(100);
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { age: /123/ }).age).toBe(100);
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { age: Symbol() }).age).toBe(100);
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { age: () => { } }).age).toBe(100);
        });
    });

    describe('装饰器默认值测试1', () => {
        class Test {
            @toNumber(100)
            age!: number;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).age).toBe(100);
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { age: 1 }).age).toBe(1);
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { age: false }).age).toBe(100);
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { age: true }).age).toBe(100);
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { age: [1, 2] }).age).toBe(100);
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { age: {} }).age).toBe(100);
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { age: '1' }).age).toBe(1);
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { age: undefined }).age).toBe(100);
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { age: null }).age).toBe(100);
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { age: /123/ }).age).toBe(100);
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { age: Symbol() }).age).toBe(100);
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { age: () => { } }).age).toBe(100);
        });
    });

    describe('装饰器默认值测试2', () => {
        class Test {
            @toNumber({ defaultValue: 100 })
            age!: number;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).age).toBe(100);
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { age: 1 }).age).toBe(1);
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { age: '1' }).age).toBe(1);
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { age: false }).age).toBe(100);
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { age: true }).age).toBe(100);
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { age: [1, 2] }).age).toBe(100);
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { age: {} }).age).toBe(100);
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { age: undefined }).age).toBe(100);
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { age: null }).age).toBe(100);
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { age: /123/ }).age).toBe(100);
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { age: Symbol() }).age).toBe(100);
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { age: () => { } }).age).toBe(100);
        });
    });

    describe('装饰器默认值优先级1', () => {
        class Test {
            @toNumber({ defaultValue: 1000 })
            age: number = 100;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).age).toBe(100);
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { age: 1 }).age).toBe(1);
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { age: '1' }).age).toBe(1);
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { age: false }).age).toBe(100);
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { age: true }).age).toBe(100);
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { age: [1, 2] }).age).toBe(100);
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { age: {} }).age).toBe(100);
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { age: undefined }).age).toBe(100);
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { age: null }).age).toBe(100);
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { age: /123/ }).age).toBe(100);
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { age: Symbol() }).age).toBe(100);
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { age: () => { } }).age).toBe(100);
        });
    });

    describe('装饰器默认值优先级2', () => {
        class Test {
            @toNumber(1000)
            age: number = 100;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).age).toBe(100);
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { age: 1 }).age).toBe(1);
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { age: '1' }).age).toBe(1);
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { age: false }).age).toBe(100);
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { age: true }).age).toBe(100);
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { age: [1, 2] }).age).toBe(100);
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { age: {} }).age).toBe(100);
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { age: undefined }).age).toBe(100);
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { age: null }).age).toBe(100);
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { age: /123/ }).age).toBe(100);
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { age: Symbol() }).age).toBe(100);
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { age: () => { } }).age).toBe(100);
        });
    });

    describe('装饰器执行键测试', () => {
        class Test {
            @toNumber({ keys: '1' })
            key1!: number;

            @toNumber({ keys: '2' })
            key2!: number;

            @toNumber()
            noKey!: number;

            @toNumber({ keys: ['1', '2'] })
            keyAll!: number;
        }

        describe('无执行键', () => {
            test(`不存在的属性`, () => {
                expect(executeTransform(Test, {})).toEqual({
                    noKey: 0
                });
            });
            test(`数字类型的属性`, () => {
                expect(executeTransform(Test, { noKey: 1 })).toEqual({
                    noKey: 1
                });
            });
            test(`字符串类型的属性`, () => {
                expect(executeTransform(Test, { noKey: '1' })).toEqual({
                    noKey: 1
                });
            });
            test(`boolean 类型的属性 false`, () => {
                expect(executeTransform(Test, { noKey: false })).toEqual({
                    noKey: 0
                });
            });
            test(`boolean 类型的属性 true`, () => {
                expect(executeTransform(Test, { noKey: true })).toEqual({
                    noKey: 0
                });
            });
            test(`数组类型的属性`, () => {
                expect(executeTransform(Test, { noKey: [1, 2] })).toEqual({
                    noKey: 0
                });
            });
            test(`对象类型的属性`, () => {
                expect(executeTransform(Test, { noKey: {} })).toEqual({
                    noKey: 0
                });
            });
            test(`undefined 属性`, () => {
                expect(executeTransform(Test, { noKey: undefined })).toEqual({
                    noKey: 0
                });
            });
            test(`null 属性`, () => {
                expect(executeTransform(Test, { noKey: null })).toEqual({
                    noKey: 0
                });
            });
            test(`正则属性`, () => {
                expect(executeTransform(Test, { noKey: /123/ })).toEqual({
                    noKey: 0
                });
            });
            test(`Symbol 属性`, () => {
                expect(executeTransform(Test, { noKey: Symbol() })).toEqual({
                    noKey: 0
                });
            });
            test(`Function 属性`, () => {
                expect(executeTransform(Test, { noKey: () => { } })).toEqual({
                    noKey: 0
                });
            });
        });

        describe('执行键1', () => {
            test(`不存在的属性`, () => {
                expect(executeTransform(Test, {}, { key: '1' })).toEqual({
                    key1: 0,
                    noKey: 0,
                    keyAll: 0
                });
            });
            test(`数字类型的属性`, () => {
                expect(executeTransform(Test, {
                    key1: 1,
                    key2: 1,
                    noKey: 1,
                    keyAll: 1
                }, { key: '1' })).toEqual({
                    key1: 1,
                    noKey: 1,
                    keyAll: 1
                });
            });
            test(`字符串类型的属性`, () => {
                expect(executeTransform(Test, {
                    key1: '1',
                    key2: '1',
                    noKey: '1',
                    keyAll: '1'
                }, { key: '1' })).toEqual({
                    key1: 1,
                    noKey: 1,
                    keyAll: 1
                });
            });
            test(`boolean 类型的属性 false`, () => {
                expect(executeTransform(Test, {
                    key1: false,
                    key2: false,
                    noKey: false,
                    keyAll: false
                }, { key: '1' })).toEqual({
                    key1: 0,
                    noKey: 0,
                    keyAll: 0
                });
            });
            test(`boolean 类型的属性 true`, () => {
                expect(executeTransform(Test, {
                    key1: true,
                    key2: true,
                    noKey: true,
                    keyAll: true
                }, { key: '1' })).toEqual({
                    key1: 0,
                    noKey: 0,
                    keyAll: 0
                });
            });
            test(`数组类型的属性`, () => {
                expect(executeTransform(Test, {
                    key1: [1, 2],
                    key2: [1, 2],
                    noKey: [1, 2],
                    keyAll: [1, 2]
                }, { key: '1' })).toEqual({
                    key1: 0,
                    noKey: 0,
                    keyAll: 0
                });
            });
            test(`对象类型的属性`, () => {
                expect(executeTransform(Test, {
                    key1: {},
                    key2: {},
                    noKey: {},
                    keyAll: {}
                }, { key: '1' })).toEqual({
                    key1: 0,
                    noKey: 0,
                    keyAll: 0
                });
            });
            test(`undefined 属性`, () => {
                expect(executeTransform(Test, {
                    key1: undefined,
                    key2: undefined,
                    noKey: undefined,
                    keyAll: undefined
                }, { key: '1' })).toEqual({
                    key1: 0,
                    noKey: 0,
                    keyAll: 0
                });
            });
            test(`null 属性`, () => {
                expect(executeTransform(Test, {
                    key1: null,
                    key2: null,
                    noKey: null,
                    keyAll: null
                }, { key: '1' })).toEqual({
                    key1: 0,
                    noKey: 0,
                    keyAll: 0
                });
            });
            test(`正则属性`, () => {
                expect(executeTransform(Test, {
                    key1: /123/,
                    key2: /123/,
                    noKey: /123/,
                    keyAll: /123/
                }, { key: '1' })).toEqual({
                    key1: 0,
                    noKey: 0,
                    keyAll: 0
                });
            });
            test(`Symbol 属性`, () => {
                expect(executeTransform(Test, {
                    key1: Symbol(),
                    key2: Symbol(),
                    noKey: Symbol(),
                    keyAll: Symbol()
                }, { key: '1' })).toEqual({
                    key1: 0,
                    noKey: 0,
                    keyAll: 0
                });
            });
            test(`Function 属性`, () => {
                expect(executeTransform(Test, {
                    key1: () => { },
                    key2: () => { },
                    noKey: () => { },
                    keyAll: () => { }
                }, { key: '1' })).toEqual({
                    key1: 0,
                    noKey: 0,
                    keyAll: 0
                });
            });
        });

        describe('执行键2', () => {
            test(`不存在的属性`, () => {
                expect(executeTransform(Test, {}, { key: '2' })).toEqual({
                    key2: 0,
                    noKey: 0,
                    keyAll: 0
                });
            });
            test(`数字类型的属性`, () => {
                expect(executeTransform(Test, {
                    key1: 1,
                    key2: 1,
                    noKey: 1,
                    keyAll: 1
                }, { key: '2' })).toEqual({
                    key2: 1,
                    noKey: 1,
                    keyAll: 1
                });
            });
            test(`字符串类型的属性`, () => {
                expect(executeTransform(Test, {
                    key1: '1',
                    key2: '1',
                    noKey: '1',
                    keyAll: '1'
                }, { key: '2' })).toEqual({
                    key2: 1,
                    noKey: 1,
                    keyAll: 1
                });
            });
            test(`boolean 类型的属性 false`, () => {
                expect(executeTransform(Test, {
                    key1: false,
                    key2: false,
                    noKey: false,
                    keyAll: false
                }, { key: '2' })).toEqual({
                    key2: 0,
                    noKey: 0,
                    keyAll: 0
                });
            });
            test(`boolean 类型的属性 true`, () => {
                expect(executeTransform(Test, {
                    key1: true,
                    key2: true,
                    noKey: true,
                    keyAll: true
                }, { key: '2' })).toEqual({
                    key2: 0,
                    noKey: 0,
                    keyAll: 0
                });
            });
            test(`数组类型的属性`, () => {
                expect(executeTransform(Test, {
                    key1: [1, 2],
                    key2: [1, 2],
                    noKey: [1, 2],
                    keyAll: [1, 2]
                }, { key: '2' })).toEqual({
                    key2: 0,
                    noKey: 0,
                    keyAll: 0
                });
            });
            test(`对象类型的属性`, () => {
                expect(executeTransform(Test, {
                    key1: {},
                    key2: {},
                    noKey: {},
                    keyAll: {}
                }, { key: '2' })).toEqual({
                    key2: 0,
                    noKey: 0,
                    keyAll: 0
                });
            });
            test(`undefined 属性`, () => {
                expect(executeTransform(Test, {
                    key1: undefined,
                    key2: undefined,
                    noKey: undefined,
                    keyAll: undefined
                }, { key: '2' })).toEqual({
                    key2: 0,
                    noKey: 0,
                    keyAll: 0
                });
            });
            test(`null 属性`, () => {
                expect(executeTransform(Test, {
                    key1: null,
                    key2: null,
                    noKey: null,
                    keyAll: null
                }, { key: '2' })).toEqual({
                    key2: 0,
                    noKey: 0,
                    keyAll: 0
                });
            });
            test(`正则属性`, () => {
                expect(executeTransform(Test, {
                    key1: /123/,
                    key2: /123/,
                    noKey: /123/,
                    keyAll: /123/
                }, { key: '2' })).toEqual({
                    key2: 0,
                    noKey: 0,
                    keyAll: 0
                });
            });
            test(`Symbol 属性`, () => {
                expect(executeTransform(Test, {
                    key1: Symbol(),
                    key2: Symbol(),
                    noKey: Symbol(),
                    keyAll: Symbol()
                }, { key: '2' })).toEqual({
                    key2: 0,
                    noKey: 0,
                    keyAll: 0
                });
            });
            test(`Function 属性`, () => {
                expect(executeTransform(Test, {
                    key1: () => { },
                    key2: () => { },
                    noKey: () => { },
                    keyAll: () => { }
                }, { key: '2' })).toEqual({
                    key2: 0,
                    noKey: 0,
                    keyAll: 0
                });
            });
        });
    });

    test('自动转换测试', () => {
        class Test {
            @toNumber({ autoTrans: true })
            auto!: number;

            @toNumber({ autoTrans: false })
            noAuto!: number;
        }
        expect(executeTransform(Test, {
            auto: '1',
            noAuto: '1'
        })).toEqual({
            auto: 1,
            noAuto: 0
        });
    });
});