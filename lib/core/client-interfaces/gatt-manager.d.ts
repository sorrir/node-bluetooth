import { Bluez } from "../bluez";
import { GattManager1 } from "./generated/GattManager1";
import { BaseInterface } from "./models/base-interface";
import { path, dict } from "../types";
import { Variant } from "dbus-next";
export declare class GattManager extends BaseInterface<GattManager1> {
    /**
    * Hide constructor, initialization shall be done asynchronously with connect.
    */
    private constructor();
    /**
     * Connect to GATT manager under the specified path.
     *
     * @param bluez `Bluez` instance.
     * @param path path of the object.
     * @return `GattManager` if it exists.
     */
    static connect(bluez: Bluez, path: String): Promise<GattManager>;
    registerApplication(application: path, options: dict<string, Variant>): Promise<any>;
    unregisterApplication(application: path): Promise<any>;
}
//# sourceMappingURL=gatt-manager.d.ts.map