<template>
    <el-dialog v-model="showDialog" :title="step == 'select' ? t('addCard') : t('卡密制作中，请稍等...')" width="450px" class="diy-dialog-wrap" :destroy-on-close="true" :close-on-press-escape="false" :close-on-click-modal="false">
        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-show="step == 'select'">

            <el-form-item :label="t('制卡方式')" prop="giftcard_id">
                <el-radio-group v-model="formData.make_card_way">
                    <el-radio label="auto">{{ t('在线制卡') }}</el-radio>
                    <el-radio label="import">{{ t('导入制卡') }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <template v-if="formData.make_card_way == 'auto'">

                <template v-if="formData.card_right_type == 'balance'">
                    <el-table :data="formData.balance_json" size="large" max-height="400">

                        <el-table-column prop="balance" :label="t('面值')" min-width="120" :show-overflow-tooltip="true">
                            <template #default="{ row }">
                                <div>￥{{ row.balance }}</div>
                            </template>
                        </el-table-column>

                        <el-table-column prop="count" :label="t('制卡数量')" min-width="120">
                            <template #default="{ row }">
                                <el-input v-model.trim="row.count" clearable placeholder="0" class="!w-[140px]" maxlength="4" @keyup="filterNumber($event)">
                                    <template #append>{{ t('张') }}</template>
                                </el-input>
                            </template>
                        </el-table-column>

                    </el-table>
                    <div class="mt-[10px] text-[12px] text-[#999] leading-[20px]">{{ t('在线制卡最多单次制作1千张，卡号及密钥按照制卡规则生成') }}</div>
                </template>

                <el-form-item v-else-if="formData.card_right_type == 'goods'" :label="t('制卡数量')" prop="total_count">
                    <div>
                        <el-input v-model.trim="formData.total_count" clearable placeholder="0" class="!w-[140px]" maxlength="4" @keyup="filterNumber($event)">
                            <template #append>{{ t('张') }}</template>
                        </el-input>
                        <div class="mt-[10px] text-[12px] text-[#999] leading-[20px]">{{ t('在线制卡最多单次制作1千张，卡号及密钥按照制卡规则生成') }}</div>
                    </div>
                </el-form-item>

            </template>

            <el-form-item :label="t('上传文件')" prop="import_path" v-show="formData.make_card_way == 'import'">
                <div>
                    <upload-file v-model="formData.import_path" api="sys/document/excel" />
                    <div @click="examineTemplate" class="form-tip mt-[5px] !text-[var(--el-color-primary)] cursor-pointer">
                        {{ t('下载卡密模板') }}
                    </div>
                    <div class="mt-[10px] text-[12px] text-[#999] leading-[20px]">{{ t('导入制卡需上传卡密文件，注意不要重复，且单次最多制作1千张') }}</div>
                </div>
            </el-form-item>

        </el-form>

        <div class="adding-wrap" v-show="step == 'adding'">
            <el-progress :percentage="percentage" />
        </div>

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
import { FormInstance,ElMessage } from 'element-plus'
import { filterNumber,deepClone } from '@/utils/common'
import { addGiftcardMake,getGiftcardInfo } from '@/addon/shop_giftcard/api/giftcard'
import { makeCard } from '@/addon/shop_giftcard/api/card'
import { useRoute } from 'vue-router'

const route = useRoute()
const showDialog = ref(false)
const loading = ref(false)
const step = ref('select')
const percentage: any = ref(0) // 添加卡密进度
const importedCount: any = ref(0) // 已添加卡密数量
const repeat = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    giftcard_id: 0,
    make_card_way: 'auto',
    balance_json: [],
    card_right_type: 'balance',
    total_count: '',
    import_path: '',
}

const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

formData.giftcard_id = route.query.giftcard_id || 0

const giftcardInfo:any = ref(null)

const getGiftcardInfoFn = () => {
    getGiftcardInfo(formData.giftcard_id).then((res: any) => {
        if (res.data) {
            giftcardInfo.value = res.data;
            formData.balance_json = deepClone(giftcardInfo.value.balance_json);
            formData.card_right_type = giftcardInfo.value.card_right_type;
            if (formData.card_right_type == 'balance') {
                formData.balance_json.forEach((item: any) => {
                    item.count = ''; // 要制卡的数量
                    item.make_count = 0; // 制卡成功的数量
                    item.total_count = 0; // 总数
                    item.status = 'no_start';
                })
            }
        }
    })
}

getGiftcardInfoFn();

// 表单验证规则
const formRules = computed(() => {
    return {
        total_count: [
            {
                required: true,
                trigger: 'blur',
                validator: (rule: any, value: any, callback: any) => {
                    if (formData.make_card_way == 'auto') {
                        if (value === '') {
                            callback(new Error(t('请输入制卡数量')))
                        } else if (isNaN(value) || !/^\d{0,10}$/.test(value)) {
                            callback(new Error(t('制卡数量格式输入错误')))
                        } else if (value < 0) {
                            callback(new Error(t('制卡数量不能小于0')))
                        } else if (value == 0) {
                            callback(new Error(t('制卡数量必须大于0')))
                        } else if (value > 1001) {
                            callback(new Error(t('单次制作数量不能超出一千张')))
                        }
                    }
                    callback()
                }

            }
        ],
        import_path: [
            {
                required: true,
                trigger: 'blur',
                validator: (rule: any, value: any, callback: any) => {
                    if (formData.make_card_way == 'import') {
                        if (value === '') {
                            callback(new Error(t('请上传卡密文件')))
                        }
                    }
                    callback()
                }

            }
        ]
    }
})

const emit = defineEmits(['complete'])

const examineTemplate = ()=>{
    if(formData.card_right_type == 'balance') {
        window.open(`${import.meta.env.VITE_IMG_DOMAIN || location.origin}/addon/shop_giftcard/import/card_import_balance.xls`)
    } else if(formData.card_right_type == 'goods') {
        window.open(`${import.meta.env.VITE_IMG_DOMAIN || location.origin}/addon/shop_giftcard/import/card_import_goods.xls`)
    }
}

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate(async(valid) => {
        if (valid) {

            if (formData.make_card_way == 'auto' && formData.card_right_type == 'balance') {
                formData.total_count = 0;
                formData.balance_json.forEach((item: any) => {
                    if (item.count) {
                        item.total_count = parseInt(item.count);
                        formData.total_count += parseInt(item.count);
                    }
                })
                if (formData.total_count == 0) {
                    ElMessage({
                        type: 'warning',
                        message: `${ t('请输入制卡数量') }`
                    })
                    return;
                } else if (formData.total_count > 1000) {
                    ElMessage({
                        type: 'warning',
                        message: `${ t('单次制作数量不能超出一千张') }`
                    })
                    return;

                }
                formData.balance_json.forEach((item: any) => {
                    if (!item.count) {
                        item.count = 0;
                    }
                })

            }

            let data = formData

            loading.value = true
            if (repeat.value) return
            repeat.value = true

            addGiftcardMake(data).then((res: any) => {
                if (res.data.make_id) {
                    step.value = 'adding'
                    makeCardFn(res.data.make_id)
                }
            }).catch(err => {
                loading.value = false
                repeat.value = false
            })
        }
    })
}

const makeCardFn = (make_id: any)=> {
    makeCard({
        make_id,
        giftcard_id: formData.giftcard_id,
    }).then((res: any) => {
        let data = res.data;
        if (data) {
            importedCount.value = ref(data.success_count)
            if (data.total_count == 0 || data.success_count + data.fail_count == 0) {
                percentage.value = 100
            } else {
                percentage.value = ((data.success_count + data.fail_count) / data.total_count * 100).toFixed();
            }
            if (data.total_count == data.success_count + data.fail_count) {
                ElMessage({
                    type: 'success',
                    message: `${ t('制卡成功') }`
                })
                setTimeout(() => {
                    loading.value = false
                    showDialog.value = false
                    repeat.value = false
                    step.value = 'select'
                    percentage.value = 0
                    importedCount.value = 0
                    formData.balance_json = [];
                    formData.total_count = ''
                    formData.import_path = '';
                    emit('complete')
                }, 1000)
            } else {
                setTimeout(() => {
                    makeCardFn(make_id)
                }, 1000)
            }
        }
    }).catch(err => {
        loading.value = false
        repeat.value = false
    })
}

defineExpose({
    showDialog
})
</script>

<style lang="scss">
.diy-dialog-wrap .el-form-item__label{
    height: auto  !important;
}
</style>
