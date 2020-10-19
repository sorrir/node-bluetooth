import { Bluez } from "../bluez";
import { GattCharacteristic1 } from "./generated/GattCharacteristic1";
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

export class GattCharacteristic extends BaseInterface<GattCharacteristic1> {
  /**
   * Hide constructor, initialization shall be done asynchronously with connect.
   */
  private constructor(bluez: Bluez, internal: GattCharacteristic1) {
    super(bluez, internal);
  }

  /**
   * Connect to GATT characteristic under the specified path.
   *
   * @param bluez `Bluez` instance.
   * @param path path of the object.
   * @return `GattCharacteristic` if it exists.
   */
  static async connect(bluez: Bluez, path: string) {
    return new GattCharacteristic(
      bluez,
      await GattCharacteristic1.Connect(bluez.bus, path)
    );
  }

  /**
   * Write a string to the characteristic.
   *
   * @param text text to write.
   * @param options options for writing the text.
   */
  async writeString(text: string, options: dict<string, Variant> = {}) {
    return this.writeValue(Buffer.from(text).toJSON().data, options);
  }

  /**
   * Read a string from the characteristic.
   *
   * @param options currently not used
   */
  async readString(options: dict<string, Variant> = {}) {
    return Buffer.from(await this.Value.get()).toString();
  }

  ValueAsString = new ReadOnlyProperty<string>("Value", this._internal, {
    in: (value) => Buffer.from(value).toString(),
  });

  /*
   * Direct mappings to introspected properties, methods and signals of internal GattCharacteristic1
   */

  //@property({ name: 'UUID', signature: 's', access: ACCESS_READ })
  UUID = new ReadOnlyProperty<string>("UUID", this._internal);

  //@property({ name: 'Service', signature: 'o', access: ACCESS_READ })
  Service = new ReadOnlyProperty<path>("Service", this._internal);

  //@property({ name: 'Value', signature: 'ay', access: ACCESS_READ })
  Value = new ReadOnlyProperty<Array<byte>>("Value", this._internal);

  //@property({ name: 'Notifying', signature: 'b', access: ACCESS_READ })
  Notifying = new ReadOnlyProperty<boolean>("Notifying", this._internal);

  //@property({ name: 'Flags', signature: 'as', access: ACCESS_READ })
  Flags = new ReadOnlyProperty<Array<string>>("Flags", this._internal);

  //@property({ name: 'WriteAcquired', signature: 'b', access: ACCESS_READ })
  WriteAcquired = new ReadOnlyProperty<boolean>(
    "WriteAcquired",
    this._internal
  );

  //@property({ name: 'NotifyAcquired', signature: 'b', access: ACCESS_READ })
  NotifyAcquired = new ReadOnlyProperty<boolean>(
    "NotifyAcquired",
    this._internal
  );

  //@method({ name: 'ReadValue', inSignature: 'a{sv}', outSignature: 'ay' })
  async readValue(options: dict<string, Variant>): Promise<Array<byte>> {
    return new Array<byte>(await this._internal.ReadValue(options));
  }

  //@method({ name: 'WriteValue', inSignature: 'aya{sv}', outSignature: '' })
  async writeValue(value: Array<byte>, options: dict<string, Variant>) {
    return this._internal.WriteValue(value, options);
  }

  //@method({ name: 'AcquireWrite', inSignature: 'a{sv}', outSignature: 'hq' })
  async acquireWrite(options: dict<string, Variant>) {
    return this._internal.AcquireWrite(options);
  }

  //@method({ name: 'AcquireNotify', inSignature: 'a{sv}', outSignature: 'hq' })
  async acquireNotify(options: dict<string, Variant>) {
    return this._internal.AcquireNotify(options);
  }

  //@method({ name: 'StartNotify', inSignature: '', outSignature: '' })
  async startNotify() {
    return this._internal.StartNotify();
  }

  //@method({ name: 'StopNotify', inSignature: '', outSignature: '' })
  async stopNotify() {
    return this._internal.StopNotify();
  }
}
