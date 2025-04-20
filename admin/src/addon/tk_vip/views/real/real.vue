<template>
  <div class="main-container">
    <el-card class="box-card !border-none" shadow="never">
      <div class="flex justify-between items-center">
        <span class="text-lg">{{ pageName }}</span>
        <el-button type="primary" @click="addEvent">
         新增实名
        </el-button>
      </div>

      <el-card
        class="box-card !border-none my-[10px] table-search-wrap"
        shadow="never"
      >
        <el-form
          :inline="true"
          :model="realTable.searchParam"
          ref="searchFormRef"
        >
          <el-form-item :label="t('memberId')" prop="member_id">
            <el-select
              class="input-width"
              v-model="realTable.searchParam.member_id"
              clearable
              :placeholder="t('memberIdPlaceholder')"
            >
              <div class="mt-2 mb-2 ml-4">
                <el-input
                  @change="change"
                  v-model="keyword"
                  style="width: 200px"
                  placeholder="搜索会员支持昵称/会员名"
                >
                  <template #append>搜索 </template></el-input
                >
              </div>
              <el-option label="请选择" value=""></el-option>
              <el-option
                v-for="(item, index) in memberIdList"
                :key="index"
                :label="item['nickname']"
                :value="item['member_id']"
              />
            </el-select>
          </el-form-item>

          <!-- <el-form-item :label="t('mobile')" prop="mobile">
            <el-input
              v-model="realTable.searchParam.mobile"
              :placeholder="t('mobilePlaceholder')"
            />
          </el-form-item>
          <el-form-item :label="t('cardNum')" prop="card_num">
            <el-input
              v-model="realTable.searchParam.card_num"
              :placeholder="t('cardNumPlaceholder')"
            />
          </el-form-item> -->
          <el-form-item :label="t('status')" prop="status">
            <el-select
              class="input-width"
              v-model="realTable.searchParam.status"
              clearable
              placeholder="请选择"
            >
              <el-option label="请选择" value=""></el-option>
              <el-option
                v-for="(item, index) in realstatus"
                :key="index"
                :label="item['name']"
                :value="item['status']"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('createTime')" prop="create_time">
            <el-date-picker
              v-model="realTable.searchParam.create_time"
              type="datetimerange"
              format="YYYY-MM-DD hh:mm:ss"
              :start-placeholder="t('startDate')"
              :end-placeholder="t('endDate')"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="loadRealList()">{{
              t("search")
            }}</el-button>
            <el-button @click="resetForm(searchFormRef)">{{
              t("reset")
            }}</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <div class="mt-[10px]">
        <el-table
          :data="realTable.data"
          size="large"
          v-loading="realTable.loading"
        >
          <template #empty>
            <span>{{ !realTable.loading ? t("emptyData") : "" }}</span>
          </template>
          <el-table-column
            prop="member_id_name"
            :label="t('memberId')"
            min-width="120"
            :show-overflow-tooltip="true"
          />

          <el-table-column
            prop="real_name"
            :label="t('realName')"
            min-width="120"
            :show-overflow-tooltip="true"
          />

          <el-table-column
            prop="mobile"
            :label="t('mobile')"
            min-width="120"
            :show-overflow-tooltip="true"
          />

          <el-table-column
            prop="card_num"
            :label="t('cardNum')"
            min-width="120"
            :show-overflow-tooltip="true"
          />

          <!-- <el-table-column
            prop="sex_name"
            :label="t('sex')"
            min-width="120"
            :show-overflow-tooltip="true"
          />

          <el-table-column
            prop="birthday"
            :label="t('birthday')"
            min-width="120"
            :show-overflow-tooltip="true"
          /> -->

          <!-- <el-table-column
            prop="field"
            :label="t('field')"
            min-width="120"
            :show-overflow-tooltip="true"
          /> -->

          <el-table-column
            prop="status"
            :label="t('status')"
            min-width="120"
            :show-overflow-tooltip="true"
          >
            <template #default="{ row }">
              <el-tag type="success" v-if="row.status == 1">{{
                row.status_name
              }}</el-tag>
              <el-tag type="danger" v-else>{{ row.status_name }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            :label="t('operation')"
            fixed="right"
            min-width="120"
          >
            <template #default="{ row }">
              <el-button type="primary" link @click="editEvent(row)">{{
                t("edit")
              }}</el-button>
              <el-button type="primary" link @click="deleteEvent(row.id)">{{
                t("delete")
              }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="mt-[16px] flex justify-end">
          <el-pagination
            v-model:current-page="realTable.page"
            v-model:page-size="realTable.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="realTable.total"
            @size-change="loadRealList()"
            @current-change="loadRealList"
          />
        </div>
      </div>

      <edit ref="editRealDialog" @complete="loadRealList" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import { t } from "@/lang";
import { useDictionary } from "@/app/api/dict";
import {
  getRealList,
  deleteReal,
  getWithMemberList,
  getRealStatus,
} from "@/addon/tk_vip/api/real";
import { img } from "@/utils/common";
import { ElMessageBox, FormInstance } from "element-plus";
import Edit from "@/addon/tk_vip/views/real/components/real-edit.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const pageName = route.meta.title;
const realstatus = ref();
getRealStatus().then((res) => {
  realstatus.value = res.data;
});
let realTable = reactive({
  page: 1,
  limit: 10,
  total: 0,
  loading: true,
  data: [],
  searchParam: {
    member_id: "",
    real_name: "",
    mobile: "",
    card_num: "",
    status: "",
    create_time: [],
  },
});

const searchFormRef = ref<FormInstance>();

// 选中数据
const selectData = ref<any[]>([]);

// 字典数据

/**
 * 获取实名认证列表
 */
const loadRealList = (page: number = 1) => {
  realTable.loading = true;
  realTable.page = page;

  getRealList({
    page: realTable.page,
    limit: realTable.limit,
    ...realTable.searchParam,
  })
    .then((res) => {
      realTable.loading = false;
      realTable.data = res.data.data;
      realTable.total = res.data.total;
    })
    .catch(() => {
      realTable.loading = false;
    });
};
loadRealList();

const editRealDialog: Record<string, any> | null = ref(null);

/**
 * 添加实名认证
 */
const addEvent = () => {
  editRealDialog.value.setFormData();
  editRealDialog.value.showDialog = true;
};

/**
 * 编辑实名认证
 * @param data
 */
const editEvent = (data: any) => {
  editRealDialog.value.setFormData(data);
  editRealDialog.value.showDialog = true;
};

/**
 * 删除实名认证
 */
const deleteEvent = (id: number) => {
  ElMessageBox.confirm(t("realDeleteTips"), t("warning"), {
    confirmButtonText: t("confirm"),
    cancelButtonText: t("cancel"),
    type: "warning",
  }).then(() => {
    deleteReal(id)
      .then(() => {
        loadRealList();
      })
      .catch(() => {});
  });
};

const change = () => {
  setMemberIdList();
};
const keyword = ref();
const memberIdList = ref([]);
const setMemberIdList = async () => {
  memberIdList.value = await (
    await getWithMemberList({ keyword: keyword.value })
  ).data.data;
};
setMemberIdList();
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  loadRealList();
};
</script>

<style lang="scss" scoped>
/* 多行超出隐藏 */
.multi-hidden {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
