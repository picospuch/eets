export declare class PEventEmitter implements NodeJS.EventEmitter {
    private _events;
    constructor();
    addListener(type: string, listener: Function): this;
    on(type: string, listener: Function): this;
    once(type: string, listener: Function): this;
    removeListener(type: string, listener: Function): this;
    removeAllListeners(type: string): this;
    setMaxListeners(n: number): this;
    getMaxListeners(): number;
    listeners(type: string): Function[];
    emit(type: string, ...args: any[]): boolean;
    listenerCount(type: string): number;
    off(type: string, listener: Function): this;
}
