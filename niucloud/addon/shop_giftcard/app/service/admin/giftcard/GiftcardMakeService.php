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

namespace addon\shop_giftcard\app\service\admin\giftcard;


use addon\shop_giftcard\app\dict\giftcard\GiftcardDict;
use addon\shop_giftcard\app\dict\giftcard\GiftcardMakeDict;
use addon\shop_giftcard\app\model\card\Card;
use addon\shop_giftcard\app\model\giftcard\GiftcardMake;
use addon\shop_giftcard\app\service\core\giftcard\CoreGiftcardService;
use core\base\BaseAdminService;
use core\exception\AdminException;
use PhpOffice\PhpSpreadsheet\IOFactory;
use think\facade\Db;


/**
 * 礼品卡实体制卡服务层
 * Class GiftcardMakeService
 * @package addon\shop_giftcard\app\service\admin\giftcard
 */
class GiftcardMakeService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new GiftcardMake();
    }

    /**
     * 获取礼品卡实体制卡列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'make_id,giftcard_id,card_right_type,make_card_way,import_path,status,total_count,success_count,fail_count,fail_remark,output,fail_output,create_time';
        $order = 'create_time desc';

        $search_model = $this->model->where([ [ 'site_id', "=", $this->site_id ] ])->withSearch([ "giftcard_id" ], $where)->field($field)->order($order)->append([ 'status_name', 'make_card_way_name', 'card_right_type_name' ]);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 添加礼品卡实体制卡
     * @param array $params
     * @return mixed
     */
    public function add(array $params)
    {

        $giftcard_service = new GiftcardService();
        $giftcard_info = $giftcard_service->getInfo($params[ 'giftcard_id' ], 'giftcard_id,type,card_name,card_right_type,card_key_way,card_key_length,card_no_length,card_prefix,card_suffix');
        if (empty($giftcard_info)) {
            throw new AdminException('GIFTCARD_NOT_FOUND');
        }

        if ($giftcard_info[ 'type' ] != GiftcardDict::REAL) {
            throw new AdminException('GIFTCARD_NOT_SUPPORT_MAKE');
        }

        //  文件上传，解析卡数据
        if ($params[ 'make_card_way' ] == GiftcardMakeDict::IMPORT && !empty($params[ 'import_path' ])) {
            $path = $params[ 'import_path' ];
            try {

                // 将文件内容读取出来
                $spreadsheet = IOFactory::load($path);
                // 选择要操作的工作表，这里选择第一个工作表
                $sheet = $spreadsheet->getSheet(0);

                // 获取行和列的数据
                $highestRow = $sheet->getHighestRow(); // 取得总行数

                $highestColumn = $sheet->getHighestColumn(); // 取得总列数

                $init_row = 2; // 初始行数

                if ($highestRow == 1) throw new AdminException('GIFTCARD_TEMPLATE_CANNOT_EMPTY');
                if ($highestRow > 1001) throw new AdminException('GIFTCARD_BEYOND_MAX_MAKE_CARD_COUNT');

                if ($giftcard_info[ 'card_right_type' ] == GiftcardDict::cardRightTypeBalance) {

                    $balance_json = [];

                    $latter_dict = 'abcdefghijklmnopqrstuvwxyz'; // 小写英文

                    // 循环读取每一行的数据
                    for ($row = $init_row; $row <= $highestRow; ++$row) {
                        // 读取一行数据
                        $rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE);
                        // 根据需要处理$rowData
                        $item_data = $rowData[ 0 ];
                        $item_data = array_map(function($value) { return trim($value); }, $item_data);

                        $error = '';
                        try {

                            if (empty($item_data[ 0 ]) || empty($item_data[ 1 ]) || empty($item_data[ 2 ])) {
                                throw new AdminException('GIFTCARD_CARD_NO_KEY_BALANCE_CANNOT_EMPTY');
                            }

                            if (is_special_character($item_data[ 0 ]) || is_special_character($item_data[ 1 ]) || is_special_character($item_data[ 2 ])) throw new AdminException('GIFTCARD_CARD_NO_KEY_BALANCE_SPECIAL_CHARACTER');

                            if (!empty($giftcard_info[ 'card_prefix' ]) && !str_starts_with($item_data[ 0 ], $giftcard_info[ 'card_prefix' ])) throw new AdminException('GIFTCARD_CARD_NO_PREFIX_NOT_MATCH');

                            if (!empty($giftcard_info[ 'card_suffix' ]) && !str_ends_with($item_data[ 0 ], $giftcard_info[ 'card_suffix' ])) throw new AdminException('GIFTCARD_CARD_NO_SUFFIX_NOT_MATCH');

                            if (strlen(trim(rtrim(ltrim($item_data[ 0 ], $giftcard_info[ 'card_prefix' ]), $giftcard_info[ 'card_suffix' ]))) != $giftcard_info[ 'card_no_length' ]) throw new AdminException('GIFTCARD_CARD_NO_LENGTH_NOT_MATCH');

                            if (strlen(trim($item_data[ 1 ])) != $giftcard_info[ 'card_key_length' ]) throw new AdminException('GIFTCARD_KEY_LENGTH_NOT_MATCH');

                            if (strlen($item_data[ 2 ]) > 6) {
                                throw new AdminException('GIFTCARD_BALANCE_LENGTH_CANNOT_GREATER_THAN_6');
                            }

                            if ($item_data[ 2 ] < 0) {
                                throw new AdminException('GIFTCARD_BALANCE_CANNOT_LESS_THAN_0');
                            }

                            $id = '';
                            for ($i = 0; $i < 12; $i++) {
                                $temp_num = mt_rand(0, 12);
                                $id .= $latter_dict[ $temp_num ];
                            }

                            if (!empty($balance_json[ 'balance_' . $item_data[ 2 ] ])) {
                                $balance_json[ 'balance_' . $item_data[ 2 ] ][ 'count' ] += 1;
                                $balance_json[ 'balance_' . $item_data[ 2 ] ][ 'total_count' ] += 1;
                            } else {
                                $balance_json[ 'balance_' . $item_data[ 2 ] ] = [
                                    'id' => $id,
                                    'balance' => intval($item_data[ 2 ]),
                                    'count' => 1,
                                    'make_count' => 0,
                                    'total_count' => 1,
                                    'status' => 'no_start'
                                ];
                            }

                        } catch (\Exception $e) {
                            $error = get_lang($e->getMessage());
                        }

                        $temp_item_data = [ $item_data[ 0 ], $item_data[ 1 ], $item_data[ 2 ] ];

                        if (!$error) {
                            $temp_item_data[] = '成功';
                        } else {
                            $temp_item_data[] = '失败';
                            $temp_item_data[] = $error;
                        }

                    }

                    $params[ 'balance_json' ] = array_values($balance_json);
                }

                $params[ 'total_count' ] = $highestRow - 1;

            } catch (\Exception $e) {
                throw new AdminException($e->getMessage());
            }
        }

        $data = array(
            'site_id' => $this->site_id,
            'giftcard_id' => $params[ 'giftcard_id' ],
            'card_right_type' => $params[ 'card_right_type' ],
            'balance_json' => $params[ 'balance_json' ],
            'make_card_way' => $params[ 'make_card_way' ],
            'total_count' => $params[ 'total_count' ],
            'import_path' => $params[ 'import_path' ],
            'status' => GiftcardMakeDict::STATUS_WAIT
        );

        $res = $this->model->create($data);
        return $res->make_id;
    }

    /**
     * 删除礼品卡实体制卡
     * @param int $id
     * @return bool
     */
    public function del($id)
    {
        $model = $this->model->where([ [ 'make_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->find();
        $card_model = new Card();
        $card_count = $card_model->where([ [ 'card_make_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->count();
        Db::startTrans();
        try {
            // 礼品卡制卡数量累减
            (new CoreGiftcardService())->decMakeCardCount($this->site_id, $model->giftcard_id, $card_count);
            $model->delete();
            $card_model->where([['card_make_id', '=', $id], ['site_id', '=', $this->site_id]])->select()->delete();

            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            return false;
        }
    }

}
