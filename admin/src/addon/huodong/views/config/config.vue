<template>
  <div class="main-container">
    <el-form
      :model="formData"
      label-width="180px"
      ref="ruleFormRef"
      :rules="rules"
      class="page-form"
      v-loading="loading"
    >
      <el-card class="box-card !border-none" shadow="never">
        <el-card class="!border-none" shadow="never">
          <el-alert
            type="info"
            title="活动管理基础配置"
            :closable="false"
            show-icon
          />
        </el-card>
		
        <el-form-item class="text-xs" label="活动开始后是否允许取消">
          <el-radio-group v-model="formData.is_allow_cancel">
            <el-radio :label="'1'">禁止</el-radio>
            <el-radio :label="'0'">允许</el-radio>
          </el-radio-group>
        </el-form-item>
         <el-form-item class="text-xs" label="取消报名扣除积分">
		   <el-input v-model="formData.cancel_del_jifen" clearable :placeholder="t('取消报名扣除积分, 积分不足则不允许取消')" class="input-width" />
         </el-form-item>
		 <el-form-item class="text-xs" label="开启单独活动排行榜">
		   <el-radio-group v-model="formData.open_act_rank">
		     <el-radio :label="1">开启</el-radio>
		     <el-radio :label="0">关闭</el-radio>
		   </el-radio-group>
		 </el-form-item>
		 <el-form-item class="text-xs" label="开启活动手动奖励发放">
		   <el-radio-group v-model="formData.open_send_point">
		     <el-radio :label="1">开启</el-radio>
		     <el-radio :label="0">关闭</el-radio>
		   </el-radio-group>
		 </el-form-item>
		 <el-form-item class="text-xs" label="开启推广奖励">
		   <el-radio-group v-model="formData.open_fenxiao_gifts">
		     <el-radio :label="1">开启</el-radio>
		     <el-radio :label="0">关闭</el-radio>
		   </el-radio-group>
		 </el-form-item>
		 <el-form-item class="text-xs" label="推广奖励类型" v-if="formData.open_fenxiao_gifts==1">
		   <el-radio-group v-model="formData.fenxiao_gifts_type">
		     <el-radio :label="1">固定奖励</el-radio>
		     <el-radio :label="2">按报名费比例</el-radio>
		   </el-radio-group>
		 </el-form-item>
		 <el-form-item :label="t('推广获得奖励')" v-if="formData.open_fenxiao_gifts==1&&formData.fenxiao_gifts_type==1" prop="level_id">
		     <view>
		  	   <member-gift ref="giftRef" v-model="formData.fenxiao_gifts"/>
		     </view>
		  </el-form-item>
		<div v-if="formData.open_fenxiao_gifts==1&&formData.fenxiao_gifts_type==2">
			<el-form-item class="text-xs"   label="一级推广佣金比例">
			  <el-input v-model="formData.fenxiao_rate1" clearable :placeholder="t('一级推广佣金比例(%)')" class="input-width" />%
			</el-form-item>
			<el-form-item class="text-xs" label="二级推广佣金比例">
			  <el-input v-model="formData.fenxiao_rate2" clearable :placeholder="t('二级推广佣金比例(%)')" class="input-width" />%
			</el-form-item>
		</div>
		<!-- <el-form-item class="text-xs"  v-if="formData.open_fenxiao_gifts==1" label="推广奖励发放方式">
		  <el-radio-group v-model="formData.fenxiao_sendtype">
		    <el-radio :label="1">完成后自动发放</el-radio>
		    <el-radio :label="2">完成后手动审核</el-radio>
		  </el-radio-group>
		</el-form-item> -->
		<el-form-item class="text-xs" label="重复收集报名信息">
		  <el-radio-group v-model="formData.one_tianbiao">
		    <el-radio :label="0">每次报名填写</el-radio>
		    <el-radio :label="1">重复报名无需再次填写</el-radio>
		  </el-radio-group>
		</el-form-item>
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
import { getConfig, setConfig } from "@/addon/huodong/api/config";
import { FormInstance, ElMessage } from "element-plus";
import memberGift from '@/addon/huodong/views/components/member-gift.vue'

const loading = ref(true);
const ruleFormRef = ref<FormInstance>();
const formData = reactive({
  is_allow_cancel: "0",
  cancel_del_jifen:0,
  open_act_rank:0,
  open_send_point:0,
  fenxiao_gifts:[],
  open_fenxiao_gifts:0,
  fenxiao_rate1:0,
  fenxiao_rate2:0,
  fenxiao_gifts_type:1,
  one_tianbiao:0
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
  