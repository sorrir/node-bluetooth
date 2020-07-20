import { Bluez } from "../../bluez";
import { path, dBusType, dict, Variant } from "../../types";
import { Message } from "dbus-next";
import * as dbus from 'dbus-next';
export declare type hostProperty = {
    signature: string;
    value: dBusType;
    valueTransform?: ((base: any) => dBusType);
};
export declare class BaseHostInterface extends dbus.interface.Interface {
    static _INTERFACE: string;
    name: string;
    path: path;
    bluez: Bluez;
    managedProperties: dict<string, hostProperty>;
    /**
     *  {@Link _init} has to be called after this
     * */
    constructor(bluez: Bluez, path: path, name: string, managedProperties?: dict<string, hostProperty>);
    protected _init(): this;
    GetAll(): Variant;
    Get(name: string): Variant;
    emitPropertiesChanged(values: dict<string, Variant>): void;
    unexport(): void;
    update(): void;
    _getProperty(name: string, property: hostProperty): Variant;
    _handleReturnFn(msg: Message, name: string, ...args: any[]): boolean;
}
//# sourceMappingURL=base-host-interface.d.ts.map