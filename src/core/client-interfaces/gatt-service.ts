import { Bluez } from "../bluez"
import { GattService1 } from "./generated/GattService1"
import { BaseInterface } from "./models/base-interface"
import { Signal } from "./models/signal"
import { Property, ReadOnlyProperty } from "./models/property"
import { int16, uint16, int32, uint32, byte, path, fileDescriptor, dict, Variant, dBusType } from "../types"
import { RetryOptions, InterfaceFilterSet } from "../helper"
import { GattCharacteristic } from "./gatt-characteristic"

export class GattService extends BaseInterface<GattService1> {
    /**
    * Hide constructor, initialization shall be done asynchronously with connect.
    */
    private constructor(bluez: Bluez, internal: GattService1) { super(bluez, internal) }

    /**
	 * Connect to GATT service under the specified path.
	 * 
	 * @param bluez `Bluez` instance. 
	 * @param path path of the object.
	 * @return `GattService` if it exists.
	 */
    static async connect(bluez: Bluez, path: String) {
        return new GattService(bluez, await GattService1.Connect(bluez.bus, path))
    }

    /**
     * Get information about all characteristics.
     * 
     * @returns An object of the format {'characteristic_path' : data}.
     */
    async getCharacteristicsRaw(): Promise<{ [K in path]: any }> {
        return this.getChildObjectsRaw('GattCharacteristic1')
    }

    /**
	* Get a characteristic that matches the given filter.
	* 
	* @param filter filter by any given property of `GattCharacteristic`, usally by UUID.
	* @param retryOptions retry this operation with a given number of times and interval in ms.
	* 
	* @returns `GattCharacteristic` object or undefined.
	* If multiple services match the filter, the first one is returned.
	*/
    async getCharacteristic(filter: InterfaceFilterSet<GattCharacteristic> = {}, options?: RetryOptions): Promise<GattCharacteristic | undefined> {
        return this.getChildObject('GattCharacteristic1', GattCharacteristic.connect, filter, options)
    }

    /*
    * Direct mappings to introspected properties, methods and signals of internal GattService1
    */

    //@property({ name: 'UUID', signature: 's', access: ACCESS_READ })
    UUID = new ReadOnlyProperty<string>('UUID', this._internal)

    //@property({ name: 'Device', signature: 'o', access: ACCESS_READ })
    Device = new ReadOnlyProperty<path>('Device', this._internal)

    //@property({ name: 'Primary', signature: 'b', access: ACCESS_READ })
    Primary = new ReadOnlyProperty<boolean>('Primary', this._internal)

    //@property({ name: 'Includes', signature: 'ao', access: ACCESS_READ })
    Includes = new ReadOnlyProperty<Array<path>>('Includes', this._internal)
}