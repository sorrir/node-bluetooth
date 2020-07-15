import { Bluez } from "../bluez"
import { Adapter1 } from "./generated/Adapter1"
import { BaseInterface } from "./models/base-interface"
import { Signal } from "./models/signal"
import { Property, ReadOnlyProperty } from "./models/property"
import { int16, uint16, int32, uint32, byte, path, fileDescriptor, dict, Variant } from "../types"
import { RetryOptions } from "../helper"
import { Device } from "./device"

export class Adapter extends BaseInterface<Adapter1> {
	/**
	* Hide constructor, initialization shall be done asynchronously with connect
	*/

	private constructor(bluez: Bluez, internal: Adapter1) { super(bluez, internal) }

	static async connect(bluez: Bluez, path: String = "/org/bluez/hci0") {
		return new Adapter(bluez, await Adapter1.Connect(bluez.bus, path))
	}

	/**
     * Get information about all discovered devices
     * 
     * @return An object of the format {'device_path' : data}
     */

	async getDevicesRaw() {
		return this._bluez.getObjectData('Device1', this.path)
	}

    /**
     * Returns a device with the given address
     * 
     * @param address Bluetooth device address
     * @return {@Link Device} if it exists
     */

	async getDeviceByAddress(address: string, options?: RetryOptions): Promise<Device> {
		return this.getDevice({ 'Address': address }, options)
	}

    /**
     * Returns a device with the given name
     * 
     * @param address Bluetooth device name
     * @return {@Link Device} if it exists
     */

	async getDeviceByName(name: string, options?: RetryOptions): Promise<Device> {
		return this.getDevice({ 'Name': name }, options)
	}

    /**
     * Returns a device with the given alias
     * 
     * @param address Bluetooth device alias
     * @return {@Link Device} if it exists
     */

	async getDeviceByAlias(alias: string, options?: RetryOptions): Promise<Device> {
		return this.getDevice({ 'Alias': alias }, options)
	}

    /**
     * Finds a specific device that matches the given filter.
     * 
     * @param filter Filter, for example ```{'Name' : 'device_name'}```
     * @return {@Link Device} if it exists. If multiple devices match the filter,
     * the first one is returned
     */

	async getDevice(filter: object = {}, options?: RetryOptions): Promise<Device> {
		return this.getChildObject('Device1', Device.connect, filter, options)
	}

	async clearDevices() {
		const paths = await this.getDevicesRaw().then((data) => Object.keys(data))
		paths.forEach(async (path) => await this.removeDeviceByPath(path))
	}

	async removeDeviceByPath(path: string) { return this._internal.RemoveDevice(path) }

    /**
    * Direct mappings to introspected properties, methods and signals of internal Adapter1
    */

	//@property({ name: 'Address', signature: 's', access: ACCESS_READ })
	Address = new ReadOnlyProperty<string>('Address', this._internal)

	//@property({ name: 'AddressType', signature: 's', access: ACCESS_READ })
	AddressType = new ReadOnlyProperty<string>('AddressType', this._internal)

	//@property({ name: 'Name', signature: 's', access: ACCESS_READ })
	Name = new ReadOnlyProperty<string>('Name', this._internal)

	//@property({ name: 'Alias', signature: 's', access: ACCESS_READWRITE })
	Alias = new Property<string>('Alias', this._internal)

	//@property({ name: 'Class', signature: 'u', access: ACCESS_READ })
	Class = new ReadOnlyProperty<uint32>('Class', this._internal)

	//@property({ name: 'Powered', signature: 'b', access: ACCESS_READWRITE })
	Powered = new Property<boolean>('Powered', this._internal)

	//@property({ name: 'Discoverable', signature: 'b', access: ACCESS_READWRITE })
	Discoverable = new Property<boolean>('Discoverable', this._internal)

	//@property({ name: 'DiscoverableTimeout', signature: 'u', access: ACCESS_READWRITE })
	DiscoverableTimeout = new Property<uint32>('DiscoverableTimeout', this._internal)

	//@property({ name: 'Pairable', signature: 'b', access: ACCESS_READWRITE })
	Pairable = new Property<boolean>('Pairable', this._internal)

	//@property({ name: 'PairableTimeout', signature: 'u', access: ACCESS_READWRITE })
	PairableTimeout = new Property<uint32>('PairableTimeout', this._internal)

	//@property({ name: 'Discovering', signature: 'b', access: ACCESS_READ })
	Discovering = new ReadOnlyProperty<boolean>('Discovering', this._internal)

	//@property({ name: 'UUIDs', signature: 'as', access: ACCESS_READ })
	UUIDs = new ReadOnlyProperty<Array<string>>('UUIDs', this._internal)

	//@property({ name: 'Modalias', signature: 's', access: ACCESS_READ })
	Modalias = new ReadOnlyProperty<string>('Modalias', this._internal)

	//@method({ name: 'StartDiscovery', inSignature: '', outSignature: '' })
	async startDiscovery() { return this._internal.StartDiscovery() }

	//@method({ name: 'SetDiscoveryFilter', inSignature: 'a{sv}', outSignature: '' })
	async setDiscoveryFilter(properties: dict<string, Variant>) { return this._internal.SetDiscoveryFilter(properties) }

	//@method({ name: 'StopDiscovery', inSignature: '', outSignature: '' })
	async stopDiscovery() { return this._internal.StopDiscovery() }

	//@method({ name: 'RemoveDevice', inSignature: 'o', outSignature: '' })
	async removeDevice(device: path) { return this._internal.RemoveDevice(device) }

	//@method({ name: 'GetDiscoveryFilters', inSignature: '', outSignature: 'as' })
	async getDiscoveryFilters(): Promise<Array<string>> { return new Array<string>(await this._internal.GetDiscoveryFilters()) }


}