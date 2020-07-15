import { Bluez } from "../bluez"
import { OrgfreedesktopDBusObjectManager } from "./generated/org-freedesktop-DBus-ObjectManager"
import { BaseInterface } from "./models/base-interface"
import { int16, uint16, int32, uint32, byte, path, fileDescriptor, dict, Variant } from "../types"
import { Signal } from "./models/signal"

export class DBusObjectManager extends BaseInterface<OrgfreedesktopDBusObjectManager> {
	/**
	* Hide constructor, initialization shall be done asynchronously with connect
	*/

	private constructor(bluez: Bluez, internal: OrgfreedesktopDBusObjectManager) { super(bluez, internal) }

	static async connect(bluez: Bluez, path: String) {
		return new DBusObjectManager(bluez, await OrgfreedesktopDBusObjectManager.Connect(bluez.bus, path))
	}

    /**
    * Direct mappings to introspected properties, methods and signals of internal OrgfreedesktopDBusObjectManager
    */

	//@method({ name: 'GetManagedObjects', inSignature: '', outSignature: 'a{oa{sa{sv}}}' })
	async getManagedObjects() { return this._internal.GetManagedObjects() }

	//@signal({ name: 'InterfacesAdded', signature: 'oa{sa{sv}}' })
	interfacesAdded = new Signal<{ path: path, object: dict<string, dict<string, Variant>> }>('InterfacesAdded', this._internal, { path: null, object: null })

	//@signal({ name: 'InterfacesRemoved', signature: 'oas' })
	interfacesRemoved = new Signal<{ path: path, interfaceNames: Array<string> }>('InterfacesRemoved', this._internal, { path: null, interfaceNames: null })
}