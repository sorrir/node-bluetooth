import { Bluez } from "../../bluez";
import { OrgfreedesktopDBusObjectManager } from "../generated/org-freedesktop-DBus-ObjectManager";
import { BaseInterface } from "./base-interface";
import {
  int16,
  uint16,
  int32,
  uint32,
  byte,
  path,
  fileDescriptor,
  dict,
  Variant,
} from "../../types";
import { Signal } from "./signal";
import { Exception } from "handlebars";

//aa{o{sa{sv}}}
export type managedObjects = {
  [path in string]: {
    [interfaceName in string]: {
      [property in string]: {
        signature: string;
        value: string;
      };
    };
  };
};

export class DBusObjectManager {
  readonly path: path;
  protected readonly _internal: OrgfreedesktopDBusObjectManager;
  private readonly _eventFilter: (event: { path: path }) => boolean;

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

  private constructor(path: path, internal: OrgfreedesktopDBusObjectManager) {
    this._internal = internal;
    this.path = path;

    const _path = path;
    this._eventFilter = (event) => event.path.startsWith(_path);

    this.InterfacesAdded = new Signal<{
      path: path;
      objects: dict<string, dict<string, Variant>>;
    }>(
      "InterfacesAdded",
      this._internal,
      { path: null, objects: null },
      (event) => event,
      this._eventFilter
    );
    this.InterfacesRemoved = new Signal<{
      path: path;
      interfaceNames: Array<string>;
    }>(
      "InterfacesRemoved",
      this._internal,
      { path: null, interfaceNames: null },
      (event) => event,
      this._eventFilter
    );
  }

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

  branch(path: path): DBusObjectManager {
    if (!path.startsWith(this.path)) {
      throw new Exception(
        `Cannot branch DBusObjectManager: The path '${path}' is not a subpath of '${this.path}'`
      );
    }
    return new DBusObjectManager(path, this._internal);
  }

  /**
   * Instantiates and initializes Bluezs DBusObjectManager.
   *
   * This method is meant to only be called from the init method of `Bluez`
   *
   * @param bluez the Bluez object
   *
   * @throws an exception if called with an already initialized `Bluez` instance
   */

  static async __connect(bluez: Bluez): Promise<DBusObjectManager> {
    if (bluez.objectManager !== undefined) {
      throw new Exception(
        "Cannot connect to DBusObjectManager: The DBusObjectManager is already initialized"
      );
    }
    return new DBusObjectManager(
      "/",
      await OrgfreedesktopDBusObjectManager.Connect(bluez.bus, "/")
    );
  }

  /*
   * Mappings to introspected properties, methods and signals of internal OrgfreedesktopDBusObjectManager
   */

  //@method({ name: 'GetManagedObjects', inSignature: '', outSignature: 'a{oa{sa{sv}}}' })
  async getManagedObjects(): Promise<managedObjects> {
    const objects = await this._internal.GetManagedObjects();
    const output = {};
    for (const path of Object.keys(objects)) {
      if (path.startsWith(this.path)) {
        output[path] = objects[path];
      }
    }
    return output;
  }
}
