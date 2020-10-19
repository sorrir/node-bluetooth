import { Bluez } from "../../bluez";
import { EventEmitter } from "events";
import { ReturnFunction, RetryOptions, sleep } from "../../helper";
import { ReadOnlyProperty, ReadWriteProperty } from "./property";
import { dBusType } from "../../types";
import { DBusProperties } from "./dbus-properties";
import { DBusObjectManager } from "./dbus-object-manager";

type _InterfaceConstructor<T extends BaseInterface<any>> = (
  bluez: Bluez,
  path: string
) => Promise<T>;

/**
 * @class
 * Base class that all client interfaces extend.
 *
 * Wraps around an auto-generated interface, generated from the introspection
 * of the provided interfaces by Bluez.
 */

export class BaseInterface<T extends EventEmitter> {
  protected readonly _bluez: Bluez;
  protected readonly _internal: T;
  readonly Properties: DBusProperties;
  readonly ObjectManager: DBusObjectManager;
  readonly path: string;

  constructor(bluez: Bluez, internal: T) {
    this._bluez = bluez;
    this._internal = internal;
    const generatedDBusObject = <any>internal;
    this.path = generatedDBusObject.dbusObject.path;
    this.Properties = new DBusProperties(
      generatedDBusObject.dbusInterfaceName,
      generatedDBusObject.propertiesDBusInterface
    );
    this.ObjectManager = bluez.objectManager.branch(this.path);
  }

  /**
   * @return the internal {@Link EventEmitter}
   */
  eventEmitter(): EventEmitter {
    return <EventEmitter>this._internal;
  }

  async getChildObjectsRaw(interfaceName: string) {
    return this._bluez.getObjectData(interfaceName, this.path);
  }

  /**
   * Finds a specific child object that matches the given filter.
   *
   * @param interfaceName name of the child objects interface.
   * @param constructor constructor of the child object
   * @param filter properties of that child
   * @param retryOptions retry this operation with a given number of times and interval in ms.
   * Does not repeat by default.
   *
   * @returns a matching child object if one exists. If multiple childs match the filter,
   * the first one is returned.
   */

  async getChildObject<T extends BaseInterface<any>>(
    interfaceName: string,
    constructor: _InterfaceConstructor<T>,
    filter: { [K in string]: dBusType } = {},
    retryOptions: RetryOptions = { maxRetries: 0, retryIntervalMs: 1000 }
  ): Promise<T | undefined> {
    const childData = await this._bluez.getObjectData(interfaceName, this.path);
    for (const [path, data] of Object.entries(childData)) {
      let isIn = true;
      for (const [key, filterValue] of Object.entries(filter)) {
        const objectValue = (data[key] || {}).value;
        if (objectValue instanceof Array) {
          if (filterValue instanceof Array) {
            isIn = filterValue.every((val) => objectValue.includes(val));
          } else {
            isIn = objectValue.includes(filterValue);
          }
        } else {
          isIn = objectValue === filterValue;
        }
        if (!isIn) {
          break;
        }
      }
      if (isIn) {
        return constructor(this._bluez, path);
      }
    }
    if (retryOptions.maxRetries > 0) {
      await sleep(retryOptions.retryIntervalMs);
      retryOptions.maxRetries--;
      return this.getChildObject(
        interfaceName,
        constructor,
        filter,
        retryOptions
      );
    }
    return undefined;
  }
}
