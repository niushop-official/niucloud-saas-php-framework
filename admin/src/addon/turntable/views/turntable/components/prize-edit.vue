<template>
  <el-dialog
    v-model="showDialog"
    :title="title"
    width="750px"
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
      <el-form-item :label="t('awardName')" prop="award_name">
        <el-input
          v-model.trim="formData.award_name"
          clearable
          :placeholder="t('awardNamePlaceholder')"
          class="input-width"
          :maxlength=20
          show-word-limit
        />
      </el-form-item>

      <el-form-item :label="t('prize')" class="mt-[5px]" required >
        <el-radio-group v-model="formData.award_type">
          <el-radio :label = 3 class="w-[53px]">{{ t("couponName") }}</el-radio>
          <el-form-item prop="relate_id" class="mr-[100px] ">
            <el-select v-model="formData.relate_id" filterable :placeholder="t('couponRegionSelectPlaceholder')" >
              <el-option
                  v-for="item in coupon_options"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="formData.award_type">
          <el-radio :label=1 class="mt-2 w-[53px]" >{{ t("pointName") }}</el-radio>
          <el-form-item prop="point">
            <el-input-number
                v-model="formData.point"
                controls-position="right"
                :min="0"
                class="mt-[20px] mb-[8px]"
                style="width: 215px"
            />
          </el-form-item>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="formData.award_type">
          <el-radio :label=2 class="mt-2 w-[53px]">{{ t("redPacket") }}</el-radio>
          <el-form-item prop="balance">
            <el-input-number
                v-model="formData.balance"
                controls-position="right"
                :precision=2
                :step="0.1"
                class="mt-[20px] mb-[8px]"
                style="width: 215px"
            />
          </el-form-item>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="formData.award_type">
        <el-radio :label=4 class="mt-2 w-[100px]">{{ t("offlinePrize") }}</el-radio>
        <el-form-item prop="offlinePrize" class="mt-4">
          <upload-image v-model="formData.offlinePrize" width="80px" height="80px"/>
          <div class="form-tip">{{ t("offlinePrizeImageTip") }}</div>
        </el-form-item>
        </el-radio-group>
      </el-form-item>
      <el-form-item >
        <el-text class="mx-1 w-[80px]">{{t('assignCrowd')}}</el-text>
        <el-select-v2
            v-model="formData.assign_crowd"
            multiple
            filterable
            remote
            :remote-method="remoteMethod"
            clearable
            :options="options"
            :placeholder="t('PleaseEnterAssignCrowd')"
        />
      </el-form-item>
      <el-form-item :label="t('quantityLabel')" prop="award_num" class="pt-2">
        <el-input-number
            v-model="formData.award_num"
            controls-position="right"
            :min=1
            style="width: 300px"
        />
      </el-form-item>
      <el-form-item :label="t('weightLabel')" prop="award_winning_rate">
        <el-input-number
            v-model="formData.award_winning_rate"
            controls-position="right"
            :min=1
            style="width: 300px"
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
import { ref, reactive, computed,defineProps,onMounted} from "vue";
import { t } from "@/lang";
import { FormInstance,ElMessage} from "element-plus";
import {getCouponListApi, getMemberListApi} from "@/addon/turntable/api/turntable";
import { getGamesSettings } from "@/addon/turntable/api/settings";
import { cloneDeep } from 'lodash';
const props = defineProps({
  gamesAwardTable: []
});
const showDialog = ref(false)
const isShow = ref(false)
const loading = ref(false)
const flag = ref(false)
const title = ref("")

/**
 * 表单数据
 */
const initialFormData = {
  award_id: '',
  award_name:'',
  award_type:3,
  relate_id: '',
  prize:t('redPacket'),
  point: 0,
  balance: '0',
  award_num:1,
  award_winning_rate:1,
  index:-1,
  assign_crowd:[],
  offlinePrize:'',
  is_shop:0
};
const formData: Record<string, any> = reactive({ ...initialFormData});

const formRef = ref<FormInstance>();

// 表单验证规则
const formRules = computed(() => {
  return {
    award_name: [
      { required: true, message: t("awardNamePlaceholder"), trigger: "blur" },
    ],
    award_num:[
      { required: true, message: t("awardNumLabelPlaceholder"), trigger: "blur" },
    ],
    award_winning_rate:[
      { required: true, message: t("awardWinningRateLabelPlaceholder"), trigger: "blur" },
    ],
    relate_id:[
      {
        required: true,
        trigger: "change",
        validator: (rule: any, value: any, callback: any) => {
          if (formData.award_type == 3) { //3优惠券
            if (value === '') {
              callback(new Error(t('relateIdPlaceholder')))
            } else {
              callback()
            }
          } else {
            callback()
          }
        }
      },
    ],
    point:[
      {
        required: true,
        trigger: "change",
        validator: (rule: any, value: any, callback: any) => {
          if (formData.award_type == 1) { //积分
            if (!value) {
              callback(new Error(t('pointPlaceholder')))
            } else {
              callback()
            }
          } else {
            callback()
          }
        }
      }
    ],
    balance:[
      {
        required: true,
        trigger: "change",
        validator: (rule: any, value: any, callback: any) => {
          if (formData.award_type == 2) { //余额
            if (!value) {
              callback(new Error(t('balancePlaceholder')))
            } else {
              callback()
            }
          } else {
            callback()
          }
        }
      }
    ],
    offlinePrize:[
      {
        required: true,
        trigger: "change",
        validator: (rule: any, value: any, callback: any) => {
          if (formData.award_type == 4) { //赠品
            if (!value) {
              callback(new Error(t('offlinePrizeUploadImage')))
            } else {
              callback()
            }
          } else {
            callback()
          }
        }
      }
    ]
  };
});
const emit = defineEmits(["complete"]);

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
  const data = cloneDeep(formData);
  if(hasDuplicate(props.gamesAwardTable.data,data)){
    ElMessage({ message: "奖品名称有重复项，请重新输入", type: "error" });
    return false;
  }
  if (loading.value || !formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      if (data.award_type == 3) {
        data.prize = t('couponName')
      }
      if (data.award_type == 1) {
        data.prize = t('pointName')
      }
      if (data.award_type == 4) {
        data.prize = t('offlinePrize')
      }
      loading.value = false
      showDialog.value = false
      emit("complete",data);
    }else{
      loading.value = false
    }
  });
};
const loadGameSettings = () => {
  getGamesSettings().then(res => {
    if(res.data!= undefined && res.data.is_shop == 1){
      loadCouponList()
    }
  }).catch(() => {
    coupon_options.value = []
  })
}
// 获取字典数据
const setFormData = async (row: any = null) => {
  if (row) {
    title.value = t("updatePrize");
    Object.assign(formData, cloneDeep(row));
    formData.offlinePrize = row.award_type == 4 && row.award_img ? row.award_img:row.offlinePrize //实物
    formData.assign_crowd = Object.values(row.assign_crowd)
  } else {
    Object.assign(formData, cloneDeep(initialFormData));
    title.value = t("addPrize");
    loading.value = true;
  }
  loading.value = false;
  loadGameSettings()
}

defineExpose({
  showDialog,
  isShow,
  setFormData,
});
const coupon_options = ref([]);
const loadCouponList = () => {
  getCouponListApi().then(res => {
    coupon_options.value = res.data.data
  }).catch(() => {
    coupon_options.value = []
  })
}
interface assignCrowdListItem {
  value: string
  label: string
}
const assignCrowdList = ref<assignCrowdListItem[]>([])
const options = ref<assignCrowdListItem[]>([])
getMemberListApi().then(res => {
  assignCrowdList.value = res.data.map(item => {
    return {
      value: item.nickname,
      label: item.nickname
    }
  })
}).catch(() => {
  assignCrowdList.value = [];
  formData.assign_crowd = [];
})
const remoteMethod = (query: string) => {
  if (query !== '') {
    setTimeout(() => {
      options.value = assignCrowdList.value.filter((item) => {
        return item.label.toLowerCase().includes(query.toLowerCase())
      })
    }, 200)
  } else {
    options.value = []
  }
}
const hasDuplicate = (data:any, formData:any)=>{
  let flag = false;
  data.forEach(item=>{
    if(item.award_name == formData.award_name && item.award_id!=formData.award_id){
      flag = true
      return
    }
  })
  return flag
}
</script>

<style lang="scss" scoped>
.diy-dialog-wrap .el-form-item__label {
  height: auto !important;
}
.el-input-number {
  width: 200px;
}
</style>
