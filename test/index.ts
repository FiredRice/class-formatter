import { toString, executeTransform, Remove, createFormatDecorator, toNumber, Rename, Format, toBoolean } from '../src';

const toAge = createFormatDecorator((values: Test) => {
    return 9;
});

class Test {
    @toAge()
    @toBoolean()
    @toString('7')
    @toNumber(5)
    @Format(v => v + 1)
    @Format(v => v - 7)
    age!: number;
}

const res = executeTransform(Test, {});
console.log(res);