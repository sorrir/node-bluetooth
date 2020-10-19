import { Adapter } from "../core/client-interfaces/adapter";
import { Exception } from "handlebars";
import { Bluez } from "../core/bluez";
import { UartTxCharacteristic } from "./host-interfaces/uart-tx-characteristic";
import { UartAdvertisement } from "./host-interfaces/uart-advertisement";
import { UartApplication } from "./host-interfaces/uart-application";
import { LEAdvertisingManager } from "../core/client-interfaces/le-advertising-manager";
import { GattManager } from "../core/client-interfaces/gatt-manager";

export class UartBluetoothServer {
  name: string;
  handleMessage: (message: string, sender: string) => Promise<void> | void;
  isStarted: boolean;
  address: string;
  private _application: UartApplication;
  private _txCharacteristic: UartTxCharacteristic;
  private _advertisingManager: LEAdvertisingManager;
  private _gattManager: GattManager;
  private _advertisement: UartAdvertisement;

  constructor(name: string) {
    this.name = name;
    this.handleMessage = async (message: string, sender: string) => {};
    this.isStarted = false;
    this.address = undefined;
  }

  async start() {
    const bluez = await new Bluez().init();
    const adapter = await Adapter.connect(bluez);
    this.address = await adapter.Address.get();
    this._advertisingManager = await adapter.getAdvertisingManager();
    this._gattManager = await adapter.getGattManager();
    await adapter.Powered.set(true);

    this._advertisement = new UartAdvertisement(bluez, this.name, 0);
    this._application = new UartApplication(bluez);

    await this._advertisingManager.registerAdvertisement(
      this._advertisement.path,
      {}
    );
    await this._gattManager.registerApplication(this._application.path, {});

    const obj = this;
    this._application.service.rxCharacteristic.onMessage = (
      message,
      options
    ) => {
      try {
        const json = JSON.parse(message);
        obj.handleMessage(json["msg"], json["sender"]);
      } catch (e) {
        console.error(`Error while parsing an incoming message:\n${e}`);
      }
    };
    this._txCharacteristic = this._application.service.txCharacteristic;

    this.isStarted = true;
    console.log("successfully started server");
  }

  async sendMessage(message: string) {
    if (!this.isStarted) {
      throw new Exception("Server is not yet started");
    }
    const json = {
      msg: message || "",
      sender: this.address,
    };
    const text = JSON.stringify(json);
    this._txCharacteristic.sendMessage(text);
    console.log(`sent: ${text}`);
  }

  async stop() {
    console.log("successfully stopped server");
  }
}
