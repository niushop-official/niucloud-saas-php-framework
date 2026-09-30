<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\dict\notice;

/**
 * 站内信字典
 */
class NoticeMessageDict
{
    // 一级分类
    public const TRADE = 'trade';           // 交易消息
    public const GOODS = 'goods';           // 商品消息
    public const AFTERSALE = 'aftersale';   // 售后服务
    public const FINANCE = 'finance';       // 财务消息
    public const SHOP = 'shop';             // 店铺服务
    public const OTHER = 'other';           // 其它消息

    // 二级分类
    public const NEW_ORDER = 'new_order';               // 新订单
    public const PAY_ORDER = 'pay_order';               // 已付款订单
    public const COMPLETE_ORDER = 'complete_order';     // 订单完成
    public const CANCEL_ORDER = 'cancel_order';         // 订单取消
    public const STOCK_WARNING = 'stock_warning';       // 库存预警
    public const NO_STOCK = 'no_stock';                 // 商品缺货
    public const GOODS_DOWN = 'goods_down';             // 商品下架
    public const GOODS_AUDIT = 'goods_audit';           // 商品审核
    public const REFUND_APPLY = 'refund_apply';         // 退款申请
    public const RETURN_APPLY = 'return_apply';         // 退货申请
    public const SHOP_WITHDRAWAL = 'shop_withdrawal';    // 店铺提现
    public const MEMBER_WITHDRAWAL = 'member_withdrawal';// 用户提现
    public const INVOICE_APPLY = 'invoice_apply';       // 发票申请
    public const SHOP_APPLY = 'shop_apply';             // 店铺申请
    public const SYSTEM_NOTICE = 'system_notice';       // 系统公告
    public const ACCOUNT_NOTICE = 'account_notice';     // 账户通知

    // 消息主体类型
    public const ADMIN = 'admin';     // 平台端
    public const SITE = 'site';       // 站点端
    public const MEMBER = 'member';   // 会员端

    // 消息状态
    public const UNREAD = 0;   // 未读
    public const READ = 1;     // 已读

    // 消息等级
    public const LEVEL_INFO = 'info';
    public const LEVEL_SUCCESS = 'success';
    public const LEVEL_WARNING = 'warning';
    public const LEVEL_ERROR = 'error';

    /**
     * 分类树（一级分类 => 名称 + 二级分类列表）
     * main_type 决定该分类在哪个端口可见：平台端只看得到 admin，站点端只看得到 site
     * @param string $category 传值则返回指定一级分类，否则返回全部
     * @param string $main_type 消息主体类型
     * @return array
     */
    public static function getCategory(string $category = '', string $main_type = ''): array
    {
        $list = [
            self::OTHER => [
                'name' => '其它消息',
                'main_type' => [self::ADMIN, self::SITE],
                'sub' => [
                    self::SYSTEM_NOTICE => [
                        'name' => '系统公告',
                        'main_type' => [self::ADMIN, self::SITE],
                    ],
                    self::ACCOUNT_NOTICE => [
                        'name' => '账户通知',
                        'main_type' => [self::ADMIN, self::SITE],
                    ],
                ],
            ],
            self::TRADE => [
                'name' => '交易消息',
                'main_type' => [self::SITE],
                'sub' => [
                    self::NEW_ORDER => [
                        'name' => '新订单',
                        'main_type' => [self::SITE],
                    ],
                    self::PAY_ORDER => [
                        'name' => '已付款订单',
                        'main_type' => [self::SITE],
                    ],
                    self::COMPLETE_ORDER => [
                        'name' => '订单完成',
                        'main_type' => [self::SITE],
                    ],
                    self::CANCEL_ORDER => [
                        'name' => '订单取消',
                        'main_type' => [self::SITE],
                    ],
                ],
            ],
            self::GOODS => [
                'name' => '商品消息',
                'main_type' => [self::ADMIN, self::SITE],
                'sub' => [
                    self::STOCK_WARNING => [
                        'name' => '库存预警',
                        'main_type' => [self::SITE],
                    ],
                    self::GOODS_AUDIT => [
                        'name' => '商品审核',
                        'main_type' => [self::ADMIN],
                    ],
                ],
            ],
            self::AFTERSALE => [
                'name' => '售后服务',
                'main_type' => [self::SITE],
                'sub' => [
                    self::REFUND_APPLY => [
                        'name' => '退款申请',
                        'main_type' => [self::SITE],
                    ],
                    self::RETURN_APPLY => [
                        'name' => '退货申请',
                        'main_type' => [self::SITE],
                    ],
                ],
            ],
            self::FINANCE => [
                'name' => '财务消息',
                'main_type' => [self::ADMIN, self::SITE],
                'sub' => [
                    self::SHOP_WITHDRAWAL => [
                        'name' => '店铺提现',
                        'main_type' => [self::ADMIN],
                    ],
                    self::MEMBER_WITHDRAWAL => [
                        'name' => '用户提现',
                        'main_type' => [self::ADMIN],
                    ],
                    self::INVOICE_APPLY => [
                        'name' => '发票申请',
                        'main_type' => [self::SITE],
                    ],
                ],
            ],
            self::SHOP => [
                'name' => '店铺服务',
                'main_type' => [self::ADMIN],
                'sub' => [
                    self::SHOP_APPLY => [
                        'name' => '入驻申请',
                        'main_type' => [self::ADMIN],
                    ],
                ],
            ],
        ];

        if ($main_type) {
            foreach ($list as $key => $item) {
                $item['sub'] = array_filter($item['sub'], function ($sub_item) use ($main_type) {
                    return in_array($main_type, $sub_item['main_type']);
                });
                if (!in_array($main_type, $item['main_type']) || empty($item['sub'])) {
                    unset($list[$key]);
                } else {
                    $list[$key] = $item;
                }
            }
        }

        if ($category === '') return $list;
        return $list[$category] ?? [];
    }

    /**
     * 一级分类名称
     * @param string $category
     * @return string
     */
    public static function getCategoryName(string $category): string
    {
        return self::getCategory($category)['name'] ?? '';
    }

    /**
     * 二级分类名称
     * @param string $category
     * @param string $sub_category
     * @return string
     */
    public static function getSubCategoryName(string $category, string $sub_category): string
    {
        return self::getCategory($category)['sub'][$sub_category]['name'] ?? '';
    }

    /**
     * 消息主体类型
     * @param string $type
     * @return array|string
     */
    public static function getMainType(string $type = '')
    {
        $data = [
            self::ADMIN => get_lang('dict_notice_message_main_type.admin'),// 平台
            self::SITE => get_lang('dict_notice_message_main_type.site'),// 站点
            self::MEMBER => get_lang('dict_notice_message_main_type.member'),// 会员
        ];
        if (!$type) {
            return $data;
        }
        return $data[$type] ?? '';
    }

    /**
     * 消息等级
     * @param string $level
     * @return array|string
     */
    public static function getLevel(string $level = '')
    {
        $data = [
            self::LEVEL_INFO => get_lang('dict_notice_message_level.info'),
            self::LEVEL_SUCCESS => get_lang('dict_notice_message_level.success'),
            self::LEVEL_WARNING => get_lang('dict_notice_message_level.warning'),
            self::LEVEL_ERROR => get_lang('dict_notice_message_level.error'),
        ];
        if (!$level) {
            return $data;
        }
        return $data[$level] ?? '';
    }
}
