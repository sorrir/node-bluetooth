import { EventEmitter } from "events";
import { DBusEventEmitter } from "./dbus-event-emitter";
import { dBusType, dict } from "../../types";

export class Signal<T extends dict<string, dBusType>> extends DBusEventEmitter<
  T
> {
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
