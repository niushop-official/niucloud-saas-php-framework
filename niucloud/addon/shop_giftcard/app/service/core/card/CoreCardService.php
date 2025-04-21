<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\shop_giftcard\app\service\core\card;

use addon\shop_giftcard\app\dict\card\CardDict;
use addon\shop_giftcard\app\dict\giftcard\GiftcardDict;
use addon\shop_giftcard\app\dict\giftcard\GiftcardMakeDict;
use addon\shop_giftcard\app\dict\giftcard\GiftcardLogDict;
use addon\shop_giftcard\app\model\card\Card;
use addon\shop_giftcard\app\model\card\CardGoods;
use addon\shop_giftcard\app\model\giftcard\Giftcard;
use addon\shop_giftcard\app\model\giftcard\GiftcardGoods;
use addon\shop_giftcard\app\model\giftcard\GiftcardMake;
use addon\shop_giftcard\app\service\core\giftcard\CoreGiftcardLogService;
use addon\shop_giftcard\app\service\core\giftcard\CoreGiftcardService;
use addon\shop_giftcard\app\service\core\records\CoreMemberRecordsService;
use core\base\BaseCoreService;
use core\exception\CommonException;
use PhpOffice\PhpSpreadsheet\IOFactory;
use think\Exception;
use think\facade\Db;
use think\facade\Log;


/**
 * 礼品卡获取服务层
 * Class CoreCardService
 * @package addon\shop_giftcard\app\service\core\card
 */
class CoreCardService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Card();
    }

    /**
     * 添加电子卡
     * @param $params
     * @return mixed
     */
    public function addVirtualCard($params)
    {
        $giftcard_model = new Giftcard();
        $giftcard_info = $giftcard_model->field('giftcard_id, card_right_type, delivery_way, card_goods_type, card_goods_count, validity_type, validity_day, validity_time, is_give')
            ->where([
                [ 'site_id', '=', $params[ 'site_id' ] ],
                [ 'giftcard_id', "=", $params[ 'giftcard_id' ] ],
                [ 'type', '=', GiftcardDict::VIRTUAL ]
            ])->findOrEmpty()->toArray();

        if (empty($giftcard_info)) {
            throw new CommonException('GIFTCARD_NOT_FOUND');
        }

        // 生成卡号
        $card_no_arr = $this->createCardNo($params[ 'site_id' ], $params[ 'giftcard_id' ], 1);
        $card_no = $card_no_arr[ 0 ]; // 卡号

        try {

            Db::startTrans();

            // 生成卡包
            $member_card_bag_service = new CoreMemberCardBagService();
            $bag_data = [
                'giftcard_id' => $giftcard_info[ 'giftcard_id' ],
                'card_right_type' => $giftcard_info[ 'card_right_type' ],
                'balance' => $params[ 'balance' ],
                'delivery_way' => $giftcard_info[ 'delivery_way' ],
                'card_goods_type' => $giftcard_info[ 'card_goods_type' ],
                'validity_type' => $giftcard_info[ 'validity_type' ],
                'is_give' => $giftcard_info[ 'is_give' ],
                'card_cover' => $params[ 'card_cover' ],

                'to_use_count' => 1,
                'total_count' => 1,
            ];
            $card_bag_id = $member_card_bag_service->generate($params[ 'site_id' ], $params[ 'member_id' ], $bag_data);

            $card_data = [
                'site_id' => $params[ 'site_id' ],
                'order_id' => $params[ 'order_id' ],
                'giftcard_id' => $params[ 'giftcard_id' ],
                'member_id' => $params[ 'member_id' ],
                'status' => CardDict::TO_USE,
                'source' => CardDict::ORDER,
                'card_no' => $card_no,
                'card_key' => '', // 电子卡没有密钥
                'card_cover' => $params[ 'card_cover' ], // 购买时选择的礼品卡封面
                'balance' => $params[ 'balance' ], // 储值金额
                'validity_time' => $this->getValidityTime($giftcard_info),
                'total_num' => $this->getCardTotalNum($giftcard_info),
                'create_time' => time(),
                'card_bag_id' => $card_bag_id
            ];

            $res = $this->model->create($card_data);

            $card_goods_model = new CardGoods();

            if ($giftcard_info[ 'card_right_type' ] == GiftcardDict::cardRightTypeGoods) {

                $card_goods_list = [];

                $giftcard_goods_model = new GiftcardGoods();
                $field = 'id,giftcard_id,goods_id,sku_id,num';
                $goods_sku_list = $giftcard_goods_model->field($field)->where([ [ 'giftcard_id', "=", $giftcard_info[ 'giftcard_id' ] ] ])->with([ 'goods', 'sku' ])->select()->toArray();

                foreach ($goods_sku_list as $k => $v) {
                    $card_goods_list[] = [
                        'site_id' => $params[ 'site_id' ],
                        'card_id' => $res->card_id,
                        'giftcard_id' => $giftcard_info[ 'giftcard_id' ],
                        'goods_id' => $v[ 'goods_id' ],
                        'sku_id' => $v[ 'sku_id' ],
                        'goods_name' => $v[ 'goods' ][ 'goods_name' ],
                        'sku_name' => $v[ 'sku' ][ 'sku_name' ],
                        'sku_image' => $v[ 'sku' ][ 'sku_image' ],
                        'sku_no' => $v[ 'sku' ][ 'sku_no' ],
                        'price' => $v[ 'sku' ][ 'price' ],
                        'total_num' => $v[ 'num' ],
                    ];
                }

                $card_goods_model->insertAll($card_goods_list);

            } elseif ($giftcard_info[ 'card_right_type' ] == GiftcardDict::cardRightTypeBalance) {
                // 储值卡
                $card_goods_model->create([
                    'site_id' => $params[ 'site_id' ],
                    'card_id' => $res->card_id,
                    'giftcard_id' => $giftcard_info[ 'giftcard_id' ],
                    'balance' => $params[ 'balance' ], // 储值金额
                    'goods_name' => '储值余额' . $params[ 'balance' ] . '元',
                ]);
            }

            $member_records_service = new CoreMemberRecordsService();
            $member_records_service->add([
                'site_id' => $params[ 'site_id' ],
                'card_id' => $res->card_id,
                'member_id' => $params[ 'member_id' ],
                'source' => CardDict::ORDER
            ]);

            Db::commit();
            return $res->card_id;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }

    }

    /**
     * 生成礼品卡获取记录
     * @param $params
     * @return mixed
     * @throws \Exception
     */
    public function makeCard($params)
    {
        $giftcard_model = new Giftcard();
        $giftcard_info = $giftcard_model->field('giftcard_id,card_right_type, balance_json,card_goods_type, card_goods_count, validity_type, validity_day, validity_time, card_key_way, card_key_length,card_no_length, card_prefix, card_suffix')
            ->where([
                [ 'site_id', '=', $params[ 'site_id' ] ],
                [ 'giftcard_id', "=", $params[ 'giftcard_id' ] ],
            ])->findOrEmpty()->toArray();

        if (empty($giftcard_info)) {
            throw new CommonException('GIFTCARD_NOT_FOUND');
        }

        $card_make_model = new GiftcardMake();

        $field = 'make_id,giftcard_id,card_right_type,balance_json,make_card_way,import_path,total_count,success_count,fail_count';
        $card_make_info = $card_make_model->field($field)->where([ [ 'make_id', "=", $params[ 'make_id' ] ], [ 'site_id', '=', $params[ 'site_id' ] ] ])->findOrEmpty()->toArray();

        if (empty($card_make_info)) {
            throw new CommonException('GIFTCARD_MAKE_CARD_RECORD_NOT_FOUND');
        }

        // 在线制卡
        if ($card_make_info[ 'make_card_way' ] == GiftcardMakeDict::AUTO) {
            return $this->onlineMakeCard($params, $card_make_info, $giftcard_info);
        } elseif ($card_make_info[ 'make_card_way' ] == GiftcardMakeDict::IMPORT) {
            // 导入制卡
            return $this->importMakeCard($params, $card_make_info, $giftcard_info);
        }
    }

    /**
     * 在线制卡
     * @param $params
     * @param $card_make_info
     * @param $giftcard_info
     * @return mixed
     * @throws \Exception
     */
    public function onlineMakeCard($params, $card_make_info, $giftcard_info)
    {

        $card_data_list = [];

        $max = 100; // 单次最大数量
        $limit = $card_make_info[ 'total_count' ] - $card_make_info[ 'success_count' ]; // 剩余数量
        if ($limit >= $max) {
            $limit = $max;
        }

        if ($card_make_info[ 'card_right_type' ] == GiftcardDict::cardRightTypeGoods) {
            // 兑换卡

            // 批量生成卡号
            $card_no_arr = $this->createCardNo($params[ 'site_id' ], $params[ 'giftcard_id' ], $limit);
            // 批量生成卡密
            $card_key_arr = $this->batchCreateCardKey($params[ 'site_id' ], $params[ 'giftcard_id' ], $limit);

            // 批量生成
            for ($i = 0; $i < $limit; $i++) {

                $card_no = $card_no_arr[ $i ]; // 卡号
                $card_key = $card_key_arr[ $i ]; // 卡密

                $card_data_list[] = [
                    'site_id' => $params[ 'site_id' ],
                    'giftcard_id' => $params[ 'giftcard_id' ],
                    'status' => CardDict::TO_ACTIVATE,
                    'source' => CardDict::GENERATE,
                    'card_no' => $card_no,
                    'card_key' => $card_key,
                    'card_make_id' => $params[ 'make_id' ],
                    'total_num' => $this->getCardTotalNum($giftcard_info),
                    'create_time' => time()
                ];

            }

        } elseif ($card_make_info[ 'card_right_type' ] == GiftcardDict::cardRightTypeBalance) {
            // 储值卡

            $curr_max_count = 0;

            // 批量生成卡号
            $card_no_arr = $this->createCardNo($params[ 'site_id' ], $params[ 'giftcard_id' ], $limit);
            // 批量生成卡密
            $card_key_arr = $this->batchCreateCardKey($params[ 'site_id' ], $params[ 'giftcard_id' ], $limit);
            $card_no_index = 0;

            foreach ($card_make_info[ 'balance_json' ] as $k => $v) {
                $is_break = false;
                if ($v[ 'status' ] == 'finish') {
                    continue;
                }

                // 批量生成
                for ($i = 0; $i < $v[ 'count' ]; $i++) {

                    if ($limit == $curr_max_count) {
                        $is_break = true;
                        break;
                    } else {

                        $card_no = $card_no_arr[ $card_no_index ]; // 卡号
                        $card_key = $card_key_arr[ $card_no_index ]; // 卡密

                        $card_data_list[] = [
                            'site_id' => $params[ 'site_id' ],
                            'giftcard_id' => $params[ 'giftcard_id' ],
                            'status' => CardDict::TO_ACTIVATE,
                            'source' => CardDict::GENERATE,
                            'card_no' => $card_no,
                            'card_key' => $card_key,
                            'balance' => $v[ 'balance' ],
                            'card_make_id' => $params[ 'make_id' ],
                            'total_num' => $this->getCardTotalNum($giftcard_info),
                            'create_time' => time()
                        ];

                        $card_no_index++;

                    }
                    $curr_max_count++;
                    $card_make_info[ 'balance_json' ][ $k ][ 'make_count' ]++;

                }

                if ($is_break) {
                    break;
                }
            }

            foreach ($card_make_info[ 'balance_json' ] as $k => $v) {
                if ($v[ 'count' ] == $v[ 'make_count' ]) {
                    $card_make_info[ 'balance_json' ][ $k ][ 'status' ] = 'finish';
                } else {
                    $card_make_info[ 'balance_json' ][ $k ][ 'count' ] -= $card_make_info[ 'balance_json' ][ $k ][ 'make_count' ];
                    $card_make_info[ 'balance_json' ][ $k ][ 'make_count' ] = 0;
                    $card_make_info[ 'balance_json' ][ $k ][ 'status' ] = 'adding';
                }
            }

            $card_make_model = new GiftcardMake();
            $card_make_model->where([
                [ 'site_id', '=', $params[ 'site_id' ] ],
                [ 'make_id', '=', $card_make_info[ 'make_id' ] ]
            ])->update([ 'balance_json' => $card_make_info[ 'balance_json' ] ]);

        }

        $this->model->insertAll($card_data_list);

        $params[ 'make_card_way' ] = $card_make_info[ 'make_card_way' ];
        return $this->updateCard($params);
    }

    /**
     * 导入制卡
     * @param $params
     * @param $card_make_info
     * @param $giftcard_info
     * @return mixed
     */
    public function importMakeCard($params, $card_make_info, $giftcard_info)
    {
        $path = $card_make_info[ 'import_path' ];

        $card_data_list = [];

        if (!empty($path)) {
            try {

                //将文件内容读取出来
                $spreadsheet = IOFactory::load($path);
                // 选择要操作的工作表，这里选择第一个工作表
                $sheet = $spreadsheet->getSheet(0);
                // 获取行和列的数据
                $highestRow = $sheet->getHighestRow(); // 取得总行数
                $highestColumn = $sheet->getHighestColumn(); // 取得总列数

                $init_row = 2; // 初始行数
                $max = 101; // 单次最大数量

                $limit = $card_make_info[ 'total_count' ] - $card_make_info[ 'success_count' ] - $card_make_info[ 'fail_count' ]; // 剩余数量

                if ($card_make_info[ 'success_count' ] > 0 || $card_make_info[ 'fail_count' ] > 0) {
                    $init_row += ( $card_make_info[ 'success_count' ] + $card_make_info[ 'fail_count' ] );
                    if ($limit >= $max) {
                        $limit = $init_row + 99;
                    } else {
                        $limit += $init_row - 1;
                    }
                } else {
                    $limit = min($highestRow, $max);
                }

                $total_list = [];
                $fail_list = [];

                if ($card_make_info[ 'card_right_type' ] == GiftcardDict::cardRightTypeGoods) {

                    $total_list = [
                        [
                            '卡号', '密钥', '结果', '描述'
                        ]
                    ];
                    $fail_list = [
                        [
                            '卡号', '密钥', '结果', '描述'
                        ]
                    ];
                } elseif ($card_make_info[ 'card_right_type' ] == GiftcardDict::cardRightTypeBalance) {

                    $total_list = [
                        [
                            '卡号', '密钥', '面值', '结果', '描述'
                        ]
                    ];
                    $fail_list = [
                        [
                            '卡号', '密钥', '面值', '结果', '描述'
                        ]
                    ];
                }

                $success_count = 0;
                $fail_count = 0;

                // 循环读取每一行的数据
                for ($row = $init_row; $row <= $limit; ++$row) {
                    // 读取一行数据
                    $rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE);
                    // 根据需要处理$rowData
                    $item_data = $rowData[ 0 ];
                    $item_data = array_map(function($value) { return trim($value); }, $item_data);

                    $error = '';
                    try {

                        if ($card_make_info[ 'card_right_type' ] == GiftcardDict::cardRightTypeGoods) {

                            if (empty($item_data[ 0 ]) || empty($item_data[ 1 ])) throw new CommonException('GIFTCARD_CARD_NO_KEY_CANNOT_EMPTY');

                            if (is_special_character($item_data[ 0 ]) || is_special_character($item_data[ 1 ])) throw new CommonException('GIFTCARD_CARD_NO_KEY_SPECIAL_CHARACTER');

                        } elseif ($card_make_info[ 'card_right_type' ] == GiftcardDict::cardRightTypeBalance) {

                            if (empty($item_data[ 0 ]) || empty($item_data[ 1 ]) || empty($item_data[ 2 ])) {
                                throw new CommonException('GIFTCARD_CARD_NO_KEY_BALANCE_CANNOT_EMPTY');
                            }

                            if (is_special_character($item_data[ 0 ]) || is_special_character($item_data[ 1 ]) || is_special_character($item_data[ 2 ])) throw new CommonException('GIFTCARD_CARD_NO_KEY_BALANCE_SPECIAL_CHARACTER');

                            if (strlen($item_data[ 2 ]) > 6) {
                                throw new CommonException('GIFTCARD_BALANCE_LENGTH_CANNOT_GREATER_THAN_6');
                            }

                            if ($item_data[ 2 ] < 0) {
                                throw new CommonException('GIFTCARD_BALANCE_CANNOT_LESS_THAN_0');
                            }

                            $is_exist = false;
                            foreach ($giftcard_info[ 'balance_json' ] as $k => $v) {
                                if ($v[ 'balance' ] == intval($item_data[ 2 ])) {
                                    $is_exist = true;
                                    break;
                                }
                            }

                            if (!$is_exist) {
                                throw new CommonException('礼品卡未设置' . $item_data[ 2 ] . '元面值');
                            }

                        }

                        if (!empty($giftcard_info[ 'card_prefix' ]) && !str_starts_with($item_data[ 0 ], $giftcard_info[ 'card_prefix' ])) throw new CommonException('GIFTCARD_CARD_NO_PREFIX_NOT_MATCH');

                        if (!empty($giftcard_info[ 'card_suffix' ]) && !str_ends_with($item_data[ 0 ], $giftcard_info[ 'card_suffix' ])) throw new CommonException('GIFTCARD_CARD_NO_SUFFIX_NOT_MATCH');

                        if (strlen(trim(rtrim(ltrim($item_data[ 0 ], $giftcard_info[ 'card_prefix' ]), $giftcard_info[ 'card_suffix' ]))) != $giftcard_info[ 'card_no_length' ]) throw new CommonException('GIFTCARD_CARD_NO_LENGTH_NOT_MATCH');

                        if (strlen(trim($item_data[ 1 ])) != $giftcard_info[ 'card_key_length' ]) throw new CommonException('GIFTCARD_KEY_LENGTH_NOT_MATCH');

                        // 检测卡号是否存在
                        $card_no_count = $this->model->where([ [ 'site_id', '=', $params[ 'site_id' ] ], [ 'giftcard_id', '=', $params[ 'giftcard_id' ] ], [ 'card_no', "=", $item_data[ 0 ] ] ])->count();

                        if ($card_no_count > 0) throw new CommonException('GIFTCARD_CARD_NO_EXIST');

                        // 检测卡密是否存在
                        $card_key_count = $this->model->where([ [ 'site_id', '=', $params[ 'site_id' ] ], [ 'card_key', "=", $item_data[ 1 ] ] ])->count();

                        if ($card_key_count > 0) throw new CommonException('GIFTCARD_CARD_KEY_EXIST');

                        $card_data_list[] = [
                            'site_id' => $params[ 'site_id' ],
                            'giftcard_id' => $params[ 'giftcard_id' ],
                            'status' => CardDict::TO_ACTIVATE,
                            'source' => CardDict::GENERATE,
                            'card_no' => $item_data[ 0 ],
                            'card_key' => $item_data[ 1 ],
                            'balance' => isset($item_data[ 2 ]) ? intval($item_data[ 2 ]) : 0,
                            'card_make_id' => $params[ 'make_id' ],
                            'total_num' => $this->getCardTotalNum($giftcard_info),
                            'create_time' => time()
                        ];
                    } catch (\Exception $e) {
                        $error = get_lang($e->getMessage());
                    }

                    if ($card_make_info[ 'card_right_type' ] == GiftcardDict::cardRightTypeGoods) {
                        $temp_item_data = [
                            $item_data[ 0 ],
                            $item_data[ 1 ]
                        ];
                    } elseif ($card_make_info[ 'card_right_type' ] == GiftcardDict::cardRightTypeBalance) {
                        $temp_item_data = [
                            $item_data[ 0 ],
                            $item_data[ 1 ],
                            $item_data[ 2 ]
                        ];
                    }

                    if (!$error) {
                        $temp_item_data[] = '成功';
                        $total_list[] = $temp_item_data;
                        $success_count++;
                    } else {
                        $temp_item_data[] = '失败';
                        $temp_item_data[] = $error;
                        $total_list[] = $temp_item_data;
                        $fail_list[] = $temp_item_data;
                        $fail_count++;
                    }

                }

                $params[ 'total_count' ] = $highestRow - 1;
                $params[ 'success_count' ] = $success_count;
                $params[ 'fail_count' ] = $fail_count;
                $params[ 'total_list' ] = $total_list;
                $params[ 'fail_list' ] = $fail_list;
                $params[ 'make_card_way' ] = $card_make_info[ 'make_card_way' ];

                $this->model->insertAll($card_data_list);

                return $this->updateCard($params);

            } catch (\Exception $e) {
                throw new CommonException($e->getMessage());
            }
        }

    }

    /**
     * 更新卡密数据
     * @param $params
     * @return mixed
     * @throws \Exception
     */
    public function updateCard($params)
    {
        $card_count = $this->model->where([
            [ 'giftcard_id', '=', $params[ 'giftcard_id' ] ],
            [ 'card_make_id', '=', $params[ 'make_id' ] ],
        ])->count();

        $card_make_model = new GiftcardMake();

        $card_make_where = [
            [ 'site_id', '=', $params[ 'site_id' ] ],
            [ 'make_id', '=', $params[ 'make_id' ] ]
        ];
        $field = 'make_id,giftcard_id,total_count,success_count,fail_count,output,fail_output';
        $card_make_info = $card_make_model->field($field)->where($card_make_where)->findOrEmpty()->toArray();

        if ($params[ 'make_card_way' ] == GiftcardMakeDict::AUTO) {
            // 在线制卡
            $card_make_data = [
                'success_count' => $card_count
            ];
            if ($card_make_info[ 'total_count' ] == $card_count) {
                $card_make_data[ 'status' ] = GiftcardMakeDict::STATUS_FINISH;
            } else {
                $card_make_data[ 'status' ] = GiftcardMakeDict::STATUS_PROCEED;
            }
            $card_make_model->where($card_make_where)->update($card_make_data);
        } elseif ($params[ 'make_card_way' ] == GiftcardMakeDict::IMPORT) {
            // 导入制卡
            $update_data = [
                'total_count' => $params[ 'total_count' ],
                'success_count' => $card_make_info[ 'success_count' ] + $params[ 'success_count' ],
                'fail_count' => $card_make_info[ 'fail_count' ] + $params[ 'fail_count' ]
            ];

            // 将完整记录写入excel
            $output = $this->addLog($params[ 'site_id' ], $params[ 'total_list' ]);
            $update_data[ 'output' ] = empty($card_make_info[ 'output' ]) ? $output : array_merge($card_make_info[ 'output' ], $output);

            // 将失败记录写入excel
            $fail_output = $this->addLog($params[ 'site_id' ], $params[ 'fail_list' ], 'fail_output');
            $update_data[ 'fail_output' ] = empty($card_make_info[ 'fail_output' ]) ? $fail_output : array_merge($card_make_info[ 'fail_output' ], $fail_output);

            if ($card_make_info[ 'total_count' ] == $update_data[ 'success_count' ] + $update_data[ 'fail_count' ]) {
                $update_data[ 'status' ] = GiftcardMakeDict::STATUS_FINISH;
            } else {
                $update_data[ 'status' ] = GiftcardMakeDict::STATUS_PROCEED;
            }
            $card_make_model->where($card_make_where)->update($update_data);
        }

        //礼品卡制卡数量更新
        ( new CoreGiftcardService() )->updateMakeCardCount($params[ 'site_id' ], $params[ 'giftcard_id' ], $card_count);

        $field = 'make_id,giftcard_id,total_count,success_count,fail_count';
        $card_make_info = $card_make_model->field($field)->where($card_make_where)->findOrEmpty()->toArray();

        return $card_make_info;

    }

    /**
     * 添加导入制卡日志
     * @param $site_id
     * @param $log_list
     * @param $type
     * @return array
     * @throws \Exception
     */
    public function addLog($site_id, $log_list, $type = 'output')
    {
        $output = '';
        if (count($log_list) > 1) {
            $output_dir = public_path() . 'upload' . DIRECTORY_SEPARATOR . 'giftcard' . DIRECTORY_SEPARATOR . $site_id . DIRECTORY_SEPARATOR . $type . DIRECTORY_SEPARATOR;
            if (!is_dir($output_dir) && !mkdir($output_dir, 0777, true) && !is_dir($output_dir)) {

            } else {
                $output = $output_dir . create_no() . '.csv';
                $log_file = fopen($output, 'wb');
                foreach ($log_list as $row) {
                    fputcsv($log_file, $row, ',', '"');
                }
                fclose($log_file);
            }
        }
        return !empty($output) ? [ str_replace(public_path(), '', $output) ] : [];
    }

    /**
     * 批量生成卡号
     * @param $site_id
     * @param $giftcard_id
     * @param $num
     * @return array
     */
    public function createCardNo($site_id, $giftcard_id, $num)
    {
        $giftcard_model = new Giftcard();
        $giftcard_info = $giftcard_model->field('giftcard_id,make_card_count,card_no_length,card_prefix,card_suffix')
            ->where([
                [ 'site_id', '=', $site_id ],
                [ 'giftcard_id', "=", $giftcard_id ],
            ])->lock(true)->findOrEmpty()->toArray();

        if (empty($giftcard_info)) {
            throw new CommonException('GIFTCARD_NOT_FOUND');
        }
        $start_num = $giftcard_info[ 'make_card_count' ] + 1;
        $end_num = $giftcard_info[ 'make_card_count' ] + $num;
        $card_no_arr = [];
        for ($i = $start_num; $i <= $end_num; $i++) {
            $card_no_arr[] = $giftcard_info[ 'card_prefix' ] . sprintf('%0' . $giftcard_info[ 'card_no_length' ] . 'd', $i) . $giftcard_info[ 'card_suffix' ];
        }
        return $card_no_arr;
    }

    /**
     * 批量生成卡密
     * @param $site_id
     * @param $giftcard_id
     * @param $num
     * @return array
     */
    public function batchCreateCardKey($site_id, $giftcard_id, $num)
    {
        $giftcard_model = new Giftcard();
        $giftcard_info = $giftcard_model->field('giftcard_id,card_key_length,card_key_way')
            ->where([
                [ 'site_id', '=', $site_id ],
                [ 'giftcard_id', "=", $giftcard_id ],
            ])->findOrEmpty()->toArray();
        if (empty($giftcard_info)) {
            throw new CommonException('GIFTCARD_NOT_FOUND');
        }

        $card_key_arr = [];
        for ($i = 0; $i < $num; $i++) {
            $card_key_arr[] = $this->createCardKey($site_id, $giftcard_info);
        }
        return $card_key_arr;
    }

    /**
     * 生成卡密
     * @param $site_id
     * @param $giftcard_info
     * @return string
     */
    public function createCardKey($site_id, $giftcard_info)
    {
        $num_dict = '0123456789'; // 数字
        $latter_dict = 'abcdefghijklmnopqrstuvwxyz'; // 小写英文
        $big_latter_dict = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // 大写英文

        $dict = '';
        if (in_array('0-9', $giftcard_info[ 'card_key_way' ])) {
            $dict .= $num_dict;
        }
        if (in_array('a-z', $giftcard_info[ 'card_key_way' ])) {
            $dict .= $latter_dict;
        }
        if (in_array('A-Z', $giftcard_info[ 'card_key_way' ])) {
            $dict .= $big_latter_dict;
        }
        $dict_len = strlen($dict) - 1;

        $card_key = ''; // 卡密
        for ($k = 0; $k < $giftcard_info[ 'card_key_length' ]; $k++) {
            $index = abs($dict_len - $k);
            if ($index == 0) {
                $random = $dict_len;
            } elseif ($index > $dict_len) {
                $random = $dict_len;
            } else {
                $random = $index;
            }
            $temp_num = mt_rand(0, $random);
            $card_key .= $dict[ $temp_num ];
        }
        $card_key_count = $this->model->where([ [ 'site_id', '=', $site_id ], [ 'card_key', "=", $card_key ] ])->count();
        if ($card_key_count > 0) {
            return $this->createCardKey($site_id, $giftcard_info);
        }
        return $card_key;
    }

    /**
     * 获取礼品卡有效期
     * @param $giftcard_info
     * @return float|int
     */
    public function getValidityTime($giftcard_info)
    {
        $validity_time = 0;
        if (!empty($giftcard_info)) {
            //更新礼品卡有效期
            switch ($giftcard_info[ 'validity_type' ]) {
                case GiftcardDict::FOREVER:
                    $validity_time = 0;
                    break;
                case GiftcardDict::DAY:
                    $validity_time = time() + $giftcard_info[ 'validity_day' ] * 86400;
                    break;
                case GiftcardDict::DATE:
                    $validity_time = strtotime($giftcard_info[ 'validity_time' ]);
                    break;
            }
        }
        return $validity_time;
    }

    /**
     * 获取礼品卡有效期显示文本
     * @param $giftcard_info
     * @return float|int
     */
    public function getValidityTimeContent($giftcard_info)
    {
        $content = '';
        if (!empty($giftcard_info)) {
            //更新礼品卡有效期
            switch ($giftcard_info[ 'validity_type' ]) {
                case GiftcardDict::FOREVER:
                    $content = '有效期：永久有效';
                    break;
                case GiftcardDict::DAY:
                    $content = '有效期：购买后' . $giftcard_info[ 'validity_day' ] . '天有效';
                    break;
                case GiftcardDict::DATE:
                    $content = '有效期：截止日期至' . $giftcard_info[ 'validity_time' ];
                    break;
            }
        }
        return $content;
    }

    /**
     * 获取卡的使用总数量
     * @param $giftcard_info
     * @return int
     */
    public function getCardTotalNum($giftcard_info)
    {

        $total_num = 0;

        if ($giftcard_info[ 'card_right_type' ] == GiftcardDict::cardRightTypeBalance) {
            // 储值卡，使用数量为一次
            $total_num = 1;
        } elseif ($giftcard_info[ 'card_right_type' ] == GiftcardDict::cardRightTypeGoods) {

            if ($giftcard_info[ 'card_goods_type' ] == 'all') {
                // 打包全部商品
                $giftcard_goods_model = new GiftcardGoods();
                $total_num = $giftcard_goods_model->where([ [ 'giftcard_id', "=", $giftcard_info[ 'giftcard_id' ] ] ])->sum('num');

            } elseif ($giftcard_info[ 'card_goods_type' ] == 'diy') {
                // 任选N件商品
                $total_num = $giftcard_info[ 'card_goods_count' ];
            }
        }

        return $total_num;

    }

    /**
     * 激活实体礼品卡
     * @param $params
     * @return mixed
     */
    public function activateRealCard($params)
    {
        $field = 'card_id,giftcard_id,card_no,card_key,balance,total_num';
        $card_info = $this->model->field($field)->where([
            [ 'site_id', '=', $params[ 'site_id' ] ],
            [ 'card_no', "=", $params[ 'card_no' ] ],
            [ 'card_key', '=', $params[ 'card_key' ] ],
            [ 'member_id', '=', 0 ],
            [ 'status', '=', CardDict::TO_ACTIVATE ],
        ])->with([ 'giftcard' ])->findOrEmpty()->toArray();

        if (empty($card_info)) {
            throw new CommonException('CARD_KEY_INVALID_OR_ACTIVATED');
        }

        if (empty($card_info[ 'giftcard' ])) {
            throw new CommonException('GIFTCARD_NOT_FOUND');
        }

        // 只能激活实体卡
        if ($card_info[ 'giftcard' ][ 'type' ] != GiftcardDict::REAL) {
            throw new CommonException('GIFTCARD_NOT_FOUND');
        }

        if ($card_info[ 'giftcard' ][ 'status' ] == GiftcardDict::OFF) {
            throw new CommonException('GIFTCARD_HAS_DOWN');
        }

        $bag_data = [
            'giftcard_id' => $card_info[ 'giftcard' ][ 'giftcard_id' ],
            'card_right_type' => $card_info[ 'giftcard' ][ 'card_right_type' ],
            'balance' => $card_info[ 'balance' ],
            'delivery_way' => $card_info[ 'giftcard' ][ 'delivery_way' ],
            'card_goods_type' => $card_info[ 'giftcard' ][ 'card_goods_type' ],
            'validity_type' => $card_info[ 'giftcard' ][ 'validity_type' ],
            'is_give' => $card_info[ 'giftcard' ][ 'is_give' ],
            'card_cover' => explode(',', $card_info[ 'giftcard' ][ 'cover' ])[ 0 ],
            'total_count' => 1
        ];

        $validity_time = $this->getValidityTime($card_info[ 'giftcard' ]);
        if ($validity_time == 0 || $validity_time > time()) {
            $status = CardDict::TO_USE;
            $invalid_time = 0;
            $bag_data['to_use_count'] = 1;
        } else {
            $status = CardDict::INVALID;
            $invalid_time = time();
            $bag_data['invalid_count'] = 1;
        }

        Db::startTrans();
        try {
            // 生成卡包
            $member_card_bag_service = new CoreMemberCardBagService();
            $card_bag_id = $member_card_bag_service->generate($params[ 'site_id' ], $params[ 'member_id' ], $bag_data);

            $this->model->where([
                [ 'site_id', '=', $params[ 'site_id' ] ],
                [ 'card_id', '=', $card_info[ 'card_id' ] ]
            ])->update([
                'status' => $status,
                'member_id' => $params[ 'member_id' ],
                'card_cover' => explode(',', $card_info[ 'giftcard' ][ 'cover' ])[ 0 ], // todo 默认封面取第一张，后续做修改封面功能
                'activate_time' => time(),
                'validity_time' => $this->getValidityTime($card_info[ 'giftcard' ]),
                'invalid_time' => $invalid_time,
                'card_bag_id' => $card_bag_id
            ]);

            $card_goods_model = new CardGoods();
            $giftcard_goods_model = new GiftcardGoods();

            if ($card_info[ 'giftcard' ][ 'card_right_type' ] == GiftcardDict::cardRightTypeGoods) {
                // 兑换卡

                $card_goods_list = [];
                $field = 'id,giftcard_id,goods_id,sku_id,num';
                $goods_sku_list = $giftcard_goods_model->field($field)->where([ [ 'giftcard_id', "=", $card_info[ 'giftcard' ][ 'giftcard_id' ] ] ])->with([ 'goods', 'sku' ])->select()->toArray();
                foreach ($goods_sku_list as $k => $v) {
                    $card_goods_list[] = [
                        'site_id' => $params[ 'site_id' ],
                        'card_id' => $card_info[ 'card_id' ],
                        'giftcard_id' => $card_info[ 'giftcard' ][ 'giftcard_id' ],
                        'goods_id' => $v[ 'goods_id' ],
                        'sku_id' => $v[ 'sku_id' ],
                        'goods_name' => $v[ 'goods' ][ 'goods_name' ],
                        'sku_name' => $v[ 'sku' ][ 'sku_name' ],
                        'sku_image' => $v[ 'sku' ][ 'sku_image' ],
                        'sku_no' => $v[ 'sku' ][ 'sku_no' ],
                        'price' => $v[ 'sku' ][ 'price' ],
                        'total_num' => $v[ 'num' ],
                    ];
                }

                $card_goods_model->insertAll($card_goods_list);

            } elseif ($card_info[ 'giftcard' ][ 'card_right_type' ] == GiftcardDict::cardRightTypeBalance) {
                // 储值卡
                $card_goods_data = [
                    'site_id' => $params[ 'site_id' ],
                    'card_id' => $card_info[ 'card_id' ],
                    'giftcard_id' => $card_info[ 'giftcard' ][ 'giftcard_id' ],
                    'goods_id' => 0,
                    'sku_id' => 0,
                    'goods_name' => '储值余额' . $card_info[ 'balance' ] . '元',
                    'price' => $card_info[ 'balance' ],
                    'total_num' => $card_info[ 'total_num' ],
                ];
                $card_goods_model->create($card_goods_data);
            }

            $member_records_service = new CoreMemberRecordsService();
            $member_records_service->add([
                'site_id' => $params[ 'site_id' ],
                'card_id' => $card_info[ 'card_id' ],
                'member_id' => $params[ 'member_id' ],
                'source' => CardDict::ACTIVATE
            ]);

            //增加日志
            $log_data = [
                'giftcard_id' => $card_info[ 'giftcard_id' ],
                'card_id' => $card_info[ 'card_id' ],
                'member_id' => $params[ 'member_id' ],
                'site_id' => $params[ 'site_id' ],
                'type' => GiftcardLogDict::CARD_ACTIVE_ACTION,
                'remark' => '通过卡密激活了该实体卡'
            ];
            ( new CoreGiftcardLogService() )->add($log_data, 'member');

            //实体卡激活数量更新
            ( new CoreGiftcardService() )->updateActivateCount($params[ 'site_id' ], $card_info[ 'giftcard_id' ], 1);

            $field = 'card_id,giftcard_id';
            $new_card_info = $this->model->field($field)->where([
                [ 'card_id', '=', $card_info[ 'card_id' ] ],
            ])->with([ 'giftcard' ])->findOrEmpty()->toArray();

            Db::commit();
            return $new_card_info;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }

    }

    /**
     * 获取卡的来源列表
     * @return array|mixed
     */
    public function getSourceList()
    {
        return CardDict::getSourceList();
    }

    /**
     * 获取卡的状态
     * @param string $card_type
     * @return array|mixed
     */
    public function getStatusListByType($card_type = '')
    {
        return CardDict::getStatusListByType($card_type);
    }

    /**
     * 更新礼品卡状态
     * @return bool
     */
    public function editStatus($site_id, $id, array $data)
    {
        $data = [
            'status' => $data[ 'status' ]
        ];
        $this->model->where([ [ 'site_id', '=', $site_id ], [ 'card_id', "=", $id ] ])->update($data);
        return true;
    }

    /**
     * 更新礼品卡使用次数
     * @return bool
     */
    public function editUseNum($site_id, $id, array $data)
    {
        $data = [
            'use_num' => Db::raw('use_num+' . $data[ 'use_num' ]),
            'use_time' => time()
        ];
        $this->model->where([ [ 'site_id', '=', $site_id ], [ 'card_id', "=", $id ] ])->update($data);
        return true;
    }

    /**
     * 累减礼品卡使用次数
     * @return bool
     */
    public function decUseNum($site_id, $id, array $data)
    {
        $this->model->where([ [ 'site_id', '=', $site_id ], [ 'card_id', "=", $id ] ])->dec('use_num', $data[ 'use_num' ])->update();
        return true;
    }

    /**
     * 礼品卡过期
     * @param $ids
     * @return bool
     */
    public function expire($ids)
    {
        Log::write('礼品卡过期');
        $field = 'card_id,giftcard_id,member_id,site_id,status,card_bag_id';
        $card_list = $this->model->where([
            [ 'card_id', 'in', $ids ],
        ])->field($field)->select()->toArray();
        Db::startTrans();
        try {
            foreach ($card_list as $item) {
                //增加日志
                $log_data = [
                    'giftcard_id' => $item[ 'giftcard_id' ],
                    'card_id' => $item[ 'card_id' ],
                    'site_id' => $item[ 'site_id' ],
                    'type' => GiftcardLogDict::CARD_EXPIRE_ACTION,
                    'remark' => '礼品卡状态变更为已失效'
                ];
                ( new CoreGiftcardLogService() )->add($log_data, 'system');
                //礼品卡作废数量更新
                ( new CoreGiftcardService() )->updateInvalidCount($item[ 'site_id' ], $item[ 'giftcard_id' ], 1);
                // 更新卡包过期数量
                if ($item['status'] == CardDict::TO_USE) {
                    ( new CoreMemberCardBagService() )->editCount($item[ 'site_id' ], $item[ 'member_id' ], $item[ 'card_bag_id' ], [ 'to_use_count' => -1, 'invalid_count' => 1 ]);
                }
                if ($item['status'] == CardDict::CAN_USE) {
                    ( new CoreMemberCardBagService() )->editCount($item[ 'site_id' ], $item[ 'member_id' ], $item[ 'card_bag_id' ], [ 'can_use_count' => -1, 'invalid_count' => 1 ]);
                }
            }
            $where = [
                [ 'card_id', 'in', $ids ],
                [ 'status', 'in', [ CardDict::TO_USE, CardDict::CAN_USE ] ]
            ];
            $data = [
                'status' => CardDict::INVALID,
                'invalid_time' => time()
            ];
            $this->model->where($where)->update($data);
            Db::commit();
            return true;
        } catch (\Exception $e) {
            Log::write('礼品卡过期CoreCardService\expire发生错误, 错误原因:' . $e->getMessage() . $e->getFile() . $e->getLine());
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
        return true;
    }

}
