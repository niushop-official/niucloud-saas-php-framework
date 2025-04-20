<template>
    <div class="main-container" v-loading="loading">
        <div class="detail-head"  v-if="!loading">
            <div class="left" @click="back()">
                <span class="iconfont iconxiangzuojiantou !text-xs"></span>
                <span class="ml-[1px]">{{ t("returnToPreviousPage") }}</span>
            </div>
            <span class="adorn">|</span>
            <span class="right">{{ pageName }}</span>
        </div>
        <el-card class="box-card !border-none" shadow="never">
            <el-form :model="formData" label-width="130px" ref="formRef" :rules="formRules" class="page-form"  v-if="!loading">
                <div class="text-sm leading-[25px] title">{{ t('titleOne') }}</div>
                <el-card class="box-card !border-none" shadow="never">
                    <el-form-item v-if="formData.is_default == '0'" :label="t('levelNum')" prop="level_num">
                        <div>
                            <div class="flex">
                                <template v-for="(item, index) in config.levelWeightList" :key="item.id">
                                    <div v-if="config.levelWeightDisableList.includes(item.id) && item.id != level_num"
                                        class="w-[62px] h-[32px] leading-[32px] text-center bg-[#f1f1f1] rounded-[4px] cursor-not-allowed border-box mr-[10px]">
                                        {{ item.name }}</div>
                                    <div v-else
                                        class="w-[62px] h-[32px] leading-[30px] text-center border-[1px] border-[#eee] border-solid rounded-[4px] cursor-pointer border-box mr-[10px]"
                                        :class="{ 'border-[var(--el-color-primary)]': item.id == formData.level_num }"
                                        @click="levelWeightChange(item.id)">{{ item.name }}</div>
                                    <el-input style="display: none;" v-model="formData.level_num" clearable
                                        class="input-width" />
                                </template>

                            </div>
                            <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('levelNumTip') }}</p>
                        </div>
                    </el-form-item>
                    <el-form-item :label="t('levelName')" prop="level_name">
                        <el-input v-model="formData.level_name" clearable :placeholder="t('levelNamePlaceholder')" class="input-width" />
                    </el-form-item>

                    <!-- 分红比例 -->
                    <el-form-item :label="t('levelRate')" prop="level_rate">
                        <div>
                            <el-input v-model="formData.level_rate" clearable class="input-width" @keyup="filterDigit($event)" style="margin-right: 20px; width: 250px;">
                                <template #append>%（按比例）</template>
                            </el-input>
                            <el-input v-model="formData.level_money" clearable class="input-width" @keyup="filterDigit($event)" style="margin-right: 20px; width: 250px;">
                                <template #append>元（固定金额）</template>
                            </el-input>

                            <!-- <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('oneRatePlaceholder') }}</p> -->
                        </div>
                    </el-form-item>

                    <!-- 代理区域 -->
                    <el-form-item :label="t('levelArea')" prop="level_area" >
                        <div>
                            <el-radio-group v-model="formData.level_area">
                                <el-radio label="1">{{ t('levelArea1') }}</el-radio>
                                <el-radio label="2">{{ t('levelArea2') }}</el-radio>
                                <el-radio label="3">{{ t('levelArea3') }}</el-radio>
                                <el-radio label="4" v-if="setData.is_street === '1'">{{ t('levelArea4') }}</el-radio>
                            </el-radio-group>
                            <!-- <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('seeRatePlaceholder') }}</p> -->
                        </div>
                    </el-form-item>
                </el-card>

                <!-- 升级方式 -->
                <template v-if="formData.is_default == '0'">
                    <div class="text-sm leading-[25px] title">{{ t('titleTwo') }}</div>
                    <el-card class="box-card !border-none" shadow="never">
                        <el-form-item :label="t('upType')">
                            <el-radio-group v-model="formData.up_type">
                                <el-radio label="0">{{ t('upTypeOne') }}</el-radio>
                                <el-radio label="1">{{ t('upTypeTwo') }}</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item :label="t('orderMoney')" >
                            <el-input v-model="formData.order_money"  clearable  class="input-width mr-[10px]" :placeholder="t('orderMoneyPlaceholder')" >
                                <template #append>元</template>
                            </el-input>
                        </el-form-item>

                        <el-form-item :label="t('orderGoodsId')" >
                            <div class="flex flex-col">
                                <goods-select-popup  ref="goodsSelectPopupRef" v-model="formData.order_goods_id" :min="1" :max="9999" />
                                <span class="text-[#999] text-[12px]">{{t('orderGoodsId')}}</span>
                            </div>
                        </el-form-item>
                    </el-card>

                </template>
            </el-form>
        </el-card>
        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="save()">{{ t('save') }}</el-button>
                <el-button @click="back()">{{ t('back') }}</el-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { t } from "@/lang";
import goodsSelectPopup from '@/addon/shop/views/goods/components/goods-select-popup.vue'
import { getLevelInfo, getLevelNum, addLevel, editLevel } from '@/addon/ly_area/api/level'
import { getAreaConfig } from '@/addon/ly_area/api/config'
import { FormInstance } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { useRoute, useRouter } from "vue-router";
import { filterDigit } from '@/utils/common'

const route = useRoute();
const router = useRouter();
const pageName = route.meta.title;

const config = ref<any>({
    levelWeightList: [
        // { id: 1, name: '一级' },
        // { id: 2, name: '二级' },
        // { id: 3, name: '三级' },
        // { id: 4, name: '四级' },
        // { id: 5, name: '五级' },
        // { id: 6, name: '六级' },
        // { id: 7, name: '七级' },
        // { id: 8, name: '八级' },
        // { id: 9, name: '九级' },
        // { id: 10, name: '十级' },
    ],

    levelWeightDisableList: [],
    cardList: []
})
/**
 * 表单数据
 */
const initialFormData = {
    level_id: 0,
    level_name: '',
    level_num: 0,
    level_area: 0,
    level_rate: '0.00',
    level_money: '0.00',
    up_type: '0',
    order_goods_id: '',
    order_money: '',
    status: 0,
    is_default: 0,
};

const formData: Record<string, any> = reactive({ ...initialFormData });
const loading = ref<Boolean>(false)
const level_num = ref(0)

//配置数据
const setData = {
    is_street: '0',
}
// 获取配置信息
const setFormData = async (id: number = 0) => {
    const data = await (await getAreaConfig()).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })
    formData.is_open = Boolean(Number(formData.is_open))
    setData.is_street = data.is_street;
    // 根据 is_street 的值动态设置 levelWeightList
    config.value.levelWeightList = setData.is_street === '1'
       ? [
            { id: 1, name: '一级' },
            { id: 2, name: '二级' },
            { id: 3, name: '三级' },
            { id: 4, name: '四级' }
        ]
        : [
            { id: 1, name: '一级' },
            { id: 2, name: '二级' },
            { id: 3, name: '三级' }
        ];
    loading.value = false
}
setFormData()



// 正则表达式
const regExp = {
    required: /[\S]+/,
    number: /^\d{0,10}$/,
    digit: /^\d{0,10}(.?\d{0,2})$/,
    special: /^\d{0,10}(.?\d{0,3})$/
}
const oneRateCheck = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error(t('oneRatePlaceholderOne')))
    } else if (!regExp.digit.test(value)) {
        return callback(new Error(t('oneRatePlaceholderTwo')))
    } else if (value >= 100) {
        return callback(new Error(t('oneRatePlaceholderThree')))
    } else if (value <= 0) {
        return callback(new Error(t('oneRatePlaceholderFour')))
    } else {
        return callback()
    }
}

const levelNum = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error(t('levelWeightPlaceholder')))
    } else {
        return callback()
    }
}
const formRules = computed(() => {
    return {
        level_num: [{ required: true, validator: levelNum, trigger: 'change' }],
        level_name: [{ required: true, message: t('levelNamePlaceholder'), trigger: 'blur' }],
        // recommend_rate: [{ required: true, validator: oneRateCheck, trigger: 'blur' }],
        // two_rate: [{ required: true, validator: twoRateCheck, trigger: 'blur' }],
        // card_ids: [{ type: 'array', required: true, message: t('upgradeMethodPlaceholder'), trigger: 'change' }],
    }
})
const formRef = ref<FormInstance>()


const levelWeightChange = (id: Number) => {
    formData.level_num = id
}
const upgradeMethodChange = (item: any) => {
    item.is_checkbox = item.is_checkbox ? 0 : 1

    if (item.is_checkbox) {
        formData.card_ids.push(item.card_id)
    } else {
        let index = formData.card_ids.indexOf(item.card_id)
        formData.card_ids.splice(index, 1)
    }
    formRef.value?.validateField('card_ids')
}
const upgradeMethodDelete = (item: any) => {
    item.is_checkbox = 0
    let index = formData.card_ids.indexOf(item.card_id)
    formData.card_ids.splice(index, 1)
    formRef.value?.validateField('card_ids')
}
//获取详情
const getLevelInfoFn = (level_id: any) => {
    getLevelInfo(level_id).then((res) => {
        Object.keys(formData).forEach((key: any) => {
            if (res.data[key] != undefined) formData[key] = res.data[key].toString()
            formData.order_goods_id = res.data.order_goods_id && res.data.order_goods_id != '0' ?  res.data.order_goods_id.split(',') : [];
        })
        Object.values(config.value.cardList).forEach((el: any) => {
            if (res.data[el.key] != undefined) {
                formData[el.key] = res.data[el.key]
                if (!formData.card_ids.includes(el.card_id) && el.is_checkbox) {
                    formData.card_ids.push(el.card_id)
                }
            }
        })
        level_num.value = res.data.level_num
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}
formData.id = route.query.id || 0
if (formData.id) {
    getLevelInfoFn(formData.id);
}


//获取区域等级权重已设置列表
const getLevelNumFn = () => {
    loading.value = true
    getLevelNum().then((res: any) => {
        config.value.levelWeightDisableList = res.data.map((el: any) => el.level_num)
        // getLevelCardFn(formData.id)
        getLevelInfoFn(formData.id)
    }).catch(() => {
        loading.value = false
    })
}
getLevelNumFn()

//获取链动等级升级条件卡片数据
// const getLevelCardFn = (id: any) => {
//     getLevelCard({ id: id }).then((res: any) => {
//         config.value.cardList = res.data
//         if (formData.id) {
//             getLevelInfoFn(formData.id)
//         } else {
//             loading.value = false
//         }
//     }).catch(() => {
//         loading.value = false
//     })
// }
const repeat = ref<boolean>(false)

const save = () => {
    var data :any = cloneDeep(formData)
    data.order_goods_id = data.order_goods_id.join()
    formRef.value?.validate((valid) => {
        if (valid) {
            if (repeat.value) return
            repeat.value = true
            let api = formData.level_id ? editLevel : addLevel
            Object.values(config.value.cardList).forEach((el: any) => {
                if (!el.is_checkbox) delete formData[el.key]
            })
            api(formData).then((res) => {
                repeat.value = false
                back()
            }).catch(() => {
                repeat.value = false
            })
        }
    })
}
const back = () => {
    router.push('/ly_area/level')
};
</script>
<style lang="scss" scoped>
/*.title {
    &::after {
        content: "";
        display: inline-block;
        width: 3px;
        height: 14px;
        background-color: var(--el-color-primary);
        position: absolute;
        left: 0;
        top: 50%;
        border-radius: 5px;
        transform: translateY(-50%);
    }
}*/

.el-form-item {
    .el-form-item {
        margin-bottom: 18px;
    }
}

.el-input.el-input-group--append {
    width: 170px;
}
</style>
