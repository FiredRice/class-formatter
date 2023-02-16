<a href="https://www.murphysec.com/accept?code=8eeeee9b82d34e9330cdd095479394e8&type=1&from=2&t=2" target="_blank"><img src="https://www.murphysec.com/platform3/v3/badge/1610326320010002435.svg?t=1" alt="Security Status" /></a>


# class-formatter 使用文档

## 目录
- [简介](#简介)<br>
- [使用场景](#使用场景)<br>
  - [类型错误过滤](#类型错误过滤)<br>
  - [复杂数据结构格式化](#复杂数据结构格式化)<br>
- [名称释义](#名称释义)<br>
- [安装](#安装)<br>
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

## 使用场景

#### 类型错误过滤
在日常开发过程中想必大家都遇到过类似下面的错误：
```ts
Uncaught TypeError: Cannot read properties of undefined (reading 'map')
```
数据在各模块间传递时，经常会因为某一环节的失误而导致数据类型发生变化，从而导致因类型错误而出现的 bug。
`class-formatter` 可以确保数据类型的准确，从而尽可能过滤掉因类型错误导致的 bug。

#### 复杂数据结构格式化
在一些复杂场景中，会遇到层层嵌套的复杂数据结构，而为了确保每条数据的准确性常常要编写复杂的数据格式化方法。
`class-formatter` 可以通过装饰器简化这种格式化过程，减轻心智负担。

## 安装

`yarn add class-formatter`

项目依赖 `lodash`，因此您还可以安装：

`yarn add @types/lodash -D`


## 名称释义
- **模板：** 类即是模板。
- **指令：** 模板中属性或方法的 `class-formatter` 装饰器，一个装饰器即为一个指令。
- **源数据：** 被转换的数据。
- **转换：** 调用 `executeTransform` 或 `executeTransArray` 函数对源数据进行格式化的行为。

例如：
```ts
class User {
    @toString()
    name!: string;

    @toNumber()
    age!: number;
}

const user = {
    name: '张三',
    age: 18
};

const result = executeTransform(User, user);
```
- 模板：上述示例中，类 `User` 即为模板，也是转换函数（`executeTransform`）的第一个参数。
- 指令：上述示例中，`@toString()` 与 `@toNumber()` 即为指令。
- 源数据：上述示例中，对象 `user` 即为源数据。

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
// => { name: '张三', age: 18 }
```
在上述示例中，`formatUser` 一定拥有 **字符串类型** 属性 `name` ，**数字类型** 属性 `age`。

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
若源数据为数组，则可以使用 `executeTransArray` 进行格式化。

#### 默认值
```ts
class User {
    @toString()
    name: string = '张三';

    @toNumber(1)
    age!: number;
}
```
- 若源数据中不存在属性，则会根据默认值生成该属性。
  - 例如根据上述模板，若源数据不存在 `name` 属性，则转换结果一定拥有字符串属性 `name`，且 `name` 属性值为 '张三'。
- 默认值有两种传入方式，模板传入与指令传入，其中模板传入优先级 **高于** 指令传入。
  - 上述模板中，`name` 为模板传入，`age` 为指令传入。

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
|toKeep|保持源数据引用|keys?: [ModelKey](#ModelKey) \| [ModelKey](#ModelKey)[]) => [Decorator](#Decorator)|--|
|Remove|移除属性|(keys?: [ModelKey](#ModelKey) \| [ModelKey](#ModelKey)[]) => [Decorator](#Decorator)|--|
|Format|对属性进行自定义格式化。<br>**注意：Format 会在所有内置校验结束后执行，且不限制返回值类型，使用时请格外注意**|(callback: [FormatCallback](#FormatCallback), keys?: [ModelKey](#ModelKey) \| [ModelKey](#ModelKey)[]) => [Decorator](#Decorator)|--|
|Rename|对属性重命名。|(name: string, keys?: [ModelKey](#ModelKey) \| [ModelKey](#ModelKey)[]) => [Decorator](#Decorator)|--|

|方法装饰器|说明|类型|默认值|
|---|---|---|---|
|ExtendMethod|在结果中继承被装饰的方法或访问器|(keys?: [ModelKey](#ModelKey) \| [ModelKey](#ModelKey)[]) => MethodDecorator|--|

|类装饰器|说明|类型|默认值|
|---|---|---|---|
|Extend|继承父类的全部装饰器|(parent: [Type](#Type)) => ClassDecorator|--|
|Mixins|混入，同时继承全部类的装饰器|(...parents: [Type](#Type)[]) => ClassDecorator|--|

**executeTransform**
|参数名称|说明|类型|
|---|---|---|
|ClassType|模板类|[Type](#Type)|
|values|被格式化对象|any|
|options|配置项|Omit<[FormatOptions](#FormatOptions), 'map'>|

**executeTransArray**
|参数名称|说明|类型|
|---|---|---|
|ClassType|模板类|[Type](#Type)|
|values|被格式化对象|any[]|
|options|配置项|[FormatOptions](#FormatOptions)|
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
|item|属性被转换后的值|
|values|源数据<br>**注意：values 源数据的直接引用，请勿在转换过程中对其进行修改**|
|shareValue|共享数据<br>**注意：shareValue 为共享数据的直接引用，请勿在转换过程中对其进行修改**|

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
type FormatOptions<T> = {
    mergeSource?: boolean;
    key?: ModelKey;
    shareValue?: any;
    deep?: number;
    map?: (value: T, index: number, array: T[]) => T;
}
```

|名称|说明|类型|
|---|---|---|
|mergeSource|是否将 **源数据** 合并到转换结果中|boolean|
|key|[执行键](#关于执行键)|[ModelKey](#ModelKey)|
|shareValue|共享数据。可在自定义装饰器与 `Format` 中获取的额外数据|any|
|deep|转换深度限制。[详情](#模板自循环) |boolean|
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
|values|源数据<br>**注意：values 为源数据的直接引用，请勿在转换过程中对其进行修改**|any|
|shareValue|共享数据<br>**注意：shareValue 为共享数据的直接引用，请勿在转换过程中对其进行修改**|any|
|args|在生成的装饰器中传入的参数|any[]|

## 关于执行键
`executeTransform` 的 `options` 属性中提供了 `key` 属性，以下称为 `rootKey` 。
在所有指令中均提供了 `keys` 属性的入口，以下称为 `propertyKeys` 。
* 若 `rootKey` 不存在，则会执行所有不存在 `propertyKeys` 的指令。
<br>
* 若 `rootKey` 与 `propertyKeys` 同时存在，仅有 `propertyKeys` 包含 `rootKey` 的指令会被执行。
<br>
* 不存在 `propertyKeys` 的指令会被无条件执行。

```ts
class User {
    @toString({ keys: 'submit' })
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
上述示例中：
- `toNumber` 指令会无条件执行。
- 若 `executeTransform` 中传入的 `key` 为 `'submit'`，则 `toString` 指令会被执行，否则将忽略 `name` 属性。

由于执行键的存在，我们可以方便的在同一个模板上定制多套格式化方法。当一个属性拥有多个装饰器时，模板的可读性下降，且难以迭代。如下：

```ts
class User {
    @toString()
    @toString({ defaultValue: '张三', keys: '1' })
    @toString({ defaultValue: '李四', keys: '2' })
    @toString({ defaultValue: '王五', keys: '3' })
    name!: string;

    @toNumber()
    age!: number;
}
```

class-formatter 提供了 `createBatchDecorators` 方法用于对多装饰器进行管理。

**createBatchDecorators**
|属性|说明|类型|
|---|---|---|
|...decorators|需要统一管理的装饰器|PropertyDecorator[]|

通过 `createBatchDecorators` 方法，我们可以对上述案例进行管理：

```ts

const NameManage = createBatchDecorators(
    toString({ defaultValue: '张三', keys: '1' }),
    toString({ defaultValue: '李四', keys: '2' }),
    toString({ defaultValue: '王五', keys: '3' })
);

class User {
    @toString()
    @NameManage()
    name!: string;

    @toNumber()
    age!: number;
}
```

如上将所有拥有执行键的装饰器封装成 `NameManage` 装饰器，`toString` 作为默认格式化指令，`NameManage` 则根据执行键分发指令。

## 关于优先级
目前 class-formatter 内置了 5 个执行优先级，每个属性可拥有多个指令，根据优先级的不同决定指令的执行顺序。

优先级等级为 1-5，1为最高，5为最低。优先级越高越优先执行。

各指令优先级如下：
|装饰器|描述|优先级|
|---|---|---|
|toXXX|内置的类型转换器|1|
|ExtendMethod|继承模板的方法|1|
|toKeep|保持源数据的引用|2|
|Format|内置的格式化指令|3|
|Remove|移除属性|3|
|自定义装饰器|通过 `createFormatDecorator` 创建的装饰器|4|
|Rename|属性重命名|5|

## 关于循环引用
- 若多个模板间存在循环引用，则子模板中引用的父模板失效（ `typescript` 自身限制）。
- 若模板自身循环引用，则默认可转化深度为 50，超过该深度的转换会被忽略。
- 若被转换对象存在循环引用，则忽略循环属性。

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
为防止这种情况，且保证格式化顺利进行，`class-formatter` 限制了执行嵌套深度，默认 50。超过深度的数据会停止转换。
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
如此 `C` 便即继承了 `A` 、`B` 的全部指令。

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

`Mixins` 传参拥有优先级，当多个模板中存在相同的属性时，第一个参数的指令将会 **完全覆盖** 第二个参数的指令，以此类推。
上述示例中，模板 A 的指令拥有最高优先级，B 模板中 `name` 属性的指令将会被 A 模板的 `name` 完全覆盖。


## 注意事项
**<div id='note1'>关于执行优先级</div>**
- `class-formatter` 只保证不同优先级指令的执行顺序，若同时存在相同优先级的指令，则 **同优先级之间的执行顺序无法保证** 。
- 优先级 2 - 5 的指令可能会导致模板 **转换结果类型** 与 **模板类型** 不一致，使用时请格外注意。

**<div id='note2'>关于使用</div>**
- 所有转化规则均依赖指令，所有拥有指令的属性、方法、访问器均会被转换，其余属性、方法、访问器会被忽略。
- 指令可以通过 `Extend` 在多个模板间继承。
- 多个模板可通过 `Mixins` 组合成一个大模板，同时共享全部指令。
- 子模板中声名的同名属性若拥有指令，则子模板的指令将会 **完全覆盖** 继承的指令。（即重写指令）
- 子模板的模板默认值会覆盖父模板的模板默认值。