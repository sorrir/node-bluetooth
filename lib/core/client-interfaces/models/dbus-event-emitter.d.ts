/// <reference types="node" />
import { EventEmitter } from "events";
import { dBusType, dict } from "../../types";
declare type eventType<T> = (event: T) => Promise<void> | void;
export declare class GenericDBusEventEmitter<InputEvent extends dict<string, dBusType>, OutputEvent extends any> {
    readonly eventName: string;
    private readonly _eventEmitter;
    private readonly _eventKeys;
    private readonly _eventTransform;
    constructor(event: string, eventEmitter: EventEmitter, keyProvider: InputEvent, eventTransform: (event: InputEvent) => OutputEvent);
    waitForEvent(evaluator: (event: OutputEvent) => boolean): Promise<OutputEvent>;
    private static _transformListener;
    private static _eventArgsToEvent;
    addListener(listener: eventType<OutputEvent>): void;
    listeners(): Function[];
    listenerCount(): number;
    off(listener: eventType<OutputEvent>): EventEmitter;
    on(listener: eventType<OutputEvent>): EventEmitter;
    once(listener: eventType<OutputEvent>): EventEmitter;
    prependListener(listener: eventType<OutputEvent>): EventEmitter;
    prependOnceListener(listener: eventType<OutputEvent>): EventEmitter;
    removeAllListeners(): EventEmitter;
    removeListener(listener: eventType<OutputEvent>): EventEmitter;
    rawListeners(): Function[];
    eventNames(): (string | symbol)[];
}
export declare class DBusEventEmitter<T extends dict<string, dBusType>> extends GenericDBusEventEmitter<T, T> {
    constructor(event: string, eventEmitter: EventEmitter, keyProvider: T);
}
export {};
//# sourceMappingURL=dbus-event-emitter.d.ts.map