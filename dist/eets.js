define(["require", "exports"], function (require, exports) {
    /**
     * EventEmitter
     * @author picospuch
     * @license MIT
     */
    'use strict';
    var Map = (function () {
        function Map() {
        }
        return Map;
    }());
    var PEventEmitter = (function () {
        function PEventEmitter() {
            this._events = new Map();
        }
        // @todo how to express function type with any arguements in typescript?
        PEventEmitter.prototype.addListener = function (type, listener) {
            this._events[type] = this._events[type] || new Array();
            this._events[type].push(listener);
            return this;
        };
        PEventEmitter.prototype.on = function (type, listener) {
            this.addListener(type, listener);
            return this;
        };
        PEventEmitter.prototype.once = function (type, listener) {
            function on() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                this.removeListener(type, on);
                return listener.apply(this, args);
            }
            return this.on(type, on);
        };
        PEventEmitter.prototype.removeListener = function (type, listener) {
            if (!this._events[type])
                return;
            var es = this._events[type], i = es.length;
            while (i--) {
                if (es[i] === listener) {
                    es.splice(i, 1);
                    return;
                }
            }
            return this;
        };
        PEventEmitter.prototype.removeAllListeners = function (type) {
            if (this._events[type])
                delete this._events[type];
            return this;
        };
        PEventEmitter.prototype.setMaxListeners = function (n) {
            throw new Error('no impl, yet');
        };
        PEventEmitter.prototype.getMaxListeners = function () {
            throw new Error('no impl, yet');
        };
        PEventEmitter.prototype.listeners = function (type) {
            return this._events[type] = this._events[type] || [];
        };
        PEventEmitter.prototype.emit = function (type) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!this._events[type])
                return;
            var es = this._events[type].slice(), l = es.length;
            for (var i = 0; i < l; ++i) {
                es[i].apply(this, args);
            }
        };
        PEventEmitter.prototype.listenerCount = function (type) {
            return this._events[type].length;
        };
        PEventEmitter.prototype.off = function (type, listener) {
            this.removeListener(type, listener);
            return this;
        };
        return PEventEmitter;
    }());
    exports.PEventEmitter = PEventEmitter;
});
//# sourceMappingURL=eets.js.map