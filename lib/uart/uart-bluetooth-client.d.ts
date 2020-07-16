export declare class UartBluetoothClient {
    target: string;
    handleMessage: (message: string, sender: string) => Promise<void> | void;
    isStarted: boolean;
    address: String;
    private _txCharacteristic;
    private _rxCharacteristic;
    private _targetDevice;
    constructor(target: string);
    connect(): Promise<void>;
    sendMessage(message: string): Promise<void>;
    disconnect(): Promise<void>;
}
//# sourceMappingURL=uart-bluetooth-client.d.ts.map