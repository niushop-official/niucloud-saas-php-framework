<template>
  <el-form ref="formRef" :model="formData" :rules="formRules">
    <el-form-item label="" prop="commission">
      <div class="flex items-center">
        <el-checkbox
          v-model="formData.is_use"
          :true-label="1"
          :false-label="0"
          label=""
          size="large"
        />
        <span class="ml-[10px] el-form-item__label">送</span>
        <div class="w-[70px]">
          <el-input
            v-model.trim="formData.commission"
            :maxlength="5"
            clearable
          />
        </div>
        <span class="ml-[15px] el-form-item__label">佣金</span>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";
import { FormRules } from "element-plus";
import Test from "@/utils/test";

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
  commission: "",
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
  commission: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (formData.value.is_use) {
          if (Test.empty(value)) {
            callback("请输入佣金金额");
          } else if (isNaN(value) || !regExp.digit.test(value)) {
            callback("佣金金额格式错误");
          } else if (value <= 0) {
            callback("佣金金额不能小于等于0");
          }
          callback();
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
