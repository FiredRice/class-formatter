import { toBoolean, executeTransform } from '../../src';

describe('【toBoolean】装饰器测试', () => {
    describe('装饰器测试', () => {
        class Test {
            @toBoolean()
            bool!: boolean;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).bool).toBe(false);
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { bool: 1 }).bool).toBe(false);
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { bool: '1' }).bool).toBe(false);
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { bool: false }).bool).toBe(false);
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { bool: true }).bool).toBe(true);
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { bool: [1, 2] }).bool).toBe(false);
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { bool: {} }).bool).toBe(false);
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { bool: undefined }).bool).toBe(false);
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { bool: null }).bool).toBe(false);
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { bool: /123/ }).bool).toBe(false);
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { bool: Symbol() }).bool).toBe(false);
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { bool: () => { } }).bool).toBe(false);
        });
    });

    describe('模板默认值测试', () => {
        class Test {
            @toBoolean()
            bool: boolean = true;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).bool).toBe(true);
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { bool: 1 }).bool).toBe(true);
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { bool: '1' }).bool).toBe(true);
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { bool: false }).bool).toBe(false);
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { bool: true }).bool).toBe(true);
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { bool: [1, 2] }).bool).toBe(true);
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { bool: {} }).bool).toBe(true);
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { bool: undefined }).bool).toBe(true);
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { bool: null }).bool).toBe(true);
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { bool: /123/ }).bool).toBe(true);
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { bool: Symbol() }).bool).toBe(true);
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { bool: () => { } }).bool).toBe(true);
        });
    });

    describe('装饰器默认值测试1', () => {
        class Test {
            @toBoolean(true)
            bool!: boolean;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).bool).toBe(true);
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { bool: 1 }).bool).toBe(true);
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { bool: '1' }).bool).toBe(true);
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { bool: false }).bool).toBe(false);
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { bool: true }).bool).toBe(true);
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { bool: [1, 2] }).bool).toBe(true);
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { bool: {} }).bool).toBe(true);
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { bool: undefined }).bool).toBe(true);
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { bool: null }).bool).toBe(true);
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { bool: /123/ }).bool).toBe(true);
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { bool: Symbol() }).bool).toBe(true);
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { bool: () => { } }).bool).toBe(true);
        });
    });

    describe('装饰器默认值测试2', () => {
        class Test {
            @toBoolean({ defaultValue: true })
            bool!: boolean;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).bool).toBe(true);
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { bool: 1 }).bool).toBe(true);
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { bool: '1' }).bool).toBe(true);
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { bool: false }).bool).toBe(false);
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { bool: true }).bool).toBe(true);
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { bool: [1, 2] }).bool).toBe(true);
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { bool: {} }).bool).toBe(true);
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { bool: undefined }).bool).toBe(true);
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { bool: null }).bool).toBe(true);
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { bool: /123/ }).bool).toBe(true);
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { bool: Symbol() }).bool).toBe(true);
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { bool: () => { } }).bool).toBe(true);
        });
    });

    describe('装饰器默认值优先级1', () => {
        class Test {
            @toBoolean({ defaultValue: false })
            bool: boolean = true;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).bool).toBe(true);
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { bool: 1 }).bool).toBe(true);
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { bool: '1' }).bool).toBe(true);
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { bool: false }).bool).toBe(false);
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { bool: true }).bool).toBe(true);
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { bool: [1, 2] }).bool).toBe(true);
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { bool: {} }).bool).toBe(true);
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { bool: undefined }).bool).toBe(true);
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { bool: null }).bool).toBe(true);
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { bool: /123/ }).bool).toBe(true);
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { bool: Symbol() }).bool).toBe(true);
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { bool: () => { } }).bool).toBe(true);
        });
    });

    describe('装饰器默认值优先级2', () => {
        class Test {
            @toBoolean(false)
            bool: boolean = true;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).bool).toBe(true);
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { bool: 1 }).bool).toBe(true);
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { bool: '1' }).bool).toBe(true);
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { bool: false }).bool).toBe(false);
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { bool: true }).bool).toBe(true);
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { bool: [1, 2] }).bool).toBe(true);
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { bool: {} }).bool).toBe(true);
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { bool: undefined }).bool).toBe(true);
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { bool: null }).bool).toBe(true);
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { bool: /123/ }).bool).toBe(true);
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { bool: Symbol() }).bool).toBe(true);
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { bool: () => { } }).bool).toBe(true);
        });
    });

    describe('装饰器执行键测试', () => {
        class Test {
            @toBoolean({ keys: '1' })
            key1!: number;

            @toBoolean({ keys: '2' })
            key2!: number;

            @toBoolean()
            noKey!: number;

            @toBoolean({ keys: ['1', '2'] })
            keyAll!: number;
        }

        describe('无执行键', () => {
            test(`不存在的属性`, () => {
                expect(executeTransform(Test, {})).toEqual({
                    noKey: false
                });
            });
            test(`数字类型的属性`, () => {
                expect(executeTransform(Test, { noKey: 1 })).toEqual({
                    noKey: false
                });
            });
            test(`字符串类型的属性`, () => {
                expect(executeTransform(Test, { noKey: '1' })).toEqual({
                    noKey: false
                });
            });
            test(`boolean 类型的属性 false`, () => {
                expect(executeTransform(Test, { noKey: false })).toEqual({
                    noKey: false
                });
            });
            test(`boolean 类型的属性 true`, () => {
                expect(executeTransform(Test, { noKey: true })).toEqual({
                    noKey: true
                });
            });
            test(`数组类型的属性`, () => {
                expect(executeTransform(Test, { noKey: [1, 2] })).toEqual({
                    noKey: false
                });
            });
            test(`对象类型的属性`, () => {
                expect(executeTransform(Test, { noKey: {} })).toEqual({
                    noKey: false
                });
            });
            test(`undefined 属性`, () => {
                expect(executeTransform(Test, { noKey: undefined })).toEqual({
                    noKey: false
                });
            });
            test(`null 属性`, () => {
                expect(executeTransform(Test, { noKey: null })).toEqual({
                    noKey: false
                });
            });
            test(`正则属性`, () => {
                expect(executeTransform(Test, { noKey: /123/ })).toEqual({
                    noKey: false
                });
            });
            test(`Symbol 属性`, () => {
                expect(executeTransform(Test, { noKey: Symbol() })).toEqual({
                    noKey: false
                });
            });
            test(`Function 属性`, () => {
                expect(executeTransform(Test, { noKey: () => { } })).toEqual({
                    noKey: false
                });
            });
        });

        describe('执行键1', () => {
            test(`不存在的属性`, () => {
                expect(executeTransform(Test, {}, { key: '1' })).toEqual({
                    key1: false,
                    noKey: false,
                    keyAll: false
                });
            });
            test(`数字类型的属性`, () => {
                expect(executeTransform(Test, { 
                    key1: 1,
                    key2: 1,
                    noKey: 1,
                    keyAll: 1
                }, { key: '1' })).toEqual({
                    key1: false,
                    noKey: false,
                    keyAll: false
                });
            });
            test(`字符串类型的属性`, () => {
                expect(executeTransform(Test, { 
                    key1: '1',
                    key2: '1',
                    noKey: '1',
                    keyAll: '1'
                }, { key: '1' })).toEqual({
                    key1: false,
                    noKey: false,
                    keyAll: false
                });
            });
            test(`boolean 类型的属性 false`, () => {
                expect(executeTransform(Test, { 
                    key1: false,
                    key2: false,
                    noKey: false,
                    keyAll: false
                }, { key: '1' })).toEqual({
                    key1: false,
                    noKey: false,
                    keyAll: false
                });
            });
            test(`boolean 类型的属性 true`, () => {
                expect(executeTransform(Test, { 
                    key1: true,
                    key2: true,
                    noKey: true,
                    keyAll: true
                }, { key: '1' })).toEqual({
                    key1: true,
                    noKey: true,
                    keyAll: true
                });
            });
            test(`数组类型的属性`, () => {
                expect(executeTransform(Test, { 
                    key1: [1, 2],
                    key2: [1, 2],
                    noKey: [1, 2],
                    keyAll: [1, 2]
                }, { key: '1' })).toEqual({
                    key1: false,
                    noKey: false,
                    keyAll: false
                });
            });
            test(`对象类型的属性`, () => {
                expect(executeTransform(Test, { 
                    key1: {},
                    key2: {},
                    noKey: {},
                    keyAll: {}
                }, { key: '1' })).toEqual({
                    key1: false,
                    noKey: false,
                    keyAll: false
                });
            });
            test(`undefined 属性`, () => {
                expect(executeTransform(Test, { 
                    key1: undefined,
                    key2: undefined,
                    noKey: undefined,
                    keyAll: undefined
                }, { key: '1' })).toEqual({
                    key1: false,
                    noKey: false,
                    keyAll: false
                });
            });
            test(`null 属性`, () => {
                expect(executeTransform(Test, { 
                    key1: null,
                    key2: null,
                    noKey: null,
                    keyAll: null
                }, { key: '1' })).toEqual({
                    key1: false,
                    noKey: false,
                    keyAll: false
                });
            });
            test(`正则属性`, () => {
                expect(executeTransform(Test, { 
                    key1: /123/,
                    key2: /123/,
                    noKey: /123/,
                    keyAll: /123/
                }, { key: '1' })).toEqual({
                    key1: false,
                    noKey: false,
                    keyAll: false
                });
            });
            test(`Symbol 属性`, () => {
                expect(executeTransform(Test, { 
                    key1: Symbol(),
                    key2: Symbol(),
                    noKey: Symbol(),
                    keyAll: Symbol()
                }, { key: '1' })).toEqual({
                    key1: false,
                    noKey: false,
                    keyAll: false
                });
            });
            test(`Function 属性`, () => {
                expect(executeTransform(Test, { 
                    key1: () => {},
                    key2: () => {},
                    noKey: () => {},
                    keyAll: () => {}
                }, { key: '1' })).toEqual({
                    key1: false,
                    noKey: false,
                    keyAll: false
                });
            });
        });

        describe('执行键2', () => {
            test(`不存在的属性`, () => {
                expect(executeTransform(Test, {}, { key: '2' })).toEqual({
                    key2: false,
                    noKey: false,
                    keyAll: false
                });
            });
            test(`数字类型的属性`, () => {
                expect(executeTransform(Test, { 
                    key1: 1,
                    key2: 1,
                    noKey: 1,
                    keyAll: 1
                }, { key: '2' })).toEqual({
                    key2: false,
                    noKey: false,
                    keyAll: false
                });
            });
            test(`字符串类型的属性`, () => {
                expect(executeTransform(Test, { 
                    key1: '1',
                    key2: '1',
                    noKey: '1',
                    keyAll: '1'
                }, { key: '2' })).toEqual({
                    key2: false,
                    noKey: false,
                    keyAll: false
                });
            });
            test(`boolean 类型的属性 false`, () => {
                expect(executeTransform(Test, { 
                    key1: false,
                    key2: false,
                    noKey: false,
                    keyAll: false
                }, { key: '2' })).toEqual({
                    key2: false,
                    noKey: false,
                    keyAll: false
                });
            });
            test(`boolean 类型的属性 true`, () => {
                expect(executeTransform(Test, { 
                    key1: true,
                    key2: true,
                    noKey: true,
                    keyAll: true
                }, { key: '2' })).toEqual({
                    key2: true,
                    noKey: true,
                    keyAll: true
                });
            });
            test(`数组类型的属性`, () => {
                expect(executeTransform(Test, { 
                    key1: [1, 2],
                    key2: [1, 2],
                    noKey: [1, 2],
                    keyAll: [1, 2]
                }, { key: '2' })).toEqual({
                    key2: false,
                    noKey: false,
                    keyAll: false
                });
            });
            test(`对象类型的属性`, () => {
                expect(executeTransform(Test, { 
                    key1: {},
                    key2: {},
                    noKey: {},
                    keyAll: {}
                }, { key: '2' })).toEqual({
                    key2: false,
                    noKey: false,
                    keyAll: false
                });
            });
            test(`undefined 属性`, () => {
                expect(executeTransform(Test, { 
                    key1: undefined,
                    key2: undefined,
                    noKey: undefined,
                    keyAll: undefined
                }, { key: '2' })).toEqual({
                    key2: false,
                    noKey: false,
                    keyAll: false
                });
            });
            test(`null 属性`, () => {
                expect(executeTransform(Test, { 
                    key1: null,
                    key2: null,
                    noKey: null,
                    keyAll: null
                }, { key: '2' })).toEqual({
                    key2: false,
                    noKey: false,
                    keyAll: false
                });
            });
            test(`正则属性`, () => {
                expect(executeTransform(Test, { 
                    key1: /123/,
                    key2: /123/,
                    noKey: /123/,
                    keyAll: /123/
                }, { key: '2' })).toEqual({
                    key2: false,
                    noKey: false,
                    keyAll: false
                });
            });
            test(`Symbol 属性`, () => {
                expect(executeTransform(Test, { 
                    key1: Symbol(),
                    key2: Symbol(),
                    noKey: Symbol(),
                    keyAll: Symbol()
                }, { key: '2' })).toEqual({
                    key2: false,
                    noKey: false,
                    keyAll: false
                });
            });
            test(`Function 属性`, () => {
                expect(executeTransform(Test, { 
                    key1: () => {},
                    key2: () => {},
                    noKey: () => {},
                    keyAll: () => {}
                }, { key: '2' })).toEqual({
                    key2: false,
                    noKey: false,
                    keyAll: false
                });
            });
        });
    });
});