<template>
  <div class="main-container" v-loading="loading">
    <el-card class="card !border-none mb-[15px]" shadow="never">
      <el-page-header :content="id ? t('editWay') : t('addWay')" :icon="ArrowLeft" @back="router.push({ path: '/tourism/product/way/way' })" />
    </el-card>

    <el-card class="box-card !border-none" shadow="never">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane :label="t('basicData')" name="first"></el-tab-pane>
        <el-tab-pane :label="t('priceCalendar')" name="second" :disabled="formData.way_id ? false : true"></el-tab-pane>
      </el-tabs>

      <div v-if="activeName == 'first'">
        <el-card class="box-card !border-none" shadow="never">
          <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form">
            <el-form-item :label="t('wayName')" prop="way_name">
              <el-input v-model.trim="formData.way_name" clearable :placeholder="t('wayNamePlaceholder')" class="input-width" />
            </el-form-item>
            <div v-for="(labelItem, labelIndex) in label_data" :key="labelIndex">
              <el-form-item :label="t('groupBuyType')" v-if="labelIndex == 'group_buy_type'">
                <span v-for="(item, index) in labelItem" :key="index">
                    <el-check-tag style="margin-right: 8px" :checked="index == formData.group_buy_type ? true : false" @change="onChange('group_buy_type', index)">{{ item }}</el-check-tag>
                </span>
              </el-form-item>
              <el-form-item :label="t('travelType')" v-else-if="labelIndex == 'travel_type'">
                <span v-for="(item, index) in labelItem" :key="index">
                    <el-check-tag style="margin-right: 8px" :checked="index == formData.travel_type ? true : false" @change="onChange('travel_type', index)">{{ item }}</el-check-tag>
                </span>
              </el-form-item>
              <el-form-item :label="t('wayTheme')" v-else-if="labelIndex == 'way_theme'">
                <span v-for="(item, index) in labelItem" :key="index">
                    <el-check-tag style="margin-right: 8px" :checked="index == formData.way_theme ? true : false" @change="onChange('way_theme', index)">{{ item }}</el-check-tag>
                </span>
              </el-form-item>
              <el-form-item :label="t('wayTraffic')" v-else>
                <span v-for="(item, index) in labelItem" :key="index">
                    <el-check-tag style="margin-right: 8px" :checked="index == formData.way_traffic ? true : false" @change="onChange('way_traffic', index)">{{ item }}</el-check-tag>
                </span>
              </el-form-item>
            </div>

            <el-form-item :label="t('wayCover')" prop="goods_cover">
              <upload-image v-model="formData.goods_cover" />
            </el-form-item>
            <el-form-item :label="t('wayImages')" prop="goods_images">
              <upload-image v-model="formData.goods_image" limit="10" />
            </el-form-item>

            <el-form-item :label="t('wayStock')" prop="stock">
              <el-input v-model.trim="formData.stock" clearable :placeholder="t('wayStockPlaceholder')" class="input-width" @keyup="filterNumber($event)" />
            </el-form-item>
            <el-form-item :label="t('wayPrice')" prop="price">
              <el-input v-model.trim="formData.price" clearable :placeholder="t('wayPricePlaceholder')" class="input-width" @keyup="filterDigit($event)" />
            </el-form-item>
            <el-form-item :label="t('startCity')" prop="start_city">
              <el-input v-model.trim="formData.start_city" clearable :placeholder="t('startCityPlaceholder')" class="input-width" />
            </el-form-item>
            <el-form-item :label="t('endCity')" prop="end_city">
              <el-input v-model.trim="formData.end_city" clearable :placeholder="t('endCityPlaceholder')" class="input-width" />
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
            <el-form-item :label="t('poster')">
              <el-select v-model="formData.poster_id" :placeholder="t('posterPlaceholder')" clearable>
                <el-option v-for="item in posterOptions" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
              <div class="ml-[10px]">
                <span class="cursor-pointer text-primary mr-[10px]" @click="refreshGoodsPoster(true)">{{ t('refresh') }}</span>
                <span class="cursor-pointer text-primary" @click="toPosterEvent">{{ t('addGoodsPoster') }}</span>
              </div>
            </el-form-item>
            <el-form-item :label="t('buyDesc')">
              <editor v-model="formData.buy_info" />
            </el-form-item>
            <el-form-item :label="t('feeDesc')">
              <editor v-model="formData.fee_desc" />
            </el-form-item>
            <el-form-item :label="t('wayCharacter')">
              <editor v-model="formData.way_character" />
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
                  <p class="text-right text-gray-400 text-[14px] mt-[15px]">{{ date_price_list[data.day].price }}￥</p>
                </div>
                <div v-else>
                  <p class="text-right text-gray-400 text-[14px] mt-[15px]">0.00￥</p>
                </div>
              </div>
              <div class="w-full h-full" v-else>
                <p class="text-gray-400">{{ data.day.split('-').slice(1).join('-') }}</p>
                <div v-if="date_price_list && date_price_list[data.day]">
                  <p class="text-right text-gray-400 text-[14px] mt-[15px]">{{ date_price_list[data.day].price }}￥</p>
                </div>
                <div v-else>
                  <p class="text-right text-gray-400 text-[14px] mt-[15px]">0.00￥</p>
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
          <el-date-picker type="date" v-model="saleArr.start_date" :placeholder="t('startDate')"  value-format="YYYY-MM-DD" :disabled-date="disabledDate"/>
        </el-form-item>
        <el-form-item v-if="saleArr.is_set == 2" :label="t('endDate')" class="input-width" prop="end_date">
          <el-date-picker type="date" v-model="saleArr.end_date" :placeholder="t('endDate')" value-format="YYYY-MM-DD" :disabled-date="disabledDate"/>
        </el-form-item>
        <el-form-item :label="t('wayPrice')" class="input-width" prop="price">
          <el-input v-model="saleArr.price" clearable :placeholder="t('wayPricePlaceholder')" class="input-width"
                    @keyup="filterDigit($event)" />
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
import { ElMessage, FormInstance } from 'element-plus'
import {
    getWayInfo,
    addWay,
    editWay,
    getWayLabel,
    editwayCalendar,
    wayDatePriceList
} from '@/addon/tourism/api/tourism'
import { useRoute, useRouter } from 'vue-router'
import { filterNumber, filterDigit } from '@/utils/common'
import { getPosterList } from '@/app/api/poster'

const route = useRoute()
const router = useRouter()
const id: number = parseInt(route.query.id as string)
const loading = ref(false)
const activeName = ref('first')
/**
 * 表单数据
 */
const initialFormData = {
    way_id: 0,
    way_name: '',
    start_city: '',
    end_city: '',
    way_character: '',
    fee_desc: '',
    group_buy_type: '',
    way_theme: '',
    travel_type: '',
    way_traffic: '',
    goods_id: 0,
    stock: '',
    goods_cover: '',
    goods_image: '',
    price: '',
    buy_info: '',
    member_discount: '',
    poster_id: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const label_data = ref([])
const checkLabel = async() => {
    label_data.value = await (await getWayLabel()).data.data
}
checkLabel()
const onChange = (type: any, index: any) => {
    if (formData[type] == index) {
        formData[type] = ''
    } else {
        formData[type] = index
    }
}

const setFormData = async(id: number = 0) => {
    Object.assign(formData, initialFormData)
    const data = await (await getWayInfo(id)).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })
    if (data.goods) {
        Object.keys(formData).forEach((key: string) => {
            if (data.goods[key] != undefined) formData[key] = data.goods[key]
        })
    }
    formData.way_id = id
    checkDatePrice(formData.goods_id)
}
if (id) setFormData(id)

const formRef = ref<FormInstance>()
const pricePass = (rule: any, value: any, callback: any) => {
    const reg = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
    if (value === '') {
        callback(new Error(t('wayPricePlaceholder')))
    } else if (parseFloat(value) === 0) {
        callback(new Error(t('wayPricePlaceholder1')))
    } else if (parseFloat(value) > 99999999.99) {
        callback(new Error(t('pricePlaceholder3')))
    } else if (!reg.test(value)) {
        callback(new Error(t('wayPricePlaceholder2')))
    } else {
        callback()
    }
}

const requiredgoodsCover = (rule: any, value: any, callback: any) => {
    if (formData.goods_cover == '') {
        callback(new Error(t('wayCoverPlaceholder')))
    } else {
        callback()
    }
}
// 表单验证规则
const formRules = computed(() => {
    return {
        way_name: [
            { required: true, message: t('wayTitlePlaceholder'), trigger: 'blur' }
        ],
        goods_cover: [
            { required: true, validator: requiredgoodsCover, trigger: 'blur' }
        ],
        stock: [
            { required: true, message: t('wayStockPlaceholder'), trigger: 'blur' }
        ],
        price: [
            { required: true, validator: pricePass, trigger: 'blur' }
        ],
        start_city: [
            { required: true, message: t('startCityPlaceholder'), trigger: 'blur' }
        ],
        end_city: [
            { required: true, message: t('endCityPlaceholder'), trigger: 'blur' }
        ]
    }
})

const onSave = async(formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate(async(valid) => {
        if (valid) {
            loading.value = true

            const data = formData

            const save = formData.way_id ? editWay : addWay
            save(data).then((res: any) => {
                loading.value = false
                if (res.code >= 0 && formData.way_id == 0) {
                    formData.way_id = res.data.way_id
                    formData.goods_id = res.data.goods_id
                    activeName.value = 'second'
                } else {
                    history.back()
                }
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

// 海报列表下拉框
const posterOptions = reactive([])

// 跳转到海报列表，添加海报
const toPosterEvent = () => {
    const url = router.resolve({
        path: '/poster/list'
    })
    window.open(url.href)
}

// 商品海报
const refreshGoodsPoster = (bool = false) => {
    getPosterList({
        type: 'tourism_way'
    }).then((res) => {
        const data = res.data
        if (data) {
            posterOptions.splice(0, posterOptions.length, ...data)
            if (bool) {
                ElMessage({
                    message: t('refreshSuccess'),
                    type: 'success'
                })
            }
        }
    })
}

refreshGoodsPoster()

const back = () => {
    history.back()
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
    showDialog.value = true
    saleArr.start_date = res.day
    saleArr.is_set = 1
    saleArr.price = ''
    saleArr.end_date = ''
    saleArr.member_price = 1
    if (date_price_list.value[res.day]) {
        saleArr.price = date_price_list.value[res.day].price
        saleArr.member_price = date_price_list.value[res.day].member_price
    }
}

interface saleData {
  is_set: number
  start_date: string
  end_date: string
  price: string
  goods_id?: number | string
  member_price?: number | string
}

const saleArr = reactive<saleData>({
    is_set: 1,
    start_date: '',
    end_date: '',
    price: '',
    member_price: 1
})

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
            editwayCalendar(saleArr).then(res => {
                checkDatePrice(formData.goods_id)
                showDialog.value = false
                goodsDay.value = false
            })
        }
    })
}

interface DatePriceType {
  price: string | number
}

const date_price_list = ref<DatePriceType[]>([])
const checkDatePrice = (id: number = 0) => {
    wayDatePriceList({
        goods_id: id
    }).then(res => {
        date_price_list.value = res.data
    })
}

</script>

<style lang="scss" scoped>.el-form-item__content .el-check-tag {
  font-weight: unset;
}</style>
