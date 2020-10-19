import { EventEmitter } from "events";
import { dBusType, dict } from "../../types";

type eventType<T> = (event: T) => Promise<void> | void;
type eventKeys<T> = (keyof T)[];

/**
 * @class
 * A wrapper around an internal {@link EventEmitter} that handles a given well known event on the D-Bus.
 * Allows easier usage, as the event name, as well as input and output parameter transformations
 * are handled internally.
 */

export class GenericDBusEventEmitter<
  InputEvent extends dict<string, dBusType>,
  OutputEvent extends any
> {
  readonly eventName: string;
  private readonly _eventEmitter: EventEmitter;
  private readonly _eventKeys: (keyof InputEvent)[];
  private readonly _eventTransform: (event: InputEvent) => OutputEvent;
  private readonly _eventFilter: (event: OutputEvent) => boolean;

  /**
   * @param event the name of the event to be wrapped.
   * @param eventEmitter EventEmitter to be wrapped. Usually the '_internal' EventEmitter of a client interface.
   * @param keyProvider names of the raw input event arguments.
   * While these are theoretically already given as part of the InputEvent type, TypeScript does not allow
   * accessing these types in the code. Consequently, they need to be provided twice.
   * @param eventTransform transformation from input to output event. Input events directly correspond to
   * the event ocurring on the D-Bus, the output event can be chosen freely.
   * @param eventFilter filters incoming events. If set, only events are emitted for which this function returns true
   */

  constructor(
    event: string,
    eventEmitter: EventEmitter,
    keyProvider: InputEvent,
    eventTransform: (event: InputEvent) => OutputEvent,
    eventFilter: (event: OutputEvent) => boolean = () => true
  ) {
    this.eventName = event;
    this._eventEmitter = eventEmitter;
    this._eventKeys = Object.keys(keyProvider);
    this._eventTransform = eventTransform;
    this._eventFilter = eventFilter;
  }

  /**
   * Wait for a specific event.
   *
   * @param evaluator Function that needs to returns true if the event is the desired one.
   */

  async waitForEvent(
    evaluator: (event: OutputEvent) => boolean
  ): Promise<OutputEvent> {
    const emitter: EventEmitter = this._eventEmitter;
    const eventName = this.eventName;
    const eventKeys = this._eventKeys;
    const eventTransform = this._eventTransform;
    return new Promise<OutputEvent>((resolve) => {
      function onEvent(...eventArgs: any[]) {
        const event = GenericDBusEventEmitter._eventArgsToEvent(
          eventKeys,
          eventArgs,
          eventTransform
        );
        if (evaluator(event) === true) {
          emitter.removeListener(eventName, onEvent);
          resolve(event);
        }
      }
      emitter.addListener(eventName, onEvent);
    });
  }

  /**
   * Transforms a listener function and makes it accept the internal input parameters instead of the outer ones.
   * Also filters it by a given eventFilter to only emit specific events.
   *
   * @param eventKeys names of the input event arguments.
   * @param listener the listener function.
   * @param eventTransform function that transforms input to output events
   * @param eventFilter filters incoming events. Only events are emitted for which this function returns true
   */

  private static _transformListener<T, Y>(
    eventKeys: eventKeys<T>,
    listener: eventType<Y>,
    eventTransform: (event: T) => Y,
    eventFilter: (event: Y) => boolean
  ) {
    return (...eventArgs: any[]) => {
      const event = GenericDBusEventEmitter._eventArgsToEvent(
        eventKeys,
        eventArgs,
        eventTransform
      );
      if (eventFilter(event)) {
        listener(event);
      }
    };
  }

  /**
   * Wraps a list of event arguments as an event.
   *
   * @param eventKeys names of the input event arguments.
   * @param eventArgs input event arguments as list.
   * @param eventTransform function that transforms input to output events
   */

  private static _eventArgsToEvent<T, Y>(
    eventKeys: eventKeys<T>,
    eventArgs: any[],
    eventTransform: (event: T) => Y
  ): Y {
    const event = {};
    eventArgs.forEach((arg, index) => {
      event[<string>eventKeys[index]] = arg;
    });
    return eventTransform(<T>event);
  }

  addListener(listener: eventType<OutputEvent>) {
    this._eventEmitter.addListener(
      this.eventName,
      GenericDBusEventEmitter._transformListener(
        this._eventKeys,
        listener,
        this._eventTransform,
        this._eventFilter
      )
    );
  }

  listeners() {
    return this._eventEmitter.listeners(this.eventName);
  }

  listenerCount() {
    return this._eventEmitter.listenerCount(this.eventName);
  }

  off(listener: eventType<OutputEvent>) {
    return this._eventEmitter.off(
      this.eventName,
      GenericDBusEventEmitter._transformListener(
        this._eventKeys,
        listener,
        this._eventTransform,
        this._eventFilter
      )
    );
  }

  on(listener: eventType<OutputEvent>) {
    return this._eventEmitter.on(
      this.eventName,
      GenericDBusEventEmitter._transformListener(
        this._eventKeys,
        listener,
        this._eventTransform,
        this._eventFilter
      )
    );
  }

  once(listener: eventType<OutputEvent>) {
    return this._eventEmitter.once(
      this.eventName,
      GenericDBusEventEmitter._transformListener(
        this._eventKeys,
        listener,
        this._eventTransform,
        this._eventFilter
      )
    );
  }

  prependListener(listener: eventType<OutputEvent>) {
    return this._eventEmitter.prependListener(
      this.eventName,
      GenericDBusEventEmitter._transformListener(
        this._eventKeys,
        listener,
        this._eventTransform,
        this._eventFilter
      )
    );
  }

  prependOnceListener(listener: eventType<OutputEvent>) {
    return this._eventEmitter.prependOnceListener(
      this.eventName,
      GenericDBusEventEmitter._transformListener(
        this._eventKeys,
        listener,
        this._eventTransform,
        this._eventFilter
      )
    );
  }

  removeAllListeners() {
    return this._eventEmitter.removeAllListeners(this.eventName);
  }

  removeListener(listener: eventType<OutputEvent>) {
    return this._eventEmitter.removeListener(
      this.eventName,
      GenericDBusEventEmitter._transformListener(
        this._eventKeys,
        listener,
        this._eventTransform,
        this._eventFilter
      )
    );
  }

  rawListeners() {
    return this._eventEmitter.rawListeners(this.eventName);
  }

  eventNames() {
    return this._eventEmitter.eventNames();
  }
}

/**
 * @class
 * Simpler form of the {@link GenericDBusEventEmitter}, where output and input events have the same type.
 */

export class DBusEventEmitter<
  T extends dict<string, dBusType>
> extends GenericDBusEventEmitter<T, T> {
  constructor(
    event: string,
    eventEmitter: EventEmitter,
    keyProvider: T,
    eventTransform: (event: T) => T = (event: T) => event,
    eventFilter: (event: T) => boolean = () => true
  ) {
    super(event, eventEmitter, keyProvider, eventTransform, eventFilter);
  }
}
