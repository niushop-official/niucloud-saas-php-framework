<template>
	<view v-if="detail" class="bg-[#fcfcfa] min-h-screen overflow-hidden pl-2 pr-2">
		<view class="tk-card mt-2">
			<view class="flex  justify-between">
				<view class="flex">
					<view class=""><up-avatar :src="img(detail.memberInfo.headimg)"></up-avatar></view>
					<view class="ml-2">
						<view class="flex">
							<view class="font-bold text-[32rpx]"> {{ detail.memberInfo.nickname }}</view>
						</view>
						<view class="flex items-center mt-1">
							<view>
								<u-icon @click="editReal()" :name="img('addon/tk_vip/card.png')"></u-icon>
							</view>
							<view class="text-xs ml-1">
								<u-tag v-if="detail.real_info && detail.real_info.status == 1" size="mini"
									bgColor="#f1ecda" borderColor="#dcdcd3" color="#000000" plain text="已认证">
								</u-tag>
								<u-tag v-else size="mini" borderColor="#dcdcd3" color="#fc0004" plain text="未认证">
								</u-tag>
							</view>
						</view>
					</view>
				</view>
				<view>
					<u-tag v-if="detail.level_id > 0" @click="openEditVip()" size="mini" bgColor="#494b33"
						borderColor="#b0a759" color="#E6DB74" plain :text="detail.level_id_name">
					</u-tag>
					<u-tag v-if="detail.level_id == 0" @click="openEditVip()" size="mini" bgColor="#f1ecda"
						borderColor="#dcdcd3" color="#000000" plain text="普通会员">
					</u-tag>
				</view>
			</view>
		</view>
		<view class="tk-card">
			<view class="flex items-center mb-2">
				<view class=" font-bold">账户信息</view>
			</view>

			<view class="flex items-center justify-between mt-1">
				<view class="text-slate-500 font-bold">余额</view>
				<view class="flex items-center">
					<view class=" font-bold">{{ detail.memberInfo.balance }}</view>
					<view class="ml-2">
						<u-icon @click="editBalanceEvent()" name="edit-pen"></u-icon>
					</view>
				</view>
			</view>
			<view class="flex items-center justify-between mt-2">
				<view class="text-slate-500 font-bold">积分</view>
				<view class="flex items-center">
					<view class=" font-bold">{{ detail.memberInfo.point }}</view>
					<view class="ml-2">
						<u-icon @click="editPointEvent()" name="edit-pen"></u-icon>
					</view>
				</view>
			</view>
			<view class="flex items-center justify-between mt-2">
				<view class="text-slate-500 font-bold">会员等级</view>
				<view class="flex items-center">
					<view class="">
						<u-tag v-if="detail.level_id > 0" @click="openEditVip()" size="mini" bgColor="#494b33"
							borderColor="#b0a759" color="#E6DB74" plain :text="detail.level_id_name">
						</u-tag>
						<u-tag v-if="detail.level_id == 0" @click="openEditVip()" size="mini" bgColor="#f1ecda"
							borderColor="#dcdcd3" color="#000000" plain text="普通会员">
						</u-tag>
					</view>
					<view class="ml-2">
						<u-icon @click="openEditVip()" name="edit-pen"></u-icon>
					</view>
				</view>
			</view>
			<view class="flex items-center justify-between mt-2">
				<view class="text-slate-500 font-bold">手机号</view>
				<view class="flex items-center">
					<view @click="telPhone(detail.memberInfo.mobile)" class=" font-bold">{{ detail.memberInfo.mobile }}
					</view>
					<view class="ml-2">
						<u-icon @click="telPhone(detail.memberInfo.mobile)" name="phone" size="20"></u-icon>
					</view>
				</view>
			</view>
			<view class="flex items-center justify-between mt-2">
				<view class="text-slate-500 font-bold">到期时间</view>
				<view v-if="dateChange(detail.over_time) < Date.now() && dateChange(detail.over_time) > 0"
					class="text-xs text-red">已到期:{{ detail.over_time }}</view>
				<view v-if="dateChange(detail.over_time) > Date.now()" class="text-xs text-slate-600">
					到期时间:{{ detail.over_time }}</view>
				<view v-if="detail.over_time == 0 && detail.level_id > 0" class="mt-1">
					<u-tag size="mini" borderColor="#b0a759" color="#b0a759" plain text="永久"></u-tag>
				</view>
			</view>
			<view class="flex items-center justify-between mt-2">
				<view class="text-slate-500 font-bold">注册时间</view>
				<view class="text-xs">{{ detail.memberInfo.create_time }}</view>
			</view>
		</view>
		<view class="tk-card" v-if="detail.real_info && detail.real_info.real_name">
			<view class="flex items-center mb-2">
				<view class=" font-bold">实名信息</view>
				<view class="ml-2 text-[24rpx]">显示实名认证信息</view>
			</view>
			<view class="flex items-center justify-between mt-1">
				<view class="text-slate-500 font-bold">姓名</view>
				<view class=" font-bold">{{ detail.real_info.real_name }}</view>
			</view>
			<view class="flex items-center justify-between mt-2">
				<view class="text-slate-500 font-bold">状态</view>
				<view @click="openEditReal()" class="flex items-center">
					<view v-if="detail.real_info.status == 0" class="text-slate-400 font-bold">待审核</view>
					<view v-if="detail.real_info.status == 1" class=" font-bold">认证通过</view>
					<view v-if="detail.real_info.status == 2" class="text-red font-bold">认证失败</view>
					<view class="ml-2">
						<u-icon @click="openEditReal()" name="edit-pen"></u-icon>
					</view>
				</view>

			</view>
			<view class="flex items-center justify-between mt-2">
				<view class="text-slate-500 font-bold">电话</view>
				<view class="flex items-center">
					<view @click="telPhone(detail.real_info.mobile)" class="font-bold">{{ detail.real_info.mobile }}
					</view>
					<view class="ml-2">
						<u-icon @click="telPhone(detail.real_info.mobile)" name="phone" size="20"></u-icon>
					</view>
				</view>

			</view>
		</view>
		<view class="tk-card !bg-[#494b33] !mt-4" v-else @click="addRealShow = true">
			<view class="flex items-center text-center justify-center">
				<view>
					<u-icon name="plus" color="#ffffff"></u-icon>
				</view>
				<view class="ml-2 text-white">新增认证</view>
			</view>
		</view>
	</view>
	<u-popup :show="editPointShow" mode="center" :round="10" :border-radius="20" :safe-area-inset-bottom="true">
		<view class="p-4 items-center ">
			<view class="text-xs text-slate-500 w-[420rpx]">请填写变动积分,小于0将减少变动积分，大于0将增加变动积分</view>
			<view class="mt-4">
				<u-input clearable v-model="point" placeholder="请输入变动积分"></u-input>
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
	<u-popup :show="editBalanceShow" mode="center" :round="10" :border-radius="20" :safe-area-inset-bottom="true">
		<view class="p-4 items-center ">
			<view class="text-xs text-slate-500 w-[420rpx]">请填写变动余额,小于0将减少变动余额，大于0将增加变动余额</view>
			<view class="mt-4">
				<u-input clearable v-model="balance" placeholder="请输入变动余额"></u-input>
			</view>
			<view class="flex justify-center mt-4 mb-1">
				<view class=" w-[200rpx]">
					<u-button color="#828282" shape="circle" @click="editBalanceShow = false">关闭</u-button>
				</view>
				<view class="ml-2 w-[200rpx]">
					<u-button :loading="loading" color="#525548" shape="circle"
						@click="adjustBalanceEvent()">确认修改</u-button>
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
						<u-tag v-if="level_id == 0" size="mini" bgColor="#494b33" borderColor="#b0a759" color="#E6DB74"
							plain text="普通会员"></u-tag>
						<u-tag v-else size="mini" bgColor="#494b33" borderColor="#b0a759" color="#E6DB74" plain
							:text="level_name"></u-tag>
					</view>
				</view>
				<view class="ml-2"><u-tag @click="selectLevelShow = true" borderColor="#b0a759" color="#b0a759" plain
						text="更改等级"></u-tag></view>
			</view>
			<view class="flex items-center mt-4 justify-between">
				<view v-if="over_time == 0">永久会员</view>
				<view v-else>到期时间：{{ over_time }}</view>
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
			<block v-for="(item, index) in memberLevel">
				<view @click="selectVipFn(item)" class="font-bold mb-2">{{ item.level_name }}</view>
			</block>
		</view>
		<view class="h-[160rpx]"></view>
	</u-popup>
	<u-popup zIndex="0" closeable @close="editRealShow = false" :show="editRealShow" mode="bottom" :round="10"
		:border-radius="20" :safe-area-inset-bottom="true">
		<view class="p-4 items-center mt-2">
			<view class="tk-card" v-if="detail.real_info && detail.real_info.real_name">
				<view class="flex items-center mb-2">
					<view class=" font-bold">实名认证</view>
					<view class="ml-2 text-[24rpx]">更改实名状态会实时生效</view>
				</view>
				<view class="flex items-center justify-between mt-1">
					<view class="text-slate-500 font-bold">姓名</view>
					<view class=" font-bold">{{ detail.real_info.real_name }}</view>
				</view>
				<view class="flex items-center justify-between mt-1">
					<view class="text-slate-500 font-bold">身份证</view>
					<view class=" font-bold">{{ detail.real_info.card_num }}</view>
				</view>
				<view class="flex items-center justify-between mt-1">
					<view class="text-slate-500 font-bold">电话</view>
					<view class="flex items-center">
						<view @click="telPhone(detail.real_info.mobile)" class="font-bold">{{ detail.real_info.mobile }}
						</view>
						<view class="ml-2">
							<u-icon @click="telPhone(detail.real_info.mobile)" name="phone" size="20"></u-icon>
						</view>
					</view>
				</view>
				<view class="mt-2">
					<up-radio-group v-model="realStatus" placement="row">
						<view class="mr-1">
							<up-radio activeColor="#5e584c" label="审核中" name="0"></up-radio>
						</view>
						<view class="mr-1 ml-1">
							<up-radio activeColor="#5e584c" label="认证通过" name="1"></up-radio>
						</view>
						<view class="mr-1 ml-1">
							<up-radio activeColor="#5e584c" label="认证失败" name="2"></up-radio>
						</view>
					</up-radio-group>
				</view>

				<view class="rounded-lg mt-1"
					v-if="detail.real_info.card_img_back && detail.real_info.card_img_back.length > 0">
					<view class="font-bold text-slate-500 mb-1">身份证人像面</view>
					<image style="width:320rpx;height: 180rpx; border-radius: 8px;"
						:src="img(detail.real_info.card_img_back[0])"
						@click="imgListPreview(detail.real_info.card_img_back)" mode="aspectFit">
					</image>
				</view>
				<view class="rounded-lg mt-1"
					v-if="detail.real_info.card_img_front && detail.real_info.card_img_front.length > 0">
					<view class="font-bold text-slate-500 mb-1">身份证人像面</view>
					<image style="width:320rpx;height: 180rpx; border-radius: 8px;"
						:src="img(detail.real_info.card_img_front[0])"
						@click="imgListPreview(detail.real_info.card_img_front)" mode="aspectFit">
					</image>
				</view>

			</view>
			<view class="flex justify-center mt-8 mb-2">
				<view class="w-[300rpx]">
					<u-button color="#828282" shape="circle" @click="editRealShow = false">关闭</u-button>
				</view>
				<view class="ml-2 w-[300rpx]">
					<u-button color="#525548" shape="circle" @click="editRealEvent()">确认修改</u-button>
				</view>

			</view>
		</view>
	</u-popup>
	<u-popup closeOnClickOverlay="true" :show="addRealShow" mode="bottom" :round="10" :border-radius="20"
		:safe-area-inset-bottom="true">
		<view class="p-4 items-center mt-2">
			<view class="form-container">
				<up-form labelStyle="{fontWeight:'bold'}" labelPosition="left" labelWidth="70" :model="realInfo"
					:rules="rules" ref="form1">
					<up-form-item label="真实姓名" prop="real_name" borderBottom ref="item1">
						<up-input :focus="true" color="#666666" v-model="realInfo.real_name"
							class="custom-input"></up-input>
					</up-form-item>
					<up-form-item type="idcard" label="身份证号" prop="card_num" borderBottom ref="item2">
						<up-input color="#666666" v-model="realInfo.card_num" class="custom-input"></up-input>
					</up-form-item>
					<up-form-item label="手机号码" prop="mobile" borderBottom ref="item1">
						<up-input color="#666666" v-model="realInfo.mobile" class="custom-input"></up-input>
					</up-form-item>
					<view class="mt-2">
						<view>请选择认证状态*</view>
						<up-radio-group v-model="realInfo.status" placement="row">
							<view class="mr-1">
								<up-radio activeColor="#5e584c" label="审核中" name="0"></up-radio>
							</view>
							<view class="mr-1 ml-1">
								<up-radio activeColor="#5e584c" label="认证通过" name="1"></up-radio>
							</view>
							<view class="mr-1 ml-1">
								<up-radio activeColor="#5e584c" label="认证失败" name="2"></up-radio>
							</view>
						</up-radio-group>
					</view>
					<up-form-item label="" borderBottom ref="item1">
						<view class="flex flex-col mt-2">
							<view class="text-xs text-slate-400">上传身份证国徽面</view>
							<upload-img class="mt-[20rpx]" :max-count="1" v-model="realInfo.card_img_front"
								:multiple="true" />
						</view>
					</up-form-item>
					<up-form-item v-if="realConfig && realConfig.is_upload_card && realConfig.is_upload_card == 1"
						label="" borderBottom ref="item1">
						<view class="flex flex-col mt-2">
							<view class="text-xs text-slate-400">上传身份证人像面</view>
							<upload-img class="mt-[20rpx]" :max-count="1" v-model="realInfo.card_img_back"
								:multiple="true" />
						</view>
					</up-form-item>


				</up-form>
			</view>
			<view class="flex justify-center mt-8 mb-2">
				<view class="w-[300rpx]">
					<u-button color="#828282" shape="circle" @click="addRealShow = false">关闭</u-button>
				</view>
				<view class="ml-2 w-[300rpx]">
					<u-button color="#525548" shape="circle" @click="addRealEvent()">确认认证</u-button>
				</view>
			</view>
		</view>
	</u-popup>
	<view class="p-2">
		<up-datetime-picker hasInput="true" @cancel="timeshow = false" @comfirm="timeshow = false"
			@close="timeshow = false" ref="datetimePickerRef" :show="timeshow" v-model="over_time" mode="date"
			@change="timeChangeEvent" @confirm="confirm"></up-datetime-picker>
		<!-- <up-calendar @close="timeshow = false" :show="timeshow" monthNum="24" @confirm="confirm"></up-calendar> -->
	</view>
	<view class="fixed bottom-28 right-4 z-50 rounded-full p-2 text-white ">
		<u-icon @click="redirect({ url: '/app/pages/verify/index' })" name="scan" color="#6b6b6b" size="36"></u-icon>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad, onShow, onPageScroll, onReachBottom } from '@dcloudio/uni-app'
import { getCheckVerifier } from '@/app/api/verify'
import { getMemberList, adjustPoint, getMemberLevel, editVipLevel, getMemberInfo, adjustBalance, editReal, addReal } from '@/addon/tk_vip/api/member'
import { dateChange, telPhone, imgListPreview } from '@/addon/tk_vip/utils/ts/common';
import { img, redirect, getToken } from '@/utils/common';
import { getRealConfig } from '@/addon/tk_vip/api/real'
import uploadImg from '@/addon/tk_vip/pages/components/upload-img'
const form1 = ref()
const realConfig = ref()
getRealConfig().then((res) => {
	realConfig.value = res.data
})
const rules = {
	real_name: [
		{ required: true, message: '请输入姓名', trigger: 'blur' }
	],
	card_num: [
		{ required: true, message: '请输入身份证号码', trigger: 'blur' },
		{ validator: validateCardNum, trigger: 'blur' }
	],
	mobile: [
		{ required: true, message: '请输入手机号码', trigger: 'blur' },
		{ validator: validateMobile, trigger: 'blur' }
	],
	card_img_front: [
		{ required: true, message: '请上传身份证国徽面', trigger: 'blur' },
	],
	card_img_back: [
		{ required: true, message: '请上传身份证人像面', trigger: 'blur' },
	],
}
function validateCardNum(rule, value, callback) {
	if (!value) {
		return callback(new Error('请输入身份证号码'));
	}
	// 正则表达式修改为匹配正确的身份证格式
	if (!/^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)) {
		callback(new Error('请输入正确的身份证号码'));
	} else {
		callback();
	}
}

// 自定义手机号码验证函数
function validateMobile(rule: any, value: any, callback: any) {
	if (!value) {
		return callback(new Error('请输入电话号码'));
	}
	if (!/^1[3456789]\d{9}$/.test(value)) {
		callback(new Error('请输入正确的电话号码'));
	} else {
		callback();
	}
}
const timeshow = ref(false)
let loading = ref<boolean>(false);
const isVerify = ref(false)
const memberLevel = ref()
const detail = ref()
const editPointShow = ref(false)
const editBalanceShow = ref(false)
const editRealShow = ref(false)
const point = ref()
const balance = ref()
const id = ref()
const editVipShow = ref()
const selectLevelShow = ref(false)
const level_id = ref()
const level_name = ref()
const over_time = ref()
const realStatus = ref()
const addRealShow = ref(false)
const realInfo = ref(
	{
		real_name: '',
		card_num: '',
		mobile: '',
		card_img_back: [],
		card_img_front: [],
		status: "1",
		member_id: "",
	}
)
const openEditReal = () => {
	realStatus.value = detail.value.real_info.status
	editRealShow.value = true
}
const editRealEvent = async () => {
	await editReal({
		id: detail.value.real_info.id,
		member_id: detail.value.memberInfo.member_id,
		status: realStatus.value
	})
	editRealShow.value = false
	getMemberInfoFn()
}
const addRealEvent = async () => {
	realInfo.value.member_id = detail.value.memberInfo.member_id
	await addReal(realInfo.value)
	uni.$u.toast('新增成功')
	addRealShow.value = false
	getMemberInfoFn()
}
const changeTime = () => {
	timeshow.value = true
	editVipShow.value = false
}
const formatter = (type, value) => {
	if (type === 'year') {
		return `${value}年`;
	}
	if (type === 'month') {
		return `${value}月`;
	}
	if (type === 'day') {
		return `${value}日`;
	}
	return value;
};
const formatDateTime = (timestamp: number) => {
	const date = new Date(timestamp * 1000); // 转换为毫秒
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`; // 只返回年月日
}
const confirm = (e) => {
	timeshow.value = false
	editVipShow.value = true
	getMemberInfoFn();
}
const timeChangeEvent = (e) => {
	const timestamp = e.value / 1000; // 转换为秒级时间戳
	over_time.value = formatDateTime(timestamp);
}
const selectVipFn = (e) => {
	level_id.value = e.level_id
	level_name.value = e.level_name
	selectLevelShow.value = false
}
const openEditVip = () => {
	over_time.value = detail.value.over_time
	level_id.value = detail.value.level_id
	level_name.value = detail.value.level_id_name
	getMemberLevelFn()
	editVipShow.value = true
}
const editVipEvent = async () => {
	await editVipLevel({
		id: detail.value.id,
		member_id: detail.value.memberInfo.member_id,
		level_id: level_id.value,
		over_time: over_time.value
	})
	editVipShow.value = false
	getMemberInfoFn()
}
const editBalanceEvent = async () => {
	editBalanceShow.value = true
}
const adjustBalanceEvent = async () => {
	loading.value = true
	await adjustBalance({
		member_id: detail.value.memberInfo.member_id,
		account_data: balance.value
	})
	loading.value = false
	editBalanceShow.value = false
	uni.$u.toast('修改成功')
	getMemberInfoFn()
}
const editPointEvent = async () => {
	editPointShow.value = true
}
const adjustPointEvent = async () => {
	loading.value = true
	await adjustPoint({
		member_id: detail.value.memberInfo.member_id,
		account_data: point.value
	})
	loading.value = false
	editPointShow.value = false
	uni.$u.toast('修改成功')
	getMemberInfoFn()
}
const getMemberLevelFn = () => {
	getMemberLevel().then((res) => {
		memberLevel.value = res.data;
		memberLevel.value.push({
			level_id: 0,
			level_name: '普通会员'
		});
	});
}

onShow(() => {
	if (getToken()) checkIsVerifier();
})

// 检测是否是核销员
const checkIsVerifier = () => {
	getCheckVerifier().then((res: any) => {
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
const getMemberInfoFn = () => {
	getMemberInfo(id.value).then((res) => {
		detail.value = res.data
	})
}
onLoad((option) => {
	if (option.id) {
		getMemberInfo(option.id).then((res) => {
			detail.value = res.data
			id.value = option.id
		})
	} else {
		uni.$u.toast('缺少参数ID')
		uni.navigateBack()
	}
})
</script>
<style lang="scss" scoped>
@import '@/addon/tk_vip/utils/styles/common.scss';
</style>