import { Bluez } from "../bluez";
import { GattManager1 } from "./generated/GattManager1";
import { BaseInterface } from "./models/base-interface";
import { path, dict } from "../types";
import { Variant } from "dbus-next";
export declare class GattManager extends BaseInterface<GattManager1> {
    /**
    * Hide constructor, initialization shall be done asynchronously with connect
    */
    private constructor();
    static connect(bluez: Bluez, path: String): Promise<GattManager>;
    /**
    * Direct mappings to introspected properties, methods and signals of internal GattManager1
    */
    registerApplication(application: path, options: dict<string, Variant>): Promise<any>;
    unregisterApplication(application: path): Promise<any>;
}
//# sourceMappingURL=gatt-manager.d.ts.map