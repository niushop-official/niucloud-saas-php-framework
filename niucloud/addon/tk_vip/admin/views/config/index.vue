<template>
  <div class="main-container">
    <el-form
      :model="formData"
      label-width="150px"
      ref="ruleFormRef"
      :rules="rules"
      class="page-form"
      v-loading="loading"
    >
      <el-card class="box-card !border-none" shadow="never">
        <el-alert
          type="info"
          class="w-[120px]"
          title="新用户注册时候默认赠送会员等级权益,0代表最初始的默认等级"
          :closable="false"
          show-icon
        />
        <div class="flex mt-4">
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
          <div class="flex items-center ml-[8px] w-[140px]">
            <el-select
              v-model="formData.over_type"
              placeholder="选择到期类型"
              style="width: 240px"
            >
              <el-option key="common" label="天数" value="common" />
              <el-option key="fixed" label="固定到期" value="fixed" />
            </el-select>
          </div>
          <div
            v-if="formData.over_type == 'fixed'"
            class="flex items-center ml-[8px]"
          >
            <el-date-picker
              class="ml-2"
              v-model="formData.over_time"
              type="datetime"
              placeholder="请选择时间"
              format="YYYY-MM-DD HH:mm:ss"
            />
          </div>
          <div v-if="formData.over_type == 'common'" class="flex">
            <div class="w-[70px] ml-8">
              <el-input v-model.trim="formData.day" clearable />
            </div>
            <span class="ml-[15px] el-form-item__label">天</span>
          </div>
        </div>
      </el-card>
    </el-form>
    <div class="fixed-footer-wrap">
      <div class="fixed-footer">
        <el-button type="primary" @click="onSave()">{{ t("save") }}</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { t } from "@/lang";
import { getConfig, setConfig } from "@/addon/tk_vip/api/config";
import { FormInstance, ElMessage } from "element-plus";
import { getWithMemberLevelList } from "@/addon/tk_vip/api/vip";
const levelIdList = ref([] as any[]);
const setLevelIdList = async () => {
  levelIdList.value = await (await getWithMemberLevelList({})).data;
};
setLevelIdList();
const loading = ref(true);
const ruleFormRef = ref<FormInstance>();
const formData = reactive({
  level_id: "",
  day: 0,
  over_type: "common",
  over_time: "",
});
const getData = async () => {
  const data = await getConfig();
  console.log(data);
  loading.value = false;
  for (const key in formData) {
    formData[key] = data.data[key];
  }
};
getData();
const onSave = async () => {
  await setConfig(formData);
  getData();
};
</script>

<style lang="scss" scoped></style>
