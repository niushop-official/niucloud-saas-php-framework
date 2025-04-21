<template>
    <view class="bg-[#f8f8f8] min-h-screen overflow-hidden" :style="themeColor()">
        <mescroll-body ref="mescrollRef" top="20rpx" @init="mescrollInit" :down="{ use: false }" @up="geVerifyRecordFn">
        	<view class="goods-wrap" v-if="list.length">
        		<template v-for="(item,index) in list"	:key="index">
        			<view class="goods-item" @click="toLink(item)">
        				<view class="goods-content flex">
        					<view class="w-[180rpx] mr-3 overflow-hidden rounded leading-none">
        					    <image :src="img(item.member_card_item.cover_thumb_small)" mode="widthFix" class="w-full h-[auto] leading-none" />
        					</view>
        					<view class="flex-1 w-0">
        					    <view class="font-bold truncate text-sm">{{ item.member_card_item.goods_name }}</view>
                      <view class="flex justify-between text-xs mt-2 text-gray-400">
                          <view>{{ t('createTime') }}：{{ item.create_time }}</view>
                      </view>
                      <view class="flex justify-between text-xs mt-1 text-gray-400">
                          <view>{{ t('verifyCode') }}：{{ item.verify_code }}</view>
                      </view>
        					    <view class="flex justify-between text-xs mt-1 text-gray-400">
                          <view>{{ t('verifyNum') }}：{{ item.num }}</view>
        					    </view>
        					</view>
        				</view>
        			</view>
        		</template>
        	</view>
            <mescroll-empty :option="{'icon': img('static/resource/images/empty.png')}" v-if="!list.length && loading"></mescroll-empty>
        </mescroll-body>
    </view>
</template>

<script setup lang="ts">
    import { ref, reactive, computed } from 'vue'
    import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue'
    import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue'
    import useMescroll from '@/components/mescroll/hooks/useMescroll.js'
    import { onPageScroll, onReachBottom } from '@dcloudio/uni-app'
    import { getVerifyRecord } from '@/addon/vipcard/api/vipcard'
    import { img, redirect } from '@/utils/common'
    import { t } from '@/locale'

    let list = ref<Array<Object>>([])
    let loading = ref<boolean>(false)
    const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom)

    const geVerifyRecordFn = (mescroll) => {
    	loading.value = false;
    	let data : object = {
    		page: mescroll.num,
    		limit: mescroll.size,
    	};

    	getVerifyRecord(data).then((res) => {
    		let newArr = (res.data.data as Array<Object>);
    		//设置列表数据
    		if (mescroll.num == 1) {
    			list.value = []; //如果是第一页需手动制空列表
    		}
    		list.value = list.value.concat(newArr);
    		mescroll.endSuccess(newArr.length);
    		loading.value = true;
    	}).catch(() => {
    		loading.value = true;
    		mescroll.endErr(); // 请求失败, 结束加载
    	})
    }

    const toLink = (data: AnyObject)=> {
        redirect({ url: '/addon/vipcard/pages/verify/detail', param: { id: data.id } })
    }
</script>

<style lang="scss" scoped>
    .font-scale{
    	transform: scale(0.75);
    }
    .text-color{
    	color: $u-primary;
    }
    .bg-color{
    	background-color: $u-primary;
    }

    .goods-wrap{
    	margin: 20rpx 20rpx 0;
    	.goods-item{
    		@apply w-full flex flex-col mb-3 bg-[#fff] py-3 px-4 box-border;
    		border-radius: 18rpx;
    		overflow: hidden;
    		.goods-head{
    			@apply flex justify-between pb-3 border-0 border-b-1 border-solid border-[#F0F0F0] mb-4;
    			font-size: 26rpx;
    			color: #666;
    		}
    	}
    }
</style>
