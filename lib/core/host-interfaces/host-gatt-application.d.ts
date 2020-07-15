import { dict, path } from '../types';
import { BaseHostObject } from './models/base-host-object';
import { Bluez } from '../bluez';
import { HostGattService } from './host-gatt-service';
export declare class HostGattApplication extends BaseHostObject {
    bluez: Bluez;
    services: dict<path, HostGattService>;
    constructor(bluez: Bluez);
    GetManagedObjects(): {};
    addService(service: HostGattService): void;
}
//# sourceMappingURL=host-gatt-application.d.ts.map