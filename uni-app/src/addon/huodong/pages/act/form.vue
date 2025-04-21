<template>
	<view :style="themeColor()">

		<loading-page :loading="diy.getLoading()"></loading-page>

		<view v-show="requestData.status == 1 && requestData.error && requestData.error.length === 0 && !diy.getLoading()">

			<!-- 自定义模板渲染 -->
			<view class="diy-template-wrap bg-index" :style="diy.pageStyle()">
				
<view v-if="info" :class="['bg-white flex align-center p-[10px]']  " @click="toLink(info.id)" style="margin-bottom:20rpx">
			<u--image width="220rpx" height="220rpx" class="mr-[10px]" v-if="info.image" :src="img(info.image)"
				model="aspectFill" :border-radius="20">
			</u--image>
			<view class="flex-1 flex flex-col justify-between  ">
				<view class="text-[16px] leading-[1.3] multi-hidden mt-[2px]" style="font-weight: bold;">{{info.name}}
				</view>
				<view class="text-[14px]  mb-[10px] mt-[10px] text-gray-500 ">
					<!-- <text class="catename">{{item.cate_id_name}}</text> -->
					<text
						style="background:#ff9900;color:#fff;font-size:10px;padding:8rpx 10rpx;border-radius: 5rpx;">{{info.cate_id_name}}</text>

				</view>
				<view class="text-[12px]  flex justify-between mb-[5px]">
					<text>活动地址: {{info.address}}</text>
				</view>
				<view class="text-[12px]  flex justify-between mb-[5px]">
					<text>活动开始时间: {{info.startime}}</text>
				</view>
				<view class="text-[12px]  flex justify-between mb-[5px]">
					<text>活动结束时间: {{info.endtime}}</text>
				</view>
			</view>
		</view>
				<diy-group ref="diyGroupRef" :data="diy.data" />
			</view>

		</view>
		<view class="w-screen h-screen flex flex-col " v-if="requestData.error && requestData.error.length > 0">
		    <view class="flex-1 flex flex-col items-center pt-[180rpx] px-[60rpx]" v-for="(item, index) in requestData.error.slice(0, 1)" :key="index">
				<text class="nc-iconfont nc-icon-tanhaoV6mm text-[#ccc] mb-[30rpx] !text-[100rpx]"></text>
				<view class="text-[38rpx] font-bold mt-3">{{item.title}}</view>
		        <view class="p-[30rpx] mt-10 w-full ">
		        	<view class="flex w-full">
		        		<view class="w-[30%] text-[#999] text-left">{{item.type}}</view>
		        		<view class="w-[70%] text-left">{{item.desc}}</view>
		        	</view>
		        </view>
		    </view>
			<view class="pb-[260rpx]" >
				<button class="w-[380rpx] !border-0 h-[80rpx] text-[28rpx] text-[#333] !bg-[#f2f2f2] flex-center font-500 rounded-[20rpx]" :plain="true" @click="finishFn">关闭</button>
			</view>
		</view>

		<!-- #ifdef MP-WEIXIN -->
		<!-- 小程序隐私协议 -->
		<wx-privacy-popup ref="wxPrivacyPopupRef"></wx-privacy-popup>
		<!-- #endif -->

	</view>
</template>

<script setup lang="ts">
	//活动报名组件
	import { getPayInfo } from '@/app/api/pay'
	import { getDetail } from '@/addon/huodong/api/act'
	import { SubmitOrder } from '@/addon/huodong/api/order'
	const payInfo = ref<any>({
		trade_type: '',
		trade_id: ''
	})
	const payRef = ref()
	const info = ref('')
	
	
    import {ref,nextTick,computed} from 'vue';
    import {useDiyForm} from '@/addon/huodong/hooks/useDiyForm'
    import {useShare} from '@/hooks/useShare'
	import { img,redirect} from '@/utils/common';
    import diyGroup from '@/addon/huodong/components/mydiy/group/index.vue'
    import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';

    const {setShare} = useShare()

    const diy = useDiyForm({
	    needLogin: true // 检测登录
    })

    const diyGroupRef = ref(null)

    const wxPrivacyPopupRef:any = ref(null)

    const requestData = computed(()=>{
    	return diy.requestData;
    })

	const finishFn = () => {
		redirect({
			url: '/app/pages/index/index',
			mode: 'reLaunch'
		});
	}

    diy.onLoad((data:any)=>{ 
	    let share = data.share ? data.share : null;
	    setShare(share);
	    diyGroupRef.value?.refresh();
	    // #ifdef MP
	    nextTick(()=>{
		    if(wxPrivacyPopupRef.value) wxPrivacyPopupRef.value.proactive();
	    })
	    // #endif
		
		//活动报名 2025年2月15日 10:28:04
		var act_id = uni.getStorageSync('huodong_act_id');
		const getinfo = () => {
			getDetail({ id: act_id }).then((res : any) => {
				info.value = res.data
			}).catch(() => {
			})
		}
		getinfo()
    });

    // 监听页面显示
    diy.onShow((data: any) => {
	    let share = data.share ? data.share : null;
	    if(share) {
		    setShare(share);
	    }
	    diyGroupRef.value?.refresh();
	    // #ifdef MP
	    nextTick(()=>{
		    if(wxPrivacyPopupRef.value) wxPrivacyPopupRef.value.proactive();
	    })
	    // #endif
    });

    // 监听页面隐藏
    diy.onHide();

	// 监听页面卸载
	diy.onUnload();

    // 监听滚动事件
    diy.onPageScroll()
</script>
<style lang="scss" scoped>
	@import '@/styles/diy.scss';
</style>
<style lang="scss">
    .diy-template-wrap {
        /* #ifdef MP */
        .child-diy-template-wrap {
            ::v-deep .diy-group {
                > .draggable-element.top-fixed-diy {
                    display: block !important;
                }
            }
        }
        /* #endif */
    }
</style>
