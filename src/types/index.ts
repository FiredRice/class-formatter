
type ArrMap<T> = (value: T, index: number, array: T[]) => T;

export type ArrayConfig<T = any> = {
    defaultValue?: Partial<T>[];
    ClassType?: Type<T>;
    keys?: ModelKey | ModelKey[];
    map?: ArrMap<Partial<T>>;
};

export type NumberConfig = {
    defaultValue?: number;
    autoTrans?: boolean;
    keys?: ModelKey | ModelKey[];
};

export type SymbolConfig = {
    defaultValue?: symbol;
    keys?: ModelKey | ModelKey[];
};

export type StringConfig = {
    defaultValue?: string;
    autoTrans?: boolean;
    keys?: ModelKey | ModelKey[];
};

export type BooleanConfig = {
    defaultValue?: boolean;
    keys?: ModelKey | ModelKey[];
};

export type ObjectConfig<T = any> = {
    defaultValue?: Partial<T>;
    ClassType?: Type<T>;
    keys?: ModelKey | ModelKey[];
};

export type RegConfig = {
    defaultValue?: RegExp | string;
    keys?: ModelKey | ModelKey[];
};

export type RemoveCallback = (value: any, target: Readonly<any>, shareValue?: any) => boolean;

export type RemoveConfig = {
    beforeRemove?: RemoveCallback;
    keys?: ModelKey | ModelKey[];
};

export type Callback<T = any> = (values: Readonly<T>, shareValue: any, ...args) => any;

export type ModelKey = string | number;

interface BaseOptions<T = any> {
    /**
     * 执行键
     */
    key?: ModelKey;
    /**
     * 共享数据
     */
    shareValue?: any;
    /**
     * 嵌套深度
     * 
     * @default 50
     */
    deep?: number;
    /**
     * 遍历数组
     */
    map?: ArrMap<T>;
}

export interface MergeOptions<T = any> extends BaseOptions<T> {
    /**
     * 是否合并源数据 
     */
    mergeSource: true;
};

export interface NotMergeOptions<T = any> extends BaseOptions<T> {
    /**
     * 是否合并源数据
     */
    mergeSource?: false;
};

export type FormatOptions = MergeOptions | NotMergeOptions;


export interface Type<T = any> extends Function {
    new(...args: any[]): T;
}


export type CommandType =
    | 'number'
    | 'string'
    | 'boolean'
    | 'symbol'
    | 'array'
    | 'object'
    | 'keep'
    | 'reg_exp'
    | 'remove'
    | 'format'
    | 'custom'
    | 'rename'
    | 'extend_method';

export interface Command {
    type: CommandType;
    value: any;
    modelKeys: ModelKey[];
}

export type Commands = Command[];

export interface CommandMap {
    [x: string | symbol]: Commands;
}

export type Decorator = (value, context: DecoratorContext) => void;
export type ClassDecorator = (value: Function, context: ClassDecoratorContext) => void;
export type ClassFieldDecorator = (value: undefined, context: ClassFieldDecoratorContext) => void;
export type ClassFieldAndMethodDecorator = (value: undefined | Function, context: ClassMethodDecoratorContext | ClassFieldDecoratorContext) => void;
export type ClassMethodDecorator = (value: Function, context: ClassMethodDecoratorContext | ClassGetterDecoratorContext | ClassSetterDecoratorContext) => void;