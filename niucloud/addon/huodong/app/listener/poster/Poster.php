<?php
declare ( strict_types = 1 );

namespace addon\huodong\app\listener\poster;


use addon\huodong\app\model\act\Act;
use app\model\member\Member;
use app\service\core\sys\CoreSysConfigService;

/**
 * 海报数据
 */
class Poster
{
    /**
     * 海报
     * @param $data
     * @return array
     */
    public function handle($data)
    {
        $type = $data[ 'type' ];
        if ($type == 'huodong_act') {
            //  海报模板数据

            $site_id = $data[ 'site_id' ];
            $param = $data[ 'param' ];
            $act_id = $param[ 'act_id' ] ?? 0;
            $member_id = $param[ 'member_id' ] ?? 0;
            $mode = $param[ 'mode' ] ?? '';

            if ($mode == 'preview') {
                // 预览模式
                $url_data = [
                    [ 'key' => 'act_id', 'value' => $act_id ]
                ];
                $return_data = [
                    'nickname' => '会员昵称',
                    'headimg' => 'static/resource/images/default_headimg.jpg',
                    'act_name' => '名称',
                    'act_price' => '￥369.00',
                    'act_market_price' => '￥3690.00',
                    'act_img' => 'addon/huodong/act_template.png',
                    'url' => [
                        'url' => ( new CoreSysConfigService() )->getSceneDomain($site_id)[ 'wap_url' ],
                        'page' => 'addon/huodong/pages/act/detail',
                        'data' => $url_data,
                    ],
                ];
                return $return_data;
            }
            $act = ( new Act() )->where([ [ 'id', '=', $act_id ], [ 'site_id', '=', $site_id ] ])->findOrEmpty();
            if ($act->isEmpty()) return [];

            $act_name = $act[ 'name' ] ;
            if (mb_strlen($act_name, 'UTF-8') > 14) {
                $act_name = mb_substr($act_name, 0, 14, 'UTF-8') . '...';
            }



            $sku_img = $act[ 'image' ];
            if (empty($sku_img)) {
                $sku_img = 'addon/huodong/cover.png';
            }
//            $market_price_text = $sku[ 'market_price' ] > 0 ? '￥' . $sku[ 'market_price' ] : '';
            $url_data = [
                [ 'key' => 'id', 'value' => $act_id ]
            ];

            $member_info = [];

            if ($member_id > 0) {
                $url_data[] = [ 'key' => 'mid', 'value' => $member_id ];

                //查询会员信息
                $member_info = ( new Member() )->where([ [ 'member_id', '=', $member_id ], [ 'site_id', '=', $site_id ] ])->findOrEmpty();

                if (!empty($member_info)) {
                    if (empty($member_info[ 'headimg' ])) {
                        $member_info[ 'headimg' ] = 'static/resource/images/default_headimg.jpg';
                    }
                }
            }

            $return_data = [
                'act_name' => $act_name,
//                'services' => $services,
                'act_img' => $sku_img,
                'act_time' => $act['startime'].' 至 '.$act['endtime'],
                'act_address' => $act['address'],
                'url' => [
                    'url' => ( new CoreSysConfigService() )->getSceneDomain($site_id)[ 'wap_url' ],
                    'page' => 'addon/huodong/pages/act/detail',
                    'data' => $url_data,
                ],
            ];

            if (!empty($member_info)) {
                $return_data[ 'nickname' ] = mb_strlen($member_info[ 'nickname' ]) > 10 ? mb_substr($member_info[ 'nickname' ], 0, 7, 'utf-8') . '...' : $member_info[ 'nickname' ];
                $return_data[ 'headimg' ] = $member_info[ 'headimg' ];
            }
            return $return_data;
        }
    }
}
