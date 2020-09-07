import { Bluez } from "../bluez";
import { AgentManager1 } from "./generated/AgentManager1";
import { BaseInterface } from "./models/base-interface";
import { path } from "../types";
export declare class AgentManager extends BaseInterface<AgentManager1> {
    /**
    * Hide constructor, initialization shall be done asynchronously with connect.
    */
    private constructor();
    /**
     * Connect to agent manager under the specified path.
     *
     * @param bluez `Bluez` instance.
     * @param path path of the object.
     * @return `AgentManager` if it exists.
     */
    static connect(bluez: Bluez, path: String): Promise<AgentManager>;
    registerAgent(agent: path, capability: String): Promise<any>;
    unregisterAgent(agent: path): Promise<any>;
    requestDefaultAgent(agent: path): Promise<any>;
}
//# sourceMappingURL=agent-manager.d.ts.map