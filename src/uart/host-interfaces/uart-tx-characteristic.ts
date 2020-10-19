import * as dbus from "dbus-next";
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

const TX_CHAR_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

export class UartTxCharacteristic extends HostGattCharacteristic {
  notifying: boolean;

  constructor(bluez: Bluez, service: HostGattService, index: uint16) {
    super(bluez, service, TX_CHAR_UUID, ["notify"], index);
    this.notifying = false;
    this.update();
  }

  @method({ inSignature: "", outSignature: "" })
  StartNotify() {
    this.notifying = true;
  }

  @method({ inSignature: "", outSignature: "" })
  StopNotify() {
    this.notifying = false;
  }

  sendMessage(message: any) {
    if (!this.notifying) {
      throw new Exception("Not notifying!");
    }
    this.emitPropertiesChanged({
      Value: new Variant("ay", [...Buffer.from(message)]),
    });
  }
}
