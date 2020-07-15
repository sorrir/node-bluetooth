import { Bluez } from "../../bluez";
import { path, dBusType } from "../../types";
export declare class DBusObject {
    bluez: Bluez;
    name: string;
    path: path;
    hasProperties: boolean;
    private _object;
    private _interface;
    private _properties;
    constructor(bluez: Bluez, path: path, name: string, hasProperties?: boolean);
    init(): Promise<this>;
    call(methodName: string, ...args: any[]): Promise<any>;
    get(parameterName: string): Promise<any>;
    set(parameterName: string, value: dBusType, signature?: any): Promise<any>;
    static _getSignature(value: dBusType): "b" | "s" | "n";
}
//# sourceMappingURL=dbus-object.d.ts.map