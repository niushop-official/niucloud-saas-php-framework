<template>
    <!--应用管理-->
    <div class="main-container" v-loading="loading">
        <el-card class="box-card !border-none" shadow="never">

            <template v-if="Object.keys(appList).length">

                <template v-for="(item, index) in appList" :key="index + 'b'">
                    <div class="app-group" v-if="item.list.length">
                        <div class="app-group-title">{{ item.title }}</div>

                        <div class="app-grid">
                            <div class="app-card" v-for="(childItem, childIndex) in item.list" :key="childIndex" @click="toLink(childItem)">
                                <div class="app-card-head">
                                    <div class="app-card-avatar">
                                        <el-image class="w-full h-full" :src="img(childItem.icon)" fit="contain">
                                            <template #error>
                                                <img class="w-full h-full" src="@/app/assets/images/index/app_default.png" />
                                            </template>
                                        </el-image>
                                    </div>
                                    <div class="app-card-info">
                                        <div class="app-card-name">{{ childItem.title }}</div>
                                    </div>
                                </div>

                                <p class="app-card-desc">{{ childItem.desc }}</p>
                            </div>
                        </div>
                    </div>
                </template>
            </template>

            <div class="empty flex items-center justify-center" v-if="!loading && !Object.keys(appList).length">
                <el-empty :description="t('emptyAppData')" />
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getSiteAddons, getShowApp } from '@/app/api/site'
import { img } from '@/utils/common'
import useUserStore from '@/stores/modules/user'
import { useRouter } from 'vue-router'
import { t } from '@/lang'
import storage from '@/utils/storage'

const addonIndexRoute = useUserStore().addonIndexRoute
const router = useRouter()
const appList = ref<Record<string, any>[]>([])

const loading = ref(true)
const getAppList = async () => {
    // const res = await getSiteAddons()
    // appList.value = res.data
    // loading.value = false

    const res = await getShowApp()
    appList.value = res.data
    loading.value = false
}
getAppList()

const toLink = (item: any) => {
    if (item.url) {
        // 判断如果携带is_target=true就通过新窗口打开
        if (item.url.indexOf('is_target=true') != -1) {
            const url = router.resolve(item.url)
            window.open(url.href)
        } else {
            router.push(item.url)
        }
    } else {
        addonIndexRoute[item.key] && router.push({ name: addonIndexRoute[item.key] })
    }
    storage.set({ key: 'activeAppKey', data: item.key })
}
</script>

<style lang="scss" scoped>
/* 分组：与首页站点模块保持一致的节奏 */
.app-group + .app-group {
    margin-top: var(--space-6);
}

.app-group-title {
    margin-bottom: var(--space-4);
    color: var(--sys-color-text-primary);
    font-size: var(--sys-font-size-md);
    font-weight: var(--sys-font-weight-semibold);
}

.app-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(264px, 1fr));
    gap: var(--cmp-module-card-gap);
    padding-bottom: var(--space-4);
}

/* 可点击模块卡片：应用入口，与首页站点卡片共用同一套 Token */
.app-card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--cmp-module-card-gap);
    overflow: hidden;
    padding: var(--cmp-module-card-padding);
    background-color: var(--cmp-module-card-bg);
    border: var(--cmp-module-card-border-width) solid var(--cmp-module-card-border-color);
    border-radius: var(--cmp-module-card-radius);
    color: var(--cmp-module-card-text);
    cursor: pointer;
    transition: border-color .2s, box-shadow .2s, transform .2s;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: var(--cmp-module-card-accent-height);
        background: linear-gradient(90deg, var(--cmp-module-card-accent-start), var(--cmp-module-card-accent-end));
        opacity: 0;
        transition: opacity .3s;
    }

    &:hover {
        border-color: var(--cmp-module-card-hover-border-color);
        box-shadow: var(--cmp-module-card-hover-shadow);
        transform: translateY(var(--cmp-module-card-hover-offset));

        &::before {
            opacity: 1;
        }
    }
}

.app-card-head {
    display: flex;
    align-items: center;
    gap: var(--space-3);
}

.app-card-avatar {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    overflow: hidden;
    border: 1px solid var(--sys-color-border-light);
    border-radius: var(--sys-radius-md);
    background-color: var(--sys-color-fill-light);

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.app-card-info {
    flex: 1;
    min-width: 0;
}

.app-card-name {
    overflow: hidden;
    color: var(--sys-color-text-primary);
    font-size: var(--sys-font-size-md);
    font-weight: var(--sys-font-weight-semibold);
    text-overflow: ellipsis;
    white-space: nowrap;
}

.app-card-desc {
    overflow: hidden;
    color: var(--sys-color-text-secondary);
    font-size: var(--sys-font-size-xs);
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
