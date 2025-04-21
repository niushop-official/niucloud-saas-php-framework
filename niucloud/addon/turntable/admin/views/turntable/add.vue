<template>
  <div class="main-container">
    <div class="detail-head">
      <div class="left" @click="router.push(`/turntable/index`)">
        <span class="iconfont iconxiangzuojiantou !text-xs"></span>
        <span class="ml-[1px]">{{ t("returnToPreviousPage") }}</span>
      </div>
      <span class="adorn">|</span>
      <span class="right">{{
        formData.game_id ? t("updateTurntableGame") : t("addTurntableGame")
      }}</span>
    </div>
    <el-card class="box-card !border-none" shadow="never">
      <el-tabs v-model="activeName" @tab-click="tabHandleClick">
        <el-tab-pane :label="t('basicInfoTab')" name="basic">
          <el-form
            :model="formData"
            label-width="120px"
            ref="basicFormRef"
            :rules="formRules"
            class="page-form"
            :loading="loading"
          >
            <el-form-item :label="t('gameName')" prop="game_name">
              <el-input
                v-model.trim="formData.game_name"
                clearable
                :placeholder="t('gameNamePlaceholder')"
                class="input-width"
                maxlength="15"
                show-word-limit
              />
            </el-form-item>
            <el-form-item :label="t('activityTime')" required>
              <el-col :span=4>
                <el-form-item prop="start_time">
                  <el-date-picker
                    v-model="formData.start_time"
                    type="datetime"
                    :aria-label="t('startTime')"
                    :placeholder="t('startTime')"
                    style="width: 100%"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    :default-time="startDefaultTime(8)"
                  />
                </el-form-item>
              </el-col>
              <el-col :span=1 class="text-center">
                <span class="text-gray-500">-</span>
              </el-col>
              <el-col :span=4>
                <el-form-item prop="end_time">
                  <el-date-picker
                    v-model="formData.end_time"
                    type="datetime"
                    :aria-label="t('endTime')"
                    :placeholder="t('endTime')"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item :label="t('remark')">
              <el-input
                v-model="formData.remark"
                type="textarea"
                :rows=4
                clearable
                :placeholder="t('remarkPlaceholder')"
                class="input-width"
                maxlength="100"
              />
            </el-form-item>
            <el-form-item :label="t('gameRequire')" prop="level_id">
              <el-radio-group v-model="formData.level_id">
                <el-radio :label=0>{{ t("allMember") }}</el-radio>
                <el-radio :label=1>{{ t("portionMember") }}</el-radio>
              </el-radio-group>
              <div class="form-tip">{{ t("levelIdTips") }}</div>
            </el-form-item>
            <el-form-item :label="t('points')" prop="points">
              <el-input-number
                v-model="formData.points"
                controls-position="right"
                :min=1
              />
            </el-form-item>
            <el-form-item :label="t('gameNumber')"  required>
              <el-radio-group v-model="formData.join_type">
                <el-radio :label=0>{{ t("everyday") }}</el-radio>
                <el-radio :label=1>{{ t("onePerson") }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item  prop="join_frequency">
              <el-input-number
                v-model="formData.join_frequency"
                controls-position="right"
                :min=1
              />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :label="t('winningSetting')" name="winningSetting">
          <el-form
            :model="formData"
            label-width="120px"
            :rules="formRules"
            ref="winningSettingRef"
            class="page-form"
          >
            <el-form-item :label="t('winningRateLabel')" prop="winning_rate">
              <el-input-number
                v-model="formData.winning_rate"
                controls-position="right"
                :step="0.1"
                :precision="2"
                :max="100"
              />
            </el-form-item>
            <el-form-item>
              <div class="form-tip">
                <span class="aux-title">注意：</span>
                <div class="aux-item mt-[12px]">{{ t("tops1") }}</div>
                <div class="aux-item mt-[12px]">{{ t("tops2") }}</div>
                <div class="aux-item mt-[12px]">{{ t("tops3") }}</div>
              </div>
            </el-form-item>

            <el-form-item :label="t('noWinning_descLabel')" prop="winningRate">
              <el-input
                v-model.trim="formData.no_winning_desc"
                clearable
                :placeholder="t('noWinningDescPlaceholder')"
                class="input-width"
                maxlength="15"
                show-word-limit
              />
            </el-form-item>
            <el-form-item :label="t('noWinningImgLabel')" prop="noWinningImg">
              <upload-image v-model="formData.no_winning_img" :limit="10" />
            </el-form-item>
            <el-form-item :label="t('isShowWinnerLabel')" prop="noWinningShow">
              <el-radio-group v-model="formData.is_show_winner">
                <el-radio label="0">{{ t("winnerShow") }}</el-radio>
                <el-radio label="1">{{ t("notWinnerShow") }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :label="t('prizeSettings')" name="prizeSettings">
          <el-form
            :model="formData"
            label-width="120px"
            ref="prizeSettingsRef"
            :rules="formRules"
            class="page-form"
          >
            <div class="flex justify-between items-center">
              <span class="text-page-title"></span>
              <el-button
                type="primary"
                class="w-[150px] mb-[10px]"
                @click="addEvent"
                >{{ t("addPrize") }}</el-button
              >
            </div>
            <el-form-item :label="t('prizeDetailLabel')" required>
              <div class="mt-[10px] w-[1300px]">
              <el-table
                size="large"
                :data="gamesAwardTable.data"
                v-loading="gamesAwardTable.loading"
              >
                <template #empty>
                  <span>{{ !loading ? t("emptyData") : "" }}</span>
                </template>
                <el-table-column
                  :label="t('awardName')"
                  min-width="120"
                  align="left"
                  header-align="left"
                  prop="award_name"
                ></el-table-column>
                <el-table-column
                  :label="t('prize')"
                  min-width="120"
                  align="left"
                  header-align="left"
                  prop="prize"
                ></el-table-column>
                <el-table-column
                  :label="t('awardNum')"
                  min-width="120"
                  align="left"
                  header-align="left"
                  prop="award_num"
                ></el-table-column>
                <el-table-column
                  :label="t('prizeWeight')"
                  min-width="120"
                  align="left"
                  header-align="left"
                  prop="award_winning_rate"
                ></el-table-column>
                <el-table-column :label="t('operations')">
                  <template #default="scope">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.$index,scope.row)"
                    >
                      {{ t("handleEdit") }}
                    </el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index)"
                    >
                      {{ t("handleDelete") }}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
                <div class="mt-[16px] flex justify-end">
                  <el-pagination
                      v-model:current-page="gamesAwardTable.page"
                      v-model:page-size="gamesAwardTable.limit"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="gamesAwardTable.total"
                      @size-change="loadGamesAwardList"
                      @current-change="loadGamesAwardList"
                  />
                </div>
              </div>
              <div class="form-tip">
                <span class="aux-title">注意：</span>
                <div class="aux-item mt-[12px]">
                  1、奖项发放完毕之后活动将自动关闭
                </div>
                <div class="aux-item mt-[12px]">
                  2、奖品奖项不能少于1项且不能超过7项。
                </div>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <prize-edit ref="gamesAwardTableRef" @complete="loadGamesAwardList" :gamesAwardTable = "gamesAwardTable"/>
    </el-card>
    <div class="fixed-footer-wrap">
      <div class="fixed-footer">
        <el-button type="primary" @click="save()">{{ t("save") }}</el-button>
        <el-button @click="back()">{{ t("back") }}</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, computed } from "vue";
import { t } from "@/lang";
import { useRouter, useRoute } from "vue-router";
import { FormInstance,ElMessage } from "element-plus";
import PrizeEdit from "@/addon/turntable/views/turntable/components/prize-edit.vue";
import { createGamesApi} from '@/addon/turntable/api/turntable'
import { cloneDeep } from "lodash";
const route = useRoute();
const router = useRouter();
const pageName = route.meta.title;
const loading = ref(true)
const basicFormRef = ref<FormInstance>()
const winningSettingRef = ref<FormInstance>()
const prizeSettingsRef = ref<FormInstance>()
// 表单数据
const initialFormData = {
  game_id: '',
  game_name: '',
  start_time:'',
  end_time:'',
  level_id: 0,
  points: 1,
  join_type: 0,
  join_frequency: 1,
  winning_rate: 1.0,
  no_winning_desc: "很遗憾，未中奖",
  no_winning_img: "/addon/turntable/no_winning.png",
  is_show_winner: 0,
  games_award :[]
};
const gamesAwardTable = reactive({
  page: 1,
  limit: 10,
  total: 0,
  loading: true,
  data: [],
});
const formData: Record<string, any> = reactive({ ...initialFormData });

formData.game_id = ref(route.query.game_id);
const activeName = ref("basic");
const gamesAwardTableRef: Record<string, any> | null = ref(null);

const startDefaultTime = (a) => {
  var now = new Date(); // 获取当前日期和时间
  now.setHours(a); // 设置小时为8（24小时制）
  now.setMinutes(0);
  now.setSeconds(0);
  return now;
};
const loadGamesAwardList = (data:any ) => {
  if (data) {
    if (data.index >= 0) {
      gamesAwardTable.data.splice(data.index, 1, cloneDeep(data));
    } else {
      gamesAwardTable.data.unshift(cloneDeep(data));
      gamesAwardTable.total = ++gamesAwardTable.total;
    }
    formData.games_award = gamesAwardTable.data
    gamesAwardTable.loading = false;
  } else {
    gamesAwardTable.loading = false;
    loading.value = false
  }
};
// 表单验证规则
const formRules = computed(() => {
  return {
    game_name: [
      {required: true, message: t("gameNamePlaceholder"), trigger: "blur"},
    ],
    start_time: [
      {
        required: true,
        message: t("startTimePlaceholder"),
        type: "date",
        trigger: "change",
      },
    ],
    end_time: [
      {
        required: true,
        message: t("endTimePlaceholder"),
        type: "date",
        trigger: "change",
      },
    ],
    points: [
      {required: true, message: t("pointsPlaceholder"), trigger: "blur"},
    ],
    join_frequency: [
      {required: true, message: t("gameNumberPlaceholder"), trigger: "blur"},
    ],
    winning_rate: [
      {required: true, message: t("winningRatePlaceholder"), trigger: "blur"},
    ],
  }
});

loadGamesAwardList();
/**
 * 添加奖品
 */
const addEvent = () => {
  gamesAwardTableRef.value.setFormData();
  gamesAwardTableRef.value.showDialog = true;
};
/**
 * 编辑奖品
 */
const handleEdit = (index:number,data: any) => {
  data.index = index
  gamesAwardTableRef.value.setFormData(data)
  gamesAwardTableRef.value.showDialog = true
}
//单行删除
const handleDelete = (index: number) => {
  gamesAwardTable.data.splice(index, 1)
}
const verify = (callback: any) => {
  const formRef = [
    {
      key: 'basic',
      verify: false,
      ref: basicFormRef.value
    },
    {
      key: 'basic',
      verify: false,
      ref: winningSettingRef.value
    },
    {
      key: 'basic',
      verify: false,
      ref: prizeSettingsRef.value
    }
  ]
  formRef.forEach((el: any, index) => {
    el.ref.validate((valid: any) => {
      el.verify = valid
    })
  })
  setTimeout(() => {
    let verify = true
    // 检测验证，并且定位tab页面
    for (let i = 0; i < formRef.length; i++) {
      if (formRef[i].verify == false) {
        activeName.value = formRef[i].key
        verify = false
        break
      }
    }
    if (verify && callback) callback()
  }, 10)
}
// 保存数据
const save = () => {
  verify(() => {
    // if (loading.value ) return
    loading.value = true
    const save = formData.game_id ? updateGamesApi : createGamesApi
    const data = cloneDeep(formData)
    console.log(data)
    if(data.games_award.length <= 0){
      ElMessage({ message: '奖品奖项不能少于1项', type: 'warning' })
      return false
    }
    save(data).then(res => {
      loading.value = false
      router.push('/turntable/index')
    }).catch(() => {
      loading.value = false
    })
  })
}
</script>
