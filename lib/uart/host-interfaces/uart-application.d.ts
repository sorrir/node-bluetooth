import { Bluez } from "../../core/bluez";
import { HostGattApplication } from '../../core/host-interfaces/host-gatt-application';
import { UartService } from './uart-service';
export declare class UartApplication extends HostGattApplication {
    service: UartService;
    constructor(bluez: Bluez);
}
//# sourceMappingURL=uart-application.d.ts.map