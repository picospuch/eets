define(["require", "exports", 'assert', './eets'], function (require, exports, assert, eets_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    suite('EventEmitter', function () {
        var eventEmitter;
        setup(function () {
            eventEmitter = new eets_1.PEventEmitter();
        });
        teardown(function () {
            eventEmitter = null;
        });
        test('add listener, emit other event type', function () {
            var didCall = false;
            eventEmitter.addListener('eventType1', function (e) {
                didCall = true;
            });
            eventEmitter.emit('eventType2', {});
            assert(!didCall, 'Didn\'t expect to be called');
        });
        test('add listener, emit event', function () {
            var didCall = false;
            eventEmitter.addListener('eventType', function (e) {
                didCall = true;
            });
            eventEmitter.emit('eventType', {});
            assert(didCall);
        });
        test('add 2 listeners, emit event', function () {
            var didCallFirst = false;
            eventEmitter.addListener('eventType', function (e) {
                didCallFirst = true;
            });
            var didCallSecond = false;
            eventEmitter.addListener('eventType', function (e) {
                didCallSecond = true;
            });
            eventEmitter.emit('eventType', {});
            assert(didCallFirst);
            assert(didCallSecond);
        });
        test('add 1 listener, remove it, emit event', function () {
            var didCall = false;
            var callback = function (e) {
                didCall = true;
            };
            eventEmitter.addListener('eventType', callback).removeListener('eventType', callback);
            eventEmitter.emit('eventType', {});
            assert(!didCall);
        });
        test('add 2 listeners, emit event, remove one while processing', function () {
            var firstCallCount = 0;
            eventEmitter.addListener('eventType', function callback(e) {
                firstCallCount++;
                eventEmitter.removeListener('eventType', callback);
            });
            var secondCallCount = 0;
            eventEmitter.addListener('eventType', function (e) {
                secondCallCount++;
            });
            eventEmitter.emit('eventType', {});
            eventEmitter.emit('eventType', {});
            assert.equal(firstCallCount, 1);
            assert.equal(secondCallCount, 2);
        });
        test('event object is assert', function () {
            var data;
            eventEmitter.addListener('eventType', function (e) {
                data = e.data;
            });
            eventEmitter.emit('eventType', { data: 5 });
            assert.equal(data, 5);
        });
        test('EventEmitter makes no order guarantees', function () {
            var emitter = new eets_1.PEventEmitter();
            var actualCallOrder = [];
            emitter.addListener('foo', function () {
                actualCallOrder.push('listener1-foo');
                emitter.emit('bar');
            });
            emitter.addListener('foo', function () {
                actualCallOrder.push('listener2-foo');
            });
            emitter.addListener('bar', function () {
                actualCallOrder.push('listener2-bar');
            });
            emitter.emit('foo');
            assert.deepEqual(actualCallOrder, [
                'listener1-foo',
                'listener2-bar',
                'listener2-foo'
            ]);
        });
        test('get event count', function () {
            var emitter = new eets_1.PEventEmitter();
            emitter.addListener('foo', function () {
                ;
            });
            assert.equal(emitter.listenerCount('foo'), 1);
            emitter.addListener('foo', function () {
                ;
            });
            emitter.addListener('foo', function () {
                ;
            });
            assert.equal(emitter.listenerCount('foo'), 3);
        });
    });
});
//# sourceMappingURL=eets.test.js.map