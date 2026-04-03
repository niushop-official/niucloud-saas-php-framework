<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ t('mapSetting') }}</span>
            </div>

            <el-form class="page-form mt-[20px]" :model="formData" :rules="formRules" label-width="150px" ref="formRef" v-loading="loading">
                <el-form-item label="地图类型" prop="map_type">
                    <div>
                        <el-radio-group v-model="formData.map_type">
                            <el-radio label="tianditu">天地图</el-radio>
                            <el-radio label="tencent">腾讯地图</el-radio>
                        </el-radio-group>
                        <div class="text-sm text-gray-400 mt-[10px] leading-none">选择地图服务提供商</div>
                    </div>
                </el-form-item>

                <template v-if="formData.map_type === 'tencent'">
                    <el-form-item :label="t('mapKey')" prop="key">
                        <div>
                            <div class="flex items-center">
                                <el-input v-model.trim="formData.key" class="input-width" clearable />
                                <span class="ml-2 cursor-pointer tutorial-btn" @click="tutorialFn">{{ t('clickTutorial') }}</span>
                                <span class="ml-2 cursor-pointer secret-btn" @click="secretFn('https://lbs.qq.com/dev/console/key/manage')">{{ t('clickSecretKey') }}</span>
                            </div>
                        </div>
                    </el-form-item>
                </template>

                <template v-if="formData.map_type === 'tianditu'">
                    <el-form-item label="天地图服务端KEY" prop="tianditu_map_key">
                        <div>
                            <div class="flex items-center">
                                <el-input v-model.trim="formData.tianditu_map_key" class="input-width" clearable />
                                <span class="ml-2 cursor-pointer secret-btn" @click="secretFn('https://cloudcenter.tianditu.gov.cn/center/development/myApp')">获取密钥</span>
                            </div>
                            <div class="text-sm text-gray-400 mt-[10px] leading-none">天地图服务器端API密钥，用于后端地理编码等服务，请求从业务服务器发起，不支持前端地图瓦片加载与 JS API 渲染。</div>
                            <div class="text-sm text-gray-400 mt-[10px] leading-none">使用场景：如地理编码、逆地理编码、坐标转换、批量 POI 查询等。</div>
                        </div>
                    </el-form-item>
                    <el-form-item label="天地图浏览器端KEY" prop="tianditu_map_web_key">
                        <div>
                            <div class="flex items-center">
                                <el-input v-model.trim="formData.tianditu_map_web_key" class="input-width" clearable />
                                <span class="ml-2 cursor-pointer secret-btn" @click="secretFn('https://cloudcenter.tianditu.gov.cn/center/development/myApp')">获取密钥</span>
                            </div>
                            <div class="text-sm text-gray-400 mt-[10px] leading-none">天地图浏览器端API密钥，用于前端加载地图，不可用于后端接口鉴权。</div>
                            <div class="text-sm text-gray-400 mt-[10px] leading-none">使用场景：展示地图瓦片、实现地图交互（缩放、拖拽、图层切换、标注、可视化展示、地图选位置等）。</div>
                        </div>
                    </el-form-item>
                </template>
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
    map_type: 'tencent',
    key: '',
    tianditu_map_key: '',
    tianditu_map_web_key: '',
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
    Object.assign(formData, service_data)
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
const secretFn = (url: string) => {
    window.open(url)
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
