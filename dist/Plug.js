export const off = async ({ id, token, url }) => fetch(`${url}?token=${token}`, {
    body: JSON.stringify({
        method: "passthrough",
        params: {
            deviceId: id,
            requestData: { system: { set_relay_state: { state: 0 } } },
        },
    }),
    method: "POST",
}).then((response) => response.json());
export const on = async ({ id, token, url }) => fetch(`${url}?token=${token}`, {
    body: JSON.stringify({
        method: "passthrough",
        params: {
            deviceId: id,
            requestData: { system: { set_relay_state: { state: 1 } } },
        },
    }),
    method: "POST",
}).then((response) => response.json());
export const state = async ({ id, token, url }) => fetch(`${url}?token=${token}`, {
    body: JSON.stringify({
        method: "passthrough",
        params: {
            deviceId: id,
            requestData: {
                system: { get_sysinfo: null },
                emeter: { get_realtime: null },
            },
        },
    }),
    method: "POST",
})
    .then((response) => response.json())
    .then((response) => !response.error_code
    ? response.result.responseData.system.get_sysinfo.relay_state
    : response);
export const toggle = async ({ id, token, url }) => fetch(`${url}?token=${token}`, {
    body: JSON.stringify({
        method: "passthrough",
        params: {
            deviceId: id,
            requestData: {
                system: {
                    set_relay_state: {
                        state: !(await state({ id, token, url })),
                    },
                },
            },
        },
    }),
    method: "POST",
})
    .then((response) => response.json())
    .then((response) => !response.error_code
    ? response.result
    : response);
