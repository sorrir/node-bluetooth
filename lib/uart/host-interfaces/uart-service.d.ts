import { uint16 } from '../../core/types';
import { Bluez } from "../../core/bluez";
import { HostGattService } from '../../core/host-interfaces/host-gatt-service';
import { UartTxCharacteristic } from './uart-tx-characteristic';
import { UartRxCharacteristic } from './uart-rx-characteristic';
export declare class UartService extends HostGattService {
    txCharacteristic: UartTxCharacteristic;
    rxCharacteristic: UartRxCharacteristic;
    constructor(bluez: Bluez, index: uint16);
}
//# sourceMappingURL=uart-service.d.ts.map