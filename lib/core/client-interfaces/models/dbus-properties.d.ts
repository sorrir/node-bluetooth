import { OrgfreedesktopDBusProperties } from "../generated/org-freedesktop-DBus-Properties";
import { dict, Variant, dBusType } from "../../types";
import { Signal } from "./signal";
export declare class DBusProperties {
    readonly interfaceName: string;
    protected readonly _internal: OrgfreedesktopDBusProperties;
    constructor(interfaceName: string, internal: OrgfreedesktopDBusProperties);
    /**
    * Get the values of all properties.
    *
    * @returns values of properties, indexed by their name.
    */
    getAllValues(): Promise<{
        [K in string]: dBusType;
    }>;
    get(name: string): Promise<any>;
    set(name: string, value: Variant): Promise<any>;
    getAll(): Promise<any>;
    PropertiesChanged: Signal<{
        interfaceName: string;
        changedProperties: dict<string, Variant>;
        InvalidatedProperties: Array<string>;
    }>;
}
//# sourceMappingURL=dbus-properties.d.ts.map