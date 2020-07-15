import { BaseHostInterface } from './models/base-host-interface';
import { Bluez } from '../bluez';
import { HostGattCharacteristic } from './host-gatt-characteristic';
export declare class HostGattDescriptor extends BaseHostInterface {
    UUID: string;
    Characteristic: HostGattCharacteristic;
    Flags: string[];
    constructor(bluez: Bluez, characteristic: HostGattCharacteristic, uuid: string, flags?: any[], index?: number);
    static GetPath(characteristic: HostGattCharacteristic, index: any): string;
    ReadValue(value: any, options: any): void;
    WriteValue(value: any, options: any): void;
}
//# sourceMappingURL=host-gatt-descriptor.d.ts.map