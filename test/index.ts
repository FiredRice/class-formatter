import { toString, executeTransform, TransModel, Mixins, toNumber, Extend } from '../src';

@TransModel
class Parent {
    @toNumber()
    age!: any;
}

@TransModel
@Extend(Parent)
class Test extends Parent {
    @toString()
    name!: string;

    @toString()
    age: string = '58';
}

const res = executeTransform(Test, {});
console.log(res);
