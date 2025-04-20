<template>
  <div class="main-container">
    <el-card class="box-card !border-none" shadow="never">
      <div class="flex justify-between items-center">
        <span class="text-lg">{{ pageName }}</span>
      </div>

      <el-card
        class="box-card !border-none my-[10px] table-search-wrap"
        shadow="never"
      >
        <el-form
          :inline="true"
          :model="logTable.searchParam"
          ref="searchFormRef"
        >
          <el-form-item :label="t('memberId')" prop="member_id">
            <el-select
              class="input-width"
              v-model="logTable.searchParam.member_id"
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

          <el-form-item :label="t('levelId')" prop="level_id">
            <el-select
              class="w-[280px]"
              v-model="logTable.searchParam.level_id"
              clearable
              :placeholder="t('levelIdPlaceholder')"
            >
              <el-option
                v-for="(item, index) in levelIdList"
                :key="index"
                :label="item['level_name']"
                :value="item['level_id']"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('body')" prop="body">
            <el-input
              v-model="logTable.searchParam.body"
              :placeholder="t('bodyPlaceholder')"
            />
          </el-form-item>
          <el-form-item :label="t('createTime')" prop="create_time">
            <el-date-picker
              v-model="logTable.searchParam.create_time"
              type="datetimerange"
              format="YYYY-MM-DD hh:mm:ss"
              :start-placeholder="t('startDate')"
              :end-placeholder="t('endDate')"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="loadLogList()">{{
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
          :data="logTable.data"
          size="large"
          v-loading="logTable.loading"
        >
          <template #empty>
            <span>{{ !logTable.loading ? t("emptyData") : "" }}</span>
          </template>
          <el-table-column
            prop="member_id_name"
            :label="t('memberId')"
            min-width="120"
            :show-overflow-tooltip="true"
          />

          <el-table-column
            prop="level_id_name"
            :label="t('levelId')"
            min-width="120"
            :show-overflow-tooltip="true"
          />

          <el-table-column
            prop="body"
            :label="t('body')"
            min-width="120"
            :show-overflow-tooltip="true"
          />

          <el-table-column
            prop="over_time"
            :label="t('overTime')"
            min-width="120"
            :show-overflow-tooltip="true"
          >
            <template #default="{ row }">
              <el-tag
                v-if="dateChange(row.over_time) < Date.now()&&dateChange(row.over_time)>0"
                type="danger"
                >已到期</el-tag
              >
              <el-tag
                v-if="dateChange(row.over_time)==0"
                type="successr"
                >永久</el-tag
              >
              <el-tag
                v-if="dateChange(row.over_time) > Date.now()"
                type="success"
                class="font-bold"
                effect="plain"
                >{{ row.over_time }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            :label="t('operation')"
            fixed="right"
            min-width="120"
          >
            <template #default="{ row }">
              <el-button type="primary" link @click="deleteEvent(row.id)">{{
                t("delete")
              }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="mt-[16px] flex justify-end">
          <el-pagination
            v-model:current-page="logTable.page"
            v-model:page-size="logTable.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="logTable.total"
            @size-change="loadLogList()"
            @current-change="loadLogList"
          />
        </div>
      </div>

      <edit ref="editLogDialog" @complete="loadLogList" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import { t } from "@/lang";
import { useDictionary } from "@/app/api/dict";
import {
  getLogList,
  deleteLog,
  getWithMemberList,
  getWithMemberLevelList,
} from "@/addon/tk_vip/api/log";
import { img } from "@/utils/common";
import { ElMessageBox, FormInstance } from "element-plus";
import Edit from "@/addon/tk_vip/views/log/components/log-edit.vue";
import { useRoute } from "vue-router";
import { timeChange, dateChange } from "@/addon/tk_vip/utils/common";
const route = useRoute();
const pageName = route.meta.title;

let logTable = reactive({
  page: 1,
  limit: 10,
  total: 0,
  loading: true,
  data: [],
  searchParam: {
    member_id: "",
    level_id: "",
    type: "",
    body: "",
    create_time: [],
  },
});

const searchFormRef = ref<FormInstance>();

// 选中数据
const selectData = ref<any[]>([]);

// 字典数据

/**
 * 获取会员日志列表
 */
const loadLogList = (page: number = 1) => {
  logTable.loading = true;
  logTable.page = page;

  getLogList({
    page: logTable.page,
    limit: logTable.limit,
    ...logTable.searchParam,
  })
    .then((res) => {
      logTable.loading = false;
      logTable.data = res.data.data;
      logTable.total = res.data.total;
    })
    .catch(() => {
      logTable.loading = false;
    });
};
loadLogList();

const editLogDialog: Record<string, any> | null = ref(null);

/**
 * 添加会员日志
 */
const addEvent = () => {
  editLogDialog.value.setFormData();
  editLogDialog.value.showDialog = true;
};

/**
 * 编辑会员日志
 * @param data
 */
const editEvent = (data: any) => {
  editLogDialog.value.setFormData(data);
  editLogDialog.value.showDialog = true;
};

/**
 * 删除会员日志
 */
const deleteEvent = (id: number) => {
  ElMessageBox.confirm(t("logDeleteTips"), t("warning"), {
    confirmButtonText: t("confirm"),
    cancelButtonText: t("cancel"),
    type: "warning",
  }).then(() => {
    deleteLog(id)
      .then(() => {
        loadLogList();
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
const levelIdList = ref([]);
const setLevelIdList = async () => {
  levelIdList.value = await (await getWithMemberLevelList({})).data;
};
setLevelIdList();

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  loadLogList();
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
