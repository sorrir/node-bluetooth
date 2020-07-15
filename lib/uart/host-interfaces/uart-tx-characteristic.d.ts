import { uint16 } from '../../core/types';
import { Bluez } from "../../core/bluez";
import { HostGattCharacteristic } from '../../core/host-interfaces/host-gatt-characteristic';
import { HostGattService } from '../../core/host-interfaces/host-gatt-service';
export declare class UartTxCharacteristic extends HostGattCharacteristic {
    notifying: boolean;
    constructor(bluez: Bluez, service: HostGattService, index: uint16);
    StartNotify(): void;
    StopNotify(): void;
    sendMessage(message: any): void;
}
//# sourceMappingURL=uart-tx-characteristic.d.ts.map