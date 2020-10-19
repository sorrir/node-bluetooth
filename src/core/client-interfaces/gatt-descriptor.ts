import { Bluez } from "../bluez";
import { GattDescriptor1 } from "./generated/GattDescriptor1";
import { BaseInterface } from "./models/base-interface";
import { Signal } from "./models/signal";
import { Property, ReadOnlyProperty } from "./models/property";
import {
  int16,
  uint16,
  int32,
  uint32,
  byte,
  path,
  fileDescriptor,
  dict,
  Variant,
  dBusType,
} from "../types";

export class GattDescriptor extends BaseInterface<GattDescriptor1> {
  /**
   * Hide constructor, initialization shall be done asynchronously with connect.
   */
  private constructor(bluez: Bluez, internal: GattDescriptor1) {
    super(bluez, internal);
  }

  /**
   * Connect to GATT descriptor under the specified path.
   *
   * @param bluez `Bluez` instance.
   * @param path path of the object.
   * @return `GattDescriptor` if it exists.
   */
  static async connect(bluez: Bluez, path: string) {
    return new GattDescriptor(
      bluez,
      await GattDescriptor1.Connect(bluez.bus, path)
    );
  }

  /*
   * Direct mappings to introspected properties, methods and signals of internal GattDescriptor1
   */

  //@property({ name: 'UUID', signature: 's', access: ACCESS_READ })
  UUID = new ReadOnlyProperty<string>("UUID", this._internal);

  //@property({ name: 'Characteristic', signature: 'o', access: ACCESS_READ })
  Characteristic = new ReadOnlyProperty<path>("Characteristic", this._internal);

  //@property({ name: 'Value', signature: 'ay', access: ACCESS_READ })
  Value = new ReadOnlyProperty<Array<byte>>("Value", this._internal);

  //@method({ name: 'ReadValue', inSignature: 'a{sv}', outSignature: 'ay' })
  async readValue(options: dict<string, Variant>): Promise<Array<byte>> {
    return new Array<byte>(await this._internal.ReadValue(options));
  }

  //@method({ name: 'WriteValue', inSignature: 'aya{sv}', outSignature: '' })
  async writeValue(value: Array<byte>, options: dict<string, Variant>) {
    return this._internal.WriteValue(value, options);
  }
}
