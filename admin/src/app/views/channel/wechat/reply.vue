<template>
    <!--自动回复-->
    <div class="main-container">
        <el-card class="card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ t('title') }}</span>
            </div>

            <el-tabs v-model="activeName" class="my-[20px]" @tab-change="handleClick">
                <el-tab-pane :label="t('wechatAccessFlow')" name="/channel/wechat" />
                <el-tab-pane :label="t('customMenu')" name="/channel/wechat/menu" />
                <el-tab-pane :label="t('wechatTemplate')" name="/channel/wechat/message" />
                <el-tab-pane :label="t('reply')" name="/channel/wechat/reply" />
            </el-tabs>

            <div>
                <el-radio-group v-model="replyType" style="margin-bottom: 30px">
                    <el-radio-button label="keyword">{{ t('keywordReply') }}</el-radio-button>
                    <el-radio-button label="default">{{ t('defaultReply') }}</el-radio-button>
                    <el-radio-button label="subscribe">{{ t('subscribeReply') }}</el-radio-button>
                </el-radio-group>

                <div v-show="replyType == 'keyword'">
                    <div class="flex justify-between items-center">
                        <el-button type="primary" @click="addKeywordsReply">新建回复</el-button>
                    </div>

                    <div class="mt-[10px]">
                        <el-table :data="replyTableData.data" size="large" v-loading="replyTableData.loading">
                            <template #empty>
                                <span>{{ !replyTableData.loading ? t('emptyData') : '' }}</span>
                            </template>
                            <el-table-column prop="name" label="规则名称" min-width="120" />
                            <el-table-column prop="keyword" label="关键字" min-width="120" />
                            <el-table-column label="匹配规则" min-width="150" align="center">
                                <template #default="{ row }">
                                    {{ row.matching_type == 'full' ? '全匹配' : '模糊匹配' }}
                                </template>
                            </el-table-column>
                            <el-table-column label="回复方式" min-width="150" align="center">
                                <template #default="{ row }">
                                    {{ row.reply_method == 'all' ? '全部回复' : '随机回复一条' }}
                                </template>
                            </el-table-column>
                            <el-table-column :label="t('operation')" align="right" fixed="right" width="180">
                                <template #default="{ row }">
                                    <el-button type="primary" link @click="editKeywordsReply(row)">{{ t('edit') }}</el-button>
                                    <el-button type="primary" link @click="deleteKeyword(row)">{{ t('delete') }}</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <div class="mt-[16px] flex justify-end">
                            <el-pagination v-model:current-page="replyTableData.page" v-model:page-size="replyTableData.limit"
                               layout="total, sizes, prev, pager, next, jumper" :total="replyTableData.total"
                               @size-change="loadKeywordsReplyList()" @current-change="loadKeywordsReplyList" />
                        </div>
                    </div>
                </div>
                <div v-show="replyType == 'default'">
                    <reply-form v-model="defaultReply" ref="defaultReplyRef"/>
                    <div class="mt-[20px]">
                        <el-button type="primary" :loading="loading" @click="save()">{{ t('save') }}</el-button>
                    </div>
                </div>
                <div v-show="replyType == 'subscribe'">
                    <reply-form v-model="subscribeReply" ref="subscribeReplyRef"/>
                    <div class="mt-[20px]">
                        <el-button type="primary" :loading="loading" @click="save()">{{ t('save') }}</el-button>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { t } from '@/lang'
import {
    getKeywordsReplyList,
    getDefaultReply,
    getSubscribeReply,
    setDefaultReply,
    setSubscribeReply,
    delKeywordsReply
} from '@/app/api/wechat'
import ReplyForm from '@/app/views/channel/wechat/components/reply-form.vue'
import { ElMessageBox } from 'element-plus'

const router = useRouter()
const activeName = ref('/channel/wechat/reply')
const replyType = ref('keyword')

const addKeywordsReply = () => {
    router.push('/channel/wechat/keyword_reply_edit')
}

const editKeywordsReply = (row: Object) => {
    router.push('/channel/wechat/keyword_reply_edit?id=' + row.id)
}

/**
 * 删除菜单
 */
const deleteKeyword = (row: Object) => {
    ElMessageBox.confirm(t('replyDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        delKeywordsReply(row.id).then(() => {
            loadKeywordsReplyList()
        }).catch(() => {
        })
    })
}
const handleClick = (val: any) => {
    router.push({ path: activeName.value })
}

const defaultReply = ref({})
const subscribeReply = ref({})

getDefaultReply().then(({ data }) => {
    data.length != 0 && (defaultReply.value = data.content)
}).catch()

getSubscribeReply().then(({ data }) => {
    data.length != 0 && (subscribeReply.value = data.content)
}).catch()

const defaultReplyRef = ref(null)
const subscribeReplyRef = ref(null)

const save = async () => {
    let verify = true,
        api,
        data = {}

    switch (replyType.value) {
        case 'default':
            await defaultReplyRef.value?.verify().then(res => {
                verify = res
            })
            api = setDefaultReply
            data = defaultReply.value
            break
        case 'subscribe':
            await subscribeReplyRef.value?.verify().then(res => {
                verify = res
            })
            api = setSubscribeReply
            data = subscribeReply.value
            break
    }
    if (verify) {
        api({content: data}).then(() => {}).catch()
    }
}

const replyTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: []
})

const loadKeywordsReplyList = (page: number = 1) => {
    replyTableData.loading = true
    replyTableData.page = page

    getKeywordsReplyList({
        page: replyTableData.page,
        limit: replyTableData.limit
    }).then(res => {
        replyTableData.loading = false
        replyTableData.data = res.data.data
        replyTableData.total = res.data.total
    }).catch(() => {
        replyTableData.loading = false
    })
}
loadKeywordsReplyList()
</script>

<style lang="scss" scoped></style>
