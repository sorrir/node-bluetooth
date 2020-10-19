import * as dbus from "dbus-next";

const Message = dbus.Message;
import { dict, path, Variant, uint16 } from "../types";

import { BaseHostObject } from "./models/base-host-object";
import { BaseHostInterface } from "./models/base-host-interface";
import { DBusObjectManager } from "../client-interfaces/models/dbus-object-manager";
import { Bluez } from "../bluez";
import { DBusObject } from "../client-interfaces/models/dbus-object";
import { HostGattDescriptor } from "./host-gatt-descriptor";
import { HostGattService } from "./host-gatt-service";

const {
  Interface,
  property,
  method,
  signal,
  ACCESS_READ,
  ACCESS_WRITE,
  ACCESS_READWRITE,
} = dbus.interface;

export class HostGattCharacteristic extends BaseHostInterface {
  UUID: string;
  Service: HostGattService;
  Flags: string[];
  Descriptors: dict<path, HostGattDescriptor>;

  constructor(
    bluez: Bluez,
    service: HostGattService,
    uuid: string,
    flags: string[] = [],
    index: uint16 = 0
  ) {
    super(
      bluez,
      HostGattCharacteristic.GetPath(service, index),
      `org.bluez.GattCharacteristic1`,
      {
        Service: {
          signature: "o",
          value: service,
          valueTransform: (val) => val.path,
        },
        UUID: new Variant("s", uuid),
        Flags: new Variant("as", flags),
        Descriptors: {
          signature: "ao",
          value: {},
          valueTransform: (val) => Object.keys(val),
        },
      }
    );
    this._init();
  }

  static GetPath(service, index) {
    return `${service.path}/char${index}`;
  }

  @method({ inSignature: "a{sv}", outSignature: "ay" })
  ReadValue(value, options) {
    console.log(`${this.path}:ReadValue`);
  }

  @method({ inSignature: "aya{sv}", outSignature: "" })
  WriteValue(value, options) {
    console.log(`${this.path}:WriteValue`);
    console.log(Buffer.from(value.value));
  }

  @method({ inSignature: "", outSignature: "" })
  StartNotify() {
    console.log(`${this.path}:StartNotify`);
  }

  @method({ inSignature: "", outSignature: "" })
  StopNotify() {
    console.log(`${this.path}:StopNotify`);
  }

  addDescriptor(uuid: string, flags: string[] = [], index: uint16 = 0) {
    const descriptor = new HostGattDescriptor(
      this.bluez,
      this,
      uuid,
      flags,
      index
    );
    this.Descriptors[descriptor.path] = descriptor;
    return descriptor;
  }

  removeCharacteristic(index: uint16 = 0) {
    const path = HostGattDescriptor.GetPath(this, index);
    this.Descriptors[path] = undefined;
    this.bluez.bus.unexport(path);
  }
}
