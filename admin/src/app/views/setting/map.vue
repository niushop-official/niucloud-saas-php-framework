<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ t('mapSetting') }}</span>
            </div>

            <el-form class="page-form mt-[20px]" :model="formData" :rules="formRules" label-width="150px" ref="formRef" v-loading="loading">
                <el-form-item :label="t('mapKey')" prop="key">
                    <el-input v-model.trim="formData.key" class="input-width" clearable />
                    <span class="ml-2 cursor-pointer tutorial-btn" @click="tutorialFn">{{ t('clickTutorial') }}</span>
                    <span class="ml-2 cursor-pointer secret-btn" @click="secretFn">{{ t('clickSecretKey') }}</span>
                </el-form-item>
                <el-form-item :label="t('isOpen')" prop="is_open">
                    <el-switch v-model="formData.is_open" :active-value="1" :inactive-value="0" />
                </el-form-item>
                <el-form-item :label="t('validTime')" prop="valid_time">
                    <el-input v-model.trim="formData.valid_time" class="!w-[120px]" />
                    <span class="ml-[10px]">{{ t('minutes') }}</span>
                </el-form-item>
                <div class="ml-[150px] text-sm text-gray-400">{{ t('validTimeTips') }}</div>
            </el-form>
        </el-card>

        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" :loading="loading" @click="save(formRef)">{{ t('save') }}</el-button>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { reactive, ref,computed } from 'vue'
import { t } from '@/lang'
import { setMap, getMap } from '@/app/api/sys'
import { FormInstance } from 'element-plus'

const loading = ref(true)
const formRef = ref<FormInstance>()
const formData = reactive({
    key: '',
    is_open: 0,
    valid_time: 0
})

const formRules = computed(() => {
    return {
        valid_time: [
            {
                required: true,
                trigger: 'blur',
                validator: (rule: any, value: any, callback: any) => {
                    if (value === '') {
                        callback(new Error(t('validTimePlaceholder')))
                    } else if (isNaN(value) || !/^\d{0,10}$/.test(value)) {
                        callback(new Error(t('validTimeFormatTips')))
                    } else if (value < 5) {
                        callback(new Error(t('validTimeNotZeroTips')))
                    } else {
                        callback()
                    }
                }
            }
        ],
    }
});

const setFormData = async () => {
    loading.value = true
    const service_data = await (await getMap()).data
    formData.key = service_data.key
    formData.is_open = service_data.is_open
    formData.valid_time = service_data.valid_time
    loading.value = false
}
setFormData()

/**
 * 保存
 */
const save = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true

            setMap(formData).then(() => {
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

/**
 * 点击访问教程
 */
const tutorialFn = () => {
    window.open('https://www.kancloud.cn/niucloud/niucloud-admin-develop/3214217')
}

/**
 * 点击访问腾讯地图
 */
const secretFn = () => {
    window.open('https://lbs.qq.com/dev/console/key/manage')
}
</script>

<style lang="scss" scoped>
    .tutorial-btn {
        color:var(--el-color-primary);
    }

    .secret-btn {
        color:var(--el-color-primary);
    }
</style>
