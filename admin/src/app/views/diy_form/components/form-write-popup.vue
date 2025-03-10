<template>
    <el-dialog v-model="showDialog" :title="t('writeSet')" width="600px" class="diy-dialog-wrap" :close-on-press-escape="true" :destroy-on-close="true" :close-on-click-modal="false">

        <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">

<!--            <el-form-item :label="t('填写方式')">-->
<!--                <el-radio-group v-model="formData.write_way">-->
<!--                    <el-radio label="no_limit">{{t('不限制')}}</el-radio>-->
<!--                    <el-radio label="scan">{{t('仅限扫一扫')}}</el-radio>-->
<!--                    <el-radio label="url">{{t('仅限链接进入')}}</el-radio>-->
<!--                </el-radio-group>-->
<!--            </el-form-item>-->

            <el-form-item :label="t('joinMemberType')">
                <el-radio-group v-model="formData.join_member_type">
                    <el-radio label="all_member">{{t('allMember')}}</el-radio>
                    <el-radio label="selected_member_level">{{t('selectedMemberLevel')}}</el-radio>
                    <el-radio label="selected_member_label">{{t('selectedMemberLabel')}}</el-radio>
                </el-radio-group>
            </el-form-item>

            <!-- 会员标签 -->
            <el-form-item :label="t('memberLabel')" prop="label_ids" v-if="formData.join_member_type=='selected_member_label'">
                <el-select v-model="formData.label_ids" clearable multiple :placeholder="t('memberLabelPlaceholder')" class="input-width">
                    <el-option :label="item['label_name']" :value="item['label_id']" v-for="(item, index) in labelSelectData" :key="index" />
                </el-select>
            </el-form-item>

            <!-- 会员等级 -->
            <el-form-item :label="t('memberLevel')" prop="level_ids" v-if="formData.join_member_type=='selected_member_level'">
                <el-select v-model="formData.level_ids" clearable multiple :placeholder="t('memberLevelPlaceholder')" class="input-width">
                    <el-option :label="item['level_name']" :value="item['level_id']" v-for="(item, index) in levelSelectData" :key="index" />
                </el-select>
            </el-form-item>

            <el-form-item :label="t('apieceFillQuantity')" :class="{ '!mb-[5px]' : formData.member_write_type == 'diy' }">
                <el-radio-group v-model="formData.member_write_type">
                    <el-radio label="no_limit">{{t('noLimit')}}</el-radio>
                    <el-radio label="diy">{{t('diy')}}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label=" " v-if="formData.member_write_type == 'diy'" prop="member_write_rule">
                <div class="flex items-center">
                    <span>每</span>
                    <el-input v-model.trim="formData.member_write_rule.time_value" @keyup="filterNumber($event)" size="small" class="!w-[50px] px-[5px]" maxlength="3" />
                    <el-select v-model="formData.member_write_rule.time_unit" class="!w-[60px] pr-[5px]" size="small">
                        <el-option v-for="(item, index) in validityOptions" :key="item.value" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                    <span>可填写</span>
                    <el-input v-model.trim="formData.member_write_rule.num" @keyup="filterNumber($event)" size="small" class="!w-[50px] px-[5px]" maxlength="3" />
                    <span>次</span>
                </div>
            </el-form-item>

            <el-form-item :label="t('fillQuantityTotal')" :class="{ '!mb-[5px]' : formData.form_write_type == 'diy' }">
                <el-radio-group v-model="formData.form_write_type">
                    <el-radio label="no_limit">{{t('noLimit')}}</el-radio>
                    <el-radio label="diy">{{t('diy')}}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label=" " v-if="formData.form_write_type == 'diy'" prop="form_write_rule">
                <div class="flex items-center">
                    <span>每</span>
                    <el-input v-model.trim="formData.form_write_rule.time_value" @keyup="filterNumber($event)" size="small" class="!w-[50px] px-[5px]" maxlength="3" />
                    <el-select v-model="formData.form_write_rule.time_unit" class="!w-[60px] pr-[5px]" size="small">
                        <el-option v-for="(item, index) in validityOptions" :key="item.value" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                    <span>可填写</span>
                    <el-input v-model.trim="formData.form_write_rule.num" @keyup="filterNumber($event)" size="small" class="!w-[50px] px-[5px]" maxlength="3" />
                    <span class="mr-[5px]">次</span>
                    <el-tooltip effect="light" placement="top">
                        <template #content>
                            <p class="w-[250px]">{{ t('writeTips') }}</p>
                        </template>
                        <el-icon>
                            <QuestionFilled color="#999999" />
                        </el-icon>
                    </el-tooltip>
                </div>
            </el-form-item>

            <el-form-item :label="t('fillInTheTimePeriod')" prop="time_limit_rule">
                <el-radio-group v-model="formData.time_limit_type">
                    <el-radio label="no_limit">{{t('noLimit')}}</el-radio>
                    <el-radio label="specify_time">{{t('setSpecifyTime')}}</el-radio>
                    <el-radio label="open_day_time">{{t('openDayTime')}}</el-radio>
                </el-radio-group>
                <el-date-picker v-if="formData.time_limit_type == 'specify_time'" v-model="formData.time_limit_rule.specify_time" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" />
                <div class="flex items-center mt-[5px]" v-if="formData.time_limit_type == 'open_day_time'">
                    <span class="mr-[5px]">每天</span>
                    <el-time-picker class="!w-[180px]" v-model="formData.time_limit_rule.open_day_time" format="HH:mm" value-format="HH:mm" is-range range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" />
                    <span class="ml-[5px]">可填写</span>
                </div>
            </el-form-item>

<!--            <el-form-item :label="t('允许修改内容')" class="display-block">-->
<!--                <el-switch v-model="formData.is_allow_update_content" :active-value="1" :inactive-value="0" />-->
<!--                <div class="text-sm text-gray-400">{{ t('开启后，填表人可以修改自己填写的内容。') }}</div>-->
<!--            </el-form-item>-->

<!--            <el-form-item :label="t('填写须知')">-->
<!--                <el-input v-model.trim="formData.write_instruction" :placeholder="t('请输入填写须知')" type="textarea" maxlength="500" show-word-limit rows="5" class="w-[400px]" clearable />-->
<!--            </el-form-item>-->

        </el-form>

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
import type { FormInstance } from 'element-plus'
import { filterNumber } from '@/utils/common'
import {getMemberLabelAll,getMemberLevelAll } from '@/app/api/member'
import { getFormWriteConfig,editDiyFormWriteConfig } from '@/app/api/diy_form'

const showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    id: 0,
    form_id: 0, // 万能表单id
    write_way: 'no_limit', // 填写方式，no_limit：不限制，scan：仅限微信扫一扫，url：仅限链接进入
    join_member_type: 'all_member', // 参与会员，all_member：所有会员参与，selected_member_level：指定会员等级，selected_member_label：指定会员标签
    level_ids: [], // 会员等级id集合
    label_ids: [], // 会员标签id集合
    member_write_type: 'no_limit', // 每人可填写次数，no_limit：不限制，diy：自定义
    // 每人可填写次数自定义规则
    member_write_rule: {
        time_value: 1, // 时间
        time_unit: 'day', // 时间单位
        num: 1 // 可填写次数
    },
    form_write_type: 'no_limit', // 表单可填写数量，no_limit：不限制，diy：自定义
    // 表单可填写总数自定义规则
    form_write_rule: {
        time_value: 1, // 时间
        time_unit: 'day', // 时间单位
        num: 1 // 可填写次数
    },
    time_limit_type: 'no_limit', // 填写时间限制类型，no_limit：不限制，specify_time：指定开始结束时间，open_day_time：设置每日开启时间
    // 填写时间限制规则
    time_limit_rule: {
        specify_time: [], // 指定开始结束时间
        open_day_time: [], // 设置每日开启时间
    },
    is_allow_update_content: 0, // 是否允许修改自己填写的内容，0：否，1：是
    write_instruction: '', // 表单填写须知
}

const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        label_ids: [
            { required: true, message: t('labelTips'), trigger: 'blur' }
        ],
        level_ids: [
            { required: true, message: t('levelTips'), trigger: 'blur' }
        ],
        member_write_rule: [
            {
                validator: (rule: any, value: string, callback: any) => {
                    let unit = ''
                    validityOptions.forEach((item,index)=>{
                        if(item.value == value.time_unit){
                            unit = item.text;
                        }
                    })
                    if(formData.member_write_type == 'diy'){
                        if(!value.time_value){
                            callback(new Error(`${unit}数不能为空`))
                        }else if(!value.num){
                            callback(new Error(t('numCannotNull')))
                        }else{
                            callback()
                        }
                    }else{
                        callback()
                    }
                },
                trigger: ['blur', 'change']
            }
        ],
        form_write_rule: [
            {
                validator: (rule: any, value: string, callback: any) => {
                    let unit = ''
                    validityOptions.forEach((item,index)=>{
                        if(item.value == value.time_unit){
                            unit = item.text;
                        }
                    })
                   if(formData.member_write_type == 'diy'){
                        if(!value.time_value){
                            callback(new Error(`${unit}数不能为空`))
                        }else if(!value.num){
                            callback(new Error(t('numCannotNull')))
                        }else{
                            callback()
                        }
                    }else{
                        callback()
                    }
                },
                trigger: ['blur', 'change']
            }
        ],
        time_limit_rule: [
            {
                validator: (rule: any, value: string, callback: any) => {
                    if (formData.time_limit_type == 'specify_time' && (!value.specify_time || !value.specify_time.length)) {
                        callback(new Error(t('timeLimitRuleOne')))
                    } else if (formData.time_limit_type == 'open_day_time' && (!value.open_day_time || !value.open_day_time.length)) {
                        callback(new Error(t('timeLimitRuleTwo')))
                    } else if (formData.time_limit_type == 'open_day_time' && value.open_day_time && value.open_day_time.length) {
                        if (value.open_day_time[0] == value.open_day_time[1]) {
                            callback(new Error(t('timeLimitRuleThree')))
                        } else {
                            callback()
                        }
                    } else {
                        callback()
                    }
                },
                trigger: ['blur', 'change']
            }
        ]
    }
})

const levelSelectData = ref([])
const labelSelectData = ref([])

// 获取全部标签
getMemberLabelAll().then(({ data }) => {
    labelSelectData.value = data
})

getMemberLevelAll().then(({ data }) => {
    levelSelectData.value = data
})

const validityOptions = reactive([
    {
        text:'天',
        value:'day'
    },
    {
        text:'周',
        value:'week'
    },
    {
        text:'月',
        value:'month'
    },
    {
        text:'年',
        value:'year'
    }
])

const emit = defineEmits(['complete'])

const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    loading.value = true
    if (row) {
        const data = await (await getFormWriteConfig(row.form_id)).data
        if (data && Object.keys(data).length) {
            Object.keys(formData).forEach((key: string) => {
                if (data[key] != undefined) formData[key] = data[key]
            })
        }else{
            formData.form_id = row.form_id;
        }
    }
    loading.value = false
}

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true

            const data = formData

            editDiyFormWriteConfig(data).then(res => {
                loading.value = false
                showDialog.value = false
                emit('complete')
            }).catch(err => {
                loading.value = false
            })
        }
    })
}

const filterSpecial = (event:any) => {
    event.target.value = event.target.value.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '')
    event.target.value = event.target.value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '')
}

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss" scoped></style>
<style lang="scss">
.diy-dialog-wrap .el-form-item__label{
    height: auto  !important;
}

.display-block {
    .el-form-item__content {
        display: block;
    }
}
</style>
