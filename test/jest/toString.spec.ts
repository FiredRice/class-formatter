import { toString, executeTransform, TransModel } from '../../src';

describe('【toString】装饰器测试', () => {

    describe('装饰器测试', () => {
        @TransModel
        class Test {
            @toString()
            name!: string;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).name).toBe('');
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { name: 1 }).name).toBe('1');
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { name: '1' }).name).toBe('1');
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { name: false }).name).toBe('');
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { name: true }).name).toBe('');
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { name: [1, 2] }).name).toBe('');
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { name: {} }).name).toBe('');
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { name: undefined }).name).toBe('');
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { name: null }).name).toBe('');
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { name: /123/ }).name).toBe('');
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { name: Symbol() }).name).toBe('');
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { name: () => { } }).name).toBe('');
        });
    });

    describe('模板默认值测试', () => {
        @TransModel
        class Test {
            @toString()
            name: string = '张三';
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).name).toBe('张三');
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { name: 1 }).name).toBe('1');
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { name: '1' }).name).toBe('1');
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { name: false }).name).toBe('张三');
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { name: true }).name).toBe('张三');
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { name: [1, 2] }).name).toBe('张三');
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { name: {} }).name).toBe('张三');
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { name: undefined }).name).toBe('张三');
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { name: null }).name).toBe('张三');
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { name: /123/ }).name).toBe('张三');
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { name: Symbol() }).name).toBe('张三');
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { name: () => { } }).name).toBe('张三');
        });
    });

    describe('装饰器默认值测试1', () => {
        @TransModel
        class Test {
            @toString('张三')
            name!: string;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).name).toBe('张三');
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { name: 1 }).name).toBe('1');
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { name: '1' }).name).toBe('1');
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { name: false }).name).toBe('张三');
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { name: true }).name).toBe('张三');
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { name: [1, 2] }).name).toBe('张三');
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { name: {} }).name).toBe('张三');
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { name: undefined }).name).toBe('张三');
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { name: null }).name).toBe('张三');
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { name: /123/ }).name).toBe('张三');
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { name: Symbol() }).name).toBe('张三');
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { name: () => { } }).name).toBe('张三');
        });
    });

    describe('装饰器默认值测试2', () => {
        @TransModel
        class Test {
            @toString({ defaultValue: '张三' })
            name!: string;
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).name).toBe('张三');
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { name: 1 }).name).toBe('1');
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { name: '1' }).name).toBe('1');
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { name: false }).name).toBe('张三');
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { name: true }).name).toBe('张三');
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { name: [1, 2] }).name).toBe('张三');
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { name: {} }).name).toBe('张三');
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { name: undefined }).name).toBe('张三');
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { name: null }).name).toBe('张三');
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { name: /123/ }).name).toBe('张三');
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { name: Symbol() }).name).toBe('张三');
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { name: () => { } }).name).toBe('张三');
        });
    });

    describe('装饰器默认值优先级1', () => {
        @TransModel
        class Test {
            @toString({ defaultValue: '李四' })
            name: string = '张三';
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).name).toBe('张三');
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { name: 1 }).name).toBe('1');
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { name: '1' }).name).toBe('1');
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { name: false }).name).toBe('张三');
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { name: true }).name).toBe('张三');
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { name: [1, 2] }).name).toBe('张三');
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { name: {} }).name).toBe('张三');
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { name: undefined }).name).toBe('张三');
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { name: null }).name).toBe('张三');
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { name: /123/ }).name).toBe('张三');
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { name: Symbol() }).name).toBe('张三');
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { name: () => { } }).name).toBe('张三');
        });
    });

    describe('装饰器默认值优先级2', () => {
        @TransModel
        class Test {
            @toString('李四')
            name: string = '张三';
        }

        test(`不存在的属性`, () => {
            expect(executeTransform(Test, {}).name).toBe('张三');
        });
        test(`数字类型的属性`, () => {
            expect(executeTransform(Test, { name: 1 }).name).toBe('1');
        });
        test(`字符串类型的属性`, () => {
            expect(executeTransform(Test, { name: '1' }).name).toBe('1');
        });
        test(`boolean 类型的属性 false`, () => {
            expect(executeTransform(Test, { name: false }).name).toBe('张三');
        });
        test(`boolean 类型的属性 true`, () => {
            expect(executeTransform(Test, { name: true }).name).toBe('张三');
        });
        test(`数组类型的属性`, () => {
            expect(executeTransform(Test, { name: [1, 2] }).name).toBe('张三');
        });
        test(`对象类型的属性`, () => {
            expect(executeTransform(Test, { name: {} }).name).toBe('张三');
        });
        test(`undefined 属性`, () => {
            expect(executeTransform(Test, { name: undefined }).name).toBe('张三');
        });
        test(`null 属性`, () => {
            expect(executeTransform(Test, { name: null }).name).toBe('张三');
        });
        test(`正则属性`, () => {
            expect(executeTransform(Test, { name: /123/ }).name).toBe('张三');
        });
        test(`Symbol 属性`, () => {
            expect(executeTransform(Test, { name: Symbol() }).name).toBe('张三');
        });
        test(`Function 属性`, () => {
            expect(executeTransform(Test, { name: () => { } }).name).toBe('张三');
        });
    });

    describe('装饰器执行键测试', () => {
        @TransModel
        class Test {
            @toString({ keys: '1' })
            name!: string;

            @toString({ keys: '2' })
            sex!: string;

            @toString()
            address!: string;

            @toString({ keys: ['1', '2'] })
            phone!: string;
        }

        describe('无执行键', () => {
            test(`不存在的属性`, () => {
                expect(executeTransform(Test, {})).toEqual({
                    address: ''
                });
            });
            test(`数字类型的属性`, () => {
                expect(executeTransform(Test, { address: 1 })).toEqual({
                    address: '1'
                });
            });
            test(`字符串类型的属性`, () => {
                expect(executeTransform(Test, { address: '1' })).toEqual({
                    address: '1'
                });
            });
            test(`boolean 类型的属性 false`, () => {
                expect(executeTransform(Test, { address: false })).toEqual({
                    address: ''
                });
            });
            test(`boolean 类型的属性 true`, () => {
                expect(executeTransform(Test, { address: true })).toEqual({
                    address: ''
                });
            });
            test(`数组类型的属性`, () => {
                expect(executeTransform(Test, { address: [1, 2] })).toEqual({
                    address: ''
                });
            });
            test(`对象类型的属性`, () => {
                expect(executeTransform(Test, { address: {} })).toEqual({
                    address: ''
                });
            });
            test(`undefined 属性`, () => {
                expect(executeTransform(Test, { address: undefined })).toEqual({
                    address: ''
                });
            });
            test(`null 属性`, () => {
                expect(executeTransform(Test, { address: null })).toEqual({
                    address: ''
                });
            });
            test(`正则属性`, () => {
                expect(executeTransform(Test, { address: /123/ })).toEqual({
                    address: ''
                });
            });
            test(`Symbol 属性`, () => {
                expect(executeTransform(Test, { address: Symbol() })).toEqual({
                    address: ''
                });
            });
            test(`Function 属性`, () => {
                expect(executeTransform(Test, { address: () => { } })).toEqual({
                    address: ''
                });
            });
        });

        describe('执行键1', () => {
            test(`不存在的属性`, () => {
                expect(executeTransform(Test, {}, { key: '1' })).toEqual({
                    name: '',
                    address: '',
                    phone: ''
                });
            });
            test(`数字类型的属性`, () => {
                expect(executeTransform(Test, { address: 1 }, { key: '1' })).toEqual({
                    name: '',
                    address: '1',
                    phone: ''
                });
            });
            test(`字符串类型的属性`, () => {
                expect(executeTransform(Test, { address: '1' }, { key: '1' })).toEqual({
                    name: '',
                    address: '1',
                    phone: ''
                });
            });
            test(`boolean 类型的属性 false`, () => {
                expect(executeTransform(Test, { address: false }, { key: '1' })).toEqual({
                    name: '',
                    address: '',
                    phone: ''
                });
            });
            test(`boolean 类型的属性 true`, () => {
                expect(executeTransform(Test, { address: true }, { key: '1' })).toEqual({
                    name: '',
                    address: '',
                    phone: ''
                });
            });
            test(`数组类型的属性`, () => {
                expect(executeTransform(Test, { address: [1, 2] }, { key: '1' })).toEqual({
                    name: '',
                    address: '',
                    phone: ''
                });
            });
            test(`对象类型的属性`, () => {
                expect(executeTransform(Test, { address: {} }, { key: '1' })).toEqual({
                    name: '',
                    address: '',
                    phone: ''
                });
            });
            test(`undefined 属性`, () => {
                expect(executeTransform(Test, { address: undefined }, { key: '1' })).toEqual({
                    name: '',
                    address: '',
                    phone: ''
                });
            });
            test(`null 属性`, () => {
                expect(executeTransform(Test, { address: null }, { key: '1' })).toEqual({
                    name: '',
                    address: '',
                    phone: ''
                });
            });
            test(`正则属性`, () => {
                expect(executeTransform(Test, { address: /123/ }, { key: '1' })).toEqual({
                    name: '',
                    address: '',
                    phone: ''
                });
            });
            test(`Symbol 属性`, () => {
                expect(executeTransform(Test, { address: Symbol() }, { key: '1' })).toEqual({
                    name: '',
                    address: '',
                    phone: ''
                });
            });
            test(`Function 属性`, () => {
                expect(executeTransform(Test, { address: () => { } }, { key: '1' })).toEqual({
                    name: '',
                    address: '',
                    phone: ''
                });
            });
        });

        describe('执行键2', () => {
            test(`不存在的属性`, () => {
                expect(executeTransform(Test, {}, { key: '2' })).toEqual({
                    sex: '',
                    address: '',
                    phone: ''
                });
            });
            test(`数字类型的属性`, () => {
                expect(executeTransform(Test, { address: 1 }, { key: '2' })).toEqual({
                    sex: '',
                    address: '1',
                    phone: ''
                });
            });
            test(`字符串类型的属性`, () => {
                expect(executeTransform(Test, { address: '1' }, { key: '2' })).toEqual({
                    sex: '',
                    address: '1',
                    phone: ''
                });
            });
            test(`boolean 类型的属性 false`, () => {
                expect(executeTransform(Test, { address: false }, { key: '2' })).toEqual({
                    sex: '',
                    address: '',
                    phone: ''
                });
            });
            test(`boolean 类型的属性 true`, () => {
                expect(executeTransform(Test, { address: true }, { key: '2' })).toEqual({
                    sex: '',
                    address: '',
                    phone: ''
                });
            });
            test(`数组类型的属性`, () => {
                expect(executeTransform(Test, { address: [1, 2] }, { key: '2' })).toEqual({
                    sex: '',
                    address: '',
                    phone: ''
                });
            });
            test(`对象类型的属性`, () => {
                expect(executeTransform(Test, { address: {} }, { key: '2' })).toEqual({
                    sex: '',
                    address: '',
                    phone: ''
                });
            });
            test(`undefined 属性`, () => {
                expect(executeTransform(Test, { address: undefined }, { key: '2' })).toEqual({
                    sex: '',
                    address: '',
                    phone: ''
                });
            });
            test(`null 属性`, () => {
                expect(executeTransform(Test, { address: null }, { key: '2' })).toEqual({
                    sex: '',
                    address: '',
                    phone: ''
                });
            });
            test(`正则属性`, () => {
                expect(executeTransform(Test, { address: /123/ }, { key: '2' })).toEqual({
                    sex: '',
                    address: '',
                    phone: ''
                });
            });
            test(`Symbol 属性`, () => {
                expect(executeTransform(Test, { address: Symbol() }, { key: '2' })).toEqual({
                    sex: '',
                    address: '',
                    phone: ''
                });
            });
            test(`Function 属性`, () => {
                expect(executeTransform(Test, { address: () => { } }, { key: '2' })).toEqual({
                    sex: '',
                    address: '',
                    phone: ''
                });
            });
        });
    });
    
    test('自动转换测试', () => {
        @TransModel
        class Test {
            @toString({ autoTrans: true })
            auto!: string;

            @toString({ autoTrans: false })
            noAuto!: string;
        }
        expect(executeTransform(Test, {
            auto: 1,
            noAuto: 1
        })).toEqual({
            auto: '1',
            noAuto: ''
        });
    });
});