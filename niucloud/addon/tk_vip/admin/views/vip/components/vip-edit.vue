<template>
  <el-dialog
    v-model="showDialog"
    :title="formData.id ? t('updateVip') : t('addVip')"
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
      <el-form-item :label="t('levelId')" prop="level_id">
        <el-select
          class="input-width"
          v-model="formData.level_id"
          clearable
          :placeholder="t('levelIdPlaceholder')"
        >
          <el-option label="请选择" value=""></el-option>
          <el-option
            v-for="(item, index) in levelIdList"
            :key="index"
            :label="item['level_name']"
            :value="item['level_id']"
          />
        </el-select>
      </el-form-item>

      <el-form-item :label="t('overTime')" class="input-width">
   
        <el-date-picker
          class="flex-1 !flex"
          style="width:480px"
          v-model="formData.over_time"
          clearable
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          :placeholder="t('overTimePlaceholder')"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <span class="text-gray-400">留空代表永久有效</span>
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
import {
  addVip,
  editVip,
  getVipInfo,
  getWithMemberList,
  getWithMemberLevelList,
} from "@/addon/tk_vip/api/vip";
import {dateChange} from "@/addon/tk_vip/utils/common"
let showDialog = ref(false);
const loading = ref(false);

/**
 * 表单数据
 */
const initialFormData = {
  id: "",
  member_id: "",
  level_id: "",
  over_time: "",
  member_id_name: "",
};
const formData: Record<string, any> = reactive({ ...initialFormData });

const formRef = ref<FormInstance>();

// 表单验证规则
const formRules = computed(() => {
  return {
    member_id: [
      { required: true, message: t("memberIdPlaceholder"), trigger: "blur" },
    ],
    level_id: [
      { required: true, message: t("levelIdPlaceholder"), trigger: "blur" },
    ],
    over_time: [
      { required: true, message: t("overTimePlaceholder"), trigger: "blur" },
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
  let save = formData.id ? editVip : addVip;

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
const levelIdList = ref([] as any[]);
const setLevelIdList = async () => {
  levelIdList.value = await (await getWithMemberLevelList({})).data;
};
setLevelIdList();
const setFormData = async (row: any = null) => {
  Object.assign(formData, initialFormData);
  loading.value = true;
  if (row) {
    const data = await (await getVipInfo(row.id)).data;
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
