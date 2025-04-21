<template>
  <div class="main-container">
    <el-card class="box-card !border-none" shadow="never">
      <el-page-header
        :content="
          formData.game_id ? t('updateTurntableGame') : t('addTurntableGame')
        "
        :icon="ArrowLeft"
        @back="$router.back()"
      />
    </el-card>
    <el-card class="box-card mt-[15px] !border-none" shadow="never">
      <el-tabs v-model="activeName" @tab-click="tabHandleClick">
        <el-tab-pane
          :label="t('basicInfoTab')"
          name="basic"
          class="flex is-justify-space-evenly"
        >
          <div class="form w-[900px]">
            <el-form
              :model="formData"
              label-width="120px"
              class="page-form"
              ref="basicFormRef"
              :rules="formRules"
              :loading="loading"
            >
              <el-form-item :label="t('gameName')" prop="game_name" >
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
                <el-col :span="6">
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
                <el-col :span="1" class="text-center">
                  <span class="text-gray-500">-</span>
                </el-col>
                <el-col :span="6">
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
                  :rows="4"
                  clearable
                  :placeholder="t('remarkPlaceholder')"
                  class="input-width"
                  maxlength="100"
                />
              </el-form-item>
              <el-form-item :label="t('isBanner')">
                <el-radio-group v-model="formData.banner_show">
                  <el-radio :label="0">{{ t("bannerNotShow") }}</el-radio>
                  <el-radio :label="1">{{ t("bannerShow") }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <div
                v-for="(item, index) in formData.games_banner"
                :key="index"
                class="border border-dashed border-gray-300 ml-[60px] p-[10px] pb-0 mb-[16px] w-[500px] relative"
                v-if="formData.banner_show"
              >
                <el-form-item :label="t('imageUpload')" class="ml-[-20px]">
                  <upload-image v-model="item.banner_image" />
                  <div class="form-tip mb-1">{{ t("bannerImageTip") }}</div>
                </el-form-item>
<!--                <el-form-item :label="t('bannerUrl')" class="ml-[-20px] mt-2">-->
<!--                  <el-input-->
<!--                    v-model.trim="item.banner_url"-->
<!--                    clearable-->
<!--                    :placeholder="t('urlAddressPlaceholder')"-->
<!--                    class="input-width"-->
<!--                  />-->
<!--                  <div class="form-tip">-->
<!--                    <div class="aux-item mt-[12px]">-->
<!--                      {{ t("bannerUrlTip1") }}-->
<!--                    </div>-->
<!--                    <div class="aux-item mt-[12px]">-->
<!--                      {{ t("bannerUrlTip2") }}-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </el-form-item>-->
                <div
                  class="del absolute cursor-pointer z-[2] top-[-8px] right-[-8px]"
                  @click="removeItem(item)"
                >
                  <el-icon size="18" color="#909399"
                    ><CircleCloseFilled
                  /></el-icon>
                </div>
              </div>
<!--              <el-form-item v-if="formData.banner_show" class="ml-[-20px]">-->
<!--                <el-button @click="addDomain" plain>{{-->
<!--                  t("addImage")-->
<!--                }}</el-button>-->
<!--              </el-form-item>-->
              <el-form-item :label="t('BgLocation')" prop="template_name" class="w-[550px]">
                <el-radio-group v-model="formData.template_name">
                  <el-radio
                    border
                    :value="item.key"
                    class="mt-2 w-[100px]"
                    v-for="(item, index) in templateData"
                    :key="item.key"
                  >{{ item.value }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>
              <el-form-item :label="t('gameRequire')" prop="level_id">
                <el-radio-group v-model="formData.level_id">
                  <el-radio :label="0">{{ t("allMember") }}</el-radio>
                  <el-radio :label="1">{{ t("portionMember") }}</el-radio>
                </el-radio-group>
                <div class="form-tip">{{ t("levelIdTips") }}</div>
              </el-form-item>
              <el-form-item :label="t('points')" prop="points">
                <el-input-number
                  v-model="formData.points"
                  controls-position="right"
                  :min="1"
                />
              </el-form-item>
              <el-form-item :label="t('gameNumber')" required>
                <el-radio-group v-model="formData.join_type">
                  <el-radio :label="0">{{ t("everyday") }}</el-radio>
                  <el-radio :label="1">{{ t("onePerson") }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="join_frequency">
                <el-input-number
                  v-model="formData.join_frequency"
                  controls-position="right"
                  :min="1"
                />
              </el-form-item>
            </el-form>
          </div>
          <div class="preview p-[20px]">
<!--            <div class="example">-->
<!--               <img src="@/addon/turntable/assets/sunset_red.png"/>-->
<!--            </div>-->
          </div>
        </el-tab-pane>
        <el-tab-pane :label="t('winningSetting')" name="winningSetting">
          <el-form
            :model="formData"
            label-width="120px"
            :rules="formRules"
            ref="winningSettingRef"
            class="page-form"
            :loading="loading"
          >
            <el-form-item :label="t('winningRateLabel')" prop="winning_rate">
              <el-input-number
                v-model="formData.winning_rate"
                controls-position="right"
                :step="0.1"
                :precision="2"
                :max="100"
                :min="1"
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
                <el-radio :label="0">{{ t("winnerShow") }}</el-radio>
                <el-radio :label="1">{{ t("notWinnerShow") }}</el-radio>
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
                        @click="handleEdit(scope.$index, scope.row)"
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
                    @size-change="gamesInit()"
                    @current-change="gamesInit"
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
              <div class="form-tip pt-[60px]">
                <el-text type="danger" class="aux-title mx-4"
                  >奖品权重设置说明：</el-text
                >
                <div class="aux-item mt-[12px]">
                  <el-text type="danger"
                    >1、权重大，中奖易：权重值越大，对应奖项被抽中的概率就越高。</el-text
                  >
                </div>
                <div class="aux-item mt-[12px]">
                  <el-text type="danger"
                    >2、权重小，中奖难：相反，权重值越小，对应奖项被抽中的概率就越低。</el-text
                  >
                </div>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <prize-edit
      ref="gamesAwardTableRef"
      @complete="loadGamesAwardInfo"
      :gamesAwardTable="gamesAwardTable"
    />
    <div class="fixed-footer-wrap">
      <div class="fixed-footer">
        <el-button type="primary" @click="save()">{{ t("save") }}</el-button>
        <el-button @click="router.back()">{{ t("back") }}</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, computed } from "vue";
import { t } from "@/lang";
import { useRouter, useRoute } from "vue-router";
import { FormInstance, ElMessage, ElCollapseTransition } from "element-plus";
import PrizeEdit from "@/addon/turntable/views/turntable/components/prize-edit.vue";
import {
  createGamesApi,
  getGamesInit,
  updateGamesApi,
} from "@/addon/turntable/api/turntable";
import { cloneDeep } from "lodash";
import {da} from "element-plus/es/locale";
const show = ref(true);
const route = useRoute();
const router = useRouter();
const pageName = route.meta.title;
const loading = ref(true);
const basicFormRef = ref<FormInstance>();
const winningSettingRef = ref<FormInstance>();
const prizeSettingsRef = ref<FormInstance>();
// 表单数据
const initialFormData = {
  game_id: "",
  game_name: "",
  start_time: "",
  end_time: "",
  is_shop:0,
  level_id: 0,
  banner_show: 0,
  points: 1,
  join_type: 0,
  join_frequency: 1,
  winning_rate: "1",
  no_winning_desc: "很遗憾，未中奖",
  no_winning_img: "addon/turntable/no_winning.png",
  is_show_winner: 0,
  games_award: [],
  games_banner: [
    {
      banner_image: "addon/turntable/turntable_head.png"
    },
  ],
  template_name: 'passionate_energy',
};
const templateData = ref([
  { key: 'passionate_energy', value: '热情活力' },
  { key: 'noble_purple', value: '高贵紫' },
  { key: 'ocean_blue', value: '海洋蓝' },
  { key: 'sunset_red', value: '夕阳红' }
])
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
  const now = new Date(); // 获取当前日期和时间
  now.setHours(a); // 设置小时为8（24小时制）
  now.setMinutes(0);
  now.setSeconds(0);
  return now;
};
// 表单验证规则
const formRules = computed(() => {
  return {
    game_name: [
      { required: true, message: t("gameNamePlaceholder"), trigger: "blur" },
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
      { required: true, message: t("pointsPlaceholder"), trigger: "blur" },
    ],
    join_frequency: [
      { required: true, message: t("gameNumberPlaceholder"), trigger: "blur" },
    ],
    winning_rate: [
      { required: true, message: t("winningRatePlaceholder"), trigger: "blur" },
    ],
    template_name: [
      {
        required: true,
        message: t("templateIdPlaceholder"),
        trigger: "change",
      },
    ],
    // banner_url:[
    //   {
    //     trigger: 'blur',
    //     required: true,
    //     // validator: (rule: any, value: any, callback: any) => {
    //     //   if (formData.banner_show == 1) {
    //     //     formData.banner.forEach((item, index) => {
    //     //       console.log(index)
    //     //        if(item.banner_url == ''){
    //     //          callback(new Error(t('bannerUrlPlaceholder')))
    //     //        }else{
    //     //          callback()
    //     //        }
    //     //     });
    //     //   }else {
    //     //     callback()
    //     //   }
    //     // }
    //   }
    // ],
  };
});
// 加载组件数据
const loadGamesAwardInfo = (data: any) => {
  if (data) {
    const newData = cloneDeep(data);
    const existingIndexInGamesAwardTable = gamesAwardTable.data.findIndex(
      (item) => item.award_name === newData.award_name
    );
    if (data.index >= 0) {
      gamesAwardTable.data.splice(data.index, 1, newData);
      formData.games_award = gamesAwardTable.data;
    } else {
      if (existingIndexInGamesAwardTable === -1) {
        // 如果不存在相同 award_id 的数据，则追加新数据到头部
        gamesAwardTable.data.unshift(newData);
        gamesAwardTable.total++;

        // 更新 formData.games_award
        formData.games_award = [...gamesAwardTable.data]; // 创建一个新数组确保数据独立性
      }
    }
  }
  gamesAwardTable.loading = false;
};
const gamesInit = (page: number = 1) => {
  gamesAwardTable.page = page;
  getGamesInit({
    page: gamesAwardTable.page,
    limit: gamesAwardTable.limit,
    game_id: formData.game_id,
  }).then((res) => {
    const gamesInfo = res.data.gamesInfo;
    if (gamesInfo) {
      Object.assign(formData, gamesInfo);
      formData.games_award = res.data.gamesDraw.data;
      formData.games_banner = res.data.gamesBanner;
      gamesAwardTable.data = res.data.gamesDraw.data;
      gamesAwardTable.total = res.data.gamesDraw.total ?? 0;
    }
  });
};
if (formData.game_id) gamesInit();
loadGamesAwardInfo();
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
const handleEdit = (index: number, data: any) => {
  data.index = index;
  gamesAwardTableRef.value.setFormData(data);
  gamesAwardTableRef.value.showDialog = true;
};
// 单行删除
const handleDelete = (index: number) => {
  gamesAwardTable.data.splice(index, 1);
  formData.games_award = gamesAwardTable.data;
  gamesAwardTable.total = --gamesAwardTable.total;
};
const verify = (callback: any) => {
  const formRef = [
    {
      key: "basic",
      verify: false,
      ref: basicFormRef.value,
    },
    {
      key: "basic",
      verify: false,
      ref: winningSettingRef.value,
    },
    {
      key: "basic",
      verify: false,
      ref: prizeSettingsRef.value,
    },
  ];
  formRef.forEach((el: any, index) => {
    el.ref.validate((valid: any) => {
      el.verify = valid;
    });
  });
  setTimeout(() => {
    let verify = true;
    // 检测验证，并且定位tab页面
    for (let i = 0; i < formRef.length; i++) {
      if (formRef[i].verify == false) {
        activeName.value = formRef[i].key;
        verify = false;
        break;
      }
    }
    if (verify && callback) callback();
  }, 10);
};
// 字符类型转换
const convertWinningRateToString = (formData: any) => {
  for (const key in formData) {
    if (formData.hasOwnProperty(key)) {
      const value = formData[key];
      if (key === "winning_rate") {
        formData[key] = String(value);
      }
    }
  }
  return formData;
};
const addDomain = () => {
  formData.games_banner.push({
    banner_image: "",
  });
};
const removeItem = (item) => {
  const index = formData.games_banner.indexOf(item);
  console.log(index);
  if (index !== 0) {
    formData.games_banner.splice(item, 1);
  }
};
// 保存数据
const save = () => {
  verify(() => {
    loading.value = true;
    const save = formData.game_id ? updateGamesApi : createGamesApi;
    const data = cloneDeep(convertWinningRateToString(formData));
    if (data.games_award.length <= 0) {
      ElMessage({ message: "奖品奖项不能少于1项", type: "warning" });
      return false;
    }
    console.log(data);
    save(data)
      .then((res) => {
        loading.value = false;
        router.push("/turntable/index");
      })
      .catch(() => {
        loading.value = false;
      });
  });
};
</script>
<style lang="scss" scoped>
.el-segmented {
  --el-segmented-bg-color: #fff;
}
.preview {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 600px;
  .example {
    width: 310px;
    height: 630px;
    background-image: url("@/addon/turntable/assets/iPhone13.png");
    background-size: 310px 590px;
    background-position: center;
    background-repeat: no-repeat;
  }
}
.preview img {
  padding-top: 50px;
  width: 287px;
  height: 590px;
  margin: auto;
  border-radius: 2%;
}
</style>
