import { BaseHostInterface } from "../../core/host-interfaces/models/base-host-interface";
import { Bluez } from "../../core/bluez";
import { uint16 } from "../../core/types";
export declare class UartAdvertisement extends BaseHostInterface {
    LocalName: string;
    ServiceUUIDs: string[];
    Includes: string[];
    Type: string;
    constructor(bluez: Bluez, name: string, index?: uint16);
    Release(): void;
}
//# sourceMappingURL=uart-advertisement.d.ts.map