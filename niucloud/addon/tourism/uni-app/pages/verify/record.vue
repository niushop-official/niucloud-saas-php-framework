<template>
    <view class="bg-[#f8f8f8] min-h-screen overflow-hidden" :style="themeColor()">
        <mescroll-body ref="mescrollRef" top="20rpx" @init="mescrollInit" :down="{ use: false }" @up="geVerifyRecordFn">
        	<view class="goods-wrap">
        		<template v-for="(item,index) in list"	:key="item.order_id">
        			<view class="goods-item" v-if="item.order_type == 'hotel'" @click="toLink(item)">
        				<view class="goods-head">
        					<text>核销时间：{{ item.verify_time }}</text>
        				</view>
        				<view class="goods-content">
        					<image class="w-[40rpx]" :src="img('addon/tourism/tourism/member/hotel.png')" />
        					<view>
        						<view class="name-wrap">
        							<view class="multi-hidden">{{item.hotel.hotel_name}}</view>
        						</view>
        						<view class="desc">{{item.goods_name}}</view>
        						<view class="desc">{{dateFormat(item.start_time, 'monthDay')}}(入住)-{{dateFormat(item.end_time, 'monthDay')}}(离店){{item.days}}晚上/{{item.num}}间</view>
        					</view>
        				</view>
        			</view>
        			<view class="goods-item" v-if="item.order_type == 'way'" @click="toLink(item)">
        				<view class="goods-head">
        					<text>核销时间：{{ item.verify_time }}</text>
        				</view>
        				<view class="goods-content">
        					<image class="w-[40rpx]" :src="img('addon/tourism/tourism/member/way.png')" />
        					<view>
        						<view class="name-wrap">
        							<view class="multi-hidden">{{item.way.way_name}}</view>
        						</view>
        						<view class="desc">{{item.goods_name}}</view>
        						<view class="desc">{{item.num}}张 {{dateFormat(item.start_time, 'monthDay')}}（出游）</view>
        					</view>
        				</view>
        			</view>
        			<view class="goods-item" v-if="item.order_type == 'scenic'" @click="toLink(item)">
        				<view class="goods-head">
        					<text>核销时间：{{dateFormat(item.start_time, 'yearMonthDayWeek')}}</text>
        				</view>
        				<view class="goods-content">
        					<image class="w-[40rpx]" :src="img('addon/tourism/tourism/member/scenic.png')" />
        					<view>
        						<view class="name-wrap">
        							<view class="multi-hidden">{{item.scenic.scenic_name}}</view>
        						</view>
        						<view class="desc">{{item.num}}人 {{dateFormat(item.start_time, 'yearMonthDay')}}出发（{{item.goods_name}}）</view>
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
    import { getVerifyRecord } from '@/addon/tourism/api/tourism'
    import { img, redirect } from '@/utils/common'

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

    const dateFormat = (res, type)=>{
    	let data;
    	if(res.indexOf('/') != -1){
    		data = res.split("/");
    	}else if(res.indexOf('-') != -1){
    		data = res.split("-");
    	}

    	let time;
    	const index = new Date(res).getDay();
    	const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    	if(type == "yearMonthDay")
    		time = data[0] + '年' + data[1] + '月' + data[2] + '日';
    	else if(type == "yearMonthDayWeek")
    		time = data[0] + '年' + data[1] + '月' + data[2] + '日 ' + week[index];
    	else
    		time = data[1] + '月' + data[2] + '日';

    	return time;
    }

    const toLink = (data: AnyObject)=> {
        redirect({ url: '/addon/tourism/pages/verify/detail', param: { code: data.verify_code } })
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
    		.goods-content{
    			@apply flex;
    			& > image{
    				width: 40rpx;
    				height: 40rpx;
    				margin-right: 30rpx;
    			}
    			& > view{
    				flex: 1;
    			}
    			.name-wrap{
    				display: flex;
    				justify-content: space-between;
    				margin-bottom: 20rpx;
    				&> view{
    					&:first-of-type{
    						font-weight: bold;
    						font-size: 30rpx;
    					}
    				}
    			}
    			.desc{
    				color: #686868;
    				font-size: 26rpx;
    				margin-bottom: 14rpx;
    			}
    			.time-wrap{
    				display: flex;
    				align-items: center;
    				background-color: #F6F7FB;
    				border-radius: 8rpx;
    				height: 62rpx;
    				font-size: 26rpx;
    				padding: 0 16rpx;
    				text{
    					&:nth-child(1){
    						color: #444;
    						margin-right: 14rpx;
    					}
    					&:nth-child(2){
    						color: #686868;
    					}
    					&:nth-child(3){
    						color: #333;
    						font-weight: bold;
    					}
    				}
    			}
    			.btn-wrap{
    				justify-content: flex-end;
    				@apply flex margin-0 mt-2 flex-wrap;
    				button{
    					width: 172rpx;
    					height: 64rpx;
    					font-size: 26rpx;
    					@apply rounded-3xl;
    					line-height: 64rpx;
    					background-color: transparent;
    					margin: 0;
    					margin-left: 20rpx;
    					@apply mt-2;
    					border: 2rpx solid #E2E2E2;
    					&[type="primary"]{
    						background-color: $u-primary;
    					}
    					&::after{
    						border: none;
    					}
    				}
    			}
    		}
    	}
    }
</style>
