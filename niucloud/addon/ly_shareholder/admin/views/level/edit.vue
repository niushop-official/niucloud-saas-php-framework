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
                    <el-form-item v-if="formData.is_default == '0'" :label="t('levelWeight')" prop="level_num">
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
                            <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('levelWeightTip') }}</p>
                        </div>
                    </el-form-item>
                    <el-form-item :label="t('levelName')" prop="level_name">
                        <el-input v-model="formData.level_name" clearable :placeholder="t('levelNamePlaceholder')" class="input-width" />
                    </el-form-item>
                    <!-- 分红比例 -->
                    <el-form-item :label="t('Rate')" prop="one_rate">
                        <div>
                            <el-input v-model="formData.rate" clearable class="input-width" @keyup="filterDigit($event)">
                                <template #append>%</template>
                            </el-input>
                            <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('oneRatePlaceholder') }}</p>
                        </div>
                    </el-form-item>

                    <!-- 封顶金额 -->
                    <el-form-item :label="t('Max')" prop="max_money">
                        <div>
                            <el-input v-model="formData.max_money" clearable class="input-width" @keyup="filterDigit($event)">
                                <template #append>元</template>
                            </el-input>
                            <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('maxMoneyTip') }}</p>
                        </div>
                    </el-form-item>
                </el-card>

                <!-- 升级条件设置 -->
                <template v-if="formData.is_default == '0'">
                    <div class="text-sm leading-[25px] title">{{ t('titleTwo') }}</div>
                    <el-card class="box-card !border-none" shadow="never">
                        <el-form-item :label="t('upgradeMethod')" class="!mb-0">
                            <el-radio-group v-model="formData.upgrade_type">
                                <el-radio label="0">{{ t('upgradeMethodLabelOne') }}</el-radio>
                                <el-radio label="1">{{ t('upgradeMethodLabelTwo') }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item prop="card_ids" v-if="config.cardList.length">
                            <div class="mt-[10px] flex">
                                <div v-for="(item, index) in config.cardList" :key="index"
                                    class="h-[32px] flex flex-shrink-0 items-center px-[16px] border-[1px] border-[#eee] border-solid rounded-[2px] cursor-pointer mr-[10px]"
                                    :class="{ 'border-[var(--el-color-primary)]': item.is_checkbox }"
                                    @click="upgradeMethodChange(item)">
                                    <span>{{ item.card_name }}</span>
                                    <el-tooltip class="box-item" effect="light" :content="item.card_desc" placement="bottom">
                                        <span class="iconfont iconwenhao ml-[5px]"></span>
                                    </el-tooltip>
                                </div>
                            </div>
                        </el-form-item>
                    </el-card>
                    <div class="text-sm leading-[25px] title">{{ t('titleThree') }}</div>
                    <el-card class="box-card !border-none" shadow="never">
                        <template v-for="(item, index) in config.cardList" :key="index">
                            <el-form-item v-if="item.is_checkbox" :label="item.card_name" :prop="item.key" :rules="[{
                                trigger: 'blur',
                                required: true,
                                validator: (rule: any, value: any, callback: any) => {
                                    if (!value) {
                                        return callback(t('rulesPlaceholderOne') + item.card_name)
                                    } else if (value <= 0) {
                                        return callback(item.card_name + t('rulesPlaceholderThree'))
                                    } else if (item.key === 'order_goods_id' && item.unit === 'ID') {
                                        // 如果是 order_goods_id 且单位是 ID，进行特定的验证
                                        const ids = value.split(',');
                                        // for (const id of ids) {
                                        //     if (!regExp.number.test(id)) {
                                        //         return callback(`[${item.card_name}]${t('rulesPlaceholderTwo')}`);
                                        //     }
                                        // }
                                        return callback();
                                    } else if (!regExp.digit.test(value) && item.unit == '元') {
                                        return callback(`[${item.card_name}]${t('rulesPlaceholderTwo')}`)
                                    } else if (!regExp.number.test(value) && item.unit != '元') {
                                        return callback(`[${item.card_name}]${t('rulesPlaceholderTwo')}`)
                                    } else {
                                        return callback()
                                    }
                                }
                            }]" label-width="175px">
                                <el-input v-model="formData[item.key]" clearable class="input-width mr-[10px]">
                                    <template #append>{{ item.unit }}</template>
                                </el-input>
                                <el-button type="primary" link @click="upgradeMethodDelete(item)">{{ t('delete') }}</el-button>
                            </el-form-item>
                        </template>
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
import { getShareholderLevelInfo, getShareholderLevelNum, getShareholderLevelCard, addShareholderLevel, editShareholderLevel } from '@/addon/ly_shareholder/api/level'
import { FormInstance } from 'element-plus'
import { useRoute, useRouter } from "vue-router";
import { filterDigit } from '@/utils/common'

const route = useRoute();
const router = useRouter();
const pageName = route.meta.title;

const config = ref<any>({
    levelWeightList: [
        { id: 1, name: '一级' },
        { id: 2, name: '二级' },
        { id: 3, name: '三级' },
        { id: 4, name: '四级' },
        { id: 5, name: '五级' },
        { id: 6, name: '六级' },
        { id: 7, name: '七级' },
        { id: 8, name: '八级' },
        { id: 9, name: '九级' },
        { id: 10, name: '十级' },
    ],
    levelWeightDisableList: [],
    cardList: []
})
/**
 * 表单数据
 */
const initialFormData = {
    id: 0,
    is_default: '0',
    level_num: 0,
    level_name: '',
    rate: '',
    recharge_money: '0.00',
    upgrade_type: '0',
    max_money: '0.00',
    order_goods_id: [],
    card_ids: [],

};
const formData: Record<string, any> = reactive({ ...initialFormData });
const loading = ref<Boolean>(false)
const level_num = ref(0)
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
        rate: [{ required: true, validator: oneRateCheck, trigger: 'blur' }],
        card_ids: [{ type: 'array', required: true, message: t('upgradeMethodPlaceholder'), trigger: 'change' }],
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
const getShareholderLevelInfoFn = (id: any) => {
    getShareholderLevelInfo(id).then((res) => {
        Object.keys(formData).forEach((key: any) => {
            if (res.data[key] != undefined) formData[key] = res.data[key].toString()
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
//获取股东等级权重已设置列表
const getShareholderLevelNumFn = () => {
    loading.value = true
    getShareholderLevelNum().then((res: any) => {
        config.value.levelWeightDisableList = res.data.map((el: any) => el.level_num)
        getShareholderLevelCardFn(formData.id)
    }).catch(() => {
        loading.value = false
    })
}
getShareholderLevelNumFn()
//获取股东等级升级条件卡片数据
const getShareholderLevelCardFn = (id: any) => {
    getShareholderLevelCard({ id: id }).then((res: any) => {
        config.value.cardList = res.data
        if (formData.id) {
            getShareholderLevelInfoFn(formData.id)
        } else {
            loading.value = false
        }
    }).catch(() => {
        loading.value = false
    })
}
const repeat = ref<boolean>(false)
const save = () => {
    formRef.value?.validate((valid) => {
        if (valid) {
            if (repeat.value) return
            repeat.value = true
            let api = formData.id ? editShareholderLevel : addShareholderLevel
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
    router.push('/ly_shareholder/shareholder_level')
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
