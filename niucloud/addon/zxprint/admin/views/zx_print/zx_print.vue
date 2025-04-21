<template>
    <div class="main-container">
        <el-form :model="formData" label-width="150px" ref="formRef" class="page-form" v-loading="loading">
			<el-tabs v-model="activeName" @tab-click="handleClick">
			    <el-tab-pane label="基本参数" name="d">
					<el-card class="box-card !border-none" shadow="never">
					    <el-form-item label="小票名称">
						    <div> 
						        <el-input v-model="formData.title" placeholder="请填写小票名称" class="input-width" clearable>
								</el-input>
						        <p class="text-[12px] text-[#a9a9a9]"></p>
						    </div>
						</el-form-item>
					    <el-form-item label="终端编号">
						    <div> 
						        <el-input v-model="formData.machine_code" placeholder="请填写终端编号" class="input-width" clearable>
								</el-input>
						        <p class="text-[12px] text-[#a9a9a9]">请填写终端编号</p>
						    </div>
						</el-form-item>
						<el-form-item label="打印密钥">
						    <div> 
						        <el-input v-model="formData.private_key" placeholder="请填写打印机密钥" class="input-width" clearable>
								</el-input>
						        <p class="text-[12px] text-[#a9a9a9]">请填写打印机密钥</p>
						    </div>
						</el-form-item>
						<el-form-item label="应用I D">
						    <div> 
						        <el-input v-model="formData.client_id" placeholder="请填写应用ID" class="input-width" clearable>
								</el-input>
						        <p class="text-[12px] text-[#a9a9a9]">应用id在易联云-开发者中心-应用中心获取</p>
						    </div>
						</el-form-item>
						<el-form-item label="应用I密钥">
						    <div> 
						        <el-input v-model="formData.client_secret" placeholder="请填写应用密钥" class="input-width" clearable>
								</el-input>
						        <p class="text-[12px] text-[#a9a9a9]">apiKey在易联云-开发者中心-应用中心获取</p>
						    </div>
						</el-form-item>
						<el-form-item label="自动打印">
						    <div> 
						        <el-radio v-model="formData.auto_print" label="1">启用</el-radio>
						        <el-radio v-model="formData.auto_print" label="2">禁用</el-radio>
						        <p class="text-[12px] text-[#a9a9a9]">订单付款后自动打印小票，默认关闭</p>
						    </div>
						</el-form-item>
						<el-form-item label="启用状态">
						    <div> 
						        <el-radio v-model="formData.status" label="1">启用</el-radio>
						        <el-radio v-model="formData.status" label="2">关闭</el-radio>
						        <p class="text-[12px] text-[#a9a9a9]">关闭和开启打印机的使用，默认关闭</p>
						    </div>
						</el-form-item>
						
					</el-card>
				</el-tab-pane>
				<el-tab-pane label="模板参数" name="t">
					<el-card class="box-card !border-none" shadow="never">
						<el-form-item label="买家留言">
						    <div> 
						        <el-radio v-model="formData.show_buyer_message" label="1">启用</el-radio>
						        <el-radio v-model="formData.show_buyer_message" label="2">禁用</el-radio>
						        <p class="text-[12px] text-[#a9a9a9]">可将订单备注留言打印再小票上</p>
						    </div>
						</el-form-item>
						<el-form-item label="条码显示">
						    <div> 
						        <el-radio v-model="formData.show_qrcode" label="1">启用</el-radio>
						        <el-radio v-model="formData.show_qrcode" label="2">关闭</el-radio>
						        <p class="text-[12px] text-[#a9a9a9]">可将二维码打印在小票上，二维码内容请开启后设置</p>
						    </div>
						</el-form-item>
						<template v-if="formData.show_qrcode == 1">
						<el-form-item label="显示名称">
						    <div> 
						        <el-input v-model="formData.qrcode_name" placeholder="请填写二维码显示名称" class="input-width" clearable>
								</el-input>
						        <p class="text-[12px] text-[#a9a9a9]"></p>
						    </div>
						</el-form-item>
						<el-form-item label="显示内容">
						    <div> 
						        <el-input v-model="formData.qrcode_content" placeholder="请填写二维码内容" class="input-width" clearable>
								</el-input>
						        <p class="text-[12px] text-[#a9a9a9]"></p>
						    </div>
						</el-form-item>
						</template>
						<el-form-item label="底部内容">
						    <div> 
						        <el-input v-model="formData.bottom" placeholder="请填写小票底部内容" class="input-width" clearable>
								</el-input>
						        <p class="text-[12px] text-[#a9a9a9]"></p>
						    </div>
						</el-form-item>
					</el-card>
				</el-tab-pane>
			  </el-tabs>
        </el-form>

        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" :loading="loading" @click="save(formRef)">立即保存</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref,reactive } from 'vue'
import { getsetting, setting } from '@/addon/zxprint/api/zx_print'
import { FormInstance, FormRules } from 'element-plus'
import QRCode from 'qrcode'

const wapImage = ref('')
const wapurl = ref('')
const wapstatus = ref('')
const loading = ref(true)
const activeName = ref("d")

const formData = reactive<Record<string, string>>({
    title:'',
    machine_code: '',
    private_key:'',
	client_id:'',
	client_secret: '',
	auto_print:'1',
	status:'1',
	show_buyer_message:'1',
	show_qrcode:'1',
	qrcode_name:'',
	qrcode_content:'',
	bottom:''
})

const handleClick =(tab:any, event:any)=>{
        console.log(tab, event);
}

const setFormData = async () => {
    loading.value = false
    const data = await (await getsetting()).data
     data.forEach((item: any) => {
         // 获取当前对象的 value_type 和 value_code
         const { value_type, value_code } = item;
         // 检查 formData 中是否存在与 value_type 对应的属性
         if (formData.hasOwnProperty(value_type)) {
             // 如果存在，则将 value_code 值填充到 formData 中对应的属性中
             formData[value_type] = value_code;
         }
         
     });
    
}
setFormData();


const formRef = ref<FormInstance>()

/**
 * 保存
 */
const save = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    loading.value = true
    setting(formData).then(() => {
        loading.value = false
        setFormData()
    }).catch(() => {
        loading.value = false
    })
}
</script>

<style lang="scss" scoped>
</style>
