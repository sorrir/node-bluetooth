import { Adapter } from '../core/client-interfaces/adapter'
import { LEAdvertisingManager1 } from '../core/client-interfaces/generated/LEAdvertisingManager1'
import { GattManager1 } from '../core/client-interfaces/generated/GattManager1'
import { Exception } from 'handlebars'
import { Bluez } from '../core/bluez'
import { UartTxCharacteristic } from './host-interfaces/uart-tx-characteristic'
import { UartAdvertisment } from './host-interfaces/uart-advertisement'
import { UartApplication } from './host-interfaces/uart-application'

export class UartBluetoothServer {
    name: string
    handleMessage: (message: string, sender: string) => Promise<void>
    isStarted: boolean
    address: String
    private _application: UartApplication
    private _txCharacteristic: UartTxCharacteristic
    private _advertisingManager: LEAdvertisingManager1
    private _gattManager: GattManager1
    private _advertisement: UartAdvertisment

	constructor(name: string) {
		this.name = name
		this.handleMessage = async (message, sender) => { }
		this.isStarted = false
		this.address = undefined
	}

	async start() {
		let bluez = await new Bluez().init()
		let adapter = await Adapter.connect(bluez)
		this.address = await adapter.Address.get()
		this._advertisingManager = await LEAdvertisingManager1.Connect(bluez.bus)
		this._gattManager = await GattManager1.Connect(bluez.bus)

		await adapter.Powered.set(true)

		bluez.bus.addMethodHandler((msg) => {
			console.log(`${msg.path}, ${msg.interface}, ${msg.member}`);
		});

		this._advertisement = new UartAdvertisment(bluez, this.name, 0)
		this._application = new UartApplication(bluez)

		await this._advertisingManager.RegisterAdvertisement(this._advertisement.path, {})
		await this._gattManager.RegisterApplication(this._application.path, {})

		const obj = this
		this._application.service.rxCharacteristic.onMessage = (message, options) => {
			try {
				const json = JSON.parse(message)
				obj.handleMessage(json['msg'], json['sender'])
			} catch (e) {
				console.error(`Error while parsing an incoming message:\n${e}`)
			}
		}
        this._txCharacteristic = this._application.service.txCharacteristic
        
		this.isStarted = true
		console.log('successfully started server')
	}

	async sendMessage(message) {
		if (!this.isStarted) {
			throw new Exception('Server is not yet started')
		}
		const json = {
			msg: message || "",
			sender: this.address
		}
		const text = JSON.stringify(json)
		this._txCharacteristic.sendMessage(text);
		console.log(`sent: ${text}`)
	}

	async stop() {
		// await this._advertisingManager.UnregisterAdvertisement(this._advertisement.path)
		// await this._gettManager.UnregisterApplication(this._application.path)
		console.log('successfully stopped server')
	}
}