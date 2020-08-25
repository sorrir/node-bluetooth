import { Bluez } from "../bluez";
import { AgentManager1 } from "./generated/AgentManager1";
import { BaseInterface } from "./models/base-interface";
import { path } from "../types";
export declare class AgentManager extends BaseInterface<AgentManager1> {
    /**
    * Hide constructor, initialization shall be done asynchronously with connect
    */
    private constructor();
    static connect(bluez: Bluez, path: String): Promise<AgentManager>;
    registerAgent(agent: path, capability: String): Promise<any>;
    unregisterAgent(agent: path): Promise<any>;
    requestDefaultAgent(agent: path): Promise<any>;
}
//# sourceMappingURL=agent-manager.d.ts.map