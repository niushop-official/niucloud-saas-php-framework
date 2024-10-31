<template>
    <el-dialog v-model="showDialog" :title="title || t('updateMember')" width="500px" :destroy-on-close="true">

        <el-form :model="saveData" label-width="90px" :rules="formRules" ref="formRef" class="page-form" v-loading="loading">
            <el-form-item :label="t('headimg')" v-if="type == 'headimg'">
                <upload-image v-model="saveData.headimg" />
            </el-form-item>
            <el-form-item :label="t('nickname')" v-if="type == 'nickname'">
                <el-input v-model.trim="saveData.nickname" clearable :placeholder="t('nickNamePlaceholder')" class="input-width" />
            </el-form-item>
            <el-form-item :label="t('birthday')" v-if="type == 'birthday'">
                <el-date-picker v-model="saveData.birthday" value-format="YYYY-MM-DD" type="date" :placeholder="t('birthdayTip')" />
            </el-form-item>
            <el-form-item :label="t('sex')" v-if="type == 'sex'">
                <el-select v-model="saveData.sex" clearable :placeholder="t('sexPlaceholder')" class="input-width">
                    <el-option :label="item['name']" :value="item['id']" v-for="(item,index) in sexSelectData" :key="index" />
                </el-select>
            </el-form-item>
            <el-form-item :label="t('memberLabel')" v-if="type == 'member_label'">
                <el-select v-model="saveData.member_label" multiple collapse-tags :placeholder="t('memberLabelPlaceholder')" class="input-width">
                    <el-option :label="item['label_name']" :value="item['label_id']" v-for="(item,index) in labelSelectData"  :key="index"/>
                </el-select>
            </el-form-item>
            <div v-if="type == 'member_level'">
                <el-form-item :label="t('memberLevelUpdate')" prop="member_level">
                    <el-select v-model="saveData.member_level" :placeholder="t('memberLevelPlaceholder')" class="input-width">
                        <el-option :label="t('memberLevelPlaceholder')" :value="0" />
                        <el-option :label="item['level_name']" :value="item['level_id']" v-for="(item,index) in levelSelectData"  :key="index"/>
                    </el-select>
                    <div class="text-sm text-gray-400">{{ t('memberLevelUpdateTips') }}</div>
                </el-form-item>
            </div>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{t('confirm')}}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import { deepClone } from '@/utils/common'
import type { FormInstance } from 'element-plus'
import { editMemberDetail, getMemberLabelAll, getMemberLevelAll } from '@/app/api/member'
import Test from '@/utils/test'

// 修改类型
const type = ref('')
const title = ref('')
// 会员id
const memberId = ref('')
const showDialog = ref(false)
const loading = ref(false)
const repeat = ref(false)
const formRef = ref(null)

const sexSelectData = ref([
    {
        id: 0,
        name: t('secrecySex')
    },
    {
        id: 1,
        name: t('manSex')
    },
    {
        id: 2,
        name: t('girlSex')
    }
])
const labelSelectData:any = ref(null)
// 获取全部标签
const getMemberLabelAllFn = async () => {
    labelSelectData.value = await (await getMemberLabelAll()).data
}
getMemberLabelAllFn()

const levelSelectData = ref([])
getMemberLevelAll().then(({ data }) => {
    levelSelectData.value = data
})

const formRules = computed(() => {
    return {
        member_level: [
            {
                validator: (rule: any, value: any, callback: Function) => {
                    if (Test.empty(saveData.member_level)) {
                        callback(t('memberLevelPlaceholder'))
                    }
                    callback()
                }
            }
        ]
    }
})

/**
 * 表单数据
 */
const initialFormData = {
    headimg: '',
    nickname: '',
    member_label: '',
    member_level: '',
    sex: '',
    birthday: ''
}
const saveData: Record<string, any> = reactive({ ...initialFormData })

const emit = defineEmits(['complete'])

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    await formRef.value?.validate((valid) => {
        if (valid) {
            loading.value = true

            if (repeat.value) return
            repeat.value = true

            let val = saveData[type.value];
            if(type.value == 'member_label'){
                // 将saveData[type.value]中的值，转换为字符串
                val = saveData[type.value] && saveData[type.value].length  ? deepClone(saveData[type.value]).join(',').split(',') : '';
            }

            const data = ref({
                member_id: memberId.value,
                field: type.value,
                value: val
            })

            editMemberDetail(data.value).then(res => {
                loading.value = false
                repeat.value = false
                showDialog.value = false
                emit('complete')
            }).catch(() => {
                loading.value = false
                repeat.value = false
            })
        }
    })
}

const setDialogType = async (row: any = null) => {
    loading.value = true
    type.value = row.type
    title.value = row.title
    memberId.value = row.id
    saveData[type.value] = row.data[type.value]
    if (type.value == 'member_label' && saveData[type.value]) {
        saveData[type.value].forEach((item: any, index: any) => {
            let isExist = false;
            for (let i = 0; i < labelSelectData.value.length; i++) {
                if (labelSelectData.value[i].label_id == item) {
                    isExist = true;
                    break;
                }
            }
            if (isExist) {
                saveData[type.value][index] = Number.parseFloat(item)
            } else {
                saveData[type.value].splice(index, 1); // 删除不存在的id
            }

        })
    }
    loading.value = false
}

defineExpose({
    showDialog,
    setDialogType
})
</script>

<style lang="scss" scoped></style>
