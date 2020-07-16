export declare class UartBluetoothServer {
    name: string;
    handleMessage: (message: string, sender: string) => Promise<void> | void;
    isStarted: boolean;
    address: String;
    private _application;
    private _txCharacteristic;
    private _advertisingManager;
    private _gattManager;
    private _advertisement;
    constructor(name: string);
    start(): Promise<void>;
    sendMessage(message: string): Promise<void>;
    stop(): Promise<void>;
}
//# sourceMappingURL=uart-bluetooth-server.d.ts.map