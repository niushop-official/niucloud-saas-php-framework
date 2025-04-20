<template>
    <div>
        <el-dialog v-model="showDialog" :title="t('editMemberPrice')" width="400px" :destroy-on-close="true">
            <el-form :model="saleArr" label-width="90px" ref="formRulesRef" :rules="rules">
                <el-form-item :label="t('daySetting')" class="items-center">
                    <el-radio-group v-model="saleArr.is_set" class="ml-4 input-width">
                        <el-radio :label="1" size="large">{{ saleArr.start_date }}</el-radio>
                        <el-radio :label="2" size="large">{{ t('dateRange') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="saleArr.is_set == 2" :label="t('startDate')" class="input-width" prop="start_date">
                    <el-date-picker type="date" v-model="saleArr.start_date" :placeholder="t('startDate')" value-format="YYYY-MM-DD" :disabled-date="disabledDate" />
                </el-form-item>
                <el-form-item v-if="saleArr.is_set == 2" :label="t('endDate')" class="input-width" prop="end_date">
                    <el-date-picker type="date" v-model="saleArr.end_date" :placeholder="t('endDate')" value-format="YYYY-MM-DD" :disabled-date="disabledDate" />
                </el-form-item>
                <el-form-item :label="t('memberPrice')" prop="member_price" class="items-center">
                    <el-radio-group v-model="saleArr.member_price" class="ml-4 input-width">
                        <el-radio :label="1" size="large">{{ t('involved') }}</el-radio>
                        <el-radio :label="0" size="large">{{ t('noInvolved') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="save(formRulesRef)">{{ t('confirm') }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import { ref, reactive, computed } from 'vue'
import { timeStampTurnTime } from '@/utils/common'
import { editGoodsDayMemberPrice } from '@/addon/tourism/api/tourism'
import type { FormInstance } from 'element-plus'

const goods: any = reactive({})
const showDialog = ref(false)

const emit = defineEmits(['load'])

const saleArr = reactive({
    is_set: 1,
    start_date: '',
    end_date: '',
    member_price: 0,
    goods_ids: ''
})

const show = (data: any, levelData: any) => {
    Object.assign(goods, data)
    saleArr.start_date = timeStampTurnTime(new Date().getTime() / 1000, 1)
    showDialog.value = true
}

const disabledDate = (time: any) => {
    return time.getTime() < Date.now()
}

const formRulesRef = ref<FormInstance>()
const rules = computed(() => {
    return {
        start_date: [
            { required: saleArr.is_set == 2, message: t('saleArrStartDatePlaceholder'), trigger: 'blur' }
        ],
        end_date: [
            { required: saleArr.is_set == 2, message: t('saleArrEndDatePlaceholder'), trigger: 'blur' }
        ]
    }
})
let saveLoad = false
const save = async(formEl: FormInstance | undefined) => {
    if (saveLoad || !formEl) return false
    await formEl.validate(async(valid) => {
        if (valid) {
            saveLoad = true

            saleArr.goods_ids = goods.goods_id

            editGoodsDayMemberPrice(saleArr).then(res => {
                saveLoad = false
                showDialog.value = false
                saleArr.end_date = ''
                saleArr.is_set = 1
                saleArr.member_price = 0
                emit('load')
            })
        }
    })
}

defineExpose({
    showDialog,
    show
})
</script>

<style lang="scss" scoped>
.form-item-wrap {
    margin-right: 10px !important;

    &.last-child {
        margin-right: 0 !important;
    }
}
</style>
