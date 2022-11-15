import { Bluez } from "../../bluez";
import { OrgfreedesktopDBusProperties } from "../generated/org-freedesktop-DBus-Properties";
import { BaseInterface } from "./base-interface";
import {
  int16,
  uint16,
  int32,
  uint32,
  byte,
  path,
  fileDescriptor,
  dict,
  Variant,
  dBusType,
} from "../../types";
import { Signal } from "./signal";

export class DBusProperties {
  readonly interfaceName: string;
  protected readonly _internal: OrgfreedesktopDBusProperties;

  constructor(interfaceName: string, internal: OrgfreedesktopDBusProperties) {
    this._internal = internal;
    this.interfaceName = interfaceName;
  }

  /**
   * Get the values of all properties.
   *
   * @returns values of properties, indexed by their name.
   */

  async getAllValues(): Promise<{ [K in string]: dBusType }> {
    const properties = {};
    for (const [name, variant] of Object.entries(
      <{ [K in string]: Variant }>await this.getAll()
    )) {
      properties[name] = variant.value;
    }
    return properties;
  }

  /*
   * Direct mappings to introspected properties, methods and signals of internal OrgfreedesktopDBusProperties
   */

  //@method({ name: 'Get', inSignature: 'ss', outSignature: 'v' })
  async get(name: string) {
    return this._internal.Get(this.interfaceName, name);
  }

  //@method({ name: 'Set', inSignature: 'ssv', outSignature: '' })
  async set(name: string, value: Variant) {
    return this._internal.Set(this.interfaceName, name, value);
  }

  //@method({ name: 'GetAll', inSignature: 's', outSignature: 'a{sv}' })
  async getAll() {
    return this._internal.GetAll(this.interfaceName);
  }

  //@signal({ name: 'PropertiesChanged', signature: 'sa{sv}as' })
  PropertiesChanged = new Signal<{
    interfaceName: string;
    changedProperties: dict<string, Variant>;
    InvalidatedProperties: Array<string>;
  }>("PropertiesChanged", (<any>this)._internal, {
    interfaceName: null,
    changedProperties: null,
    InvalidatedProperties: null,
  });
}
