<template>
    <div>
        <el-dialog v-model="showDialog" :title="t('editMemberPricePopupTitle')" width="1100px" :destroy-on-close="true" :close-on-click-modal="false">

            <el-form :model="formData" label-width="120px" class="page-form">
                <el-form-item :label="t('memberDiscount')">
                    <div>
                        <el-radio-group v-model="formData.member_discount">
                            <el-radio label="">{{ t('nonparticipation') }}</el-radio>
                            <el-radio label="discount">{{ t('discount') }}</el-radio>
                            <el-radio label="fixed_discount">{{ t('fixedDiscount') }}</el-radio>
                        </el-radio-group>
                        <div class="text-[12px] text-[#999] leading-[20px]" v-if="formData.member_discount == 'discount'">{{t('discountHint')}}</div>
                    </div>
                </el-form-item>

                <el-form-item v-if="formData.member_discount == 'discount' && memberDiscountLevel.length">
                    <el-table :data="[{}]" size="large" v-loading="tableData.loading" max-height="450" @selection-change="handleSelectionChange">
                        <template #empty>
                            <span>{{ !tableData.loading ? t('emptyData') : '' }}</span>
                        </template>
                        <el-table-column fixed prop="sku_name" :label="t('memberLevel')" width="150" >
                            <template #default>
                                {{t('memberEnjoyDiscount')}}
                            </template>
                        </el-table-column>
                        <el-table-column v-for="(item,index) in memberDiscountLevel" :key="index" :label="item.level_name">
                            <template #default="{ row }">
                                {{item.level_benefits.discount.discount}}
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>

                <el-form-item v-if="formData.member_discount == 'fixed_discount'">
                  <el-table :data="[{}]" size="large" v-loading="tableData.loading" max-height="450" @selection-change="goodsListTableRef">
                    <template #empty>
                      <span>{{ !tableData.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column fixed prop="sku_name" :label="t('memberLevel')" width="150" >
                      <template #default>
                        {{t('memberEnjoyDiscount')}}
                      </template>
                    </el-table-column>

                    <el-table-column v-for="(item,index) in memberDiscountLevel" :key="index" :label="item.level_name">

                      <template #default="{ row }">
                          <el-input v-model.trim="item.fixed_discount" maxlength="8" clearable class="w-full"  @keyup="filterDigit($event)">
                            <template #append>{{t('discountUnit')}}</template>
                          </el-input>
                      </template>

                    </el-table-column>
                  </el-table>
                </el-form-item>

            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="save">{{ t('confirm') }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import { ref, reactive } from 'vue'
import { deepClone, filterDigit } from '@/utils/common'
import { ElMessage } from 'element-plus'
import { editGoodsMemberPrice } from '@/addon/tourism/api/tourism'

const goodsListTableRef = ref()
const formData: any = reactive({
    member_discount: '',
    fixed_discount: {}
})
const goods: any = reactive({})
const showDialog = ref(false)

const emit = defineEmits(['load'])

const tableData = reactive({
    loading: false,
    data: [],
    member_level: []
})

// 用于会员折扣展示
const memberDiscountLevel:any = ref([])
const show = (data: any, levelData: any) => {
    Object.assign(goods, data)
    tableData.member_level = []
    Object.assign(tableData.member_level, levelData)
    formData.member_discount = data.member_discount

    formData.fixed_discount = data.fixed_discount ? JSON.parse(data.fixed_discount) : ''

    memberDiscountLevel.value = deepClone(levelData)
    memberDiscountLevel.value.forEach((item: any, index: any, Array: any) => {
        if (!item.level_benefits || item.level_benefits == null) {
            Array[index].level_benefits = {
                discount: {
                    discount: '原价'
                }
            }
        } else if (item.level_benefits && item.level_benefits != null && !item.level_benefits.discount) {
            Array[index].level_benefits.discount = {
                discount: '原价'
            }
        } else if (item.level_benefits && item.level_benefits != null && item.level_benefits.discount && !item.level_benefits.discount.discount) {
            Array[index].level_benefits.discount.discount = '原价'
        } else {
            Array[index].level_benefits.discount.discount += '折'
        }
        Array[index].fixed_discount = formData.fixed_discount[`level_${item.level_id}`] != null ? formData.fixed_discount[`level_${item.level_id}`] : ''
    })

    showDialog.value = true
}

/** ******* 批量复选框-start *************/
const toggleCheckbox = ref()
// 复选框中间状态
const isIndeterminate = ref(false)
// 选中数据
const multipleSelection: any = ref([])

// 监听表格单行选中
const handleSelectionChange = (val: []) => {
    multipleSelection.value = deepClone(val)

    toggleCheckbox.value = false
    if (multipleSelection.value.length > 0 && multipleSelection.value.length < tableData.data.length) {
        isIndeterminate.value = true
    } else {
        isIndeterminate.value = false
    }

    if (multipleSelection.value.length == tableData.data.length) {
        toggleCheckbox.value = true
    }
}

/** ******* 批量复选框-end *************/
let saveLoad = false
const save = () => {
    formData.fixed_discount = {}
    if (formData.member_discount == 'fixed_discount') {
        let verify = true
        memberDiscountLevel.value.forEach((levelItem: any, levelIndex) => {
            if (verify) {
                if (levelItem.fixed_discount == '') {
                    verify = false
                    ElMessage.error(`[${levelItem.level_name}]的折扣不能为空`)
                }
                formData.fixed_discount[`level_${levelItem.level_id}`] = levelItem.fixed_discount
                if (parseFloat(levelItem.fixed_discount) <= 0) {
                    verify = false
                    ElMessage.error(`[${levelItem.level_name}]的折扣不能小于等于零`)
                }
                if (parseFloat(levelItem.fixed_discount) >= 10) {
                    verify = false
                    ElMessage.error(`[${levelItem.level_name}]的折扣不能大于等于10`)
                }
            }
        })
        if (!verify) return false
    }
    if (saveLoad) return false
    saveLoad = true

    editGoodsMemberPrice({
        goods_ids: goods.goods_id,
        goods_type: goods.goods_type,
        member_discount: formData.member_discount,
        fixed_discount: formData.fixed_discount
    }).then(res => {
        saveLoad = false
        showDialog.value = false
        emit('load')
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
