import { Bluez } from "../../bluez";
import { OrgfreedesktopDBusObjectManager } from "../generated/org-freedesktop-DBus-ObjectManager";
import { path, dict, Variant } from "../../types";
import { Signal } from "./signal";
export declare type managedObjects = {
    [path in string]: {
        [interfaceName in string]: {
            [property in string]: {
                signature: string;
                value: string;
            };
        };
    };
};
export declare class DBusObjectManager {
    readonly path: path;
    protected readonly _internal: OrgfreedesktopDBusObjectManager;
    private readonly _eventFilter;
    readonly InterfacesAdded: Signal<{
        path: path;
        objects: dict<string, dict<string, Variant>>;
    }>;
    readonly InterfacesRemoved: Signal<{
        path: path;
        interfaceNames: Array<string>;
    }>;
    /**
    * Hide constructor, initialization shall be done asynchronously with connect
    */
    private constructor();
    /**
     * Constructs another DBusObjectManager as branch of an existing one.
     *
     * The resulting DBusObjectManager receives all data related to the given path from
     * the underlying instance. It is intended to be used to create the object managers
     * for client interfaces.
     *
     * @param path path of the object to manage
     *
     * @throws an exception if the provided path is not a subpath of root DBusObjectManager
     */
    branch(path: path): DBusObjectManager;
    /**
     * Instantiates and initializes Bluezs DBusObjectManager.
     *
     * This method is meant to only be called from the init method of `Bluez`
     *
     * @param bluez the Bluez object
     *
     * @throws an exception if called with an already initialized `Bluez` instance
     */
    static __connect(bluez: Bluez): Promise<DBusObjectManager>;
    getManagedObjects(): Promise<managedObjects>;
}
//# sourceMappingURL=dbus-object-manager.d.ts.map