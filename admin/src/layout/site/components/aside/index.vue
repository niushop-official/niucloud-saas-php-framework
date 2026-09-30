<template>
    <el-aside class="layout-aside w-auto">
        <side class="hidden-xs-only slide" />
    </el-aside>

    <el-drawer v-model="systemStore.menuDrawer" direction="ltr" :with-header="false" custom-class="aside-drawer layout-default" size="var(--cmp-sidebar-width)">
        <template #default>
            <side />
        </template>
    </el-drawer>
</template>

<script lang="ts" setup>
import { watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import side from './side.vue'
import useSystemStore from '@/stores/modules/system'

const systemStore = useSystemStore()
const dark = computed(() => {
    return systemStore.dark
})

const route = useRoute()
watch(route, () => {
    systemStore.$patch(state => {
        state.menuDrawer = false
    })
})
</script>

<style lang="scss">
.layout-default {
    .layout-aside {
        &.bright {
            background-color: var(--cmp-layout-page-bg);

            li {
                background-color: var(--cmp-layout-page-bg);

                &.is-active:not(.is-opened) {
                    position: relative;
                    color: var(--sys-color-text-primary);
                    background-color: var(--cmp-sidebar-bg);

                    &::after {
                        content: "";
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        width: 2px;
                        background-color: var(--cmp-menu-text-active);
                    }
                }
            }
        }

        .slide {
            border-right: 1px solid var(--cmp-sidebar-border);
        }
    }

    &.aside-drawer {
        .el-drawer__body {
            padding: 0 !important;
        }
    }
}
</style>
