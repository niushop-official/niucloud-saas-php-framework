<template>
	<view class="bg-[#fcfcfa] min-h-screen overflow-hidden pl-2 pr-2">
		<mescroll-body ref="mescrollRef" top="12rpx" @init="mescrollInit" @down="downCallback" @up="getMemberListFn">
			<view class="flex tk-card rounded-[8rpx] justify-between items-center !bg-[#676a4c]">
				<view class="w-[80%]">
					<u-input clearable v-model="keyworld" placeholder="请输入会员昵称" @change="reload()"></u-input>
				</view>
				<view>
					<button @click="redirect({url:'/app/pages/verify/index'})" class="hover:bg-blue-700">
						<u-icon name="scan" color="#6b6b6b" size="38"></u-icon>
					</button>
				</view>
			</view>
			<view v-if="list.length > 0" class="tk-card mb-2" style="margin-top:30rpx;margin-bottom:12rpx"
				v-for="(item, index) in list" :key='index'>
				<view class="flex  justify-between">
					<view class="flex">
						<view class=""><up-avatar :src="img(item.memberInfo.headimg)"></up-avatar></view>
						<view class="ml-2">
							<view class="flex">
								<view class="font-bold text-[32rpx]"> {{item.memberInfo.nickname}}</view>
							</view>
							<view class="flex items-center mt-1">
								<view>
									<u-icon @click="editReal(item)" :name="img('addon/tk_vip/card.png')"></u-icon>
								</view>
								<view class="text-xs ml-1">
									<u-tag v-if="item.real_info&&item.real_info.status==1" size="mini" bgColor="#f1ecda"
										borderColor="#dcdcd3" color="#000000" plain text="已认证">
									</u-tag>
									<u-tag v-else size="mini" borderColor="#dcdcd3" color="#fc0004" plain text="未认证">
									</u-tag>
								</view>
							</view>
							<view class="flex items-center">
								<view class="text-slate-600">积分:</view>
								<view class="ml-1 font-bold">{{item.memberInfo.point}}</view>
								<view class="ml-2">
									<u-icon @click="editPointEvent(item)" name="edit-pen"></u-icon>
								</view>
							</view>
						</view>
					</view>
					<view>
						<u-tag v-if="item.level_id>0" @click="openEditVip(item)" size="mini" bgColor="#494b33"
							borderColor="#b0a759" color="#E6DB74" plain :text="item.level_id_name">
						</u-tag>
						<u-tag v-if="item.level_id==0" @click="openEditVip(item)" size="mini" bgColor="#f1ecda"
							borderColor="#dcdcd3" color="#000000" plain text="普通会员">
						</u-tag>
					</view>
				</view>
				<view class="line-box mt-1 !bg-[#e6e5bf]"></view>
				<view @click="redirect({url:'/addon/tk_vip/pages/member?id='+item.id})"
					class="flex items-center justify-between mt-1">
					<view v-if="dateChange(item.over_time) < Date.now()&&dateChange(item.over_time)>0"
						class="text-xs text-red">已到期:{{item.over_time}}</view>
					<view v-if="dateChange(item.over_time) > Date.now()" class="text-xs text-slate-600">
						到期时间:{{item.over_time}}</view>
					<view v-if="item.over_time ==0&&item.level_id>0" class="mt-1">
						<u-tag size="mini" borderColor="#b0a759" color="#b0a759" plain text="永久"></u-tag>
					</view>
					<view class="mt-1">
						<u-tag @click="redirect({url:'/addon/tk_vip/pages/member?id='+item.id})" size="mini"
							borderColor="#b0a759" color="#b0a759" plain text="查看详情"></u-tag>
					</view>
				</view>
			</view>
			<mescroll-empty :option="{'icon': img('static/resource/images/empty.png')}"
				v-if="!list.length && loading"></mescroll-empty>
		</mescroll-body>
	</view>

	<view class="p-2">
		<up-calendar @close="timeshow=false" :show="timeshow" :mode="mode" @confirm="confirm"></up-calendar>
	</view>
	<u-popup :show="editPointShow" mode="center" :round="10" :border-radius="20" :safe-area-inset-bottom="true">
		<view class="p-4 items-center ">
			<view class="text-xs text-slate-500 w-[420rpx]">请填写变动积分,小于0将减少变动积分，大于0将增加变动积分</view>
			<view class="mt-4">
				<u-input v-model="point" placeholder="请输入变动积分"></u-input>
			</view>
			<view class="flex justify-center mt-4 mb-1">
				<view class="w-[200rpx]">
					<u-button color="#828282" shape="circle" @click="editPointShow = false">关闭</u-button>

				</view>
				<view class="ml-2 w-[200rpx]">
					<u-button color="#525548" shape="circle" @click="adjustPointEvent()">确认修改</u-button>
				</view>

			</view>
		</view>
	</u-popup>
	<u-popup :show="editVipShow" mode="center" :round="10" :border-radius="20" :safe-area-inset-bottom="true">
		<view class="p-4 items-center mt-2">
			<view class="mb-4 text-xs text-slate-500">更改会员等级实时生效，用户的权益将会发生改变</view>
			<view class="flex items-center justify-between">
				<view class="flex">
					<view>等级：</view>
					<view>
						<u-tag v-if="level_id==0" size="mini" bgColor="#494b33" borderColor="#b0a759" color="#E6DB74"
							plain text="普通会员"></u-tag>
						<u-tag v-else size="mini" bgColor="#494b33" borderColor="#b0a759" color="#E6DB74" plain
							:text="level_name"></u-tag>
					</view>
				</view>
				<view class="ml-2"><u-tag @click="selectLevelShow=true" borderColor="#b0a759" color="#b0a759" plain
						text="更改等级"></u-tag></view>
			</view>
			<view class="flex items-center mt-4 justify-between">
				<view v-if="over_time==0">永久会员</view>
				<view v-else>到期时间：{{over_time}}</view>
				<view class="ml-6"><u-tag plain borderColor="#b0a759" color="#b0a759" @click="changeTime()"
						text="更改时间"></u-tag></view>
			</view>
			<view class="flex justify-center mt-8 mb-2">
				<view class="w-[240rpx]">
					<u-button color="#828282" shape="circle" @click="editVipShow = false">关闭</u-button>
				</view>
				<view class="ml-4 w-[240rpx]">
					<u-button color="#525548" shape="circle" @click="editVipEvent()">确认修改</u-button>
				</view>
			</view>
		</view>
	</u-popup>
	<u-popup :show="selectLevelShow" mode="bottom" :round="10" :border-radius="20" :safe-area-inset-bottom="true">
		<view class="p-4 text-center mt-8">
			<block v-for="(item,index) in memberLevel">
				<view @click="selectVipFn(item)" class="font-bold mb-2">{{item.level_name}}</view>
			</block>
		</view>
		<view class="h-[160rpx]"></view>
	</u-popup>
</template>


<script setup lang="ts">
	import { ref } from 'vue';
	import { onLoad, onShow, onPageScroll, onReachBottom } from '@dcloudio/uni-app'
	import { getCheckVerifier } from '@/app/api/verify'
	import { getMemberList, adjustPoint, getMemberLevel, editVipLevel } from '@/addon/tk_vip/api/member'
	import { dateChange } from '@/addon/tk_vip/utils/ts/common';
	import { img, redirect, getToken } from '@/utils/common';
	import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue';
	import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';
	import useMescroll from '@/components/mescroll/hooks/useMescroll.js';
	const timeshow = ref(false)
	const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);
	let list = ref<Array<Object>>([]);
	let loading = ref<boolean>(false);
	const isVerify = ref(false)
	const editPointShow = ref(false)
	const editVipShow = ref()
	const selectLevelShow = ref(false)
	const selectInfo = ref()
	const point = ref(0)
	const level_id = ref()
	const level_name = ref()
	const over_time = ref()
	const keyworld = ref('')
	const memberLevel = ref()
	const getMemberLevelFn = () => {
		getMemberLevel().then((res) => {
			memberLevel.value = res.data;
			memberLevel.value.push({
				level_id: 0,
				level_name: '普通会员'
			});
		});
	}
	const changeTime = () => {
		timeshow.value = true
		editVipShow.value = false
	}
	const confirm = (e) => {
		over_time.value = e[0]
		timeshow.value = false
		editVipShow.value = true
	}
	const selectVipFn = (e) => {
		level_id.value = e.level_id
		level_name.value = e.level_name
		selectLevelShow.value = false
	}
	const openEditVip = (e) => {
		selectInfo.value = e
		level_id.value = e.level_id
		level_name.value = e.level_id_name
		over_time.value = e.over_time
		getMemberLevelFn()
		editVipShow.value = true
	}
	const editVipEvent = async () => {
		await editVipLevel({
			id: selectInfo.value.id,
			member_id: selectInfo.value.memberInfo.member_id,
			level_id: level_id.value,
			over_time: over_time.value
		})
		uni.$u.toast('修改成功')
		editVipShow.value = false
		getMescroll().resetUpScroll();
	}
	const editPointEvent = async (e) => {
		selectInfo.value = e
		editPointShow.value = true
	}
	const adjustPointEvent = async () => {
		await adjustPoint({
			member_id: selectInfo.value.memberInfo.member_id,
			account_data: point.value
		})
		uni.$u.toast('修改成功')
		editPointShow.value = false
		getMescroll().resetUpScroll();
	}
	const reload = () => {
		getMescroll().resetUpScroll();
	}
	onShow(() => {
		if (getToken()) checkIsVerifier();
	})

	// 检测是否是核销员
	const checkIsVerifier = () => {
		getCheckVerifier().then((res : any) => {
			if (!res.data) {
				isVerify.value = false
				loading.value = false;
				uni.showToast({
					title: '非核销员无此权限',
					icon: 'none'
				});
				setTimeout(() => {
					uni.navigateBack();
				}, 1000);
			} else {
				isVerify.value = true
				loading.value = false;
			}
		})
	}
	const getMemberListFn = (mescroll) => {
		loading.value = false;
		let data : object = {
			page: mescroll.num,
			limit: mescroll.size,
			nickname: keyworld.value
		};
		getMemberList(data).then((res) => {
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
	onLoad((option) => {

	})
</script>
<style lang="scss" scoped>
	@import '@/addon/tk_vip/utils/styles/common.scss';

	.tk-card {
		background: linear-gradient(-145deg, #fffbf8 0%, #ffffff 100%);
		margin: 12rpx;
		border-radius: 12rpx;
		padding: 24rpx;
		box-shadow: 0 1px 1px 0 rgba(234, 234, 234, 0.4), 0 2px 2px 0 rgba(231, 231, 231, 0.2);
	}
</style>