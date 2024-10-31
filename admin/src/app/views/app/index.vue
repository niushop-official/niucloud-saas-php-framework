<template>
    <!--应用管理-->
    <div class="main-container" v-loading="loading">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">应用管理</span>
            </div>

            <div class="flex flex-wrap plug-list pb-10 plug-large" v-if="appList.length">
                <div  v-for="(item, index) in appList" :key="index + 'b'" class="cursor-pointer mt-[20px] mr-4 bg-[#f7f7f7]"  @click="toLink(item.key)">
                    <el-tooltip class="box-item" effect="light" placement="top">
                        <template #content>
                            <div class="max-w-[250px]">{{item.desc}}</div>
                        </template>
                        <div class="w-[264px] flex py-[20px] px-[17px] app-item relative">
                            <el-image class="w-[40px] h-[40px] mr-[10px]" :src="img(item.icon)" fit="contain">
                                <template #error>
                                    <div class="image-slot">
                                        <img class="w-[40px] h-[40px]" src="@/app/assets/images/index/app_default.png" />
                                    </div>
                                </template>
                            </el-image>
                            <div class="flex flex-col justify-between w-[180px]">
                                <div class="text-[14px] flex items-center">
                                    <span class="app-text max-w-[170px]">{{ item.title }}</span>
                                    <span class="iconfont iconxiaochengxu2 text-[#00b240] ml-[4px] !text-[14px]"></span>
                                </div>
                                    <!-- <el-icon color="#666">
                                        <QuestionFilled />
                                    </el-icon> -->
                                <p class="app-text text-[12px] text-[#999]">{{item.desc}}</p>
                            </div>
                        </div>
                    </el-tooltip>
                </div>
            </div>

            <div class="empty flex items-center justify-center" v-if="!loading && !appList.length">
                <el-empty :description="t('emptyAppData')" />
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getSiteAddons } from '@/app/api/site'
import { img } from '@/utils/common'
import useUserStore from '@/stores/modules/user'
import { useRouter } from 'vue-router'
import { t } from '@/lang'

const addonIndexRoute = useUserStore().addonIndexRoute
const router = useRouter()
const appList = ref<Record<string, any>[]>([])

const loading = ref(true)
const getAppList = async () => {
    const res = await getSiteAddons()
    appList.value = res.data
    loading.value = false
}
getAppList()

const toLink = (addon: string) => {
    addonIndexRoute[addon] && router.push({ name: addonIndexRoute[addon] })
}
</script>

<style lang="scss" scoped>
    .app-text {
        overflow: hidden;
        /* 超出部分隐藏 */
        white-space: nowrap;
        /* 禁止文本换行 */
        text-overflow: ellipsis;
        /* 显示省略号 */
    }
    .app-item:hover{
        transition: 0.5s;
        box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.1);
    }
</style>
