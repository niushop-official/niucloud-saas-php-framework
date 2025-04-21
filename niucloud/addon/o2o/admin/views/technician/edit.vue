<template>
    <div class="main-container">
        <el-card class="card !border-none mb-[15px]" shadow="never">
            <el-page-header :content="id ? t('editTechnician') : t('addTechnician')" :icon="ArrowLeft" @back="back" />
        </el-card>

        <el-card class="box-card !border-none" shadow="never">
            <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form">
                <el-form-item :label="t('technicianName')" prop="name">
                    <el-input v-model.trim="formData.name" clearable :placeholder="t('technicianNamePlaceholder')" class="input-width" />
                </el-form-item>
                <el-form-item :label="t('headimg')" prop="headimg">
                    <upload-image v-model="formData.headimg" />
                </el-form-item>
                <el-form-item :label="t('age')" prop="age">
                    <el-input v-model.trim="formData.age" :placeholder="t('agePlaceholder')" @keyup="filterNumber($event)" class="input-width" @blur="formData.age = $event.target.value" maxlength="8">
                        <template #append>岁</template>
                    </el-input>
                </el-form-item>
                <el-form-item :label="t('sex')">
                    <el-radio-group v-model="formData.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                        <el-radio :label="0">保密</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="t('mobile')" prop="mobile">
                    <el-input v-model.trim="formData.mobile" clearable :placeholder="t('mobilePlaceholder')" @keyup="filterNumber($event)" class="input-width" @blur="formData.mobile = $event.target.value" maxlength="11" />
                </el-form-item>
                <el-form-item :label="t('seniority')" prop="working_age">
                    <el-input v-model.trim="formData.working_age" :placeholder="t('seniorityPlaceholder')" @keyup="filterNumber($event)" class="input-width" @blur="formData.working_age = $event.target.value" maxlength="2">
                        <template #append>年</template>
                    </el-input>
                </el-form-item>
                <el-form-item :label="t('status')">
                    <el-radio-group v-model="formData.status">
                        <el-radio label="1">在职</el-radio>
                        <el-radio label="-1">离职</el-radio>
                        <el-radio label="0">休息中</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="t('position')" prop="position">
                    <el-select v-model="formData.position_id" value-key="id" :placeholder="t('positionPlaceholder')" class="input-width">
                        <el-option v-for="(item, index) in positionList" :key="index" :label="item.name" :value="item.id" />
                    </el-select>
                    <div class="ml-[10px]">
                        <span class="cursor-pointer text-primary mr-[10px]" @click="getPositionListToFn(true)">{{ t('refresh') }}</span>
                        <span class="cursor-pointer text-primary" @click="topositionEvent">{{ t('add') }}</span>
                    </div>
                </el-form-item>
                <el-form-item :label="t('label')">
                    <div>
                        <el-tag v-for="(item, index) in formData.label" :key="index" class="mx-1" closable :disable-transitions="false" @close="handleClose(item)">{{ item }}
                        </el-tag>
                        <el-input v-if="inputStatus" ref="InputRef" v-model.trim="inputTag" class="ml-1 !w-20" size="small" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
                        <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">新增标签
                        </el-button>
                    </div>
                </el-form-item>
                <el-form-item :label="t('project')" prop="goods_ids">
                    <el-select v-model="formData.goods_ids" multiple :placeholder="t('projectPlaceholder')" class="input-width">
                        <el-option :label="item.goods_name" :value="item.goods_id" v-for="(item, index) in projectList" :key="index" />
                    </el-select>
                    <div class="ml-[10px]">
                        <span class="cursor-pointer text-primary mr-[10px]" @click="getGoodsListToFn(true)">{{ t('refresh') }}</span>
                        <span class="cursor-pointer text-primary" @click="topositionEvent2">{{ t('add') }}</span>
                    </div>
                </el-form-item>
                <el-form-item :label="t('member')" prop="member_id">
                    <div class="!w-[200px] border-[1px] border-[#e4e4e4] border-solid px-[11px] h-[30px]">{{ formData.member_nickname }}</div>
                    <el-button class="ml-[10px]" type="primary" @click="dialogMemberVisible = true">选择会员</el-button>
                </el-form-item>
                <!-- <el-form-item :label="t('images')" prop="images">
                            <upload-image v-model="formData.images" :limit="6" />
                        </el-form-item> -->
                <el-form-item :label="t('desc')" prop="desc">
                    <el-input v-model.trim="formData.desc" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" clearable :placeholder="t('labelPlaceholder')" class="input-width" maxlength="200" />
                </el-form-item>
            </el-form>
        </el-card>
        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="onSave(formRef)">{{ t('save') }}</el-button>
                <el-button @click="back()">{{ t('cancel') }}</el-button>
            </div>
        </div>
    </div>
    <el-dialog v-model="dialogMemberVisible" title="请选择会员" width="720px">
        <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
            <el-form :inline="true" :model="technicianTable" ref="searchFormRef">
                <el-form-item :label="t('keyword')" prop="keyword">
                    <el-input v-model.trim="technicianTable.keyword" :placeholder="t('keywordPlaceholder')" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getMemberListFn()">{{ t('search') }}</el-button>
                    <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-table :data="memberList.data" v-loading="memberList.loading" class="member-table">
            <template #empty>
                <span>{{ !memberList.loading ? t('emptyData') : '' }}</span>
            </template>
            <el-table-column prop="nickname" label="昵称" width="180" />
            <el-table-column prop="username" label="用户名" />
            <el-table-column prop="mobile" label="手机号" width="180" />
            <el-table-column :label="t('operation')" fixed="right" min-width="50" align="right">
                <template #default="{ row }">
                    <el-button type="primary" link @click="confirmEvent(row)">确定</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="mt-[16px] flex justify-end">
            <el-pagination v-model:current-page="memberList.page" v-model:page-size="memberList.limit" layout="total, sizes, prev, pager, next, jumper" :total="memberList.total" @size-change="getMemberListFn" @current-change="getMemberListFn" />
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, nextTick, toRefs } from 'vue'
import { t } from '@/lang'
import { ElMessage, type FormInstance } from 'element-plus'
import {
    getTechnicianDetail,
    editTechnician,
    addTechnician,
    getPositionListTo,
    getMemberList
} from '@/addon/o2o/api/technician'
import { getGoodsListTo } from '@/addon/o2o/api/goods'
import cloneDeep from 'lodash-es/cloneDeep'
import { filterNumber } from '@/utils/common'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const id: number = parseInt(route.query.id)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    id: id ?? '',
    name: '',
    headimg: '',
    age: '',
    sex: 1,
    mobile: '',
    working_age: '',
    status: '1',
    position_id: '',
    position_name: '',
    label: [],
    goods_ids: [],
    member_nickname: '',
    member_id: '',
    images: '',
    desc: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })
const technicianTable: Record<string, any> = reactive({})
const searchFormRef = ref()
const resetForm = (formEl: any) => {
    if (!formEl) return
    formEl.resetFields()
    getMemberListFn()
}
const inputStatus = ref(false) // 是否展示input
const inputTag = ref('') // input输入的值
const InputRef = ref()
// 删除标签
const handleClose = (tag: string) => {
    formData.label.splice(formData.label.indexOf(tag), 1)
}
// 显示input框
const showInput = () => {
    inputStatus.value = true
    nextTick(() => {
        InputRef.value!.input!.focus()
    })
}
// 增加标签
const handleInputConfirm = () => {
    if (inputTag.value) {
        if (formData.label.includes(inputTag.value)) {
            ElMessage.error('添加的标签已存在')
        } else {
            formData.label.push(inputTag.value)
        }
    }
    inputStatus.value = false
    inputTag.value = ''
}

const setFormData = async(id: number = 0) => {
    Object.assign(formData, initialFormData)
    const data = await (await getTechnicianDetail(id)).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
        if (data[key] != undefined && key == 'label') {
            if (data[key] != '') {
                formData[key] = data[key].split(',')
            } else {
                formData[key] = []
            }
        }
    })
    formData.member_nickname = data.member.nickname
    if (data.goods.length) {
        formData.goods_ids = data.goods.map((item: any) => {
            return item.goods_id
        })
    }
}
if (id) setFormData(id)

// 岗位列表(不分页)
const positionList = ref([])
const getPositionListToFn = (e: any = false) => {
    getPositionListTo().then((res: any) => {
        positionList.value = res.data
        if (e) {
            ElMessage.success(t('refreshSuccess'))
        }
    })
}
getPositionListToFn()
// 项目列表 (不分页)
const projectList = ref([])
const getGoodsListToFn = (e: any = false) => {
    getGoodsListTo().then((res: any) => {
        projectList.value = res.data
        if (e) {
            ElMessage.success(t('refreshSuccess'))
        }
    })
}
getGoodsListToFn()
// 会员列表
const memberList = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: false,
    data: []
})
const getMemberListFn = (page: number = 1) => {
    memberList.loading = true
    memberList.page = page
    getMemberList({
        page: memberList.page,
        limit: memberList.limit,
        ...technicianTable
    }).then((res: any) => {
        memberList.loading = false
        memberList.total = res.data.total
        memberList.data = res.data.data
    })
}
getMemberListFn()

const dialogMemberVisible = ref(false)
const confirmEvent = (val: any) => {
    formData.member_id = val.member_id
    formData.member_nickname = val.nickname
    dialogMemberVisible.value = false
}

const formRef = ref<FormInstance>()

// 表单验证规则
const validatePhone = (rule, value, callback) => {
    const phonePattern = /^1[3456789]\d{9}$/
    if (!value) {
        return callback(new Error('请输入联系电话'))
    } else if (!phonePattern.test(value)) {
        return callback(new Error('联系电话格式不正确'))
    } else {
        return callback()
    }
}
const formRules = computed(() => {
    return {
        name: [{ required: true, message: t('technicianNamePlaceholder'), trigger: 'blur' }],
        headimg: [{ required: true, message: t('headimgPlaceholder'), trigger: 'change' }],
        age: [{ required: true, message: t('agePlaceholder'), trigger: 'blur' }],
        position_name: [{ required: true, message: t('positionPlaceholder'), trigger: 'change' }],
        working_age: [{ required: true, message: t('seniorityPlaceholder'), trigger: 'blur' }],
        mobile: [{ required: true, validator: validatePhone, trigger: 'blur' }],
        goods_ids: [{ required: true, message: t('projectPlaceholder'), trigger: 'change' }],
        member_id: [{ required: true, message: t('memberPlaceholder'), trigger: 'blur' }]
    }
})

const onSave = async(formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate(async(valid) => {
        if (valid) {
            loading.value = true
            if (positionList.value.length > 0) {
                positionList.value.forEach((item) => {
                    if ((item.id = formData.position_id)) {
                        formData.position_name = item.name
                    }
                })
            }
            const data = cloneDeep(formData)
            data.label = data.label.join(',')
            data.goods_ids = data.goods_ids.toString()
            const save = id ? editTechnician : addTechnician
            save(data).then((res) => {
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

//   跳转到岗位列表
const topositionEvent = () => {
    const url = router.resolve({
        path: '/site/o2o/technician/position_list'
    })
    window.open(url.href)
}
//   跳转到关联项目
const topositionEvent2 = () => {
    const url = router.resolve({
        path: '/site/o2o/goods/list'
    })
    window.open(url.href)
}
</script>

<style lang="scss" scoped>
.member-table :deep(.cell) {
    padding: 0 12px !important;
}
</style>
