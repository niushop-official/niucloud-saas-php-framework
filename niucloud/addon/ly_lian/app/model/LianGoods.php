<?php


namespace addon\ly_lian\app\model;

use addon\shop\app\model\goods\Goods;
use addon\shop\app\model\goods\GoodsSku;
use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

/**
 * 2+1商品模型
 * Class Goods
 * @package addon\ly_shareholder\app\model\goods
 */
class LianGoods extends BaseModel
{

    

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'ly_lian_goods';

    protected $json = ['reward_set'];

    protected $jsonAssoc = true;

    

    

    /**
     * 搜索器:2+1商品ID
     * @param $value
     * @param $data
     */
    public function searchLianGoodsIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("id", $value);
        }
    }
    
    /**
     * 搜索器:2+1商品商品id
     * @param $value
     * @param $data
     */
    public function searchGoodsIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("goods_id", $value);
        }
    }
    
    /**
     * 搜索器:2+1商品是否参与
     * @param $value
     * @param $data
     */
    public function searchIsLianAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("is_lian", $value);
        }
    }

    public function searchJoinIsLianAttr( $query, $value, $data)
    {
        if ($value) {
            $query->where('lianGoods.is_lian', $value);
        }
    }
    
    /**
     * 搜索器:2+1商品创建时间
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
        $start = empty($value[0]) ? 0 : strtotime($value[0]);
        $end = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start > 0 && $end > 0) {
             $query->where([["create_time", "between", [$start, $end]]]);
        } else if ($start > 0 && $end == 0) {
            $query->where([["create_time", ">=", $start]]);
        } else if ($start == 0 && $end > 0) {
            $query->where([["create_time", "<=", $end]]);
        }
    }
    
    

    public function goods()
    {
        return $this->hasOne(Goods::class, 'goods_id', 'goods_id')
            ->withField('goods_id,goods_name,goods_image,stock,status')
            ->bind(['goods_id', 'goods_name', 'goods_image', 'stock', 'status']);
    }

    /**
     * 关联默认商品规格
     * @return \think\model\relation\HasOne
     */
    public function goodsSku()
    {
        return $this->hasOne(GoodsSku::class, 'goods_id', 'goods_id');
    }


    public function getLianGoodsIdList(){
        $list = $this->model->where('site_id', $this->site_id)
            ->where('is_lian', '=', 1)
            ->pluck('goods_id')
            ->select()
            ->toArray();

        return $list;
    }

     /**
     * 关联商品规格列表
     * @return \think\model\relation\HasMany
     */
    public function skuList()
    {
        return $this->hasMany(GoodsSku::class, 'goods_id', 'goods_id')
            ->withField('sku_id,sku_name,price,cost_price')
            ->bind(['sku_id', 'sku_name', 'price','cost_price']);
    }
    
}