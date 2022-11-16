import * as dbus from "@quadratclown/dbus-next";

const Message = dbus.Message;
import { dict, path, Variant, uint16 } from "../types";

import { BaseHostObject } from "./models/base-host-object";
import { BaseHostInterface } from "./models/base-host-interface";
import { DBusObjectManager } from "../client-interfaces/models/dbus-object-manager";
import { Bluez } from "../bluez";
import { DBusObject } from "../client-interfaces/models/dbus-object";
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

export class HostGattApplication extends BaseHostObject {
  bluez: Bluez;
  services: dict<path, HostGattService>;

  constructor(bluez: Bluez) {
    super(bluez, "/");
    this.services = {};
  }

  GetManagedObjects() {
    const objects = {};
    for (const servicePath of Object.keys(this.services)) {
      const service = this.services[servicePath];
      const object = {};
      object[service.name] = service.GetAll().value;
      objects[service.path] = object;
      for (const charPath of Object.keys(service.Characteristics)) {
        const char = service.Characteristics[charPath];
        const object = {};
        object[char.name] = char.GetAll().value;
        objects[char.path] = object;
      }
    }
    return objects;
  }

  addService(service: HostGattService) {
    this.services[service.path] = service;
  }
}
