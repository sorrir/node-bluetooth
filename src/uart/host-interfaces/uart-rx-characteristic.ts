import * as dbus from "@quadratclown/dbus-next";
import { Exception } from "handlebars";
import { Variant, uint16 } from "../../core/types";

const Message = dbus.Message;
const {
  Interface,
  property,
  method,
  signal,
  ACCESS_READ,
  ACCESS_WRITE,
  ACCESS_READWRITE,
} = dbus.interface;

import { Bluez } from "../../core/bluez";
import { HostGattCharacteristic } from "../../core/host-interfaces/host-gatt-characteristic";
import { HostGattService } from "../../core/host-interfaces/host-gatt-service";

const RX_CHAR_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";

export class UartRxCharacteristic extends HostGattCharacteristic {
  constructor(bluez: Bluez, service: HostGattService, index: uint16) {
    super(bluez, service, RX_CHAR_UUID, ["write"], index);
    this.update();
  }

  @method({ inSignature: "aya{sv}", outSignature: "" })
  WriteValue(value, options) {
    const message = Buffer.from(value).toString();
    this.onMessage(message, options);
  }

  onMessage(message, options) {
    console.log(message);
  }
}
