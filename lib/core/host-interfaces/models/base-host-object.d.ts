import { Bluez } from "../../bluez";
import { path } from "../../types";
export declare class BaseHostObject {
    static _INTERFACE: string;
    path: path;
    constructor(bluez: Bluez, path: path);
    GetManagedObjects(): {};
}
//# sourceMappingURL=base-host-object.d.ts.map