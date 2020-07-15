import { dict, path, uint16 } from '../types';
import { BaseHostInterface } from './models/base-host-interface';
import { Bluez } from '../bluez';
import { HostGattDescriptor } from './host-gatt-descriptor';
import { HostGattService } from './host-gatt-service';
export declare class HostGattCharacteristic extends BaseHostInterface {
    UUID: string;
    Service: HostGattService;
    Flags: string[];
    Descriptors: dict<path, HostGattDescriptor>;
    constructor(bluez: Bluez, service: HostGattService, uuid: string, flags?: string[], index?: uint16);
    static GetPath(service: any, index: any): string;
    ReadValue(value: any, options: any): void;
    WriteValue(value: any, options: any): void;
    StartNotify(): void;
    StopNotify(): void;
    addDescriptor(uuid: string, flags?: string[], index?: uint16): HostGattDescriptor;
    removeCharacteristic(index?: uint16): void;
}
//# sourceMappingURL=host-gatt-characteristic.d.ts.map