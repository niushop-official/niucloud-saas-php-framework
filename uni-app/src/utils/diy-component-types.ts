export interface DiyComponentMeta {
    vueComponentName: string
    scope: 'app' | 'addon'
    folder: string
    addonKey?: string
    scrollBool?: boolean
    formRef?: boolean
}
