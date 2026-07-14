import { createPinia, setActivePinia } from 'pinia'

// App IIFE 构建时组件静态 import 会提前执行 <script setup> 中的 useStore()，
// 预初始化 Pinia 实例确保这些调用不会报错
const preinitPinia = createPinia()
setActivePinia(preinitPinia)

export { preinitPinia }
