import { defineStore } from 'pinia'

export interface ToastState {
    visible: boolean
    title: string
    duration: number
    mask: boolean
    /** 当前页是否挂载了 ns-toast（layout 内） */
    hostCount: number
}

const useToastStore = defineStore('toast', {
    state: (): ToastState => ({
        visible: false,
        title: '',
        duration: 2000,
        mask: false,
        hostCount: 0
    }),
    getters: {
        hasHost: (state) => state.hostCount > 0
    },
    actions: {
        registerHost() {
            this.hostCount += 1
        },
        unregisterHost() {
            this.hostCount = Math.max(0, this.hostCount - 1)
            if (this.hostCount === 0) {
                this.visible = false
                this.title = ''
            }
        },
        show(payload: { title: string; duration?: number; mask?: boolean }) {
            this.title = payload.title || ''
            this.duration = payload.duration ?? 2000
            this.mask = !!payload.mask
            this.visible = true
        },
        hide() {
            this.visible = false
            this.title = ''
            this.mask = false
        }
    }
})

export default useToastStore
