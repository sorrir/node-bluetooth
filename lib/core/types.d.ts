import * as dbus from 'dbus-next';
declare class Variant extends dbus.Variant<dBusType> {
    constructor(signature: string, value: dBusType);
}
export { Variant };
export declare class DBusSignatures {
    static boolean: string;
    static int16: string;
    static uint16: string;
    static int32: string;
    static uint32: string;
    static byte: string;
    static path: string;
    static string: string;
    static Variant: string;
    static fileDescriptor: string;
    static Array: string;
    static dict: string;
    static getSignature(type: string): String;
    static getType(signature: string): String;
    static getImportableTypes(): string[];
}
export declare type int16 = number;
export declare type uint16 = number;
export declare type int32 = number;
export declare type uint32 = number;
export declare type byte = number;
export declare type path = string;
export declare type fileDescriptor = string;
export declare type dict<K extends string | number, V extends dBusType> = {
    [P in K]: V;
};
export declare type dBusType = boolean | int16 | uint16 | int32 | uint32 | byte | path | string | Variant | fileDescriptor | Array<any> | dict<any, any>;
//# sourceMappingURL=types.d.ts.map