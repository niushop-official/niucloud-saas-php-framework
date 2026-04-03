<template>
  <!--消息模板-->
  <div class="main-container" v-loading="noticeTableData.loading">
    <el-card class="box-card !border-none" shadow="never">
      <h3 class="panel-title !text-sm">{{ t('buyerNotice') }}</h3>

      <div class="flex flex-row flex-wrap">
        <el-table
            :data="noticeTableData.buyer"
            size="large"
            :span-method="buyerSpan"
        >
          <el-table-column
              prop="addon_name"
              :label="t('addon')"
              min-width="120"
          />
          <el-table-column
              prop="name"
              :label="t('noticeType')"
              min-width="120"
          />
          <el-table-column
              :label="t('operation')"
              align="right"
              fixed="right"
              min-width="300"
          >
            <template #default="{ row }">
              <div class="flex">
                <div
                    class="text-sm mr-1 flex items-center cursor-pointer"
                    v-if="row.support_type.indexOf('sms') != -1"
                    @click="setNotice(row, 'sms')"
                >
                  <el-icon
                      class="text-[15px] mr-[3px]"
                      :class="row.is_sms ? 'open' : ''"
                  >
                    <SuccessFilled />
                  </el-icon>
                  <span class="ml-0.5">{{ t('sms') }}</span>
                </div>
                <div
                    class="text-sm flex items-center cursor-pointer ml-[20px]"
                    v-if="
										row.support_type.indexOf('wechat') != -1
									"
                    @click="setNotice(row, 'wechat')"
                >
                  <el-icon
                      class="text-[15px] mr-[3px]"
                      :class="row.is_wechat ? 'open' : ''"
                  >
                    <SuccessFilled />
                  </el-icon>
                  <span class="ml-0.5">{{
                      t('wechat')
                    }}</span>
                </div>
                <div
                    class="text-sm flex items-center cursor-pointer ml-[20px]"
                    v-if="
										row.support_type.indexOf('weapp') != -1
									"
                    @click="setNotice(row, 'weapp')"
                >
                  <el-icon
                      class="text-[15px] mr-[3px]"
                      :class="row.is_weapp ? 'open' : ''"
                  >
                    <SuccessFilled />
                  </el-icon>
                  <span class="ml-0.5">{{ t('weapp') }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-card class="box-card mt-[15px] !border-none" shadow="never">
      <div class="flex items-center mb-[20px] gap-[10px]">
        <h3 class="panel-title !text-sm !mb-[0]">
          {{ t('sellerNotice') }}
        </h3>
        <el-button
            type="primary"
            @click="openBindAccountDialog"
            class="!text-[12px]"
        >绑定接收信息账号</el-button
        >
      </div>

      <div class="flex flex-row flex-wrap">
        <el-table
            :data="noticeTableData.seller"
            size="large"
            :span-method="buyerSpan"
        >
          <el-table-column
              prop="addon_name"
              :label="t('addon')"
              min-width="120"
          />
          <el-table-column
              prop="name"
              :label="t('noticeType')"
              min-width="120"
          />
          <el-table-column
              :label="t('operation')"
              align="right"
              fixed="right"
              min-width="300"
          >
            <template #default="{ row }">
              <div class="flex">
                <div
                    class="text-sm mr-1 flex items-center cursor-pointer"
                    v-if="row.support_type.indexOf('sms') != -1"
                    @click="setNotice(row, 'sms')"
                >
                  <el-icon
                      class="text-[15px] mr-[3px]"
                      :class="row.is_sms ? 'open' : ''"
                  >
                    <SuccessFilled />
                  </el-icon>
                  <span class="ml-0.5">{{ t('sms') }}</span>
                </div>
                <div
                    class="text-sm flex items-center cursor-pointer ml-[20px]"
                    v-if="
										row.support_type.indexOf('wechat') != -1
									"
                    @click="setNotice(row, 'wechat')"
                >
                  <el-icon
                      class="text-[15px] mr-[3px]"
                      :class="row.is_wechat ? 'open' : ''"
                  >
                    <SuccessFilled />
                  </el-icon>
                  <span class="ml-0.5">{{
                      t('wechat')
                    }}</span>
                </div>
                <div
                    class="text-sm flex items-center cursor-pointer ml-[20px]"
                    v-if="
										row.support_type.indexOf('weapp') != -1
									"
                    @click="setNotice(row, 'weapp')"
                >
                  <el-icon
                      class="text-[15px] mr-[3px]"
                      :class="row.is_weapp ? 'open' : ''"
                  >
                    <SuccessFilled />
                  </el-icon>
                  <span class="ml-0.5">{{ t('weapp') }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <sms ref="smsDialog" @complete="loadNoticeList()" />
    <wechat ref="wechatDialog" @complete="loadNoticeList()" />
    <weapp ref="weappDialog" @complete="loadNoticeList()" />
    <el-dialog
        v-model="bindDialogVisible"
        @close="bindDialogClose"
        width="300"
    >
      <view class="flex flex-col justify-center items-center">
        <span class="mb-[15px]">{{ isBind.title }}</span>
        <el-image
            v-if="isBind.key == 'weapp'"
            class="w-[120px] h-[120px]"
            :src="isBind.weapp_qrcode"
            :fit="contain"
        />
        <el-image
            v-else
            class="w-[120px] h-[120px]"
            :src="isBind.wechat_qrcode"
            :fit="contain"
        />
      </view>
    </el-dialog>

    <!-- 绑定接收信息账号弹窗 -->
    <el-dialog
        v-model="bindAccountDialogVisible"
        title="绑定接收信息账号"
        width="500px"
        @close="bindAccountDialogClose"
    >
      <div class="account-bind-options">
        <div class="option-item">
          <div class="flex flex-col">
						<span class="title" v-if="!isBind.bind_sms_info"
            >手机号</span
            >
            <span class="info" v-else
            >手机号：{{ isBind.bind_sms_info }}</span
            >
          </div>
          <template v-if="!Number(isBind.bind_sms)">
            <el-button
                type="primary"
                @click="bindSmsFn"
                class="!text-[12px]"
            >绑定</el-button
            >
          </template>
          <template v-else>
            <el-button
                type="danger"
                @click="cancelBindFn('sms')"
                class="!text-[12px]"
            >解绑</el-button
            >
          </template>
        </div>
        <div class="option-item">
          <div class="flex flex-col">
						<span class="title" v-if="!isBind.bind_wechat_info"
            >微信账号</span
            >
            <span class="info" v-else
            >微信openId：{{ isBind.bind_wechat_info }}</span
            >
          </div>
          <template v-if="!Number(isBind.bind_wechat)">
            <el-button
                type="primary"
                @click="bindWeChatFn"
                class="!text-[12px]"
            >绑定</el-button
            >
          </template>
          <template v-else>
            <el-button
                type="danger"
                @click="cancelBindFn('wechat')"
                class="!text-[12px]"
            >解绑</el-button
            >
          </template>
        </div>
        <!--				<div class="option-item">-->
        <!--					<div class="flex flex-col">-->
        <!--						<span class="title" v-if="!isBind.bind_weapp_info"-->
        <!--							>小程序账号</span-->
        <!--						>-->
        <!--						<span class="info" v-else-->
        <!--							>小程序openId：{{ isBind.bind_weapp_info }}</span-->
        <!--						>-->
        <!--					</div>-->
        <!--					<template v-if="!Number(isBind.bind_weapp)">-->
        <!--						<el-button-->
        <!--							type="primary"-->
        <!--							@click="bindWeappFn"-->
        <!--							class="!text-[12px]"-->
        <!--							>绑定</el-button-->
        <!--						>-->
        <!--					</template>-->
        <!--					<template v-else>-->
        <!--						<el-button-->
        <!--							type="danger"-->
        <!--							@click="cancelBindFn('weapp')"-->
        <!--							class="!text-[12px]"-->
        <!--							>解绑</el-button-->
        <!--						>-->
        <!--					</template>-->
        <!--				</div>-->
      </div>
    </el-dialog>

    <!-- 新增：短信绑定弹窗 -->
    <el-dialog
        v-model="smsBindDialogVisible"
        title="绑定接收信息手机号"
        width="400px"
        @close="resetSmsBindForm"
    >
      <el-form
          :model="smsBindForm"
          :rules="smsBindRules"
          ref="smsBindFormRef"
          label-width="80px"
      >
        <el-form-item label="手机号" prop="mobile">
          <el-input
              v-model="smsBindForm.mobile"
              placeholder="请输入手机号"
              maxlength="11"
              @input="handleMobileInput"
          />
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input
              v-model="smsBindForm.code"
              placeholder="请输入验证码"
              maxlength="6"
              style="width: 50%"
          />
          <el-button
              class="ml-2"
              type="primary"
              :disabled="
							!canSendCode ||
							sendingCode ||
							smsBindForm.mobile.length !== 11
						"
              @click="sendSmsCode"
          >
            {{ codeBtnText }}
          </el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="smsBindDialogVisible = false"
        >取消</el-button
        >
        <el-button
            type="primary"
            :loading="bindingSms"
            @click="submitSmsBind"
        >
          确认绑定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import {
  getNoticeList,
  cancelBind,
  getBindInfo,
  getWechatAuthUrl,
  getWeappAuthUrl,
  sendSms,
  bindSms
} from '@/app/api/notice'
import Sms from '@/app/views/setting/components/notice-sms.vue'
import Wechat from '@/app/views/setting/components/notice-wechat.vue'
import Weapp from '@/app/views/setting/components/notice-weapp.vue'
import QRCode from 'qrcode'
import { img } from '@/utils/common'
import { SuccessFilled } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'

const smsDialog: Record<string, any> | null = ref(null)
const wechatDialog: Record<string, any> | null = ref(null)
const weappDialog: Record<string, any> | null = ref(null)

// 新增：绑定接收信息账号弹窗显示状态
const bindAccountDialogVisible = ref(false)

// 打开绑定接收信息账号弹窗
const openBindAccountDialog = () => {
  bindAccountDialogVisible.value = true
}

// 关闭绑定接收信息账号弹窗
const bindAccountDialogClose = () => {
  bindAccountDialogVisible.value = false
}

const noticeTableData = reactive({ loading: true, buyer: [], seller: [] })

/**
 * 获取配置信息
 */
const loadNoticeList = () => {
  noticeTableData.loading = true
  getNoticeList({})
      .then((res) => {
        noticeTableData.buyer = []
        noticeTableData.seller = []
        res.data.forEach((item) => {
          if (item.notice.length) {
            const buyer = []
            const seller = []
            Object.keys(item.notice).forEach((key, index) => {
              const notice = item.notice[key]
              notice.addon_name = item.title
              notice.receiver_type == 1
                  ? buyer.push(notice)
                  : seller.push(notice)
            })
            if (buyer.length) {
              buyer[0].rowspan = buyer.length
              noticeTableData.buyer =
                  noticeTableData.buyer.concat(buyer)
            }
            if (seller.length) {
              seller[0].rowspan = seller.length
              noticeTableData.seller =
                  noticeTableData.seller.concat(seller)
            }
          }
        })
        noticeTableData.loading = false
      })
      .catch((e) => {
        noticeTableData.loading = false
      })
}

const isBind = ref({
  bind_sms: 0, // 新增：短信绑定状态
  bind_wechat: 0,
  bind_weapp: 0,
  bind_sms_info: '',
  bind_wechat_info: '',
  bind_weapp_info: '',
  wechat_qrcode: '',
  weapp_qrcode: '',
  title: '',
  key: 'wechat',
})
// 查看是否绑定
const getBindInfoFn = (isFirstQuery = false) => {
  getBindInfo().then((res) => {
    if (Object.keys(res.data).length > 0) {
      isBind.value.bind_sms = res.data.mobile ? 1 : 0 // 新增：更新短信绑定状态
      isBind.value.bind_wechat = res.data.wechat_openid ? 1 : 0 // 新增：更新微信绑定状态
      isBind.value.bind_weapp = res.data.weapp_openid ? 1 : 0 // 新增：更新小程序绑定状态

      isBind.value.bind_sms_info = res.data.mobile
      isBind.value.bind_wechat_info = res.data.wechat_openid
      isBind.value.bind_weapp_info = res.data.weapp_openid
      if (!isFirstQuery && isBind.value[`bind_${isBind.value.key}`]) {
        bindDialogClose()
      }
    }
  })
}
getBindInfoFn(true)
// --------------------- 绑定微信 ---------------------
let isBindRepeat = false
const bindDialogVisible = ref(false)
const requestTimer = ref()
const bindWeChatFn = () => {
  if (isBindRepeat) return
  isBindRepeat = true
  getWechatAuthUrl()
      .then((res) => {
        isBindRepeat = false
        if (res?.data?.url) generateQRCode(res.data.url, 'wechat_qrcode')
        bindDialogVisible.value = true
        isBind.value.title = '微信扫一扫，绑定接收信息微信'
        isBind.value.key = 'wechat'
        requestTimer.value = setInterval(getBindInfoFn, 1000)
      })
      .catch((e) => {
        isBindRepeat = false
      })
}

const bindWeappFn = () => {
  if (isBindRepeat) return
  isBindRepeat = true
  getWeappAuthUrl()
      .then((res) => {
        isBindRepeat = false
        if (res?.data?.url) isBind.value.weapp_qrcode = img(res.data.url)
        bindDialogVisible.value = true
        isBind.value.title = '微信扫一扫，绑定接收信息小程序'
        isBind.value.key = 'weapp'
        requestTimer.value = setInterval(getBindInfoFn, 1000)
      })
      .catch((e) => {
        isBindRepeat = false
      })
}

const generateQRCode = async (url, type) => {
  try {
    // 生成二维码
    isBind.value[type] = await QRCode.toDataURL(url, {
      errorCorrectionLevel: 'L',
      margin: 0,
      width: 120,
    })
  } catch (e) {
    isBind.value[type] = ''
    console.error('生成二维码失败', e)
  }
}

// --------------------- 取消绑定 ---------------------
const isUnbindRepeat = ref(false)
const cancelBindFn = (key: any) => {
  ElMessageBox.confirm('确定取消绑定吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(() => {
    if (isUnbindRepeat.value) return
    isUnbindRepeat.value = true

    cancelBind({ unbind_type: [key] })
        .then((res) => {
          ElMessage({ message: '取消绑定成功', type: 'success' })
          getBindInfoFn()
          isUnbindRepeat.value = false
        })
        .catch((e) => {
          isUnbindRepeat.value = false
        })
  })
}

const bindDialogClose = () => {
  clearInterval(requestTimer.value)
  bindDialogVisible.value = false
}
// --------------------- 新增：短信绑定相关逻辑 ---------------------
// 短信绑定弹窗显示状态
const smsBindDialogVisible = ref(false)
// 表单ref
const smsBindFormRef = ref<FormInstance>()
// 绑定中状态
const bindingSms = ref(false)
// 是否可以发送验证码
const canSendCode = ref(true)
// 发送验证码中
const sendingCode = ref(false)
// 验证码按钮文字
const codeBtnText = ref('发送验证码')
// 倒计时秒数
const countdown = ref(60)

// 短信绑定表单
const smsBindForm = reactive({
  mobile: '', // 手机号
  code: '', // 验证码
  mobile_key: '', // 发送验证码返回的key
})

// 短信绑定表单验证规则
const smsBindRules = reactive<FormRules>({
  mobile: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号',
      trigger: 'blur',
    },
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: /^\d{4}$/, message: '请输入6位数字验证码', trigger: 'blur' },
  ],
})

// 手机号输入处理（只保留数字）
const handleMobileInput = (val: string) => {
  smsBindForm.mobile = val.replace(/\D/g, '')
}

// 发送验证码
const sendSmsCode = async () => {
  try {
    sendingCode.value = true
    // 发送验证码请求
    const res = await sendSms({ mobile: smsBindForm.mobile })
    if (res.data) {
      // 保存返回的mobile_key
      smsBindForm.mobile_key = res.data.key || ''

      // 开始倒计时
      canSendCode.value = false
      codeBtnText.value = `${countdown.value}秒后重新发送`
      const timer = setInterval(() => {
        countdown.value--
        codeBtnText.value = `${countdown.value}秒后重新发送`
        if (countdown.value <= 0) {
          clearInterval(timer)
          canSendCode.value = true
          codeBtnText.value = '发送验证码'
          countdown.value = 60
        }
      }, 1000)
    }
  } catch (error) {

  } finally {
    sendingCode.value = false
  }
}

// 提交短信绑定
const submitSmsBind = async () => {
  if (!smsBindFormRef.value) return

  // 表单验证
  try {
    await smsBindFormRef.value.validate()
    bindingSms.value = true

    // 调用绑定接口
    const res = await bindSms({
      mobile: smsBindForm.mobile,
      mobile_key: smsBindForm.mobile_key,
      mobile_code: smsBindForm.code,
    })

    if (res) {
      smsBindDialogVisible.value = false
      getBindInfoFn() // 更新绑定状态
    }
  } catch (error) {
  } finally {
    bindingSms.value = false
  }
}

// 重置短信绑定表单
const resetSmsBindForm = () => {
  smsBindForm.mobile = ''
  smsBindForm.code = ''
  smsBindForm.mobile_key = ''
  canSendCode.value = true
  codeBtnText.value = '发送验证码'
  countdown.value = 60
  if (smsBindFormRef.value) {
    smsBindFormRef.value.clearValidate()
  }
}

// 实现bindSmsFn方法
const bindSmsFn = () => {
  // 打开短信绑定弹窗
  smsBindDialogVisible.value = true
  // 重置表单
  resetSmsBindForm()
}
// --------------------- 短信绑定逻辑结束 ---------------------

const buyerSpan = (row: any) => {
  if (row.columnIndex === 0) {
    if (row.row.rowspan) {
      return { rowspan: row.row.rowspan, colspan: 1 }
    } else {
      return { rowspan: 0, colspan: 0 }
    }
  }
}

loadNoticeList()

const setNotice = (data: any, type: string) => {
  data.type = type
  data.status = data['is_' + type]
  if (type === 'sms') {
    data.bind_sms = isBind.value.bind_sms
    smsDialog.value.setFormData(data)
    smsDialog.value.showDialog = true
  } else if (type === 'wechat') {
    data.bind_wechat = isBind.value.bind_wechat
    wechatDialog.value.setFormData(data)
    wechatDialog.value.showDialog = true
  } else if (type === 'weapp') {
    data.bind_weapp = isBind.value.bind_weapp
    weappDialog.value.setFormData(data)
    weappDialog.value.showDialog = true
  }
}
</script>

<style lang="scss" scoped>
.open {
  color: var(--el-color-primary);
}

.notice-type {
  > div:nth-last-child(1):first-child {
    width: 100%;
  }
}

.account-bind-options {
  .option-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid var(--el-border-color-lighter);

    &:last-child {
      border-bottom: none;
    }

    .title {
      font-size: 14px;
      color: var(--el-text-color-regular);
    }
    .info {
      color: #333;
    }
  }
}
</style>