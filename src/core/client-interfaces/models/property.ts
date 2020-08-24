import { DBusEventEmitter, GenericDBusEventEmitter } from "./dbus-event-emitter"
import { dBusType, dict, Variant } from "../../types"
import * as Helper from "../../helper"
import { Exception } from "handlebars"

export type ValueTransformer<I extends dBusType, O extends dBusType> = {
    readonly in: (value: O) => I
    readonly out: (value: I) => O
}

export type ReadOnlyValueTransformer<I extends dBusType, O extends dBusType> = {
    readonly in: (value: O) => I
}

export class ReadOnlyProperty<T extends dBusType> extends GenericDBusEventEmitter<{ interfaceName: string, changedProperties: dict<string, Variant>, invalidatedProperties: Array<string> }, T>  {
    readonly name: string
    protected readonly _internal: any
    protected readonly _valueTransformer: ValueTransformer<T, any>

    constructor(name: string, internal: any, valueTransformer: ReadOnlyValueTransformer<T, any> = { in: value => <T>value }) {
        super('PropertiesChanged', internal, { interfaceName: null, changedProperties: null, invalidatedProperties: null }, (event) => valueTransformer.in((event.changedProperties[name] || {}).value))
        this.name = name
        this._internal = internal
        this._valueTransformer = { out: value => <T>value, ...valueTransformer }
    }

    async get(): Promise<T> {
        return this._internal[this.name]()
    }

    async waitForChange() {
        return this.waitForEvent(() => true)
    }

    /**
     * Wait for a specific value of the property.
     * 
     * @param newValue  the value to be reached
     * @param timeoutMs timeout in milliseconds
     * 
     * @throws an exception if the new value is not reached until the given timeout.
     */
    async waitForValue(newValue: T, timeoutMs: number = 30000): Promise<void> {
        const _this = this
        // check the current value and simultaneously wait for an incoming event
        // 
        return Helper.firstResolve<Boolean>(
            [
                new Promise<Boolean>(async (resolve, reject) => {
                    let value = await _this.get()
                    if (value === newValue) {
                        resolve(true)
                    } else {
                        reject()
                    }
                }),
                this.waitForEvent((value) => value === newValue).then(() => true),
                Helper.sleep(timeoutMs).then(() => false)
            ]).then((success) => {
                if(!success) {
                    throw new Exception(`Waiting for value timed out: '${this.name}' did not become '${newValue}'`)
                }
            })
    }
}

export class Property<T extends dBusType> extends ReadOnlyProperty<T> {
    constructor(name: string, internal: any, valueTransformer: ValueTransformer<T, any> = { in: value => <T>value, out: value => <dBusType>value }) {
        super(name, internal, valueTransformer)
    }

    async set(value: T) {
        return this._internal[this.name](this._valueTransformer.out(value))
    }
}

export type ReadWriteProperty<T extends dBusType> = Property<T> | ReadOnlyProperty<T>