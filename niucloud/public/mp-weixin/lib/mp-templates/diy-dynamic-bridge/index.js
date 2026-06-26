const registry = require('./diy-registry.merged.js')

Component({
    options: {
        virtualHost: true,
        styleIsolation: 'shared'
    },
    properties: {
        componentName: { type: String, value: '' },
        component: { type: Object, value: null },
        global: { type: Object, value: null },
        index: { type: Number, value: 0 },
        scrollBool: { type: Number, value: 0 }
    },
    data: {
        routeBridge: 'app'
    },
    lifetimes: {
        attached() {
            this.syncRouteBridge(this.properties.componentName)
        }
    },
    observers: {
        componentName(name) {
            this.syncRouteBridge(name)
        }
    },
    methods: {
        syncRouteBridge(name) {
            const meta = registry[name]
            const route = meta && meta.addonKey ? meta.addonKey : 'app'
            if (route !== this.data.routeBridge) {
                this.setData({ routeBridge: route })
            }
        },
        forwardShow(e) {
            this.triggerEvent('updateComponentIsShow', e.detail)
        },
        forwardLoading(e) {
            this.triggerEvent('loadingFn', e.detail)
        },
        getInnerRef() {
            const id = `#bridge-${this.data.routeBridge}`
            const child = this.selectComponent(id)
            if (child && typeof child.getInnerRef === 'function') {
                return child.getInnerRef()
            }
            return null
        }
    }
})
