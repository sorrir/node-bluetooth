# @sorrir/bluetooth

`@sorrir/bluetooth` is a BLE library built upon `bluez`, the official Linux Bluetooth protocol stack. It offers several layers of abstraction, allowing both implementing a central module as well as a custom peripheral.

In its core, `@sorrir/bluetooth` is a full wrapper around `bluez` and tries to closely resemble the original structure. On the lowest level, `bluez` interfaces can be interacted with directly. This for instance allows a straightforward translation of code snippets or [examples from the bluez repository](https://git.kernel.org/pub/scm/bluetooth/bluez.git/tree/test) that were originally written in other languages. It additionally packs a ready-made implementation of simple, text based device communication via Bluetooth's Generic Attribute Profile (GATT).

`@sorrir/bluetooth` has full TypeScript support. All necessary types come bundled with the package.

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
```xml
<!-- This configuration file specifies the required security policies
     for the @sorrir/bluetooth npm package to work. -->

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
Make sure to replace `<YOUR_USER>` with your user name. Note that the above configuration is only for core BLE functionality using the Generic Attribute Profile (GATT). If you intend to use more advanced functionality like custom agents, some additional send interfaces might have to be added. If you start receiving `org.freedesktop.DBus.Error.AccessDenied` errors, add the required interface(s) from the following list:
```xml
<allow send_interface="org.bluez.Agent1"/>
<allow send_interface="org.bluez.Profile1"/>
<allow send_interface="org.bluez.MediaEndpoint1"/>
<allow send_interface="org.bluez.MediaPlayer1"/>
<allow send_interface="org.mpris.MediaPlayer2.Player"/>
```

### Compatibility

`@sorrir/bluetooth` itself is written in pure TypeScript that was transpiled to `ES5` and should therefore not cause any compatibility issues. However it uses `dbus-next` to communicate with `bluez`, which might limit the compatibility to certain architectures or node versions. For more info, visit the [dbus-next npm package](https://www.npmjs.com/package/dbus-next).

### TypeScript

While it is possible to use the package with plain JavaScript, it is recommended to use TypeScript for better type safety. All required types of the package come bundled with it.

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

`core` is for the most part a wrapper around the `bluez` D-Bus API. It allows either using interfaces as a client (to interfaces that are implemented as part of `bluez`) or providing interfaces as host (custom interfaces that are implemented by the user).

### Uart

`uart` is a layer of abstraction above the `core` components that allows simple communication of two ore more bluetooth devices via GATT. One device acts as server and the other devices as clients. After the connections are established, all devices can send or receive messages. The established channel is a bus, so every sent message is received by every connected device.

## Get Started

### Simple uart server/client

The simplest way of establishing a connection between two Bluetooth capable devices is using `UartBluetoothServer` and `UartBluetoothClient`, as it requires no knowledge of `bluez` or its interfaces.

The following code snippet implements functions to create a UART-GATT-server or connect to one with the existing name. The client emits a `Hello World` message, which is returned by the server.

Import required classes:

```js
// 
const { UartBluetoothServer, UartBluetoothClient } = require('@sorrir/bluetooth')
```

or

```ts
import { UartBluetoothServer, UartBluetoothClient } from '@sorrir/bluetooth'
```

Start server:

```js
const server = new UartBluetoothServer('SORRIR-Gatt-Server')
server.handleMessage = (message, sender) => {
    console.log(
        `received: ${JSON.stringify(
            { msg: message, sender: sender })}`)
    server.sendMessage(message)
}
await server.start()
```

Connect to server:
```js
const client = new UartBluetoothClient('SORRIR-Gatt-Server')
client.handleMessage = (message, sender) => {
    console.log(
        `received: ${JSON.stringify(
            { msg: message, sender: sender })}`)
}
await client.connect()
await client.sendMessage('Hello World')
```

Messages sent between the devices have the format
```js
{
    msg: <utf-8 encoded message>
    sender: <public name of the senders adapter>
}
```
While the functionality of `UartBluetoothServer` and `UartBluetoothClient` might be expanded in the future, right now their use is limited to sending and receiving `string` messages.

### Custom uart server/client

If the functionality of the former client and server is too basic, we can implement those ourselves.

To do that, we first need to initialize the central `bluez` object. It wraps around the system D-Bus and is required for the initialization of all interfaces.

```js
// create central bluez object
const bluez = await new Bluez().init()
```

Afterwards we can connect to the adapter, turn it on and get its address.

```js
// connect to adapter and power it on
// '/org/bluez/hci0' is the default adapter on most devices
let adapter = await Adapter.connect(bluez, '/org/bluez/hci0')
await adapter.Powered.set(true)

// adapter address
let address = await adapter.Address.get()

// define message payload for later use
const json = {
    msg: "Hello World",
    sender: address
}
```

Now we can discover and connect to the server as follows:

```js
// start discovery, wait until the discovery has started and then set
// the discovery filter to only show BLE devices
await adapter.startDiscovery()
await adapter.Discovering.waitForValue(true)
await adapter.setDiscoveryFilter({ 'Transport': new Variant('s', 'le') })

// find target device by name, connect to it
// and wait until the connection is established
let device = await adapter.getDeviceByName('SORRIR-Gatt-Server')
await device.connect()
await device.Connected.waitForValue(true)

// get service by its UUID
// the given UUID is the one of the UART-service used
// in the UartBluetoothServer
await device.ServicesResolved.waitForValue(true)
let service = await device.getService(
    { UUID: '6e400001-b5a3-f393-e0a9-e50e24dcca9e' })

// get write and notify characteristics from service
let writeCharacteristic =
    await service.getCharacteristic({ Flags: 'write' })
let notifyCharacteristic =
    await service.getCharacteristic({ Flags: 'notify' })

// start notification and handle incoming messages
// of notify characteristic
await notifyCharacteristic.startNotify()
notifyCharacteristic.ValueAsString.addListener((text) => {
    console.log(text)
})

// write hello world message to write characteristic
await writeCharacteristic.writeString(JSON.stringify(json))
```

Alternatively, we could start the server instead:

```js
// get advertising and GATT-manager
let advertisingManager = await adapter.getAdvertisingManager()
let gattManager = await adapter.getGattManager()

// create and register advertisement
let advertisement = new UartAdvertisement(bluez, 'SORRIR-Gatt-Server', 0)
await advertisingManager.registerAdvertisement(advertisement.path, {})

// create and register application
let application = new UartApplication(bluez)
await gattManager.registerApplication(application.path, {})

// get write and notify characteristics from application
let txCharacteristic = application.service.txCharacteristic
let rxCharacteristic = application.service.rxCharacteristic

// answer incoming messages with hello world message
rxCharacteristic.onMessage = (message) => {
    console.log(message)
    txCharacteristic.sendMessage(JSON.stringify(json))
}       
```

## Interfaces

Interfaces are the way that we can communicate with `bluez`. We have two different kinds of interfaces, which differ in who provides them:

* `client interfaces` are provided and implemented by `bluez`. This means we, as the client, connect to and communicate with them via the D-Bus.

* `host interfaces` are implemented by us. `bluez` connects to our custom interfaces which allows to created or own services or applications.

All interfaces share three different ingredients:

* `properties` that can be set or get
* `methods` that can be called by the user
* `signals` that are called

### Client interfaces

`client interfaces` are provided by `bluez` itself and have well defined functionality. `client interfaces` are initialized with its classes' static `connect` method.

Say for example you would want to connect to the `Adapter` interface:
```js
let adapter = await Adapter.connect(bluez, 'org/bluez/hci0')
```

##### Properties

The `adapter` has multiple properties that can be either a `Property` or `ReadOnlyProperty`.

`adapter.Powered` is a `Property`:
```js
// read property
let powered = await adapter.Powered.get()
// write property
await adapter.Powered.set(true)
```
A `ReadOnlyProperty` is similar, however it misses the `set` method.

All properties emit an event whenever their value is changed:
```js
// wait until powered changes
await adapter.Powered.waitForChange()
// wait until powered is set to true
await adapter.Powered.waitForValue(true)
// do something on change
adapter.Power.addListener(
    (newValue) => { /* do something */ })
```

##### Methods

Methods are as straightforward as calling them:
```js
// start discovery
await adapter.startDiscovery()
```
However, the meaning of `await` in this context needs to be clarified. It does not mean `wait until discovery has started`, but instead `wait until the method call is sent via the D-Bus`. In consequence, if you want to make sure the discovery really has started, you need to wait until the corresponding property has changed:
```js
// start discovery and wait until discovery started
await adapter.startDiscovery()
await adapter.Discovering.waitForValue(true)
```

##### Signals

`Adapter` has no signals, however `DBusObjectManager` does. Signals, similarly to properties, emit an event whenever they are triggered:
```js
// do something on 'InterfacesAdded' signal call
dBusObjectManager.InterfacesAdded.addListener(
    (path, objects) => { /* do something */ })
// do something on 'InterfacesRemoved' signal call
dBusObjectManager.InterfacesRemoved.addListener(
    (path, interfaceNames) => { /* do something */ })
```
The parameters for the callback depend on the `Signal`.

### Host interfaces

`host interfaces` are implemented by the user. They are needed if you want to implement your own services or peripherals.

#### Prerequisites

Implementing `host interfaces` requires you to use Babel and enable the plugins `@babel/plugin-proposal-decorators`, as well as `@babel/plugin-proposal-class-properties`.

Additionally, it is recommended to use TypeScript for the implementation of `host interfaces`. While it is most likely possible to use the typescript compiler with the decorators as well, in the compilation of the package the plugin `@babel/plugin-transform-typescript` was used for code transpiling.

#### Implementation

`host interfaces` are classes that extend the base class `BaseHostInterface`. An example is `UartAdvertisement`:

```ts
class UartAdvertisement extends BaseHostInterface {
    LocalName: string
    ServiceUUIDs: string[]
    Includes: string[]
    Type: string

    constructor(bluez: Bluez, name: string, index: uint16 = 0) {
        super(bluez,
            // interface path
            `/org/bluez/sorrir/advertisement${index}`,
            // interface name
            `org.bluez.LEAdvertisement1`,
            // these are a list of properties of the interface
            {
                // define property via object with signature and value
                'LocalName': { signature: 's', value: name },
                // define property via Variant
                'ServiceUUIDs': new Variant('as',
                    ['6e400001-b5a3-f393-e0a9-e50e24dcca9e']),
                'Includes': new Variant('as', ["tx-power"]),
                'Type': new Variant('s', 'peripheral')
            }
        )
        // this call writes the properties and exposes the interface
        // to the bus. It needs to be called, otherwise the interface
        // is invisible
        this._init()
    }

    @method({ inSignature: '', outSignature: '' })
    Release() {
        console.log("released!")
    }
}
```
Every `host interface` needs to have a well defined `path` and `name`. The name corresponds to the interface that is implemented, which is defined by `bluez`. It provides possible properties, methods and signals. Unfortunately, as the implementation of host interfaces is in an early state in this package, there is no comprehensive list of interfaces and their paths that can be implemented. For now, see the [bluez documentation](https://git.kernel.org/pub/scm/bluetooth/bluez.git/tree/doc) in that matter.

##### Properties

Properties are initialized from within the constructor as parameter of the `super` call. After `this._init()` has been called, they can be accessed just like regular class parameters. Host properties are initialized in the format
```ts
{
    signature: string // D-Bus signature of of the property
    value: dBusType // initial value 
    valueTransform?: ((base: any) => dBusType) // transformation from actual value to D-Bus understandable value
}
```
The `signature` tells the D-Bus which type the property is of. For example, `s` is a String, `b` a Boolean. For a complete explanation of possible signatures, look into the [D-Bus specification](https://dbus.freedesktop.org/doc/dbus-specification.html#type-system).

`valueTransform` allows the variable to have a different native type to the actual D-Bus compliant value. For example, if you would want to save an index as `number`, but the interfaces specification requires a `string` prefixed by "index", you can do this:
```ts
{
    signature: 's' // D-Bus value is actually a string
    value: 0 // initial value is number
    valueTransform: (i) => `index${i}` // transformation from number to string
}
```
If no `valueTransform` is provided, you can also provide a `Variant`, as done in the above example interface.

##### Methods

Methods are declared with the decorator `@method`. They require an input and output signature which correspond to the input parameters and the return values.

```ts
@method({ inSignature: 's', outSignature: 'as' })
StringAsArray(s: string) {
    return s.split("")
}
```

Methods can be overwritten if the already implemented interface is extended further, however `this._init()` has to be called again in the constructor of the expanding class, otherwise changes are not reflected.

##### Signals

Methods are declared with the decorator `@signal`. They require a signature which corresponds to the input parameters.

```ts
@signal({ signature: 's' })
PrintString(s: string) {
    console.log(s)
}
```

Like methods, signals can be overwritten but require a re-call of `this._init()` in the constructor of the expanding class.

## TODO

* Better documentation of code
* Better implementation of host interfaces
* Unify implementation of host and client interfaces
* Implement test cases
* Implement further abstractions
* ...
