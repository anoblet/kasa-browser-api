import { v4 as uuidv4 } from "uuid/dist/esm-browser";

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
    .then(async (response) => {
      if (response.error_code) throw new Error(response);
      return {
        devices: await devices(response.result.token),
        terminalId,
        token: response.result.token,
      };
    });

export const devices = async (token: string) =>
  fetch(`https://wap.tplinkcloud.com?token=${token}`, {
    body: JSON.stringify({
      method: "getDeviceList",
    }),
    method: "POST",
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.error_code) throw new Error(response);
      return response.result.deviceList.reduce(
        (accumulator: any[], currentValue: any) => {
          accumulator.push({
            alias: currentValue.alias,
            id: currentValue.deviceId,
            token,
            url: currentValue.appServerUrl,
          });
          return accumulator;
        },
        []
      );
    });
