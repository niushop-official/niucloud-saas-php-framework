<?php

namespace app\upgrade\v050;

use app\model\diy\Diy;

class Upgrade
{

    public function handle()
    {
        $this->handleDiyData();
    }

    /**
     * 处理自定义数据
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    private function handleDiyData()
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

                if (in_array($diy_data[ 'global' ][ 'topStatusBar' ][ 'style' ], [ 'style-1', 'style-2', 'style-3', 'style-4' ])) {

                    $diy_data[ 'global' ][ 'topStatusBar' ][ 'bgColor' ] = '#ffffff';
                    $diy_data[ 'global' ][ 'topStatusBar' ][ 'styleName' ] = '风格1';
                    $diy_data[ 'global' ][ 'topStatusBar' ][ 'rollBgColor' ] = '#ffffff';
                    $diy_data[ 'global' ][ 'topStatusBar' ][ 'rollTextColor' ] = '#333333';

                } elseif ($diy_data[ 'global' ][ 'topStatusBar' ][ 'style' ] == 'style-5') {

                    $diy_data[ 'global' ][ 'topStatusBar' ][ 'bgColor' ] = '';
                    $diy_data[ 'global' ][ 'topStatusBar' ][ 'rollBgColor' ] = '';
                    $diy_data[ 'global' ][ 'topStatusBar' ][ 'styleName' ] = '风格1';
                    $diy_data[ 'global' ][ 'topStatusBar' ][ 'rollTextColor' ] = '#ffffff';
                    $diy_data[ 'global' ][ 'topStatusBar' ][ 'textColor' ] = '#333333';

                } elseif ($diy_data[ 'global' ][ 'topStatusBar' ][ 'style' ] == 'style-6') {

                    $diy_data[ 'global' ][ 'topStatusBar' ][ 'isShow' ] = false;
                    $diy_data[ 'global' ][ 'topStatusBar' ][ 'styleName' ] = '风格1';
                    $diy_data[ 'global' ][ 'topStatusBar' ][ 'rollBgColor' ] = '#ffffff';
                    $diy_data[ 'global' ][ 'topStatusBar' ][ 'rollTextColor' ] = '#333333';
                    $diy_data[ 'global' ][ 'topStatusBar' ][ 'bgColor' ] = '#ffffff';
                    $diy_data[ 'global' ][ 'topStatusBar' ][ 'textColor' ] = '#333333';

                }

                unset($diy_data[ 'global' ][ 'topStatusBar' ][ 'isTransparent' ]);

                $diy_data = json_encode($diy_data);
                $diy_model->where([ [ 'id', '=', $v[ 'id' ] ] ])->update([ 'value' => $diy_data ]);
            }
        }

    }

}