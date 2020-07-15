import { Variant } from '../core/types'
import { Adapter } from '../core/client-interfaces/adapter'
import { Exception } from 'handlebars'
import { GattCharacteristic } from '../core/client-interfaces/gatt-characteristic'
import { Bluez } from '../core/bluez'

export class UartBluetoothClient {
    target: string
    handleMessage: (message: string, sender: string) => Promise<void>
    isStarted: boolean
    address: String
    private _txCharacteristic: GattCharacteristic
    private _rxCharacteristic: GattCharacteristic
    private _targetDevice: any

	constructor(target: string) {
		this.target = target
		this.handleMessage = async (message, sender) => { }
		this.isStarted = false
	}

	async connect() {
		let bluez = await new Bluez().init()
		let adapter = await Adapter.connect(bluez)
		this.address = await adapter.Address.get()
		// start discovery
		await adapter.Powered.set(true)

		await adapter.startDiscovery()
        await adapter.Discovering.waitForValue(true)
		await adapter.setDiscoveryFilter({ 'Transport': new Variant('s', 'le') })

		let device = await adapter.getDeviceByName(this.target)
		console.log('connecting to server...')
		await device.connect()
		await device.Connected.waitForValue(true)
        console.log('successfully connected')

		let service = await device.getService({ UUID: '6e400001-b5a3-f393-e0a9-e50e24dcca9e' })

		this._txCharacteristic = await service.getCharacteristic({ Flags: 'write' })
		this._rxCharacteristic = await service.getCharacteristic({ Flags: 'notify' })

        await this._rxCharacteristic.startNotify()
        this.isStarted = true
        const obj = this
        await this._rxCharacteristic.ValueAsString.addListener(async (text) => {
			try {
				const json = JSON.parse(text)
				obj.handleMessage(json['msg'], json['sender'])
			} catch (e) {
				console.error(`Error while parsing an incoming message:\n${e}`)
			}
		})
	}

	async sendMessage(message) {
		if (!this.isStarted) {
			throw new Exception('Client is not yet connected')
		}
		const json = {
			msg: message || "",
			sender: this.address
		}
		const text = JSON.stringify(json)
		await this._txCharacteristic.writeString(text)
		console.log(`sent: ${text}`)
	}

	async disconnect() {
		await this._rxCharacteristic.stopNotify()
		await this._targetDevice.disconnect()
		console.log('successfully disconnected from server')
	}
}