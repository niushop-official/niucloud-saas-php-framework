<?php

namespace app\upgrade\v121;


use app\model\diy\Diy;
use app\model\diy_form\DiyForm;

class Upgrade
{

    public function handle()
    {
        $this->handleDiyData();
        $this->handleDiyFormData();
    }

    /**
     * 处理自定义数据
     * @return void
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    private function handleDiyData()
    {
        $diy_model = new Diy();
        $where = [
            ['value', '<>', ''],
        ];
        $field = 'id,value';
        $list = $diy_model->where($where)->field($field)->select()->toArray();
        $components_names = ['GoodsList','ManyGoodsList','ShopExchangeGoods','ShopGoodsRecommend','SingleRecommend','ShopNewcomer','ShopGoodsRanking','ShopGoodsHot'];
        if (!empty($list)) {
            foreach ($list as $k => $v) {
                $diy_data = json_decode($v['value'], true);
                if (!isset($diy_data['value'])){
                    continue;
                }
                foreach ($diy_data['value'] as  $k1=>$v1) {
                    if (in_array($v1['componentName'],$components_names)){
                        $diy_data['value'][$k1]['mode'] = 'aspectFill';
                    }
                }
                $diy_data = json_encode($diy_data);
                $diy_model->where([['id', '=', $v['id']]])->update(['value' => $diy_data]);
            }
        }

    }

    /**
     * 处理自定义数据
     * @return void
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    private function handleDiyFormData()
    {
        $diy_form_model = new DiyForm();
        $where = [
            ['value', '<>', '']
        ];
        $field = 'form_id,value';
        $list = $diy_form_model->where($where)->field($field)->select()->toArray();

        $components_names = ['GoodsList','ManyGoodsList','ShopExchangeGoods','ShopGoodsRecommend','SingleRecommend','ShopNewcomer','ShopGoodsRanking','ShopGoodsHot'];
        if (!empty($list)) {
            foreach ($list as $k => $v) {
                $diy_data = $v['value'];
                if (!isset($diy_data['value'])){
                    continue;
                }
                foreach ($diy_data['value'] as  $k1=>$v1) {
                    if (in_array($v1['componentName'],$components_names)){
                        $diy_data['value'][$k1]['mode'] = 'aspectFill';
                    }
                }
                $diy_data = json_encode($diy_data);
                $diy_form_model->where([['form_id', '=', $v['form_id']]])->update(['value' => $diy_data]);
            }
        }

    }

}