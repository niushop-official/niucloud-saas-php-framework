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

                    <!-- 直推奖 -->
                    <el-form-item :label="t('Rate')" prop="recommend_rate">
                        <div>
                            <el-input v-model="formData.recommend_rate" clearable class="input-width" @keyup="filterDigit($event)" style="margin-right: 20px; width: 250px;">
                                <template #append>%（按比例）</template>
                            </el-input>
                            <el-input v-model="formData.recommend_money" clearable class="input-width" @keyup="filterDigit($event)" style="width: 280px;">
                                <template #append>元（按固定金额）</template>
                            </el-input>
                            <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('oneRatePlaceholder') }}</p>
                        </div>
                    </el-form-item>

                    <!-- 见点奖 -->
                    <el-form-item :label="t('seeRate')" prop="see_rate" v-if="formData.level_num > 1">
                        <div>
                            <el-input v-model="formData.see_rate" clearable class="input-width" @keyup="filterDigit($event)" style="margin-right: 20px; width: 250px;">
                                <template #append>%（按比例）</template>
                            </el-input>
                            <el-input v-model="formData.see_money" clearable class="input-width" @keyup="filterDigit($event)" style="width: 280px;">
                                <template #append>元（按固定金额）</template>
                            </el-input>
                            <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('seeRatePlaceholder') }}</p>
                        </div>
                    </el-form-item>

                    <!-- 培育奖 -->
                    <el-form-item :label="t('cultivateRate')" prop="cultivate_rate" v-if="formData.level_num > 1">
                        <div>
                            <el-input v-model="formData.cultivate_rate" clearable class="input-width" @keyup="filterDigit($event)" style="margin-right: 20px; width: 250px;">
                                <template #append>%（按比例）</template>
                            </el-input>
                            <el-input v-model="formData.cultivate_money" clearable class="input-width" @keyup="filterDigit($event)" style="width: 280px;">
                                <template #append>元（按固定金额）</template>
                            </el-input>
                            <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('cultivateRatePlaceholder') }}</p>
                        </div>
                    </el-form-item>

                    <!-- 平级奖 -->
                    <el-form-item :label="t('equalRate')" prop="equal_rate" v-if="formData.level_num > 1">
                        <div>
                            <el-input v-model="formData.equal_rate" clearable class="input-width" @keyup="filterDigit($event)" style="margin-right: 20px; width: 250px;">
                                <template #append>%（按比例）</template>
                            </el-input>
                            <el-input v-model="formData.equal_money" clearable class="input-width" @keyup="filterDigit($event)" style="width: 280px;">
                                <template #append>元（按固定金额）</template>
                            </el-input>
                            <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('equalRatePlaceholder') }}</p>
                        </div>
                    </el-form-item>
                </el-card>


                <!-- 冻结设置 -->
                <template v-if="formData.is_default == '0' && formData.level_num > 1" >
                    <div class="text-sm leading-[25px] title">{{ t('titleFour') }}</div>
                    <el-card class="box-card !border-none" shadow="never">
                        <el-form-item :label="t('seeFrozen')" >
                            <el-radio-group v-model="formData.see_frozen">
                                <el-radio label="0">{{ t('seeFrozen0') }}</el-radio>
                                <el-radio label="1">{{ t('seeFrozen1') }}</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item :label="t('cultivateFrozen')" >
                            <el-radio-group v-model="formData.cultivate_frozen">
                                <el-radio label="0">{{ t('seeFrozen0') }}</el-radio>
                                <el-radio label="1">{{ t('seeFrozen1') }}</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item :label="t('frozenRate')" >
                            <el-input v-model="formData.frozen_rate" clearable class="input-width" @keyup="filterDigit($event)" style="width: 280px;">
                                <template #append>%（按比例计算）</template>
                            </el-input>
                        </el-form-item>

                       
                    </el-card>
                </template>

                <!-- 解冻设置 -->
                <template v-if="formData.is_default == '0' && formData.level_num > 1" >
                    <div class="text-sm leading-[25px] title">{{ t('titleFive') }}</div>
                    <el-card class="box-card !border-none" shadow="never">
                        <el-form-item :label="t('taskBossFirst')">
                            <el-radio-group v-model="formData.task_boss_first">
                                <el-radio label="1">{{ t('taskBossFirst1') }}</el-radio>
                                <el-radio label="0">{{ t('taskBossFirst0') }}</el-radio>  
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item :label="t('taskBossNum')">
                            <el-input v-model="formData.task_boss_num" clearable class="input-width" @keyup="filterDigit($event)" style="width: 180px; margin-right: 20px;">
                                <template #append>人</template>
                            </el-input>
                            <!-- <span style="font-size: 18px; font-weight: 580;">或</span> -->
                            <!-- <span style="margin-left: 20px;">{{ t('taskBossFirst') }}</span> -->
                            <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('unfrozen_tips') }}</p>
                        </el-form-item>

                        <el-form-item :label="t('taskLimitDays')">
                            <el-input v-model="formData.task_limit_days" clearable class="input-width" @keyup="filterDigit($event)" style="width: 180px; margin-right: 20px;">
                                <template #append>天</template>
                            </el-input>
                            <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('taskLimitDays_tips') }}</p>
                            <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('taskLimitDays_tips1') }}</p>
                        </el-form-item>
                    </el-card>
                </template>


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
import { getLevelInfo, getLevelNum, getLevelCard, addLevel, editLevel } from '@/addon/ly_lian/api/level'
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
    id: 0,
    is_default: '0',
    level_num: 0,
    level_name: '',
    recommend_money: '0.00',
    recommend_rate: '0.00',
    see_money: '0.00',
    see_rate: '0.00',
    cultivate_money: '0.00',
    cultivate_rate: '0.00',
    equal_rate: '0.00',
    equal_money: '0.00',
    recharge_money: '0.00',
    upgrade_type: '0',
    see_frozen: '0',
    cultivate_frozen: '0',
    frozen_rate: 0.00,
    task_boss_num: 0,
    task_boss_first: '1',
    task_limit_days: 0,
    recommend_num: 0,
    up_goods_num: 0,
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
// const oneRateCheck = (rule: any, value: any, callback: any) => {
//     if (!value) {
//         return callback(new Error(t('oneRatePlaceholderOne')))
//     } else if (!regExp.digit.test(value)) {
//         return callback(new Error(t('oneRatePlaceholderTwo')))
//     } else if (value >= 100) {
//         return callback(new Error(t('oneRatePlaceholderThree')))
//     } else if (value <= 0) {
//         return callback(new Error(t('oneRatePlaceholderFour')))
//     } else {
//         return callback()
//     }
// }
// const twoRateCheck = (rule: any, value: any, callback: any) => {
//     if (!value) {
//         return callback(new Error(t('twoRatePlaceholderOne')))
//     } else if (!regExp.digit.test(value)) {
//         return callback(new Error(t('twoRatePlaceholderTwo')))
//     } else if (value >= 100) {
//         return callback(new Error(t('twoRatePlaceholderThree')))
//     } else if (value <= 0) {
//         return callback(new Error(t('twoRatePlaceholderFour')))
//     } else {
//         return callback()
//     }
// }
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
const getLevelInfoFn = (id: any) => {
    getLevelInfo(id).then((res) => {
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
//获取链动等级权重已设置列表
const getLevelNumFn = () => {
    loading.value = true
    getLevelNum().then((res: any) => {
        config.value.levelWeightDisableList = res.data.map((el: any) => el.level_num)
        getLevelCardFn(formData.id)
    }).catch(() => {
        loading.value = false
    })
}
getLevelNumFn()
//获取链动等级升级条件卡片数据
const getLevelCardFn = (id: any) => {
    getLevelCard({ id: id }).then((res: any) => {
        config.value.cardList = res.data
        if (formData.id) {
            getLevelInfoFn(formData.id)
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
            let api = formData.id ? editLevel : addLevel
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
    router.push('/ly_lian/level')
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
