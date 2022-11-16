import * as dbus from "@quadratclown/dbus-next";
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
import { HostGattApplication } from "../../core/host-interfaces/host-gatt-application";
import { UartService } from "./uart-service";

export class UartApplication extends HostGattApplication {
  service: UartService;

  constructor(bluez: Bluez) {
    super(bluez);
    this.service = new UartService(bluez, 0);
    this.addService(this.service);
  }
}
