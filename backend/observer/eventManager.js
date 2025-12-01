class EventManager {
    constructor() {
        this.observers = {};
    }

    subscribe(eventName, observer) {
        if (!this.observers[eventName]) {
            this.observers[eventName] = [];
        }
        this.observers[eventName].push(observer);
        console.log(`[EventManager] Observer subscribed to event: ${eventName}`);
    }

    notify(eventName, data) {
        if (this.observers[eventName]) {
            console.log(`[EventManager] Notifying ${this.observers[eventName].length} observers for event: ${eventName}`);

            this.observers[eventName].forEach(observer => {
                observer(data).catch(err => {
                    console.error(`[EventManager] Error in observer for ${eventName}:`, err.message);
                });
            });
        }
    }
}

export default new EventManager();