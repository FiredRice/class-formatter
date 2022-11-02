# class-formatter 使用文档

## 目录
- [简介](#简介)<br>
- [Installation](#Installation)<br>
- [使用方法](#使用方法)<br>
- [API](#API)<br>
- [Interface](#Interface)<br>
- [自定义属性装饰器](#自定义属性装饰器)<br>
- [关于执行键](#关于执行键)<br>
- [关于优先级](#关于优先级)<br>
- [关于循环引用](#关于循环引用)<br>
  - [多模板循间环引用](#多模板循间环引用)<br>
  - [被转换对象存在在循环引用](#被转换对象存在在循环引用)<br>
  - [模板自循环](#模板自循环)<br>
- [关于混入](#关于混入)<br>
- [注意事项](#注意事项)<br>
  - [关于执行优先级](#note1)<br>
  - [关于使用](#note2)<br>

## 简介
一套装饰器风格的数据格式化方法。 

根据模板对数据进行格式化，返回的数据结构一定符合模板定义类型。

## <div id='Installation'>Installation</div>

`yarn add class-formatter`

项目依赖 `lodash`，因此您还可以安装：

`yarn add @types/lodash -D`


## 使用方法

#### 普通对象
```ts
class User {
    @toString()
    name!: string;

    @toNumber()
    age!: number;
}

const user = {
    name: '张三',
    age: '18'
};

const formatUser = executeTransform(User, user);
```
其中 `User` 为格式化模板。调用 `executeTransform` 便可根据模板对数据格式化。

在上述例子中，`formatUser` 一定拥有 **字符串类型** 属性 `name` ，**数字类型** 属性 `age`。

#### 数组
```ts
class User {
    @toString()
    name!: string;

    @toNumber()
    age!: number;
}

const users = [{
    name: '张三',
    age: '18'
}];

const formatUsers = executeTransArray(User, users);
```
若被格式化数据为数字，则可以使用 `executeTransArray` 进行格式化。

#### 默认值
```ts
class User {
    @toString()
    name: string = '张三';

    @toNumber(1)
    age!: number;
}
```
默认值有两种传入方式，模板传入与装饰器传入，其中模板传入优先级 **高于** 装饰器传入

## <div id='API'>API</div>
|属性装饰器|说明|类型|默认值|
|---|---|---|---|
|toNumber|若属性为非数字类型，则将属性转换为 `number` 类型。<br>`autoTrans` 为 `true` 时会自动将字符串转换为数字。|(value?: [NumberConfig](#NumberConfig) \| number) => [Decorator](#Decorator)|defaultValue: 0<br>autoTrans: true|
|toString|若属性为非字符串类型，则将属性转换为 `string` 类型。<br>`autoTrans` 为 `true` 时会自动将数字转换为字符串。|(value?: [StringConfig](#StringConfig) \| string) => [Decorator](#Decorator)|defaultValue: ''<br>autoTrans: true|
|toBoolean|若属性为非布尔类型，则将属性转换为 `boolean` 类型|(value?: [BooleanConfig](#BooleanConfig) \| boolean) => [Decorator](#Decorator)|defaultValue: false|
|toSymbol|若属性为非 `symbol` 类型，则将属性转换为 `symbol` 类型|(value?: [SymbolConfig](#SymbolConfig) \| symbol) => [Decorator](#Decorator)|defaultValue: Symbol()|
|toRegExp|若属性为非正则类型，则将属性转换为正则类型|(value?: [RegConfig](#RegConfig) \| RegExp \| string) => [Decorator](#Decorator)|defaultValue: new RegExp('')|
|toType|若属性为非对象类型，则将属性转换为对象。<br>若指定了 `Type`，则可以将类型转换为 `Type` 的类型。|(value?: [ObjectConfig](#ObjectConfig) \| Type) => [Decorator](#Decorator)|defaultValue: {}|
|toArray|若属性为非数组类型，则将属性转换为数组。<br>若指定了 `Type`，则可以将数组内所有数据转换为 `Type` 的类型。|(value?: [ArrayConfig](#ArrayConfig) \| Type) => [Decorator](#Decorator)|defaultValue: []|
|Remove|移除属性|(keys?: [ModelKey](#ModelKey) \| [ModelKey](#ModelKey)[]) => [Decorator](#Decorator)|--|
|Format|对属性进行自定义格式化。<br>**注意：Format 会在所有内置校验结束后执行，且不限制返回值类型，使用时请格外注意**|(callback: [FormatCallback](#FormatCallback), keys?: [ModelKey](#ModelKey) \| [ModelKey](#ModelKey)[]) => [Decorator](#Decorator)|--|
|Rename|对属性重命名。|(name: string, keys?: [ModelKey](#ModelKey) \| [ModelKey](#ModelKey)[]) => [Decorator](#Decorator)|--|

|方法装饰器|说明|类型|默认值|
|---|---|---|---|
|ExtendMethod|在结果中继承被装饰的方法或访问器|() => MethodDecorator|--|

**executeTransform**
|参数名称|说明|类型|
|---|---|---|
|ClassType|模板类|[Type](#Type)|
|values|被格式化对象|any|
|options|配置项|[FormatOptions](#FormatOptions)|

**executeTransArray**
|参数名称|说明|类型|
|---|---|---|
|ClassType|模板类|[Type](#Type)|
|values|被格式化对象|any[]|
|options|配置项|[FormatArrOptions](#FormatArrOptions)|
## <div id='Interface'>Interface</div>

**<div id='Decorator'>Decorator</div>**
```ts
type Decorator =  (target: any, propertyKey: string) => void;
```

**<div id='NumberConfig'>NumberConfig</div>**
```ts
type NumberConfig = { 
    defaultValue?: number;
    autoTrans?: boolean;
    keys?: ModelKey | ModelKey[];
};
```

**<div id='StringConfig'>StringConfig</div>**
```ts
type StringConfig = { 
    defaultValue?: string;
    autoTrans?: boolean;
    keys?: ModelKey | ModelKey[];
};
```

**<div id='BooleanConfig'>BooleanConfig</div>**
```ts
type BooleanConfig = { 
    defaultValue?: boolean;
    keys?: ModelKey | ModelKey[]; 
};
```

**<div id='SymbolConfig'>SymbolConfig</div>**
```ts
type SymbolConfig = { 
    defaultValue?: symbol;
    keys?: ModelKey | ModelKey[]; 
};
```

**<div id='RegConfig'>RegConfig</div>**
```ts
type RegConfig = { 
    defaultValue?: Regexp | string;
    keys?: ModelKey | ModelKey[]; 
};
```

**<div id='ObjectConfig'>ObjectConfig</div>**
```ts
type ObjectConfig<T = any> = { 
    defaultValue?: Partial<T>; 
    ClassType?: Type<T>;
    keys?: ModelKey | ModelKey[];
};
```

**<div id='ArrayConfig'>ArrayConfig</div>**
```ts
type ArrayConfig<T = any> = { 
    defaultValue?: Partial<T>[]; 
    ClassType?: Type<T>;
    keys?: ModelKey | ModelKey[];
    map?: (value: T, index: number, array: T[]) => T;
};
```

**<div id='FormatCallback'>FormatCallback</div>**
```ts
type FormatCallback = (item, values) => any;
```
|名称|说明|
|---|---|
|item|被装饰属性 **被格式化后** 的值|
|values|被格式化对象<br>**注意：values 为被格式化对象的直接引用，请勿在格式化过程中对其进行修改**|
|shareValue|共享数据<br>**注意：shareValue 为共享数据对象的直接引用，请勿在格式化过程中对其进行修改**|

**<div id='Type'>Type</div>**
```ts
interface Type<T = any> extends Function {
    new(...args: any[]): T;
}
```

**<div id='ModelKey'>ModelKey</div>** 执行键类型
```ts
type ModelKey = string | number;
```

**<div id='FormatOptions'>FormatOptions</div>**
```ts
type FormatOptions = {
    mergeSource?: boolean;
    key?: ModelKey;
    shareValue?: any;
    deep?: number;
}
```

**<div id='FormatArrOptions'>FormatArrOptions</div>**
```ts
type FormatArrOptions<T> = {
    mergeSource?: boolean;
    key?: ModelKey;
    shareValue?: any;
    deep?: number;
    map?: (value: T, index: number, array: T[]) => T;
}
```
|名称|说明|类型|
|---|---|---|
|mergeSource|是否将 **不存在于模板中** 的属性合并到格式化结果中|boolean|
|key|[执行键](#关于执行键)|[ModelKey](#ModelKey)|
|shareValue|共享数据。可在自定义装饰器与 `Format` 中获取的额外数据|any|
|deep|格式化深度限制。[详情](#模板自循环) |boolean|
|map|原生数组的 `map` 方法。仅在 `executeTransArray` 中生效|(value: T, index: number, array: T[]) => T|


## 自定义属性装饰器 
```ts
const CustomDecorator = createFormatDecorator((values, shareValue, ...args) => {
    // ...Do something
    return values.name;
});

// type CustomeDecorator = (...args) => DecoratorFun

class User {
    @CustomDecorator('Hello')
    name!: string;
}
```
**createFormatDecorator**
|属性|说明|类型|
|---|---|---|
|callback|装饰器执行回调|(values, shareValue, ...args) => any|
|keys|可选参数 [执行键](#关于执行键)|[ModelKey](#ModelKey) \| [ModelKey](#ModelKey)[]|

**callback**
|属性|说明|类型|
|---|---|---|
|values|被格式化数据对象<br>**注意：values 为被格式化对象的直接引用，请勿在格式化过程中对其进行修改**|any|
|shareValue|共享数据<br>**注意：shareValue 为共享数据对象的直接引用，请勿在格式化过程中对其进行修改**|any|
|args|在生成的装饰器中传入的参数|any[]|

## 关于执行键
```ts
class User {
    @toString()
    name!: string;

    @toNumber()
    age!: number;
}

const user = {
    name: '张三',
    age: '18'
};

const formatUser = executeTransform(User, user, {
    key: 'submit'
});
```
`executeTransform` 的 `options` 属性中提供了 `key` 属性，以下称为 `rootKey` 。
在所有装饰器中均提供了 `keys` 属性的入口，以下称为 `propertyKeys` 。
* 若 `rootKey` 不存在，则会执行所有不存在 `propertyKeys` 的装饰器。
<br>
* 若 `rootKey` 与 `propertyKeys` 同时存在，仅有 `propertyKeys` 包含 `rootKey` 的装饰器会被执行。
<br>
* 不存在 `propertyKeys` 的装饰器会被无条件执行。

## 关于优先级
目前 class-formatter 内置了 5 个执行优先级，每个属性可拥有多个装饰器，根据优先级的不同决定装饰器的执行顺序。

优先级等级为 1-5，1为最高，5为最低。优先级越高越优先执行。

各装饰器优先级如下：
|装饰器|描述|优先级|
|---|---|---|
|toXXX|内置的类型转换器|1|
|ExtendMethod|继承模板的方法|1|
|Format|内置的格式化工具|3|
|Remove|移除属性|3|
|自定义装饰器|通过 `createFormatDecorator` 创建的装饰器|4|
|Rename|属性重命名|5|

## 关于循环引用
- 若多个模板间存在循环引用，则子模板中引用的父模板失效（ `typescript` 自身限制）。
- 若模板自身循环引用，则默认可格式化深度为 50，超过该深度的数据会被忽略。
- 若被转换对象存在循环引用，则忽略循环属性。

#### 多模板循间环引用
```ts
// child.ts
export class Child {
    @toNumber()
    age!: number;

    @toType(Parent)
    parent!: Parent;
}

// parent.ts
export class Parent {
    @toString()
    name!: string;

    @toType(Child)
    child!: Child;
}

// index.ts
// 子模板 Child 中的 Parent 会失效
executeTransform(Parent, {});
```
#### 被转换对象存在在循环引用
```ts
// child.ts
export class Child {
    @toNumber()
    age!: number;

    @toType(Parent)
    parent!: Parent;
}

// parent.ts
export class Parent {
    @toString()
    name!: string;

    @toType(Child)
    child!: Child;
}

// index.ts
const target = {
    name: 4,
    child: {
        age: '2',
        parent: null as any
    }
}

target.child.parent = target;

// target.child.parent 会被忽略
executeTransform(Parent, target);
```
#### 模板自循环

```ts
class Person {
    @toString()
    name!: string;

    @toType(Person)
    child!: Person;
}

const target = {
    name: '父亲',
    child: {
        name: 1
    }
}

// target.child 会被忽略
executeTransform(Person, {});
```
模板自循环理论上允许存在，但可能导致死循环。
为防止模板自循环导致死循环，且保证格式化顺利进行，`class-formatter` 限制了执行嵌套深度，默认 50。超过深度的数据会停止格式化。
可以通过 `options.deep` 自行调整深度。

**死循环例：**
```
class Person {
    @toString()
    name!: string;

    @toArray(Person)
    childs: Person = [{}];
}

executeTransArray(Person, [{}], {
    deep: 50
});
```

## 关于混入
为实现更加灵活的模板组合方案，`class-formatter` 提供 `mixins` 方法实现多模板组合。

例如：
```ts
class A {
    @toString()
    a!: string;
}

class B {
    @toString()
    b!: string;
}

class C implements A, B {
    a!: string;
    b!: string;

    @toString()
    c!: string;
}

mixins(C, [A, B]);
```
如此 `C` 便即继承了 `A` 、`B` 的全部装饰器指令，又可以做为格式化模板。

同时提供了 `Mixins` 类装饰器来简化混入。
```ts
class A {
    @toString('A')
    name!: string;
}

class B {
    @toString('B')
    name!: string;
}

@Mixins(A, B)
class C implements A, B {
    @toString()
    c!: string;

    name!: string;
}

const res = executeTransform(C, {});
// res => { name: 'A', c: '' }
```

`Mixins` 传参拥有优先级，当多个模板中存在相同的属性时，第一个参数的装饰器将会 **完全覆盖** 第二个参数的装饰器，以此类推。
上述示例中，模板 A 的装饰器拥有最高优先级，B 模板中 `name` 属性的装饰器将会被 A 模板的 `name` 完全覆盖。


## 注意事项
**<div id='note1'>关于执行优先级</div>**
- `class-formatter` 只保证不同优先级装饰器的执行顺序，若同时存在相同优先级的装饰器，则 **同优先级之间的执行顺序无法保证** 。
- 优先级 3 - 5 的装饰器可能会导致模板 **转换结果类型** 与 **模板类型** 不一致，使用时请格外注意。

**<div id='note2'>关于使用</div>**
- 所有格式化规则均依赖装饰器，所有被装饰器装饰的属性、方法、访问器均会被格式化，其余属性、方法、访问器会被忽略。
- 装饰器可以通过继承在多个模板间共享。
- 多个模板可通过 `Mixins` 组合成一个大模板。