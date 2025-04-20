<template>
	<view
		class="min-h-[100vh]"
		:style="themeColor()">
		<view
			class="w-[100%] h-[500rpx] relative background-size box-border"
			:style="{ backgroundImage: 'url(' + img('addon/shop_fenxiao/sale-ranking.png') + ')' }"></view>
		<view class="bg-[#f8f8f8] relative z-2 rounded-tl-[20rpx] rounded-tr-[20rpx] mt-[-24rpx] py-[20rpx] px-[24rpx] h-[calc(100vh-476rpx)] flex flex-col box-border">
			<uni-forms
				ref="baseForm"
				:label-width="75"
				:modelValue="baseFormData">
				<uni-forms-item label="代理级别">
					<uni-data-select
						v-model="baseFormData.leave"
						:localdata="areaLevelList"
						@change="change"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="代理区域">
					<input
						@click="openaddress"
						class="border"
						:value="baseFormData.addreaa"
						placeholder="请选择地区" />
				</uni-forms-item>
				<uni-forms-item label="申请条件">
					<u-line-progress
						style="margin-top: 15rpx"
						height="15"
						:percentage="state.rete"
						activeColor="#FC3E75"></u-line-progress>
				</uni-forms-item>

				<view
					v-if="state.show"
					class="">
					<checkbox
						@click="changestate"
						value="cb"
						:checked="baseFormData.checked" />我已阅读并同意<text @click="redirect({ url: '/app/pages/auth/agreement?key=area_service' })">《区域代理申请协议》</text>
					<!-- <text @tap="routerLink(2)">《隐私政策》</text> -->
				</view>
				<button
					@click="addApplyFn"
					size="default"
					:class="(state.show ? baseFormData.checked : true) && state.satisfy ? 'active' : 'disable'"
					style="margin-top: 60rpx"
					hover-class="is-hover"
					>提交申请</button
				>
			</uni-forms>
		</view>
		<!-- <view class=""> -->
		<!-- <address_edit></address_edit> -->
		<!-- </view> -->

		<simple-address
			:number="state.selectID"
			mask-bg-color="rgba(0, 0, 0, 0.4)"
			ref="simpleAddressRef"
			:pickerValueDefault="state.cityPickerValueDefault"
			@onConfirm="onConfirm"
			themeColor="purple"></simple-address>

		<areaSelectChange
			:number="state.selectID"
			ref="areaRef"
			@complete="areaSelectComplete"
			:area-id="baseFormData.district_id"></areaSelectChange>
	</view>
</template>
<script setup>
import { ref, computed, reactive } from "vue"
import { img, redirect, moneyFormat } from "@/utils/common"
import { onShow } from "@dcloudio/uni-app"
import { onLoad } from "@dcloudio/uni-app"
// import { getSaleMemberInfo, getSaleRanking } from '@/addon/shop_fenxiao/api/sale'
import { getLevelList, getLevelInfo } from "@/addon/ly_area/api/level"
import { addApply, editApply, getApplyInfo } from "@/addon/ly_area/api/apply"
import { getInfo, getConfig } from "@/addon/ly_area/api/area_agent"
import simpleAddress from "../components/simple-address/simple-address"
import address_edit from "../components/address_edit.vue"
import areaSelectChange from "../components/area-select-change"
const areaRef = ref()
const info = ref({})
const applyInfo = ref({})

const simpleAddressRef = ref()
const areaLevelList = ref([])
const areaLevelInfo = ref([])
const baseFormData = reactive({
	addreaa: "",
	leave: "",
	checked: false,
	district_id: 0,
})

const state = reactive({
	show: false,
	userInfor: {},
	selectID: 0,
	cityPickerValueDefault: [0, 0, 0],
	pickerText: "",
	list: [],
	rete: 0, //判断金额是否满足等于100满足,否则不满足,也可以看进度条
	type: null, //升级条件判定是全都满足还是满足其1
	tiaojianId: false, //判断商品Id是否满足
	satisfy: false,
	level_area: "",
	level_id: "",
	province_id: "",
	city_id: "",
	district_id: "",
})
const openaddress = () => {
	if (state.selectID == 0) {
		uni.showToast({ icon: "none", title: "请先选择代理级别" })
	} else {
		// simpleAddressRef.value.open()
		areaRef.value.open()
	}
}
const areaSelectComplete = (event) => {
	console.log(event.province, event.city, event.district)
	if (state.selectID == 1) {
		baseFormData.addreaa = event.province.name
		state.province_id = event.province.id
	} else if (state.selectID == 2) {
		baseFormData.addreaa = event.province.name + "-" + event.city.name
		state.province_id = event.province.id
		state.city_id = event.city.id
	} else {
		baseFormData.addreaa = event.province.name + "-" + event.city.name + "-" + event.district.name
		state.province_id = event.province.id
		state.city_id = event.city.id
		state.district_id = event.district.id
	}
}
const changestate = () => {
	baseFormData.checked = !baseFormData.checked
}
const addApplyFn = () => {
	if (state.satisfy) {
		//满足升级条件
		let form = {
			province_id: state.province_id,
			city_id: state.city_id,
			district_id: state.district_id,
			level_area: state.level_area,
			level_id: state.level_id,
			checked: baseFormData.checked,
		}
		if (!form.province_id) {
			uni.showToast({ icon: "none", title: "请选择代理地区" })
		}

		addApply({
			...form,
		}).then((res) => {
			console.log(res)
			uni.showModal({
				title: '申请结果',
				content: '提交成功请等待审核',
				showCancel: false,
				success() {
					redirect({ url: '/addon/ly_area/pages/index', mode: 'redirectTo'})
				}
			})
		})
		// console.log(8989)
	} else {
		//不满足升级条件
		// console.log(8989)
		uni.showToast({ icon: "error", title: "您未满足升级条件" })
	}
}
function getResult(arr1, arr2) {
	let len = arr1.length
	let tempArr = arr1.filter((item) => {
		return arr2.includes(item)
	})
	if (tempArr.length === len) {
		return true
	} else {
		return false
	}
}

const change = () => {
	state.province_id = ""
	state.city_id = ""
	state.district_id = ""
	baseFormData.addreaa = ""
	let arr = state.list.filter((item) => item.level_name == baseFormData.leave)
	// state.selectID=baseFormData.leave==''
	console.log(baseFormData.leave)
	if (baseFormData.leave == "街道代理" || baseFormData.leave == "区级代理") {
		state.selectID = 3
	} else if (baseFormData.leave == "市级代理") {
		state.selectID = 2
	} else if (baseFormData.leave == "省级代理") {
		state.selectID = 1
	}
	getLevelInfo(arr[0].level_id).then((res) => {
		let data = res.data
		if (Object.keys(data).length) {
			areaLevelInfo.value = res.data
			state.type = res.data.up_type
			state.level_area = res.data.level_area
			state.level_id = res.data.level_id
			console.log(Number(res.data.order_money))

			let order_money = Number(res.data.order_money).toFixed(0)
			if (Number(res.data.order_money).toFixed(0) == "0") {
				state.rete = 100
			} else {
				let rate = state.userInfor.order_money / order_money
				rate > 1 ? (state.rete = 100) : (state.rete = Number(rate).toFixed(0))
			}
			let ids = res.data.order_goods_id

			if (res.data.order_goods_id.length == 0) {
				state.tiaojianId = true
			} else {
				state.tiaojianId = getResult(ids, state.userInfor.order_goods_id)
				console.log(state.tiaojianId)
			}
			if (state.type == 0) {
				console.log("满足一个")

				state.rete == 100 || state.tiaojianId ? (state.satisfy = true) : (state.satisfy = false)
			} else {
				state.rete == 100 && state.tiaojianId ? (state.satisfy = true) : (state.satisfy = false)
			}
		}
	})
}
onShow(() => {
	getLevelList().then((res) => {
		let data = res.data
		state.list = res.data
		if (Object.keys(data).length) {
			res.data.map((item) => {
				areaLevelList.value.push({ text: item.level_name, value: item.level_name })
			})
			// console.log(res.data)
			// areaLevelList.value = res.data
		} else {
			//   redirect({ url: '/addon/shop_fenxiao/pages/apply', mode: 'redirectTo' })
		}
	})

	getInfo().then((res) => {
		let data = res.data

		state.userInfor.order_goods_id = res.data.order_goods_id
		state.userInfor.order_money = Number(res.data.order_money).toFixed(0)
		console.log(state.userInfor)
	})
	getConfig().then((res) => {
		state.show = res.data.area_config.is_agreement
		// state.show = true
	})
	
	getApplyInfo().then((res) => {
		let data = res.data
		if(Object.keys(data).length){
			applyInfo.value = res.data
		}
	})
})

onLoad((option) => {
	// getSaleMemberInfoFn(Number(option.id))
	// getSaleRankingFn(Number(option.id))
})
let loading = ref(true) //页面加载动画
const onConfirm = (e) => {
	console.log(e)

	baseFormData.addreaa = e.label
	// postEditAddress({ address: e.label })
}
const getSaleMemberInfoFn = (id) => {
	getSaleMemberInfo(id)
		.then((res) => {
			info.value = res.data.member
			info.value.order_money = res.data.order_money
			info.value.currentRanking = 0
		})
		.catch(() => {
			loading.value = false
		})
}
</script>
<style lang="scss" scoped>
.background-size {
	background-size: 100% 100%;
}
.border {
	border-radius: 5rpx;
	border: 1px solid #6666;
	height: 60rpx;
	line-height: 60rpx;
	padding: 0 10rpx;
}
.disable {
	border: 1px solid #ccc;
	background: #fff;
	color: #999999;
}
.active {
	background: #ffd600;
	color: black;
}
</style>
