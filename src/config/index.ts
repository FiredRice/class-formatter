import { CommandMap } from '../types';

// 最高优先级
export const HIGH_PRORITY = 1;
// 中上优先级
export const UPPER_MIDDLE_PRORITY = 2;
// 中等优先级
export const MEDIUM_PRORITY = 3;
// 中下优先级
export const LOWER_MIDDLE_PRORITY = 4;
// 最低优先级
export const LOW_PRORITY = 5;

export const classCommandMap = new WeakMap<any, CommandMap>();

// 嵌套深度标识
export const __CLASS_FORMATTER_LEVEL__ = Symbol();