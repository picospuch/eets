/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

declare function run(): void;

declare function suite(name: string, fn: (err?: any)=>void): any;
declare function test(name: string, fn: (done?: (err?: any)=>void)=>void): any;
declare function suiteSetup(fn: (done?: (err?: any)=>void)=>void): any;
declare function suiteTeardown(fn: (done?: (err?: any)=>void)=>void): any;
declare function setup(fn: (done?: (err?: any)=>void)=>void): any;
declare function teardown(fn: (done?: (err?: any)=>void)=>void): any;
