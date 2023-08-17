const __CLASS_FORMATTER_LEVEL__ = Symbol();

class TransContext {
    private transTargetMap = new Map();

    public init(values: any) {
        this.transTargetMap.set(values, true);
        this.transTargetMap.set(__CLASS_FORMATTER_LEVEL__, 1);
    }

    public clear() {
        this.transTargetMap.clear();
    }

    public getDeepLevel() {
        return this.transTargetMap.get(__CLASS_FORMATTER_LEVEL__) || 1;
    }

    public setDeepLevel(level: number) {
        this.transTargetMap.set(__CLASS_FORMATTER_LEVEL__, level);
    }

    public hasRecord(target: any) {
        return this.transTargetMap.has(target);
    }

    public setRecord(value: any) {
        this.transTargetMap.set(value, true);
    }
}

export default TransContext;