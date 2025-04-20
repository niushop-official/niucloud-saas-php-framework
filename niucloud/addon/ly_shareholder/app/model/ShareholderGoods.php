<?php


namespace addon\ly_shareholder\app\model;

use addon\shop\app\model\goods\Goods;
use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

/**
 * 股东分红商品模型
 * Class Goods
 * @package addon\ly_shareholder\app\model\goods
 */
class ShareholderGoods extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'shareholder_goods_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'ly_shareholder_goods';


    /**
     * 搜索器:股东分红商品ID
     * @param $value
     * @param $data
     */
    public function searchShareholderGoodsIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("shareholder_goods_id", $value);
        }
    }
    
    /**
     * 搜索器:股东分红商品商品id
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
     * 搜索器:股东分红商品是否参与
     * @param $value
     * @param $data
     */
    public function searchIsShareholderAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("is_shareholder", $value);
        }
    }

    public function searchJoinIsShareholderAttr( $query, $value, $data)
    {
        if ($value) {
            $query->where('shareholderGoods.is_shareholder', $value);
        }
    }
    
    /**
     * 搜索器:股东分红商品创建时间
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


    public function getShareholderGoodsIdList(){
        $list = $this->model->where('site_id', $this->site_id)
            ->where('is_shareholder', '=', 1)
            ->pluck('goods_id')
            ->select()
            ->toArray();

        return $list;
    }
    
}