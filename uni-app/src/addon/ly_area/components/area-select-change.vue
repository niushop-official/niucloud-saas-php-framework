<template>
	<u-popup
		:show="show"
		@close="show = false"
		mode="bottom"
		:round="10"
		:closeable="true">
		<view class="text-center p-[30rpx]">请选择地区</view>

		<view class="flex p-[30rpx] text-sm font-semibold">
			<view
				v-if="areaList.province.length"
				class="flex-1"
				:class="{ 'text-[var(--primary-color)]': currSelect == 'province' }"
				@click="currSelect = 'province'">
				<view v-if="selected.province">{{ selected.province.name }}</view>
				<view v-else>请选择</view>
			</view>
			<view
				v-if="areaList.city.length"
				class="flex-1"
				:class="{ 'text-[var(--primary-color)]': currSelect == 'city' }"
				@click="currSelect = 'city'">
				<view v-if="selected.city">{{ selected.city.name }}</view>
				<view v-else>请选择</view>
			</view>
			<view
				v-if="areaList.district.length"
				class="flex-1"
				:class="{ 'text-[var(--primary-color)]': currSelect == 'district' }"
				@click="currSelect = 'district'">
				<view v-if="selected.district">{{ selected.district.name }}</view>
				<view v-else>请选择</view>
			</view>
		</view>
		<scroll-view
			scroll-y="true"
			class="h-[50vh]">
			<view class="flex p-[30rpx] pt-0 text-sm">
				<view
					v-if="areaList.province.length"
					v-show="currSelect == 'province'">
					<view
						v-for="item in areaList.province"
						class="leading-loose"
						:class="{ 'text-[var(--primary-color)]': selected.province && selected.province.id == item.id }"
						@click="selected.province = item"
						>{{ item.name }}</view
					>
				</view>
				<view
					v-if="areaList.city.length"
					v-show="currSelect == 'city'">
					<view
						v-for="item in areaList.city"
						class="leading-loose"
						:class="{ 'text-[var(--primary-color)]': selected.city && selected.city.id == item.id }"
						@click="selected.city = item"
						>{{ item.name }}</view
					>
				</view>
				<view
					v-if="areaList.district.length"
					v-show="currSelect == 'district'">
					<view
						v-for="item in areaList.district"
						class="leading-loose"
						:class="{ 'text-[var(--primary-color)]': selected.district && selected.district.id == item.id }"
						@click="selected.district = item"
						>{{ item.name }}</view
					>
				</view>
			</view>
		</scroll-view>
	</u-popup>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue"
import { getAreaListByPid, getAreaByCode } from "@/app/api/system"

const prop = defineProps({
	areaId: {
		type: Number,
		default: 0,
	},
	number: {
		type: Number,
	},
})

const show = ref(false)
const areaList = reactive({
	province: [],
	city: [],
	district: [],
})
const currSelect = ref("province")

const selected = reactive({
	province: null,
	city: null,
	district: null,
})

getAreaListByPid(0)
	.then(({ data }) => {
		areaList.province = data
	})
	.catch()

watch(
	() => prop.areaId,
	(nval, oval) => {
		if (nval && !oval) {
			getAreaByCode(nval)
				.then(({ data }) => {
					if (prop.number == 1) {
						data.province && (selected.province = data.province)
					} else if (prop.number == 2) {
						data.province && (selected.province = data.province)
						data.city && (selected.city = data.city)
					} else {
						data.province && (selected.province = data.province)
						data.city && (selected.city = data.city)
						data.district && (selected.district = data.district)
					}
				})
				.catch()
		}
	}
)

/**
 * 监听省变更
 */
watch(
	() => selected.province,
	(nval) => {
		if (nval) {
			getAreaListByPid(selected.province.id)
				.then(({ data }) => {
					if (prop.number !== 1) {
						areaList.city = data
						currSelect.value = "city"

						if (selected.city) {
							let isExist = false
							for (let i = 0; i < data.length; i++) {
								if (selected.city.id == data[i].id) {
									isExist = true
									break
								}
							}
							if (!isExist) {
								selected.city = null
							}
						}
					} else {
						emits("complete", selected)
						show.value = false
					}
				})
				.catch()
		}
	},
	{ deep: true }
)

/**
 * 监听市变更
 */
watch(
	() => selected.city,
	(nval) => {
		if (prop.number == 1) {
			return
		} else {
			if (nval) {
				if (prop.number !== 2) {
					getAreaListByPid(selected.city.id)
						.then(({ data }) => {
							areaList.district = data
							currSelect.value = "district"

							if (selected.district) {
								let isExist = false
								for (let i = 0; i < data.length; i++) {
									if (selected.district.id == data[i].id) {
										isExist = true
										break
									}
								}
								if (!isExist) {
									selected.district = null
								}
							}
						})
						.catch()
				} else {
					emits("complete", selected)
					show.value = false
				}
			} else {
				areaList.district = []
				selected.district = null
			}
		}
	},
	{ deep: true }
)

const emits = defineEmits(["complete"])

/**
 * 监听区县变更
 */
watch(
	() => selected.district,
	(nval) => {
		if (prop.number == 1 || prop.number == 2) {
			return
		} else {
			if (nval) {
				currSelect.value = "district"
				emits("complete", selected)
				show.value = false
			}
		}
	},
	{ deep: true }
)

const open = () => {
	show.value = true
	currSelect.value = "province"
	selected.province = null
	selected.city = null
	selected.district = null
	getAreaListByPid(0)
		.then(({ data }) => {
			areaList.province = data
		})
		.catch()
}

defineExpose({
	open,
})
</script>

<style lang="scss" scoped></style>
