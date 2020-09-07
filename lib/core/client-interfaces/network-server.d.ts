import { Bluez } from "../bluez";
import { NetworkServer1 } from "./generated/NetworkServer1";
import { BaseInterface } from "./models/base-interface";
export declare class NetworkServer extends BaseInterface<NetworkServer1> {
    /**
    * Hide constructor, initialization shall be done asynchronously with connect.
    */
    private constructor();
    /**
     * Connect to network server under the specified path.
     *
     * @param bluez `Bluez` instance.
     * @param path path of the object.
     * @return `NetworkServer` if it exists.
     */
    static connect(bluez: Bluez, path: String): Promise<NetworkServer>;
    register(uuid: String, bridge: String): Promise<any>;
    unregister(uuid: String): Promise<any>;
}
//# sourceMappingURL=network-server.d.ts.map