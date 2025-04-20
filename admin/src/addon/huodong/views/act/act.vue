<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addAct') }}
                </el-button>
            </div>
<div>
				 <!-- <el-tag type="success">前端入口路径: /addon/huodong/pages/index/index</el-tag> -->
			</div>
            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="actTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('name')" prop="name">
                        <el-input v-model="actTable.searchParam.name" :placeholder="t('namePlaceholder')" />
                    </el-form-item>
                    
                    <el-form-item :label="t('cateId')" prop="cate_id">
                        <el-select class="w-[280px]" v-model="actTable.searchParam.cate_id" clearable :placeholder="t('cateIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in cateIdList"
                                       :key="index"
                                       :label="item['name']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    <!-- <el-form-item :label="t('startime')" prop="startime">
                        <el-date-picker v-model="actTable.searchParam.startime" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item :label="t('endtime')" prop="endtime">
                        <el-date-picker v-model="actTable.searchParam.endtime" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    -->
                    
                    <el-form-item :label="t('status')" prop="status">
                        <el-select class="w-[280px]" v-model="actTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option :label=" t('show') "  value="1"/>
                            <el-option :label=" t('hidden') "  value="0"/>
                        </el-select>
                    </el-form-item>
					
                    
                    <el-form-item :label="t('adddate')" prop="adddate">
                        <el-date-picker v-model="actTable.searchParam.adddate" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadActList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="actTable.data" size="large" v-loading="actTable.loading">
                    <template #empty>
                        <span>{{ !actTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" :label="t('ID')" min-width="60" :show-overflow-tooltip="true"/>
					
					 <el-table-column :label="t('name')" min-width="190" align="center">
					     <template #default="{ row }">
					         <span >{{row.name}}</span>
					         <span v-if="row.zhouqi_from">不限制<el-tag type="primary" effect="light">周期性来源{{row.zhouqi_from}}</el-tag></span>
					     </template>
					 </el-table-column>
					 
                    <el-table-column :label="t('cateId')" min-width="90" align="center">
                        <template #default="{ row }">
                            <span ><el-tag type="primary">{{row.cate_id_name}}</el-tag></span>
                        </template>
                    </el-table-column>
                    
                     <el-table-column :label="t('image')" width="100" align="left">
                        <template #default="{ row }">
                            <el-image v-if="row.image" :src="img(row.image)" />
                           <span v-else></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="startime" :label="t('startime')" min-width="120" />
                    <el-table-column :label="t('需要付费')" min-width="90" align="center">
                        <template #default="{ row }">
                          <span>
                          	<span v-if="row.is_pay==1"><text style="color: red;">￥{{row.price}}</text></span>
                          	<span v-else>免费</span>
                          </span>				
                        </template>
                    </el-table-column>
					<el-table-column :label="t('需要核销')" min-width="90" align="center">
					    <template #default="{ row }">
					      <span>
					      	<span v-if="row.is_hexiao==1">是</span>
					      	<span v-else>否</span>
					      </span>				
					    </template>
					</el-table-column>
					<el-table-column :label="t('会员免费')" min-width="90" align="center">
					    <template #default="{ row }">
					      <span>
					      	<span v-if="row.vip_mianfei==1">是</span>
					      	<span v-else>否</span>
					      </span>				
					    </template>
					</el-table-column>
                    <el-table-column prop="endtime" :label="t('endtime')" min-width="120" />
                     <el-table-column :label="t('人数')" min-width="100" align="center">
                         <template #default="{ row }">
                           
							<span>
								<span style="color: #273de3;padding-right:5px">{{row.sales||0}}</span>/
								<span v-if="row.num>0">{{row.num}}人</span>
								<span v-else>不限</span>
							</span>
                         </template>
                     </el-table-column>
                   
                   <el-table-column :label="t('status')" min-width="100" align="center">
                       <template #default="{ row }">
                           <span v-if="row.status == 1" >  <el-tag type="success">{{ t('show') }}</el-tag></span>
                           <span v-if="row.status == 0"><el-tag type="danger">{{ t('hidden') }}</el-tag></span>
                           <span v-if="row.status == -2"><el-tag type="info">{{ t('exp') }}</el-tag></span>
                       </template>
                   </el-table-column>
                    
                    <el-table-column prop="sort" :label="t('sort')" min-width="80" />
                    
                    <el-table-column prop="adddate" :label="t('adddate')" min-width="140"/>
                    
                    <el-table-column :label="t('operation')" fixed="right" min-width="210">
                       <template #default="{ row }">
						  <el-button type="primary" v-if="row.is_tian==1" link @click="biaodanEvent(row)">{{ t('表单设置') }}</el-button>
						   <el-button type="primary" v-if="row.is_tian==1" link @click="dengjiEvent(row)">{{ t('信息登记统计') }}</el-button>
						    <br/>
                           <el-button type="primary" link @click="orderEvent(row)" >{{ t('报名记录') }}</el-button>
                           <el-button type="primary" link @click="copyEvent(row)" >{{ t('复制活动') }}</el-button>
						   <br/>
                           <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                           <el-button type="danger" link @click="deleteEvent(row.id)" >{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="actTable.page" v-model:page-size="actTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="actTable.total"
                        @size-change="loadActList()" @current-change="loadActList" />
                </div>
            </div>

            <edit ref="editActDialog" @complete="loadActList" />
        </el-card>
		
		<records-detail ref="recordsDetailDialog"/>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { getActList, deleteAct, getWithCateList } from '@/addon/huodong/api/act'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/huodong/views/act/components/act-edit.vue'

import recordsDetail from '@/app/views/diy_form/records.vue'
//详情
const recordsDetailDialog: Record<string, any> | null = ref(null)
const dengjiEvent=(row: any)=>{
    let data = {form_id: row.form_id};
    recordsDetailDialog.value.setFormData(data);
    recordsDetailDialog.value.showDialog = true;
}
// 编辑自定义表单
const biaodanEvent = (data: any) => {
    const url = router.resolve({
        path: '/decorate/form/edit',
        query: { form_id: data.form_id }
    })
    window.open(url.href)
}

import { useRoute,useRouter } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let actTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "name":"",
      "cate_id":"",
      "startime":[],
      "endtime":[],
      "status":"",
      "adddate":[]
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])


/**
 * 获取活动列列表
 */
const loadActList = (page: number = 1) => {
    actTable.loading = true
    actTable.page = page

    getActList({
        page: actTable.page,
        limit: actTable.limit,
         ...actTable.searchParam
    }).then(res => {
        actTable.loading = false
        actTable.data = res.data.data
        actTable.total = res.data.total
    }).catch(() => {
        actTable.loading = false
    })
}
loadActList()

 const editActDialog: Record<string, any> | null = ref(null)
 
 
const router = useRouter()
	const orderEvent = (row) => {
		router.push('/huodong/order?act_id=' + row.id)
	};
	
	
/**
 * 添加活动列
 */
const addEvent = () => {
    editActDialog.value.setFormData()
    editActDialog.value.showDialog = true
}

/**
 * 编辑活动列
 * @param data
 */
const editEvent = (data: any) => {
    editActDialog.value.setFormData(data)
    editActDialog.value.showDialog = true
}
const copyEvent = (data: any) => {
	data.optype = 'copy';
	// data.name = data.name+'-复制';
    editActDialog.value.setFormData(data)
    editActDialog.value.showDialog = true
}
/**
 * 删除活动列
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('actDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteAct(id).then(() => {
            loadActList()
        }).catch(() => {
        })
    })
}

    
    const cateIdList = ref([])
    const setCateIdList = async () => {
    cateIdList.value = await (await getWithCateList({})).data
    }
    setCateIdList()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadActList()
}
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
