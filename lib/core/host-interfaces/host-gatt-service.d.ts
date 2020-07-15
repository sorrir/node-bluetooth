import { dict, path, uint16 } from '../types';
import { BaseHostInterface } from './models/base-host-interface';
import { Bluez } from '../bluez';
import { HostGattCharacteristic } from './host-gatt-characteristic';
export declare class HostGattService extends BaseHostInterface {
    UUID: string;
    Primary: boolean;
    Characteristics: dict<path, HostGattCharacteristic>;
    constructor(bluez: Bluez, uuid: string, primary: boolean, index?: uint16);
    addCharacteristic(characteristic: HostGattCharacteristic): void;
    removeCharacteristic(characteristic: HostGattCharacteristic): void;
}
//# sourceMappingURL=host-gatt-service.d.ts.map