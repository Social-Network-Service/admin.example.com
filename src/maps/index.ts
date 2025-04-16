export const StatusMap = {
    "0": {
        text: "停用",
        status: "error"
    },
    "1": {
        text: "启用",
        status: "success"
    }
};

export const StatusList = Object.entries(StatusMap).map(([key, value]) => {
    return {
        label: value.text,
        value: key,
    }
})