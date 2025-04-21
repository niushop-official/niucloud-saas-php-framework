<template>
  <div class="main-container">
    <el-card>
      <el-form
        :model="formData"
        label-width="150px"
        ref="ruleFormRef"
        :rules="formRules"
        class="page-form"
        v-loading="loading"
      >
        <el-alert
          type="info"
          class="mb-4"
          style="width: 720px"
          title="开启实名认证，对应会员等级如需实名认证，将会在购买会员等级权益时触发实名认证"
          :closable="false"
          show-icon
        />
        <el-form-item class="mt-4" label="实名认证" prop="open_real">
          <el-radio-group v-model="formData.open_real">
            <el-radio :label="'0'">关闭</el-radio>
            <el-radio :label="'1'">开启</el-radio>
          </el-radio-group>
          <div class="ml-6 text-gray-500">
            开启实名认证，将会在购买会员权益、添加DIY装修组件触发实名认证
          </div>
        </el-form-item>
        <div v-if="formData.open_real == 1">
          <el-form-item label="自动认证" prop="is_auto">
            <el-radio-group v-model="formData.is_auto">
              <el-radio :label="'0'">关闭</el-radio>
              <el-radio :label="'1'">开启</el-radio>
            </el-radio-group>
            <div class="ml-6 text-gray-500">
              开启自动认证需要配置阿里云市场APPCODE
            </div>
          </el-form-item>
          <el-form-item
            v-if="formData.is_auto == 1"
            label="阿里APPCODE"
            prop="app_code"
          >
            <el-input
              v-model="formData.app_code"
              placeholder="请输入APPCODE"
              class="input-width"
              show-word-limit
              clearable
            />
          </el-form-item>
          <el-form-item label="最多认证次数" prop="max_real_num">
            <el-input
              type="number"
              min="0"
              v-model="formData.max_real_num"
              placeholder="请输入最多认证次数"
              class="input-width"
              show-word-limit
              clearable
            />
            <div class="ml-6 text-gray-500">
              为0时不限制，同一身份证超过认证次数将会阻止认证
            </div>
          </el-form-item>
          <el-form-item label="身份证上传" prop="is_upload_card">
            <el-radio-group v-model="formData.is_upload_card">
              <el-radio :label="'0'">关闭</el-radio>
              <el-radio :label="'1'">开启</el-radio>
            </el-radio-group>
            <div class="ml-6 text-gray-500">
              开启后前端提交认证时需要上传身份证正反面照片
            </div>
          </el-form-item>
          <!-- <el-form-item label="手机验证码" prop="open_mobile_code">
            <el-radio-group v-model="formData.open_mobile_code">
              <el-radio :label="'0'">关闭</el-radio>
              <el-radio :label="'1'">开启</el-radio>
            </el-radio-group>
            <div class="ml-6 text-gray-500">
              开启手机验证码将会对填写的手机号码进行验证码验证
            </div>
          </el-form-item> -->
          <el-form-item v-if="formData.is_auto == 1" label="快速导航">
            <el-button>
              <a
                href="https://market.aliyun.com/apimarket/detail/cmapi00037883#sku=yuncode31883000025"
                target="_blank"
                >阿里实名认证</a
              >
            </el-button>
          </el-form-item>
        </div>
      </el-form>
      <div class="fixed-footer-wrap">
        <div class="fixed-footer">
          <el-button type="primary" @click="onSave()">{{
            t("save")
          }}</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from "vue";
import { t } from "@/lang";
import { getRealConfig, setRealConfig } from "@/addon/tk_vip/api/config";
import { FormInstance, ElMessage } from "element-plus";

const loading = ref(true);
const ruleFormRef = ref<FormInstance>();
const formRules = computed(() => {
  return {
    open_real: [
      { required: true, message: "请选择是否开启认证", trigger: "blur" },
    ],
    open_mobile_code: [
      { required: true, message: "请选择是否开启手机验证码", trigger: "blur" },
    ],
    is_upload_card: [
      { required: true, message: "请选择是否开启身份证上传", trigger: "blur" },
    ],
    max_real_num: [
      {
        required: true,
        message: "请填写最大认证数量",
        trigger: "blur",
      },
    ],
    is_auto: [
      { required: true, message: "请选择是否自动认证", trigger: "blur" },
    ],
    app_code: [
      { required: true, message: "请输入阿里云应用的APPCODE", trigger: "blur" },
    ],
  };
});
const formData = reactive({
  open_real: 0,
  app_code: "",
  open_mobile_code: 0,
  max_real_num: 1,
  is_auto: 0, //自动认证
  field: [],
  is_upload_card:0,
});
const getData = async () => {
  const data = await getRealConfig();
  loading.value = false;
  for (const key in formData) {
    formData[key] = data.data[key];
  }
};
getData();
const onSave = async () => {
  await setRealConfig(formData);
  getData();
};
</script>

<style lang="scss" scoped></style>
