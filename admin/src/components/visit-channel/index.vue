<template>
    <span class="visit-channel inline-flex items-center">
        <el-popover placement="bottom" trigger="hover" :width="360" popper-class="visit-channel-popper" @show="loadChannels">
            <template #reference>
                <i class="iconfont iconicon_huojian1 cursor-pointer" :title="t('visitWap')"></i>
            </template>
            <div v-if="!loaded" class="text-[13px] text-[#999]">加载中</div>
            <div v-else-if="!channels.length" class="text-[13px] text-[#999]">暂无可用链接</div>
            <div v-else>
                <div v-for="(item, index) in channels" :key="item.key" class="visit-channel-item" :class="{ 'is-split': index > 0 }" @click="openLink(item.url)">
                    <div class="flex items-center text-[14px] text-[#333]">
                        <el-icon v-if="item.icon" class="mr-[6px] text-[16px]">
                            <component :is="item.icon" />
                        </el-icon>
                        <span>{{ item.label }}</span>
                    </div>
                    <div class="mt-[6px] text-[13px] text-[#666] break-all">链接：{{ item.url }}</div>
                </div>
            </div>
        </el-popover>
    </span>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Monitor, Iphone } from '@element-plus/icons-vue'
import { t } from '@/lang'
import { getChannel } from '@/app/api/sys'

const channelMeta: Record<string, { label: string, icon: any }> = {
    pc: { label: 'PC端', icon: Monitor },
    h5: { label: 'H5端', icon: Iphone }
}

const loaded = ref(false)
const loading = ref(false)
const channels = ref<{ key: string, label: string, url: string, icon?: any }[]>([])

const loadChannels = () => {
    if (loaded.value || loading.value) return
    loading.value = true
    getChannel().then((res: any) => {
        const list = Array.isArray(res.data) ? res.data : []
        channels.value = list.filter((item: any) => item && item.url).map((item: any) => ({
            key: item.key,
            url: item.url,
            label: channelMeta[item.key]?.label || item.name,
            icon: channelMeta[item.key]?.icon
        }))
        loaded.value = true
    }).catch(() => {
        channels.value = []
    }).finally(() => {
        loading.value = false
    })
}

const openLink = (url: string) => {
    if (!url) return
    window.open(url)
}
</script>

<style lang="scss">
.visit-channel-popper {
    .visit-channel-item {
        cursor: pointer;

        &.is-split {
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px solid #eee;
        }
    }
}
</style>
