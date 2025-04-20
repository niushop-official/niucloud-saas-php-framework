export type CouponInterface = {
    coupon_id: number
    create_time: string
    expire_time: string
    goods: {
        id: number, site_id: number, coupon_id: number, goods_id: number, category_id: number
    }[]
    id: number
    member_id: number
    canUse: boolean
    min_condition_money: number | string
    price: number | string
    status: number
    title: string
    type: number | string
    use_time: number
}
