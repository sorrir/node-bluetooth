import { Bluez } from "../bluez";
import { Media1 } from "./generated/Media1";
import { BaseInterface } from "./models/base-interface";
import { path, dict } from "../types";
import { Variant } from "dbus-next";
export declare class Media extends BaseInterface<Media1> {
    /**
    * Hide constructor, initialization shall be done asynchronously with connect
    */
    private constructor();
    static connect(bluez: Bluez, path: String): Promise<Media>;
    /**
    * Direct mappings to introspected properties, methods and signals of internal Media1
    */
    registerEndpoint(endpoint: path, properties: dict<string, Variant>): Promise<any>;
    unregisterEndpoint(endpoint: path): Promise<any>;
    registerPlayer(player: path, properties: dict<string, Variant>): Promise<any>;
    unregisterPlayer(player: path): Promise<any>;
    registerApplication(application: path, options: dict<string, Variant>): Promise<any>;
    unregisterApplication(application: path): Promise<any>;
}
//# sourceMappingURL=media.d.ts.map