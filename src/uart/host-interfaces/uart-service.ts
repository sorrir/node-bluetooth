import * as dbus from "@quadratclown/dbus-next";

import { uint16 } from "../../core/types";

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
import { HostGattService } from "../../core/host-interfaces/host-gatt-service";
import { UartTxCharacteristic } from "./uart-tx-characteristic";
import { UartRxCharacteristic } from "./uart-rx-characteristic";

const UART_SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";

export class UartService extends HostGattService {
  txCharacteristic: UartTxCharacteristic;
  rxCharacteristic: UartRxCharacteristic;

  constructor(bluez: Bluez, index: uint16) {
    super(bluez, UART_SERVICE_UUID, true, index);
    this.txCharacteristic = new UartTxCharacteristic(bluez, this, 0);
    this.rxCharacteristic = new UartRxCharacteristic(bluez, this, 1);
    this.addCharacteristic(this.txCharacteristic);
    this.addCharacteristic(this.rxCharacteristic);
  }
}
