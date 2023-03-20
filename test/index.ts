import { toString, executeTransform } from '../src';

class Test {
    @toString()
    name!: string;
}

console.log(executeTransform(Test, {}));

