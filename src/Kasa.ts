import { v4 as uuidv4 } from "uuid/dist/esm-browser";
import { SmartPlug } from "./SmartPlug";

export class Kasa {
  deviceList: any[];
  terminalId: string;
  token: string;

  constructor() {}

  async login(user: string, password: string) {
    const terminalId = uuidv4();
    return fetch("https://wap.tplinkcloud.com", {
      body: JSON.stringify({
        method: "login",
        params: {
          appType: "Kasa_Android",
          cloudUserName: user,
          cloudPassword: password,
          terminalUUID: terminalId,
        },
      }),
      method: "POST",
    })
      .then((response) => response.json())
      .then(async (response) =>
        !response.error_code
          ? {
              devices: await devices(response.result.token),
              token: response.result.token,
            }
          : response
      );
  }

  async getDeviceList() {
    const response = await fetch(
      `https://wap.tplinkcloud.com?token=${this.token}`,
      {
        body: JSON.stringify({
          method: "getDeviceList",
        }),
        method: "POST",
      }
    ).then((response) => response.json());
    if (!response.error_code) {
      return response.result.deviceList;
    }
  }

  async getDevice(deviceId: string) {
    console.log(this.deviceList);
    const device = this.deviceList.filter(
      (device) => device.deviceId === deviceId
    )[0];
    return new SmartPlug({
      deviceId,
      terminalId: this.terminalId,
      token: this.token,
      url: device.appServerUrl,
    });
  }
}

export const login = async (
  user: string,
  password: string,
  terminalId: string = uuidv4()
) =>
  fetch("https://wap.tplinkcloud.com", {
    body: JSON.stringify({
      method: "login",
      params: {
        appType: "Kasa_Android",
        cloudUserName: user,
        cloudPassword: password,
        terminalUUID: terminalId,
      },
    }),
    method: "POST",
  })
    .then((response) => response.json())
    .then(async (response) =>
      !response.error_code
        ? {
            devices: await devices(response.result.token),
            terminalId,
            token: response.result.token,
          }
        : response
    );

export const devices = async (token: string) =>
  fetch(`https://wap.tplinkcloud.com?token=${token}`, {
    body: JSON.stringify({
      method: "getDeviceList",
    }),
    method: "POST",
  })
    .then((response) => response.json())
    .then((response) =>
      !response.error_code
        ? response.result.deviceList.reduce(
            (accumulator: any[], currentValue: any) => {
              accumulator.push({
                deviceId: currentValue.deviceId,
                token,
                url: currentValue.appServerUrl,
              });
              return accumulator;
            },
            []
          )
        : response
    );
