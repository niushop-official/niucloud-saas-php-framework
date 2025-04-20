<template>
    <div class="main-container p-4">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-change="tabChange">
            <el-tab-pane label="基础设置" name="basic" />
            <!-- <el-tab-pane label="用户端显示设置" name="usershow" />
            <el-tab-pane label="代理后台权限设置" name="auth" /> -->
        </el-tabs>

        <div v-if="activeName == 'basic'">
            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
            </div>


        <!-- <div class="flex ml-[18px] justify-between items-center mt-[20px]" style="margin-left: 30px;">
			<span class="text-page-title">{{pageName}}</span>
		</div> -->
            <el-form :model="formData" label-width="150px" ref="ruleFormRef" :rules="rules" class="page-form" v-loading="loading" style="margin-left: 30px;">
                <el-card class="box-card !border-none" shadow="never">

                    <el-form-item :label="t('isOpen')">
                        <el-switch  v-model="formData.is_open" />
                    </el-form-item>

                    <template v-if="formData.is_open != '0'">
                        <!-- <el-form-item :label="t('isMax')"  prop="min">
                            <el-input v-model="formData.min" @keyup="filterDigit($event)" class="input-width" :placeholder="t('cashWithdrawalAmountPlaceholder')" />
                        </el-form-item> -->
                        <!-- 奖励计算方式 -->
                        <el-form-item :label="t('countType')">
                            <el-radio-group v-model="formData.count_type">
                                <el-radio label="0">{{ t('countType0') }}</el-radio>
                                <el-radio label="1">{{ t('countType1') }}</el-radio>
                                <el-radio label="2">{{ t('countType2') }}</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <!-- 提成方式：余额、佣金、积分、数字积分 -->
                        <el-form-item :label="t('takeType')">
                                <div class="flex flex-col">
                                    <el-radio-group v-model="formData.take_type">
                                        <el-radio label="0">{{ t('takeType0') }}</el-radio>
                                        <el-radio label="1">{{ t('takeType1') }}</el-radio>
                                        <el-radio label="2">{{ t('takeType2') }}</el-radio>
                                        <!-- <el-radio label="3">{{ t('takeType3') }}</el-radio> -->
                                    </el-radio-group>
                                    <span class="text-[#999] text-[12px]">{{t('takeType_tips')}}</span>
                                </div>
                        </el-form-item>

                        <!-- 是否可代理多区域 -->
                        <el-form-item :label="t('becomeMany')" >
                            <div class="flex flex-col">
                                <el-radio-group v-model="formData.become_many">
                                    <el-radio label="0">{{ t('becomeMany0') }}</el-radio>
                                    <el-radio label="1">{{ t('becomeMany1') }}</el-radio>
                                </el-radio-group>
                                <!-- <span class="text-[#999] text-[12px]">{{t('becomeMany_tips')}}</span> -->
                            </div>
                        </el-form-item>

                        <!-- 申请是否需要审核 -->
                        <!-- <el-form-item :label="t('isBecome')" >
                            <div class="flex flex-col">
                                <el-radio-group v-model="formData.is_become">
                                    <el-radio label="0">{{ t( 'isBecome0') }}</el-radio>
                                    <el-radio label="1">{{ t('isBecome1') }}</el-radio>
                                </el-radio-group>
                                <span class="text-[#999] text-[12px]">{{t('isBecome_tips')}}</span>
                            </div>
                        </el-form-item> -->

                        <!-- 被拒是否可以再次发起审请 -->
                        <el-form-item :label="t('canApplyAgain')" >
                            <div class="flex flex-col">
                                <el-radio-group v-model="formData.can_apply_again">
                                    <el-radio label="0">{{ t( 'canApplyAgain0') }}</el-radio>
                                    <el-radio label="1">{{ t('canApplyAgain1') }}</el-radio>
                                </el-radio-group>
                                <span class="text-[#999] text-[12px]">{{t('canApplyAgain_tips')}}</span>
                            </div>
                        </el-form-item>

                        <!-- 是否开启级差奖励 -->
                        <el-form-item :label="t('isLevel')" >
                            <div class="flex flex-col">
                                <el-radio-group v-model="formData.is_level">
                                    <el-radio label="0">关闭</el-radio>
                                    <el-radio label="1">开启</el-radio>
                                </el-radio-group>
                                <span class="text-[#999] text-[12px]">{{t('isLevel_tips')}}</span>
                            </div>
                        </el-form-item>

                        <!-- 申请页顶部图 -->
                        <el-form-item :label="t('applyBackimg')" >
                            <div>
                                <upload-image v-model="formData.apply_backimg" :limit="1" />
                                <!-- <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('backgroundImage_tips')}}</p> -->
                            </div>
                        </el-form-item>

                        <!-- 是否开启街道代理级别 -->
                        <!-- <el-form-item :label="t('isStreet')" >
                            <div class="flex flex-col">
                                <el-radio-group v-model="formData.is_street">
                                    <el-radio label="0">关闭</el-radio>
                                    <el-radio label="1">开启</el-radio>
                                </el-radio-group>
                            </div>
                        </el-form-item> -->
                    </template>
                </el-card>
            </el-form>
        

            <!-- titleTwo 结算设置 -->
            <div class="flex ml-[18px] justify-between items-center mt-[20px]" style="margin-left: 30px;">
                <span class="text-page-title">{{ t('titleTwo')}}</span>
            </div>

            <el-form :model="formData" label-width="150px" ref="ruleFormRef" :rules="rules" class="page-form" v-loading="loading" style="margin-left: 30px;">
                <el-card class="box-card !border-none" shadow="never">
                    <!-- 省市区默认奖励比例 -->
                    <!-- <el-form-item :label="t('provinceRate')">
                        <div class="flex flex-col">
                            <el-input v-model="formData.province_rate" clearable style="width: 300px;" >
                                <template #append>%</template>
                            </el-input>
                        </div>
                    </el-form-item>
                    <el-form-item :label="t('cityRate')">
                        <div class="flex flex-col">
                            <el-input v-model="formData.city_rate" clearable style="width: 300px;" >
                                <template #append>%</template>
                            </el-input>
                        </div>
                    </el-form-item>
                    <el-form-item :label="t('districtRate')">
                        <div class="flex flex-col">
                            <el-input v-model="formData.district_rate" clearable style="width: 300px;" >
                                <template #append>%</template>
                            </el-input>
                        </div>
                    </el-form-item>
                    <el-form-item :label="t('streetRate')" v-if="formData.is_street == '1'">
                        <div class="flex flex-col">
                            <el-input v-model="formData.street_rate" clearable style="width: 300px;" >
                                <template #append>%</template>
                            </el-input>
                        </div>
                    </el-form-item> -->
                    <!-- 结算周期：按天计算 -->
                    <el-form-item :label="t('settleCycle')">
                        <div class="flex flex-col">
                            <el-input v-model="formData.settle_cycle" clearable style="width: 300px;" @keyup="filterNumber($event)" >
                                <template #append>天</template>
                            </el-input>
                            <!-- <span class="text-[#999] text-[12px]">{{t('up_proid_tips')}}</span> -->
                        </div>
                    </el-form-item>

                    <!-- 结算方式 -->
                    <!-- <el-form-item :label="t('settleWay')">
                        <div class="flex flex-col">
                            <el-radio-group v-model="formData.settle_way">
                                <el-radio v-for="dict in settle_wayList" :key="dict.value" :label="dict.value" :value="dict.value">{{ t('settleWay' + dict.value) }}</el-radio>
                            </el-radio-group>
                            <span class="text-[#999] text-[12px]">{{t('settleWay_tips')}}</span>
                        </div>
                    </el-form-item> -->

                </el-card>
            </el-form>

            <!-- titleThree 协议设置 -->
            <div class="flex ml-[18px] justify-between items-center mt-[20px]" style="margin-left: 30px;">
                <span class="text-page-title">{{ t('titleThree')}}</span>
            </div>
            <el-form :model="formData" label-width="150px" ref="ruleFormRef" :rules="rules" class="page-form" v-loading="loading" style="margin-left: 30px;">
                <el-card class="box-card !border-none" shadow="never">
                    <!-- 申请协议开关 -->
                    <el-form-item :label="t('isAgreement')">
                        <el-switch  v-model="formData.is_agreement" />
                    </el-form-item>
                    <el-form-item :label="t('backgroundImage')">
                        <div>
                            <upload-image v-model="formData.background_image" :limit="1" />
                            <!-- <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('backgroundImage_tips')}}</p> -->
                        </div>
                    </el-form-item>

                    <!-- 申请协议内容 -->
                    <el-form-item :label="t('protocolSettings')">
                        <el-button type="primary" link @click="toLink('area_service')">{{t("settings")}}</el-button>
                    </el-form-item>
                </el-card>
            </el-form>
        </div>

         <!-- 用户端显示 -->
         <div v-if="activeName == 'usershow'">
            <div class="flex justify-between items-center">
                <!-- <span class="text-page-title">前端显示相关</span> -->
            </div>
        </div>

        <!-- 代理后台权限设置 -->
        <div v-if="activeName == 'auth'">
            <div class="flex justify-between items-center">
                <!-- <span class="text-page-title">代理后台权限设置</span> -->
            </div>

            <!-- <el-form-item :label="t('agentLoginName')"  style="margin-left: 50px;">
                <el-input v-model="formData.agent_login_name" clearable :placeholder="t('agentNamePlaceholder')" class="input-width" />
            </el-form-item>

            <el-form-item :label="t('agentLoginPass')"  style="margin-left: 50px;">
                <el-input v-model="formData.agent_login_password" clearable :placeholder="t('agentNamePlaceholder')" class="input-width" />
            </el-form-item>

            <el-form-item :label="t('agentAuth')">
                <el-checkbox-group v-model="formData.agent_auth">
                    <el-checkbox label="1">{{ t('agentLevel1') }}</el-checkbox>
                    <el-checkbox label="2">{{ t('agentLevel2') }}</el-checkbox>
                    <el-checkbox label="3">{{ t('agentLevel3') }}</el-checkbox>
                    <el-checkbox label="4">{{ t('agentLevel4') }}</el-checkbox>
                </el-checkbox-group>
            </el-form-item> -->
        </div>

        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="onSave(ruleFormRef)">{{ t('save') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getAreaConfig, setAreaConfig } from '@/addon/ly_area/api/config'
import { FormRules, FormInstance } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { filterDigit } from '@/utils/common'
import { NumberFormat } from 'vue-i18n'
import { number } from 'echarts'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title

const loading = ref(true)
const ruleFormRef = ref<FormInstance>()
const formData = reactive<Record<string, string | boolean | Array<string> >>({
 
    is_open: '0',
    is_level: '0',
    is_street: '0',
    up_way: '0',
    settle_way: '0',
    take_type: '0',
    settle_cycle: '0',
    settle_type: '0',
    count_type: '0',
    become_many: '0',
    is_become: '0',
    can_apply_again: '0',
    apply_backimg: '',
    is_agreement: '0',
    province_rate: '0.00',
    city_rate: '0.00',
    district_rate: '0.00',
    street_rate: '0.00',
    background_image: '',
    agreement_content: '',


})
const Transfertype = ref<Array<Object>>([])

const activeName = ref('basic')

// 获取配置信息
const setFormData = async (id: number = 0) => {
    const data = await (await getAreaConfig()).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })
    formData.is_open = Boolean(Number(formData.is_open))
    loading.value = false
}
setFormData()



// 选中数据
const selectData = ref<any[]>([])

// 字典数据

   

const toLink = (type)=>{
    let routeData = router.resolve(`/setting/agreement/edit?key=${type}`)
    window.open(routeData.href,' blank');
}


const onSave = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            const save = { ...formData }
            save.is_open = Number(save.is_open).toString()

            setAreaConfig(save).then(() => {
                loading.value = false
                // 刷新数据
                setFormData()
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

// tab切换
const tabChange = (data)=>{
    if(data == 'basic'){
        getAreaConfig();
    }else if(data == 'usershow'){
        getAreaConfig();
    }
}
</script>

<style lang="scss" scoped></style>
