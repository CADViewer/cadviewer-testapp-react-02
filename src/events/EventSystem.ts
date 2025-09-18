class EventSystem {

    private readonly queue: {
        [key: string]: Array<(data: object | string | number | boolean) => void>
    };

    constructor() {
        this.queue = {};
    }

    publish(event: string, data: object | string | number | boolean) {
        let queue = this.queue[event];
        console.log({queue})
        if (typeof queue === 'undefined') {
            return false;
        }
        const queueLength = queue.length;
        for (let i = 0; i < queueLength; i++) {
            const q = queue[i];
            if (q){
                q(data);
            }
        }

        return true;
    }

    subscribe(event: string, callback: (data: object | string | number | boolean) => void) {
        if (typeof this.queue[event] === 'undefined') {
            this.queue[event] = [];
        }

        this.queue[event].push(callback);
    }

    //  the callback parameter is optional. Without it the whole event will be removed, instead of
    // just one subscibtion. Enough for simple implementations
    unsubscribe(event: string, callback: (data: object | string | number | boolean) => void) {
        let queue = this.queue;

        if (typeof queue[event] !== 'undefined') {
            if (typeof callback === 'undefined') {
                delete queue[event];
            } else {
                this.queue[event] = queue[event].filter(function(sub) {
                    return sub !== callback;
                })
            }
        }
    }
}

const eventSystem = new EventSystem();
export default eventSystem