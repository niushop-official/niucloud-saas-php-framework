<template>
	<view class="contact-wrap">
		<slot></slot>
		<button
				type="default"
				hover-class="none"
				open-type="contact"
				class="contact-button"
				@click="contactService"
				:send-message-title="props.sendMessageTitle"
				:send-message-path="props.sendMessagePath"
				:send-message-img="props.sendMessageImg"
				:show-message-card="true">
		</button>

		<u-popup :show="popupShow" @close="popupShow = false" mode="center" :round="5" :safeAreaInsetBottom="false">
			<view @touchmove.prevent.stop>
				<view class="py-[25rpx] text-sm leading-none border-0 border-solid border-b-[2rpx] border-[#eee] flex items-center justify-between">
					<text class="ml-[30rpx]">联系客服</text>
					<text class="mr-[20rpx] nc-iconfont nc-icon-guanbiV6xx text-[35rpx]" @click="popupShow = false"></text>
				</view>
				<view class="px-6 py-3 w-[480rpx] h-[100rpx] text-sm" v-if="siteInfo && siteInfo.phone">
					<view class="mb-[10rpx]">客服电话</view>
					<view @click="callPhone" class="text-primary truncate">{{ siteInfo.phone }}</view>
				</view>
				<view class="px-6 py-3 w-[480rpx] h-[100rpx] leading-[100rpx] text-sm" v-else>抱歉，商家暂无客服，请线下联系</view>
				<button @click="popupShow = false" class="!mx-[30rpx] !mb-[40rpx] !w-auto !h-[70rpx] text-[24rpx] leading-[70rpx] rounded-full text-white !bg-[#ff4500] !text-[#fff]">
					我知道了
				</button>
			</view>
		</u-popup>
	</view>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue'
    import useSystemStore from '@/stores/system'

    const props = defineProps({
        sendMessageTitle: {
            type: String,
            default: ''
        },
        sendMessagePath: {
            type: String,
            default: ''
        },
        sendMessageImg: {
            type: String,
            default: ''
        }
    })

    const systemStore = useSystemStore()

    const siteInfo:any = computed(() => {
        return systemStore.site;
    })

    const popupShow = ref(false);

    const contactService = () => {
        // #ifdef H5
        popupShow.value = true;
        // #endif
    }

    // 联系客服电话
    const callPhone = () => {
        uni.makePhoneCall({
            phoneNumber: siteInfo.value.phone
        });
    }

    defineExpose({})
</script>

<style lang="scss" scoped>
	.contact-wrap {
		width: 100%;
		height: 100%;
		position: relative;

		.contact-button {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 5;
			padding: 0;
			margin: 0;
			opacity: 0;
			overflow: hidden;
		}
	}

</style>
