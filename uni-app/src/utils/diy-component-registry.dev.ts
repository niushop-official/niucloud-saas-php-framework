import type { DiyComponentMeta } from './diy-component-types'

let registryMap: Map<string, DiyComponentMeta> | null = null

function kebabToPascal(folder: string) {
    return folder
        .split('-')
        .map((s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : ''))
        .join('')
}

function buildFromGlob(): Map<string, DiyComponentMeta> {
    const map = new Map<string, DiyComponentMeta>()

    const appGlobs = import.meta.glob('../app/components/diy/*/index.vue', { eager: false })
    for (const key of Object.keys(appGlobs)) {
        const m = key.match(/\/app\/components\/diy\/([^/]+)\/index\.vue$/)
        if (!m || m[1] === 'group') continue
        const folder = m[1]
        const vueComponentName = kebabToPascal(folder)
        map.set(vueComponentName, {
            vueComponentName,
            scope: 'app',
            folder,
            scrollBool: vueComponentName === 'CarouselSearch',
            formRef: vueComponentName.startsWith('Form') && vueComponentName !== 'FormSubmit'
        })
    }

    const addonGlobs = import.meta.glob('../addon/*/components/diy/*/index.vue', { eager: false })
    for (const key of Object.keys(addonGlobs)) {
        const m = key.match(/\/addon\/([^/]+)\/components\/diy\/([^/]+)\/index\.vue$/)
        if (!m) continue
        const vueComponentName = kebabToPascal(m[2])
        map.set(vueComponentName, {
            vueComponentName,
            scope: 'addon',
            addonKey: m[1],
            folder: m[2],
            scrollBool: true,
            formRef: true
        })
    }

    return map
}

function getRegistryMap() {
    if (!registryMap) {
        registryMap = buildFromGlob()
    }
    return registryMap
}

export function resolveDiyMeta(componentName: string): DiyComponentMeta | null {
    if (!componentName) return null
    return getRegistryMap().get(componentName) ?? null
}

export function listDiyComponentNames() {
    return [...getRegistryMap().keys()]
}
