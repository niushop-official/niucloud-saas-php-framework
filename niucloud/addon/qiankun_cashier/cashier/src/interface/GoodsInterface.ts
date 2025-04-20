export type SkuInterface = {
  goods_id: number
  price: number
  sku_id: number
  sku_image: string
}
export type SpecListInterface = {
  goods_name: string
  spec_list: {
    spec_name: string
    spec_values: string
    spec_values_arr: string[]
  }[]
  sku_list: {
    cost_price: number
    goods_id: number
    is_default: number
    market_price: number
    price: number
    sku_id: number
    sku_image: string
    sku_name: string
    sku_no: string
    sku_spec_format: string
    stock: number
  }[]
}
export type GoodsInterface = {
  id: number
  sku_id: number
  goodsSku: SkuInterface
  selected_sku: string
  goods_cover: string
  goods_cover_thumb_small: string
  goods_edit_path: string
  goods_id: number
  num: number
  price: number
  goods_name: string
  goods_type: string
  goods_type_name: string
  is_gift: number
  member_discount: number
  sale_num: number
  site_id: number
  sort: number
  status: number
  stock: number
  create_time: string
  goods_detail: {
    goods_info: {
      spec_type: string
      spec_list: SpecListInterface
      goods_category: number[]
    }
  }
}
