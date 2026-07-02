// 优先读取外挂 window.__ENV__，部署后可直接修改，无需重编译
const env = (typeof window !== 'undefined' ? (window as any).__ENV__ : null) || {}

// import.meta.env 在 lib 构建模式下可能不被替换，此处确保每一行都有硬编码兜底
const APP_BASE_URL = env.VITE_APP_BASE_URL || import.meta.env.VITE_APP_BASE_URL || '/adminapi/'
const IMG_DOMAIN = env.VITE_IMG_DOMAIN || import.meta.env.VITE_IMG_DOMAIN || ''
const HEADER_TOKEN_KEY = env.VITE_REQUEST_HEADER_TOKEN_KEY || import.meta.env.VITE_REQUEST_HEADER_TOKEN_KEY || 'token'
const HEADER_SITEID_KEY = env.VITE_REQUEST_HEADER_SITEID_KEY || import.meta.env.VITE_REQUEST_HEADER_SITEID_KEY || 'site-id'
const DEFAULT_TITLE = env.VITE_DETAULT_TITLE || import.meta.env.VITE_DETAULT_TITLE || ''

export default {
    VITE_APP_BASE_URL: APP_BASE_URL,
    VITE_IMG_DOMAIN: IMG_DOMAIN,
    VITE_REQUEST_HEADER_TOKEN_KEY: HEADER_TOKEN_KEY,
    VITE_REQUEST_HEADER_SITEID_KEY: HEADER_SITEID_KEY,
    VITE_DETAULT_TITLE: DEFAULT_TITLE
}
