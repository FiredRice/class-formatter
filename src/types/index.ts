
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
    | 'extend_method'
    | 'remove'
    | 'format'
    | 'custom'
    | 'rename';

export interface Command {
    type: CommandType;
    value: any;
    priority: number;
    modelKeys: ModelKey[];
}

export type Commands = Command[];

export interface CommandMap {
    [x: string | symbol]: Commands;
}

export type DecoratorFun = (target: any, propertyKey: string) => void;