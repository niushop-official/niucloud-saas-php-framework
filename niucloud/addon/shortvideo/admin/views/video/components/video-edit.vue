<template>
	<el-dialog v-model="showDialog" :title="formData.id ? t('updateVideo') : t('addVideo')" width="50%"
		class="diy-dialog-wrap" :destroy-on-close="true">
		<el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form"
			v-loading="loading">
			<el-form-item :label="t('name')" prop="name">
				<el-input v-model="formData.name" clearable :placeholder="t('namePlaceholder')" class="input-width" />
			</el-form-item>
			<el-form-item :label="t('desc')" prop="desc">
				<el-input v-model="formData.desc" clearable :placeholder="t('descPlaceholder')" class="input-width" />
			</el-form-item>
			<!-- <el-form-item :label="t('cateId')" prop="cate_id">
				<el-select class="input-width" v-model="formData.cate_id" clearable
					:placeholder="t('cateIdPlaceholder')">
					<el-option label="请选择" value=""></el-option>
					<el-option v-for="(item, index) in cateIdList" :key="index" :label="item['name']"
						:value="item['id']" />
				</el-select>
			</el-form-item> -->
			<el-form-item :label="t('label')">
				<el-select class="input-width" multiple v-model="formData.label_ids" clearable :placeholder="t('labelPlaceholder')">
					<el-option label="请选择" value=""></el-option>
					<el-option v-for="(item, index) in labelList" :key="index" :label="item['name']"
						:value="item['id']" />
				</el-select>
			</el-form-item>
			<el-form-item :label="t('memberId')" prop="member_id">
				 <!-- <el-select class="input-width" v-model="formData.member_id" clearable filterable
					:placeholder="t('memberIdPlaceholder')">
					<el-option label="请选择" value=""></el-option>
					<el-option v-for="(item, index) in memberIdList" :key="index" :label="item['nickname']"
						:value="item['member_id']" />
				</el-select> -->
				<!--<el-input v-model="formData.member_id" :placeholder="t('用户ID')" class="input-width"  /> -->
				<div>
					<member-select-popup ref="memberSelectPopupRef" v-model="formData.member_id" @memberSelect="memberSelect" />
					
					<div class="flex min-w-[512px] relative border-[1px] border-[#e7e7e7] border-solid mt-[16px]" v-if="formData.member_id">
					    <div class="min-w-[78px] h-[78px] flex items-center justify-center">
					        <el-image v-if="formData.member_info.headimg" class="w-[78px] h-[78px]" :src="img(formData.member_info.headimg)" fit="contain">
					            <template #error>
					                <div class="image-slot">
					                    <img class="w-[78px] h-[78px]" src="@/addon/shortvideo/assets/member_default.png" />
					                </div>
					            </template>
					        </el-image>
					        <img v-else class="w-[78px] h-[78px]" src="@/addon/shortvideo/assets/member_default.png" fit="contain" />
					    </div>
					    <div class="flex-1 py-[5px] pl-[10px] pr-[30px]">
					        <div class="text-[14px]">{{ formData.member_info.nickname }}</div>
					        <div class="text-[14px] !text-[var(--el-color-primary)]">{{ formData.member_info.member_price }}</div>
					    </div>
					    <el-icon class="absolute right-[10px] top-[10px] cursor-pointer" @click="deletemember">
					        <Close size="24px" color="#999" />
					    </el-icon>
					</div>
				</div>
			</el-form-item>
			<el-form-item :label="t('种草商品')" v-if="config?.open_shop==1">
				 <!-- <el-input v-model="formData.goods_id" :placeholder="t('商品ID')" class="input-width"  />-->
			   <!-- <el-select filterable v-model="formData.goods_id" :placeholder="t('请选择种草商品')" clearable>
			        <el-option v-for="item in goodsList" :key="item.goods_name" :label="item.goods_name" :value="item.goods_id" />
			    </el-select> -->
			   <!-- <div class="ml-[10px]">
			        <span class="cursor-pointer text-primary mr-[10px]" @click="goodsEdit.refreshGoodsBrand(true)">{{ t('刷新') }}</span>
			        <span class="cursor-pointer text-primary" @click="toGoodsBrandEvent">{{ t('添加商品') }}</span>
			    </div> -->
				<div>
					<goods-select-popup ref="goodsSelectPopupRef" v-model="formData.goods_ids" @goodsSelect="goodsSelect" :min="1" :max="1" />
					
					<div class="flex min-w-[512px] relative border-[1px] border-[#e7e7e7] border-solid mt-[16px]" v-if="formData.goods_ids.length">
					    <div class="min-w-[78px] h-[78px] flex items-center justify-center">
					        <el-image v-if="formData.goods_info.goods_cover" class="w-[78px] h-[78px]" :src="img(formData.goods_info.goods_cover)" fit="contain">
					            <template #error>
					                <div class="image-slot">
					                    <img class="w-[78px] h-[78px]" src="@/addon/shortvideo/assets/goods_default.png" />
					                </div>
					            </template>
					        </el-image>
					        <img v-else class="w-[78px] h-[78px]" src="@/addon/shortvideo/assets/goods_default.png" fit="contain" />
					    </div>
					    <div class="flex-1 py-[5px] pl-[10px] pr-[30px]">
					        <div class="text-[14px]">{{ formData.goods_info.goods_name }}</div>
					        <div class="text-[14px] !text-[var(--el-color-primary)]">{{ formData.goods_info.goods_price }}</div>
					    </div>
					    <el-icon class="absolute right-[10px] top-[10px] cursor-pointer" @click="deleteGoods">
					        <Close size="24px" color="#999" />
					    </el-icon>
					</div>
					<!-- <goods-select-popup ref="goodsSelectPopupRef" v-model="formData.goods_id"
						@goodsSelect="formData.goods_id" :min="1" :max="1" />
				
					<div class="flex min-w-[512px] relative border-[1px] border-[#e7e7e7] border-solid mt-[16px]"
						v-if="formData.goods_id.length">
						<div class="min-w-[78px] h-[78px] flex items-center justify-center">
							<el-image v-if="goods_info.goods_cover" class="w-[78px] h-[78px]"
								:src="img(goods_info.goods_cover)" fit="contain">
								<template #error>
									<div class="image-slot">
										<img class="w-[78px] h-[78px]"
											src="@/addon/shortvideo/assets/goods_default.png" />
									</div>
								</template>
							</el-image>
							<img v-else class="w-[78px] h-[78px]"
								src="@/addon/shortvideo/assets/goods_default.png" fit="contain" />
						</div>
						<div class="flex-1 py-[5px] pl-[10px] pr-[30px]">
							<div class="text-[14px]">{{ goods_info.goods_name }}</div>
							<div class="text-[14px] !text-[var(--el-color-primary)]">
								{{ goods_info.goods_price }}</div>
						</div>
						<el-icon class="absolute right-[10px] top-[10px] cursor-pointer"
							@click="deleteGoods">
							<Close size="24px" color="#999" />
						</el-icon>
					</div> -->
				</div>
			</el-form-item>
			<el-form-item :label="t('cover')" prop="cover">
				<upload-image v-model="formData.cover" />
			</el-form-item>
			<el-form-item :label="t('url')" prop="url">
				<upload-video v-model="formData.url" />
			</el-form-item>
			<el-form-item :label="t('like_num')">
				<el-input v-model="formData.like_num" clearable :placeholder="t('like_numPlaceholder')"
					class="input-width" />
			</el-form-item>
			<el-form-item :label="t('view_num')">
				<el-input v-model="formData.view_num" clearable :placeholder="t('view_numPlaceholder')"
					class="input-width" />
			</el-form-item>

			<el-form-item :label="t('is_show')">
				<el-select class="input-width" v-model="formData.is_show" clearable
					:placeholder="t('is_showPlaceholder')">
					<el-option :label=" t('上架') " value="1" />
					<el-option :label=" t('下架') " value="0" />
				</el-select>
			</el-form-item>

			<el-form-item :label="t('status')">
				<el-select class="input-width" v-model="formData.status" clearable
					:placeholder="t('statusPlaceholder')">
					<el-option :label=" t('show') " value="1" />
					<el-option :label=" t('hidden') " value="0" />
				</el-select>
			</el-form-item>


		</el-form>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
				<el-button type="primary" :loading="loading" @click="confirm(formRef)">{{
                    t('confirm')
                }}</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
	import { ref, reactive, computed, watch } from 'vue'
	import { t } from '@/lang'
	import type { FormInstance } from 'element-plus'
	import { img,deepClone } from '@/utils/common'
	import { addVideo, editVideo, getVideoInfo, getWithCateList,getWithMemberList,getWithGoodsList,getWithLabelList } from '@/addon/shortvideo/api/video'
	import { getset } from '@/addon/shortvideo/api/config'
	import goodsSelectPopup from '@/addon/shortvideo/views/video/components/goods-select-popup.vue'
	import memberSelectPopup from '@/addon/shortvideo/views/video/components/member-select-popup.vue'

	let showDialog = ref(false)
	const loading = ref(false)

	/**
	 * 表单数据
	 */
	const initialFormData = {
		id: '',
		name: '',
		member_id: '',
		like_num: '',
		desc: '',
		cover: '',
		url: '',
		view_num: '',
		desc: '',
		status: '1',
		is_show: '1',
		goods_ids:[],
		label_ids:[],
		goods_info:'',
		product_list:[],
		
		member_info:'',
	}
	const formData : Record<string, any> = reactive({ ...initialFormData })

	const formRef = ref<FormInstance>()

	// 表单验证规则
	const formRules = computed(() => {
		return {
			name: [
				{ required: true, message: t('namePlaceholder'), trigger: 'blur' },

			],member_id: [
				{ required: true, message: t('memberIdPlaceholder'), trigger: 'blur' },

			],
			// ,desc: [
			// 	{ required: true, message: t('descPlaceholder'), trigger: 'blur' },

			// ]
			// ,
		/* 	cate_id: [
				{ required: true, message: t('cateIdPlaceholder'), trigger: 'blur' },

			]
			, */

			cover: [
				{ required: true, message: t('coverPlaceholder'), trigger: 'blur' },
			]
			,
			url: [
				{ required: true, message: t('请上传视频'), trigger: 'blur' },

			]
			,
			status: [
				{ required: true, message: t('statusPlaceholder'), trigger: 'blur' },

			]
		}
	})

	const emit = defineEmits(['complete'])

	/**
	 * 确认
	 * @param formEl
	 */
	const confirm = async (formEl : FormInstance | undefined) => {
		if (loading.value || !formEl) return
		let save = formData.id ? editVideo : addVideo

		await formEl.validate(async (valid) => {
			if (valid) {
				loading.value = true

				let data = formData

				save(data).then(res => {
					loading.value = false
					showDialog.value = false
					emit('complete')
				}).catch(err => {
					loading.value = false
				})
			}
		})
	}

	// 获取字典数据
	// let statusList = ref([])
	// const statusDictList = async () => {
	// statusList.value = await (await useDictionary('状态')).data.dictionary
	// }
	// statusDictList();
	// watch(() => statusList.value, () => { formData.status = statusList.value[0].value })
 const memberIdList = ref([] as any[])
	const setMemberIdList = async () => {
		memberIdList.value = await (await getWithMemberList({})).data
	}
	
	
	const config = ref([] as any[])
	
	const setconfig = async () => {
		config.value = await (await getset({})).data
	}
	setconfig()
	
	
	const labelList = ref([] as any[])
	const setLabelList = async () => {
		labelList.value = await (await getWithLabelList({})).data
	}
	
	 // const goodsList = ref([] as any[])
		// const setgoodsList = async () => {
		// 	goodsList.value = await (await getWithGoodsList({})).data
		// }
		
		

	// const cateIdList = ref([] as any[])
	// const setCateIdList = async () => {
	// 	cateIdList.value = await (await getWithCateList({})).data
	// }
	// setCateIdList()
	const setFormData = async (row : any = null) => {
		Object.assign(formData, initialFormData)
		console.log('initialFormData',initialFormData)
		console.log('formData',formData)
		loading.value = true
		if (row) {
			const data = await (await getVideoInfo(row.id)).data
			if (data) Object.keys(formData).forEach((key : string) => {
				if (data[key] != undefined) formData[key] = data[key]
			})
		}
		loading.value = false
		// setMemberIdList() 
		// setgoodsList() 
		 setLabelList()
	}

	//------------------选择商品---------------------
	const goodsSelectPopupRef = ref()
	const goodsSelect = (value:any)=>{
		console.log('formData',formData)
	    const goods_info:any=Object.values(deepClone(value))[0]
	    formData.product_list =deepClone(goods_info.skuList.map((el:any)=>{
	        el.goods_stock = el.stock + ''
	        el.goods_price = el.price + ''
	        el.limit_num = ''
	        el.stock = ''
	        el.point = ''
	        el.price = ''
	        el.is_enabled = 1
	        return el
	    }))
	    formData.goods_info = {
	        goods_name:goods_info.goods_name,
	        goods_cover:goods_info.goods_cover,
	        goods_price:goods_info.goodsSku.price,
	        goods_id:goods_info.goods_id
	    }
	    formData.image = goods_info.goods_image
	    formData.names = goods_info.goods_name
	    formData.title = goods_info.sub_title
	    formData.content = goods_info.goods_desc
	    if(formRef.value) formRef.value.validateField('product_list').catch(()=>{})
	}
	//删除商品
	const deleteGoods = ()=>{
	    delete formData.goods_info
	    formData.goods_ids = []
	    formData.product_list = []
	}
	//---------------------------------------
	
	
	//------------------选择用户---------------------
	const memberSelectPopupRef = ref()
	const memberSelect = (value:any)=>{
		console.log('formData',formData)
	    const member_info:any=Object.values(deepClone(value))[0]
		
	    formData.member_info = {
	        nickname:member_info.nickname,
	        headimg:member_info.headimg,
	        member_id:member_info.member_id
	    }
		formData.member_id = member_info.member_id;
	    // formData.image = member_info.member_image
	    // if(formRef.value) formRef.value.validateField('product_list').catch(()=>{})
		console.log(formData.member_info)
	}
	//删除商品
	const deletemember = ()=>{
	    delete formData.member_info
	    formData.member_id = ''
	}
	//---------------------------------------
	
	
	
	defineExpose({
		showDialog,
		setFormData
	})
</script>

<style lang="scss" scoped></style>
<style lang="scss">
	.diy-dialog-wrap .el-form-item__label {
		height: auto !important;
	}
</style>