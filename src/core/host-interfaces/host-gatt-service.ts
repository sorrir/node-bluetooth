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

export class HostGattService extends BaseHostInterface {
  UUID: string;
  Primary: boolean;
  Characteristics: dict<path, HostGattCharacteristic>;

  constructor(bluez: Bluez, uuid: string, primary: boolean, index: uint16 = 0) {
    super(
      bluez,
      `/org/bluez/sorrir/service${index}`,
      `org.bluez.GattService1`,
      {
        UUID: { signature: "s", value: uuid },
        Characteristics: {
          signature: "ao",
          value: {},
          valueTransform: (val) => Object.keys(val),
        },
        Primary: { signature: "b", value: primary },
      }
    );
    this._init();
  }

  addCharacteristic(characteristic: HostGattCharacteristic) {
    this.Characteristics[characteristic.path] = characteristic;
  }

  removeCharacteristic(characteristic: HostGattCharacteristic) {
    this.Characteristics[characteristic.path] = undefined;
  }
}
