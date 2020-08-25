import { Bluez } from "../bluez";
import { OrgfreedesktopDBusProperties } from "./generated/org-freedesktop-DBus-Properties";
import { BaseInterface } from "./models/base-interface";
import { dict, Variant } from "../types";
import { Signal } from "./models/signal";
export declare class DBusProperties extends BaseInterface<OrgfreedesktopDBusProperties> {
    /**
    * Hide constructor, initialization shall be done asynchronously with connect
    */
    private constructor();
    static connect(bluez: Bluez, path: String): Promise<DBusProperties>;
    get(iface: string, name: string): Promise<any>;
    set(iface: string, name: string, value: Variant): Promise<any>;
    getAll(iface: string): Promise<any>;
    PropertiesChanged: Signal<{
        interfaceName: string;
        changedProperties: dict<string, Variant>;
        InvalidatedProperties: Array<string>;
    }>;
}
//# sourceMappingURL=dbus-properties.d.ts.map