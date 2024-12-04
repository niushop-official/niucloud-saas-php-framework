<template>
    <!--编辑等级-->
    <div class="main-container">

        <el-card class="card !border-none" shadow="never">
            <el-page-header :content="pageName" :icon="ArrowLeft" @back="back()" />
        </el-card>

        <el-card class="box-card mt-[15px] !border-none" shadow="never" v-loading="loading">
            <el-form class="page-form" :model="formData" label-width="120px" ref="formRef" :rules="formRules">
                <h3 class="panel-title !text-sm">{{ t('basicInfo') }}</h3>

                <el-form-item :label="t('levelName')" prop="level_name">
                    <el-input v-model.trim="formData.level_name" :placeholder="t('levelNamePlaceholder')" class="input-width" maxlength="20" show-word-limit clearable />
                </el-form-item>
                <el-form-item :label="t('remark')" prop="remark">
                    <el-input v-model.trim="formData.remark" type="textarea" :placeholder="t('remarkPlaceholder')" class="input-width" clearable rows="4" maxlength="200" show-word-limit />
                </el-form-item>
                <el-form-item :label="t('growth')" prop="growth">
                    <div>
                        <div class="w-[150px]">
                            <el-input v-model.number.trim="formData.growth" :placeholder="t('growthPlaceholder')" clearable />
                        </div>
                        <div class="text-sm text-gray-400 mb-[5px]">{{ t('growthTips') }}</div>
                    </div>
                </el-form-item>
            </el-form>

            <h3 class="panel-title !text-sm">{{ t('levelBenefits') }}</h3>
            <div class="pl-[100px]">
                <member-benefits v-if="!loading" ref="benefitsRef" v-model="formData.level_benefits"/>
            </div>

            <h3 class="panel-title !text-sm">{{ t('levelGift') }}</h3>
            <div class="pl-[100px]">
                <member-gift v-if="!loading" ref="giftRef" v-model="formData.level_gifts"/>
            </div>

        </el-card>

        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" :loading="saveLoading" @click="save(formRef)">{{ t('save') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { FormInstance, FormRules } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import memberBenefits from '@/app/views/member/components/member-benefits.vue'
import memberGift from '@/app/views/member/components/member-gift.vue'
import { getMemberLevelInfo, addMemberLevel, updateMemberLevel, getMemberLevelAll } from '@/app/api/member'
import Test from '@/utils/test'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title

const back = () => {
    router.push('/member/level')
}

const benefitsRef = ref(null)
const giftRef = ref(null)
const loading = ref(true)
const growthInterval = ref({ min: 0, max: 0 })

const formData = reactive<Record<string, any>>({
    level_id: 0,
    level_name: '',
    remark: '',
    growth: '',
    level_benefits: {},
    level_gifts: {}
})

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = reactive<FormRules>({
    level_name: [
        { required: true, message: t('levelNamePlaceholder'), trigger: 'blur' }
    ],
    growth: [
        { required: true, message: t('growthPlaceholder'), trigger: 'blur' },
        {
            validator: (rule: any, value: any, callback: any) => {
                if (!Test.digits(formData.growth)) {
                    callback(t('growthFormatError'))
                }
                if (formData.growth <= 0) {
                    callback(t('growthNeedGt') + 0)
                }
                if (growthInterval.value.min && formData.growth <= growthInterval.value.min) {
                    callback(t('growthNeedGt') + growthInterval.value.min)
                }
                if (growthInterval.value.max && formData.growth >= growthInterval.value.max) {
                    callback(t('growthNeedLt') + growthInterval.value.max)
                }
                callback()
            }
        }
    ]
})

if (route.query.id) {
    getMemberLevelInfo(route.query.id).then(({ data }) => {
        Object.assign(formData, data)

        getMemberLevelAll().then(({ data }) => {
            let index = 0
            data.forEach((item, i) => {
                item.level_id == formData.level_id && (index = i)
            })
            data[index - 1] && (growthInterval.value.min = data[index - 1].growth)
            data[index + 1] && (growthInterval.value.max = data[index + 1].growth)
        })
        loading.value = false
    })
} else {
    getMemberLevelAll().then(({ data }) => {
        data[data.length - 1] && (growthInterval.value.min = data[data.length - 1].growth)
    })
    loading.value = false
}

const saveLoading = ref(false)
/**
 * 保存
 */
const save = async (formEl: FormInstance | undefined) => {
    if (saveLoading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            if (!await benefitsRef.value?.verify()) return
            if (!await giftRef.value?.verify()) return

            saveLoading.value = true
            const save = formData.level_id ? updateMemberLevel : addMemberLevel
            save(formData).then(() => {
                router.push({ path: '/member/level' })
            }).catch(() => {
                saveLoading.value = false
            })
        }
    })
}
</script>

<style lang="scss" scoped></style>
