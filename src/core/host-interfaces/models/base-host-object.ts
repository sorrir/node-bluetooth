import { Bluez } from "../../bluez";
import { path, dBusType, dict, Variant } from "../../types";
import { ProxyObject, ClientInterface, Message } from "@quadratclown/dbus-next";
import * as dbus from "@quadratclown/dbus-next";
import { Exception } from "handlebars";

const {
  Interface,
  property,
  method,
  signal,
  ACCESS_READ,
  ACCESS_WRITE,
  ACCESS_READWRITE,
} = dbus.interface;

export class BaseHostObject {
  static _INTERFACE = "org.freedesktop.DBus.ObjectManager";
  path: path;

  constructor(bluez: Bluez, path: path) {
    this.path = path;
    const _this = this;
    bluez.bus.addMethodHandler((msg: Message) => {
      if (
        msg.path === _this.path &&
        msg.interface === BaseHostObject._INTERFACE &&
        msg.member === "GetManagedObjects"
      ) {
        const someMethodReply = Message.newMethodReturn(msg, "a{oa{sa{sv}}}", [
          _this.GetManagedObjects(),
        ]);
        bluez.bus.send(someMethodReply);
        return true;
      }
    });
  }

  GetManagedObjects() {
    return {};
  }
}
