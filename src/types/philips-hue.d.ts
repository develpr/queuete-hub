/** Declaration file generated by dts-gen */

export = philips_hue;

declare class philips_hue {
    constructor();

    auth(bridge: any): any;

    getBridges(): any;

    getLights(): any;

    light(num: any): any;

    login(confFile: any): any;

    request(opts: any): any;

    static defaultMaxListeners: number;

    static usingDomains: boolean;

}

declare namespace philips_hue {
    class EventEmitter {
        constructor();

        addListener(type: any, listener: any): any;

        emit(type: any, ...args: any[]): any;

        eventNames(): any;

        getMaxListeners(): any;

        listenerCount(type: any): any;

        listeners(type: any): any;

        on(type: any, listener: any): any;

        once(type: any, listener: any): any;

        prependListener(type: any, listener: any): any;

        prependOnceListener(type: any, listener: any): any;

        removeAllListeners(type: any, ...args: any[]): any;

        removeListener(type: any, listener: any): any;

        setMaxListeners(n: any): any;

        static EventEmitter: any;

        static defaultMaxListeners: number;


        static usingDomains: boolean;

    }

    namespace EventEmitter {
        namespace init {
            const prototype: {
            };

        }

        namespace listenerCount {
            const prototype: {
            };

        }

    }

    namespace init {
        const prototype: {
        };

    }

    namespace listenerCount {
        const prototype: {
        };

    }


}

