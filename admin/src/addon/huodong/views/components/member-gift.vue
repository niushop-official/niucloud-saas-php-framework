<template>
	<div v-for="item in gifts">
		<component :is="item.component" v-model="formData[item.key]" ref="giftRefs" v-if="item.component" />
	</div>
</template>

<script lang="ts" setup>
	import { ref, defineAsyncComponent, computed, watch } from 'vue'
	import { getGiftDict } from '@/app/api/member'

	const gifts = ref({})
	const props = defineProps({
		modelValue: {
			type: Object,
			default: () => {
				return {}
			}
		}
	})
	const emits = defineEmits(['update:modelValue'])
	const formData = ref({})
	const value = computed({
		get() {
			return props.modelValue
		},
		set(value) {
			emits('update:modelValue', value)
		}
	})
	const giftRefs = ref([])

	watch(() => value.value, (nval, oval) => {
		if ((!oval || !Object.keys(oval).length) && Object.keys(nval).length) {
			formData.value = value.value
		}
	}, { immediate: true })

	watch(() => formData.value, () => {
		value.value = formData.value
	}, { deep: true })

	const modules : any = import.meta.glob('@/**/*.vue')
	// getGiftDict().then(({ data }) => {
	//     Object.keys(data).forEach((key: string) => {
	//         data[key].component && (data[key].component = defineAsyncComponent(modules[data[key].component]))
	//     })
	//     gifts.value = data
	// })
	var data = {
		"balance": {
			"key": "balance",
			"name": "送红包",
			"desc": "发放红包",
			"component": "/src/app/views/member/components/gift-balance.vue",
			"grant": {},
			"content": {
				"admin": {},
				"member_level": {},
				"member_sign": {},
				"member_sign_continue": {}
			}
		},
		"point": {
			"key": "point",
			"name": "送积分",
			"desc": "发放积分",
			"component": "/src/app/views/member/components/gift-point.vue",
			"grant": {},
			"content": {
				"admin": {},
				"member_level": {},
				"member_sign": {},
				"member_sign_continue": {}
			}
		},
		// "shop_coupon": {
		//     "key": "shop_coupon",
		//     "name": "优惠券",
		//     "desc": "发放优惠券",
		//     "component": "/src/addon/shop/views/member/components/gift-coupon.vue",
		//     "grant": {},
		//     "content": {
		//         "admin": {},
		//         "member_level": {},
		//         "member_sign": {},
		//         "member_sign_continue": {}
		//     }
		// }
		"commission": {
			"key": "commission",
			"name": "佣金",
			"desc": "发放佣金",
			"component": "/src/addon/huodong/views/components/gift-commission.vue",
			"grant": {},
			"content": {
				"admin": {},
				"member_level": {},
				"member_sign": {},
				"member_sign_continue": {}
			}
		}
	}
	    Object.keys(data).forEach((key: string) => {
	        data[key].component && (data[key].component = defineAsyncComponent(modules[data[key].component]))
	    })
	    gifts.value = data
	const verify = async () => {
		let verify = true
		for (let i = 0; i < giftRefs.value.length; i++) {
			const item = giftRefs.value[i]
			!await item.verify() && (verify = false)
		}
		return verify
	}

	defineExpose({
		verify
	})
</script>

<style lang="scss" scoped>
</style>