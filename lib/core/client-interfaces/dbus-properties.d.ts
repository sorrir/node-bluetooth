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
    /**
    * Direct mappings to introspected properties, methods and signals of internal OrgfreedesktopDBusProperties
    */
    get(iface: string, name: string): Promise<any>;
    set(iface: string, name: string, value: Variant): Promise<any>;
    getAll(iface: string): Promise<any>;
    propertiesChanged: Signal<{
        interfaceName: string;
        changedProperties: dict<string, Variant>;
        invalidatedProperties: Array<string>;
    }>;
}
//# sourceMappingURL=dbus-properties.d.ts.map