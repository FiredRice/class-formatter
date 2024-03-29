import { executeTransform, TransModel, Remove, toNumber, toString } from '../src';

@TransModel
class Test {
    @Remove({ keys: 1 })
    age!: number;
}

const res = executeTransform(Test, { age: 2, name: '张三' });
console.log(res);
