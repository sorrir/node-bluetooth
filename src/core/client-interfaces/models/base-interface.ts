import { Bluez } from "../../bluez"
import { EventEmitter } from "events"
import { ReturnFunction, RetryOptions, sleep } from "../../helper"
import { ReadOnlyProperty, ReadWriteProperty } from "./property"

type _InterfaceConstructor<T extends BaseInterface<any>> = (bluez: Bluez, path: string) => Promise<T>

export class BaseInterface<T extends EventEmitter> {
    protected readonly _bluez: Bluez
    protected readonly _internal: T
    readonly path: string

    constructor(bluez: Bluez, internal: T) {
        this._bluez = bluez
        this._internal = internal
        this.path = (<any>internal).dbusObject.path
    }

    /**
     * @return the internal {@Link EventEmitter}
     */
    eventEmitter(): EventEmitter {
        return <EventEmitter>this._internal
    }

    async getChildObjectsRaw(interfaceName: string) {
        return this._bluez.getObjectData(interfaceName, this.path)
    }

    /**
     * Finds a specific child that matches the given filter.
     * 
     * @param filter Filter, for example ```{'Name' : 'child_name'}```
     * @returns a child object if it exists. If multiple childs match the filter,
     * the first one is returned
     */

    async getChildObject<T extends BaseInterface<any>>(interfaceName: string, constructor: _InterfaceConstructor<T>, filter: object = {}, options: RetryOptions = { maxRetries: 0, retryIntervalMs: 1000 }): Promise<T | undefined> {
        const childData = await this._bluez.getObjectData(interfaceName, this.path)
        for (let [path, data] of Object.entries(childData)) {
            let isIn: boolean = true
            for (let [key, filterValue] of Object.entries(filter)) {
                let objectValue = (data[key] || {}).value
                if(objectValue instanceof Array) {
                    if(filterValue instanceof Array) {
                        isIn = filterValue.every(val => objectValue.includes(val));
                    } else {
                        isIn = objectValue.includes(filterValue)
                    }
                } else {
                    isIn = objectValue === filterValue
                }
                if(!isIn) {
                    break
                }
            }
            if (isIn) {
                return constructor(this._bluez, path)
            }
        }
        if (options.maxRetries > 0) {
            await sleep(options.retryIntervalMs)
            options.maxRetries--
            return this.getChildObject(interfaceName, constructor, filter, options)
        }
        return undefined
    }
}
