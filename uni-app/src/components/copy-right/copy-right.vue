<template>
    <view>
        <template v-if="diyStore.mode == 'decorate'">
            <view class="flex flex-col justify-center items-center p-[30rpx] text-[22rpx]" :style="{ color:textColor}">
                示例版权信息
            </view>
        </template>
        <tempalte v-else>
            <view class="flex flex-col justify-center items-center p-[30rpx]" :style="{ color:textColor}">
                <img :src="img(systemStore.copyright.logo)" mode="heightFix" class="max-h-[60rpx]" v-if="systemStore.copyright?.logo" />
                <view class="text-[22rpx] mt-[20rpx]" v-if="systemStore.copyright?.copyright_desc" @click="systemStore.copyright?.copyright_link && redirect({ url: systemStore.copyright.copyright_link})">
                    {{ systemStore.copyright.copyright_desc }}
                </view>
                <view class="text-[22rpx] mt-[20rpx]" v-if="systemStore.copyright?.icp">
                    备案号：{{ systemStore.copyright.icp }}
                </view>
                <view class="text-[22rpx] mt-[20rpx] flex items-center" v-if="systemStore.copyright?.gov_record" @click="systemStore.copyright?.gov_url && redirect({ url: systemStore.copyright.gov_url})">
                    <img :src="img('static/resource/images/copy_right.png')" mode="heightFix" class="w-[28rpx] h-[28rpx] mr-[10rpx]" />
                    {{ systemStore.copyright.gov_record }}
                </view>
            </view>
        </tempalte>
    </view>
</template>

<script setup lang="ts"> 
import { ref, nextTick } from 'vue'
import { redirect,img } from '@/utils/common'
import useSystemStore from '@/stores/system';
const systemStore = useSystemStore()
import useDiyStore from '@/app/stores/diy';

const diyStore = useDiyStore();

const prop = defineProps({
    textColor: {
        type: String,
        default: '#ccc'
    },
})

</script>

<style scoped lang="scss">

</style>