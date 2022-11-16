const DBus = require('@quadratclown/dbus-next');
const { EventEmitter } = require('events');

/*
 * Generated by dbus-next interface generator
 * Template: javascript-class.js.hbs
 */

// Introspection XML of org.bluez at /org/bluez/*
export const XMLObjectData = `<!DOCTYPE node PUBLIC "-//freedesktop//DTD D-BUS Object Introspection 1.0//EN"
"http://www.freedesktop.org/standards/dbus/1.0/introspect.dtd">
<node><interface name="org.freedesktop.DBus.Introspectable"><method name="Introspect"><arg name="xml" type="s" direction="out"/>
</method></interface><interface name="org.bluez.Device1"><method name="Disconnect"></method><method name="Connect"></method><method name="ConnectProfile"><arg name="UUID" type="s" direction="in"/>
</method><method name="DisconnectProfile"><arg name="UUID" type="s" direction="in"/>
</method><method name="Pair"></method><method name="CancelPairing"></method><property name="Address" type="s" access="read"></property><property name="AddressType" type="s" access="read"></property><property name="Name" type="s" access="read"></property><property name="Alias" type="s" access="readwrite"></property><property name="Class" type="u" access="read"></property><property name="Appearance" type="q" access="read"></property><property name="Icon" type="s" access="read"></property><property name="Paired" type="b" access="read"></property><property name="Trusted" type="b" access="readwrite"></property><property name="Blocked" type="b" access="readwrite"></property><property name="LegacyPairing" type="b" access="read"></property><property name="RSSI" type="n" access="read"></property><property name="Connected" type="b" access="read"></property><property name="UUIDs" type="as" access="read"></property><property name="Modalias" type="s" access="read"></property><property name="Adapter" type="o" access="read"></property><property name="ManufacturerData" type="a{qv}" access="read"></property><property name="ServiceData" type="a{sv}" access="read"></property><property name="TxPower" type="n" access="read"></property><property name="ServicesResolved" type="b" access="read"></property></interface><interface name="org.freedesktop.DBus.Properties"><method name="Get"><arg name="interface" type="s" direction="in"/>
<arg name="name" type="s" direction="in"/>
<arg name="value" type="v" direction="out"/>
</method><method name="Set"><arg name="interface" type="s" direction="in"/>
<arg name="name" type="s" direction="in"/>
<arg name="value" type="v" direction="in"/>
</method><method name="GetAll"><arg name="interface" type="s" direction="in"/>
<arg name="properties" type="a{sv}" direction="out"/>
</method><signal name="PropertiesChanged"><arg name="interface" type="s"/>
<arg name="changed_properties" type="a{sv}"/>
<arg name="invalidated_properties" type="as"/>
</signal>
</interface><node name="service0001"/></node>`;

/**
 * Service: org.bluez
 * ObjectPath: /org/bluez/*
 * Interface: org.bluez.Device1
 */
export class Device1 extends EventEmitter {

    static Connect(bus, objectPath, xml) { 
        if(!objectPath) { objectPath = "/org/bluez/*"; }
        if(!xml) { xml = XMLObjectData; }
        return bus.getProxyObject('org.bluez', objectPath, xml).then((obj) => new Device1(obj));
    }

    constructor(dbusObject) {
        super();
        this.dbusInterfaceName = 'org.bluez.Device1';
        this.dbusObject = dbusObject;
        this.thisDBusInterface = dbusObject.getInterface('org.bluez.Device1');
        this.propertiesDBusInterface = dbusObject.getInterface('org.freedesktop.DBus.Properties');

        // forward property change events
        const forwardPropertyChange = (iface, changed, invalidated) => {
            if(iface === this.dbusInterfaceName) {
                this.emit('PropertiesChanged', iface, changed, invalidated);
            }
        }

        // forward all signals
        this.on("newListener", (event, listener) => {
            if(event === "PropertiesChanged" && this.listenerCount('PropertiesChanged') === 0) {
                this.propertiesDBusInterface.on('PropertiesChanged', forwardPropertyChange);
            } else {
                this.thisDBusInterface.on(event, listener);
            }
        });
        this.on("removeListener", (event, listener) => {
            if(event === "PropertiesChanged" && this.listenerCount('PropertiesChanged') === 0) {
                this.propertiesDBusInterface.removeListener('PropertiesChanged', forwardPropertyChange);
            } else {
                this.thisDBusInterface.removeListener(event, listener);
            }
        });
    }

    /***** Properties *****/

    getProperties() {
        return this.propertiesDBusInterface.GetAll(this.dbusInterfaceName);
    }

    getProperty(name) {
        return this.propertiesDBusInterface.Get(this.dbusInterfaceName, name);
    }

    setProperty(name, value) {
        return this.propertiesDBusInterface.Set(this.dbusInterfaceName, name, value);
    }

    //@property({ name: 'Address', signature: 's', access: ACCESS_READ })
    Address() {
        return this.propertiesDBusInterface.Get(this.dbusInterfaceName, 'Address').then((variant) => variant.value);
    }

    //@property({ name: 'AddressType', signature: 's', access: ACCESS_READ })
    AddressType() {
        return this.propertiesDBusInterface.Get(this.dbusInterfaceName, 'AddressType').then((variant) => variant.value);
    }

    //@property({ name: 'Name', signature: 's', access: ACCESS_READ })
    Name() {
        return this.propertiesDBusInterface.Get(this.dbusInterfaceName, 'Name').then((variant) => variant.value);
    }

    //@property({ name: 'Alias', signature: 's', access: ACCESS_READWRITE })
    Alias(value) {
        if(value !== undefined) {
            return this.propertiesDBusInterface.Set(this.dbusInterfaceName, 'Alias', new DBus.Variant("s", value));
        } else {
            return this.propertiesDBusInterface.Get(this.dbusInterfaceName, 'Alias').then((variant) => variant.value);
        }
    }

    //@property({ name: 'Class', signature: 'u', access: ACCESS_READ })
    Class() {
        return this.propertiesDBusInterface.Get(this.dbusInterfaceName, 'Class').then((variant) => variant.value);
    }

    //@property({ name: 'Appearance', signature: 'q', access: ACCESS_READ })
    Appearance() {
        return this.propertiesDBusInterface.Get(this.dbusInterfaceName, 'Appearance').then((variant) => variant.value);
    }

    //@property({ name: 'Icon', signature: 's', access: ACCESS_READ })
    Icon() {
        return this.propertiesDBusInterface.Get(this.dbusInterfaceName, 'Icon').then((variant) => variant.value);
    }

    //@property({ name: 'Paired', signature: 'b', access: ACCESS_READ })
    Paired() {
        return this.propertiesDBusInterface.Get(this.dbusInterfaceName, 'Paired').then((variant) => variant.value);
    }

    //@property({ name: 'Trusted', signature: 'b', access: ACCESS_READWRITE })
    Trusted(value) {
        if(value !== undefined) {
            return this.propertiesDBusInterface.Set(this.dbusInterfaceName, 'Trusted', new DBus.Variant("b", value));
        } else {
            return this.propertiesDBusInterface.Get(this.dbusInterfaceName, 'Trusted').then((variant) => variant.value);
        }
    }

    //@property({ name: 'Blocked', signature: 'b', access: ACCESS_READWRITE })
    Blocked(value) {
        if(value !== undefined) {
            return this.propertiesDBusInterface.Set(this.dbusInterfaceName, 'Blocked', new DBus.Variant("b", value));
        } else {
            return this.propertiesDBusInterface.Get(this.dbusInterfaceName, 'Blocked').then((variant) => variant.value);
        }
    }

    //@property({ name: 'LegacyPairing', signature: 'b', access: ACCESS_READ })
    LegacyPairing() {
        return this.propertiesDBusInterface.Get(this.dbusInterfaceName, 'LegacyPairing').then((variant) => variant.value);
    }

    //@property({ name: 'RSSI', signature: 'n', access: ACCESS_READ })
    RSSI() {
        return this.propertiesDBusInterface.Get(this.dbusInterfaceName, 'RSSI').then((variant) => variant.value);
    }

    //@property({ name: 'Connected', signature: 'b', access: ACCESS_READ })
    Connected() {
        return this.propertiesDBusInterface.Get(this.dbusInterfaceName, 'Connected').then((variant) => variant.value);
    }

    //@property({ name: 'UUIDs', signature: 'as', access: ACCESS_READ })
    UUIDs() {
        return this.propertiesDBusInterface.Get(this.dbusInterfaceName, 'UUIDs').then((variant) => variant.value);
    }

    //@property({ name: 'Modalias', signature: 's', access: ACCESS_READ })
    Modalias() {
        return this.propertiesDBusInterface.Get(this.dbusInterfaceName, 'Modalias').then((variant) => variant.value);
    }

    //@property({ name: 'Adapter', signature: 'o', access: ACCESS_READ })
    Adapter() {
        return this.propertiesDBusInterface.Get(this.dbusInterfaceName, 'Adapter').then((variant) => variant.value);
    }

    //@property({ name: 'ManufacturerData', signature: 'a{qv}', access: ACCESS_READ })
    ManufacturerData() {
        return this.propertiesDBusInterface.Get(this.dbusInterfaceName, 'ManufacturerData').then((variant) => variant.value);
    }

    //@property({ name: 'ServiceData', signature: 'a{sv}', access: ACCESS_READ })
    ServiceData() {
        return this.propertiesDBusInterface.Get(this.dbusInterfaceName, 'ServiceData').then((variant) => variant.value);
    }

    //@property({ name: 'TxPower', signature: 'n', access: ACCESS_READ })
    TxPower() {
        return this.propertiesDBusInterface.Get(this.dbusInterfaceName, 'TxPower').then((variant) => variant.value);
    }

    //@property({ name: 'ServicesResolved', signature: 'b', access: ACCESS_READ })
    ServicesResolved() {
        return this.propertiesDBusInterface.Get(this.dbusInterfaceName, 'ServicesResolved').then((variant) => variant.value);
    }


    /***** Methods *****/

    //@method({ name: 'Disconnect', inSignature: '', outSignature: '' })
    Disconnect() {
        return this.thisDBusInterface.Disconnect();
    }

    //@method({ name: 'Connect', inSignature: '', outSignature: '' })
    Connect() {
        return this.thisDBusInterface.Connect();
    }

    //@method({ name: 'ConnectProfile', inSignature: 's', outSignature: '' })
    ConnectProfile(UUID) {
        return this.thisDBusInterface.ConnectProfile(UUID);
    }

    //@method({ name: 'DisconnectProfile', inSignature: 's', outSignature: '' })
    DisconnectProfile(UUID) {
        return this.thisDBusInterface.DisconnectProfile(UUID);
    }

    //@method({ name: 'Pair', inSignature: '', outSignature: '' })
    Pair() {
        return this.thisDBusInterface.Pair();
    }

    //@method({ name: 'CancelPairing', inSignature: '', outSignature: '' })
    CancelPairing() {
        return this.thisDBusInterface.CancelPairing();
    }



    /***** Signals for org.bluez.Device1 *****/
}

