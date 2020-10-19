import { Bluez } from "../../bluez";
import { path, dBusType, dict, Variant } from "../../types";
import { ProxyObject, ClientInterface, Message } from "dbus-next";
import * as dbus from "dbus-next";
import { Exception } from "handlebars";

const {
  Interface,
  property,
  method,
  signal,
  ACCESS_READ,
  ACCESS_WRITE,
  ACCESS_READWRITE,
} = dbus.interface;

export class DBusObject {
  bluez: Bluez;
  name: string;
  path: path;
  hasProperties: boolean;
  private _object: ProxyObject;
  private _interface: ClientInterface;
  private _properties: ClientInterface;

  constructor(bluez: Bluez, path: path, name: string, hasProperties = false) {
    this.bluez = bluez;
    this.name = name;
    this.path = path;
    this.hasProperties = hasProperties;
  }

  async init() {
    this._object = await this.bluez.bus.getProxyObject("org.bluez", this.path);
    this._interface = this._object.getInterface(this.name);
    if (this.hasProperties)
      this._properties = this._object.getInterface(
        "org.freedesktop.DBus.Properties"
      );
    return this;
  }

  async call(methodName: string, ...args: any[]) {
    return this._interface[methodName](...args);
  }

  async get(parameterName: string) {
    if (!this.hasProperties) {
      throw new Exception("Object has no properties");
    }
    const variant = await this._properties.Get(this.name, parameterName);
    return variant.value;
  }

  async set(parameterName: string, value: dBusType, signature = null) {
    if (signature === null) {
      signature = DBusObject._getSignature(value);
    }
    return this._properties.Set(
      this.name,
      parameterName,
      new Variant(signature, value)
    );
  }

  static _getSignature(value: dBusType) {
    if (typeof value === "string") {
      return "s";
    } else if (typeof value === "boolean") {
      return "b";
    } else if (typeof value === "number") {
      return "n";
    }
    throw new Exception(`Type of ${value} is not trivial`);
  }
}
