export declare const login: (user: string, password: string, terminalId?: string) => Promise<{
    devices: any;
    terminalId: string;
    token: any;
}>;
export declare const devices: (token: string) => Promise<any>;
