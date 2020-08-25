/// <reference types="node" />
import { EventEmitter } from "events";
import { dBusType, dict } from "../../types";
declare type eventType<T> = (event: T) => Promise<void> | void;
/**
 * @class
 * A wrapper around an internal {@link EventEmitter} that handles a given well known event on the D-Bus.
 * Allows easier usage, as the event name, as well as input and output parameter transformations
 * are handled internally.
 */
export declare class GenericDBusEventEmitter<InputEvent extends dict<string, dBusType>, OutputEvent extends any> {
    readonly eventName: string;
    private readonly _eventEmitter;
    private readonly _eventKeys;
    private readonly _eventTransform;
    /**
     * @param event the name of the event to be wrapped.
     * @param eventEmitter EventEmitter to be wrapped. Usually the '_internal' EventEmitter of a client interface.
     * @param keyProvider names of the raw input event arguments.
     * While these are theoretically already given as part of the InputEvent type, TypeScript does not allow
     * accessing these types in the code. Consequently, they need to be provided twice.
     * @param eventTransform transformation from input to output event. Input events directly correspond to
     * the event ocurring on the D-Bus, the output event can be chosen freely.
     */
    constructor(event: string, eventEmitter: EventEmitter, keyProvider: InputEvent, eventTransform: (event: InputEvent) => OutputEvent);
    /**
     * Wait for a specific event.
     *
     * @param evaluator Function that needs to returns true if the event is the desired one.
     */
    waitForEvent(evaluator: (event: OutputEvent) => boolean): Promise<OutputEvent>;
    /**
     * Transforms a listener function and makes it accept the internal input parameters instead of the outer ones.
     *
     * @param eventKeys names of the input event arguments.
     * @param listener the listener function.
     * @param eventTransform function that transforms input to output events
     */
    private static _transformListener;
    /**
     * Wraps a list of event arguments as an event.
     *
     * @param eventKeys names of the input event arguments.
     * @param eventArgs input event arguments as list.
     * @param eventTransform function that transforms input to output events
     */
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
/**
 * @class
 * Simpler form of the {@link GenericDBusEventEmitter}, where output and input events are the same.
 */
export declare class DBusEventEmitter<T extends dict<string, dBusType>> extends GenericDBusEventEmitter<T, T> {
    constructor(event: string, eventEmitter: EventEmitter, keyProvider: T);
}
export {};
//# sourceMappingURL=dbus-event-emitter.d.ts.map