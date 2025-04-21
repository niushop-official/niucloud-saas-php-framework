<template>
    <div class="main-container">
        <el-card class="card !border-none mb-[15px]" shadow="never">
            <el-page-header :content="id ? t('editCard') : t('addCard')" :icon="ArrowLeft" @back="back" />
        </el-card>

        <el-card class="box-card !border-none" shadow="never">
            <el-form :model="formData" label-width="110px" ref="formRef" :rules="formRules" class="page-form">
                <el-form-item :label="t('cardType')">
                    <div class="card-type">
                        <div :class="['card-type-item', { 'card-type-select': item.type == formData.card_type }]"
                            @click="formData.card_type = item.type" v-for="(item, index) in cardTypeAll" :key="index">
                            <span>{{ item.name }}</span>
                            <span>{{ item.desc }}</span>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item :label="t('cardName')" prop="goods_name">
                    <el-input v-model.trim="formData.goods_name" maxlength="30" show-word-limit clearable :placeholder="t('cardNamePlaceholder')" class="input-width" />
                </el-form-item>
                <el-form-item :label="t('promotionalLanguage')" prop="keywords">
                    <el-input class="input-width" :placeholder="t('promotionalLanguagePlaceholder')" maxlength="100" show-word-limit v-model.trim="formData.keywords" />
                </el-form-item>
                <el-form-item :label="t('cardContent')" prop="goods_arr">
                    <div>
                        <p class="text-color cursor-pointer" @click="addEvent">{{ t('addCard') }}</p>
                        <div class="pay-table mt-3" v-if="formData.goods_arr.length">
                            <div
                                class="flex items-center pay-table-head table-bg table-item-pd table-item-border justify-between table-bg">
                                <span class="text-base text-[#999] w-[150px]">项目名称</span>
                                <!-- <span class="text-base font-bold text-[#999] w-[110px]">{{t('settingDefaultPay')}}</span> -->
                                <span class="text-base text-[#999] w-[110px] text-center" v-if="formData.card_type == 'oncecard'">可用次数/数量</span>
                                <span class="text-base text-[#999] w-[80px] text-center">售价</span>
                                <span class="text-base text-[#999] w-[80px] text-center">操作</span>
                            </div>
                            <div ref="fieldBoxRefs" :data-key="payKey">
                                <div class="flex table-item-border table-item-pd justify-between" v-for="(item) in formData.goods_arr" :key="item.goods_id">
                                    <div class="table-item-flex w-[150px]">{{ item.goods_name }}</div>
                                    <div class="table-item-flex w-[110px]" v-if="formData.card_type == 'oncecard'">
                                        <el-input-number v-model="item.num" :min="0" controls-position="right" />
                                    </div>
                                    <div class="table-item-flex w-[110px] justify-center">￥{{ item.price }}</div>
                                    <div class="table-item-flex w-[80px]  justify-center">
                                        <span class="text-base text-color cursor-pointer" @click.stop="deleteCardGoodsFn(item.goods_id)">删除</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center mt-2" v-if="formData.card_type == 'oncecard' && formData.goods_arr.length">
                            <span class="text-[#666]">批量操作：</span>
                            <span class="text-color cursor-pointer" v-if="hitCountShow" @click="hitCountShow = false">可用次数</span>
                            <div class="flex items-center" v-else>
                                <el-input-number v-model="batchNumber" :min="1" controls-position="right" @change="handleChange" />
                                <el-button type="primary" class="ml-3" @click="batchNumberFn">确认</el-button>
                                <el-button class="!ml-3" @click="hitCountShow = true">取消</el-button>
                            </div>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item :label="t('availableQuantity')" prop="hotel_name" v-if="formData.card_type == 'commoncard' && formData.goods_arr.length">
                    <el-input-number v-model="formData.common_num" :min="1" controls-position="right" @change="handleChange" />
                </el-form-item>
                <el-form-item :label="t('cardPrice')" prop="price">
                    <el-input v-model="formData.price" @keyup="filterDigit($event)" :placeholder="t('cardPricePlaceholder')" class="input-width">
                        <template #append>{{ t('unit') }}</template>
                    </el-input>
                </el-form-item>
                <el-form-item :label="t('crossedPrice')">
                    <el-input v-model="formData.scribe_price" @keyup="filterDigit($event)" :placeholder="t('crossedPricePlaceholder')" class="input-width">
                        <template #append>{{ t('unit') }}</template>
                    </el-input>
                </el-form-item>
                <el-form-item :label="t('virtuallySale')">
                    <el-input v-model="formData.virtually_sale" clearable :placeholder="t('virtuallySalePlaceholder')" class="input-width" />
                </el-form-item>
                <el-form-item :label="t('cardCover')" prop="goods_cover">
                    <upload-image v-model="formData.goods_cover" />
                </el-form-item>
                <el-form-item :label="t('cardImages')">
                    <upload-image v-model="formData.goods_image" limit="10" />
                </el-form-item>
                <el-form-item :label="t('cardDate')">
                    <el-radio-group v-model="formData.verify_validity_type" @change="verifyChangeFn">
                        <el-radio :label="item.type" v-for="(item, index) in verifyTypeAll" :key="index">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="t('verifyValidity')" v-if="formData.verify_validity_type != 0">
                    <el-input v-model="formData.verify_validity" :placeholder="t('serviceTimePlaceholder')" class="input-width" v-if="formData.verify_validity_type == 1">
                        <template #append>{{ t('day') }}</template>
                    </el-input>

                    <div class="w-[300px]" v-if="formData.verify_validity_type == 2">
                        <el-date-picker v-model="formData.verify_validity" value-format="YYYY-MM-DD" type="date" />
                    </div>
                </el-form-item>
                <el-form-item :label="t('isShelf')">
                    <el-radio-group v-model="formData.status">
                        <el-radio :label="1">{{ t('are') }}</el-radio>
                        <el-radio :label="0">{{ t('no') }}</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item :label="t('buyInfo')">
                    <editor v-model="formData.buy_info" />
                </el-form-item>

                <el-form-item :label="t('cardDetails')" prop="goods_content">
                    <editor v-model="formData.goods_content" />
                </el-form-item>
            </el-form>
        </el-card>
        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="onSave(formRef)">{{ t('save') }}</el-button>
                <el-button @click="back()">{{ t('cancel') }}</el-button>
            </div>
        </div>
        <CardGoodsSelect ref="cardGoodsSelectDialog" @complete="loadVipcardGoodsList" />
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { getCardType, getVerifyType, addCard, editCard, getCardDetail } from '@/addon/vipcard/api/vipcard'
import { useRoute } from 'vue-router'
import CardGoodsSelect from '@/addon/vipcard/views/components/card-goods-select.vue'
import Test from '@/utils/test'
import { filterDigit } from '@/utils/common'

const route = useRoute()
const id: number = parseInt(route.query.id)
const loading = ref(false)
// const pageName = route.meta.title
// const activeName = ref('basic')

/**
 * 表单数据
 */
const initialFormData = {
    goods_id: 0,
    goods_name: '',
    price: '',
    goods_cover: '',
    goods_image: '',
    goods_content: '',
    buy_info: '',
    verify_validity_type: 0,
    verify_validity: 0,
    status: 0,
    goods_arr: [],
    card_type: '',
    scribe_price: '',
    keywords: '',
    common_num: 0,
    virtually_sale: ''
}

const formData: Record<string, any> = reactive({ ...initialFormData })

const hitCountShow = ref(true) // 控制可用次数的的出现
// 获取卡类型
const cardTypeAll = ref([])
const getCardTypeFn = async () => {
    const data = await (await getCardType()).data
    cardTypeAll.value = Object.values(data)
    formData.card_type = cardTypeAll.value[0].type
}
getCardTypeFn()
const verifyChangeFn = (e:any) => {
    formData.verify_validity = ''
}

// 获取卡项核销类型
const verifyTypeAll = ref([])
const getVerifyTypeFn = async () => {
    const data = await (await getVerifyType()).data

    verifyTypeAll.value = data
    formData.verify_validity_type = verifyTypeAll.value[0].type
}
getVerifyTypeFn()

const cardGoodsSelectDialog: Record<string, any> | null = ref(null)

/**
 * 添加商品
 */
const addEvent = () => {
    cardGoodsSelectDialog.value.setFormData()
    cardGoodsSelectDialog.value.showDialog = true
}

// 选中卡项
// const goodsSelect = ref([]);
const loadVipcardGoodsList = (data:any) => {
    formData.goods_arr = data
    cardGoodsSelectDialog.value.showDialog = false
}
// 删除卡项
const deleteCardGoodsFn = (id:any) => {
    formData.goods_arr.forEach((item:any, index:any) => {
        if (item.goods_id == id) {
            formData.goods_arr.splice(index, 1)
        }
    })
}
// 批量修改可用次数
const batchNumber = ref(0)
const batchNumberFn = () => {
    formData.goods_arr.forEach((item:any, index:any) => {
        item.num = batchNumber.value
    })
}

const setFormData = async (id: number = 0) => {
    Object.assign(formData, initialFormData)
    const data = await (await getCardDetail(id)).data

    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })
    formData.goods_arr = data.item
}
if (id) setFormData(id)

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        goods_name: [
            { required: true, message: t('goodsNamePlaceholder'), trigger: 'blur' }
        ],
        keywords: [
            { required: true, message: t('keywordsPlaceholder'), trigger: 'blur' }
        ],
        goods_arr: [
            { required: true, message: t('goodsArrPlaceholder'), trigger: 'blur' },
            {
                validator: (rule: any, value: any, callback: any) => {
                    if (formData.card_type == 'oncecard') {
                        let verify = true
                        for (let i = 0; i < formData.goods_arr.length; i++) {
                            const num = formData.goods_arr[i].num
                            if (!Test.digits(num)) {
                                verify = false
                                callback(t('availableQuantityFormatError'))
                                break
                            }
                            if (parseInt(num) <= 0) {
                                verify = false
                                callback(t('availableQuantityMin'))
                                break
                            }
                        }
                        verify && callback()
                    } else {
                        callback()
                    }
                }
            }
        ],
        price: [
            { required: true, message: t('pricePlaceholder'), trigger: 'blur' }
        ],
        goods_cover: [
            { required: true, message: t('goodsCoverPlaceholder'), trigger: 'blur' }
        ],
        goods_content: [
            { required: true, message: t('goodsContentPlaceholder'), trigger: 'blur' }
        ]
    }
})

const onSave = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true
            const data = formData

            const save = id ? editCard : addCard
            save(data).then(res => {
                loading.value = false
                history.back()
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

const back = () => {
    history.back()
}
</script>

<style lang="scss" scoped>
.text-color {
    color: var(--el-color-primary);
}

.card-type {
    @apply flex flex-wrap;

    .card-type-item {
        @apply flex flex-col mr-3 my-2 p-4 cursor-pointer border-[1px] border-[#ddd] w-[290px];

        &:hover {
            border-color: var(--el-color-primary);

            span:nth-child(1) {
                color: var(--el-color-primary);
            }
        }

        span:nth-child(1) {
            @apply font-bold text-sm leading-[1];
        }

        span:nth-child(2) {
            @apply mt-3 text-sm leading-[1] text-[#999];
        }
    }
}

.card-type-select {
    border-color: var(--el-color-primary) !important;

    span:nth-child(1) {
        color: var(--el-color-primary);
    }
}

.table-item-pd {
    @apply py-[10px] px-[11px];
}

.table-item-border {
    @apply border-b border-[#ebeef5];
}

.table-item-flex {
    display: flex;
    align-items: center;
}

:deep(.box-pay-card) .el-card__body {
    padding: 0;
}

.table-bg {
    background: #f5f7f9;
}

html.dark .table-bg {
    background: #141414;
}</style>
