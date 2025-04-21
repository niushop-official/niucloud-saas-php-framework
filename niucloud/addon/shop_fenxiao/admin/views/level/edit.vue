<template>
    <div class="main-container" v-loading="loading">

        <!--返回-->
        <el-card class="card !border-none" shadow="never">
            <el-page-header :content="pageName" :icon="ArrowLeft" @back="back()" />
        </el-card>
        <!--返回 end-->

        <el-card class="card mt-[15px] !border-none" shadow="never">
            <el-form class="page-form" :model="formData" label-width="130px" ref="formRef" :rules="formRules" v-if="!loading">
                <div class="text text-[14px] leading-[25px]">{{ t('titleOne') }}</div>
                <el-card class="card !border-none" shadow="never">
                    <el-form-item v-if="formData.is_default == '0'" :label="t('levelWeight')" prop="level_num">
                        <div>
                            <div class="flex">
                                <template v-for="(item, index) in config.levelWeightList" :key="item.id">
                                    <div v-if="config.levelWeightDisableList.includes(item.id) && item.id != level_num"
                                        class="w-[62px] h-[32px] mr-[10px] leading-[32px] text-center bg-[var(--el-color-info-light-8)] rounded-[4px] cursor-not-allowed">
                                        {{ item.name }}</div>
                                    <div v-else
                                        class="w-[62px] h-[32px] mr-[10px] leading-[30px] text-center border-[1px] border-solid border-[var(--el-border-color)] rounded-[4px] cursor-pointer"
                                        :class="{ '!border-[var(--el-color-primary)]': item.id == formData.level_num }"
                                        @click="levelWeightChange(item.id)">{{ item.name }}</div>
                                    <el-input style="display: none;" v-model.trim="formData.level_num" clearable class="input-width" />
                                </template>

                            </div>
                            <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('levelWeightTip') }}</p>
                        </div>
                    </el-form-item>
                    <el-form-item :label="t('levelName')" prop="level_name">
                        <el-input v-model.trim="formData.level_name" maxlength="25" show-word-limit clearable :placeholder="t('levelNamePlaceholder')" class="input-width" />
                    </el-form-item>
                    <el-form-item :label="t('oneRate')" prop="one_rate">
                        <div>
                            <el-input v-model.trim="formData.one_rate" maxlength="6" clearable class="input-width" @keyup="filterDigit($event)">
                                <template #append>%</template>
                            </el-input>
                            <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('oneRatePlaceholder') }}</p>
                        </div>
                    </el-form-item>
                    <el-form-item :label="t('twoRate')" prop="two_rate" v-if="level == 2" >
                        <div>
                            <el-input v-model.trim="formData.two_rate" clearable maxlength="6" class="input-width" @keyup="filterDigit($event)">
                                <template #append>%</template>
                            </el-input>
                            <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('twoRatePlaceholder') }}</p>
                        </div>
                    </el-form-item>
                </el-card>
                <template v-if="formData.is_default == '0'">
                    <div class="text text-[14px] leading-[25px]">{{ t('titleTwo') }}</div>
                    <el-card class="card !border-none" shadow="never">
                        <el-form-item :label="t('upgradeMethod')" class="!mb-0">
                            <el-radio-group v-model="formData.upgrade_type">
                                <el-radio label="1">{{ t('upgradeMethodLabelOne') }}</el-radio>
                                <el-radio label="2">{{ t('upgradeMethodLabelTwo') }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item prop="card_ids" v-if="config.cardList.length">
                            <div class="mt-[10px] flex">
                                <div v-for="(item, index) in config.cardList" :key="index"
                                    class="h-[32px] flex flex-shrink-0 items-center mr-[10px] px-[16px] border-[1px] border-solid border-[var(--el-border-color)] rounded-[2px] cursor-pointer"
                                    :class="{ '!border-[var(--el-color-primary)]': item.is_checkbox }"
                                    @click="upgradeMethodChange(item)">
                                    <span class="text-[var(--el-text-color-regular)]">{{ item.card_name }}</span>
                                    <el-tooltip class="box-item" effect="light" :content="item.card_desc" placement="bottom">
                                        <span class="iconfont iconwenhao ml-[5px]"></span>
                                    </el-tooltip>
                                </div>
                            </div>
                        </el-form-item>
                    </el-card>
                    <div class="text text-[14px] leading-[25px]">{{ t('titleThree') }}</div>
                    <el-card class="card !border-none" shadow="never">
                        <template v-for="(item, index) in config.cardList" :key="index">
                            <el-form-item v-if="item.is_checkbox" :label="item.card_name" :prop="item.key" :rules="[{
                                trigger: 'blur',
                                required: true,
                                validator: (rule: any, value: any, callback: any) => {
                                    if (!value) {
                                        return callback(t('rulesPlaceholderOne') + item.card_name)
                                    } else if (value <= 0) {
                                        return callback(item.card_name + t('rulesPlaceholderThree'))
                                    } else if (!regExp.digit.test(value) && item.unit == '元') {
                                        return callback(`[${item.card_name}]${t('reserveDecimal')}`)
                                    } else if (!regExp.number.test(value) && item.unit != '元') {
                                        return callback(`[${item.card_name}]${t('rulesPlaceholderTwo')}`)
                                    } else {
                                        return callback()
                                    }
                                }
                            }]" label-width="175px">
                                <el-input v-if="item.key == 'fenxiao_order_money'" @keyup="filterDigit($event)" v-model.trim="formData[item.key]"  maxlength="7" clearable class="input-width mr-[10px]">
                                    <template #append>{{ item.unit }}</template>
                                </el-input>
                                <el-input v-else v-model.trim="formData[item.key]" @keyup="filterNumber($event)" maxlength="7" clearable class="input-width mr-[10px]">
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
import { getFenxiaoLevelInfo, getFenxiaoLevelNum, getFenxiaoLevelCard, addFenxiaoLevel, editFenxiaoLevel } from '@/addon/shop_fenxiao/api/level'
import { getFenxiaoConfig} from '@/addon/shop_fenxiao/api/config'
import { FormInstance } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { filterDigit, filterNumber } from '@/utils/common'

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
        { id: 10, name: '十级' }
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
    one_rate: '',
    two_rate: '',
    upgrade_type: '1',
    card_ids: []
}
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
const twoRateCheck = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error(t('twoRatePlaceholderOne')))
    } else if (!regExp.digit.test(value)) {
        return callback(new Error(t('twoRatePlaceholderTwo')))
    } else if (value >= 100) {
        return callback(new Error(t('twoRatePlaceholderThree')))
    } else if (value <= 0) {
        return callback(new Error(t('twoRatePlaceholderFour')))
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
        one_rate: [{ required: true, validator: oneRateCheck, trigger: 'blur' }],
        two_rate: [{ required: true, validator: twoRateCheck, trigger: 'blur' }],
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
const level = ref(1)
const getFenxiaoConfigFn=()=>{
    loading.value = true
    getFenxiaoConfig().then((res:any)=>{
        level.value = res.data.level
    }).catch(()=>{
        loading.value = false
    })
}
getFenxiaoConfigFn()
//获取详情
const getFenxiaoLevelInfoFn = (id: any) => {
    loading.value = true
    getFenxiaoLevelInfo(id).then((res) => {
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
//获取分销等级权重已设置列表
const getFenxiaoLevelNumFn = () => {
    loading.value = true
    getFenxiaoLevelNum().then((res: any) => {
        config.value.levelWeightDisableList = res.data.map((el: any) => el.level_num)
        getFenxiaoLevelCardFn(formData.id)
    }).catch(() => {
        loading.value = false
    })
}
getFenxiaoLevelNumFn()
//获取分销等级升级条件卡片数据
const getFenxiaoLevelCardFn = (id: any) => {
    getFenxiaoLevelCard({ id: id }).then((res: any) => {
        config.value.cardList = res.data
        if (formData.id) {
            getFenxiaoLevelInfoFn(formData.id)
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
            let api = formData.id ? editFenxiaoLevel : addFenxiaoLevel
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
    router.push('/shop_fenxiao/management/level')
};
</script>

<style lang="scss" scoped>
    .el-form-item {

        .el-form-item {
            margin-bottom: 18px;
        }
    }

    .el-input.el-input-group--append {
        width: 150px;
    }
</style>
