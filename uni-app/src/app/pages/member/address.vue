<template>
    <view class="address bg-[var(--page-bg-color)] min-h-[100vh]" v-if="!loading" :style="themeColor()">
        <scroll-view scroll-y="true">
			<view class="sidebar-marign pt-[var(--top-m)]" v-if="addressList.length">
				<u-swipe-action>
						<view class="mb-[var(--top-m)] card-template" v-for="(item, key) in addressList">
							<u-swipe-action-item :options="addressOptions" @click="swipeClick(key)">
								<view class="flex items-center">
									<view class="flex-1 line-feed mr-[20rpx]" @click="selectAddress(item)">
										<view class="flex items-center">
											<view class="text-[#333] text-[30rpx] leading-[34rpx] font-500">{{ item.name }}</view>
											<text class="text-[#333] text-[30rpx] ml-[10rpx]">{{ mobileHide(item.mobile) }}</text>
											<view v-if="item.is_default == 1" class="bg-primary-light !text-[var(--primary-color)] border-[2rpx] border-solid border-[var(--primary-color)] !text-[22rpx] px-[10rpx] h-[36rpx] ml-[10rpx] tag-item">{{ t('default') }}</view>
										</view>
										<view class="mt-[16rpx] text-[26rpx] line-feed text-[var(--text-color-light9)] leading-[1.4]">{{ item.full_address }}</view>
									</view>
									<text class="nc-iconfont nc-icon-xiugaiV6xx shrink-0 text-[32rpx]" @click="editAddress(item.id)"></text>
								</view>
							</u-swipe-action-item>
						</view>	
				</u-swipe-action>
			</view>
			<mescroll-empty v-if="!addressList.length" :option="{tip : '暂无收货地址'}"></mescroll-empty>
			<view class="w-full footer">
				<view class="py-[30rpx] px-[var(--sidebar-m)] footer w-full fixed bottom-0 left-0 right-0 box-border">
					<button hover-class="none" class="primary-btn-bg text-[#fff] h-[80rpx] leading-[80rpx] rounded-[100rpx] text-[26rpx] font-500" @click="addAddress">{{t('createAddress')}}</button>
				</view>
			</view>
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { onLoad } from '@dcloudio/uni-app'
    import { redirect, img, mobileHide } from '@/utils/common'
    import { getAddressList, deleteAddress } from '@/app/api/member'
    import { t } from '@/locale'
    import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';

    const loading = ref(true)
    const current = ref(0)
    const addressList = ref<object[]>([])
    const locationAddressList = ref<object[]>([])
    const type = ref('')
    const source = ref('')

    onLoad((data: any) => {
        type.value = data.type || ''
        source.value = data.source || ''
        if (data.type) current.value = data.type == 'address' ? 0 : 1
		// 清空缓存，防止受待支付界面影响
		if(uni.getStorageSync('selectAddressCallback')){uni.removeStorage({ key: 'selectAddressCallback' })}
    })

    getAddressList({}).then(({ data }) => {
        const address: any = [], locationAddress: any = []
        data.forEach((item: any) => {
            item.type == 'address' ? address.push(item) : locationAddress.push(item)
        })
		if(!source.value){ //地址管理使用
			addressList.value = data;
		}else{ // 区分同城配送地址和快递地址
			addressList.value = current.value == 0 ? address : locationAddress;
		}
        loading.value = false
    }).catch(() => {
        loading.value = false
    })

    const addAddress = ()=> {
        const url = `/app/pages/member/address_edit`
        redirect({ url, param: { source : source.value } })
    }

    const editAddress = (id: number)=> {
        const url = `/app/pages/member/address_edit`
        redirect({ url, param: { id, source : source.value} })
    }

    const addressOptions = ref([
        {
            text: t('delete'),
            style: {
                backgroundColor: '#F56C6C'
            }
        }
    ])

    const selectAddress = (data: any) => {
        const selectAddress = uni.getStorageSync('selectAddressCallback')
        if (selectAddress) {
            selectAddress.address_id = data.id

            uni.setStorage({
                key: 'selectAddressCallback',
                data: selectAddress,
                success() {
                    redirect({url: selectAddress.back, mode: 'redirectTo'})
                }
            })
        }
    }

    const swipeClick = (index: any) => {
        const list = current.value ? locationAddressList : addressList
        const data: any = list.value[index]

        deleteAddress(data.id).then(() => {
            list.value.splice(index, 1)
        }).catch()
    }
	
</script>

<style lang="scss" scoped>
    :deep(.u-tabs__wrapper__nav__line) {
        bottom: 0;
        background: var(--primary-color) !important;
    }
    .line-feed{
        word-wrap:break-word;
        word-break: break-all;
    }
	:deep(.u-swipe-action-item__right__button__wrapper__text.u-line-1){
		font-size: 24rpx !important;
		
	}
	:deep(.u-swipe-action-item__right__button__wrapper){
	    padding:0 10rpx !important;
	}
	.footer{
		height: calc(100rpx + var(--top-m) + var(--top-m) + constant(safe-area-inset-bottom)) !important;
		height: calc(100rpx + var(--top-m) + var(--top-m) + env(safe-area-inset-bottom)) !important;
	}
</style>
