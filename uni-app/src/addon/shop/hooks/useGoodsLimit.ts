/********************商品限购和商品起售********************/
export function useGoodsLimit() {

    /**
     * 获取商品数量
     * params 商品库存(stock)，是否开启限购（is_limit），限购类型（limit_type），限购数量（max_buy），起购（min_buy），已购买数量（has_buy）
     * return 商品数量，是否可以购买，原因
     ***/
    const getGoodsNum = (params: any = {}) => {
        let { stock, is_limit, limit_type, max_buy, min_buy, has_buy, num } = params;

        let temp_range = {
            'up': { num: 0, tips: '', is_stock: false }, // 上限
            'off': { num: 0, tips: '' }  // 下限
        };

        let returnObj = {
            num: 0,
            max_num: 0,
            is_buy: true,
            tips: ''
        }

        /******************* 起售-start ************************/
        temp_range.off.num = min_buy > 0 ? min_buy : 1;
        if (min_buy) {
            temp_range.off.tips = `该商品起购${ params.min_buy }件`;
        }
        /******************* 起售-end ************************/


        /******************* 限购-start ************************/
        if (is_limit) {
            returnObj.is_buy = true;
            if (max_buy) {
                if (limit_type == 1) { //单次限购
                    temp_range.up.num = max_buy;
                    temp_range.up.tips = `该商品单次限购${ max_buy }件`;
                } else { // 单人限购
                    let buyVal = params.max_buy - (params.has_buy || 0);
                    temp_range.up.num = buyVal > 0 ? buyVal : 0;
                    temp_range.up.tips = `该商品单次限购${ max_buy }件`;
                    if (has_buy > 0) {
                        temp_range.up.tips += `,已购${ has_buy }件`;
                    }
                }

                if (temp_range.up.num > params.stock) {
                    temp_range.up.num = params.stock;
                    temp_range.up.is_stock = true;
                    temp_range.up.tips = "商品库存不足";
                }
            }
        } else {
            returnObj.is_buy = true;
            temp_range.up.num = stock;
            temp_range.up.tips = "商品库存不足";
        }
        /******************* 限购-end ************************/
        if (temp_range.off.num > temp_range.up.num && temp_range.up.is_stock) {
            temp_range.up.tips = "商品库存不足";
        } else if (temp_range.off.num > temp_range.up.num) {
            returnObj.num = temp_range.up.num;
        } else {
            if (num <= temp_range.off.num) {
                returnObj.tips = temp_range.off.tips;
            }
        }
        return returnObj;
    }

    return {
        getGoodsNum
    }
}
