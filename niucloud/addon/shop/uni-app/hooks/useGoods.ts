import { getToken } from '@/utils/common';

export function useGoods(params: any = {}) {

    const baseTagStyle = (data: any) => {
        let style = "";
        if (data.color_json && data.color_json.text_color) {
            style += `color:${ data.color_json.text_color };`;
        }
        if (data.color_json && data.color_json.border_color) {
            style += `border-color: ${ data.color_json.border_color };`;
        }
        if (data.color_json && data.color_json.bg_color) {
            style += `background-color: ${ data.color_json.bg_color };`;
        }
        return style;
    }

    // 价格类型
    const priceType = (data: any) => {
        let type = "";
        if (data.member_discount && getToken() && data.goodsSku.member_price != data.goodsSku.price) {
            type = 'member_price' // 会员价
        }
        return type;
    }

    // 商品价格
    const goodsPrice = (data: any) => {
        let price = "0.00";
        if (data.member_discount && getToken() && data.goodsSku.member_price != data.goodsSku.price) {
            price = data.goodsSku.member_price ? data.goodsSku.member_price : data.goodsSku.price // 会员价
        } else {
            price = data.goodsSku ? data.goodsSku.price : data.price; //兼容商品推荐组件
        }
        return parseFloat(price);
    }

    // 错误图片展示
    const errorImgFn = (data: any, type: any) => {
        data[type] = '';
    }

    return {
        baseTagStyle: baseTagStyle,
        goodsPrice: goodsPrice,
        priceType: priceType,
        error: errorImgFn
    }
}
