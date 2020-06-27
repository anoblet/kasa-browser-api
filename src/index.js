import { v4 as uuidv4 } from 'uuid/dist/esm-browser';
export class Kasa {
    constructor(config) {
        this.config = config;
        this.login();
    }
    async login() {
        const response = await fetch("https://wap.tplinkcloud.com", {
            body: JSON.stringify({
                method: "login",
                params: {
                    appType: "Kasa_Android",
                    cloudUserName: "andrewbnoblet@gmail.com",
                    cloudPassword: "NzwxJJ*2fS_bRkY",
                    terminalUUID: uuidv4(),
                },
            }),
            method: "POST",
        }).then((response) => response.json());
        if (!response.error_code) {
            this.token = response.result.token;
            this.getDeviceList();
        }
    }
    async getDeviceList() {
        const response = await fetch(`https://wap.tplinkcloud.com?token=${this.token}`, {
            body: JSON.stringify({
                method: "getDeviceList",
            }),
            method: "POST",
        }).then((response) => response.json());
        if (!response.error_code) {
            this.deviceList = response.result;
        }
    }
}
