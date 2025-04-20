<template>
  <div class="main-container">
    <el-card class="box-card !border-none" shadow="never">
      <el-page-header
        :content="t('weightDistributionProbabilist')"
        :icon="ArrowLeft"
        @back="$router.back()"
      />
    </el-card>
    <el-card class="box-card mt-[15px]">
      <el-row class="flex is-justify-space-around">
        <el-form
          :model="formData"
          ref="formRef"
          :rules="formRules"
          class="page-form"
        >
          <el-form-item :label="t('weightValue')" required>
            <div class="flex gap-2">
              <el-tag
                v-for="tag in formData.dynamicWeight"
                :key="tag"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag }}
              </el-tag>
              <el-input
                v-if="inputVisible"
                ref="formRef"
                v-model="formData.weightValue"
                class="w-20"
                size="small"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm"
              />
              <el-button
                v-else
                class="button-new-tag"
                @click="showInput"
                type="success"
                size="small"
              >
                + {{ t("addWeight") }}
              </el-button>
            </div>
          </el-form-item>
          <el-form-item :label="t('simulationsNumber')" prop="number">
            <el-input-number
              v-model="formData.number"
              controls-position="right"
              :min="1"
            ></el-input-number>
          </el-form-item>
        </el-form>
      </el-row>
      <transition name="el-fade-in-linear">
      <el-row class="exhibition mt-[120px] flex is-justify-space-around" v-show="show">
        <el-card class="w-[480px]">
          <template #header>
            <div class="card-header">
              <span>{{ t("numberProportion") }}</span>
            </div>
          </template>
          <div class="text item" v-for="(item, index) in formData.results" :key="index">
            <el-text type="primary" size="large" style="padding-right: 5px">权重:</el-text>
            <el-text type="warning" style="padding-right: 5px" >{{formData.dynamicWeight[index]}}</el-text>
            <el-text type="info" style="padding-right: 5px" >被选中</el-text>
            <el-text type="danger">{{item}}</el-text><el-text>次</el-text>
          </div>
        </el-card>
        <el-card class="w-[480px]">
          <template #header>
            <div class="card-header">
              <span>{{ t("percentProportion") }}</span>
            </div>
          </template>
          <div class="text item" v-for="(item, index) in formData.percentages" :key="index">
            <el-text type="primary" size="large" style="padding-right: 5px">权重:</el-text>
            <el-text type="warning" style="padding-right: 5px" >{{formData.dynamicWeight[index]}}</el-text>
            <el-text type="info" style="padding-right: 5px" >占总权重的百分比为</el-text>
            <el-text type="danger">{{item}}</el-text><el-text>%</el-text>
          </div>
        </el-card>
      </el-row>
      </transition>
    </el-card>
    <div class="fixed-footer-wrap">
      <div class="fixed-footer">
        <el-button type="primary" @click="calculate(formRef)" class="w-[200px]">{{
          t("calculate")
        }}</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { t } from "@/lang";
import {reactive, ref, nextTick, computed} from "vue"
import { FormInstance, FormRules } from "element-plus"
import { ElInput } from "element-plus"
import {cloneDeep} from "lodash"
import { calculateApi } from "@/addon/turntable/api/turntable"
const formRef = ref<FormInstance>()
const formData = reactive<Record<string, string | boolean | Array<string>>>({
  number: "300",
  dynamicWeight: ['70','25','35','15','3','2','1'],
  results:[],
  percentages:[]

});
const show = ref(false)
const inputVisible = ref(false)
const weightValue = ref("");
const InputRef = ref<InstanceType<typeof ElInput>>();
// 表单验证规则
const formRules = computed(() => {
  return {
    number:[
      {
        required: true,
        trigger: "change",
        validator: (rule: any, value: any, callback: any) => {
          if (!value) {
            callback(new Error(t('weightValuePlaceholder')))
          } else {
            callback()
          }
        }
      }
    ]
  }
})
const handleClose = (tag: string) => {
  formData.dynamicWeight.splice(formData.dynamicWeight.indexOf(tag), 1)
};
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  });
};
const handleInputConfirm = () => {
  if (formData.weightValue) {
    formData.dynamicWeight.push(formData.weightValue);
  }
  inputVisible.value = false
  formData.weightValue = ""
};
const calculate = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
      if(valid){
        formData.dynamicWeight = formData.dynamicWeight.map(Number)
        const data = cloneDeep(formData)
        calculateApi(data).then(res => {
          show.value = true
          formData.results = res.data.results
          formData.percentages = res.data.percentages
        }).catch(() => {
          show.value = false
        })
      }
  })
};
</script>
