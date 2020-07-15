import { BaseHostInterface } from "../../core/host-interfaces/models/base-host-interface";
import { Bluez } from "../../core/bluez";
import { uint16 } from "../../core/types";
export declare class UartAdvertisment extends BaseHostInterface {
    LocalName: string;
    constructor(bluez: Bluez, name: string, index?: uint16);
    Release(): void;
}
//# sourceMappingURL=uart-advertisement.d.ts.map