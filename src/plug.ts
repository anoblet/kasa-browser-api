export const off = async ({ deviceId, token, url }) =>
  fetch(`${url}?token=${token}`, {
    body: JSON.stringify({
      method: "passthrough",
      params: {
        deviceId: deviceId,
        requestData: { system: { set_relay_state: { state: 0 } } },
      },
    }),
    method: "POST",
  }).then((response) => response.json());

export const on = async ({ deviceId, token, url }) =>
  fetch(`${url}?token=${token}`, {
    body: JSON.stringify({
      method: "passthrough",
      params: {
        deviceId: deviceId,
        requestData: { system: { set_relay_state: { state: 1 } } },
      },
    }),
    method: "POST",
  }).then((response) => response.json());

export const state = async ({ deviceId, token, url }) =>
  fetch(`${url}?token=${token}`, {
    body: JSON.stringify({
      method: "passthrough",
      params: {
        deviceId: deviceId,
        requestData: {
          system: { get_sysinfo: null },
          emeter: { get_realtime: null },
        },
      },
    }),
    method: "POST",
  })
    .then((response) => response.json())
    .then((response) =>
      !response.error_code
        ? response.result.responseData.system.get_sysinfo.relay_state
        : response
    );

export const toggle = async ({ deviceId, token, url }) =>
  fetch(`${url}?token=${token}`, {
    body: JSON.stringify({
      method: "passthrough",
      params: {
        deviceId: deviceId,
        requestData: {
          system: {
            set_relay_state: {
              state: !(await state({ deviceId, token, url })),
            },
          },
        },
      },
    }),
    method: "POST",
  }).then((response) => response.json());
