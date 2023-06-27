const SessionStore = {};
const CONFIG = {
    key: "koa.sess",
    maxAge: 86400000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
    secure: false,
    sameSite: null,
    store: {
        get: (key) => {
            return SessionStore[key];
        },
        set: (key, value, maxAge) => {
            //存储在Node.js内存中
            SessionStore[key] = value;
        },
        destroy: () => {
            SessionStore[key] = null;
        },
    },
};
module.exports = {
    CONFIG
}