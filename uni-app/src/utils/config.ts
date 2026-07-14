// H5 优先读取外挂 config.js 的 window.__ENV__，小程序/App 使用 import.meta.env
const isH5 = typeof window !== 'undefined'
const h5Env = isH5 ? (window.__ENV__ || {}) : {}

export default {
    // #ifdef H5
    VITE_APP_BASE_URL: h5Env.VITE_APP_BASE_URL || import.meta.env.VITE_APP_BASE_URL || "",
    VITE_IMG_DOMAIN: h5Env.VITE_IMG_DOMAIN || import.meta.env.VITE_IMG_DOMAIN || "",
    VITE_SITE_ID: h5Env.VITE_SITE_ID || import.meta.env.VITE_SITE_ID || "",
    VITE_REQUEST_STORAGE_TOKEN_KEY: h5Env.VITE_REQUEST_STORAGE_TOKEN_KEY || import.meta.env.VITE_REQUEST_STORAGE_TOKEN_KEY || "wapToken",
    VITE_REQUEST_HEADER_TOKEN_KEY: h5Env.VITE_REQUEST_HEADER_TOKEN_KEY || import.meta.env.VITE_REQUEST_HEADER_TOKEN_KEY || "token",
    VITE_REQUEST_HEADER_SITEID_KEY: h5Env.VITE_REQUEST_HEADER_SITEID_KEY || import.meta.env.VITE_REQUEST_HEADER_SITEID_KEY || "site-id",
    VITE_REQUEST_HEADER_CHANNEL_KEY: h5Env.VITE_REQUEST_HEADER_CHANNEL_KEY || import.meta.env.VITE_REQUEST_HEADER_CHANNEL_KEY || "channel",
    VITE_APP_VERSION: h5Env.VITE_APP_VERSION || import.meta.env.VITE_APP_VERSION || "1.0.1"
    // #endif
    // #ifndef H5
    VITE_APP_BASE_URL: import.meta.env.VITE_APP_BASE_URL || "",
    VITE_IMG_DOMAIN: import.meta.env.VITE_IMG_DOMAIN || "",
    VITE_SITE_ID: import.meta.env.VITE_SITE_ID || "",
    VITE_REQUEST_STORAGE_TOKEN_KEY: import.meta.env.VITE_REQUEST_STORAGE_TOKEN_KEY || "wapToken",
    VITE_REQUEST_HEADER_TOKEN_KEY: import.meta.env.VITE_REQUEST_HEADER_TOKEN_KEY || "token",
    VITE_REQUEST_HEADER_SITEID_KEY: import.meta.env.VITE_REQUEST_HEADER_SITEID_KEY || "site-id",
    VITE_REQUEST_HEADER_CHANNEL_KEY: import.meta.env.VITE_REQUEST_HEADER_CHANNEL_KEY || "channel",
    VITE_APP_VERSION: import.meta.env.VITE_APP_VERSION || "1.0.1"
    // #endif
}
