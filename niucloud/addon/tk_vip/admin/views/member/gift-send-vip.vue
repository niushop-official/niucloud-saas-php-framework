<template>
  <el-form ref="formRef" :model="formData" :rules="formRules">
    <el-form-item label="" prop="day">
      <el-checkbox
        v-model="formData.is_use"
        :true-label="1"
        :false-label="0"
        label=""
        size="large"
      />
      <span class="ml-[10px] el-form-item__label">送会员等级</span>
      <el-select
        class="input-width"
        v-model="formData.level_id"
        clearable
        placeholder="请选择"
      >
        <el-option label="请选择" value=""></el-option>
        <el-option
          v-for="(item, index) in levelIdList"
          :key="index"
          :label="item['level_name']"
          :value="item['level_id']"
        />
      </el-select>
      <div class="w-[70px] ml-8">
        <el-input v-model.trim="formData.day" clearable />
      </div>
      <span class="ml-[15px] el-form-item__label">天</span>
    </el-form-item>
  </el-form>
  <div class="text-sm text-gray-400 mb-[5px]">
    用户可以通过完成任务升级到当前等级，天数0为永久会员
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";
import { FormRules } from "element-plus";
import Test from "@/utils/test";
import { getWithMemberLevelList } from "@/addon/tk_vip/api/vip";
const levelIdList = ref([] as any[]);
const setLevelIdList = async () => {
  levelIdList.value = await (await getWithMemberLevelList({})).data;
};
setLevelIdList();
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const emits = defineEmits(["update:modelValue"]);

const formData = ref({
  is_use: 0,
  day: "",
  level_id: "",
});

const formRef = ref(null);
// 正则表达式
const regExp = {
  required: /[\S]+/,
  number: /^\d{0,10}$/,
  digit: /^\d{0,10}(.?\d{0,2})$/,
  special: /^\d{0,10}(.?\d{0,3})$/,
};
const formRules = reactive<FormRules>({
  num: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (formData.value.is_use) {
          if (value.length == 0) {
            callback("请输入天数数量");
          } else if (isNaN(value) || !regExp.number.test(value)) {
            callback("天数数量格式错误");
          } else if (value < 0) {
            callback("天数数量不能小于0");
          } else {
            callback();
          }
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});

watch(
  () => value.value,
  (nval, oval) => {
    if ((!oval || !Object.keys(oval).length) && Object.keys(nval).length) {
      formData.value = value.value;
    }
  },
  { immediate: true }
);

watch(
  () => formData.value,
  () => {
    value.value = formData.value;
  },
  { deep: true }
);

const verify = async () => {
  let verify = true;
  await formRef.value?.validate((valid) => {
    verify = valid;
  });
  return verify;
};

defineExpose({
  verify,
});
</script>

<style lang="scss" scoped>
</style>
