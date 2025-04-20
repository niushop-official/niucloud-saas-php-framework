<template>
  <div class="main-container">
    <el-card class="card !border-none mb-[15px]" shadow="never">
      <el-page-header :content="id ? t('editTicket') : t('addTicket') " :icon="ArrowLeft" @click="router.push(`/tourism/product/scenic/ticket?id=${scenic_id}`)" />
    </el-card>

    <el-card class="box-card !border-none" shadow="never">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane :label="t('basicData')" name="first"></el-tab-pane>
        <el-tab-pane :label="t('ticketPriceCalendar')" name="second" :disabled="formData.goods_id ? false : true"></el-tab-pane>
      </el-tabs>
      <div v-if="activeName == 'first'">
        <el-card class="box-card !border-none" shadow="never">
          <el-form :model="formData" label-width="180px" ref="formRef" :rules="formRules" class="page-form">
            <el-form-item :label="t('ticketName')" prop="goods_name">
              <el-input v-model.trim="formData.goods_name" clearable :placeholder="t('ticketNamePlaceholder')" class="input-width" />
            </el-form-item>
            <el-form-item :label="t('ticketPrice')" prop="price">
              <el-input v-model.trim="formData.price" clearable :placeholder="t('ticketPricePlaceholder')"
                        class="input-width" @keyup="filterDigit($event)" @blur="formData.price = $event.target.value" />
            </el-form-item>
            <el-form-item :label="t('ticketStock')" prop="stock">
              <el-input v-model.trim="formData.stock" clearable :placeholder="t('ticketStockPlaceholder')"
                        class="input-width" @keyup="filterNumber($event)"
                        @blur="formData.stock = $event.target.value" />
            </el-form-item>

            <el-form-item :label="t('memberDiscount')">
              <div>
                <el-radio-group v-model="formData.member_discount">
                  <el-radio label="">{{ t('nonparticipation') }}</el-radio>
                  <el-radio label="discount">{{ t('discount') }}</el-radio>
                  <el-radio label="fixed_discount">{{ t('fixedDiscount') }}</el-radio>
                </el-radio-group>
                <div class="text-[12px] text-[#999] leading-[20px]" v-if="formData.member_discount == 'discount'">
                  {{ t('discountHint') }}
                </div>
                <div class="text-[12px] text-[#999] leading-[20px]" v-if="formData.member_discount == 'fixed_discount'">
                  {{ t('fixedDiscountHint') }}
                </div>
              </div>
            </el-form-item>

            <el-form-item :label="t('ticketIllustrate')">
              <editor v-model="formData.goods_content" />
            </el-form-item>
            <el-form-item :label="t('buyDesc')">
              <editor v-model="formData.buy_info" />
            </el-form-item>
          </el-form>
        </el-card>
        <div class="fixed-footer-wrap">
          <div class="fixed-footer">
            <el-button type="primary" @click="onSave(formRef)">{{ t('save') }}</el-button>
            <el-button @click="back()">{{ t('returnToPreviousPage') }}</el-button>
          </div>
        </div>
      </div>
      <div v-if="activeName == 'second'">
        <el-card class="box-card !border-none" shadow="never">
          <el-calendar>
            <template #date-cell="{ data }">
              <div class="w-full h-full" :class="data.isSelected ? 'is-selected' : ''" @click="check(data)"
                   v-if="typeCheck(data) == true">
                <p>
                  {{ data.day.split('-').slice(1).join('-') }}
                </p>
                <div v-if="date_price_list && date_price_list[data.day]">
                  <p class="text-right text-gray-400 text-[14px] mt-[5px]">{{ date_price_list[data.day].price }}￥</p>
                  <p class="text-right text-gray-400 text-[12px] mt-[5px]">{{ date_price_list[data.day].sell_num }}/{{ date_price_list[data.day].stock_all }}</p>
                </div>
                <div v-else>
                  <p class="text-right text-gray-400 text-[14px] mt-[5px]">0.00￥</p>
                  <p class="text-right text-gray-400 text-[12px] mt-[5px]">0/0</p>
                </div>
              </div>
              <div class="w-full h-full" v-else>
                <p class="text-gray-400">
                  {{ data.day.split('-').slice(1).join('-') }}
                </p>
                <div v-if="date_price_list && date_price_list[data.day]">
                  <p class="text-right text-gray-400 text-[14px] mt-[5px]">{{ date_price_list[data.day].price }}￥</p>
                  <p class="text-right text-gray-400 text-[12px] mt-[5px]">{{ date_price_list[data.day].sell_num }}/{{ date_price_list[data.day].stock_all }}</p>
                </div>
                <div v-else>
                  <p class="text-right text-gray-400 text-[14px] mt-[5px]">0.00￥</p>
                  <p class="text-right text-gray-400 text-[12px] mt-[5px]">0/0</p>
                </div>
              </div>
            </template>
          </el-calendar>
        </el-card>
      </div>
    </el-card>

    <el-dialog v-model="showDialog" :title="t('editPrice')" width="400px" :destroy-on-close="true">
      <el-form :model="saleArr" label-width="90px" ref="formRulesRef" :rules="rules" class="page-form" v-loading="loading">
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
          <el-date-picker type="date" v-model="saleArr.end_date" :placeholder="t('endDate')" value-format="YYYY-MM-DD" :disabled-date="disabledDate"  />
        </el-form-item>
        <el-form-item :label="t('ticketPrice')" prop="price" class="input-width">
          <el-input v-model="saleArr.price" clearable :placeholder="t('ticketPricePlaceholder')" @keyup="filterDigit($event)" class="input-width" />
        </el-form-item>
        <el-form-item :label="t('memberPrice')" prop="member_price" class="items-center" v-if="formData.member_discount != ''">
          <el-radio-group v-model="saleArr.member_price" class="ml-4 input-width">
            <el-radio :label="1" size="large">{{ t('involved') }}</el-radio>
            <el-radio :label="0" size="large">{{ t('noInvolved') }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <template #footer>
          <span class="dialog-footer">
              <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
              <el-button type="primary" @click="saveSale(formRulesRef)">{{ t('confirm') }}</el-button>
          </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import type { FormInstance, TabsPaneContext } from 'element-plus'
import {
    getTicketInfo,
    addTicket,
    editTicket,
    editTicketCalendar,
    datePriceList
} from '@/addon/tourism/api/tourism'
import { useRoute, useRouter } from 'vue-router'
import { filterDigit, filterNumber } from '@/utils/common'

const route = useRoute()
const router = useRouter()
// const pageName = route.meta.title
const id: number = parseInt(route.query.id as string)
const scenic_id: number = parseInt(route.query.scenic_id as string)
const loading = ref(false)
const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {

}
const typeCheck = (item: any) => {
    const date = parseInt(new Date().getTime() / 1000) + ''
    const date1 = parseInt(new Date(item.day).getTime() / 1000) + ''
    const dayTime = date - (60 * 60 * 24)
    if (dayTime < date1) {
        return true
    }
    return false
}

const disabledDate = (time: any) => {
    return time.getTime() < Date.now()
}
/**
 * 表单数据
 */
const showDialog = ref(false)
const check = (res: any) => {
    saleArr.start_date = res.day
    saleArr.is_set = 1
    saleArr.price = ''
    saleArr.end_date = ''
    saleArr.member_price = 1
    showDialog.value = true
    if (date_price_list.value[res.day]) {
        saleArr.price = date_price_list.value[res.day].price
        saleArr.member_price = date_price_list.value[res.day].member_price
    }
}
const saleArr = reactive({
    is_set: 1,
    start_date: '',
    end_date: '',
    member_price: 1,
    price: ''
})

const initialFormData = {
    goods_id: 0,
    goods_name: '',
    buy_content: '',
    goods_content: '',
    price: '',
    is_vip: 0,
    stock: '',
    scenic_id: 0,
    member_discount: '',
    buy_info: ''
}

interface DatePriceType {
  price: string
  sell_num: number | string
  tock_all: number | string
  stock_all: number | string
}

const date_price_list = ref<DatePriceType[]>([])

const checkDatePrice = (id: number = 0) => {
    datePriceList({
        goods_id: id
    }).then(res => {
        date_price_list.value = res.data
    })
}
const formData: Record<string, any> = reactive({ ...initialFormData })
const setFormData = async(id: number = 0) => {
    Object.assign(formData, initialFormData)
    const data = await (await getTicketInfo(id)).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })
    formData.goods_id = id
    checkDatePrice(id)
}
if (id) setFormData(id)

const formRef = ref<FormInstance>()
// 表单验证规则
const formRules = computed(() => {
    return {
        goods_name: [
            { required: true, message: t('ticketNamePlaceholder'), trigger: 'blur' }
        ],
        price: [
            { required: true, message: t('ticketPricePlaceholder'), trigger: 'blur' },
            {
                trigger: 'blur',
                validator: (rule: any, value: any, callback: any) => {
                    if (parseFloat(value) > 99999999.99) {
                        callback(new Error(t('pricePlaceholder3')))
                    } else {
                        callback()
                    }
                }
            }
        ],
        stock: [
            { required: true, message: t('ticketStockPlaceholder'), trigger: 'blur' }
        ]
    }
})

const onSave = async(formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate(async(valid) => {
        if (valid) {
            loading.value = true
            formData.scenic_id = scenic_id
            const data = formData

            const save = formData.goods_id ? editTicket : addTicket
            save(data).then((res: any) => {
                if (res.code >= 0 && formData.goods_id == 0) {
                    formData.goods_id = res.data.id
                    activeName.value = 'second'
                } else {
                    history.back()
                }
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        }
    })
}
const goodsDay = ref(false)
const formRulesRef = ref<FormInstance>()
const rules = computed(() => {
    return {
        price: [
            { required: true, message: t('saleArrPricePlaceholder'), trigger: 'blur' },
            {
                trigger: 'blur',
                validator: (rule: any, value: any, callback: any) => {
                    if (value <= 0) {
                        callback(new Error(t('saleArrPriceNotZeroTips')))
                    } else if (parseFloat(value) > 99999999.99) {
                        callback(new Error(t('pricePlaceholder3')))
                    } else {
                        callback()
                    }
                }
            }
        ],
        start_date: [
            { required: saleArr.is_set == 2, message: t('saleArrStartDatePlaceholder'), trigger: 'blur' }
        ],
        end_date: [
            { required: saleArr.is_set == 2, message: t('saleArrEndDatePlaceholder'), trigger: 'blur' }
        ]
    }
})
const saveSale = async(formEl: FormInstance | undefined) => {
    if (goodsDay.value || !formEl) return
    await formEl.validate(async(valid) => {
        if (valid) {
            goodsDay.value = true
            saleArr.goods_id = formData.goods_id
            editTicketCalendar(saleArr).then(res => {
                checkDatePrice(formData.goods_id)
                showDialog.value = false
                goodsDay.value = false
            })
        }
    })
}

const back = () => {
    history.back()
}

</script>

<style lang="scss" scoped></style>
