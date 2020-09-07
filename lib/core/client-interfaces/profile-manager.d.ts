import { Bluez } from "../bluez";
import { ProfileManager1 } from "./generated/ProfileManager1";
import { BaseInterface } from "./models/base-interface";
import { path, dict } from "../types";
import { Variant } from "dbus-next";
export declare class ProfileManager extends BaseInterface<ProfileManager1> {
    /**
    * Hide constructor, initialization shall be done asynchronously with connect
    */
    private constructor();
    /**
     * Connect to profile manager under the specified path.
     *
     * @param bluez `Bluez` instance.
     * @param path path of the object.
     * @return `ProfileManager` if it exists.
     */
    static connect(bluez: Bluez, path: String): Promise<ProfileManager>;
    registerProfile(profile: path, UUID: String, options: dict<string, Variant>): Promise<any>;
    unregisterProfile(profile: path): Promise<any>;
}
//# sourceMappingURL=profile-manager.d.ts.map