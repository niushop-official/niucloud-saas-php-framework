<template>
    <div class="main-container">
        <el-form class="page-form page-form--stacked form-page form-page--narrow" :model="formData" :rules="formRules" label-position="top" ref="formRef" v-loading="loading">
            <section class="form-section form-section--has-header">
                <div class="form-section__header">
                    <h3 class="form-section__title">地图类型</h3>
                </div>
                <div class="form-section__body map-type-list">
                    <div v-for="item in mapTypeList" :key="item.value"
                         class="map-type-item" :class="{ 'is-active': formData.map_type === item.value }"
                         @click="formData.map_type = item.value">
                        <el-icon class="map-type-icon">
                            <component :is="item.icon"/>
                        </el-icon>
                        <div class="flex-1 min-w-0 ml-[10px]">
                            <div class="flex items-center min-w-0">
                                <span class="text-[14px] font-bold leading-[22px] truncate">{{ item.name }}</span>
                                <el-tag v-if="formData.map_type === item.value" type="primary" size="small" class="ml-[6px] shrink-0">当前</el-tag>
                            </div>
                            <div class="text-[12px] leading-[18px] text-[var(--el-text-color-secondary)] mt-[2px] truncate">{{ item.desc }}</div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="form-section form-section--has-header">
                <div class="flex items-center form-section__header">
                     <el-icon class="text-[20px]">
                         <component :is="formData.map_type === 'tencent' ? Location : MapLocation"/>
                     </el-icon>
                     <h3 class="form-section__title !leading-[17px] !ml-[5px]">
                         {{ formData.map_type === 'tencent' ? '腾讯地图配置' : '天地图配置' }}
                     </h3>
                 </div>
                 <div class="form-section__body">
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
                                <div class="form-tip">天地图服务器端API密钥，用于后端地理编码等服务，请求从业务服务器发起，不支持前端地图瓦片加载与 JS API 渲染。</div>
                                <div class="form-tip">使用场景：如地理编码、逆地理编码、坐标转换、批量 POI 查询等。</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="天地图浏览器端KEY" prop="tianditu_map_web_key">
                            <div>
                                <div class="flex items-center">
                                    <el-input v-model.trim="formData.tianditu_map_web_key" class="input-width" clearable />
                                    <span class="ml-2 cursor-pointer secret-btn" @click="secretFn('https://cloudcenter.tianditu.gov.cn/center/development/myApp')">获取密钥</span>
                                </div>
                                <div class="form-tip">天地图浏览器端API密钥，用于前端加载地图，不可用于后端接口鉴权。</div>
                                <div class="form-tip">使用场景：展示地图瓦片、实现地图交互（缩放、拖拽、图层切换、标注、可视化展示、地图选位置等）。</div>
                            </div>
                        </el-form-item>
                    </template>
                    <el-form-item :label="t('isOpen')" prop="is_open">
                        <el-switch v-model="formData.is_open" :active-value="1" :inactive-value="0" />
                    </el-form-item>
                    <el-form-item :label="t('validTime')" prop="valid_time">
                        <el-input v-model.trim="formData.valid_time" class="!w-[120px]" />
                        <span class="ml-[10px]">{{ t('minutes') }}</span>
                        <div class="form-tip">{{ t('validTimeTips') }}</div>
                    </el-form-item>
                 </div>
            </section>
        </el-form>

        <div class="fixed-footer-wrap">
            <div class="fixed-footer fixed-footer--form">
                <div class="fixed-footer__inner fixed-footer__inner--narrow">
                    <el-button type="primary" :loading="loading" @click="save(formRef)">{{ t('save') }}</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import { t } from '@/lang'
import { setMap, getMap } from '@/app/api/sys'
import { FormInstance } from 'element-plus'
import { MapLocation, Location } from '@element-plus/icons-vue'

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

const mapTypeList = [
    {
        value: 'tianditu',
        name: '天地图',
        desc: '国家地理信息公共服务平台 Web API 4.0',
        icon: MapLocation
    },
    {
        value: 'tencent',
        name: '腾讯地图',
        desc: '腾讯位置服务 LBS WebService / JavaScript API',
        icon: Location
    }
]

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
})

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
    window.open('https://doc.press.niucloud.com/php/saas-framework/use/configFAQ/tencentMapKey.html')
}

/**
 * 点击访问密钥申请页
 */
const secretFn = (url: string) => {
    window.open(url)
}
</script>

<style lang="scss" scoped>
.tutorial-btn {
    color: var(--el-color-primary);
}

.secret-btn {
    color: var(--el-color-primary);
}

.map-type-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
}

.map-type-item {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    border: 1px solid var(--el-border-color);
    border-radius: 8px;
    cursor: pointer;
    transition: all .2s;
    background-color: var(--el-bg-color);

    &:hover {
        border-color: var(--el-color-primary-light-5);
    }

    &.is-active {
        border-color: var(--el-color-primary);
        background-color: var(--el-color-primary-light-9);
    }
}

.map-type-icon {
    font-size: 28px;
    flex-shrink: 0;
}
</style>
