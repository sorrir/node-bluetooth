import { EventEmitter } from "events"
import { dBusType, dict } from "../../types"

type eventType<T> = (event: T) => Promise<void> | void
type eventKeys<T> = (keyof T)[]

export class GenericDBusEventEmitter<InputEvent extends dict<string, dBusType>, OutputEvent extends any> {
    readonly eventName: string
    private readonly _eventEmitter: EventEmitter
    private readonly _eventKeys: (keyof InputEvent)[]
    private readonly _eventTransform: (event: InputEvent) => OutputEvent

    constructor(event: string, eventEmitter: EventEmitter, keyProvider: InputEvent, eventTransform: (event: InputEvent) => OutputEvent) {
        this.eventName = event
        this._eventEmitter = eventEmitter
        this._eventKeys = Object.keys(keyProvider)
        this._eventTransform = eventTransform
    }

    async waitForEvent(evaluator: (event: OutputEvent) => boolean): Promise<OutputEvent> {
        const emitter: EventEmitter = this._eventEmitter
        const eventName = this.eventName
        const eventKeys = this._eventKeys
        const eventTransform = this._eventTransform
        return new Promise<OutputEvent>((resolve) => {
            function onEvent(...eventArgs: any[]) {
                const event = GenericDBusEventEmitter._eventArgsToEvent(eventKeys, eventArgs, eventTransform)
                if (evaluator(event) === true) {
                    emitter.removeListener(eventName, onEvent)
                    resolve(event)
                }
            }
            emitter.addListener(eventName, onEvent)
        });
    }

    private static _transformListener<T, Y>(eventKeys: eventKeys<T>, listener: eventType<Y>, eventTransform: (event: T) => Y) {
        return (...eventArgs: any[]) => {
            try {
                listener(GenericDBusEventEmitter._eventArgsToEvent(eventKeys, eventArgs, eventTransform))
            } catch (e) {
                console.log(e)
            }
        }
    }

    private static _eventArgsToEvent<T, Y>(eventKeys: eventKeys<T>, eventArgs: any[], eventTransform: (event: T) => Y): Y {
        let event = {}
        eventArgs.forEach((arg, index) => {
            event[<string>eventKeys[index]] = arg
        })
        return eventTransform(<T>event)
    }

    addListener(listener: eventType<OutputEvent>) {
        this._eventEmitter.addListener(this.eventName, GenericDBusEventEmitter._transformListener(this._eventKeys, listener, this._eventTransform))
    }

    listeners() {
        return this._eventEmitter.listeners(this.eventName)
    }

    listenerCount() {
        return this._eventEmitter.listenerCount(this.eventName)
    }

    off(listener: eventType<OutputEvent>) {
        return this._eventEmitter.off(this.eventName, GenericDBusEventEmitter._transformListener(this._eventKeys, listener, this._eventTransform))
    }

    on(listener: eventType<OutputEvent>) {
        return this._eventEmitter.on(this.eventName, GenericDBusEventEmitter._transformListener(this._eventKeys, listener, this._eventTransform))
    }

    once(listener: eventType<OutputEvent>) {
        return this._eventEmitter.once(this.eventName, GenericDBusEventEmitter._transformListener(this._eventKeys, listener, this._eventTransform))
    }

    prependListener(listener: eventType<OutputEvent>) {
        return this._eventEmitter.prependListener(this.eventName, GenericDBusEventEmitter._transformListener(this._eventKeys, listener, this._eventTransform))
    }

    prependOnceListener(listener: eventType<OutputEvent>) {
        return this._eventEmitter.prependOnceListener(this.eventName, GenericDBusEventEmitter._transformListener(this._eventKeys, listener, this._eventTransform))
    }

    removeAllListeners() {
        return this._eventEmitter.removeAllListeners(this.eventName)
    }

    removeListener(listener: eventType<OutputEvent>) {
        return this._eventEmitter.removeListener(this.eventName, GenericDBusEventEmitter._transformListener(this._eventKeys, listener, this._eventTransform))
    }

    rawListeners() {
        return this._eventEmitter.rawListeners(this.eventName)
    }

    eventNames() {
        return this._eventEmitter.eventNames()
    }
}

export class DBusEventEmitter<T extends dict<string, dBusType>> extends GenericDBusEventEmitter<T, T> {
    constructor(event: string, eventEmitter: EventEmitter, keyProvider: T) {
        super(event, eventEmitter, keyProvider, (event: T) => event)
    }
}