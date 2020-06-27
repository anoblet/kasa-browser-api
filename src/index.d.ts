export declare class Kasa {
    private config;
    deviceList: any;
    token: string;
    constructor(config: {
        username: string;
        password: string;
    });
    login(): Promise<void>;
    getDeviceList(): Promise<void>;
}
