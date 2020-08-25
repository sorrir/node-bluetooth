import { Bluez } from "../bluez";
import { NetworkServer1 } from "./generated/NetworkServer1";
import { BaseInterface } from "./models/base-interface";
export declare class NetworkServer extends BaseInterface<NetworkServer1> {
    /**
    * Hide constructor, initialization shall be done asynchronously with connect
    */
    private constructor();
    static connect(bluez: Bluez, path: String): Promise<NetworkServer>;
    register(uuid: String, bridge: String): Promise<any>;
    unregister(uuid: String): Promise<any>;
}
//# sourceMappingURL=network-server.d.ts.map