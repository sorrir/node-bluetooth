import { MessageBus } from 'dbus-next/lib/bus'
import * as dbus from "dbus-next"
import { DBusObjectManager } from "./client-interfaces/dbus-object-manager"
import { BaseHostInterface } from './host-interfaces/models/base-host-interface'
import { DBusObject } from "./client-interfaces/models/dbus-object"
import { path } from './types'

export class Bluez {
    readonly bus: MessageBus
    objectManager: DBusObjectManager

    constructor() {
        this.bus = dbus.systemBus()
    }

    async init() {
        await this.bus.requestName('org.bluez')
        this.objectManager = await DBusObjectManager.connect(this, '/')
        return this
    }

    async getObjectData(interfaceName: string, path: string = '/org/bluez') {
        let _interfaceName = `org.bluez.${interfaceName}`
        let objects = await this.objectManager.getManagedObjects()
        let output = {}
        for (let key of Object.keys(objects)) {
            if (key.startsWith(path)) {
                const data = objects[key][_interfaceName]
                if (data) {
                    output[key] = data
                }
            }
        }
        return output;
    }

    async getDBusObject(path: path, name: string, withProps: boolean = false) {
        return new DBusObject(this, path, name, withProps).init()
    }

    exportInterface(iface: BaseHostInterface) {
        return this.bus.export(iface.path, iface)
    }

    unexportInterface(iface: BaseHostInterface) {
        return this.bus.unexport(iface.path)
    }

    updateInterface(iface: BaseHostInterface) {
        this.bus.unexport(iface.path)
        this.bus.export(iface.path, iface)
    }
}