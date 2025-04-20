<template>
  <div class="main-container">
    <el-card class="card !border-none mb-[15px]" shadow="never">
      <el-page-header :content="id ? t('editRoom') : t('addRoom')" :icon="ArrowLeft" @back="router.push(`/tourism/product/hotel/room?id=${hotel_id}`)" />
    </el-card>

    <el-card class="box-card !border-none" shadow="never">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane :label="t('basicData')" name="first"></el-tab-pane>
        <el-tab-pane :label="t('priceCalendar')" name="second" :disabled="formData.goods_id ? false : true"></el-tab-pane>
      </el-tabs>
      <div v-if="activeName == 'first'">
        <el-card class="box-card !border-none" shadow="never">
          <el-form :model="formData" label-width="180px" ref="formRef" :rules="formRules" class="page-form">
            <el-form-item :label="t('goodsName')" prop="goods_name">
              <el-input v-model.trim="formData.goods_name" clearable :placeholder="t('goodsNamePlaceholder')" class="input-width" />
            </el-form-item>
            <el-form-item :label="t('price')" prop="price">
              <div class="w-full">
                <el-input v-model.trim="formData.price" clearable :placeholder="t('pricePlaceholder')" class="input-width" @keyup="filterDigit($event)" />
              </div>
              <div class="text-[12px] text-[#999]">{{ t('priceIllustrate') }}</div>
            </el-form-item>
            <el-form-item :label="t('stock')" prop="stock">
              <el-input v-model.trim="formData.stock" clearable :placeholder="t('stockPlaceholder')" class="input-width" @keyup="filterNumber($event)" />
            </el-form-item>
            <el-form-item :label="tagItem.name" v-for="(tagItem, tagIndex) in roomFacilities" :key="tagIndex">
							<span v-for="(item, index) in tagItem.attr" :key="index">
								<el-check-tag style="margin-right: 8px" :checked="formData.goods_attribute.indexOf(item[0]) != -1 ? true : false" @change="tagChange(item[0])">{{ item[0] }}</el-check-tag>
							</span>
            </el-form-item>
            <el-form-item :label="t('bedSize')">
              <el-input v-model.trim="formData.room_bed" clearable :placeholder="t('bedSizePlaceholder')" class="input-width" />
              <span class="text-[12px] text-[#999] pl-2">{{ t('roomBedFormat') }}</span>
            </el-form-item>
            <el-form-item :label="t('roomSize')">
              <el-input v-model.trim="formData.room_area" :placeholder="t('roomSizePlaceholder')" class="input-width" @keyup="filterNumber($event)">
                <template #append>㎡</template>
              </el-input>
            </el-form-item>
            <el-form-item :label="t('memberNum')">
              <el-input v-model.trim="formData.room_stay" clearable :placeholder="t('memberNumPlaceholder')" class="input-width" />
              <span class="text-[12px] text-[#999] pl-2">{{ t('roomStayFormat') }}</span>
            </el-form-item>
            <el-form-item :label="t('floor')">
              <el-input v-model.trim="formData.room_floor" clearable :placeholder="t('floorPlaceholder')" class="input-width" />
              <span class="text-[12px] text-[#999] pl-2">{{ t('roomFloorFormat') }}</span>
            </el-form-item>
            <el-form-item :label="t('goodsImage')" prop="goods_image">
              <upload-image v-model="formData.goods_cover" />
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

            <el-form-item :label="t('goodsContent')">
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
          <el-calendar ref="calendar">
            <template #date-cell="{ data }">
              <div class="w-full h-full" :class="data.isSelected ? 'is-selected' : ''" @click="check(data)" v-if="typeCheck(data) == true">
                <p>
                  {{ data.day.split('-').slice(1).join('-') }}
                </p>
                <div v-if="datePriceList && datePriceList[data.day]">
                  <p class="text-right text-gray-400 text-[14px] mt-[15px]">{{ datePriceList[data.day].price }}￥</p>
                </div>
                <div v-else>
                  <p class="text-right text-gray-400 text-[14px] mt-[15px]">0.00￥</p>
                </div>
              </div>
              <div v-else>
                <p class="text-gray-400">
                  {{ data.day.split('-').slice(1).join('-') }}
                </p>
                <div v-if="datePriceList && datePriceList[data.day]">
                  <p class="text-right text-gray-400 text-[14px] mt-[15px]">{{ datePriceList[data.day].price }}￥</p>
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
      <el-form :model="saleArr" label-width="90px" ref="formRulesRef" :rules="rules" class="page-form"
               v-loading="loading">
        <el-form-item :label="t('daySetting')" class="items-center">
          <el-radio-group v-model="saleArr.is_set" class="ml-4 input-width">
            <el-radio :label="1" size="large">{{ saleArr.start_date }}</el-radio>
            <el-radio :label="2" size="large">{{ t('dateRange') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="saleArr.is_set == 2" :label="t('startDate')" class="input-width" prop="start_date">
          <el-date-picker type="date" v-model="saleArr.start_date" :placeholder="t('startDate')" value-format="YYYY-MM-DD"  :disabled-date="disabledDate"/>
        </el-form-item>
        <el-form-item v-if="saleArr.is_set == 2" :label="t('endDate')" class="input-width" prop="end_date">
          <el-date-picker type="date" v-model="saleArr.end_date" :placeholder="t('endDate')" value-format="YYYY-MM-DD" :disabled-date="disabledDate" />
        </el-form-item>
        <el-form-item :label="t('price')" prop="price" class="input-width">
          <el-input v-model="saleArr.price" clearable :placeholder="t('pricePlaceholder')" class="input-width" @keyup="filterDigit($event)" />
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
import type { FormInstance } from 'element-plus'
import {
    getRoomInfo,
    addRoom,
    editRoom,
    editRoomCalendar,
    roomDatePriceList,
    getRoomFacilities
} from '@/addon/tourism/api/tourism'
import { useRoute, useRouter } from 'vue-router'
import { filterNumber, filterDigit } from '@/utils/common'
import { en } from 'element-plus/es/locale'

const route = useRoute()
const router = useRouter()
const hotel_id: number = parseInt(route.query.hotel_id as string)
const id: number = parseInt(route.query.id as string)
const loading = ref(false)
// const pageName = route.meta.title
const activeName = ref('first')

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
    saleArr.end_date = ''
    saleArr.price = ''
    showDialog.value = true
    saleArr.member_price = 1
    if (datePriceList.value[res.day]) {
        saleArr.price = datePriceList.value[res.day].price
        saleArr.member_price = datePriceList.value[res.day].member_price
    }
}
const saleArr = reactive({
    is_set: 1,
    start_date: '',
    end_date: '',
    price: '',
    member_price: 1
})

const initialFormData = {
    goods_id: 0,
    hotel_id: 0,
    goods_name: '',
    goods_type: '',
    goods_no: '',
    goods_image: '',
    goods_cover: '',
    buy_content: '',
    goods_content: '',
    goods_attribute: [],
    price: '',
    is_vip: 0,
    stock: '',
    room_bed: '',
    room_area: '',
    room_stay: '',
    room_floor: '',
    buy_info: '',
    image_thumb_small: '',
    member_discount: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const setFormData = async(id: number = 0) => {
    Object.assign(formData, initialFormData)
    const data = await (await getRoomInfo(id)).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined && key != 'goods_attribute') formData[key] = data[key]
        if (key == 'goods_attribute' && data[key] != undefined) formData[key] = data[key].split(',')
        if (key == 'image_thumb_small' && data[key] != undefined) formData[key] = data[key].join(',')
    })
    formData.goods_id = id
    checkDatePrice(formData.goods_id)
}
if (id) setFormData(id)

const formRef = ref<FormInstance>()
const pricePass = (rule: any, value: any, callback: any) => {
    const reg = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
    if (value === '') {
        callback(new Error(t('pricePlaceholder')))
    } else if (parseFloat(value) === 0) {
        callback(new Error(t('pricePlaceholder1')))
    } else if (parseFloat(value) > 99999999.99) {
        callback(new Error(t('pricePlaceholder3')))
    } else if (!reg.test(value)) {
        callback(new Error(t('pricePlaceholder2')))
    } else {
        callback()
    }
}
// 表单验证规则
const formRules = computed(() => {
    return {
        goods_name: [
            { required: true, message: t('goodsNamePlaceholder'), trigger: 'blur' }
        ],
        stock: [
            { required: true, message: t('stockPlaceholder'), trigger: 'blur' }
        ],
        goods_cover: [
            { required: true, message: t('goodsCoverPlaceholder'), trigger: 'blur' }
        ],
        price: [
            { required: true, validator: pricePass, trigger: 'blur' }
        ],
        goods_image: [
            { required: true, validator: goodsImageRequried, trigger: 'blur' }
        ]
    }
})

const goodsImageRequried = (rule: any, value: any, callback: any) => {
    if (formData.goods_cover == '') {
        callback(new Error(t('goodsImagePlaceholder')))
    } else {
        callback()
    }
}

const onSave = async(formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate(async(valid) => {
        if (valid) {
            loading.value = true

            if (typeof formData.goods_attribute == 'object') formData.goods_attribute = formData.goods_attribute.join(',')
            formData.hotel_id = hotel_id
            const data = formData

            const save = formData.goods_id ? editRoom : addRoom
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
// 弹框验证
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
            editRoomCalendar(saleArr).then(res => {
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

const datePriceList = ref([])
const checkDatePrice = (id: number = 0) => {
    roomDatePriceList({
        goods_id: id
    }).then(res => {
        datePriceList.value = res.data
    })
}

interface roomFacilitiesType {
  name: string,
  attr: any[]
}

const roomFacilities = ref<roomFacilitiesType[]>([])
const checkRoomlFacilities = () => {
    getRoomFacilities().then(res => {
        roomFacilities.value = res.data
    })
}
checkRoomlFacilities()
const tagChange = (tag: any) => {
    if (formData.goods_attribute.length <= 0) {
        formData.goods_attribute.push(tag)
    } else {
        if (formData.goods_attribute.indexOf(tag) != -1) {
            formData.goods_attribute.splice(formData.goods_attribute.indexOf(tag), 1)
        } else {
            formData.goods_attribute.push(tag)
        }
    }
}

</script>

<style lang="scss" scoped>.el-form-item__content .el-check-tag {
  font-weight: unset;
}</style>
