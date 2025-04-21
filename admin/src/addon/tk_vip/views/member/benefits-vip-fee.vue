<template>
  <el-form ref="formRef" :model="formData" :rules="formRules">
    <el-form-item label="" prop="discount" class="!mb-[10px]">
      <div>
        <div class="flex items-center">
          <el-checkbox
            v-model="formData.is_use"
            :true-label="1"
            :false-label="0"
            label=""
            size="large"
          />
          <span class="ml-[10px] el-form-item__label">付费升级</span>
        </div>
        <div class="" v-show="formData.is_use">
          <div class="flex items-center">
            <span class="ml-[10px] el-form-item__label"
              >实名认证
              <span class="text-red-500">*</span>
            </span>
            <el-radio-group v-model="formData.is_real">
              <el-radio :label="'0'">不需要</el-radio>
              <el-radio :label="'1'">需要</el-radio>
            </el-radio-group>
            <span class="ml-2 text-gray-400" v-if="formData.is_real == 1"
              >需在插件实名认证配置里面开启才会生效</span
            >
          </div>
          <div>
            <el-button @click="addSpec()" type="primary">添加规格</el-button>
          </div>
          <div class="text-sm text-gray-400 mb-[5px]">
            名称可填写如日卡，季度卡等，等级有效期单位天，0为永久不限制;限制购买数量0将不会限制;会员等级到期后将会回退到默认等级
          </div>
          <div class="bg-[#FAFBFA] p-2 rounded-[5px] mb-[10px]">
            <block v-for="(item, index) in formData.fee_info" :key="index">
              <div class="flex items-center mb-2">
                <div class="flex items-center mt-[5px]">
                  <span class="ml-[10px] mr-4"
                    >名称
                    <span class="text-red-500">*</span>
                  </span>
                  <el-input
                    style="width: 120px"
                    v-model="item.name"
                    placeholder="如日卡"
                    class="w-[120px]"
                  />
                </div>
                <div class="flex items-center mt-[5px] ml-[8px]">
                  <span class="ml-[10px] mr-4"
                    >付费金额 <span class="text-red-500">*</span>
                  </span>
                  <el-input
                    mini="0"
                    style="width: 100px"
                    v-model="item.price"
                    placeholder="售卖价格"
                    type="number"
                    class="w-[120px]"
                  />
                </div>
                <div class="flex items-center mt-[5px] ml-[8px] w-[140px]">
                  <el-select
                    v-model="item.over_type"
                    placeholder="选择到期类型"
                    style="width: 240px"
                  >
                    <el-option key="common" label="天数" value="common" />
                    <el-option key="fixed" label="固定到期" value="fixed" />
                  </el-select>
                </div>

                <div
                  v-if="item.over_type == 'common'"
                  class="flex items-center mt-[5px] ml-[8px]"
                >
                  <span class="ml-[10px] mr-4"
                    >有效期 <span class="text-red-500">*</span>
                  </span>
                  <el-input
                    mini="0"
                    style="width: 80px"
                    v-model="item.day"
                    placeholder="请输入"
                    type="number"
                    class="w-[120px]"
                  />
                  <span class="ml-[5px]">天</span>
                </div>
                <div
                  v-if="item.over_type == 'fixed'"
                  class="flex items-center mt-[5px] ml-[8px]"
                >
                  <el-date-picker
                    class="ml-2"
                    v-model="item.over_time"
                    type="datetime"
                    placeholder="请选择时间"
                    format="YYYY-MM-DD HH:mm:ss"
                  />
                </div>
                <el-tooltip
                  :content="item.is_use == 0 ? '下架中' : '使用中'"
                  placement="top"
                >
                  <el-switch
                    v-model="item.is_use"
                    class="ml-2"
                    active-value="1"
                    inactive-value="0"
                  />
                </el-tooltip>
                <div class="ml-8">
                  <el-button plain @click="delSpec(index)" type="info"
                    >删除</el-button
                  >
                </div>
              </div>
            </block>
          </div>
        </div>
        <div class="text-sm text-gray-400 mb-[5px]">
          开启后当前等级将等级权益将可以通过用户自主付费购买升级
        </div>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";
import { FormRules } from "element-plus";
import { guid } from "@/utils/common";
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
  fee_info: [],
  is_real: 0, //是否需要实名认证
});

const formRef = ref(null);

const addSpec = () => {
  // 确保 feeInfo 是一个数组
  if (!Array.isArray(formData.value.fee_info)) {
    formData.value.fee_info = [];
  }
  formData.value.fee_info.push({
    id: guid(),
    name: "",
    market_price: 0,
    price: 0,
    day: 0,
    limit_num: 0,
    num: 0,
    is_use: "1",
    over_type: "common",
    over_time: "",
  });
};
const delSpec = (e) => {
  formData.value.fee_info.splice(e.index, 1);
};
const formRules = reactive<FormRules>({});

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
