<template>
    <!--成长值规则-->
    <div class="main-container" v-loading="loading">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
            </div>

            <div class="mt-[20px]">
                <div class="flex items-center bg">
                    <span class="p-[15px] w-[25%] text-[14px]">规则名称</span>
                    <span class="p-[15px] w-[15%] text-[14px]">所属应用</span>
                    <span class="p-[15px] w-[35%] text-[14px]">规则详情</span>
                    <span class="p-[15px] w-[15%] text-[14px]">是否启用</span>
                    <span class="p-[15px] w-[10%] text-[14px]">操作</span>
                </div>
                <div v-for="(item, key) in rules" :key="key"  class="flex items-center">
                    <span class="p-[15px] w-[25%] text-[14px]">{{ item.name }}</span>
                    <span class="p-[15px] w-[15%] text-[14px]">{{ item.addon_name }}</span>
                    <span class="p-[15px] w-[35%] text-[14px] text-[#666]">{{ rulesData[item.key] && rulesData[item.key].content ? rulesData[item.key].content : '--' }}</span>
                    <span class="p-[15px] w-[15%] text-[14px] text-[#666]">
                        <el-tag type="success" v-if="rulesData[item.key] && rulesData[item.key].is_use">已启用</el-tag>
                        <el-tag type="danger" v-else>未启用</el-tag>
                    </span>
                    <span class="p-[15px] w-[10%] text-[14px] text-[#666] text-[var(--el-color-primary)] cursor-pointer" @click="examineFn(key)">配置</span>
                </div>
            </div>

            <el-dialog v-model="ruleDialog" :title="'规则配置'" width="600px" :destroy-on-close="true" :close-on-click-modal="false">
                <div v-for="(item, key) in rules" :key="key" class="pl-[60px]">
                    <component :is="item.component" v-model="formData[item.key]" ref="ruleRefs" v-if="item.component && currRule == key"/>
                </div>

                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="ruleDialog = false">{{ t('cancel') }}</el-button>
                        <el-button type="primary" @click="onSave()">{{ t('confirm') }}</el-button>
                    </span>
                </template>
            </el-dialog>

        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { t } from '@/lang'
import { getGrowthRuleConfig, setGrowthRuleConfig, getGrowthRuleDict } from '@/app/api/member'
import Test from '@/utils/test'
import { cloneDeep } from 'lodash-es'

const route = useRoute()
const pageName = route.meta.title
const rules = ref({})
const rulesData = ref<any>({}) // 规则数据
const formData = ref<any>({})
const ruleRefs = ref(null)
const loading = ref(true)

const modules: any = import.meta.glob('@/**/*.vue')
getGrowthRuleDict().then(({ data }) => {
    Object.keys(data).forEach((key: string) => {
        data[key].component && (data[key].component = defineAsyncComponent(modules[data[key].component]))
    })
    rules.value = data
})

const ruleConfigFn = () => {
    getGrowthRuleConfig().then(({ data }) => {
        !Test.empty(data) && (rulesData.value = data)
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}
ruleConfigFn()

const saveLoading = ref(false)
const onSave = async () => {
    if (await ruleRefs.value[0].verify()) {
        if (saveLoading.value) return
        saveLoading.value = true

        setGrowthRuleConfig(formData.value).then(() => {
            ruleDialog.value = false
            saveLoading.value = false
            ruleConfigFn()
        }).catch(() => {
            saveLoading.value = false
        })
    }
}

const ruleDialog = ref(false)
// 查看操作
const currRule = ref('')
const examineFn = (key:string) => {
    formData.value = cloneDeep(rulesData.value)
    ruleDialog.value = true
    currRule.value = key
}
</script>

<style lang="scss" scoped></style>
