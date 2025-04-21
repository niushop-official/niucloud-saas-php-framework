import { reactive, ref, computed, nextTick } from 'vue'
import { t } from '@/lang'
import { TabsPaneContext, ElMessage } from 'element-plus'
import Sortable from 'sortablejs'
import { range, cloneDeep } from 'lodash-es'
import { useRoute, useRouter } from 'vue-router'
import {
    getGiftcardType,
    getGiftcardCardRightType,
    getGiftcardInit,
    addGiftcard,
    editGiftcard
} from '@/addon/shop_giftcard/api/giftcard';
import { getCategoryList } from '@/addon/shop_giftcard/api/category'
import { getPosterList } from "@/app/api/poster";

// 礼品卡添加/编辑
export function useGiftcardEdit(params: any = {}) {

    const route = useRoute()
    const router = useRouter()

    const repeat = ref(false)

    // 表单数据
    const formData: any = reactive({
        // 基础信息
        giftcard_id: 0,
        type: 'virtual',
        card_name: '',
        category_id: '',
        cover: '',
        material_ids: '',
        card_price: 0,
        is_give: 1,
        receive_validity_time: 24, // 领取有效期（小时，范围：1~24）
        blessing_json: [],
        validity_type: 'forever',
        validity_day: 30,
        validity_time: '',
        status: 1,
        sort: '',

        // 礼品卡权益
        card_right_type: 'balance',
        balance_json: [],
        delivery_way: 'all',
        card_goods_type: 'all',
        card_goods_count: '',

        // 制卡规则
        card_key_way: ['0-9'],
        card_key_length: 6,
        card_no_length: 6,
        card_prefix: '',
        card_suffix: '',

        // 详情
        instruction: '',
        card_desc: '',

        // 礼品卡关联商品表
        goods_sku_relation: []
    });

    // 面值（要过滤为空的数据）
    const balanceJsonFilter: any = reactive([])

    const goodsIds: any = reactive([])
    const goodsSkuList: any = reactive([]);

    formData.giftcard_id = ref(route.query.giftcard_id || 0)

    const formRefArr: any = reactive({});

    const getFormRef = params.getFormRef;

    nextTick(() => {
        let formRef = getFormRef();
        for (let key in formRef) {
            formRefArr[key] = formRef[key];
        }
    });

    const activeName: any = ref('basic')
    const tabHandleClick = (tab: TabsPaneContext, event: Event) => {
        // console.log(tab, event)
    }

    // 礼品卡类型
    const giftcardType = reactive([])

    // 切换礼品卡类型
    const changeGiftcardType = (data: any) => {
        formData.type = data.type;
    }

    // 礼品卡类型
    getGiftcardType({}).then((res) => {
        const data = res.data
        if (data) {
            for (const k in data) {
                giftcardType.push(data[k])
            }
        }
    })

    // 礼品卡权益类型
    const giftcardCardRightType = reactive([])

    // 礼品卡权益类型
    getGiftcardCardRightType({}).then((res) => {
        const data = res.data
        if (data) {
            for (const k in data) {
                giftcardCardRightType.push(data[k])
            }
        }
    })

    // 礼品卡分类
    const categoryOptions = reactive([])

    // 跳转到礼品卡分类，添加分类
    const toCategoryEvent = () => {
        const url = router.resolve({
            path: '/shop_giftcard/category'
        })
        window.open(url.href)
    }

    // 刷新礼品卡分类
    const refreshCategory = (bool = false) => {
        getCategoryList({}).then((res) => {
            const data = res.data
            if (data) {
                categoryOptions.splice(0, categoryOptions.length, ...data)
                if (bool) {
                    ElMessage({
                        message: t('refreshSuccess'),
                        type: 'success'
                    })
                }
            }
        })
    }

    refreshCategory()

    // 海报列表下拉框
    const posterOptions = reactive([])

    // 跳转到海报列表，添加海报
    const toPosterEvent = () => {
        const url = router.resolve({
            path: '/poster/list'
        })
        window.open(url.href)
    }

    // 商品海报
    const refreshPoster = (bool = false) => {
        getPosterList({
            type: 'shop_giftcard_give'
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
        })
    }

    refreshPoster()

    const handleInit = () => {
        getGiftcardInit({
            giftcard_id: formData.giftcard_id
        }).then((res: any) => {
            const data = res.data
            if (data) {
                Object.assign(formData, data);
                if (formData.card_right_type == 'balance') {
                    let arr: any = [];
                    formData.balance_json.forEach((item: any) => {
                        if (item.balance) {
                            arr.push(cloneDeep(item));
                        }
                    });

                } else if (formData.card_right_type == 'goods') {
                    goodsIds.splice(0, goodsIds.length);
                    goodsSkuList.splice(0, goodsSkuList.length);
                    formData.goods_sku_relation.forEach((item: any) => {
                        goodsIds.push(item.sku_id)
                    })
                    data.goods_sku_list.forEach((item: any) => {
                        let num = 0;
                        for (let i = 0; i < formData.goods_sku_relation.length; i++) {
                            if (formData.goods_sku_relation[i].sku_id == item.sku_id) {
                                num = formData.goods_sku_relation[i].num;
                                break;
                            }
                        }
                        goodsSkuList.push({
                            goods_id: item.goods_id,
                            sku_id: item.sku_id,
                            goods_type_name: item.goods.goods_type_name,
                            price: item.price,
                            sku_image: item.sku_image,
                            goods_name: item.goods.goods_name,
                            sku_name: item.sku_name,
                            stock: item.stock,
                            num
                        });
                    })
                }
                if (formData.validity_type == 'date') {
                    formData.validity_time = new Date(formData.validity_time)
                }

                nextTick(() => {
                    bindBlessingValue();
                    bindBalanceValue();
                });
            }
        })

    }

    if (formData.giftcard_id) {
        handleInit();
    }

    // 生成随机数
    const generateRandom = (len: number = 5) => {
        return Number(Math.random().toString().substr(3, len) + Date.now()).toString(36)
    }

    // 绑定拖拽祝福语事件
    const bindBlessingValue = () => {
        if (!getFormRef().cardBlessingRef) return

        const item = getFormRef().cardBlessingRef
        const sortable = Sortable.create(item, {
            group: 'draggable-element',
            animation: 200,
            // 结束拖拽
            onEnd: event => {
                const temp = formData.blessing_json[event.oldIndex!]
                formData.blessing_json.splice(event.oldIndex!, 1)
                formData.blessing_json.splice(event.newIndex!, 0, temp)

                nextTick(() => {
                    sortable.sort(
                        range(formData.blessing_json.length).map(value => {
                            return value.toString()
                        })
                    )
                })
            }
        })
    }

    // 添加祝福语
    const addBlessing = () => {
        if (formData.blessing_json.length > 10) {
            ElMessage({
                type: 'warning',
                message: `${ t('maxAddBlessingTips') }`
            })
            return
        }
        formData.blessing_json.push({
            id: generateRandom(),
            blessing: '', // 祝福语
        })
        bindBlessingValue();
    }

    // 删除祝福语
    const deleteBlessing = (index: number) => {
        formData.blessing_json.splice(index, 1)
    }

    // 绑定拖拽面值事件
    const bindBalanceValue = () => {
        if (!getFormRef().cardRightBalanceRef) return

        const item = getFormRef().cardRightBalanceRef
        const sortable = Sortable.create(item, {
            group: 'draggable-element',
            animation: 200,
            // 结束拖拽
            onEnd: event => {
                const temp = formData.balance_json[event.oldIndex!]
                formData.balance_json.splice(event.oldIndex!, 1)
                formData.balance_json.splice(event.newIndex!, 0, temp)

                nextTick(() => {
                    sortable.sort(
                        range(formData.balance_json.length).map(value => {
                            return value.toString()
                        })
                    )
                })
            }
        })
    }

    // 添加面值
    const addBalance = () => {
        if (formData.balance_json.length > 10) {
            ElMessage({
                type: 'warning',
                message: `${ t('maxAddBalanceTips') }`
            })
            return
        }
        formData.balance_json.push({
            id: generateRandom(),
            balance: '', // 面值余额
            price: '' // 价格
        })
        bindBalanceValue();
    }

    // 删除面值
    const deleteBalance = (index: number) => {
        formData.balance_json.splice(index, 1)
    }

    // 商品选择回调
    const goodsSelect = (value: any) => {
        goodsSkuList.splice(0, goodsSkuList.length);
        for (let key in value) {
            let goods_sku: any = value[key];
            let sku: any = {
                goods_id: goods_sku.goods_id,
                sku_id: goods_sku.sku_id,
                goods_type_name: goods_sku.goods_type_name,
                price: goods_sku.price,
                sku_image: goods_sku.sku_image,
                goods_name: goods_sku.goods_name,
                sku_name: goods_sku.sku_name,
                stock: goods_sku.stock,
                num: 1, // 初始数量
            };
            goodsSkuList.push(sku);
        }
    }

    // 删除商品
    const deleteGoodsEvent = (row: any, index: any) => {
        goodsSkuList.splice(index, 1);
        goodsIds.splice(goodsIds.indexOf(row.sku_id), 1);
    }

    // 正则表达式
    const regExp: any = {
        required: /[\S]+/,
        number: /^\d{0,10}$/,
        digit: /^\d{0,10}(.?\d{0,2})$/,
        special: /^\d{0,10}(.?\d{0,3})$/
    }

    // 表单验证规则
    const formRules = computed(() => {

        let rules = {
            card_name: [
                {
                    required: true,
                    trigger: 'blur',
                    validator: (rule: any, value: any, callback: any) => {
                        if (value === '') {
                            callback(new Error(t('cardNamePlaceholder')))
                        }
                        if (value.length > 20) {
                            callback(new Error(t('cardNameMaxLengthTips')))
                        } else {
                            callback()
                        }
                    }
                }
            ],
            category_id: [
                { required: true, message: t('categoryIdPlaceholder'), trigger: 'blur' }
            ],
            cover: [
                { required: true, message: t('coverPlaceholder'), trigger: 'blur' }
            ],
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
            // 礼品卡价格
            card_price: [
                {
                    trigger: 'blur',
                    validator: (rule: any, value: any, callback: any) => {
                        if (formData.card_right_type == 'goods') {
                            if (value === '') {
                                callback(new Error(t('cardPricePlaceholder')))
                            } else if (isNaN(value) || !regExp.digit.test(value)) {
                                callback(new Error(t('cardPriceTips')))
                            } else if (value < 0) {
                                callback(new Error(t('cardPriceNotZeroTips')))
                            }
                        }
                        callback()
                    }
                }
            ],
            validity_day: [
                {
                    required: true,
                    trigger: 'blur',
                    validator: (rule: any, value: any, callback: any) => {
                        if (formData.validity_type == 'day') {
                            if (value === '') {
                                callback(new Error(t('validityDayPlaceholder')))
                            } else if (isNaN(value) || !regExp.digit.test(value)) {
                                callback(new Error(t('validityDayTips')))
                            } else if (value <= 0) {
                                callback(new Error(t('validityDayNotZeroTips')))
                            } else {
                                callback()
                            }
                        } else {
                            callback()
                        }
                    }
                }
            ],
            validity_time: [
                {
                    required: true,
                    trigger: 'blur',
                    validator: (rule: any, value: any, callback: any) => {
                        if (formData.validity_type == 'date') {
                            if (value === '') {
                                callback(new Error(t('validityTimePlaceholder')))
                            } else if (formData.validity_time <= Date.now()) {
                                callback(new Error(t('validityTimeVerify')))
                            } else {
                                callback()
                            }
                        } else {
                            callback()
                        }
                    }
                }
            ],
            card_key_way: [
                {
                    required: true,
                    trigger: 'blur',
                    validator: (rule: any, value: any, callback: any) => {
                        if (formData.type == 'real') {
                            if (value === '') {
                                callback(new Error(t('cardKeyWayPlaceholder')))
                            } else {
                                callback()
                            }
                        } else {
                            callback()
                        }
                    }
                }
            ],
            card_no_length: [
                {
                    required: true,
                    trigger: 'blur',
                    validator: (rule: any, value: any, callback: any) => {
                        if (formData.type == 'real') {
                            if (value === '') {
                                callback(new Error(t('cardNoLengthPlaceholder')))
                            } else if (isNaN(value) || !regExp.digit.test(value)) {
                                callback(new Error(t('cardNoLengthInputTips')))
                            } else if (value < 6) {
                                callback(new Error(t('cardNoLengthNotZeroTips')))
                            } else if (value > 20) {
                                callback(new Error(t('cardNoLengthMaxTips')))
                            } else {
                                callback()
                            }
                        } else {
                            callback()
                        }
                    }
                }
            ],
            card_key_length: [
                {
                    required: true,
                    trigger: 'blur',
                    validator: (rule: any, value: any, callback: any) => {
                        if (formData.type == 'real') {
                            if (value === '') {
                                callback(new Error(t('cardKeyLengthPlaceholder')))
                            } else if (isNaN(value) || !regExp.digit.test(value)) {
                                callback(new Error(t('cardKeyLengthInputTips')))
                            } else if (value < 6) {
                                callback(new Error(t('cardKeyLengthNotZeroTips')))
                            } else if (value > 20) {
                                callback(new Error(t('cardKeyLengthMaxTips')))
                            } else {
                                callback()
                            }
                        } else {
                            callback()
                        }
                    }
                }
            ],
            receive_validity_time: [
                {
                    required: true,
                    trigger: 'blur',
                    validator: (rule: any, value: any, callback: any) => {
                        if (formData.is_give) {
                            if (value == '') {
                                return callback(new Error(t('receiveValidityTimePlaceholder')))
                            } else if (Number(value) >= 1 && Number(value) <= 24) {
                                return callback()
                            } else {
                                return callback(new Error(t('receiveValidityTimeRangeTips')))
                            }

                        }
                        callback()
                    }
                }
            ],
            card_blessing: [
                {
                    required: true,
                    trigger: 'blur',
                    validator: (rule: any, value: any, callback: any) => {
                        if (formData.is_give) {
                            let balanceArr: any = [];
                            let verify = false;
                            let msg = '';
                            for (let i = 0; i < formData.blessing_json.length; i++) {

                                if (formData.blessing_json[i].blessing) {

                                    if (balanceArr.indexOf(formData.blessing_json[i].blessing) == -1) {
                                        balanceArr.push(formData.blessing_json[i].blessing)
                                    } else {
                                        msg = t('cardBlessingRepeatTips')
                                        verify = true;
                                        break;
                                    }
                                } else {
                                    msg = t('cardBlessingPlaceholder')
                                    verify = true;
                                    break;
                                }
                            }

                            if (verify) callback(new Error(msg))
                        }
                        callback()
                    }
                }
            ],
            card_right_balance: [
                {
                    required: true,
                    trigger: 'blur',
                    validator: (rule: any, value: any, callback: any) => {
                        if (formData.card_right_type == 'balance') {
                            if (formData.balance_json.length == 0) {
                                callback(new Error(t('cardRightBalanceEmpty')))
                            } else {
                                let balanceArr: any = [];
                                let verify = false;
                                let msg = '';
                                for (let i = 0; i < formData.balance_json.length; i++) {

                                    if (formData.balance_json[i].balance) {
                                        if (isNaN(formData.balance_json[i].balance) || !regExp.number.test(formData.balance_json[i].balance)) {
                                            msg = t('cardRightBalancePriceTips')
                                            verify = true;
                                            break;
                                        }
                                        if (formData.balance_json[i].balance <= 0) {
                                            msg = t('cardRightBalanceZeroTips')
                                            verify = true;
                                            break;
                                        }

                                        if (balanceArr.indexOf(formData.balance_json[i].balance) == -1) {
                                            balanceArr.push(formData.balance_json[i].balance)
                                        } else {
                                            msg = t('cardRightBalanceRepeatTips')
                                            verify = true;
                                            break;
                                        }
                                    } else {
                                        msg = t('cardRightBalancePlaceholder')
                                        verify = true;
                                        break;
                                    }
                                }

                                if (verify) callback(new Error(msg))
                            }
                        }
                        callback()
                    }
                }
            ],
            card_right_balance_price: [
                {
                    required: true,
                    trigger: 'blur',
                    validator: (rule: any, value: any, callback: any) => {
                        if (formData.card_right_type == 'balance') {

                            let verify = false;
                            let msg = '';
                            for (let i = 0; i < formData.balance_json.length; i++) {
                                if (formData.balance_json[i].price) {

                                    if (isNaN(formData.balance_json[i].price) || !regExp.digit.test(formData.balance_json[i].price)) {
                                        msg = t('cardBalancePriceTips')
                                        verify = true;
                                        break;
                                    }

                                    if (formData.balance_json[i].price < 0) {
                                        msg = t('cardBalancePriceNotZeroTips')
                                        verify = true;
                                        break;
                                    }
                                } else {
                                    msg = t('cardBalancePricePlaceholder');
                                    verify = true;
                                    break;
                                }
                            }

                            if (verify) callback(new Error(msg))

                        }
                        callback()
                    }
                }
            ],
            card_goods_count: [
                {
                    required: true,
                    trigger: 'blur',
                    validator: (rule: any, value: any, callback: any) => {
                        if (formData.card_goods_type == 'diy') {
                            if (value === '') {
                                callback(new Error(t('cardGoodsCountPlaceholder')))
                            } else if (isNaN(value) || !regExp.digit.test(value)) {
                                callback(new Error(t('cardGoodsTips')))
                            } else if (value < 0) {
                                callback(new Error(t('cardGoodsNotZeroTips')))
                            } else if (value == 0) {
                                callback(new Error(t('cardGoodsMustBeGreaterZeroTips')))
                            }
                        }
                        callback()
                    }

                }
            ],
            card_right_select_goods: [
                {
                    required: true,
                    trigger: 'blur',
                    validator: (rule: any, value: any, callback: any) => {
                        if (formData.card_right_type == 'goods') {
                            if (goodsSkuList.length == 0) {
                                callback(new Error(t('cardRightGoodsEmpty')))
                            } else {
                                if (formData.card_goods_type == 'all') {

                                    let verify = false;
                                    let msg = '';
                                    for (let i = 0; i < goodsSkuList.length; i++) {
                                        if (goodsSkuList[i].num == '') {
                                            verify = true;
                                            msg = t('cardRightGoodsPlaceholder');
                                            break;
                                        }
                                        if (goodsSkuList[i].num > goodsSkuList[i].stock) {
                                            verify = true;
                                            msg = t('cardRightGoodsNumOverStock');
                                            break;
                                        }
                                    }

                                    if (verify) callback(new Error(msg))
                                }
                            }

                        }
                        callback()
                    }
                }
            ],
            instruction: [
                {
                    required: false,
                    trigger: ['blur', 'change'],
                    validator: (rule: any, value: any, callback: any) => {
                        if (value.length > 50000) {
                            callback(new Error(t('cardInstructionMaxTips')))
                            return false
                        } else {
                            callback()
                        }
                    }
                }
            ],
            card_desc: [
                {
                    required: false,
                    trigger: ['blur', 'change'],
                    validator: (rule: any, value: any, callback: any) => {
                        if (value.length > 50000) {
                            callback(new Error(t('giftcardDescMaxTips')))
                            return false
                        } else {
                            callback()
                        }
                    }
                }
            ]
        }
        return rules;
    })

    const verify = (callback: any) => {
        let formRef = [
            {
                key: 'basic',
                verify: false,
                ref: formRefArr.basicFormRef
            },
        ];

        formRef.push(
            {
                key: 'card_right',
                verify: false,
                ref: formRefArr.cardRightFormRef
            },
            {
                key: 'detail',
                verify: false,
                ref: formRefArr.detailFormRef
            });

        formRef.forEach((el: any, index) => {
            if (el && el.ref) {
                el.ref.validate((valid: any) => {
                    el.verify = valid
                })
            }
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


    // 保存数据
    const save = (callback: any = null) => {
        verify(() => {
            if (repeat.value) return
            repeat.value = true

            const api = formData.giftcard_id ? editGiftcard : addGiftcard
            formData.balance_json = formData.balance_json.map((item: any) => {
                item.price = parseFloat(item.price).toFixed(2)
                return item
            })
            const data = cloneDeep(formData)
            if (data.card_right_type == 'balance') {
            } else if (data.card_right_type == 'goods') {
                data.goods_sku_relation.splice(0, data.goods_sku_relation.length);
                goodsSkuList.forEach((item: any) => {
                    data.goods_sku_relation.push({
                        goods_id: item.goods_id,
                        sku_id: item.sku_id,
                        num: parseInt(item.num)
                    });
                })
            }

            api(data).then((res: any) => {
                repeat.value = false
                router.push('/shop_giftcard/giftcard/list')
            }).catch(() => {
                repeat.value = false
            })

        })
    }

    const back = () => {
        router.push('/shop_giftcard/giftcard/list')
    }

    const filterSpecial = (event: any) => {
        event.target.value = event.target.value.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/g, '')
        event.target.value = event.target.value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '')
    }

    const handleBlur = (e: any) => {
        formRefArr.detailFormRef.value?.validateField('goods_desc')
    }

    return {
        formData,

        activeName,
        tabHandleClick,

        giftcardType,
        changeGiftcardType,
        giftcardCardRightType,

        categoryOptions,
        toCategoryEvent,
        refreshCategory,

        posterOptions,
        toPosterEvent,
        refreshPoster,

        formRules,

        addBlessing,
        deleteBlessing,

        addBalance,
        deleteBalance,

        goodsSelect,
        deleteGoodsEvent,
        goodsIds,
        goodsSkuList,

        save,
        back,
        filterSpecial,
        handleBlur,
    }
}
