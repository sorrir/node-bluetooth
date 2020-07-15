import { Bluez } from "../bluez"
import { GattService1 } from "./generated/GattService1"
import { BaseInterface } from "./models/base-interface"
import { Signal } from "./models/signal"
import { Property, ReadOnlyProperty } from "./models/property"
import { int16, uint16, int32, uint32, byte, path, fileDescriptor, dict, Variant } from "../types"
import { RetryOptions } from "../helper"
import { GattCharacteristic } from "./gatt-characteristic"

export class GattService extends BaseInterface<GattService1> {
     /**
     * Hide constructor, initialization shall be done asynchronously with connect
     */

    private constructor(bluez: Bluez, internal: GattService1) { super(bluez, internal) }

    static async connect(bluez: Bluez, path: String) {
        return new GattService(bluez, await GattService1.Connect(bluez.bus, path))
    }

    async getCharacteristicsRaw() {
        return this.getChildObjectsRaw('GattCharacteristic1')
    }

    async getCharacteristic(filter: object = {}, options?: RetryOptions): Promise<GattCharacteristic> {
        return this.getChildObject('GattCharacteristic1', GattCharacteristic.connect, filter, options)
    }

    /**
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