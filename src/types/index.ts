
export type ArrayConfig<T = any> = {
    defaultValue?: Partial<T>[];
    ClassType?: Type<T>;
    keys?: ModalKey | ModalKey[];
};

export type NumberConfig = {
    defaultValue?: number;
    autoTrans?: boolean;
    keys?: ModalKey | ModalKey[];
};

export type StringConfig = {
    defaultValue?: string;
    autoTrans?: boolean;
    keys?: ModalKey | ModalKey[];
};

export type BooleanConfig = {
    defaultValue?: boolean;
    keys?: ModalKey | ModalKey[];
};

export type ObjectConfig<T = any> = {
    defaultValue?: Partial<T>;
    ClassType?: Type<T>;
    keys?: ModalKey | ModalKey[];
};


export type Callback<T = any> = (values: Readonly<T>, shareValue: any, ...args) => any;

export type ModalKey = string | number;


interface BaseOptions {
    key?: ModalKey;
    shareValue?: any;
}

export interface MergeOptions extends BaseOptions {
    // 合并源数据
    mergeSource: true;
};

export interface NotMergeOptions extends BaseOptions {
    // 不合并源数据
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
    | 'array'
    | 'object'
    | 'remove'
    | 'format'
    | 'custom'
    | 'rename';

interface Command {
    type: CommandType;
    value: any;
    priority: number;
    modalKeys: ModalKey[];
}

export type Commands = Command[];

export type DecoratorFun = (target: any, propertyKey: string) => void;