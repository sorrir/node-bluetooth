import { Bluez } from "../../bluez"
import { path, dBusType, dict, Variant } from "../../types"
import { ProxyObject, ClientInterface, Message } from "dbus-next"
import * as dbus from 'dbus-next'
import { Exception } from 'handlebars'

let {
    property, method, signal,
    ACCESS_READ, ACCESS_WRITE, ACCESS_READWRITE
} = dbus.interface;

export type property = {
    signature: string
    value: dBusType
    valueTransform?: ((base: any) => dBusType)
}

export class BaseHostInterface extends dbus.interface.Interface {
    static _INTERFACE = 'org.freedesktop.DBus.Properties'
    name: string
    path: path
    bluez: Bluez
    managedProperties: dict<string, property>

    /**
     *  {@Link _init} has to be called after this
     * */
    constructor(bluez: Bluez, path: path, name: string, managedProperties: dict<string, property> = {}) {
        super(name)
        this.name = name
        this.path = path
        this.bluez = bluez
        this.managedProperties = managedProperties
        const _this = this
        bluez.bus.addMethodHandler((msg: Message) => {
            return _this._handleReturnFn(msg, 'GetAll')
            //TODO: implement this correctly
            /*
            if (_this._handleReturnFn(msg, 'Get'))
                return true
            */
        })
    }

    //TODO: find a better solution for this workaround
    //what this does: changes the order of adding the class parameters to after the constructors
    //so that they are not overwritten in by the declaration of the derived class
    //also, the interface needs to be exported after the decleration of the derived class
    //because otherwise overwritten methods are not reflected
    protected _init() {
        for (let [name, property] of Object.entries(this.managedProperties)) {
            this[name] = property.value
        }
        this.bluez.exportInterface(this)
        return this
    }

    GetAll(): Variant {
        let allProperties = {}
        for (let [name, property] of Object.entries(this.managedProperties)) {
            allProperties[name] = this._getProperty(name, property)
        }
        return new Variant('a{sv}', allProperties)
    }

    Get(name: string): Variant {
        let property: property = this.managedProperties[name]
        return property === undefined ? undefined : this._getProperty(name, property)
    }

    //emitOnPropertiesChanged(string: string, dict: dict<string, Variant>, array: Array<string>) { this._internal.emit('PropertiesChanged', string, dict, array) }

    emitPropertiesChanged(values: dict<string, Variant>) {
        let message = Message.newSignal(this.path,
            BaseHostInterface._INTERFACE,
            'PropertiesChanged',
            'sa{sv}as',
            [
                this.name,
                values,
                []
            ])
        this.bluez.bus.send(message)
    }

    unexport() {
        this.bluez.unexportInterface(this)
    }

    update() {
        this.bluez.updateInterface(this)
    }

    _getProperty(name: string, property: property) {
        let value: dBusType = property.valueTransform ? property.valueTransform(this[name]) : this[name]
        return new Variant(property.signature, value || property.value)
    }

    _handleReturnFn(msg: Message, name: string, ...args: any[]) {
        if (msg.path === this.path &&
            msg.interface === BaseHostInterface._INTERFACE
            && msg.member === name) {
            try {
                console.log(`${this.path}:${name}`)
                let variant = this[name](...args)
                if (variant !== undefined) {
                    let reply = Message.newMethodReturn(msg, variant.signature,
                        [
                            variant.value
                        ]);
                    this.bluez.bus.send(reply);
                } else {
                    throw new Exception("This should not happen")
                }
                return true;
            } catch (e) {
                console.log(e)
            }
        }
    }
}