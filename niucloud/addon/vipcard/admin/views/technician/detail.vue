<template>
    <div class="main-container" v-loading="loading">
        <div class="detail-head !ml-[20px] !mb-[5px]">
            <div class="left" @click="back()">
                <span class="iconfont iconxiangzuojiantou !text-xs"></span>
                <span class="ml-[1px]">{{ t('returnToPreviousPage') }}</span>
            </div>
            <span class="adorn">|</span>
            <span class="right">{{ pageName }}</span>
        </div>
        <el-card class="box-card !border-none" shadow="never">
            <div class="member-info w-[250px]">
                <div class="flex items-center">
                    <span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('headimg') }}</span>
                    <span class="flex items-end text-[14px]">
                        <img class="w-[50px] h-[50px] inline-block rounded-[999px]" v-if="formData.image_thumb_small" :src="img(formData.image_thumb_small)" alt="" />
                        <img class="w-[50px] h-[50px] inline-block rounded-full" v-else src="@/app/assets/images/member_head.png" alt="" />
                    </span>
                </div>
            </div>
            <div class="flex items-center mt-[15px]">
                <span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('name') }}</span>
                <span class="text-[14px] text-[#666666]">{{ formData.name }}</span>
            </div>
            <div class="flex items-center mt-[15px]">
                <span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('mobile') }}</span>
                <span class="text-[14px] text-[#666666]">{{ formData.mobile }}</span>
            </div>

            <div class="flex items-center mt-[15px]">
                <span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('seniority') }}</span>
                <span class="text-[14px] text-[#666666]">{{ formData.seniority }}</span>
            </div>
            <div class="flex items-center mt-[15px]">
                <span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('number') }}</span>
                <span class="text-[14px] text-[#666666]">{{ formData.number }}</span>
            </div>
            <div class="flex items-center mt-[15px]">
                <span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('position') }}</span>
                <span class="text-[14px] text-[#666666]">{{ formData.position }}</span>
            </div>

            <div class="flex items-center mt-[15px]">
                <span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('status') }}</span>
                <span class="text-[14px] text-[#666666]" v-if="formData.status == 0">{{ t('disabled') }}</span>
                <span class="text-[14px] text-[#666666]" v-if="formData.status == 1">{{ t('normal') }}</span>
            </div>
            <div class="flex items-center mt-[15px]">
                <span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('createTime') }}</span>
                <span class="text-[14px] text-[#666666]">{{ formData.create_time }}</span>
            </div>
            <!-- <el-button type="primary">{{ t('search') }}</el-button> -->
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getTechnicianDetail } from '@/addon/vipcard/api/vipcard'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { img } from '@/utils/common'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const loading = ref(true)

// 获取会员信息
const id: number = parseInt(route.query.id || 0)
const formData: any = reactive({})

const getMemberInfoFn = async() => {
    loading.value = true
    if (id) {
        const data = await (await getTechnicianDetail(id)).data
        if (!data || Object.keys(data).length == 0) {
            ElMessage.error(t(''))
            setTimeout(() => {
                router.go(-1)
            }, 2000)
            return false
        }

        Object.keys(data).forEach((item) => {
            formData[item] = data[item]
        })
        loading.value = false
    } else {
        loading.value = false
    }
}
getMemberInfoFn()

const back = () => {
    history.back()
}
</script>

<style lang="scss" scoped>
.el-col {
    background-color: #FAFAFD;
}

.member-info-item {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
}
</style>
