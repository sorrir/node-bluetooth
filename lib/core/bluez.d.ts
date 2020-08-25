import { MessageBus } from 'dbus-next/lib/bus';
import { DBusObjectManager } from "./client-interfaces/models/dbus-object-manager";
import { BaseHostInterface } from './host-interfaces/models/base-host-interface';
import { DBusObject } from "./client-interfaces/models/dbus-object";
import { path } from './types';
export declare class Bluez {
    readonly bus: MessageBus;
    objectManager: DBusObjectManager;
    constructor();
    init(): Promise<this>;
    getObjectData(interfaceName: string, path?: string): Promise<{}>;
    getDBusObject(path: path, name: string, withProps?: boolean): Promise<DBusObject>;
    exportInterface(iface: BaseHostInterface): any;
    unexportInterface(iface: BaseHostInterface): any;
    updateInterface(iface: BaseHostInterface): void;
}
//# sourceMappingURL=bluez.d.ts.map