import { Bluez } from "../bluez";
import { Media1 } from "./generated/Media1";
import { BaseInterface } from "./models/base-interface";
import { path, dict } from "../types";
import { Variant } from "dbus-next";
export declare class Media extends BaseInterface<Media1> {
    /**
    * Hide constructor, initialization shall be done asynchronously with connect.
    */
    private constructor();
    /**
     * Connect to media under the specified path.
     *
     * @param bluez `Bluez` instance.
     * @param path path of the object.
     * @return `Media` if it exists.
     */
    static connect(bluez: Bluez, path: String): Promise<Media>;
    registerEndpoint(endpoint: path, properties: dict<string, Variant>): Promise<any>;
    unregisterEndpoint(endpoint: path): Promise<any>;
    registerPlayer(player: path, properties: dict<string, Variant>): Promise<any>;
    unregisterPlayer(player: path): Promise<any>;
    registerApplication(application: path, options: dict<string, Variant>): Promise<any>;
    unregisterApplication(application: path): Promise<any>;
}
//# sourceMappingURL=media.d.ts.map