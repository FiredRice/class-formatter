import { toArray, executeTransform, toString } from '../../src';

describe('【toArray】装饰器测试', () => {
    describe('装饰器测试', () => {
        class Test {
            @toArray()
            arr!: any[];
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ arr: [] });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { arr: 1 })).toEqual({ arr: [] });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { arr: '1' })).toEqual({ arr: [] });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { arr: false })).toEqual({ arr: [] });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { arr: true })).toEqual({ arr: [] });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { arr: [1, 2] })).toEqual({ arr: [1, 2] });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { arr: {} })).toEqual({ arr: [] });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { arr: undefined })).toEqual({ arr: [] });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { arr: null })).toEqual({ arr: [] });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { arr: /132/ })).toEqual({ arr: [] });
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { arr: Symbol() })).toEqual({ arr: [] });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { arr: () => { } })).toEqual({ arr: [] });
        });
    });

    describe('模板默认值测试', () => {
        class Test {
            @toArray()
            arr: any[] = [1, 2];
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ arr: [1, 2] });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { arr: 1 })).toEqual({ arr: [1, 2] });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { arr: '1' })).toEqual({ arr: [1, 2] });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { arr: false })).toEqual({ arr: [1, 2] });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { arr: true })).toEqual({ arr: [1, 2] });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { arr: [1] })).toEqual({ arr: [1] });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { bool: {} })).toEqual({ arr: [1, 2] });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { arr: undefined })).toEqual({ arr: [1, 2] });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { arr: null })).toEqual({ arr: [1, 2] });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { arr: /132/ })).toEqual({ arr: [1, 2] });
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { arr: Symbol() })).toEqual({ arr: [1, 2] });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { arr: () => { } })).toEqual({ arr: [1, 2] });
        });
    });

    describe('装饰器默认值测试1', () => {
        class Test {
            @toArray({ defaultValue: [1, 2] })
            arr!: any[];
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ arr: [1, 2] });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { arr: 1 })).toEqual({ arr: [1, 2] });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { arr: '1' })).toEqual({ arr: [1, 2] });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { arr: false })).toEqual({ arr: [1, 2] });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { arr: true })).toEqual({ arr: [1, 2] });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { arr: [1] })).toEqual({ arr: [1] });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { bool: {} })).toEqual({ arr: [1, 2] });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { arr: undefined })).toEqual({ arr: [1, 2] });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { arr: null })).toEqual({ arr: [1, 2] });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { arr: /132/ })).toEqual({ arr: [1, 2] });
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { arr: Symbol() })).toEqual({ arr: [1, 2] });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { arr: () => { } })).toEqual({ arr: [1, 2] });
        });
    });

    describe('装饰器默认值优先级', () => {
        class Test {
            @toArray({ defaultValue: [1, 2, 3] })
            arr: any[] = [1, 2];
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({ arr: [1, 2] });
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { arr: 1 })).toEqual({ arr: [1, 2] });
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { arr: '1' })).toEqual({ arr: [1, 2] });
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { arr: false })).toEqual({ arr: [1, 2] });
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { arr: true })).toEqual({ arr: [1, 2] });
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { arr: [1] })).toEqual({ arr: [1] });
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { bool: {} })).toEqual({ arr: [1, 2] });
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { arr: undefined })).toEqual({ arr: [1, 2] });
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { arr: null })).toEqual({ arr: [1, 2] });
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { arr: /132/ })).toEqual({ arr: [1, 2] });
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { arr: Symbol() })).toEqual({ arr: [1, 2] });
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { arr: () => { } })).toEqual({ arr: [1, 2] });
        });
    });

    describe('装饰器执行键测试', () => {
        class Test {
            @toArray({ keys: '1' })
            key1!: number;

            @toArray({ keys: '2' })
            key2!: number;

            @toArray()
            noKey!: number;

            @toArray({ keys: ['1', '2'] })
            keyAll!: number;
        }

        describe('无执行键', () => {
            test(`不存在的属性`, () => {
                expect(executeTransform(Test, {})).toEqual({
                    noKey: []
                });
            });
            test(`数字类型的属性`, () => {
                expect(executeTransform(Test, { noKey: 1 })).toEqual({
                    noKey: []
                });
            });
            test(`字符串类型的属性`, () => {
                expect(executeTransform(Test, { noKey: '1' })).toEqual({
                    noKey: []
                });
            });
            test(`boolean 类型的属性 false`, () => {
                expect(executeTransform(Test, { noKey: false })).toEqual({
                    noKey: []
                });
            });
            test(`boolean 类型的属性 true`, () => {
                expect(executeTransform(Test, { noKey: true })).toEqual({
                    noKey: []
                });
            });
            test(`数组类型的属性`, () => {
                expect(executeTransform(Test, { noKey: [1] })).toEqual({
                    noKey: [1]
                });
            });
            test(`对象类型的属性`, () => {
                expect(executeTransform(Test, { noKey: {} })).toEqual({
                    noKey: []
                });
            });
            test(`undefined 属性`, () => {
                expect(executeTransform(Test, { noKey: undefined })).toEqual({
                    noKey: []
                });
            });
            test(`null 属性`, () => {
                expect(executeTransform(Test, { noKey: null })).toEqual({
                    noKey: []
                });
            });
            test(`正则属性`, () => {
                expect(executeTransform(Test, { noKey: /123/ })).toEqual({
                    noKey: []
                });
            });
            test(`Symbol 属性`, () => {
                expect(executeTransform(Test, { noKey: Symbol() })).toEqual({
                    noKey: []
                });
            });
            test(`Function 属性`, () => {
                expect(executeTransform(Test, { noKey: () => { } })).toEqual({
                    noKey: []
                });
            });
        });

        describe('执行键1', () => {
            test(`不存在的属性`, () => {
                expect(executeTransform(Test, {}, { key: '1' })).toEqual({
                    key1: [],
                    noKey: [],
                    keyAll: []
                });
            });
            test(`数字类型的属性`, () => {
                expect(executeTransform(Test, {
                    key1: 1,
                    key2: 1,
                    noKey: 1,
                    keyAll: 1
                }, { key: '1' })).toEqual({
                    key1: [],
                    noKey: [],
                    keyAll: []
                });
            });
            test(`字符串类型的属性`, () => {
                expect(executeTransform(Test, {
                    key1: '1',
                    key2: '1',
                    noKey: '1',
                    keyAll: '1'
                }, { key: '1' })).toEqual({
                    key1: [],
                    noKey: [],
                    keyAll: []
                });
            });
            test(`boolean 类型的属性 false`, () => {
                expect(executeTransform(Test, {
                    key1: false,
                    key2: false,
                    noKey: false,
                    keyAll: false
                }, { key: '1' })).toEqual({
                    key1: [],
                    noKey: [],
                    keyAll: []
                });
            });
            test(`boolean 类型的属性 true`, () => {
                expect(executeTransform(Test, {
                    key1: true,
                    key2: true,
                    noKey: true,
                    keyAll: true
                }, { key: '1' })).toEqual({
                    key1: [],
                    noKey: [],
                    keyAll: []
                });
            });
            test(`数组类型的属性`, () => {
                expect(executeTransform(Test, {
                    key1: [1],
                    key2: [1],
                    noKey: [1],
                    keyAll: [1]
                }, { key: '1' })).toEqual({
                    key1: [1],
                    noKey: [1],
                    keyAll: [1]
                });
            });
            test(`对象类型的属性`, () => {
                expect(executeTransform(Test, {
                    key1: {},
                    key2: {},
                    noKey: {},
                    keyAll: {}
                }, { key: '1' })).toEqual({
                    key1: [],
                    noKey: [],
                    keyAll: []
                });
            });
            test(`undefined 属性`, () => {
                expect(executeTransform(Test, {
                    key1: undefined,
                    key2: undefined,
                    noKey: undefined,
                    keyAll: undefined
                }, { key: '1' })).toEqual({
                    key1: [],
                    noKey: [],
                    keyAll: []
                });
            });
            test(`null 属性`, () => {
                expect(executeTransform(Test, {
                    key1: null,
                    key2: null,
                    noKey: null,
                    keyAll: null
                }, { key: '1' })).toEqual({
                    key1: [],
                    noKey: [],
                    keyAll: []
                });
            });
            test(`正则属性`, () => {
                expect(executeTransform(Test, {
                    key1: /123/,
                    key2: /123/,
                    noKey: /123/,
                    keyAll: /123/
                }, { key: '1' })).toEqual({
                    key1: [],
                    noKey: [],
                    keyAll: []
                });
            });
            test(`Symbol 属性`, () => {
                expect(executeTransform(Test, {
                    key1: Symbol(),
                    key2: Symbol(),
                    noKey: Symbol(),
                    keyAll: Symbol()
                }, { key: '1' })).toEqual({
                    key1: [],
                    noKey: [],
                    keyAll: []
                });
            });
            test(`Function 属性`, () => {
                expect(executeTransform(Test, {
                    key1: () => { },
                    key2: () => { },
                    noKey: () => { },
                    keyAll: () => { }
                }, { key: '1' })).toEqual({
                    key1: [],
                    noKey: [],
                    keyAll: []
                });
            });
        });

        describe('执行键2', () => {
            test(`不存在的属性`, () => {
                expect(executeTransform(Test, {}, { key: '2' })).toEqual({
                    key2: [],
                    noKey: [],
                    keyAll: []
                });
            });
            test(`数字类型的属性`, () => {
                expect(executeTransform(Test, {
                    key1: 1,
                    key2: 1,
                    noKey: 1,
                    keyAll: 1
                }, { key: '2' })).toEqual({
                    key2: [],
                    noKey: [],
                    keyAll: []
                });
            });
            test(`字符串类型的属性`, () => {
                expect(executeTransform(Test, {
                    key1: '1',
                    key2: '1',
                    noKey: '1',
                    keyAll: '1'
                }, { key: '2' })).toEqual({
                    key2: [],
                    noKey: [],
                    keyAll: []
                });
            });
            test(`boolean 类型的属性 false`, () => {
                expect(executeTransform(Test, {
                    key1: false,
                    key2: false,
                    noKey: false,
                    keyAll: false
                }, { key: '2' })).toEqual({
                    key2: [],
                    noKey: [],
                    keyAll: []
                });
            });
            test(`boolean 类型的属性 true`, () => {
                expect(executeTransform(Test, {
                    key1: true,
                    key2: true,
                    noKey: true,
                    keyAll: true
                }, { key: '2' })).toEqual({
                    key2: [],
                    noKey: [],
                    keyAll: []
                });
            });
            test(`数组类型的属性`, () => {
                expect(executeTransform(Test, {
                    key1: [1],
                    key2: [1],
                    noKey: [1],
                    keyAll: [1]
                }, { key: '2' })).toEqual({
                    key2: [1],
                    noKey: [1],
                    keyAll: [1]
                });
            });
            test(`对象类型的属性`, () => {
                expect(executeTransform(Test, {
                    key1: {},
                    key2: {},
                    noKey: {},
                    keyAll: {}
                }, { key: '2' })).toEqual({
                    key2: [],
                    noKey: [],
                    keyAll: []
                });
            });
            test(`undefined 属性`, () => {
                expect(executeTransform(Test, {
                    key1: undefined,
                    key2: undefined,
                    noKey: undefined,
                    keyAll: undefined
                }, { key: '2' })).toEqual({
                    key2: [],
                    noKey: [],
                    keyAll: []
                });
            });
            test(`null 属性`, () => {
                expect(executeTransform(Test, {
                    key1: null,
                    key2: null,
                    noKey: null,
                    keyAll: null
                }, { key: '2' })).toEqual({
                    key2: [],
                    noKey: [],
                    keyAll: []
                });
            });
            test(`正则属性`, () => {
                expect(executeTransform(Test, {
                    key1: /123/,
                    key2: /123/,
                    noKey: /123/,
                    keyAll: /123/
                }, { key: '2' })).toEqual({
                    key2: [],
                    noKey: [],
                    keyAll: []
                });
            });
            test(`Symbol 属性`, () => {
                expect(executeTransform(Test, {
                    key1: Symbol(),
                    key2: Symbol(),
                    noKey: Symbol(),
                    keyAll: Symbol()
                }, { key: '2' })).toEqual({
                    key2: [],
                    noKey: [],
                    keyAll: []
                });
            });
            test(`Function 属性`, () => {
                expect(executeTransform(Test, {
                    key1: () => { },
                    key2: () => { },
                    noKey: () => { },
                    keyAll: () => { }
                }, { key: '2' })).toEqual({
                    key2: [],
                    noKey: [],
                    keyAll: []
                });
            });
        });
    });

    describe('类型转换测试', () => {

        describe('单层转换', () => {
            class Target {
                @toString()
                key!: string;
            }
            class Test {
                @toArray(Target)
                arr!: Target[];
            }

            test(`不存在的属性`, () => {
                expect(executeTransform(Test, {})).toEqual({
                    arr: []
                });
            });

            test(`数组有非法值`, () => {
                expect(executeTransform(Test, { arr: [{}] })).toEqual({
                    arr: [{ key: '' }]
                });
            });

            test(`数组有合非法值`, () => {
                expect(executeTransform(Test, { arr: [{ key: '张三' }] })).toEqual({
                    arr: [{ key: '张三' }]
                });
            });

            test(`超长数组非法值`, () => {
                const arr: any[] = new Array(1000).fill(1);
                const resultArr: any[] = new Array(1000).fill({ key: '' });
                expect(executeTransform(Test, { arr })).toEqual({
                    arr: resultArr
                });
            });

            test(`超长数组合法值`, () => {
                const arr: any[] = new Array(1000).fill({ key: '张三' });
                const resultArr: any[] = new Array(1000).fill({ key: '张三' });
                expect(executeTransform(Test, { arr })).toEqual({
                    arr: resultArr
                });
            });
        });

        describe('多层转换', () => {
            class Target2 {
                @toString()
                key!: string;
            }
            class Target1 {
                @toArray({ ClassType: Target2, defaultValue: [{}] })
                arr!: Target2[];
            }

            class Test {
                @toArray(Target1)
                arr!: Target1[];
            }

            test(`不存在的属性`, () => {
                expect(executeTransform(Test, {})).toEqual({
                    arr: []
                });
            });

            test(`数组有非法值1`, () => {
                expect(executeTransform(Test, { arr: [{}] })).toEqual({
                    arr: [{ arr: [{ key: '' }] }]
                });
            });

            test(`数组有非法值2`, () => {
                expect(executeTransform(Test, { arr: [{ arr: 4 }] })).toEqual({
                    arr: [{ arr: [{ key: '' }] }]
                });
            });

            test(`数组有非法值3`, () => {
                expect(executeTransform(Test, { arr: [{ arr: [{ key: 1 }] }] })).toEqual({
                    arr: [{ arr: [{ key: '1' }] }]
                });
            });

            test(`数组有合非法值1`, () => {
                expect(executeTransform(Test, { arr: [{ arr: [] }] })).toEqual({
                    arr: [{ arr: [] }]
                });
            });

            test(`数组有合非法值2`, () => {
                expect(executeTransform(Test, { arr: [{ arr: [{ key: '张三' }, { key: '李四' }] }] })).toEqual({
                    arr: [{ arr: [{ key: '张三' }, { key: '李四' }] }]
                });
            });
        });

        describe('模板自循环', () => {
            class Test {
                @toArray({ ClassType: Test, defaultValue: [{}] })
                arr!: Test[];
            }

            test(`不存在的属性`, () => {
                const arr: any[] = [{}];
                let target = arr[0];;
                for (let i = 0; i < 50; i++) {
                    target.arr = [{}];
                    target = target.arr[0];
                }
                expect(executeTransform(Test, {})).toEqual({
                    arr
                });
            });

            test(`存在空属性1`, () => {
                expect(executeTransform(Test, { arr: [] })).toEqual({
                    arr: []
                });
            });
            test(`存在空属性2`, () => {
                expect(executeTransform(Test, { arr: [{ arr: [] }] })).toEqual({
                    arr: [{ arr: [] }]
                });
            });

            test(`深度限制`, () => {
                const arr: any[] = [{}];
                let target = arr[0];;
                for (let i = 0; i < 3; i++) {
                    target.arr = [{}];
                    target = target.arr[0];
                }
                expect(executeTransform(Test, {}, { deep: 3 })).toEqual({
                    arr
                });
            });
        });
    });

    describe('map', () => {
        class Test {
            @toArray({ map: (item, index) => (index + 1) as any })
            arr!: any[];
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {})).toEqual({
                arr: []
            });
        });

        test(`存在属性`, () => {
            expect(executeTransform(Test, { arr: [{}, {}] })).toEqual({
                arr: [1, 2]
            });
        });

    });
});