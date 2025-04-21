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
		  <div class="flex justify-between items-center">
		      <span class="text-lg">基础设置</span>
		  </div>
		  
        <el-card class="!border-none" shadow="never">
          <el-alert
            type="info"
            title="转赠给他人"
            :closable="false"
            show-icon
          />
        </el-card>
        <el-form-item class="text-xs" label="开启余额转赠">
          <el-radio-group v-model="formData.is_transfer_balance">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
		<el-form-item class="text-xs" v-if="formData.is_transfer_balance==1" label="余额转赠手续费">
		  <el-input v-model="formData.transfer_balance_fee" clearable :placeholder="t('转赠给对方扣除相对应手续费,默认0')" class="input-width"  style="margin: 0 10px 0 0;" />%
		</el-form-item>
		<el-form-item class="text-xs" label="开启积分转赠">
		  <el-radio-group v-model="formData.is_transfer_point">
		    <el-radio :label="1">开启</el-radio>
		    <el-radio :label="0">关闭</el-radio>
		  </el-radio-group>
		</el-form-item>
		
		<el-form-item class="text-xs" v-if="formData.is_transfer_point==1" label="积分转赠手续费">
		 <div>
			 <div style="display: flex;align-items: center;"><div >扣除方式: </div>
				<el-radio-group v-model="formData.transfer_point_fee_type" style="margin-left:20px;">
				  <el-radio :label="1">积分</el-radio>
				  <el-radio :label="2">余额(余额抵扣)</el-radio>
				  <el-radio :label="3">现金(在线支付)</el-radio>
				</el-radio-group>
			</div>
			 <div style="display: flex;align-items: center;"><div>手续费: </div>
				 <el-input v-model="formData.transfer_point_fee" clearable :placeholder="t('转赠给对方扣除相对应手续费,默认0')" class="input-width"  style="margin: 0 10px 0 30px;width: 100px;" />
				 <el-radio-group v-model="formData.transfer_point_fee_unit" style="margin-left:20px;">
				   <el-radio :label="1">%</el-radio>
				   <el-radio :label="2">元</el-radio>
				 </el-radio-group>
			 </div>
		 </div>
		</el-form-item>
		
		
		<el-form-item class="text-xs" label="开启佣金转赠">
		  <el-radio-group v-model="formData.is_transfer_commission">
		    <el-radio :label="1">开启</el-radio>
		    <el-radio :label="0">关闭</el-radio>
		  </el-radio-group>
		</el-form-item>
		<el-form-item class="text-xs" v-if="formData.is_transfer_commission==1" label="佣金转赠手续费">
		  <el-input v-model="formData.transfer_commission_fee" clearable :placeholder="t('转赠给对方扣除相对应手续费,默认0')" class="input-width" style="margin: 0 10px 0 0;" />%
		</el-form-item>
		
		<el-form-item class="text-xs" label="开启优惠券转赠">
		  <el-radio-group v-model="formData.is_transfer_coupon">
		    <el-radio :label="1">开启</el-radio>
		    <el-radio :label="0">关闭</el-radio>
		  </el-radio-group>
		</el-form-item>
       
		
		 <el-card class="!border-none" shadow="never">
		   <el-alert
		     type="info"
		     title="自我资产类型互转"
		     :closable="false"
		     show-icon
		   />
		 </el-card>
		 <el-form-item class="text-xs" label="积分兑换余额">
		   <el-radio-group v-model="formData.is_point_balance">
		     <el-radio :label="1">开启</el-radio>
		     <el-radio :label="0">关闭</el-radio>
		   </el-radio-group>
		 </el-form-item>
		 <el-form-item class="text-xs" label="余额兑换积分">
		   <el-radio-group v-model="formData.is_balance_point">
		     <el-radio :label="1">开启</el-radio>
		     <el-radio :label="0">关闭</el-radio>
		   </el-radio-group>
		 </el-form-item>
		 <el-form-item class="text-xs" v-if="formData.is_point_balance==1||formData.is_balance_point==1" label="积分兑换余额比例">
		  <span style="margin-right: 10px;">每1积分 = </span>	<el-input v-model="formData.point_balance_rate" clearable :placeholder="t('')" class="input-width" style="margin: 0 10px;width:150px"  />元余额
		 </el-form-item>
		 
		 <el-form-item class="text-xs" label="佣金兑换余额">
		   <el-radio-group v-model="formData.is_commission_balance">
		     <el-radio :label="1">开启</el-radio>
		     <el-radio :label="0">关闭</el-radio>
		   </el-radio-group>
		 </el-form-item>
		 <el-form-item class="text-xs" v-if="formData.is_commission_balance==1" label="佣金兑换余额比例">
		  <span>每1佣金 = </span>	<el-input v-model="formData.commission_balance_rate" clearable :placeholder="t('')" class="input-width"  style="margin: 0 10px;width:150px" />元余额
		 </el-form-item>
		 
		
		 <el-card class="!border-none" shadow="never">
		   <el-alert
		     type="info"
		     title="安全验证"
		     :closable="false"
		     show-icon
		   />
		 </el-card>
		 <el-form-item class="text-xs" label="短信验证">
		   <el-radio-group v-model="formData.is_sms">
		     <el-radio :label="1">开启</el-radio>
		     <el-radio :label="0">关闭</el-radio>
		   </el-radio-group>
		 </el-form-item>
		 <el-form-item class="text-xs" label="密码验证">
		   <el-radio-group v-model="formData.is_password">
		     <el-radio :label="1">开启</el-radio>
		     <el-radio :label="0">关闭</el-radio>
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
import { getConfig, setConfig } from "@/addon/transfer/api/config";
import { FormInstance, ElMessage } from "element-plus";

const loading = ref(true);
const ruleFormRef = ref<FormInstance>();
const formData = reactive({
  is_sms:0,is_password:0,is_balance_point:0,
  is_transfer_coupon:0,
  is_transfer_point:0,
  is_transfer_balance:0,
  is_transfer_commission:0,
  transfer_point_fee:0,
  transfer_commission_fee:0,
  transfer_balance_fee:0,
  is_point_balance:0,
  point_balance_rate:0,
  is_commission_balance:0,
  commission_balance_rate:0,
  transfer_point_fee_type:1,
  transfer_point_fee_unit:1,
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
  