import { Bluez } from "../bluez";
import { ProfileManager1 } from "./generated/ProfileManager1";
import { BaseInterface } from "./models/base-interface";
import {
  int16,
  uint16,
  int32,
  uint32,
  byte,
  path,
  fileDescriptor,
  dict,
} from "../types";
import { Variant } from "dbus-next";

export class ProfileManager extends BaseInterface<ProfileManager1> {
  /**
   * Hide constructor, initialization shall be done asynchronously with connect
   */
  private constructor(bluez: Bluez, internal: ProfileManager1) {
    super(bluez, internal);
  }

  /**
   * Connect to profile manager under the specified path.
   *
   * @param bluez `Bluez` instance.
   * @param path path of the object.
   * @return `ProfileManager` if it exists.
   */
  static async connect(bluez: Bluez, path: string) {
    return new ProfileManager(
      bluez,
      await ProfileManager1.Connect(bluez.bus, path)
    );
  }

  /*
   * Direct mappings to introspected properties, methods and signals of internal ProfileManager1
   */

  //@method({ name: 'RegisterProfile', inSignature: 'osa{sv}', outSignature: '' })
  async registerProfile(
    profile: path,
    UUID: string,
    options: dict<string, Variant>
  ) {
    return this._internal.RegisterProfile(profile, UUID, options);
  }

  //@method({ name: 'UnregisterProfile', inSignature: 'o', outSignature: '' })
  async unregisterProfile(profile: path) {
    return this._internal.UnregisterProfile(profile);
  }
}
