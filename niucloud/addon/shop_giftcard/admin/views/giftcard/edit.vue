<template>
    <div class="main-container">

        <el-card class="box-card !border-none" shadow="never">
            <el-page-header :content="giftcardEdit.formData.giftcard_id ? t('updateGiftcard') : t('addGiftcard')" :icon="ArrowLeft" @back="giftcardEdit.back" />
        </el-card>

        <el-card class="box-card mt-[15px] !border-none" shadow="never">
            <el-tabs v-model="giftcardEdit.activeName" @tab-click="giftcardEdit.tabHandleClick">

                <el-tab-pane :label="t('basicInfoTab')" name="basic">
                    <el-form :model="giftcardEdit.formData" label-width="120px" ref="basicFormRef" :rules="giftcardEdit.formRules" class="page-form">
                        <el-form-item :label="t('giftcardType')" v-if="giftcardEdit.formData.giftcard_id">
                            <template v-for="(item) in giftcardEdit.giftcardType" :key="item.type">
                                <div class="giftcard-type-wrap" :class="[giftcardEdit.formData.type == item.type ? 'selected' : 'disabled']">
                                    <div class="type-name">{{ item.name }}</div>
                                    <div class="type-desc">({{ item.desc }})</div>
                                    <template v-if="giftcardEdit.formData.type == item.type">
                                        <div class="triangle"></div>
                                        <div class="selected">✓</div>
                                    </template>
                                </div>
                            </template>
                        </el-form-item>
                        <el-form-item :label="t('giftcardType')" v-else>
                            <template v-for="(item) in giftcardEdit.giftcardType" :key="item.type">
                                <div class="giftcard-type-wrap" :class="{ 'selected': giftcardEdit.formData.type == item.type }" @click="giftcardEdit.changeGiftcardType(item)">
                                    <div class="type-name">{{ item.name }}</div>
                                    <div class="type-desc">({{ item.desc }})</div>
                                    <template v-if="giftcardEdit.formData.type == item.type">
                                        <div class="triangle"></div>
                                        <div class="selected">✓</div>
                                    </template>
                                </div>
                            </template>
                        </el-form-item>

                        <el-form-item :label="t('cardName')" prop="card_name">
                            <el-input v-model.trim="giftcardEdit.formData.card_name" clearable :placeholder="t('cardNamePlaceholder')" class="input-width" maxlength="20" show-word-limit />
                        </el-form-item>

                        <el-form-item :label="t('categoryId')" prop="category_id">
                            <el-select v-model="giftcardEdit.formData.category_id" :placeholder="t('categoryIdPlaceholder')" clearable>
                                <el-option v-for="item in giftcardEdit.categoryOptions" :key="item.category_id" :label="item.category_name" :value="item.category_id" />
                            </el-select>
                            <div class="ml-[10px]">
                                <span class="cursor-pointer text-primary mr-[10px]" @click="giftcardEdit.refreshCategory(true)">{{ t('refresh') }}</span>
                                <span class="cursor-pointer text-primary" @click="giftcardEdit.toCategoryEvent">{{ t('addCategory') }}</span>
                            </div>
                        </el-form-item>

                        <el-form-item :label="t('cover')" prop="cover">
                            <material-select-popup v-model="giftcardEdit.formData.cover" :limit="10" />
                        </el-form-item>

                        <el-form-item :label="t('validityType')">
                            <el-radio-group v-model="giftcardEdit.formData.validity_type">
                                <el-radio label="forever">{{ t('validityForever') }}</el-radio>
                                <el-radio label="day">{{ t('validityDay') }}</el-radio>
                                <el-radio label="date">{{ t('validityDate') }}</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item prop="validity_day" v-show="giftcardEdit.formData.validity_type == 'day'">
                            购买后立即生效，
                            <div class="flex items-center px-[5px]">
                                <el-input v-model.trim="giftcardEdit.formData.validity_day" @keyup="filterNumber($event)" clearable class="input-width-short" maxlength="3" />
                            </div>
                            天有效
                        </el-form-item>

                        <el-form-item prop="validity_time" v-show="giftcardEdit.formData.validity_type == 'date'">
                            购买后立即生效，使用时间截止为
                            <div class="w-[220px] pl-[5px]">
                                <el-date-picker v-model="giftcardEdit.formData.validity_time" type="datetime" />
                            </div>
                        </el-form-item>

                        <el-form-item :label="t('cardNoLength')" prop="card_no_length" v-show="giftcardEdit.formData.type == 'real'">
                            <div>
                                <el-input v-model.trim="giftcardEdit.formData.card_no_length" clearable :placeholder="t('cardNoLengthPlaceholder')" class="input-width-short" maxlength="2" @keyup="filterNumber($event)" />
                                <div class="mt-[10px] text-[12px] text-[#999] leading-[20px]">{{ t('cardNoLengthTips') }}</div>
                            </div>
                        </el-form-item>

                        <el-form-item :label="t('cardPrefix')" v-show="giftcardEdit.formData.type == 'real'">
                            <el-input v-model.trim="giftcardEdit.formData.card_prefix" clearable :placeholder="t('cardPrefixPlaceholder')" class="input-width" maxlength="10" />
                        </el-form-item>

                        <el-form-item :label="t('cardSuffix')" v-show="giftcardEdit.formData.type == 'real'">
                            <el-input v-model.trim="giftcardEdit.formData.card_suffix" clearable :placeholder="t('cardSuffixPlaceholder')" class="input-width" maxlength="10" />
                        </el-form-item>

                        <el-form-item :label="t('cardKeyWay')" prop="card_key_way" v-show="giftcardEdit.formData.type == 'real'">
                            <el-checkbox-group v-model="giftcardEdit.formData.card_key_way">
                                <el-checkbox label="0-9">0-9</el-checkbox>
                                <el-checkbox label="a-z">a-z</el-checkbox>
                                <el-checkbox label="A-Z">A-Z</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>

                        <el-form-item :label="t('cardKeyLength')" prop="card_key_length" v-show="giftcardEdit.formData.type == 'real'">
                            <div>
                                <el-input v-model.trim="giftcardEdit.formData.card_key_length" clearable :placeholder="t('cardKeyLengthPlaceholder')" class="input-width-short" maxlength="2" @keyup="filterNumber($event)" />
                                <div class="mt-[10px] text-[12px] text-[#999] leading-[20px]">{{ t('cardKeyLengthTips') }}</div>
                            </div>
                        </el-form-item>

                        <el-form-item :label="t('poster')">
                            <el-select v-model="giftcardEdit.formData.poster_id" :placeholder="t('posterPlaceholder')" clearable>
                                <el-option v-for="item in giftcardEdit.posterOptions" :key="item.id" :label="item.name" :value="item.id" />
                            </el-select>
                            <div class="ml-[10px]">
                                <span class="cursor-pointer text-primary mr-[10px]" @click="giftcardEdit.refreshPoster(true)">{{ t('refresh') }}</span>
                                <span class="cursor-pointer text-primary" @click="giftcardEdit.toPosterEvent">{{ t('addPoster') }}</span>
                            </div>
                        </el-form-item>

                        <div class="ml-[120px] mb-[10px] text-[12px] text-[#999] leading-[20px]">{{ t('posterTips') }}</div>

                        <el-form-item :label="t('status')">
                            <el-switch v-model.trim="giftcardEdit.formData.status" :active-value="1" :inactive-value="0" />
                        </el-form-item>

                        <el-form-item :label="t('isGive')" >
                            <div>
                                <el-switch v-model="giftcardEdit.formData.is_give" :active-value="1" :inactive-value="0" />
                                <div class="mt-[10px] text-[12px] text-[#999] leading-[20px]">{{ t('isGiveTips') }}</div>
                            </div>
                        </el-form-item>

                        <el-form-item :label="t('receiveValidityTime')" prop="receive_validity_time" v-show="giftcardEdit.formData.is_give">
                            <div>
                                <p class="!text-sm">
                                    <el-input v-model="giftcardEdit.formData.receive_validity_time" class="!w-[120px] mr-[10px]" @keyup="filterNumber($event)" clearable maxlength="4" />
                                    <span>小时</span>
                                </p>
                                <p class="text-[12px] text-[#a9a9a9] leading-normal mt-[5px]">{{ t('receiveValidityTimeRangeDefaultTips') }}</p>
                            </div>
                        </el-form-item>

                        <div v-show="giftcardEdit.formData.is_give">
                            <!-- 祝福语 -->
                            <el-form-item :label="t('cardBlessing')" prop="card_blessing">
                                <div class="card-blessing-wrap">
                                    <div class="blessing-item-wrap">
                                        <ul ref="cardBlessingRef" v-if="giftcardEdit.formData.blessing_json.length">
                                            <li class="draggable-element" v-for="(item, index) in giftcardEdit.formData.blessing_json" :key="item.id">
                                                <el-input v-model.trim="item.blessing" clearable :placeholder="t('cardBlessingPlaceholder')" class="input-width" :suffix-icon="Rank" maxlength="20" />
                                                <el-icon class="icon" :size="20" color="#7b7b7b" @click="giftcardEdit.deleteBlessing(index)">
                                                    <CircleCloseFilled />
                                                </el-icon>
                                            </li>
                                        </ul>
                                        <span class="text-primary text-[14px] add-value" @click="giftcardEdit.addBlessing" v-show="giftcardEdit.formData.blessing_json.length == 0 || giftcardEdit.formData.blessing_json.length < 10">{{ t('addBlessing') }}</span>
                                    </div>
                                    <div class="mt-[10px] text-[12px] text-[#999] leading-[20px]">{{ t('cardBlessingTips') }}</div>
                                </div>
                            </el-form-item>
                        </div>

                        <el-form-item :label="t('sort')">
                            <el-input v-model.trim="giftcardEdit.formData.sort" clearable :placeholder="t('sortPlaceholder')" class="input-width-mid" show-word-limit maxlength="8" @keyup="filterNumber($event)" />
                        </el-form-item>
                    </el-form>
                </el-tab-pane>

                <el-tab-pane :label="t('cardRightTab')" name="card_right">
                    <el-form :model="giftcardEdit.formData" label-width="120px" ref="cardRightFormRef" :rules="giftcardEdit.formRules" class="page-form">
                        <el-form-item :label="t('cardRightType')">
                            <el-radio-group v-model="giftcardEdit.formData.card_right_type">
                                <el-radio v-for="item in giftcardEdit.giftcardCardRightType" :key="item.type" :label="item.type" :disabled="giftcardEdit.formData.giftcard_id">{{ item.name }}</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <div v-show="giftcardEdit.formData.card_right_type == 'balance'">

                            <!-- 储值卡（充值余额） -->
                            <el-form-item :label="t('cardRightBalance')" prop="card_right_balance">
                                <div class="card-right-balance-wrap">
                                    <div class="balance-item-wrap">
                                        <ul ref="cardRightBalanceRef" v-if="giftcardEdit.formData.balance_json.length">
                                            <li class="draggable-element" v-for="(item, index) in giftcardEdit.formData.balance_json" :key="item.id">
                                                <el-input v-model.trim="item.balance" clearable :placeholder="t('cardRightBalancePlaceholder')" class="input-width" :suffix-icon="Rank" maxlength="6" @keyup="filterNumber($event)"/>
                                                <el-icon class="icon" :size="20" color="#7b7b7b" @click="giftcardEdit.deleteBalance(index)">
                                                    <CircleCloseFilled />
                                                </el-icon>
                                            </li>
                                        </ul>
                                        <span class="text-primary text-[14px] add-balance-value" @click="giftcardEdit.addBalance" v-show="giftcardEdit.formData.balance_json.length == 0 || giftcardEdit.formData.balance_json.length < 9">{{ t('addBalance') }}</span>
                                    </div>
                                </div>
                            </el-form-item>

                            <el-form-item prop="card_right_balance_price" v-if="giftcardEdit.formData.balance_json.length">

                                <el-table :data="giftcardEdit.formData.balance_json" size="large" max-height="600" style="max-width: 350px;">

                                    <el-table-column :label="t('cardRightBalance')" min-width="120">
                                        <template #default="{ row }">
                                            <div v-if="row.balance">￥{{ row.balance }}</div>
                                            <div v-else>--</div>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="t('cardBalancePrice')" min-width="200">
                                        <template #default="{ row }">
                                            <el-input v-model.trim="row.price" clearable placeholder="0.00" class="!w-[180px]" maxlength="8" @keyup="filterDigit($event)">
                                                <template #append>{{ t('yuan') }}</template>
                                            </el-input>
                                        </template>
                                    </el-table-column>

                                </el-table>
                            </el-form-item>
                        </div>

                        <!-- 兑换卡（提货商品） -->
                        <div v-show="giftcardEdit.formData.card_right_type == 'goods'">

                            <el-form-item :label="t('cardPrice')" prop="card_price">
                                <el-input v-model.trim="giftcardEdit.formData.card_price" clearable placeholder="0.00" class="input-width-mid" maxlength="8" @keyup="filterDigit($event)">
                                    <template #append>{{ t('yuan') }}</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item :label="t('deliveryWay')">
                                <el-radio-group v-model="giftcardEdit.formData.delivery_way" :disabled="giftcardEdit.formData.giftcard_id">
                                    <el-radio label="all">{{ t('deliveryAll') }}</el-radio>
                                    <el-radio label="batch">{{ t('deliveryBatch') }}</el-radio>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item :label="t('deliveryGoods')">
                                <div>
                                    <el-radio-group v-model="giftcardEdit.formData.card_goods_type" :disabled="giftcardEdit.formData.giftcard_id">
                                        <el-radio label="all">{{ t('deliveryGoodsAll') }}</el-radio>
                                        <el-radio label="diy">{{ t('deliveryGoodsDiy') }}</el-radio>
                                    </el-radio-group>
                                    <div class="mt-[10px] text-[12px] text-[#999] leading-[20px]">{{ t('deliveryGoodsTips') }}</div>
                                </div>
                            </el-form-item>
                            <el-form-item prop="card_goods_count" :label="t('cardGoodsCount')" v-show="giftcardEdit.formData.card_goods_type == 'diy'">
                                <el-input v-model.trim="giftcardEdit.formData.card_goods_count" clearable placeholder="0" class="!w-[140px]" maxlength="2" @keyup="filterNumber($event)">
                                    <template #append>{{ t('unit') }}</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item :label="t('selectGoods')" prop="card_right_select_goods">
                                <goods-select-popup ref="goodsSelectPopupRef" v-model="giftcardEdit.goodsIds" @goodsSelect="giftcardEdit.goodsSelect" way="single" mode="sku" :min="1" :max="99" />
                            </el-form-item>
                            <el-form-item v-if="giftcardEdit.goodsSkuList && giftcardEdit.goodsSkuList.length">

                                <el-table :data="giftcardEdit.goodsSkuList" size="large" max-height="400">
                                    <el-table-column prop="goods_id" :label="t('goodsSelectPopupGoodsInfo')" min-width="300">
                                        <template #default="{ row }">
                                            <div class="flex items-center cursor-pointer">
                                                <div class="min-w-[60px] h-[60px] flex items-center justify-center">
                                                    <el-image v-if="row.sku_image" class="w-[60px] h-[60px]" :src="img(row.sku_image)" fit="contain">
                                                        <template #error>
                                                            <div class="image-slot">
                                                                <img class="w-[60px] h-[60px]" src="@/addon/shop/assets/goods_default.png" />
                                                            </div>
                                                        </template>
                                                    </el-image>
                                                    <img v-else class="w-[70px] h-[60px]" src="@/addon/shop/assets/goods_default.png" fit="contain" />
                                                </div>
                                                <div class="ml-2">
                                                    <span :title="row.sku_name" class="multi-hidden">{{ row.sku_name ? row.goods_name + ' ' + row.sku_name : row.goods_name }}</span>
                                                    <span class="text-primary text-[12px]">{{ row.goods_type_name }}</span>
                                                </div>
                                            </div>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="price" :label="t('goodsSelectPopupPrice')" min-width="120">
                                        <template #default="{ row }">
                                            <div>￥{{ row.price }}</div>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="price" :label="t('num')" min-width="120" v-if="giftcardEdit.formData.card_goods_type == 'all'">
                                        <template #default="{ row }">
                                            <el-input v-model.trim="row.num" clearable @keyup="filterNumber($event)" placeholder="0" maxlength="8" />
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="stock" :label="t('goodsSelectPopupStock')" min-width="120" align="right" />

                                    <el-table-column :label="t('operation')"  align="right" min-width="160">
                                        <template #default="{ row,$index }">
                                            <el-button type="primary" link @click="giftcardEdit.deleteGoodsEvent(row,$index)">{{ t('delete') }}</el-button>
                                        </template>
                                    </el-table-column>

                                </el-table>
                            </el-form-item>

                        </div>

                    </el-form>
                </el-tab-pane>

                <el-tab-pane :label="t('giftcardDesc')" name="detail">
                    <el-form :model="giftcardEdit.formData" label-width="120px" ref="detailFormRef" :rules="giftcardEdit.formRules" class="page-form">
                        <el-form-item :label="t('cardInstruction')" prop="instruction">
                            <editor v-model="giftcardEdit.formData.instruction" :height="400" class="editor-width" />
                        </el-form-item>
                    </el-form>
                    <el-form :model="giftcardEdit.formData" label-width="120px" ref="detailFormRef" :rules="giftcardEdit.formRules" class="page-form">
                        <el-form-item :label="t('cardDesc')" prop="card_desc">
                            <editor v-model="giftcardEdit.formData.card_desc" :height="400" class="editor-width" />
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>

        </el-card>
         <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="giftcardEdit.save()">{{ t('save') }}</el-button>
                <el-button @click="giftcardEdit.back()">{{ t('cancel') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { useGiftcardEdit } from './public/js/useGiftcardEdit'
import { filterNumber,img,filterDigit } from '@/utils/common'
import { Rank, ArrowLeft } from '@element-plus/icons-vue'
import goodsSelectPopup from '@/addon/shop/views/goods/components/goods-select-popup.vue'
import materialSelectPopup from '@/addon/shop_giftcard/views/giftcard/components/material-select-popup.vue'

const basicFormRef = ref<FormInstance>()
const cardRightFormRef = ref<FormInstance>()
const detailFormRef = ref<FormInstance>()
const cardBlessingRef = ref()
const cardRightBalanceRef = ref() // 拖拽面值

const giftcardEdit = useGiftcardEdit({
    getFormRef() {
        return {
            basicFormRef: basicFormRef.value,
            cardRightFormRef: cardRightFormRef.value,
            detailFormRef: detailFormRef.value,
            cardBlessingRef: cardBlessingRef.value,
            cardRightBalanceRef: cardRightBalanceRef.value
        }
    },
})
</script>
<style lang="scss" scoped>
    @import 'public/css/giftcard_edit.scss';
</style>
<style lang="scss">
    .edui-default .edui-editor{
        z-index: 1 !important;
    }
    .el-cascader__tags.is-validate{
        right: 30px !important;
    }
</style>