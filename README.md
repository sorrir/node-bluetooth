# @sorrir/bluetooth

`@sorrir/bluetooth` is a BLE central library built uppon `bluez`, the official Linux Bluetooth protocol stack. It offers several layers of abstraction, depending on the required level of control, enableing both connecting to other existing bluetooth devices, as well as implementing a custom device.

In its core, `@sorrir/bluetooth` is a full wrapper around `bluez` and tries to closely resemble the original structure. On the lowest level, `bluez` interfaces can be interacted with directly. This for instance allows a rather straightforward translation of code snippets or [examples from the bluez repository](https://git.kernel.org/pub/scm/bluetooth/bluez.git/tree/test) that were originally written in other languages.

`@sorrir/bluetooth` additionally packs a ready-made implementation of simple, text based device communication via Bluetooths Generic Attribute Profile (GATT).

## Prerequisites

### Setup

First, make sure which version of `bluez` you have installed:
```console
bluetoothd -v
```
`@sorrir/bluetooth` has been tested with `bluez 5.50` or newer. It might work on older versions as well, but if you run into problems, make sure to update `bluez` first.

Afterwards you can install the package from npm
```console
npm install @sorrir/bluetooth
```
The next step is optional, however it is **strongly** recommended. By default, `@sorrir/bluetooth` can only communicate with `bluez` as a root user. To avoid this, create the file `/etc/dbus-1/system.d/sorrir-bluetooth.conf` with the following content:
```conf
<!-- This configuration file specifies the required security policies
     for @sorrir/bluetooth npm package to work. -->

<!DOCTYPE busconfig PUBLIC "-//freedesktop//DTD D-BUS Bus Configuration 1.0//EN"
 "http://www.freedesktop.org/standards/dbus/1.0/busconfig.dtd">
<busconfig>
  <policy user="<YOUR_USER>">
    <allow own="org.bluez"/>
    <allow send_destination="org.bluez"/>
    <allow send_interface="org.bluez.GattCharacteristic1"/>
    <allow send_interface="org.bluez.GattDescriptor1"/>
    <allow send_interface="org.bluez.LEAdvertisement1"/>
    <allow send_interface="org.freedesktop.DBus.ObjectManager"/>
    <allow send_interface="org.freedesktop.DBus.Properties"/>
  </policy>
</busconfig>
```
Make sure to replace `<YOUR_USER>` with your user name. Note that the above configuration is only for core BLE functionality using the Generic Attribute Profile (GATT). If intend to use more advanced functionality like custom agents, some additional send interfaces might have to be added. If you start getting `org.freedesktop.DBus.Error.AccessDenied` errors, add the required interface(s) from the following list:
```conf
<allow send_interface="org.bluez.Agent1"/>
<allow send_interface="org.bluez.Profile1"/>
<allow send_interface="org.bluez.MediaEndpoint1"/>
<allow send_interface="org.bluez.MediaPlayer1"/>
<allow send_interface="org.mpris.MediaPlayer2.Player"/>
```

### Compatibility

`@sorrir/bluetooth` itself is written in pure typescript that was transpiled to `ES5` and should therefore not cause any compatibility issues. Hower it uses `dbus-next` to communicate with `bluez`, which might limit the compatibility to certain architectures or node versions. For more info, visit the [dbus-next npm package](https://www.npmjs.com/package/dbus-next).

## Overview

### Package structure

`@sorrir/bluetooth` in its current state contains two main parts: `core` and `uart`, offering different levels of abstraction. Both are included if you import the package as a whole, for example with
```ts
import * as sb from '@sorrir/bluetooth'
```
If you want to import the parts separately, you can do so for example with
```ts
import * as sbCore from '@sorrir/bluetooth/lib/core/index'
import * as sbUart from '@sorrir/bluetooth/lib/uart/index'
```
Generally, every subfolder that is intended to be imported has an `index.js` file, which can be used to split imports into separate statements if desired.


### Core

`core` is for the most part a wrapper around the `bluez` dbus api. It allows either using interfaces as client (in other words, interfaces that are implemented as part of `bluez`) or providing interfaces as host (custom interfaces that are implemented by the user).

### Uart

`uart` is a layer of abstraction above the `core` components that allows simple communication of two ore more bluetooth devices via GATT. One device acts as server and the other devices as clients. After the connections are established, all devices can send or receive messages. The established channel is a bus, so every sent message is received by every connected device.

## Get Started

### Simple uart server/client

The simplest way of establishing a connection between two Bluetooth capable devices is using `UartBluetoothServer` and `UartBluetoothClient`, as it requires no knowledge of `bluez` or its interfaces.

The following code snippet implements functions to create a UART-GATT-server or connect to one under the existing name. The client emits a `Hello World` message, which is returned by the server.

Start server:

```js
const server = new UartBluetoothServer('SORRIR-Gatt-Server')
server.handleMessage = (message, sender) => {
    console.log(`received: ${JSON.stringify({ msg: message, sender: sender })}`)
    server.sendMessage(message)
}
await server.start()
```

Connect to server:
```js
const client = new UartBluetoothClient('SORRIR-Gatt-Server')
client.handleMessage = (message, sender) => {
    console.log(`received: ${JSON.stringify({ msg: message, sender: sender })}`)
}
await client.connect()
await client.sendMessage('Hello World')
```

Messages sent between the devices have the format
```json
{
    'msg': <utf-8 encoded message>
    'sender': <public name of the senders adapter>
}
```
While the functionality `UartBluetoothServer` and `UartBluetoothClient` might be expanded in the future, right now their use is limited to sending and receiving string messages.

### Custom uart server/client

If the functionality of `UartBluetoothClient` is too basic, it is also possible to connect to a GATT-server without it:

```js
// create central bluez object
const bluez = await new Bluez().init()

// connect to adapter and power it on
let adapter = await Adapter.connect(bluez)
await adapter.Powered.set(true)

// adapter address
let address = await adapter.Address.get()

// start discovery, wait until the discovery has started and then set
// the discovery filter to only show BLE devices
await adapter.startDiscovery()
await adapter.Discovering.waitForValue(true)
await adapter.setDiscoveryFilter({ 'Transport': new Variant('s', 'le') })

// find target device, connect to it and wait until the connection is established
let device = await adapter.getDeviceByName('SORRIR-Gatt-Server')
await device.connect()
await device.Connected.waitForValue(true)

// get service by its UUID
// the given UUID is the one of the UART-service used in the UartBluetoothServer
let service = await device.getService({ UUID: '6e400001-b5a3-f393-e0a9-e50e24dcca9e' })

// get write and notify characteristics from service
let writeCharacteristic = await service.getCharacteristic({ Flags: 'write' })
let notifyCharacteristic = await service.getCharacteristic({ Flags: 'notify' })

// start notification and handle incoming messages of notify characteristic
await notifyCharacteristic.startNotify()
notifyCharacteristic.ValueAsString.addListener((text) => {
    console.log(text)
})

// write hello world message to write characteristic
const json = {
    msg: "Hello World",
    sender: address
}
await writeCharacteristic.writeString(JSON.stringify(json))
```

Similarly, it possible to host a custom `UartBluetoothServer`:
```js
// create central bluez object
const bluez = await new Bluez().init()

// connect to adapter and power it on
let adapter = await Adapter.connect(bluez)
await adapter.Powered.set(true)

// adapter address
let address = await adapter.Address.get()

// get advertising and GATT-manager
let advertisingManager = await adapter.getAdvertisingManager()
let gattManager = await adapter.getGattManager()

// create and register advertisement
let advertisement = new UartAdvertisment(bluez, 'SORRIR-Gatt-Server', 0)
await advertisingManager.registerAdvertisement(advertisement.path, {})

// create and register application
let application = new UartApplication(bluez)
await gattManager.registerApplication(application.path, {})

// get write and notify characteristics from application
let txCharacteristic = application.service.txCharacteristic
let rxCharacteristic = application.service.rxCharacteristic

// answer incoming messages with hello world message
const json = {
    msg: "Hello World",
    sender: address
}
rxCharacteristic.onMessage = (message) => {
    console.log(message)
    txCharacteristic.sendMessage(JSON.stringify(json))
}       
```