import Commands from '../service/commands';
import { CommandMap } from '../types';

// 指令注册器
export const commandsRegister = new Commands();

// 指令收集器
export const classCommandMap = new WeakMap<any, CommandMap>();