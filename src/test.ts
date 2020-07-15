import { LEAdvertisingManager1 } from './core/client-interfaces/generated/LEAdvertisingManager1'
import { GattManager1 } from './core/client-interfaces/generated/GattManager1'
import { Adapter1 } from './core/client-interfaces/generated/Adapter1'
import { Adapter } from "./core/client-interfaces/adapter"
import { Bluez } from './core/bluez'
import { Device1 } from './core/client-interfaces/generated/Device1'
import { Variant } from './core/types'
import { sleep } from './core/helper'
import * as Helper from './core/helper'
import { UartAdvertisment } from './uart/host-interfaces/uart-advertisement'
import { UartApplication } from './uart/host-interfaces/uart-application'

async function main() {
    console.log("Hello test")

    const bluez = await new Bluez().init()
    // async function sleepShort() {
    //     await sleep(100)
    //     console.log("short")
    //     return "short"
    // }
    // async function sleepLong() {
    //     await sleep(500)
    //     console.log("long")
    //     return "long"
    // }

    //console.log(await Helper.firstResolve<string>([sleepShort(), sleepLong()]))

    //await startServer(adapter, bluez)

    await startClient(bluez)
    //startServer(bluez)

    // await advertisingManager.call('RegisterAdvertisement', advertisement.path, {})
    // console.log(await advertisingManager.get('ActiveInstances'))

    //await advertisingManager.call('UnregisterAdvertisement', advertisement.path);
}

main().catch((err) => {
    console.log(err)
});

async function startServer(bluez: Bluez) {
    let adapter = await Adapter.connect(bluez)
    let advertisingManager = await LEAdvertisingManager1.Connect(bluez.bus)
    let gattManager = await GattManager1.Connect(bluez.bus)

    await adapter.Powered.set(true)
    console.log(await adapter.Powered.get())

    bluez.bus.addMethodHandler((msg) => {
        console.log(`${msg.path}, ${msg.interface}, ${msg.member}`);
    });

    let advertisement = new UartAdvertisment(bluez, 'SORRIR-Gatt-Server', 0)
    let application = new UartApplication(bluez)

    await advertisingManager.RegisterAdvertisement(advertisement.path, {})
    await gattManager.RegisterApplication(application.path, {})
}

async function startClient(bluez: Bluez) {
    let adapter = await Adapter.connect(bluez)
    // start discovery
    await adapter.Powered.set(true)

    // bluez.objectManager.interfacesAdded.on((event) => {
    //     console.log(`+ ${event.path}`)
    // })

    // bluez.objectManager.interfacesRemoved.on((event) => {
    //     console.log(`- ${event.path}`)
    // })

    console.log("clear devices")
    await adapter.clearDevices()
    if (Object.keys(await adapter.getDevicesRaw()).length > 0) {
        await bluez.objectManager.interfacesRemoved.waitForEvent((event) => event.path.startsWith(adapter.path + "/dev_"))
    }

    await adapter.startDiscovery()
    await adapter.setDiscoveryFilter({ Transport: new Variant('s', 'le') })
    const name = await adapter.Name.get()

    //console.log(await bluez.getObjectData(RemoteDevice1))

    //console.log(await adapter.getRawDeviceData())
    //await adapter.clearDevices()

    let device = await adapter.getDeviceByName('SORRIR-Gatt-Server')
    console.log('connect')
    await device.connect()
    await device.Connected.waitForValue(true)
    console.log('isConnected')

    let service = await device.getService({ UUID: '6e400001-b5a3-f393-e0a9-e50e24dcca9e' })
    //console.log(await service.getCharacteristicsRaw())

    let writeCharacteristic = await service.getCharacteristic({ Flags: 'write' })
    let notifyCharacteristic = await service.getCharacteristic({ Flags: 'notify' })

    await notifyCharacteristic.startNotify()
    notifyCharacteristic.ValueAsString.addListener(async (text) => {
        console.log(text)
        await sleep(100)
        const msg = JSON.stringify({ msg: JSON.parse(text).msg, sender: name })
        console.log(msg)
        await writeCharacteristic.writeString(msg)
    })
    await writeCharacteristic.writeString(JSON.stringify({ msg: "OH BOY" }))

    //console.log(await adapter.getRawDeviceData())

    //console.log(await adapter.getUUIDs())

    // console.log(await adapter.UUIDs())

    // // wait for specific device
    // adapter.addListener("PropertiesChanged", (prop) => { console.log(prop) })
}