import { SmartPlug } from "./SmartPlug";
export declare class Kasa {
    deviceList: any[];
    terminalId: string;
    token: string;
    constructor();
    login(user: string, password: string): Promise<any>;
    getDeviceList(): Promise<any>;
    getDevice(deviceId: string): Promise<SmartPlug>;
}
export declare const login: (user: string, password: string, terminalId?: string) => Promise<any>;
export declare const devices: (token: string) => Promise<any>;
