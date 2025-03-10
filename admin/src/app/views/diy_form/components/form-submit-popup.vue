<template>
    <div>
        <el-dialog v-model="showDialog" :title="t('submitSuccess')" width="850px" :close-on-press-escape="true" :destroy-on-close="true" :close-on-click-modal="false">

            <div class="flex flex-1 mt-[24px] mx-[24px] mb-0">
                <div class="preview-wrap">
                    <div class="absolute z-1 left-0 top-0">
                        <img src="@/app/assets/images/diy_form/mobile_tabbar.png" class="w-[324px]" />
                    </div>
                    <div class="absolute z-1 left-0 bottom-0">
                        <img src="@/app/assets/images/diy_form/mobile_bottom.png" class="w-[324px]" />
                    </div>

                    <div class="page-wrap">
                        <div class="px-[13px] flex flex-col items-center flex-1">
                            <div class="flex items-center justify-center w-[48px] h-[48px] text-[40px] p-[4px] mt-[32px] mb-[16px] mx-auto rounded-[50%]">
                                <el-icon><SuccessFilled color="#20bf64" /></el-icon>
                            </div>
                            <div class="record-name">
                                <span class="text-[#1E1E1E] font-bold text-[24px]" v-if="formData.tips_type == 'default'">{{ t('writeSuccess') }}</span>
                                <span class="text-[#1E1E1E] font-bold text-[16px]" v-else-if="formData.tips_type == 'diy'">{{ formData.tips_text ? formData.tips_text : '填写成功' }}</span>
                            </div>
                            <div class="to-detail">
                                <div class="text-[14px] mt-[16px] py-[4px] px[8px] text-[#576b95]">{{ t('viewFillingDetails') }}</div>
                            </div>
                        </div>
                        <div class="relative pt-[8px] pb-[48px] h-[112px]">
                            <div v-if="formData.success_after_action.finish" class="!mt-[16px] rounded-[3px] mx-auto text-[15px] w-[100px] min-w-[160px] h-[32px] leading-[32px] text-center max-w-[274px] truncate bg-[#20bf64] text-[#ffffff]">
                                <div class="text-[15px]">{{ t('finish') }}</div>
                            </div>
                            <div v-if="formData.success_after_action.goback" class="!mt-[16px] rounded-[3px] mx-auto text-[15px] w-[100px] min-w-[160px] h-[32px] leading-[32px] text-center max-w-[274px] truncate bg-[#f2f2f2] text-[#353535]">
                                <div class="text-[14px]">{{ t('back') }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- 核销凭证 todo 后续完善 -->
<!--                    <div class="page-wrap verify-voucher-wrap" style="display:none;">-->

<!--                        <div class="tips-wrap">感谢你的填写，以下是你的核销凭证</div>-->
<!--                        <div class="qrcode-wrap">-->
<!--                            <div class="text-[14px] text-[#333]">请妥善保存你的核销凭证</div>-->
<!--                            <div class="text-[20px] font-bold text-[#333] my-[10px]">现场出示凭证</div>-->
<!--                            <el-image class="w-[180px]" :src="wapImage" />-->
<!--                            <div class="text-primary mt-[10px]">保存凭证</div>-->
<!--                        </div>-->
<!--                        <div class="relative pt-[8px] pb-[48px] h-[112px]">-->
<!--                            <div class="!mt-[16px] rounded-[3px] mx-auto text-[15px] w-[100px] min-w-[160px] h-[32px] leading-[32px] text-center max-w-[274px] truncate bg-[#20bf64] text-[#ffffff]">-->
<!--                                <div class="text-[15px]">返回二维码</div>-->
<!--                            </div>-->
<!--                            <div class="!mt-[16px] rounded-[3px] mx-auto text-[15px] w-[100px] min-w-[160px] h-[32px] leading-[32px] text-center max-w-[274px] truncate bg-[#fff] text-[#353535]">-->
<!--                                <div class="text-[14px]">完成</div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="text-[14px] mt-[16px] py-[4px] px[8px] text-[#576b95]">查看填写详情</div>-->

<!--                    </div>-->

                </div>

                <div class="flex-1">
                    <div class="item-wrap">
                        <div class="text-[16px] h-[24px] font-bold text-[#262626] mb-[16px] w-[140px] mr-[32px] flex-shrink-0">{{ t('afterSubmission') }}</div>
                        <el-radio-group v-model="formData.submit_after_action" class="!block">
                            <el-radio label="text" class="!flex">
                                <span class="mr-[3px]">{{ t('displayTextMessages') }}</span>
                                <el-tooltip effect="light" placement="top">
                                    <template #content>
                                        <p>{{ t('displayTextMessagesTips') }}</p>
                                    </template>
                                    <el-icon>
                                        <QuestionFilled color="#999999" />
                                    </el-icon>
                                </el-tooltip>
                            </el-radio>
                            <!--  todo 后续完善 -->
<!--                            <el-radio label="voucher" class="!flex">-->
<!--                                <span class="mr-[3px]">{{ t('获取核销凭证') }}</span>-->
<!--                                <el-tooltip effect="light" placement="top">-->
<!--                                    <template #content>-->
<!--                                        <p>{{ t('提交后页面会将提交的表单记录内容生成二维码并展示，可选择设置两种不同的二维码内容。适合核销、数据录入等场景。') }}</p>-->
<!--                                    </template>-->
<!--                                    <el-icon>-->
<!--                                        <QuestionFilled color="#999999" />-->
<!--                                    </el-icon>-->
<!--                                </el-tooltip>-->
<!--                            </el-radio>-->
                        </el-radio-group>
                    </div>

                    <div class="item-wrap" v-if="formData.submit_after_action == 'text'">
                        <div class="text-[16px] h-[24px] font-bold text-[#262626] mb-[16px] w-[140px] mr-[32px] flex-shrink-0">{{ t('promptText') }}</div>
                        <div>
                            <el-radio-group v-model="formData.tips_type" class="!block">
                                <el-radio label="default" class="!block">
                                    <span class="mr-[3px]">{{ t('defaultPrompt') }}</span>
                                    <span class="!text-[#999] text-[12px] ml-[8px]">{{ t('defaultPromptTips') }}</span>
                                </el-radio>
                                <el-radio label="diy" class="!block">{{ t('diyPrompt') }}</el-radio>
                            </el-radio-group>
                            <el-input v-if="formData.tips_type == 'diy'" v-model.trim="formData.tips_text" :placeholder="t('tipsTextPlaceholder')" class="w-[350px]" maxlength="30" clearable show-word-limit />
                        </div>
                    </div>

                    <!-- 核销凭证 todo 后续完善 -->
                    <template v-else-if="formData.submit_after_action == 'voucher'">

                        <div class="item-wrap">
                            <div class="text-[16px] h-[24px] font-bold text-[#262626] mb-[16px] w-[140px] mr-[32px] flex-shrink-0">{{ t('validityPeriodOfVoucher') }}</div>
                            <div>
                                <el-radio-group v-model="formData.time_limit_type" class="!block">
                                    <el-radio label="no_limit" class="!block">{{ t('noLimit') }}</el-radio>
                                    <el-radio label="specify_time" class="!block">
                                        <span class="mr-[3px]">{{ t('specifyTime') }}</span>
                                        <el-tooltip effect="light" placement="top">
                                            <template #content>
                                                <p>{{ t('specifyTimeTips') }}</p>
                                            </template>
                                            <el-icon>
                                                <QuestionFilled color="#999999" />
                                            </el-icon>
                                        </el-tooltip>
                                    </el-radio>
                                    <el-radio label="submission_time" class="!block">
                                        <span class="mr-[3px]">{{ t('submissionTime') }}</span>
                                        <el-tooltip effect="light" placement="top">
                                            <template #content>
                                                <p class="w-[250px]">{{ t('submissionTimeTips') }}</p>
                                            </template>
                                            <el-icon>
                                                <QuestionFilled color="#999999" />
                                            </el-icon>
                                        </el-tooltip>
                                    </el-radio>
                                </el-radio-group>
                                <el-date-picker v-if="formData.time_limit_type == 'specify_time'" v-model="formData.validity_time" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" />
                                <div class="flex items-center mt-[5px]" v-if="formData.time_limit_type == 'submission_time'">
                                    <span>{{ t('afterSubmissionRecords') }}</span>
    <!--                                <div class="flex items-center px-[5px]">-->
    <!--                                    v-model.trim="formData.length"-->
                                    <el-input v-model.trim="formData.submission_time_value" @keyup="filterNumber($event)" size="small" clearable class="!w-[100px] px-[5px]" maxlength="3" />
                                    <el-select v-model="formData.timeUnit" clearable class="!w-[100px] pr-[5px]" size="small">
                                        <el-option v-for="(item, index) in validityOptions" :key="item.value" :label="item.text" :value="item.value"></el-option>
                                    </el-select>
                                    <span>{{ t('effective') }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="item-wrap">
                            <div class="text-[16px] h-[24px] font-bold text-[#262626] mb-[16px] w-[140px] mr-[32px] flex-shrink-0">{{ t('voucherStyle') }}</div>
                            <div>
                                <el-form-item :label="t('titleAboveTheCode')">
    <!--                                    v-model.trim="formData.active_name"-->
                                    <el-input clearable :placeholder="t('titleAboveTheCodePlaceholder')" class="input-width" :maxlength="20" />
                                </el-form-item>
                                <el-form-item :label="t('contentAboveTheCode')">
                                    <el-input clearable :placeholder="t('contentAboveTheCodePlaceholder')" class="input-width" :maxlength="20" />
                                    <div>
                                        <span class="text-primary cursor-pointer mr-[10px]">{{ t('addLinefeeds') }}</span>
                                        <span class="text-primary cursor-pointer">{{ t('addFields') }}</span>
                                    </div>
                                </el-form-item>
                                <el-form-item :label="t('contentBelowTheCode')">
                                    <div class="block">
                                        <el-checkbox class="!block" :label="t('submissionRecordTime')" value="" />

                                        <el-checkbox class="!block !h-[20px]" :label="t('currentTime')" value="" />
                                        <div class="text-[#999] ml-[22px]">{{ t('currentTimeTips') }}</div>

                                        <el-checkbox class="!block" :label="t('dispalyPromptText')" value="" />
                                        <el-input class="ml-[22px]" :rows="4" type="textarea" :placeholder="t('tipsTextPlaceholder')" maxlength="100" />

                                        <el-checkbox class="!block" :label="t('voucherDeadline')" value="" />
                                        <el-checkbox class="!block" :label="t('saveVoucher')" value="" />
                                    </div>
                                </el-form-item>
                            </div>
                        </div>
                    </template>

                    <!-- todo 后续完善 -->
                    <div class="item-wrap">
                        <div class="text-[16px] h-[24px] font-bold text-[#262626] mb-[16px] w-[140px] mr-[32px] flex-shrink-0">
                            <span>{{ t('subsequentPperationButtons') }}</span>
<!--                            <p class="text-[12px] text-[#999] mt-[4px] font-normal">最多选择2个</p>-->
                        </div>
                        <div class="content-list-wrap">
<!--                                            <el-checkbox-group :min="1" :max="2">-->
<!--                            <el-checkbox v-model="formData.success_after_action.share" label="转发填写内容" value="share">-->
<!--                                <div class="text-[#333]">转发填写内容</div>-->
<!--                            </el-checkbox>-->
<!--                            <p class="text-[#999] text-[12px] pl-[24px] mt-[4px]">提交表单后，可转发给微信好友查看。支持按钮文案自定义，提醒填表人转发给特定人员查看</p>-->

                            <el-checkbox v-model="formData.success_after_action.finish" :label="t('finish')" value="finish">
                                <div class="text-[#333]">{{ t('finish') }}</div>
                            </el-checkbox>
                            <p class="text-[#999] text-[12px] pl-[24px] mt-[4px]">{{ t('finishTips') }}</p>

                            <el-checkbox v-model="formData.success_after_action.goback" :label="t('back')" value="goback">
                                <div class="text-[#333]">{{ t('back') }}</div>
                            </el-checkbox>
                            <p class="text-[#999] text-[12px] pl-[24px] mt-[4px]">{{ t('backTips') }}</p>
                            <!--                                            </el-checkbox-group>-->
                        </div>
                    </div>
                </div>
            </div>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="confirm">{{ t('save') }}</el-button>
                </div>
            </template>

        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import QRCode from 'qrcode'
import storage from '@/utils/storage'
import { filterNumber } from '@/utils/common'
import { getUrl } from '@/app/api/sys'
import { getFormSubmitConfig,editDiyFormSubmitConfig } from '@/app/api/diy_form'

const showDialog = ref(false)
const repeat = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    id: 0,
    form_id: 0,
    submit_after_action: 'text', // 填表人提交后操作，text：文字信息，voucher：核销凭证
    tips_type: 'default', // 提示内容类型，default：默认提示，diy：自定义提示
    tips_text: '', // 自定义提示内容
    time_limit_type: 'no_limit', // 核销凭证有效期限制类型，no_limit：不限制，specify_time：指定固定开始结束时间，submission_time：按提交时间设置有效期
    // 核销凭证时间限制规则，json格式 todo 结构待定，后续完善
    time_limit_rule: {
        validity_time: [], // 指定固定开始结束时间
        submission_time_value: '', // 按提交时间设置有效期
        timeUnit: 'day', // 提交时间单位
    },
    // 核销凭证内容，json格式 todo 结构待定，后续完善
    voucher_content_rule: {},
    // 填写成功后续操作
    success_after_action: {
        share: false, // 转发填写内容
        finish: true, // 完成
        goback: true, // 返回
    }
}

const formData: Record<string, any> = reactive({ ...initialFormData })

const wapUrl = ref('')
const wapDomain = ref('')
const wapImage = ref('')
const wapPreview = ref('')
const page = ref('')

// 核销凭证有效期
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
    },
    {
        text:'分钟',
        value:'minutes'
    }
])

// getUrl().then((res: any) => {
//     wapUrl.value = res.data.wap_url
//
//     // 生产模式禁止
//     if (import.meta.env.MODE == 'production') return
//
//     wapDomain.value = res.data.wap_domain
//
//     // env文件配置过wap域名
//     if (wapDomain.value) {
//         wapUrl.value = wapDomain.value + '/wap'
//     }
//
//     const wapDomainStorage = storage.get('wap_domain')
//     if (wapDomainStorage) {
//         wapUrl.value = wapDomainStorage
//     }
// })

const loadQrcode = () => {
    wapPreview.value = `${wapUrl.value}${page.value}`
    // errorCorrectionLevel：密度容错率L（低）H(高)
    QRCode.toDataURL(wapPreview.value, { errorCorrectionLevel: 'L', margin: 0, width: 120 }).then(url => {
        wapImage.value = url
    })
}

const emit = defineEmits(['complete'])

const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    if (row) {
        const data = await (await getFormSubmitConfig(row.form_id)).data
        if (data) {
            Object.keys(formData).forEach((key: string) => {
                if (data[key] != undefined) formData[key] = data[key]
            })
        }
        // todo 靠后完善
        // page.value = `/app/pages/index/diy_form?form_id=${formData.form_id}`
        // loadQrcode()
    }
}

/**
 * 确认
 */
const confirm = () => {
    if(formData.tips_type == 'diy' && !formData.tips_text){
        ElMessage.error('提示不能为空')
        return
    }

    if (repeat.value) return;
    repeat.value = true

    const data = formData

    editDiyFormSubmitConfig(data).then(res => {
        repeat.value = false
        showDialog.value = false
        emit('complete')
    }).catch(err => {
        repeat.value = false
    })
}

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss" scoped>
    .preview-wrap {
        position: relative;
        width: 324px;
        min-height: 555px;
        padding: 82px 12px 20px;
        background-size: 100%;
        background-repeat: repeat-y;
        background-image: url(../../../../app/assets/images/diy_form/mobile_line.png);
        border-radius: 38px;
        overflow: hidden;
        box-shadow: none;
        background-color: #fff !important;
        margin-right: 24px;
        overflow-y: auto;

        .page-wrap {
            position: relative;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            overflow-y: auto;
            overflow-x: hidden;
            text-align: center;
            min-height: 548px;
            height: auto;
        }

        .verify-voucher-wrap {
            background-color: #f4f4f4;
            .tips-wrap{
                font-size: 15px;
                font-weight: 400;
                line-height: 21px;
                color: rgba(0,0,0,.65);
                margin: 20px 10px;
            }
            .qrcode-wrap{
                border-radius: 12px;
                margin: 0 20px;
                background: #fff;
                padding: 20px 10px 10px;
            }
        }
    }

    .item-wrap {
        padding: 20px 24px 24px;
        background-color: #fff;
        border-radius: 2px;
        display: flex;
        position: relative;

        &:after {
            content: "";
            display: block;
            height: 1px;
            width: calc(100% - 48px);
            background-color: hsla(210, 8%, 51%, .13);
            position: absolute;
            left: 24px;
            bottom: 0;
        }

        &:last-child:after {
            display: none;
        }
    }

</style>
