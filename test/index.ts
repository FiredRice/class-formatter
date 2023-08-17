import { toString, executeTransform, TransModel, Mixins } from '../src';

@TransModel
class Test {
    @toString()
    name!: string;
}

console.log(executeTransform(Test, {}));

@TransModel
class A {
    @toString('A')
    name!: string;
}

@TransModel
class B {
    @toString('B')
    name!: string;
}

@Mixins(A, B)
@TransModel
class C implements A, B {
    @toString()
    c!: string;

    name!: string;
}

const res = executeTransform(C, {});
console.log(res);
