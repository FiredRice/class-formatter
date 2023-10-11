import { CommandMap } from '../types';

export const classCommandMap = new WeakMap<any, CommandMap>();

// 嵌套深度标识
export const __CLASS_FORMATTER_LEVEL__ = Symbol();