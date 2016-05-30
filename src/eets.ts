/**
 * EventEmitter
 * @author picospuch
 * @license MIT
 */
'use strict';

class Map {
    [key: string]: Function[];
}

export class PEventEmitter implements NodeJS.EventEmitter {
  private _events: Map;
  
  constructor() {
      this._events = new Map();
  }
  // @todo how to express function type with any arguements in typescript?
  public addListener(type: string, listener: Function): this {
    this._events[type] = this._events[type] || new Array<Function>();
    this._events[type].push(listener);
    return this;
  }
  public on(type: string, listener: Function): this {
    this.addListener(type, listener);
    return this;
  }
  public once(type: string, listener: Function): this {
    function on(...args: any[]) {
      this.removeListener(type, on);
      return listener.apply(this, args);
    }
    return this.on(type, on);
  }
  public removeListener(type: string, listener: Function): this {
    if (!this._events[type]) return;
    var es = this._events[type]
      , i = es.length;
    while (i--) {
      if (es[i] === listener) {
        es.splice(i, 1);
        return;
      }
    }
    return this;
  }
  public removeAllListeners(type: string): this {
    if (this._events[type]) delete this._events[type];
    return this;
  }
  public setMaxListeners(n: number): this {
    throw new Error('no impl, yet');
  }
  public getMaxListeners(): number {
    throw new Error('no impl, yet');
  }
  public listeners(type: string): Function[] {
    return this._events[type] = this._events[type] || [];
  }
  public emit(type: string, ...args: any[]): boolean {
    if (!this._events[type]) return;

    var es = this._events[type].slice()
      , l: number = es.length

    for (var i: number = 0; i < l; ++i) {
      es[i].apply(this, args);
    }
  }
  public listenerCount(type: string): number {
    return this._events[type].length;
  }
  
  public off(type: string, listener: Function): this {
    this.removeListener(type, listener);
    return this;
  }
}
