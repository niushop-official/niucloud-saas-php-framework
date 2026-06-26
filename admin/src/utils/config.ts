// 优先读取外挂 window.__ENV__，部署后可直接修改，无需重编译
const env = (typeof window !== 'undefined' ? (window as any).__ENV__ : null) || {}

export default {
    VITE_APP_BASE_URL: env.VITE_APP_BASE_URL || import.meta.env.VITE_APP_BASE_URL,
    VITE_IMG_DOMAIN: env.VITE_IMG_DOMAIN || import.meta.env.VITE_IMG_DOMAIN,
    VITE_REQUEST_HEADER_TOKEN_KEY: env.VITE_REQUEST_HEADER_TOKEN_KEY || import.meta.env.VITE_REQUEST_HEADER_TOKEN_KEY || 'token',
    VITE_REQUEST_HEADER_SITEID_KEY: env.VITE_REQUEST_HEADER_SITEID_KEY || import.meta.env.VITE_REQUEST_HEADER_SITEID_KEY || 'site-id',
    VITE_DETAULT_TITLE: env.VITE_DETAULT_TITLE || import.meta.env.VITE_DETAULT_TITLE || ''
}
