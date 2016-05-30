/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import * as assert from 'assert';
import {PEventEmitter as EventEmitter} from './eets';

suite('EventEmitter', () => {
	var eventEmitter: EventEmitter;

	setup(() => {
		eventEmitter = new EventEmitter();
	});

	teardown(() => {
		eventEmitter = null;
	});

	test('add listener, emit other event type', function () {
		var didCall = false;
		eventEmitter.addListener('eventType1', function (e: any) {
			didCall = true;
		});
		eventEmitter.emit('eventType2', {});
		assert(!didCall, 'Didn\'t expect to be called');
	});

	test('add listener, emit event', function () {
		var didCall = false;
		eventEmitter.addListener('eventType', function (e: any) {
			didCall = true;
		});
		eventEmitter.emit('eventType', {});
		assert(didCall);
	});

	test('add 2 listeners, emit event', function () {
		var didCallFirst = false;
		eventEmitter.addListener('eventType', function (e: any) {
			didCallFirst = true;
		});
		var didCallSecond = false;
		eventEmitter.addListener('eventType', function (e: any) {
			didCallSecond = true;
		});
		eventEmitter.emit('eventType', {});
		assert(didCallFirst);
		assert(didCallSecond);
	});

	test('add 1 listener, remove it, emit event', function () {
		var didCall = false;
		var callback = function (e: any) {
			didCall = true;
    };
		eventEmitter.addListener('eventType', callback).removeListener('eventType', callback);
		eventEmitter.emit('eventType', {});
		assert(!didCall);
	});

	test('add 2 listeners, emit event, remove one while processing', function () {
		var firstCallCount = 0;
		eventEmitter.addListener('eventType', function callback(e: any) {
			firstCallCount++;
			eventEmitter.removeListener('eventType', callback);
		});
		var secondCallCount = 0;
		eventEmitter.addListener('eventType', function (e: any) {
			secondCallCount++;
		});
		eventEmitter.emit('eventType', {});
		eventEmitter.emit('eventType', {});
		assert.equal(firstCallCount, 1);
		assert.equal(secondCallCount, 2);
	});

	test('event object is assert', function () {
		var data: any;
		eventEmitter.addListener('eventType', function (e: any) {
			data = e.data;
		});
		eventEmitter.emit('eventType', { data: 5 });
		assert.equal(data, 5);
	});

	test('EventEmitter makes no order guarantees', () => {
		var emitter = new EventEmitter();
		var actualCallOrder: string[] = [];

		emitter.addListener('foo', function() {
			actualCallOrder.push('listener1-foo');
			emitter.emit('bar');
		});


		emitter.addListener('foo', function() {
			actualCallOrder.push('listener2-foo');
		});
		emitter.addListener('bar', function() {
			actualCallOrder.push('listener2-bar');
		});

		emitter.emit('foo');

		assert.deepEqual(actualCallOrder, [
			'listener1-foo',
			'listener2-bar',
			'listener2-foo'
		]);
	});
	
	test('get event count', () => {
		var emitter = new EventEmitter();
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
