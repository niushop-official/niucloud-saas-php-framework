<?php

namespace app\upgrade\v053;

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

                foreach ($diy_data[ 'value' ] as $ck => $cv) {

                    // 轮播搜索 组件
                    if ($cv[ 'componentName' ] == 'CarouselSearch') {
                        if (!isset($diy_data[ 'value' ][ $ck ][ 'search' ][ 'color' ])) {
                            $diy_data[ 'value' ][ $ck ][ 'search' ][ 'color' ] = '#999999';
                        }
                        if (!isset($diy_data[ 'value' ][ $ck ][ 'search' ][ 'btnColor' ])) {
                            $diy_data[ 'value' ][ $ck ][ 'search' ][ 'btnColor' ] = '#FFFFFF';
                        }
                        if (!isset($diy_data[ 'value' ][ $ck ][ 'search' ][ 'bgColor' ])) {
                            $diy_data[ 'value' ][ $ck ][ 'search' ][ 'bgColor' ] = '#FFFFFF';
                        }
                        if (!isset($diy_data[ 'value' ][ $ck ][ 'search' ][ 'btnBgColor' ])) {
                            $diy_data[ 'value' ][ $ck ][ 'search' ][ 'btnBgColor' ] = '#FF3434';
                        }

                    }

                    // 活动魔方 组件
                    if ($cv[ 'componentName' ] == 'ActiveCube') {
                        if (!isset($diy_data[ 'value' ][ $ck ][ 'textImg' ])) {
                            $diy_data[ 'value' ][ $ck ][ 'textImg' ] = 'static/resource/images/diy/active_cube/active_cube_text1.png';
                        }

                        if (!isset($diy_data[ 'value' ][ $ck ][ 'blockStyle' ][ 'btnText' ])) {
                            $diy_data[ 'value' ][ $ck ][ 'blockStyle' ] [ 'btnText' ] = 'normal';
                        }

                    }

                }
                unset($diy_data[ 'global' ][ 'topStatusBar' ][ 'isTransparent' ]);

                $diy_data = json_encode($diy_data);
                $diy_model->where([ [ 'id', '=', $v[ 'id' ] ] ])->update([ 'value' => $diy_data ]);
            }
        }

    }

}
