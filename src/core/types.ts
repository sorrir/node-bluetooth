import * as dbus from "@quadratclown/dbus-next";

//TODO: find a better solution for this workaround
//The constructor of Variant is not correctly declared
//in types.d.ts of dbus-next, so no constructor with
//input arguments is accepted by typescript
//to use Variants in typescript, the class is extended
//with the needed constructor, however the name of it is checked
//in some functions of dbus. This therefore the prototype
// of the constructor is overriden before the export
class Variant extends dbus.Variant<dBusType> {
  constructor(signature: string, value: dBusType) {
    super();
    this.signature = signature;
    this.value = value;
  }
}
Variant.prototype.constructor = dbus.Variant;
export { Variant };

export class DBusSignatures {
  static boolean = "b";
  static int16 = "n";
  static uint16 = "q";
  static int32 = "i";
  static uint32 = "u";
  static byte = "y";
  static path = "o";
  static string = "s";
  static Variant = "v";
  static fileDescriptor = "h";
  static Array = "a";
  static dict = "a{";
  static getSignature(type: string): string {
    return DBusSignatures[type];
  }
  static getType(signature: string): string {
    return Object.entries(DBusSignatures).find(
      ([_, val]) => val === signature
    )[0];
  }
  static getImportableTypes() {
    return [
      "int16",
      "uint16",
      "int32",
      "uint32",
      "byte",
      "path",
      "fileDescriptor",
      "dict",
    ];
  }
}

export type int16 = number;
export type uint16 = number;
export type int32 = number;
export type uint32 = number;
export type byte = number;
export type path = string;
export type fileDescriptor = string;
export type dict<K extends string | number, V extends dBusType> = {
  [P in K]: V;
};

export type dBusType =
  | boolean
  | int16
  | uint16
  | int32
  | uint32
  | byte
  | path
  | string
  | Variant
  | fileDescriptor
  | Array<any>
  | dict<any, any>;
