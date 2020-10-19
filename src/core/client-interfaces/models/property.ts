import {
  DBusEventEmitter,
  GenericDBusEventEmitter,
} from "./dbus-event-emitter";
import { dBusType, dict, Variant } from "../../types";
import * as Helper from "../../helper";
import { Exception } from "handlebars";

/**
 * Transform the value from its outside representation to its inner equivalent
 * in both directions.
 * 'Inner' in this context refers to the data type of the underlying D-Bus property.
 * 'Outer' is the data type the user can see and interact with.
 */

export type ValueTransformer<I extends dBusType, O extends dBusType> = {
  readonly in: (value: O) => I;
  readonly out: (value: I) => O;
};

/**
 * Transform the value from its inner representation to its outer equivalent.
 * 'Inner' in this context refers to the data type of the underlying D-Bus property.
 * 'Outer' is the data type the user can see and interact with.
 */

export type ReadOnlyValueTransformer<I extends dBusType, O extends dBusType> = {
  readonly in: (value: O) => I;
};

/**
 * @class
 * Property that can only be read.
 * Wraps around the 'PropertiesChanged' event of the '_internal' {@link EventEmitter} of a client interface.
 */

export class ReadOnlyProperty<
  T extends dBusType
> extends GenericDBusEventEmitter<
  {
    interfaceName: string;
    changedProperties: dict<string, Variant>;
    invalidatedProperties: Array<string>;
  },
  T
> {
  readonly name: string;
  protected readonly _internal: any;
  protected readonly _valueTransformer: ValueTransformer<T, any>;

  constructor(
    name: string,
    internal: any,
    valueTransformer: ReadOnlyValueTransformer<T, any> = {
      in: (value) => <T>value,
    }
  ) {
    super(
      "PropertiesChanged",
      internal,
      {
        interfaceName: null,
        changedProperties: null,
        invalidatedProperties: null,
      },
      (event) =>
        valueTransformer.in((event.changedProperties[name] || {}).value)
    );
    this.name = name;
    this._internal = internal;
    this._valueTransformer = { out: (value) => <T>value, ...valueTransformer };
  }

  /**
   * Get the value of the property.
   *
   * @returns the value of the property.
   */

  async get(): Promise<T> {
    return this._internal[this.name]();
  }

  /**
   * Wait until a change of the property happens.
   *
   * @returns the value of the property after the change.
   */

  async waitForChange(): Promise<T> {
    return this.waitForEvent(() => true);
  }

  /**
   * Wait for a specific value of the property.
   *
   * @param newValue  the value to be reached.
   * @param timeoutMs timeout in milliseconds. Defaults to 30 seconds.
   *
   * @throws an exception if the new value is not reached until the given timeout
   */
  async waitForValue(newValue: T, timeoutMs = 30000): Promise<void> {
    const _this = this;
    // check the current value and simultaneously wait for an incoming event
    // return true if either of those reach the desired value before the timeout
    // return false otherwise
    return Helper.firstResolve<boolean>([
      new Promise<boolean>(async (resolve, reject) => {
        const value = await _this.get();
        if (value === newValue) {
          resolve(true);
        } else {
          reject();
        }
      }),
      this.waitForEvent((value) => value === newValue).then(() => true),
      Helper.sleep(timeoutMs).then(() => false),
    ]).then((success) => {
      if (!success) {
        throw new Exception(
          `Waiting for value timed out: '${this.name}' did not become '${newValue}'`
        );
      }
    });
  }
}

/**
 * @class
 * Property that can be set as well as read.
 */

export class Property<T extends dBusType> extends ReadOnlyProperty<T> {
  constructor(
    name: string,
    internal: any,
    valueTransformer: ValueTransformer<T, any> = {
      in: (value) => <T>value,
      out: (value) => <dBusType>value,
    }
  ) {
    super(name, internal, valueTransformer);
  }

  /**
   * Set the value of the property.
   *
   * @param value the new value.
   */

  async set(value: T): Promise<void> {
    return this._internal[this.name](this._valueTransformer.out(value));
  }
}

export type ReadWriteProperty<T extends dBusType> =
  | Property<T>
  | ReadOnlyProperty<T>;
