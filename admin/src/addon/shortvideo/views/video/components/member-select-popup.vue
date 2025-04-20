<template>
    <div>
        <div @click="show">
            <slot>
                <el-button>{{ t('memberSelectPopupSelectmemberButton') }}</el-button>
                <div class="inline-block ml-[10px] text-[14px]" v-show="memberIds.length">
                    <span>{{ t('memberSelectPopupSelect') }}</span>
                    <span class="text-primary mx-[2px]">{{ memberIds.length }}</span>
                    <span>{{ t('memberSelectPopupPiece') }}</span>
                </div>
            </slot>
        </div>
        <el-dialog v-model="showDialog" :title="t('memberSelectPopupSelectmemberDialog')" width="1000px" :close-on-press-escape="false" :destroy-on-close="true" :close-on-click-modal="false">

 <!-- <el-card class="box-card !border-none my-[20px] table-search-wrap" shadow="never"> -->
                <el-form :inline="true" :model="memberTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('memberInfo')" prop="keyword">
                        <el-input v-model="memberTable.searchParam.keyword" class="w-[240px]" :placeholder="t('memberInfoPlaceholder')" />
                    </el-form-item>

                    <el-form-item :label="t('registerChannel')" prop="register_channel">
                        <el-select v-model="memberTable.searchParam.register_channel" clearable :placeholder="t('channelPlaceholder')" class="input-width">
                            <el-option :label="t('selectPlaceholder')" value="" />
                            <el-option :label="item" :value="key" v-for="(item, key) in channelList" :key="key" />
                        </el-select>
                    </el-form-item>

                    <el-form-item :label="t('memberLabel')" prop="member_label">
                        <el-select v-model="memberTable.searchParam.member_label" collapse-tags clearable :placeholder="t('memberLabelPlaceholder')" class="input-width">
                            <el-option :label="t('selectPlaceholder')" value="" />
                            <el-option :label="item['label_name']" :value="item['label_id']" v-for="(item, index) in labelSelectData" :key="index" />
                        </el-select>
                    </el-form-item>

                    <el-form-item :label="t('memberLevel')" prop="member_label">
                        <el-select v-model="memberTable.searchParam.member_level" collapse-tags clearable :placeholder="t('memberLevelPlaceholder')" class="input-width">
                            <el-option :label="t('selectPlaceholder')" value="" />
                            <el-option :label="item['level_name']" :value="item['level_id']" v-for="(item, index) in levelSelectData" :key="index" />
                        </el-select>
                    </el-form-item>

                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="memberTable.searchParam.create_time" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadMemberList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            <!-- </el-card> -->

            <div class="mt-[10px]">
                <el-table :data="memberTable.data" size="large" v-loading="memberTable.loading" @select="handleSelectChange" @select-all="handleSelectAllChange">
                    <template #empty>
                        <span>{{ !memberTable.loading ? t('emptyData') : '' }}</span>
                    </template>
					<el-table-column type="selection" width="55" />
                    <el-table-column prop="member_no" :label="t('memberNo')" min-width="120" />
                    <el-table-column prop="nickname" :show-overflow-tooltip="true" :label="t('memberInfo')" min-width="170">
                        <template #default="{ row }">
                            <div class="flex items-center">
                                <img class="w-[50px] h-[50px] mr-[10px]" v-if="row.headimg" :src="img(row.headimg)" alt="">
                                <img class="w-[50px] h-[50px] mr-[10px] rounded-full" v-else src="@/app/assets/images/member_head.png" alt="">
                                <div class="flex flex flex-col">
                                    <span>{{ row.nickname || '' }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="member_level_name" :label="t('memberLevel')" min-width="130" :show-overflow-tooltip="true" />
                    <el-table-column prop="mobile" :label="t('mobile')" min-width="120" />
                   
                    <el-table-column :label="t('createTime')" min-width="150" align="center">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column> 
					
                   

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="memberTable.page" v-model:page-size="memberTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="memberTable.total"
                        @size-change="loadMemberList()" @current-change="loadMemberList" />
                </div>
            </div>
			
            <!-- <el-form :inline="true" :model="memberTable.searchParam" ref="searchFormRef">
                
                <el-form-item :label="t('memberSelectPopupmemberName')" prop="keyword" class="form-item-wrap">
                    <el-input v-model="memberTable.searchParam.keyword" :placeholder="t('memberSelectPopupmemberNamePlaceholder')" maxlength="60" />
                </el-form-item>
               
            </el-form> -->

           <!-- <el-table :data="memberTable.data" size="large" v-loading="memberTable.loading" ref="memberListTableRef" max-height="400" @select="handleSelectChange" @select-all="handleSelectAllChange">
                <template #empty>
                    <span>{{ !memberTable.loading ? t('emptyData') : '' }}</span>
                </template>
                <el-table-column type="selection" width="55" />
                <el-table-column prop="member_id" :label="t('memberSelectPopupmemberInfo')" min-width="400">
                    <template #default="{ row }">
                        <div class="flex items-center cursor-pointer">
                            <div class="min-w-[60px] h-[60px] flex items-center justify-center">
                                <el-image v-if="row.member_cover_thumb_small" class="w-[60px] h-[60px]" :src="img(row.member_cover_thumb_small)" fit="contain">
                                    <template #error>
                                        <div class="image-slot">
                                            <img class="w-[60px] h-[60px]" src="@/addon/shortvideo/assets/member_default.png" />
                                        </div>
                                    </template>
                                </el-image>
                                <img v-else class="w-[70px] h-[60px]" src="@/addon/shortvideo/assets/member_default.png" fit="contain" />
                            </div>
                            <div class="ml-2">
                                <span :title="row.member_name" class="multi-hidden">{{ row.member_name }}</span>
                                <span class="text-primary text-[12px]">{{ row.member_type_name }}</span>
                            </div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column prop="price" :label="t('memberSelectPopupPrice')" min-width="120" align="right">
                    <template #default="{ row }">
                        <div>￥{{ row.memberSku.price }}</div>
                    </template>
                </el-table-column>

                <el-table-column prop="stock" :label="t('memberSelectPopupStock')" min-width="120" align="right" />

            </el-table>
            <div class="mt-[16px] flex">
                <div class="flex items-center flex-1">
                    <div class="layui-table-bottom-left-container mr-[10px]" v-show="selectmemberNum">
                        <span>{{ t('memberSelectPopupBeforeTip') }}</span>
                        <span class="text-primary mx-[2px]">{{ selectmemberNum }}</span>
                        <span>{{ t('memberSelectPopupAfterTip') }}</span>
                    </div>
                    <el-button type="primary" link @click="clear" v-show="selectmemberNum">{{ t('memberSelectPopupClearmember') }}</el-button>
                </div>
                <el-pagination v-model:current-page="memberTable.page" v-model:page-size="memberTable.limit"
                    layout="total, sizes, prev, pager, next, jumper" :total="memberTable.total"
                    @size-change="loadmemberList()" @current-change="loadmemberList" />
            </div> -->

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="save">{{ t('confirm') }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import { ref, reactive, computed, nextTick } from 'vue'
import { cloneDeep } from 'lodash-es'
import { img } from '@/utils/common'
import { ElMessage } from 'element-plus'
import { getMemberList }  from '@/app/api/member'

const prop = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    max: {
        type: Number,
        default: 0
    },
    min: {
        type: Number,
        default: 0
    }
})

const emit = defineEmits(['update:modelValue','memberSelect'])

const memberIds: any = computed({
    get () {
        return prop.modelValue
    },
    set (value) {
        emit('update:modelValue', value)
    }
})

const showDialog = ref(false)

// 已选商品列表
const selectmember: any = reactive({})

// 已选商品列表id
const selectmemberId: any = reactive([])

// 已选商品数量
const selectmemberNum: any = computed(() => {
    return Object.keys(selectmember).length
})

const memberTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        keyword: '',
        member_category: [],
        select_type: 'all',
        member_id: '',
        verify_member_id: '',
        member_type: ''
    }
})

const searchFormRef = ref()

// 条件筛选查询

// 查询全部/已选商品
const handleSelectTypeChange = (value: any) => {
    loadmemberList()
}

// 商品分类
const memberCategoryOptions: any = reactive([])

// 商品类型
const memberType: any = reactive([])

// 初始化数据
const initData = () => {

}

initData()
// 获取会员列表
const loadMemberList = (page: number = 1) => {
    memberTable.loading = true
    memberTable.page = page

    getMemberList({
        page: memberTable.page,
        limit: memberTable.limit,
        ...memberTable.searchParam
    }).then(res => {
        memberTable.loading = false
        memberTable.data = res.data.data
        memberTable.total = res.data.total
    }).catch(() => {
        memberTable.loading = false
    })
}
loadMemberList()
const memberListTableRef = ref()

// 选中数据
const multipleSelection: any = ref([])

// 监听表格复选框
const handleSelectChange = (selection: any, row: any) => {
    // 是否选中
    let isSelected = false
    for (let i = 0; i < selection.length; i++) {
        if (selection[i].member_id == row.member_id) {
            isSelected = true
            break
        }
    }
    if (isSelected) {
        selectmemberId.push(row.member_id)
        selectmember['member_' + row.member_id] = row
    } else {
        selectmemberId.splice(selectmemberId.indexOf(row.member_id),1)
        // 未选中，删除当前商品
        delete selectmember['member_' + row.member_id]
    }

    // 当所选数量超出限制数量【prop.max】时，添加一个就会删除开头的第一个或多个，最终保证所选的数量小于等于prop.max
    if(prop.max && prop.max > 0 && Object.keys(selectmember).length > 0 && Object.keys(selectmember).length > prop.max){
        let len = Object.keys(selectmember).length;
        len = len - prop.max;

        let memberIdCopy = cloneDeep(selectmemberId);
        memberIdCopy.forEach((item,index,arr) => {
            if(index < len){
                let indent = selectmemberId.indexOf(item)
                delete selectmember['member_'+selectmemberId[indent]]
                selectmemberId.splice(indent,1) 
            }
        });
        setmemberSelected();
    }
}


// 监听表格全选
const handleSelectAllChange = (selection: any) => {
    if (selection.length) {
        selection.forEach((item: any) => {
            selectmember['member_' + item.member_id] = item
            if(selectmemberId.indexOf(item.member_id) == -1){
                selectmemberId.push(item.member_id)
            }
        })
    } else {
        // 未选中，删除当前页面的数据
        memberTable.data.forEach((item: any) => {
            selectmemberId.splice(selectmemberId.indexOf(item.member_id),1)
            delete selectmember['member_' + item.member_id]
        })
    }
}

/**
 * 获取商品列表
 */
const loadmemberList = (page: number = 1, callback: any = null) => {
    memberTable.loading = true
    memberTable.page = page

    const searchData = cloneDeep(memberTable.searchParam);

    if (searchData.select_type == 'selected') {
        const member_id = <any>[]
        for (let k in selectmember) {
            member_id.push(parseInt(k.replace('member_', '')))
        }
        searchData.member_id = member_id
    } else {
        searchData.member_id = '';
    }

    getMemberList({
        page: memberTable.page,
        limit: memberTable.limit,
        ...searchData
    }).then(res => {
        memberTable.loading = false
        memberTable.data = res.data.data
        memberTable.total = res.data.total

        if (callback) callback(res.data.verify_member_id)

        setmemberSelected();

    }).catch(() => {
        memberTable.loading = false
    })

}

// 表格设置选中状态
const setmemberSelected = () => {
    nextTick(() => {
        if (!memberListTableRef.value) return;
        for (let i = 0; i < memberTable.data.length; i++) {
            memberListTableRef.value.toggleRowSelection(memberTable.data[i], false);
            if (selectmember['member_' + memberTable.data[i].member_id]) {
                memberListTableRef.value.toggleRowSelection(memberTable.data[i], true);
            }
        }
    });
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()

    loadmemberList()
}

const show = () => {
    for (let k in selectmember) {
        delete selectmember[k];
    }
    // 检测商品id集合是否存在，移除不存在的商品id，纠正数据准确性
    memberTable.searchParam.verify_member_id = memberIds.value;
    loadmemberList(1, (verify_member_id: any) => {
        // 第一次打开弹出框时，纠正数据，并且赋值已选商品
        if (memberIds.value) {
            // memberIds.value.splice(0, memberIds.value.length, ...verify_member_id)
            // memberIds.value.forEach((item: any) => {
            //     if (!selectmember['member_' + item]) {
            //         selectmember['member_' + item] = {};
            //     }
            // })

            // 赋值已选择的商品
            for (let i = 0; i < memberTable.data.length; i++) {
                if (memberIds.value.indexOf(memberTable.data[i].member_id) != -1) {
                    selectmember['member_' + memberTable.data[i].member_id] = memberTable.data[i];
                }
            }
        }
    })
    showDialog.value = true
}

// 清空已选商品
const clear = () => {
    for (let k in selectmember) {
        delete selectmember[k];
    }
    setmemberSelected();
}

const save = () => {
    if (prop.min && selectmemberNum.value < prop.min) {
        ElMessage({
            type: 'warning',
            message: `${t('memberSelectPopupmemberMinTip')}${prop.min}${t('memberSelectPopupPiece')}`,
        });
        return;
    }

   if (prop.max && prop.max > 0 && selectmemberNum.value && selectmemberNum.value > prop.max) {
       ElMessage({
           type: 'warning',
           message: `${t('memberSelectPopupmemberMaxTip')}${prop.max}${t('memberSelectPopupPiece')}`,
       });
       return;
   }

    let ids: any = [];
    for (let k in selectmember) {
        ids.push(parseInt(k.replace('member_', '')));
    }
	
	console.log('ids',ids)
	if(ids.length==0){
		ElMessage({
		    type: 'warning',
		    message: `请选择数据`,
		});
		return;
	}
 if (prop.min && prop.min > 0 && ids.length<prop.min) {
        ElMessage({
            type: 'warning',
            message: `最少需选择${prop.min}条数据`,
        });
        return;
    }
    // memberIds.value.splice(0, memberIds.value.length, ...ids)
    emit('memberSelect',selectmember)
    initSearchParam();
    showDialog.value = false
}

// 重置表单搜索
const initSearchParam = ()=>{
    memberTable.searchParam.keyword = '';
    memberTable.searchParam.member_category = [];
    memberTable.searchParam.select_type = 'all';
    memberTable.searchParam.member_id = '';
    memberTable.searchParam.verify_member_id = '';
    memberTable.searchParam.member_type = '';
}

defineExpose({
    showDialog,
    selectmember,
    selectmemberNum
})
</script>

<style lang="scss" scoped>
.form-item-wrap {
    margin-right: 10px !important;
    margin-bottom: 10px !important;

    &.last-child {
        margin-right: 0 !important;
    }
}
</style>
