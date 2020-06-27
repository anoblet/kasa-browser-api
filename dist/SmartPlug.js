export class SmartPlug {
    constructor({ deviceId, terminalId, token, url, }) {
        this.deviceId = deviceId;
        this.terminalId = terminalId;
        this.token = token;
        this.url = url;
    }
    async on() {
        const response = await fetch(`${this.url}?token=${this.token}`, {
            body: JSON.stringify({
                method: "passthrough",
                params: {
                    deviceId: this.deviceId,
                    requestData: { system: { set_relay_state: { state: 1 } } },
                },
            }),
            method: "POST",
        }).then((response) => response.json());
    }
    async off() {
        const response = await fetch(`${this.url}?token=${this.token}`, {
            body: JSON.stringify({
                method: "passthrough",
                params: {
                    deviceId: this.deviceId,
                    requestData: { system: { set_relay_state: { state: 0 } } },
                },
            }),
            method: "POST",
        }).then((response) => response.json());
    }
    async getState() {
        const response = await fetch(`${this.url}?token=${this.token}`, {
            body: JSON.stringify({
                method: "passthrough",
                params: {
                    deviceId: this.deviceId,
                    requestData: {
                        system: { get_sysinfo: null },
                        emeter: { get_realtime: null },
                    },
                },
            }),
            method: "POST",
        }).then((response) => response.json());
    }
}
export const on = async ({ deviceId, token, url }) => fetch(`${url}?token=${token}`, {
    body: JSON.stringify({
        method: "passthrough",
        params: {
            deviceId: deviceId,
            requestData: { system: { set_relay_state: { state: 1 } } },
        },
    }),
    method: "POST",
}).then((response) => response.json());
