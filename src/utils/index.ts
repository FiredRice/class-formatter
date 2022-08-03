import { ModalKey } from '../types';

export function useModelKeys(modalKeys: ModalKey | ModalKey[] = []) {
    const result = typeof modalKeys === 'object' ? modalKeys : [modalKeys];
    return result;
}