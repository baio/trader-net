/// <reference path="../typings/node/node.d.ts" />
declare var crypto: any;
declare var isObject: (val: any) => boolean;
declare var hash_hmac: (type: any, data: any, key: any) => any;
declare var sign: (data: any, apiSec: any) => any;
declare var sortBy: (arr: any, cb: any) => any;
declare var pairs: (collection: any) => any[][];
declare var ksort: (collection: any) => any;
declare var preSign: (collection: any) => any;
