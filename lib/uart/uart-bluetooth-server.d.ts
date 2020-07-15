export declare class UartBluetoothServer {
    name: string;
    handleMessage: (message: string, sender: string) => Promise<void>;
    isStarted: boolean;
    address: String;
    private _application;
    private _txCharacteristic;
    private _advertisingManager;
    private _gattManager;
    private _advertisement;
    constructor(name: string);
    start(): Promise<void>;
    sendMessage(message: any): Promise<void>;
    stop(): Promise<void>;
}
//# sourceMappingURL=uart-bluetooth-server.d.ts.map