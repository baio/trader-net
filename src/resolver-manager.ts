///<reference path="../typings/bluebird/bluebird.d.ts"/>
var Promise = require("bluebird");

interface IResolverItem<T> {
    resolver: Promise.Resolver<T>
}

export class ResolverManager<T> {

    private resolvers: Array<IResolverItem<T>> = [];

    constructor() {
    }

    push(): Promise<T> {
        var deferred = Promise.defer();
        this.resolvers.push({resolver: deferred});
        return deferred.promise;
    }

    resolve(result: T) {
        this.resolvers.forEach((f) => {
            f.resolver.resolve(result);
        });
        this.resolvers.splice(0);
    }
}

