import { Command, CommandMap } from '../types';
import { cloneCommands } from '../utils';

class Commands {
    private value: CommandMap = {};

    public push(propertyKey, command: Command) {
        this.value[propertyKey] = this.value[propertyKey] || [];
        this.value[propertyKey].push(command);
    }

    public clear() {
        this.value = {};
    }

    public clone() {
        return cloneCommands(this.value);
    }
}

export default Commands;