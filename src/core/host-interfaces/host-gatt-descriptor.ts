import * as dbus from "dbus-next";

const Message = dbus.Message;
import { dict, path, Variant, uint16 } from "../types";

import { BaseHostObject } from "./models/base-host-object";
import { BaseHostInterface } from "./models/base-host-interface";
import { DBusObjectManager } from "../client-interfaces/models/dbus-object-manager";
import { Bluez } from "../bluez";
import { DBusObject } from "../client-interfaces/models/dbus-object";
import { HostGattCharacteristic } from "./host-gatt-characteristic";

const {
  Interface,
  property,
  method,
  signal,
  ACCESS_READ,
  ACCESS_WRITE,
  ACCESS_READWRITE,
} = dbus.interface;

export class HostGattDescriptor extends BaseHostInterface {
  UUID: string;
  Characteristic: HostGattCharacteristic;
  Flags: string[];

  constructor(
    bluez: Bluez,
    characteristic: HostGattCharacteristic,
    uuid: string,
    flags = [],
    index = 0
  ) {
    super(
      bluez,
      HostGattDescriptor.GetPath(characteristic, index),
      `org.bluez.GattDescriptor1`,
      {
        Characteristic: {
          signature: "o",
          value: characteristic,
          valueTransform: (val) => val.path,
        },
        UUID: new Variant("s", uuid),
        Flags: new Variant("as", flags),
      }
    );
    this._init();
  }

  static GetPath(characteristic: HostGattCharacteristic, index) {
    return `${characteristic.path}/desc${index}`;
  }

  @method({ inSignature: "a{sv}", outSignature: "ay" })
  ReadValue(value, options) {
    console.log(`${this.path}:ReadValue`);
  }

  @method({ inSignature: "aya{sv}", outSignature: "" })
  WriteValue(value, options) {
    console.log(`${this.path}:WriteValue`);
  }
}
