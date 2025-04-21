<template>
	<el-dialog v-model="showDialog" :title="formData.id ? t('updateAct') : t('addAct')" width="50%"
		class="diy-dialog-wrap" :destroy-on-close="true">
		<el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form"
			v-loading="loading">
			<el-form-item :label="t('name')" prop="name">
				<el-input v-model="formData.name" clearable :placeholder="t('namePlaceholder')" class="input-width" />
			</el-form-item>

			<el-form-item :label="t('cateId')" prop="cate_id">
			    <el-select class="input-width" v-model="formData.cate_id" clearable :placeholder="t('cateIdPlaceholder')">
			       <el-option label="请选择" value=""></el-option>
			        <el-option
			            v-for="(item, index) in cateIdList"
			            :key="index"
			            :label="item['name']"
			            :value="item['id']"
			        />
			    </el-select>
			</el-form-item>

			<el-form-item :label="t('人数限制')" >
				<el-input v-model="formData.num" clearable :placeholder="t('为空则不限制')" class="input-width" />
			</el-form-item>
			 <!-- <el-form-item :label="t('报名限制')">
				 <el-radio-group v-model="formData.usertype">
				    <el-radio :value="0">所有人</el-radio>
				    <el-radio :value="1">限会员用户</el-radio>
				    <el-radio :value="2">限普通用户</el-radio>
				  </el-radio-group>
			</el-form-item> -->
			<el-form-item :label="t('开启周期性活动')" prop="is_zhouqi">
				
				<div>
					<el-radio-group v-model="formData.is_zhouqi">
					 <el-radio :value="0">关闭</el-radio>
					 <el-radio :value="1">开启</el-radio>
					</el-radio-group>
					<br/>
					<el-tag type="primary">以一周为单位系统将在每周同一时间自动生成下一周的活动发布，每一次活动发布的时间为该场活动结束时。</el-tag>
				</div>
			</el-form-item>
			<el-form-item :label="t('报名限制')" prop="usertype">
				<el-checkbox-group v-model="formData.usertype">
				  <el-checkbox label="所有人" :value="-1" />
				  <el-checkbox label="普通用户" :value="0" />
				  <el-checkbox v-for="(item, index) in levellist" :label="item['level_name']" :value="item['level_id']" />
				</el-checkbox-group>
			</el-form-item>
			<!-- <el-form-item :label="t('登记信息')">
				  <el-checkbox-group v-model="formData.tiandata">
				    <el-checkbox label="姓名" :value="1" />
				    <el-checkbox label="联系电话" :value="2" />
				    <el-checkbox label="身份证" :value="3" />
				    <el-checkbox label="地址" :value="4"  />
				  </el-checkbox-group>
			</el-form-item> -->
			
			<el-form-item :label="t('需登记信息')">
				
				  <div>
				  	<el-radio-group v-model="formData.is_tian">
				  	   <el-radio :value="0">否</el-radio>
				  	   <el-radio :value="1">是</el-radio>
				  	 </el-radio-group>
				  	 
				  	<br/>
				  	<el-tag type="primary">开启登记信息后可使用表单收集报名用户信息, 首次填写姓名电话身份证后,将自动记录在报名者信息里面</el-tag>
				  	<el-tag type="primary">在"基础设置"中开启单次信息收集模式后, 重复报名无需再次填写信息</el-tag>
				  </div>
			</el-form-item>
			<el-form-item :label="t('需要核销')">
				 <el-radio-group v-model="formData.is_hexiao">
				    <el-radio :value="0">否</el-radio>
				    <el-radio :value="1">是</el-radio>
				  </el-radio-group>
			</el-form-item>
			
			<el-form-item :label="t('开始核销时间')" v-if="formData.is_hexiao==1" class="input-width"  style="width: 450px;">
				<el-date-picker class="flex-1 !flex" v-model="formData.hxstartime" clearable type="datetime" 
					value-format="YYYY-MM-DD HH:mm:ss" :placeholder="t('开始核销时间,为空默认活动开始当天')">
				</el-date-picker>
			</el-form-item>
			<!-- <el-form-item :label="t('核销方式')">
				 <div>
				 	<el-checkbox-group v-model="formData.hexiao_type">
				 	  <el-checkbox label="核销员" :value="1" />
				 	  <el-checkbox label="扫码器" :value="2" />
				 	</el-checkbox-group>
				 	<el-tag type="">(1)核销员: 后台菜单-营销管理-核销员管理添加; (2)扫码器: 另外采购扫码器配置参数使用</el-tag>
				 	<el-tag type="">扫码器配置地址:  https://自定义域名/api/huodong/order/urlhexiao/站点id</el-tag>
				 </div>
			</el-form-item> -->
			<el-form-item :label="t('需付费报名')">
				 <el-radio-group v-model="formData.is_pay">
				    <el-radio :value="0">否</el-radio>
				    <el-radio :value="1">是</el-radio>
				  </el-radio-group>
			</el-form-item>
			<el-form-item :label="t('price')" v-if="formData.is_pay==1">
				<el-input v-model="formData.price" clearable :placeholder="t('pricePlaceholder')" class="input-width" />
			</el-form-item>
			<el-form-item :label="t('会员免费')" prop="vip_mianfei" v-if="formData.is_pay==1">
				
				<div>
					<el-radio-group v-model="formData.vip_mianfei">
					 <el-radio :value="0">关闭</el-radio>
					 <el-radio :value="1">开启</el-radio>
					</el-radio-group>
					<br/>
					<el-tag type="primary">开启后VIP会员享受免费报名, 普通用户需付费报名</el-tag>
				</div>
			</el-form-item>
			
			<el-form-item :label="t('报名获得奖励')" prop="level_id">
			   <view>
				   <member-gift ref="giftRef" v-model="formData.level_gifts"/>
			   </view>
			</el-form-item>
			
			<el-form-item :label="t('image')"  prop="image">
				<upload-image v-model="formData.image" />
			</el-form-item>
				
			<el-form-item :label="t('images')"  prop="images">
				<upload-image v-model="formData.images" :limit="9" />
			</el-form-item>
			<el-form-item :label="t('startime')" prop="startime" class="input-width">
				<el-date-picker class="flex-1 !flex" v-model="formData.startime" clearable type="datetime"
					value-format="YYYY-MM-DD HH:mm:ss" :placeholder="t('startimePlaceholder')">
				</el-date-picker>
			</el-form-item>
			<el-form-item :label="t('endtime')" prop="endtime" class="input-width">
				<el-date-picker class="flex-1 !flex" v-model="formData.endtime" clearable type="datetime"
					value-format="YYYY-MM-DD HH:mm:ss" :placeholder="t('endtimePlaceholder')">
				</el-date-picker>
			</el-form-item>
			<el-form-item :label="t('address')" prop="address">
				<el-input v-model="formData.address" clearable :placeholder="t('addressPlaceholder')"
					class="input-width" />
			</el-form-item>

			<el-form-item :label="t('content')" prop="content">
				<editor v-model="formData.content" style="height:200px" />
			</el-form-item>
			<el-form-item :label="t('报名可看内容')" prop="hidecontent">
				<div>
					<el-tag type="primary">报名前此内容隐藏, 报名支付后才可查看, 可以填写报名后VIP内部信息等内容</el-tag>
					<editor v-model="formData.hidecontent" style="height:200px" />
				</div>
			</el-form-item>
		
		<el-form-item :label="t('status')" >
		    <el-select class="input-width"  v-model="formData.status" clearable :placeholder="t('statusPlaceholder')"> 
		      <el-option :label=" t('show') "  value="1"/>
		      <el-option :label=" t('hidden') "  value="0"/>
		      <el-option :label=" t('exp') "  value="-2"/>
		    </el-select>
		</el-form-item>

			<el-form-item :label="t('sort')">
				<el-input v-model="formData.sort" clearable :placeholder="t('sortPlaceholder')" class="input-width" />
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
	import { addAct, editAct, getActInfo, getWithCateList } from '@/addon/huodong/api/act'
import { getMemberLevelPageList } from '@/app/api/member'
import memberGift from '@/app/views/member/components/member-gift.vue'
	let showDialog = ref(false)
	const loading = ref(false)

	/**
	 * 表单数据
	 */
	const initialFormData = {
		id: '',
		name: '',
		cate_id: '',
		price: '',
		image: '',
		images: '',
		startime: '',
		endtime: '',
		address: '',
		content: '',
		sales: '',
		num:'',
		is_zhouqi:0,
		vip_mianfei:0,
		status: '1',
		sort: '100',
		
		usertype:[-1],
		is_pay:0,
		is_hexiao:0,
		is_tian:0,
		hexiao_type:[1,2],
		level_gifts: {},
		optype:'',
		hxstartime:''
	}
	const formData : Record<string, any> = reactive({ ...initialFormData })

	const formRef = ref<FormInstance>()

	// 表单验证规则
	const formRules = computed(() => {
		return {
			name: [
				{ required: true, message: t('namePlaceholder'), trigger: 'blur' },

			]
			,
			cate_id: [
				{ required: true, message: t('cateIdPlaceholder'), trigger: 'blur' },

			]
			,

			// image: [
			// 	{ required: true, message: t('imagePlaceholder'), trigger: 'blur' },
			// ]
			// ,
			// images: [
			// 	{ required: true, message: t('imagesPlaceholder'), trigger: 'blur' },

			// ]
			// ,
			startime: [
				{ required: true, message: t('startimePlaceholder'), trigger: 'blur' },

			]
			,
			endtime: [
				{ required: true, message: t('endtimePlaceholder'), trigger: 'blur' },

			]
			,
			address: [
				{ required: true, message: t('addressPlaceholder'), trigger: 'blur' },

			]
			,
			content: [
				{ required: true, message: t('contentPlaceholder'), trigger: 'blur' },

			]
			,
			sales: [
				{ required: true, message: t('salesPlaceholder'), trigger: 'blur' },

			]
			,
			status: [
				{ required: true, message: t('statusPlaceholder'), trigger: 'blur' },

			]
			,
			sort: [
				{ required: true, message: t('sortPlaceholder'), trigger: 'blur' },

			]
			,
			adddate: [
				{ required: true, message: t('adddatePlaceholder'), trigger: 'blur' },

			]

		}
	})

	const emit = defineEmits(['complete'])

const levellist = ref([]);
const loadMemberLevelList = (page: number = 1) => {
    getMemberLevelPageList({
        page: 1,
        limit: 100
    }).then(res => {
        levellist.value =res.data.data;
    })
}
loadMemberLevelList()
var optype= '';
	/**
	 * 确认
	 * @param formEl
	 */
	const confirm = async (formEl : FormInstance | undefined) => {
		if (loading.value || !formEl) return
		let save = formData.id ? editAct : addAct

		await formEl.validate(async (valid) => {
			if (valid) {
				loading.value = true

				let data = formData
data.optype = optype;
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


	const cateIdList = ref([] as any[])
	const setCateIdList = async () => {
		cateIdList.value = await (await getWithCateList({})).data
	}
	setCateIdList()
	
	const setFormData = async (row : any = null) => {
		optype = row.optype||"";
		
		Object.assign(formData, initialFormData)
		loading.value = true
		if (row) {
			const data = await (await getActInfo(row.id)).data
			if (data) Object.keys(formData).forEach((key : string) => {
				if (data[key] != undefined) formData[key] = data[key]
			})
		}
		loading.value = false
	}

	// 验证手机号格式
	const mobileVerify = (rule : any, value : any, callback : any) => {
		if (value && !/^1[3-9]\d{9}$/.test(value)) {
			callback(new Error(t('generateMobile')))
		} else {
			callback()
		}
	}

	// 验证身份证号
	const idCardVerify = (rule : any, value : any, callback : any) => {
		if (value && !/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)) {
			callback(new Error(t('generateIdCard')))
		} else {
			callback()
		}
	}

	// 验证邮箱号
	const emailVerify = (rule : any, value : any, callback : any) => {
		if (value && !/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
			callback(new Error(t('generateEmail')))
		} else {
			callback()
		}
	}

	// 验证请输入整数
	const numberVerify = (rule : any, value : any, callback : any) => {
		if (!Number.isInteger(value)) {
			callback(new Error(t('generateNumber')))
		} else {
			callback()
		}
	}

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