import { Bluez } from "../bluez"
import { Media1 } from "./generated/Media1"
import { BaseInterface } from "./models/base-interface"
import { int16, uint16, int32, uint32, byte, path, fileDescriptor, dict, dBusType } from "../types"
import { Variant } from "dbus-next"

export class Media extends BaseInterface<Media1> {
	/**
	* Hide constructor, initialization shall be done asynchronously with connect.
	*/
	private constructor(bluez: Bluez, internal: Media1) { super(bluez, internal) }

	/**
	 * Connect to media under the specified path.
	 * 
	 * @param bluez `Bluez` instance. 
	 * @param path path of the object.
	 * @return `Media` if it exists.
	 */
	static async connect(bluez: Bluez, path: String) {
		return new Media(bluez, await Media1.Connect(bluez.bus, path))
	}

    /*
    * Direct mappings to introspected properties, methods and signals of internal Media1
    */

	//@method({ name: 'RegisterEndpoint', inSignature: 'oa{sv}', outSignature: '' })
	async registerEndpoint(endpoint: path, properties: dict<string, Variant>) { return this._internal.RegisterEndpoint(endpoint, properties) }

	//@method({ name: 'UnregisterEndpoint', inSignature: 'o', outSignature: '' })
	async unregisterEndpoint(endpoint: path) { return this._internal.UnregisterEndpoint(endpoint) }

	//@method({ name: 'RegisterPlayer', inSignature: 'oa{sv}', outSignature: '' })
	async registerPlayer(player: path, properties: dict<string, Variant>) { return this._internal.RegisterPlayer(player, properties) }

	//@method({ name: 'UnregisterPlayer', inSignature: 'o', outSignature: '' })
	async unregisterPlayer(player: path) { return this._internal.UnregisterPlayer(player) }

	//@method({ name: 'RegisterApplication', inSignature: 'oa{sv}', outSignature: '' })
	async registerApplication(application: path, options: dict<string, Variant>) { return this._internal.RegisterApplication(application, options) }

	//@method({ name: 'UnregisterApplication', inSignature: 'o', outSignature: '' })
	async unregisterApplication(application: path) { return this._internal.UnregisterApplication(application) }
}