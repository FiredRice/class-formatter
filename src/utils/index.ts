import { ModalKey } from '../types';

export function useModelKeys(modalKeys: ModalKey | ModalKey[] = []) {
    const result = typeof modalKeys === 'object' ? modalKeys : [modalKeys];
    return result;
}

export function isArray(value) {
    return Array.isArray(value);
}

export function isBoolean(value) {
    return typeof value === 'boolean';
}

export function isNaN(value) {
    return Object.is(value, NaN);
}

export function isNumber(value) {
    return typeof value === 'number';
}

export function isObject(value) {
    return typeof value === 'object' && !isArray(value);
}

export function isString(value) {
    return typeof value === 'string';
}