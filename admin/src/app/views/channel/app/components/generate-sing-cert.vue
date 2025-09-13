<template>
    <el-dialog v-model="showDialog" title="生成Android证书" width="50%" class="diy-dialog-wrap" :destroy-on-close="true">
        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">

            <el-form-item label="证书别名" prop="key_alias">
                <el-input v-model="formData.key_alias" clearable placeholder="" class="input-width" />
                <div class="form-tip">只支持字母，从证书文件中读取证书时需要别名</div>
            </el-form-item>

            <el-form-item label="证书密码" prop="key_password">
                <el-input v-model="formData.key_password" clearable placeholder="" class="input-width" />
                <div class="form-tip">只支持字母或数字，密码至少 6 位，设置好后请牢记密码</div>
            </el-form-item>

            <el-form-item label="证书库密码" prop="store_password">
                <el-input v-model="formData.store_password" clearable placeholder="" class="input-width" />
            </el-form-item>

            <el-form-item label="有效期" prop="limit">
                <div class="flex items-center">
                    <el-input v-model="formData.limit" clearable placeholder="" class="w-[100px]" />
                    <div class="form-tip ml-2">年</div>
                </div>
                <div class="form-tip">限 1 - 100 年之间</div>
            </el-form-item>

            <div class="text-primary cursor-pointer pl-[120px] my-[10px]" @click="moreInfo = !moreInfo">
                {{ moreInfo ? '点击收起' : '点击展开填写更多信息 '}}
            </div>

            <view v-show="moreInfo">
                <el-form-item label="域名">
                    <el-input v-model="formData.cn" clearable placeholder="" class="input-width" />
                </el-form-item>

                <el-form-item label="组织名称">
                    <el-input v-model="formData.o" clearable placeholder="" class="input-width" />
                    <div class="form-tip">如公司名称或者其他名称</div>
                </el-form-item>

                <el-form-item label="部门">
                    <el-input v-model="formData.ou" clearable placeholder="" class="input-width" />
                    <div class="form-tip">部门名称，如 IT 部、研发部等。</div>
                </el-form-item>

                <el-form-item label="国家地区">
                    <el-input v-model="formData.c" clearable placeholder="" class="input-width" />
                    <div class="form-tip">输入国家/地区代号（两个字母），中国为CN</div>
                </el-form-item>

                <el-form-item label="省份">
                    <el-input v-model="formData.st" clearable placeholder="" class="input-width" />
                    <div class="form-tip">所在省份名称，如Beijing</div>
                </el-form-item>

                <el-form-item label="城市">
                    <el-input v-model="formData.l" clearable placeholder="" class="input-width" />
                    <div class="form-tip">所在城市名称，如Beijing</div>
                </el-form-item>
            </view>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">取消</el-button>
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">生成</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import type { FormInstance } from 'element-plus'
import { generateSingCert } from '@/app/api/app'
import { img } from '@/utils/common'

const showDialog = ref(false)
const moreInfo = ref(false)
const loading = ref(false)

const initialFormData = {
    key_alias: '',
    key_password: '',
    store_password: '',
    limit: 30,
    cn: '',
    o: '',
    ou: '',
    c: '',
    st: '',
    l: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        key_alias: [
            { required: true, message: '请输入证书别名', trigger: 'blur' }
        ],
        key_password: [
            { required: true, message: '请输入证书密码', trigger: 'blur' }
        ],
        store_password: [
            { required: true, message: '请输入证书库密码', trigger: 'blur' }
        ],
        limit: [
            { required: true, message: '请输入有效期', trigger: 'blur' },
            {
                trigger: 'blur',
                validator: (rule: any, value: any, callback: any) => {
                    if (isNaN(value) || !/^\d{0,10}$/.test(value)) {
                        callback(new Error('有效期必须是数字'))
                    } else if (value < 0) {
                        callback(new Error('有效期必须为 1 - 100 之间的数字'))
                    } else if (value > 100) {
                        callback(new Error('有效期必须为 1 - 100 之间的数字'))
                    } else {
                        callback()
                    }
                }
            }
        ],
        organization_name: [
            { required: true, message: '请输入所有者', trigger: 'blur' }
        ]
    }
})

const confirm = async (formEl: FormInstance | undefined) => {
    if (formEl) {
        await formEl.validate()
        loading.value = true

        generateSingCert(formData).then(res => {
            loading.value = false
            showDialog.value = false
            window.open(img(res.data), '_blank')
        })
    }
}

const open = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    showDialog.value = true
}

defineExpose({
    open
})
</script>

<style lang="scss" scoped></style>
