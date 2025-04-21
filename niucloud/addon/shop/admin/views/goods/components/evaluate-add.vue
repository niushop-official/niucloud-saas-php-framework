<template>
    <el-dialog v-model="showDialog" :title="formData.evaluate_id ? t('updateEvaluate') : t('addEvaluate')" width="700px" class="diy-dialog-wrap" :destroy-on-close="true">
        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
            <el-form-item :label="t('goodsInfo')" prop="goods_id">
                <goods-select-popup ref="goodsSelectPopupRef" v-model="formData.goods_id" :min="1" :max="1" />
            </el-form-item>
            <el-form-item :label="t('memberHead')" prop="member_head">
                <upload-image v-model="formData.member_head" />
            </el-form-item>
            <el-form-item :label="t('memberName')" prop="member_name">
                <el-input v-model.trim="formData.member_name" clearable maxlength="20" show-word-limit :placeholder="t('memberNamePlaceholder')" class="input-width" />
            </el-form-item>
            <el-form-item :label="t('createTime')" prop="create_time">
                <div class="input-width">
                    <el-date-picker clearable :disabled-date="disabledDateFn" v-model="formData.create_time" type="datetime" :placeholder="t('createTimePlaceholder')" value-format="YYYY-MM-DD HH:mm:ss" />
                </div>
            </el-form-item>

            <el-form-item :label="t('isAnonymous')" clearable prop="is_anonymous">
                <el-radio-group v-model="formData.is_anonymous" :placeholder="t('isAnonymousPlaceholder')" clearable>
                    <el-radio :label="1">{{ t('anonymous') }}</el-radio>
                    <el-radio :label="2">{{ t('notAnonymous') }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="t('scores')" prop="scores">
                <el-rate  v-model="formData.scores" />
            </el-form-item>
            <el-form-item :label="t('content')" prop="content">
                <el-input v-model.trim="formData.content"  maxlength="200" show-word-limit type="textarea" rows="4" clearable :placeholder="t('contentPlaceholder')" class="input-width" />
            </el-form-item>

            <el-form-item :label="t('images')">
                <upload-image v-model="formData.image_arr" :limit="9" />
            </el-form-item>

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{ t('confirm') }}</el-button>
            </span>
        </template>

    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import goodsSelectPopup from '@/addon/shop/views/goods/components/goods-select-popup.vue'
import type { FormInstance } from 'element-plus'
import { addEvaluate } from '@/addon/shop/api/goods'

const showDialog = ref(false)
const loading = ref(false)

const disabledDateFn = (date)=>{
    return date.getTime() > Date.now()
}

/**
 * 表单数据
 */
const initialFormData = {
    goods_id: [],
    member_head: '',
    member_name: '',
    content: '',
    images: [],
    image_arr: '',
    is_anonymous: 1,
    scores: 5,
    create_time: ''
}

const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        goods_id: [
            { required: true, message: t('goodsIdPlaceholder'), trigger: 'blur' }
        ],
        member_head: [
            { required: true, message: t('memberHeadPlaceholder'), trigger: 'blur' }
        ],
        member_name: [
            { required: true, message: t('memberNamePlaceholder'), trigger: 'blur' }
        ],
        content: [
            { required: true, message: t('contentPlaceholder'), trigger: 'blur' }
        ],
        images: [
            { required: true, message: t('imagesPlaceholder'), trigger: 'blur' }
        ],
        create_time: [
            { required: true, message: t('createTimePlaceholder'), trigger: 'blur' }
        ]
    }
})

const emit = defineEmits(['complete'])
const goodsSelectPopupRef: any = ref(null)

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true
            if (formData.image_arr) formData.images = formData.image_arr.split(',')
            const data = formData
            if (data.goods_id.length > 0) data.goods_id = data.goods_id[0]

            addEvaluate(data).then(res => {
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

const setFormData = async (row: any = null) => {
    Object.keys(formData).forEach((key: string) => {
        formData[key] = ''
    })
    formData.is_anonymous = 1
    formData.goods_id = []
    formData.scores = 5
    loading.value = false
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
