<template>
    <div class="main-container page-sections min-h-[70vh]" v-loading="loading">
        <!-- 顶部概览 -->
        <div>
            <div class="flex justify-between items-start flex-wrap">
                <div class="flex items-start">
                    <div>
                        <div class="flex items-center flex-wrap">
                            <span class="text-[20px] font-bold mr-2">数据库修复</span>
                            <el-tag type="success" effect="light" round v-if="info.status == 'normal'">结构正常</el-tag>
                            <el-tag type="danger" effect="light" round v-else>结构异常</el-tag>
                        </div>
                        <div class="text-[14px] text-[#909399] mt-1">
                            <span class="mx-1">仅补齐缺失结构，不删除现有数据</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center">
                    <el-button :loading="loading" @click="checkFn">重新检测</el-button>
                    <el-button type="primary" :loading="repairLoading" :disabled="(info.diff_count || 0) == 0 && (info.charset?.count || 0) == 0" @click="repairFn">一键修复</el-button>
                </div>
            </div>

            <!-- 统计 -->
            <div class="flex flex-wrap grid-cols-5 gap-[16px] mt-6">
                <div class="form-section !border-[var(--sys-color-border-default)] flex-1">
                    <div class="text-[13px] text-[#909399] mb-2">定义来源</div>
                    <div class="text-[22px] font-bold">{{ info.source_count || 0 }}</div>
                </div>
                <div class="form-section !border-[var(--sys-color-border-default)] flex-1">
                    <div class="text-[13px] text-[#909399] mb-2">定义数据表</div>
                    <div class="text-[22px] font-bold">{{ info.table_count || 0 }}</div>
                </div>
                <div class="form-section !border-[var(--sys-color-border-default)] flex-1">
                    <div class="text-[13px] text-[#909399] mb-2">缺失结构</div>
                    <div class="text-[22px] font-bold" :class="{ '!text-[#f56c6c]': info.missing_count > 0 }">{{ info.missing_count || 0 }}</div>
                </div>
                <div class="form-section !border-[var(--sys-color-border-default)] flex-1">
                    <div class="text-[13px] text-[#909399] mb-2">检测状态</div>
                    <div class="text-[22px] font-bold" :class="info.status == 'normal' ? '!text-[#67c23a]' : '!text-[#f56c6c]'">{{ info.status_name || '-' }}</div>
                </div>
                <div class="form-section !border-[var(--sys-color-border-default)] flex-1">
                    <div class="text-[13px] text-[#909399] mb-2">字符编码异常</div>
                    <div class="text-[22px] font-bold" :class="{ '!text-[#f56c6c]': (info.charset?.count || 0) > 0 }">{{ info.charset?.count || 0 }}</div>
                </div>
            </div>

            <!-- 修复提示：原 el-alert 已禁用关闭，故不保留关闭按钮 -->
            <tip-notice class="!mt-6">
                修复前请完成数据库备份，确认备份可用后再执行操作
            </tip-notice>
        </div>

        <!-- 结构差异 -->
        <div>
            <div class="flex justify-between items-center flex-wrap mb-4">
                <div>
                    <span class="text-[16px] font-bold mr-2">结构差异</span>
                    <el-tag effect="light" round size="small" :type="info.diff_count > 0 ? 'danger' : 'info'">{{ info.diff_count || 0 }} 项差异</el-tag>
                    <div class="text-[13px] text-[#909399] mt-2">系统与 {{ info.addon_count || 0 }} 个已安装插件参与本次检测</div>
                </div>
                <div class="flex items-center">
                    <el-select v-model="filterSource" placeholder="全部来源" clearable class="!w-[150px]">
                        <el-option v-for="(title, key) in info.sources" :key="key" :label="title" :value="key" />
                    </el-select>
                    <el-select v-model="filterType" placeholder="全部类型" clearable class="!w-[150px] ml-3">
                        <el-option label="缺失数据表" value="table" />
                        <el-option label="缺失字段" value="column" />
                    </el-select>
                </div>
            </div>

            <!-- 有差异：差异表格 -->
            <div class="table-panel"  v-if="filterDiffs.length">
                <el-table :data="filterDiffs" size="large">
                    <el-table-column type="expand">
                        <template #default="{ row }">
                            <div class="px-6">
                                <div class="text-[13px] text-[#909399] mb-2">修复语句</div>
                                <pre class="bg-[#f7f8fa] rounded p-3 text-[12px] whitespace-pre-wrap break-all m-0">{{ row.sql }}</pre>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="数据表" prop="table" min-width="180" show-overflow-tooltip />
                    <el-table-column label="差异类型" width="120">
                        <template #default="{ row }">
                            <el-tag :type="row.type == 'table' ? 'danger' : 'warning'" effect="light" size="small">{{ row.type_name }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="来源" prop="source_title" min-width="140" show-overflow-tooltip />
                    <el-table-column label="缺失内容" min-width="200">
                        <template #default="{ row }">
                            <span v-if="row.type == 'table'" class="text-[#f56c6c]">整表缺失</span>
                            <template v-else>
                                <el-tag v-for="column in row.missing" :key="column" class="mr-1 mb-1" type="warning" effect="plain" size="small">{{ column }}</el-tag>
                            </template>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!-- 无差异：结构完整 -->
            <div v-else class="bg-[#f0f9eb] rounded-md px-6 py-5 flex justify-between items-center flex-wrap">
                <div class="flex items-center">
                    <el-icon class="text-[30px] text-[#67c23a] mr-4"><CircleCheckFilled /></el-icon>
                    <div>
                        <div class="text-[15px] font-bold text-[#333]">数据库结构完整</div>
                        <div class="text-[13px] text-[#909399] mt-1">已完成 {{ info.table_count || 0 }} 张表的结构检测</div>
                    </div>
                </div>
                <div class="text-[13px] text-[#909399]">{{ info.check_time || '' }}</div>
            </div>
        </div>

        <!-- 字符编码与排序规则 -->
        <div>
            <div class="flex justify-between items-center flex-wrap mb-4">
                <div>
                    <span class="text-[16px] font-bold mr-2">字符编码与排序规则检测</span>
                    <el-tag effect="light" round size="small" :type="(info.charset?.count || 0) > 0 ? 'danger' : 'info'">{{ info.charset?.count || 0 }} 项异常</el-tag>
                    <div class="text-[13px] text-[#909399] mt-2">标准字符集：{{ info.charset?.standard_charset || '-' }}（检测数据表与字段字符编码是否一致、排序规则是否正确且受服务器支持）</div>
                </div>
            </div>

            <div class="table-panel"  v-if="info.charset && info.charset.items.length">
                <el-table :data="info.charset.items" size="large">
                    <el-table-column type="expand">
                        <template #default="{ row }">
                            <div class="px-6">
                                <div class="text-[13px] text-[#909399] mb-2">异常明细（{{ row.issues.length }} 项）</div>
                                <div v-for="(item, i) in row.issues" :key="i" class="flex items-start mb-2">
                                    <el-tag size="small" effect="plain" class="mr-2 shrink-0" :type="item.level == 'table' ? 'danger' : 'warning'">{{ item.level == 'table' ? '表级' : '字段级' }}</el-tag>
                                    <span v-if="item.field" class="text-[12px] text-[#909399] mr-2 shrink-0">字段：{{ item.field }}</span>
                                    <span class="text-[13px]">{{ item.message }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="数据表" prop="table_full" min-width="200" show-overflow-tooltip />
                    <el-table-column label="表字符编码" prop="table_charset" width="140" />
                    <el-table-column label="表排序规则" prop="table_collation" min-width="180" show-overflow-tooltip />
                    <el-table-column label="异常数" width="100">
                        <template #default="{ row }">{{ row.issues.length }}</template>
                    </el-table-column>
                </el-table>
            </div>

            <div v-else class="bg-[#f0f9eb] rounded-md px-6 py-5 flex items-center">
                <el-icon class="text-[30px] text-[#67c23a] mr-4"><CircleCheckFilled /></el-icon>
                <div>
                    <div class="text-[15px] font-bold text-[#333]">字符编码与排序规则正常</div>
                    <div class="text-[13px] text-[#909399] mt-1">所有数据表与字段字符编码一致，排序规则正确且均受服务器支持</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { CircleCheckFilled } from '@element-plus/icons-vue'
import { getDatabaseRepairCheck, repairDatabase } from '@/app/api/tools'
import TipNotice from '@/components/tip-notice/index.vue'

const loading = ref(true)
const repairLoading = ref(false)
const info: any = ref({})
const filterSource = ref('')
const filterType = ref('')

// 检测
const checkFn = () => {
    loading.value = true
    getDatabaseRepairCheck().then(res => {
        info.value = res.data
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}

// 差异过滤
const filterDiffs = computed(() => {
    const diffs = info.value.diffs || []
    return diffs.filter((item: any) => {
        if (filterSource.value && item.source != filterSource.value) return false
        if (filterType.value && item.type != filterType.value) return false
        return true
    })
})

// 一键修复
const repairFn = () => {
    const total = (info.value.diff_count || 0) + (info.value.charset?.count || 0);
    ElMessageBox.confirm(
        `检测到 ${ total } 项差异（结构缺失 ${ info.value.diff_count || 0 } 项、字符编码/排序规则 ${ info.value.charset?.count || 0 } 项）。结构修复仅补齐缺失的数据表与字段、不删除数据；字符编码修复将通过 ALTER TABLE CONVERT TO 统一字符集与排序规则。修复前请确认已完成数据库备份，是否继续？`,
        '一键修复',
        { confirmButtonText: '确认修复', cancelButtonText: '取消', type: 'warning' }
    ).then(() => {
        repairLoading.value = true
        repairDatabase().then(res => {
            repairLoading.value = false
            const data = res.data
            if (data.fail_count > 0) {
                ElMessage.error(`修复完成：成功 ${ data.success_count } 项，失败 ${ data.fail_count } 项`)
            }
            info.value = data.check
        }).catch(() => {
            repairLoading.value = false
        })
    }).catch(() => {})
}

checkFn()
</script>
