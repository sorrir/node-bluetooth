import { Bluez } from "../bluez";
import { AgentManager1 } from "./generated/AgentManager1";
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
import { Variant } from "@quadratclown/dbus-next";

export class AgentManager extends BaseInterface<AgentManager1> {
  /**
   * Hide constructor, initialization shall be done asynchronously with connect.
   */
  private constructor(bluez: Bluez, internal: AgentManager1) {
    super(bluez, internal);
  }

  /**
   * Connect to agent manager under the specified path.
   *
   * @param bluez `Bluez` instance.
   * @param path path of the object.
   * @return `AgentManager` if it exists.
   */
  static async connect(bluez: Bluez, path: string) {
    return new AgentManager(
      bluez,
      await AgentManager1.Connect(bluez.bus, path)
    );
  }

  /*
   * Direct mappings to introspected properties, methods and signals of internal AgentManager1
   */

  //@method({ name: 'RegisterAgent', inSignature: 'os', outSignature: '' })
  async registerAgent(agent: path, capability: string) {
    return this._internal.RegisterAgent(agent, capability);
  }

  //@method({ name: 'UnregisterAgent', inSignature: 'o', outSignature: '' })
  async unregisterAgent(agent: path) {
    return this._internal.UnregisterAgent(agent);
  }

  //@method({ name: 'RequestDefaultAgent', inSignature: 'o', outSignature: '' })
  async requestDefaultAgent(agent: path) {
    return this._internal.RequestDefaultAgent(agent);
  }
}
