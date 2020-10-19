import * as dbus from "dbus-next";
import { BaseHostInterface } from "../../core/host-interfaces/models/base-host-interface";
import { Bluez } from "../../core/bluez";
import { uint16, Variant } from "../../core/types";

const {
  Interface,
  property,
  method,
  signal,
  ACCESS_READ,
  ACCESS_WRITE,
  ACCESS_READWRITE,
} = dbus.interface;

export class UartAdvertisement extends BaseHostInterface {
  LocalName: string;
  ServiceUUIDs: string[];
  Includes: string[];
  Type: string;

  constructor(bluez: Bluez, name: string, index: uint16 = 0) {
    super(
      bluez,
      `/org/bluez/sorrir/advertisement${index}`,
      `org.bluez.LEAdvertisement1`,
      {
        LocalName: new Variant("s", name),
        ServiceUUIDs: new Variant("as", [
          "6e400001-b5a3-f393-e0a9-e50e24dcca9e",
        ]),
        Includes: new Variant("as", ["tx-power"]),
        Type: new Variant("s", "peripheral"),
      }
    );
    this._init();
  }

  @method({ inSignature: "", outSignature: "" })
  Release() {
    console.log("released!");
  }
}
