<template>
  <div class="main-container">
    <el-card class="card !border-none mb-[15px]" shadow="never">
      <el-page-header :content="id ? t('editGoods') : t('addGoods')" :icon="ArrowLeft" @back="back" />
    </el-card>
    <el-card class="box-card !border-none" shadow="never">
      <el-tabs v-model="activeName">
        <el-tab-pane :label="t('basicInfoTab')" name="basic">
          <el-form :model="formData" label-width="100px" ref="basicFormRef" :rules="formRules" class="page-form">
            <el-form-item :label="t('goodsName')" prop="goods_name">
              <el-input v-model.trim="formData.goods_name" clearable :placeholder="t('goodsNamePlaceholder')" class="input-width" maxlength="60" />
            </el-form-item>
            <el-form-item :label="t('categoryId')" prop="goods_category">
              <el-cascader
                class="input-width"
                v-model="formData.goods_category"
                :options="categoryList"
                :props="{ value: 'value', label: 'label', emitPath: false }"
              />
              <div class="ml-[10px]">
                <span class="cursor-pointer text-primary mr-[10px]" @click="checkCategory(true)">{{ t('refresh') }}</span>
                <span class="cursor-pointer text-primary" @click="toPosterEvent2">{{ t('addGoodsproject') }}</span>
              </div>
            </el-form-item>
            <el-form-item :label="t('goodsImage')" prop="goods_image">
              <div>
                <upload-image v-model="formData.goods_image" :limit="6" />
                <div class="text-[12px] text-[#999]">建议上传图片的大小为150px*150px</div>
              </div>
            </el-form-item>
            <el-form-item :label="t('virtualSaleNum')" prop="virtual_sale_num">
              <el-input v-model.trim="formData.virtually_sale" clearable :placeholder="t('virtualSaleNumPlaceholder')" class="input-width" />
            </el-form-item>
            <el-form-item :label="t('sort')" prop="sort">
              <el-input v-model.trim="formData.sort" clearable :placeholder="t('sortPlaceholder')" class="input-width" show-word-limit maxlength="8" />
            </el-form-item>
            <el-form-item :label="t('status')">
              <el-radio-group v-model="formData.status" class="ml-4">
                <el-radio label="1">{{ t('up') }}</el-radio>
                <el-radio label="0">{{ t('down') }}</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item :label="t('poster')">
              <el-select v-model="formData.poster_id" :placeholder="t('posterPlaceholder')" clearable>
                <el-option v-for="item in posterOptions" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
              <div class="ml-[10px]">
                <span class="cursor-pointer text-primary mr-[10px]" @click="refreshGoodsPoster(true)">{{ t('refresh') }}</span>
                <span class="cursor-pointer text-primary" @click="toPosterEvent">{{ t('addGoodsPoster') }}</span>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :label="t('goodsChargeTab')" name="goods_charge">
          <el-form :model="formData" label-width="100px" ref="goodsFormRef" :rules="formRules" class="page-form">
            <el-form-item :label="t('goodsModel')">
              <el-radio-group v-model="formData.buy_type" class="ml-4">
                <el-radio label="reservation">{{ t('order') }}</el-radio>
                <el-radio label="buy">{{ t('fixedPrice') }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 预约 -->
            <template v-if="formData.buy_type == 'reservation'">
              <el-form-item :label="t('freeReservation')" prop="free">
                <el-switch v-model="formData.free" />
              </el-form-item>
              <el-form-item :label="t('orderPrice')" prop="price" v-if="!formData.free">
                <div>
                  <el-input v-model.trim="formData.price" clearable class="!w-[160px]" @keyup="filterDigit($event)">
                    <template #append>
                      <span>元</span>
                    </template>
                  </el-input>
                  <p class="text-[12px] text-[#a9a9a9]">0即为免费预约</p>
                </div>
              </el-form-item>
              <el-form-item :label="t('priceList')">
                <div class="add-product">
                  <el-table :data="formData.price_list" style="width: 800px">
                    <el-table-column :label="t('productName')" class="ml-[20px]">
                      <template #default="scope">
                        <el-form-item
                          :prop="`price_list[${scope.$index}].name`"
                          :rules="[{ required: true, message: t('productNamePlaceholder'), trigger: 'blur' }]"
                        >
                          <el-input v-model.trim="scope.row.name" clearable :placeholder="t('productNamePlaceholder')" class="!w-[200px]" maxlength="60" />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column :label="t('productPrice')" width="200">
                      <template #default="scope">
                        <el-form-item
                          :prop="`price_list[${scope.$index}].price`"
                          :rules="[{
                                                    trigger: 'blur',
                                                    validator: (rule: any, value: any, callback: any) => {
                                                        if (value == '') {
                                                            callback(t('productPricePlaceholder'))
                                                        } else if (value < 0) {
                                                            callback(t('priceNotZeroTips'))
                                                        } else {
                                                            callback()
                                                        }
                                                    }
                                                }]"
                        >
                          <el-input v-model.trim="scope.row.price" clearable class="!w-[160px]" @keyup="filterDigit($event)">
                            <template #append>
                              <span>元</span>
                            </template>
                          </el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column :label="t('productUnit')" width="200">
                      <template #default="scope">
                        <el-form-item :prop="`price_list[${scope.$index}].unit`" :rules="[{ required: true, message: t('productUnitTips'), trigger: 'blur' }]">
                          <el-input v-model.trim="scope.row.unit" clearable :placeholder="t('productUnitPlaceholder')" class="!w-[160px]" />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column :label="t('operations')" width="150">
                      <template #default="scope">
                        <el-button link type="primary" @click.prevent="deleteRow(scope.$index)">
                          {{ t('delete') }}
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button type="primary" @click="onAddItem()" class="mt-[15px]">{{ t('addItem') }}</el-button>
                  <p class="text-[12px] text-[#a9a9a9]">价目表显示在项目详情作为参考，价格透明，有助于客户下单，预约后实际支付按照技师报价结算</p>
                </div>
              </el-form-item>
            </template>
            <!-- 一口价 -->
            <template v-if="formData.buy_type == 'buy'">
              <el-form-item :label="t('goodsSpecification')">
                <el-radio-group v-model="formData.spec_type" class="ml-4">
                  <el-radio label="single">{{ t('singleSpecification') }}</el-radio>
                  <el-radio label="multi">{{ t('moreSpecification') }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <!-- 单规格 -->
              <template v-if="formData.spec_type == 'single'">
                <el-form-item :label="t('goodsPrice')" prop="price">
                  <el-input v-model.trim="formData.price" clearable class="!w-[160px]" @keyup="filterDigit($event)">
                    <template #append>
                      <span>元</span>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item :label="t('skuNo')" prop="sku_no">
                  <el-input v-model.trim="formData.sku_no" clearable :placeholder="t('skuNoPlaceholder')" class="!w-[160px]" />
                </el-form-item>
                <el-form-item :label="t('goodsUnit')" prop="sku_unit">
                  <el-input v-model.trim="formData.sku_unit" clearable :placeholder="t('productUnitPlaceholder')" class="!w-[160px]" />
                </el-form-item>
                <el-form-item :label="t('miniGoods')" prop="min_buy">
                  <el-input
                    v-model.trim="formData.min_buy"
                    clearable
                    :placeholder="t('miniGoodsPlaceholder')"
                    class="!w-[160px]"
                    @keyup="filterNumber($event)"
                  />
                </el-form-item>
              </template>
              <!-- 多规格 -->
              <template v-if="formData.spec_type == 'multi'">
                <el-form-item>
                  <div class="server-tables">
                    <el-table :data="formData.goods_sku_data" style="width: 1500px">
                      <el-table-column :label="t('productName')">
                        <template #default="scope">
                          <el-form-item
                            :prop="`goods_sku_data[${scope.$index}].sku_name`"
                            :rules="[{ required: true, message: t('productNamePlaceholder'), trigger: 'blur' }]"
                          >
                            <el-input
                              v-model.trim="scope.row.sku_name"
                              clearable
                              :placeholder="t('productNamePlaceholder')"
                              class="!w-[200px]"
                              maxlength="60"
                            />
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column label="图片" width="100">
                        <template #default="scope">
                          <upload-image v-model="scope.row.sku_image" :limit="1" width="50px" height="50px" />
                        </template>
                      </el-table-column>
                      <el-table-column :label="t('goodsPrice')" width="200">
                        <template #default="scope">
                          <el-form-item
                            :prop="`goods_sku_data[${scope.$index}].price`"
                            :rules="[{
                                                        trigger: 'blur',
                                                        validator: (rule: any, value: any, callback: any) => {
                                                            if (value === '') {
                                                                callback(t('goodsPricePlaceholder'))
                                                            } else if (value <= 0) {
                                                                callback(t('goodsPriceNotZeroTips'))
                                                            } else {
                                                                callback()
                                                            }
                                                        }
                                                    }]"
                          >
                            <el-input v-model.trim="scope.row.price" clearable class="!w-[160px]" @keyup="filterDigit($event)">
                              <template #append>
                                <span>元</span>
                              </template>
                            </el-input>
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column :label="t('productUnit')" width="200">
                        <template #default="scope">
                          <el-form-item
                            :prop="`goods_sku_data[${scope.$index}].sku_unit`"
                            :rules="[{ required: true, message: t('productUnitTips'), trigger: 'blur' }]"
                          >
                            <el-input v-model.trim="scope.row.sku_unit" clearable :placeholder="t('productUnitPlaceholder')" class="!w-[160px]" />
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column width="200">
                        <template #header>
                          <div class="flex items-center">
                            {{ t('miniGoods') }}
                            <el-tooltip class="box-item" effect="light" :content="t('miniServiceTips')" placement="bottom">
                              <el-icon class="cursor-pointer">
                                <QuestionFilled />
                              </el-icon>
                            </el-tooltip>
                          </div>
                        </template>
                        <template #default="scope">
                          <el-form-item
                            :prop="`goods_sku_data[${scope.$index}].min_buy`"
                            :rules="[
                                                         {required: true, message: t('miniGoodsPlaceholder'), trigger: 'blur' },
                                                         {trigger: 'blur',
                                                            validator: (rule: any, value: any, callback: any) => {
                                                                if (value <= 0) {
                                                                    callback(t('minBuyNotZeroTips'))
                                                                } else {
                                                                    callback()
                                                                }
                                                            }
                                                        }]"
                          >
                            <el-input
                              v-model.trim="scope.row.min_buy"
                              clearable
                              :placeholder="t('miniGoodsPlaceholder')"
                              class="!w-[160px]"
                              @keyup="filterNumber($event)"
                            />
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column :label="t('skuNo')" class="ml-[20px]">
                        <template #default="scope">
                          <el-form-item :prop="`goods_sku_data[${scope.$index}].sku_no`">
                            <el-input v-model.trim="scope.row.sku_no" clearable :placeholder="t('skuNoPlaceholder')" class="!w-[200px]" />
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column label="默认规格" width="200">
                        <template #default="scope">
                          <el-form-item>
                            <el-switch
                              v-model="scope.row.is_default"
                              :active-value="1"
                              :inactive-value="0"
                              @change="specValueIsDefaultChangeListener($event, scope.$index)"
                            />
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column :label="t('operations')" width="150">
                        <template #default="scope">
                          <el-button link type="primary" @click.prevent="deleteMoreRow(scope.$index)">
                            {{ t('delete') }}
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <el-button type="primary" @click="AddMoreItem()" class="mt-[15px]">{{ t('addspec') }}</el-button>
                  </div>
                </el-form-item>
              </template>
            </template>
            <!-- <el-form-item :label="t('ifaAfterSale')">
                            <el-radio-group v-model="formData.after_sales" class="ml-4">
                                <el-radio :label="0">{{ t('afterSale') }}</el-radio>
                                <el-radio :label="1">{{ t('noAfterSale') }}</el-radio>
                            </el-radio-group>
                        </el-form-item> -->
            <el-form-item :label="t('memberDiscount')" v-if="formData.buy_type == 'buy'">
              <div>
                <el-radio-group v-model="formData.member_discount">
                  <el-radio label="">{{ t('nonparticipation') }}</el-radio>
                  <el-radio label="discount">{{ t('discount') }}</el-radio>
                  <el-radio label="fixed_price">{{ t('goodsFixedPrice') }}</el-radio>
                </el-radio-group>
                <div class="text-[12px] text-[#999] leading-[20px]" v-if="formData.member_discount == 'discount'">{{ t('discountHint') }}</div>
                <div class="text-[12px] text-[#999] leading-[20px]" v-if="formData.member_discount == 'fixed_price'">{{ t('fixedPriceHint') }}</div>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :label="t('goodsDescTab')" name="detail">
          <el-form :model="formData" label-width="100px" ref="detailFormRef" :rules="formRules" class="page-form">
            <el-form-item :label="t('goodsContent')">
              <editor v-model="formData.goods_content" />
            </el-form-item>
            <el-form-item :label="t('buyInfo')">
              <editor v-model="formData.buy_info" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <div class="fixed-footer-wrap">
      <div class="fixed-footer">
        <el-button type="primary" @click="onSave()">{{ t('save') }}</el-button>
        <el-button @click="back()">{{ t('cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed } from 'vue'
  import { t } from '@/lang'
  import { cloneDeep } from 'lodash-es'
  import type { FormInstance, ElMessage } from 'element-plus'
  import { getCategoryTree } from '@/addon/o2o/api/category'
  import { addGoods, editGoods, getGoodsDetail } from '@/addon/o2o/api/goods'
  import { useRoute, useRouter } from 'vue-router'
  import { filterNumber, filterDigit } from '@/utils/common'
  import { getPosterList } from '@/app/api/poster'

  const route = useRoute()
  const router = useRouter()
  const id: number = parseInt(route.query.id)
  const loading = ref(false)
  const activeName = ref('basic')
  /**
   * 表单数据
   */
  const initialFormData = {
    goods_id: '',
    goods_name: '', // 项目名称
    goods_image: '', // 项目图片
    goods_category: '', // 项目分类
    virtually_sale: '', // 虚拟销量
    sort: '', // 排序
    status: '1', // 状态 0下架 1上架
    buy_type: 'reservation', // 服务模式 reservation-预约 buy-购买(一口价)
    price_list: [], // 价目表
    spec_type: 'single',
    free: false,
    price: '', // 预约价格 单规格服务价
    sku_no: '', // 单规格编号
    sku_unit: '次', // 单规格单位
    min_buy: '1', // 单规格最小服务量
    goods_sku_data: [], // 多规格
    after_sales: 0, // 是否支持售后0-是 1-否
    goods_content: '',
    buy_info: '',
    poster_id: '',
    member_discount: ''
  }
  const formData: Record<string, any> = reactive({ ...initialFormData })

  const setFormData = async (id: number = 0) => {
    Object.assign(formData, initialFormData)
    const data = await (await getGoodsDetail({ goods_id: id })).data.goods_info
    Object.keys(formData).forEach((key: string) => {
      if (data[key] != undefined) formData[key] = data[key]
      if (data[key] != undefined && key == 'goods_category') formData[key] = Number(data[key])
    })
    if (formData.spec_type == 'single') {
      formData.price = data.sku_list[0].price
      formData.sku_no = data.sku_list[0].sku_no
      formData.sku_unit = data.sku_list[0].sku_unit
      formData.min_buy = data.sku_list[0].min_buy
      if (Number(formData.price) == 0) {
        formData.free = true
      }
    }
    formData.goods_sku_data = data.sku_list
  }
  if (id) setFormData(id)

  const categoryList = reactive([])
  const checkCategory = async (row: any = null) => {
    // 查询商品分类树结构
    getCategoryTree().then((res) => {
      const data = res.data
      if (data) {
        const goodsCategoryTree: any = []
        data.forEach((item: any) => {
          const children: any = []
          if (item.children) {
            item.children.forEach((childItem: any) => {
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
        categoryList.splice(0, categoryList.length, ...goodsCategoryTree)
      }
      if (row) {
        ElMessage.success(t('refreshSuccess'))
      }
    })
  }
  checkCategory()

  // 海报列表下拉框
  const posterOptions = reactive([])

  // 跳转到海报列表，添加海报
  const toPosterEvent = () => {
    const url = router.resolve({
      path: '/poster/list'
    })
    window.open(url.href)
  }
  // 跳转到项目分类
  const toPosterEvent2 = () => {
    const url = router.resolve({
      path: '/site/o2o/goods/category'
    })
    window.open(url.href)
  }
  // 商品海报
  const refreshGoodsPoster = (bool = false) => {
    getPosterList({
      type: 'o2o_goods'
    }).then((res) => {
      const data = res.data
      if (data) {
        posterOptions.splice(0, posterOptions.length, ...data)
        if (bool) {
          ElMessage({
            message: t('refreshSuccess'),
            type: 'success'
          })
        }
      }
      if (bool) {
        ElMessage.success(t('refreshSuccess'))
      }
    })
  }

  refreshGoodsPoster()

  const basicFormRef = ref<FormInstance>()
  const goodsFormRef = ref<FormInstance>()
  const detailFormRef = ref<FormInstance>()

  // 正则表达式
  const regExp = {
    required: /[\S]+/,
    number: /^\d{0,10}$/,
    digit: /^\d{0,10}(.?\d{0,2})$/,
    special: /^\d{0,10}(.?\d{0,3})$/
  }
  // 表单验证规则
  const formRules = computed(() => {
    return {
      goods_name: [{ required: true, message: t('goodsNamePlaceholder'), trigger: 'blur' }],
      goods_image: [{ required: true, message: t('goodsImagePlaceholder'), trigger: 'change' }],
      goods_category: [{ required: true, message: t('categoryIdPlaceholder'), trigger: 'change' }],
      sort: [
        {
          trigger: 'blur',
          validator: (rule: any, value: any, callback: any) => {
            if (isNaN(value) || !regExp.number.test(value)) {
              callback(new Error(t('sortTips')))
            } else {
              callback()
            }
          }
        }
      ],
      price: [
        {
          required: true,
          trigger: 'blur',
          validator: (rule: any, value: any, callback: any) => {
            if (value == '' && formData.buy_type == 'reservation') {
              callback(new Error(t('orderPricePricePlaceholder')))
            } else if (value == '' && formData.buy_type == 'buy') {
              callback(new Error(t('goodsPricePlaceholder')))
            } else if (value < 0 && formData.buy_type == 'reservation') {
              callback(new Error(t('orderPriceNotZeroTips')))
            } else if (value <= 0 && formData.buy_type == 'buy') {
              callback(new Error(t('goodsPriceNotZeroTips')))
            } else {
              callback()
            }
          }
        }
      ],
      sku_unit: [{ required: true, message: t('productUnitTips'), trigger: 'blur' }],
      min_buy: [
        { required: true, message: t('miniGoodsPlaceholder'), trigger: 'blur' },
        {
          trigger: 'blur',
          validator: (rule: any, value: any, callback: any) => {
            if (value <= 0) {
              callback(new Error(t('minBuyNotZeroTips')))
            } else {
              callback()
            }
          }
        }
      ]
    }
  })
  const verify = (callback: any) => {
    const formRef = [
      {
        key: 'basic',
        verify: false,
        ref: basicFormRef.value
      },
      {
        key: 'goods_charge',
        verify: false,
        ref: goodsFormRef.value
      },
      {
        key: 'detail',
        verify: false,
        ref: detailFormRef.value
      }
    ]
    formRef.forEach((el: any, index) => {
      el.ref.validate((valid: any) => {
        el.verify = valid
      })
    })

    setTimeout(() => {
      let verify = true
      // 检测验证，并且定位tab页面
      for (let i = 0; i < formRef.length; i++) {
        if (formRef[i].verify == false) {
          activeName.value = formRef[i].key
          verify = false
          break
        }
      }
      if (verify && callback) callback()
    }, 10)
  }

  const onSave = () => {
    verify(() => {
      loading.value = true
      if (formData.goods_sku_data.length) {
        const isDefalut = formData.goods_sku_data.some((item) => {
          return item.is_default
        })
        if (!isDefalut) {
          ElMessage({
            message: '请选择多规格的默认规格',
            type: 'error'
          })
          return
        }
      }
      if (formData.free) {
        formData.price = 0
      }
      const data = cloneDeep(formData)
      data.price_list = JSON.stringify(data.price_list)
      data.goods_sku_data = JSON.stringify(data.goods_sku_data)
      const save = id ? editGoods : addGoods
      save(data)
        .then((res) => {
          loading.value = false
          history.back()
        })
        .catch(() => {
          loading.value = false
        })
    })
  }

  const back = () => {
    history.back()
  }

  // 添加项目
  const onAddItem = () => {
    formData.price_list.push({
      name: '',
      price: '0',
      unit: '次'
    })
  }
  // 删除项目
  const deleteRow = (index: number) => {
    formData.price_list.splice(index, 1)
  }
  // 多规格添加项目
  const AddMoreItem = () => {
    if (formData.goods_sku_data.length > 0) {
      formData.goods_sku_data.push({
        sku_no: '',
        sku_image: '',
        sku_name: '',
        price: '0',
        sku_unit: '次',
        min_buy: 1,
        is_default: 0
      })
    } else {
      formData.goods_sku_data.push({
        sku_no: '',
        sku_image: '',
        sku_name: '',
        price: '0',
        sku_unit: '次',
        min_buy: 1,
        is_default: 1
      })
    }
  }
  const deleteMoreRow = (index: number) => {
    formData.goods_sku_data.splice(index, 1)
  }
  // 设置默认规格
  const specValueIsDefaultChangeListener = (value: any, key: any) => {
    for (const k in formData.goods_sku_data) {
      if (k == key) {
        formData.goods_sku_data[k].is_default = value
      } else {
        formData.goods_sku_data[k].is_default = 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  :deep(.product-price .el-form-item) {
    margin-bottom: 0px !important;
  }
  .add-product :deep(.el-table__body .el-table__cell) {
    height: 68px !important;
  }
  .add-product :deep(.el-table__cell .cell) {
    overflow: initial !important;
    padding: 0 12px;
  }
  .server-tables :deep(.el-table__body .el-table__cell) {
    height: 68px !important;
  }
  .server-tables :deep(.el-table__cell .cell) {
    overflow: initial !important;
    padding: 0 12px;
  }
</style>
