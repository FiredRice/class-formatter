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
- [注意事项](#注意事项)<br>
  - [关于执行优先级](#note1)<br>
  - [关于 node 环境与浏览器环境](#note2)<br>

## 简介
一套装饰器风格的数据格式化方法。 

根据模板对数据进行格式化，返回的数据结构一定符合模板定义类型。

## <div id='Installation'>Installation</div>

`yarn add class-formatter`


`yarn add @types/lodash -D`

## 使用方法
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

## <div id='API'>API</div>
|属性装饰器|说明|类型|默认值|
|---|---|---|---|
|toNumber|若属性为非数字类型，则将属性转换为 `number` 类型。<br>`autoTrans` 为 `true` 时会自动将字符串转换为数字。|(value?: [NumberConfig](#NumberConfig)) => [Decorator](#Decorator)|defaultValue: 0<br>autoTrans: true|
|toString|若属性为非字符串类型，则将属性转换为 `string` 类型。<br>`autoTrans` 为 `true` 时会自动将数字转换为字符串。|(value?: [StringConfig](#StringConfig)) => [Decorator](#Decorator)|defaultValue: ''<br>autoTrans: true|
|toBoolean|若属性为非布尔类型，则将属性转换为 `boolean` 类型|(value?: [BooleanConfig](#BooleanConfig)) => [Decorator](#Decorator)|defaultValue: false|
|toType|若属性为非对象类型，则将属性转换为对象。<br>若指定了 `Type`，则可以将类型转换为 `Type` 的类型。|(value?: [ObjectConfig](#ObjectConfig) \| Type) => [Decorator](#Decorator)|defaultValue: {}|
|toArray|若属性为非数组类型，则将属性转换为数组。<br>若指定了 `Type`，则可以将数组内所有数据转换为 `Type` 的类型。|(value?: [ArrayConfig](#ArrayConfig) \| Type) => [Decorator](#Decorator)|defaultValue: []|
|Remove|移除属性|(keys?: [ModalKey](#ModalKey) \| [ModalKey](#ModalKey)[]) => [Decorator](#Decorator)|--|
|Format|对属性进行自定义格式化。<br>**注意：Format 会在所有内置校验结束后执行，且不限制返回值类型，使用时请格外注意**|(callback: [FormatCallback](#FormatCallback), keys?: [ModalKey](#ModalKey) \| [ModalKey](#ModalKey)[]) => [Decorator](#Decorator)|--|
|Rename|对属性重命名。|(name: string, keys?: [ModalKey](#ModalKey) \| [ModalKey](#ModalKey)[]) => [Decorator](#Decorator)|--|

**executeTransform**
|参数名称|说明|类型|
|---|---|---|
|ClassType|模板类|[Type](#Type)|
|values|被格式化对象|any|
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
    keys?: ModalKey | ModalKey[];
};
```

**<div id='StringConfig'>StringConfig</div>**
```ts
type StringConfig = { 
    defaultValue?: string;
    autoTrans?: boolean;
    keys?: ModalKey | ModalKey[];
};
```

**<div id='BooleanConfig'>BooleanConfig</div>**
```ts
type BooleanConfig = { 
    defaultValue?: boolean;
    keys?: ModalKey | ModalKey[]; 
};
```

**<div id='ObjectConfig'>ObjectConfig</div>**
```ts
type ObjectConfig<T = any> = { 
    defaultValue?: Partial<T>; 
    ClassType?: Type<T>;
    keys?: ModalKey | ModalKey[];
};
```

**<div id='ArrayConfig'>ArrayConfig</div>**
```ts
type ArrayConfig<T = any> = { 
    defaultValue?: Partial<T>[]; 
    ClassType?: Type<T>;
    keys?: ModalKey | ModalKey[];
};
```

**<div id='FormatCallback'>FormatCallback</div>**
```ts
type FormatCallback = (item, values) => any;
```
|名称|说明|
|---|---|
|item|被装饰属性 **被格式化后** 的值|
|values|被格式化对象<br>**注意：出于性能考虑，此处的 values 仅为被格式化数据的浅拷贝**|
|shareValue|共享数据<br>**注意：出于性能考虑，此处的 shareValue 仅为共享数据的浅拷贝**|

**<div id='Type'>Type</div>**
```ts
interface Type<T = any> extends Function {
    new(...args: any[]): T;
}
```

**<div id='ModalKey'>ModalKey</div>** 执行键类型
```ts
type ModalKey = string | number;
```

**<div id='FormatOptions'>FormatOptions</div>**
```ts
type FormatOptions = {
    mergeSource?: boolean;
    key?: ModalKey;
}
```
|名称|说明|类型|
|---|---|---|
|mergeSource|是否将 **不存在于模板中** 的属性合并到格式化结果中|boolean|
|key|[执行键](#关于执行键)|[ModalKey](#ModalKey)|
|shareValue|共享数据。可在自定义装饰器与 `Format` 中获取的额外数据|any|

## 自定义属性装饰器 
```ts
const CustomDecorator = createFormatDecorator((values, ...args) => {
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
|callback|装饰器执行回调|(values, ...args) => any|
|keys|可选参数 [执行键](#关于执行键)|[ModalKey](#ModalKey) \| [ModalKey](#ModalKey)[]|

**callback**
|属性|说明|类型|
|---|---|---|
|values|被格式化数据对象<br>**注意：出于性能考虑，此处的 values 仅为被格式化数据的浅拷贝**|any|
|shareValue|共享数据<br>**注意：出于性能考虑，此处的 shareValue 仅为共享数据的浅拷贝**|any|
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
|Format|内置的格式化工具|3|
|Remove|移除属性|3|
|自定义装饰器|通过 `createFormatDecorator` 创建的装饰器|4|
|Rename|属性重命名|5|

## 关于循环引用
类型装饰器内容不可循环引用。例如：
```ts
class User {
    @toString()
    name!: string;

    @toType(User)
    child!: User;
}
```
- 上述代码中 `@toType(User)` 为非法转换，此时会导致类型转换出错。
- 若被转换对象存在循环引用，则不会对数据格式化。

## 注意事项
**<div id='note1'>关于执行优先级</div>**
- class-formatter 只保证不同优先级装饰器的执行顺序，若同时存在相同优先级的装饰器，则 **同优先级之间的执行顺序无法保证** 。
- 优先级 3 - 5 的装饰器可能会导致模板 **转换结果类型** 与 **模板类型** 不一致，使用时请格外注意。

**<div id='note2'>关于 node 环境与浏览器环境</div>**
- 在浏览器中可获取模板内置属性，若被转换对象不存在该属性，且模板中该属性没有装饰器，则会在转换结果中将该属性置为 `undefined` 。
- 在 node 环境中，若被转换对象不存在该属性，且模板中该属性没有装饰器，则会忽略该属性。因为 node 环境中无法获取该属性。