<?php

namespace addon\shop\app\upgrade\v132;

use app\model\diy\Diy;

class Upgrade
{

    public function handle()
    {
        $this->handleData();
    }

    /**
     * 处理商品数据
     */
    private function handleData()
    {
        $diy_model = new Diy();
        $where = [
            [ 'value', '<>', '' ]
        ];
        $field = 'id,site_id,name,title,template,value';
        $list = $diy_model->where($where)->field($field)->select()->toArray();

        if (!empty($list)) {
            foreach ($list as $k => $v) {
                $diy_data = json_decode($v[ 'value' ], true);

                foreach ($diy_data[ 'value' ] as $ck => $cv) {
                    if ($cv[ 'componentName' ] == 'ShopMemberInfo') {
                        if (!isset($diy_data[ 'value' ][ $ck ][ 'isShowAccount' ])) {
                            $diy_data[ 'value' ][ $ck ][ 'isShowAccount' ] = true;
                        }

                    }
                }

                $diy_data = json_encode($diy_data);
                $diy_model->where([ [ 'id', '=', $v[ 'id' ] ] ])->update([ 'value' => $diy_data ]);
            }
        }

    }

}