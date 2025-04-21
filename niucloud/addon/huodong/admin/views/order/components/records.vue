<template>
    <el-dialog v-model="dialogVisible" :title="t('查看信息')" width="400px">
        <div class="flex flex-col">
    		
    		<!-- <div  v-for="(item) in recordsFieldList" >
    			 
    		    <div v-if="recordsFieldList[item.field_key].detailComponent">
    				{{recordsFieldList[item.field_key].detailComponent}}
    			</div>
    		</div>
    		 -->
             <div class="flex mb-[10px]"  v-for="(item, index) in formDetail"  :key="index">
                <div class="flex justify-end w-[100px]">{{ item.field.name }}：</div>
                <div class="flex ml-[20px]">
    				<div v-if="item.componentName=='FormImage'">
    					<el-image v-for="(item2,index2) in item.field.value" :src="img(item2)" class="w-[70px] h-[70px]" :class="{ 'mr-[5px]' : (index2 + 1) < item.field.value.length }" fit="contain" :preview-src-list="item.field.value" :zoom-rate="1.2" :max-scale="7"
    					:min-scale="0.2" :initial-index="index2" :hide-on-click-modal="true" />
    				</div>
                    <div v-else-if="Array.isArray(item.field.value)" class="mr-[10px]" v-for="(textItem, i) in item.field.value" :key="i">
                       <span v-if="textItem.text">{{textItem.text}}</span>
                      <!-- <span v-else-if="textItem.date">{{textItem.date}}</span>
                       <span v-else-if="textItem.start">{{textItem.start.date}}</span>
                       <span v-else-if="textItem.end">至{{textItem.end.date}}</span> -->
                    </div>
					<div v-else-if="item.field.value&&item.field.value.date">
					   <span >{{item.field.value.date}}</span>
					</div>
					<div v-else-if="item.field.value&&item.field.value.end">
					  <span >{{item.field.value.start.date}}</span>
					  <span>至{{item.field.value.end.date}}</span>
					</div>
					<!-- <div v-if="item.componentName=='FormDate'">
					   <span v-if="textItem.text">{{textItem.text}}</span>
					   <span v-else-if="textItem.date">{{textItem.date}}</span>
					   <span v-else-if="textItem.start">{{textItem.start.date}}</span>
					   <span v-else-if="textItem.end">至{{textItem.end.date}}</span>
					</div>
					<div v-if="item.componentName=='FormDate'">
					   <span v-if="textItem.text">{{textItem.text}}</span>
					   <span v-else-if="textItem.date">{{textItem.date}}</span>
					   <span v-else-if="textItem.start">{{textItem.start.date}}</span>
					   <span v-else-if="textItem.end">至{{textItem.end.date}}</span>
					</div>
					<div v-if="item.componentName=='FormDate'">
					   <span v-if="textItem.text">{{textItem.text}}</span>
					   <span v-else-if="textItem.date">{{textItem.date}}</span>
					   <span v-else-if="textItem.start">{{textItem.start.date}}</span>
					   <span v-else-if="textItem.end">至{{textItem.end.date}}</span>
					</div> -->
                    <div v-else>{{ item.field.value }}</div>
                </div>
            </div>  
        </div>
    
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">{{ t('confirm') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, defineAsyncComponent } from 'vue'
import { t } from '@/lang'
import { getDiyFormFieldsList, getDiyFormFieldStat, getFormRecords,getFormRecordsInfo,deleteFormRecords,getFormRecordsMember} from '@/app/api/diy_form'
import { useRouter, useRoute } from 'vue-router'
import { img } from '@/utils/common'
import { ElMessageBox, FormInstance } from 'element-plus'

const route = useRoute()
const router = useRouter()
const showDialog = ref(false)
const activeName = ref('detail_data')
const formId = ref(0)
const dialogVisible = ref(false)
const searchFormDiyFormRef = ref<FormInstance>()
const searchFormDiyMemberRef = ref<FormInstance>()
const handleClose = (done: () => void) => {
    showDialog.value = false;
}

const formData =  reactive({
    page: 1,
    limit: 6,
    total: 0,
    loading: false,
    data: [],
    searchParam: {
        form_id: 0,
        keyword: '',
        create_time: ''
    }
})

const formFieldsList = ref([])

// 获取万能表单字段列表
const getDiyFormFieldsListFn = (form_id:any)=>{
    getDiyFormFieldsList({
        form_id,
        order: 'field_id',
        sort: 'asc'
    }).then((res:any)=>{
        formFieldsList.value = res.data;
    })
}

// 获取字段统计列表
const formFieldsStat = ref([])
const getDiyFormFieldStatFn = (form_id:any)=>{
    getDiyFormFieldStat({
        form_id
    }).then((res:any)=>{
        formFieldsStat.value = res.data;
    })
}

const modules: any = import.meta.glob('@/**/*.vue')
const formDetail = ref([])
const recordsFieldList = ref([])

const formDetailEvent = (row: any) => {
    getFormRecordsInfo(row.record_id).then((res:any)=>{
        formDetail.value = res.data.value
        recordsFieldList.value = res.data.recordsFieldList
        dialogVisible.value = true
    })
}

// 删除
const deleteEvent = (row: any) => {
    ElMessageBox.confirm(t('确定删除该条数据吗'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteFormRecords({
            record_id: row.record_id,
            form_id: row.form_id
        }).then(() => {
            initData();
        }).catch(() => {
        })
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadFormRecordsListFn()
}
const resetFormMember = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    getFormRecordsMemberFn()
}

const loadFormRecordsListFn= (page: number = 1)=>{
    formData.loading = true
    formData.page = page
    getFormRecords({
        page: formData.page,
        limit: formData.limit,
        ...formData.searchParam
    }).then((res:any)=>{
        formData.loading = false
        formData.data = res.data.data
        formData.data.forEach((item:any)=>{
            for (let key:any in item.recordsFieldList){
                if (modules[item.recordsFieldList[key].detailComponent]) {
                    item.recordsFieldList[key].detailComponent && (item.recordsFieldList[key].detailComponent = defineAsyncComponent(modules[item.recordsFieldList[key].detailComponent]))
                }
            }
        })
        formData.total = res.data.total
    }).catch(() => {
        formData.loading = false
    })
}
const formMemberList =  reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: false,
    data: [],
    searchParam: {
        keyword: '',
        form_id: 0,
    }
})

const getFormRecordsMemberFn = (page: number = 1) => {
    formMemberList.loading = true
    formMemberList.page = page
    getFormRecordsMember({
        page: formMemberList.page,
        limit: formMemberList.limit,
        ...formMemberList.searchParam
    }).then((res: any) => {
        formMemberList.data = res.data.data;
        formMemberList.total = res.total;
        formMemberList.loading = false;
    }).catch((error) => {
        formMemberList.loading = false;
    });
}

//查看会员详情
const detailEvent = (member_id:number)=> {
    let routeData = router.resolve(`/member/detail?id=${member_id}`)
    window.open(routeData.href, ' blank');
}

const setFormData = async (row: any = null) => {
    formId.value = row.form_id;
    formData.searchParam.form_id = row.form_id;
    formMemberList.searchParam.form_id = row.form_id;

    getDiyFormFieldsListFn(row.form_id);
    initData();
}

const initData = () =>{
    getFormRecordsMemberFn();
    getDiyFormFieldStatFn(formId.value);
    loadFormRecordsListFn()
}

/**
 * 表单填写记录明细导出
 */
const exportSureDialog = ref(null)
const flag = ref(false)
const handleExportClose = (val) => {
    flag.value = val
}
const exportEvent = () => {
    flag.value = true
}

const flagMember = ref(false)
const handleMemberExportClose = (val) => {
    flagMember.value = val
}
const exportMemberEvent = () => {
    flagMember.value = true
}

defineExpose({
    showDialog,
    setFormData,formDetailEvent
})
</script>
<style lang="scss">
.diy-collapse .el-collapse-item__header{
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    .el-icon.el-collapse-item__arrow{
        margin-left: inherit;
        margin-right: 10px;
    }
}

</style>
