<template>
  <el-dialog
    v-model="showDialog"
    :title="formData.id ? t('updateReal') : t('addReal')"
    width="50%"
    class="diy-dialog-wrap"
    :destroy-on-close="true"
  >
    <el-form
      :model="formData"
      label-width="120px"
      ref="formRef"
      :rules="formRules"
      class="page-form"
      v-loading="loading"
    >
    <el-form-item v-if="formData.id > 0" :label="t('memberId')">
        <div>{{ formData.member_id_name }}</div>
      </el-form-item>
      <el-form-item v-else :label="t('memberId')" prop="member_id">
        <el-select
          class="input-width"
          v-model="formData.member_id"
          clearable
          :placeholder="t('memberIdPlaceholder')"
        >
          <div class="mt-2 mb-2 ml-4">
            <el-input
              @change="change"
              v-model="keyword"
              style="width: 200px"
              placeholder="搜索会员支持昵称/会员名"
            >
              <template #append>搜索 </template></el-input
            >
          </div>
          <el-option label="请选择" value=""></el-option>
          <el-option
            v-for="(item, index) in memberIdList"
            :key="index"
            :label="item['nickname']"
            :value="item['member_id']"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('realName')" prop="real_name">
        <el-input
          v-model="formData.real_name"
          clearable
          :placeholder="t('realNamePlaceholder')"
          class="input-width"
        />
      </el-form-item>

      <el-form-item :label="t('mobile')" prop="mobile">
        <el-input
          v-model="formData.mobile"
          clearable
          :placeholder="t('mobilePlaceholder')"
          class="input-width"
        />
      </el-form-item>

      <el-form-item :label="t('cardNum')" prop="card_num">
        <el-input
          v-model="formData.card_num"
          clearable
          :placeholder="t('cardNumPlaceholder')"
          class="input-width"
        />
      </el-form-item>

      <!-- <el-form-item :label="t('sex')">
        <el-input
          v-model="formData.sex"
          clearable
          :placeholder="t('sexPlaceholder')"
          class="input-width"
        />
      </el-form-item> -->

      <!-- <el-form-item :label="t('birthday')">
        <el-input
          v-model="formData.birthday"
          clearable
          :placeholder="t('birthdayPlaceholder')"
          class="input-width"
        />
      </el-form-item> -->

      <!-- <el-form-item :label="t('field')">
        <el-input
          v-model="formData.field"
          clearable
          :placeholder="t('fieldPlaceholder')"
          class="input-width"
        />
      </el-form-item> -->

      <el-form-item :label="t('status')" prop="status">
        <el-select
          class="input-width"
          v-model="formData.status"
          clearable
          placeholder="请选择"
        >
          <el-option label="请选择" value=""></el-option>
          <el-option
            v-for="(item, index) in realstatus"
            :key="index"
            :label="item['name']"
            :value="item['status']"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="formData.id > 0"  label="身份证人像">
        <el-image
          v-for="url in formData.card_img_back"
          style="width: 100px; height: 100px; margin-right: 8px"
          :key="url"
          :src="img(url)"
          lazy
          :preview-src-list="img(url).split(',')"
        />
    </el-form-item>
    <el-form-item v-if="formData.id > 0"  label="身份证国徽面">
        <el-image
          v-for="url in formData.card_img_front"
          style="width: 100px; height: 100px; margin-right: 8px"
          :key="url"
          :src="img(url)"
          lazy
          :preview-src-list="img(url).split(',')"
        />
    </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">{{ t("cancel") }}</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="confirm(formRef)"
          >{{ t("confirm") }}</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from "vue";
import { useDictionary } from "@/app/api/dict";
import { t } from "@/lang";
import type { FormInstance } from "element-plus";
import { img } from "@/utils/common";
import {
  addReal,
  editReal,
  getRealInfo,
  getWithMemberList,
  getRealStatus,
} from "@/addon/tk_vip/api/real";
const realstatus = ref();
getRealStatus().then((res) => {
  realstatus.value = res.data;
});
let showDialog = ref(false);
const loading = ref(false);

/**
 * 表单数据
 */
const initialFormData = {
  id: "",
  member_id: "",
  member_id_name:"",
  real_name: "",
  mobile: "",
  card_num: "",
  sex: "",
  birthday: "",
  field: "",
  status: "",
  real_num: "",
  card_img_back: [],
  card_img_front: [],
};
const formData: Record<string, any> = reactive({ ...initialFormData });

const formRef = ref<FormInstance>();

// 表单验证规则
const formRules = computed(() => {
  return {
    member_id: [
      { required: true, message: t("memberIdPlaceholder"), trigger: "blur" },
    ],
    real_name: [
      { required: true, message: t("realNamePlaceholder"), trigger: "blur" },
    ],
    mobile: [
      { required: true, message: t("mobilePlaceholder"), trigger: "blur" },
    ],
    card_num: [
      { required: true, message: t("cardNumPlaceholder"), trigger: "blur" },
    ],
    sex: [{ required: true, message: t("sexPlaceholder"), trigger: "blur" }],
    birthday: [
      { required: true, message: t("birthdayPlaceholder"), trigger: "blur" },
    ],
    field: [
      { required: true, message: t("fieldPlaceholder"), trigger: "blur" },
    ],
    status: [
      { required: true, message: t("statusPlaceholder"), trigger: "blur" },
    ],
    real_num: [
      { required: true, message: t("realNumPlaceholder"), trigger: "blur" },
    ],
  };
});

const emit = defineEmits(["complete"]);

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
  if (loading.value || !formEl) return;
  let save = formData.id ? editReal : addReal;

  await formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true;

      let data = formData;

      save(data)
        .then((res) => {
          loading.value = false;
          showDialog.value = false;
          emit("complete");
        })
        .catch((err) => {
          loading.value = false;
        });
    }
  });
};

// 获取字典数据

const change = () => {
  setMemberIdList();
};
const keyword = ref();
const memberIdList = ref([]);
const setMemberIdList = async () => {
  memberIdList.value = await (
    await getWithMemberList({ keyword: keyword.value })
  ).data.data;
};
setMemberIdList();
const setFormData = async (row: any = null) => {
  Object.assign(formData, initialFormData);
  loading.value = true;
  if (row) {
    const data = await (await getRealInfo(row.id)).data;
    if (data)
      Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key];
      });
  }
  loading.value = false;
};

// 验证手机号格式
const mobileVerify = (rule: any, value: any, callback: any) => {
  if (value && !/^1[3-9]\d{9}$/.test(value)) {
    callback(new Error(t("generateMobile")));
  } else {
    callback();
  }
};

// 验证身份证号
const idCardVerify = (rule: any, value: any, callback: any) => {
  if (
    value &&
    !/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value
    )
  ) {
    callback(new Error(t("generateIdCard")));
  } else {
    callback();
  }
};

// 验证邮箱号
const emailVerify = (rule: any, value: any, callback: any) => {
  if (value && !/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
    callback(new Error(t("generateEmail")));
  } else {
    callback();
  }
};

// 验证请输入整数
const numberVerify = (rule: any, value: any, callback: any) => {
  if (!Number.isInteger(value)) {
    callback(new Error(t("generateNumber")));
  } else {
    callback();
  }
};

defineExpose({
  showDialog,
  setFormData,
});
</script>

<style lang="scss" scoped></style>
<style lang="scss">
.diy-dialog-wrap .el-form-item__label {
  height: auto !important;
}
</style>
