<template>
    <div class="main-container" ref="mainContainerRef">
        <el-card class="box-card !border-none" shadow="never">
            <el-alert type="warning" :closable="false" class="!mb-[0px]">
                <template #default>
                    <p class="mb-[5px]">注意事项：</p>
                    <p class="mb-[5px]">1、代客下单中，允许使用余额支付、帮付等付款方式，订单来源为“代客下单”。</p>
                    <p class="mb-[5px]">2、只能生成“普通订单”，无法创建“限时折扣”“积分商城”等活动订单。</p>
                    <p class="mb-[5px]">3、订单金额按商品原价或会员价计算、满足一定条件后享受优惠券、满减送活动。</p>
                    <p class="mb-[5px]">4、虚拟商品只能单独购买。</p>
                </template>
            </el-alert>
            <div class="flex items-center mt-[10px]">
                <div class="w-[240px] box-border p-[10px] rounded-[4px] border-solid border-primary border-[1px] mr-[20px] flex" v-if="formData">
                    <div class="mr-[10px]  w-[70px] h-[70px] flex items-center justify-center">
                        <img class="max-w-[70px] max-h-[70px]]" v-if="formData.headimg" :src="img(formData.headimg)" alt="">
                        <img class="max-w-[70px] max-h-[70px]" v-else src="@/app/assets/images/member_head.png" alt="">
                    </div>
                    <div class="flex flex-col justify-between pb-[2px]">
                        <div class="text-[16px] truncate max-w-[140px]">{{ formData.nickname }}</div>
                        <div class="text-[13px]" v-if="formData.mobile">
                            <span class="text-[12px]">手机号：</span>
                            <span>{{ formData.mobile }}</span>
                        </div>
                        <div class="text-[13px]" v-if="formData.balance">
                            <span class="text-[12px]">可用余额：</span>
                            <span>{{ formData.balance }}</span>
                        </div>
                    </div>
                </div>
                <el-button  type="primary"  @click="selectMemberFn">{{ formData && formData.nickname ? t('reselectMember') : t('selectMember') }}</el-button>
            </div>
        </el-card>

        <el-card class="box-card !border-none mt-[15px]" shadow="never">
            <div class="flex">
                <div class="w-[580px]">
                    <div class="mb-[15px]">{{t('allGoods')}}</div>
                    <div class="border-[1px] border-solid border-[#f2f2f2] p-[15px] h-[692px]" v-loading="goodsTable.loading">
                        <div class="pb-[10px] flex">
                            <el-cascader v-model="goodsTable.searchParam.goods_category" :options="goodsCategoryOptions" :placeholder="t('goodsCategoryPlaceholder')" clearable :props="{ value: 'value', label: 'label', emitPath:false }" class="!w-[250px] mr-[15px]"  @change="loadGoodsList"/>
                            <el-input v-model.trim="goodsTable.searchParam.keyword" :placeholder="t('goodsNamePlaceholder')" maxlength="60" class="!w-[300px]" clearable @clear="loadGoodsList()">
                                <template #append>
                                    <span class="iconfont iconsousuopc1 cursor-pointer" @click="loadGoodsList()"></span>
                                </template>
                            </el-input>
                        </div>
                        <el-table :data="goodsTable.data" size="large" :show-header="false">
                            <template #empty>
                                <span>{{ !goodsTable.loading ? t('emptyData') : '' }}</span>
                            </template>
                            <el-table-column  :label="t('goodsInfo')" min-width="400" >
                                <template #default="{ row }">
                                    <div class="flex items-inherit">
                                        <div class="min-w-[70px] h-[70px] flex items-center justify-center">
                                            <el-image v-if="row.goods_cover_thumb_small" class="w-[60px] h-[60px]" :src="img(row.goods_cover_thumb_small)" fit="contain">
                                                <template #error>
                                                    <div class="image-slot">
                                                        <img class="w-[70px] h-[70px]" src="@/addon/shop_replace_buy/assets/goods_default.png" />
                                                    </div>
                                                </template>
                                            </el-image>
                                            <img v-else class="w-[70px] h-[70px]" src="@/addon/shop_replace_buy/assets/goods_default.png" fit="contain" />
                                        </div>
                                        <div class="ml-2 flex-1 flex flex-col justify-between">
                                            <div :title="row.goods_name" class="truncate w-[350px] leading-[1.4]">{{ row.goods_name }}</div>
                                            <div v-if="row.manjian_info && Object.keys(row.manjian_info).length" class="flex items-center mt-[4px] mb-[auto] cursor-pointer" @click.stop="manjianOpenFn(row.manjian_info)">
                                                <div class="bg-[var(--el-color-primary-light-9)] text-[var(--el-color-primary)] rounded-[3px] text-[10px] flex items-center justify-center w-[44px] h-[18px] mr-[3px]">满减送</div>
                                                <span class="text-[11px] text-[#999]">{{row.manjian_info.manjian_name}}</span>
                                            </div>
                                            <div class="flex items-center">
                                                <span class="text-primary text-[12px] w-[24%]">{{ row.goods_type_name }}</span>
                                                <span class="w-[38%]">价格：￥{{ row.goodsSku.price }}</span>
                                                <span class="w-[38%]">库存：{{ row.stock }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column :label="t('operation')" fixed="right" align="right" min-width="100">
                                <template #default="{ row }">
                                    <el-button type="primary" :disabled="row.stock <= 0" :class="{'!text-[#999]': row.stock <= 0}" link @click="selectSku(row)">{{ row.goods_type == 'virtual' ? t('buy') : t('select') }}</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="mt-[16px] flex justify-end">
                            <el-pagination v-model:current-page="goodsTable.page" v-model:page-size="goodsTable.limit"  :page-sizes="[6, 10, 20, 50]"
                                layout="prev, pager, next, jumper" :total="goodsTable.total"
                                @size-change="loadGoodsList()" @current-change="loadGoodsList" />
                        </div>
                    </div>
                </div>
                <div class="w-[580px] ml-[20px] flex flex-col">
                    <div class="mb-[15px]">{{t('selected')}}({{selectedGoodsNum}})</div>
                    <div class="border-[1px] border-solid border-[#f2f2f2] p-[15px] h-[692px] overflow-auto"  v-loading="selectedLoading">
                        <div v-for="(item,index) in selectedGoodsData" :key="index" class="flex items-center justify-between mb-[10px]">
                            <div class="flex items-inherit">
                                <div class="min-w-[70px] h-[70px] flex items-center justify-center">
                                    <el-image v-if="item.sku_image" class="w-[70px] h-[70px]" :src="img(item.sku_image)" fit="contain">
                                        <template #error>
                                            <div class="image-slot">
                                                <img class="w-[70px] h-[70px]" src="@/addon/shop_replace_buy/assets/goods_default.png" />
                                            </div>
                                        </template>
                                    </el-image>
                                    <img v-else class="w-[70px] h-[70px]" src="@/addon/shop_replace_buy/assets/goods_default.png" fit="contain" />
                                </div>
                                <div class="ml-2 flex-1 flex flex-col justify-between">
                                    <div :title="item.goods_name" class="truncate text-[14px] w-[170px] leading-[1.4]">{{ item.goods_name }}</div>
                                    <div class="text-[#999] text-[12px]">{{ item.sku_name }}</div>
                                    <div v-if="item.manjian_info && Object.keys(item.manjian_info).length" class="flex items-center mt-[2px] mb-[auto] cursor-pointer" @click.stop="manjianOpenFn(item.manjian_info)">
                                        <div class="bg-[var(--el-color-primary-light-9)] text-[var(--el-color-primary)] rounded-[3px] text-[10px] flex items-center justify-center w-[44px] h-[18px] mr-[3px]">满减送</div>
                                        <span class="text-[11px] text-[#999]">{{item.manjian_info.manjian_name}}</span>
                                    </div>
                                    <div class="text-primary mt-[4px] text-[12px]">￥{{ item.price }}</div>
                                </div>
                            </div>
                            <goods-limit ref="goodsLimitRef" :data="item" />
                            <el-button type="primary" @click="removeFn(item)">移除</el-button>
                        </div>
                        <div v-if="!selectedGoodsData.length" class="flex flex-col items-center mt-[60px]">
                            <img class="w-[250px]" src="@/addon/shop_replace_buy/assets/no_goods.jpg" />
                            <span class="text-[14px] pl-[35px]">未添加任何商品</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pb-[60px] w-[100%]"></div>
            <div class="bg-[#fff] h-[60px] flex items-center justify-center fixed bottom-0 z-10 right-[15px] border-[0] border-t-[1px] border-[#ececec]" :style="settleStyle()" v-if="!goodsTable.loading">
                <el-button type="primary" @click="settle()" :disabled="!selectedGoodsNum" :loading="settleLoad">结算</el-button>
            </div>
        </el-card>
        <select-member ref="selectMemberRef" @confirm="selectMemberConfirm"></select-member>
        <select-goods ref="selectGoodsRef" @confirm="selectGoodsConfirm"></select-goods>
        <manjian-info ref="manjianInfoRef"></manjian-info>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { t } from '@/lang'
import { img } from '@/utils/common'
import storage from '@/utils/storage'
import { useRouter } from 'vue-router'
import { getCategoryTree } from '@/addon/shop/api/goods'
import { getGoodsSelectByReplaceBuy, getGoodsSelectedByReplaceBuy } from '@/addon/shop/api/marketing'
import selectMember from './components/select-member.vue'
import selectGoods from './components/select-goods.vue'
import goodsLimit from './components/goods-limit.vue'
import manjianInfo from './components/manjian-info.vue'

const router = useRouter()
const formData: Record<string, any> = ref(null)
const selectedGoodsData = ref([])
const selectedGoodsNum = ref(0)
const mainContainerRef = ref()
const manjianInfoRef = ref()
const goodsLimitRef = ref()

/************** 会员-start *********************/
const selectMemberRef = ref<any>(null)
const selectMemberFn = () => {
    selectMemberRef.value.open()
}
// 选择会员回调
const selectMemberConfirm = (data: any) => {
    formData.value = data;
    loadGoodsList();
    selectedGoodsData.value = [];
    selectedGoodsNum.value = 0;
}
/************** 会员-end *********************/

/************** 商品-start *********************/
// 商品分类
const goodsCategoryOptions: any = reactive([])
// 初始化数据
const initData = () => {
// 查询商品分类树结构
    getCategoryTree().then((res) => {
        const data = res.data
        if (data) {
            const goodsCategoryTree: any = []
            data.forEach((item: any) => {
                const children: any = []
                if (item.child_list) {
                    item.child_list.forEach((childItem: any) => {
                        children.push({
                            value: childItem.category_id,
                            label: childItem.category_name
                        })
                    })
                }
                goodsCategoryTree.push({
                    value: item.category_id,
                    label: item.category_name,
                    children
                })
            })
            goodsCategoryOptions.splice(0, goodsCategoryOptions.length, ...goodsCategoryTree)
        }
    })
}

initData()
const goodsTable = reactive({
    page: 1,
    limit: 6,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        keyword: '',
        goods_category: []
    }
})

let goodsRepeatLoad = false;
const loadGoodsList = (page: number = 1) => {
    goodsTable.loading = true
    goodsTable.page = page

    if (goodsRepeatLoad) return false;
    goodsRepeatLoad = true;
    let member_id = formData.value ? formData.value.member_id : '';
    getGoodsSelectByReplaceBuy({
        page: goodsTable.page,
        limit: goodsTable.limit,
        member_id,
        ...goodsTable.searchParam
    }).then((res: any) => {
        goodsRepeatLoad = false;
        goodsTable.loading = false
        goodsTable.total = res.data.total
        goodsTable.data = res.data.data
    }).catch(() => {
        goodsTable.loading = false
    })
}

loadGoodsList()

// 选择商品回调
const selectGoodsConfirm = (data: any)=> {
    console.log(data.goods.goods_type == 'virtual');
    if (data.goods.goods_type == 'virtual'){
        let params: any = {};
        params.memberInfo = {};
        params.memberInfo.member_id = formData.value.member_id;
        params.memberInfo.headimg = formData.value.headimg;
        params.memberInfo.nickname = formData.value.nickname;
        params.memberInfo.mobile = formData.value.mobile;
        params.memberInfo.balance = formData.value.balance;
         storage.set({ key: 'replaceBuyOrderCreateData', data: params })
    }
    data.skuList.forEach((item, index) => {
        let isNewGoods = true;
        if (data.goods.goods_type == "virtual") {
            if (item.num) {
                settle(item, data.goods.goods_type);
                return false;
            }
        } else {
            selectedGoodsData.value.forEach((selectItem, selectIndex, selectArr) => {
                if (item.sku_id == selectItem.sku_id) {
                    if (item.num && selectArr[selectIndex].num) {
                        selectArr[selectIndex].num += item.num;
                    } else if (item.num) {
                        selectArr[selectIndex].num = item.num;
                    }
                    isNewGoods = false;
                }
            });
            if (isNewGoods && item.num) {
                item.goods_name = data.goods.goods_name;
                // 以下参数为input所需要的参数
                item.goods = {};
                item.goods.min_buy = data.goods.min_buy;
                item.goods.sku_stock = item.stock;
                item.goods.is_limit = data.goods.is_limit;
                item.goods.max_buy = data.goods.max_buy;
                item.goods.has_buy = data.goods.has_buy;

                item.manjian_info = data.manjian_info || {};
                selectedGoodsData.value.push(item);
            }
        }

    });

    // 统计已选购商品数量
    selectedGoodsNum.value = 0;
    selectedGoodsData.value.forEach((item, index) => {
        if (item.num) {
            selectedGoodsNum.value += 1;
        }
    });
}

// 获取选中的商品数据
const getGoodsSelectedByReplaceBuyFn = (memberId:any, skuIds:any, skuData:any)=> {
    let obj = { sku_ids: skuIds, member_id: memberId };
    getGoodsSelectedByReplaceBuy(obj).then((res: any) => {
        res.data.forEach((item, index) => {
            skuData.forEach((skuItem, skuIndex) => {
                if (skuItem.sku_id == item.sku_id) {
                    item.num = skuItem.num;
                }
            });

            let isNewGoods = true;
            selectedGoodsData.value.forEach((selectItem, selectIndex, selectArr) => {
                if (item.sku_id == selectItem.sku_id) {
                    if (item.num && selectArr[selectIndex].num) {
                        selectArr[selectIndex].num += item.num;
                    } else if (item.num) {
                        selectArr[selectIndex].num = item.num;
                    }
                    isNewGoods = false;
                }
            });
            if (isNewGoods) {
                item.goods_name = item.goods.goods_name;
                item.goods.sku_stock = item.stock;
                selectedGoodsData.value.push(item);
            }
        });

        // 统计已选购商品数量
        selectedGoodsNum.value = 0;
        selectedGoodsData.value.forEach((item, index) => {
            if (item.num) {
                selectedGoodsNum.value += 1;
            }
        });
        selectedLoading.value = false;
    }).catch(() => {
        selectedLoading.value = false;
    })
}

// 更新选中商品数量
const updateSelectGoodsNum = ()=> {
    selectedGoodsData.value.forEach((item, index, arr) => {
        if (goodsLimitRef.value[index] && item.num) {
            arr[index].num = goodsLimitRef.value[index].getBuyNum();
        }
    })
}
/************** 商品-end *********************/

// 满减
const manjianOpenFn = (data:any)=>{
    manjianInfoRef.value.open(data);
}

const selectedLoading = ref(false)
if (storage.get('replaceBuyOrderCreateData')) {
    let data = storage.get('replaceBuyOrderCreateData');
    if (data.goodsType != 'virtual') {
        formData.value = data.memberInfo;
        let skuIdArr: any = [];
        data.sku_data.forEach((item,index) => {
            skuIdArr.push(item.sku_id);
        });
        selectedLoading.value = true;
        getGoodsSelectedByReplaceBuyFn(data.memberInfo.member_id, skuIdArr, data.sku_data);
    }else{
        formData.value = data.memberInfo;
    }
    storage.remove('replaceBuyOrderCreateData');
}

// 结算
const settleLoad = ref(false);
const settle = (data: any, type:any ='') => {
    if (settleLoad.value) return false;
    settleLoad.value = true;

    let skuArr = [];
    if (data) {
        let obj: any = {};
        obj.num = data.num;
        obj.sku_id = data.sku_id;
        skuArr.push(obj);
    } else {
        updateSelectGoodsNum();
        selectedGoodsData.value.forEach((item, index) => {
            if (item.num) {
                let obj = {};
                obj.num = item.num;
                obj.sku_id = item.sku_id;
                skuArr.push(obj);
            }
        });
    }

    let params: any = {};
    params.sku_data = skuArr;
    params.memberInfo = {};
    params.memberInfo.member_id = formData.value.member_id;
    params.memberInfo.headimg = formData.value.headimg;
    params.memberInfo.nickname = formData.value.nickname;
    params.memberInfo.mobile = formData.value.mobile;
    params.memberInfo.balance = formData.value.balance;
    if (type) params.goodsType = type;
    storage.set({ key: 'replaceBuyOrderCreateData', data: params })
    router.push('/shop_replace_buy/order')
    settleLoad.value = false;
}

// 计算结算栏宽度
const settleStyle = ()=> {
    let style: any = {};
    style.width = mainContainerRef.value.clientWidth + 'px';
    return style;
}

// 移出
const removeFn = (data:any)=> {
    selectedGoodsData.value.forEach((item, index, arr) => {
        if (item.sku_id == data.sku_id) {
            arr.splice(index, 1);
        }
    })

    // 统计已选购商品数量
    selectedGoodsNum.value = 0;
    selectedGoodsData.value.forEach((item, index) => {
        if (item.num) {
            selectedGoodsNum.value += 1;
        }
    });
}

const selectGoodsRef = ref<any>(null)
// 选择规格项
const selectSku = (data: any) => {
    updateSelectGoodsNum();
    // 作用：将选中数据的数量，传入sku框中
    let selectData: any = [];
    if (selectedGoodsData.value && selectedGoodsData.value.length) {
        selectedGoodsData.value.forEach((item, index) => {
            let obj: any = {};
            obj.goods_id = item.goods_id;
            obj.sku_id = item.sku_id;
            obj.num = item.num;
            selectData.push(obj)
        })
    }

    if (formData.value && formData.value.member_id) {
        selectGoodsRef.value.open(data, formData.value.member_id, selectData)
    } else {
        selectMemberFn();
    }
}
</script>
<style lang="scss" scoped>
</style>
