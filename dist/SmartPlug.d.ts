export declare class SmartPlug {
    deviceId: string;
    state: string;
    terminalId: string;
    token: string;
    url: string;
    constructor({ deviceId, terminalId, token, url, }: {
        deviceId: string;
        terminalId: string;
        token: string;
        url: string;
    });
    on(): Promise<void>;
    off(): Promise<void>;
    getState(): Promise<void>;
}
export declare const on: ({ deviceId, token, url }: {
    deviceId: any;
    token: any;
    url: any;
}) => Promise<any>;
