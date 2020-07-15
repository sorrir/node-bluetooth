import { Bluez } from "../bluez"
import { OrgfreedesktopDBusProperties } from "./generated/org-freedesktop-DBus-Properties"
import { BaseInterface } from "./models/base-interface"
import { int16, uint16, int32, uint32, byte, path, fileDescriptor, dict, Variant } from "../types"
import { Signal } from "./models/signal"

export class DBusProperties extends BaseInterface<OrgfreedesktopDBusProperties> {
	/**
	* Hide constructor, initialization shall be done asynchronously with connect
	*/

	private constructor(bluez: Bluez, internal: OrgfreedesktopDBusProperties) { super(bluez, internal) }

	static async connect(bluez: Bluez, path: String) {
		return new DBusProperties(bluez, await OrgfreedesktopDBusProperties.Connect(bluez.bus, path))
	}

    /**
    * Direct mappings to introspected properties, methods and signals of internal OrgfreedesktopDBusProperties
    */

	//@method({ name: 'Get', inSignature: 'ss', outSignature: 'v' })
	async get(iface: string, name: string) { return this._internal.Get(iface, name) }

	//@method({ name: 'Set', inSignature: 'ssv', outSignature: '' })
	async set(iface: string, name: string, value: Variant) { return this._internal.Set(iface, name, value) }

	//@method({ name: 'GetAll', inSignature: 's', outSignature: 'a{sv}' })
	async getAll(iface: string) { return this._internal.GetAll(iface) }

	//@signal({ name: 'PropertiesChanged', signature: 'sa{sv}as' })
	propertiesChanged = new Signal<{ interfaceName: string, changedProperties: dict<string, Variant>, invalidatedProperties: Array<string> }>('PropertiesChanged', this._internal, {
		interfaceName: null, changedProperties: null, invalidatedProperties: null
	})


}