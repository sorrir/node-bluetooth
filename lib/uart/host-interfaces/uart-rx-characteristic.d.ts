import { uint16 } from '../../core/types';
import { Bluez } from "../../core/bluez";
import { HostGattCharacteristic } from '../../core/host-interfaces/host-gatt-characteristic';
import { HostGattService } from '../../core/host-interfaces/host-gatt-service';
export declare class UartRxCharacteristic extends HostGattCharacteristic {
    constructor(bluez: Bluez, service: HostGattService, index: uint16);
    WriteValue(value: any, options: any): void;
    onMessage(message: any, options: any): void;
}
//# sourceMappingURL=uart-rx-characteristic.d.ts.map