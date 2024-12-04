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
namespace app\listener\system;

use app\model\sys\SysAttachment;
use app\model\sys\SysAttachmentCategory;

/**
 * 站点创建之后
 */
class AddSiteAfterListener
{
    public function handle($params = [])
    {
        $site_id = $params[ 'site_id' ];
        request()->siteId($site_id);

        // 创建素材
        $category_model = new SysAttachmentCategory();
        $category_info = $category_model->where([
            [ 'site_id', '=', $site_id ],
            [ 'name', '=', '默认素材' ]
        ])->field('id')->findOrEmpty()->toArray();

        if (!empty($category_info)) {
            $category_id = $category_info[ 'id' ];
        } else {
            $attachment_category = $category_model->create([
                'site_id' => $site_id,
                'pid' => 0,
                'type' => 'image',
                'name' => '默认素材',
                'sort' => 0
            ]);
            $category_id = $attachment_category->id;
        }

        $attachment_model = new SysAttachment();
        $attachment_list = [
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'banner1.jpg', // 附件名称
                'real_name' => '轮播素材01', // 原始文件名
                'path' => 'static/resource/images/attachment/banner1.jpg', // 完整地址
                'url' => 'static/resource/images/attachment/banner1.jpg', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '84097', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'banner2.jpg', // 附件名称
                'real_name' => '轮播素材02', // 原始文件名
                'path' => 'static/resource/images/attachment/banner2.jpg', // 完整地址
                'url' => 'static/resource/images/attachment/banner2.jpg', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '54862', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'banner3.jpg', // 附件名称
                'real_name' => '轮播素材03', // 原始文件名
                'path' => 'static/resource/images/attachment/banner3.jpg', // 完整地址
                'url' => 'static/resource/images/attachment/banner3.jpg', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '78247', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'banner4.png', // 附件名称
                'real_name' => '轮播素材04', // 原始文件名
                'path' => 'static/resource/images/attachment/banner4.png', // 完整地址
                'url' => 'static/resource/images/attachment/banner4.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '95324', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'banner5.png', // 附件名称
                'real_name' => '轮播素材05', // 原始文件名
                'path' => 'static/resource/images/attachment/banner5.png', // 完整地址
                'url' => 'static/resource/images/attachment/banner5.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '97570', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'logo.png', // 附件名称
                'real_name' => '生活圈', // 原始文件名
                'path' => 'static/resource/images/attachment/logo.png', // 完整地址
                'url' => 'static/resource/images/attachment/logo.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '1517', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'nav_coupon.png', // 附件名称
                'real_name' => '优惠券', // 原始文件名
                'path' => 'static/resource/images/attachment/nav_coupon.png', // 完整地址
                'url' => 'static/resource/images/attachment/nav_coupon.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '30937', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'nav_discount.png', // 附件名称
                'real_name' => '限时折扣', // 原始文件名
                'path' => 'static/resource/images/attachment/nav_discount.png', // 完整地址
                'url' => 'static/resource/images/attachment/nav_discount.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '33870', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'nav_fenxiao.png', // 附件名称
                'real_name' => '分销管理', // 原始文件名
                'path' => 'static/resource/images/attachment/nav_fenxiao.png', // 完整地址
                'url' => 'static/resource/images/attachment/nav_fenxiao.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '24026', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'nav_fenxiao_zone.png', // 附件名称
                'real_name' => '分销专区', // 原始文件名
                'path' => 'static/resource/images/attachment/nav_fenxiao_zone.png', // 完整地址
                'url' => 'static/resource/images/attachment/nav_fenxiao_zone.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '33429', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'nav_giftcard.png', // 附件名称
                'real_name' => '礼品卡', // 原始文件名
                'path' => 'static/resource/images/attachment/nav_giftcard.png', // 完整地址
                'url' => 'static/resource/images/attachment/nav_giftcard.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '29399', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'nav_my_address.png', // 附件名称
                'real_name' => '收货地址', // 原始文件名
                'path' => 'static/resource/images/attachment/nav_my_address.png', // 完整地址
                'url' => 'static/resource/images/attachment/nav_my_address.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '25280', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'nav_my_newcomer.png', // 附件名称
                'real_name' => '新人专享', // 原始文件名
                'path' => 'static/resource/images/attachment/nav_my_newcomer.png', // 完整地址
                'url' => 'static/resource/images/attachment/nav_my_newcomer.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '32123', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'nav_news_info.png', // 附件名称
                'real_name' => '新闻资讯', // 原始文件名
                'path' => 'static/resource/images/attachment/nav_news_info.png', // 完整地址
                'url' => 'static/resource/images/attachment/nav_news_info.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '27934', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'nav_point_index.png', // 附件名称
                'real_name' => '积分商城', // 原始文件名
                'path' => 'static/resource/images/attachment/nav_point_index.png', // 完整地址
                'url' => 'static/resource/images/attachment/nav_point_index.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '27946 ', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'nav_sign_in.png', // 附件名称
                'real_name' => '签到', // 原始文件名
                'path' => 'static/resource/images/attachment/nav_sign_in.png', // 完整地址
                'url' => 'static/resource/images/attachment/nav_sign_in.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '33576', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'notice.png', // 附件名称
                'real_name' => '新闻咨询', // 原始文件名
                'path' => 'static/resource/images/attachment/notice.png', // 完整地址
                'url' => 'static/resource/images/attachment/notice.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '3069', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'picture_show_head_text2.png', // 附件名称
                'real_name' => '品牌特卖', // 原始文件名
                'path' => 'static/resource/images/attachment/picture_show_head_text2.png', // 完整地址
                'url' => 'static/resource/images/attachment/picture_show_head_text2.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '2825', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'picture_show_head_text3.png', // 附件名称
                'real_name' => '官方补贴', // 原始文件名
                'path' => 'static/resource/images/attachment/picture_show_head_text3.png', // 完整地址
                'url' => 'static/resource/images/attachment/picture_show_head_text3.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '2549', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'single_recommend_banner1.jpg', // 附件名称
                'real_name' => '精选推荐01', // 原始文件名
                'path' => 'static/resource/images/attachment/single_recommend_banner1.jpg', // 完整地址
                'url' => 'static/resource/images/attachment/single_recommend_banner1.jpg', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '71670', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'single_recommend_banner2.jpg', // 附件名称
                'real_name' => '精选推荐02', // 原始文件名
                'path' => 'static/resource/images/attachment/single_recommend_banner2.jpg', // 完整地址
                'url' => 'static/resource/images/attachment/single_recommend_banner2.jpg', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '72948', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'single_recommend_text1.png', // 附件名称
                'real_name' => '精选推荐', // 原始文件名
                'path' => 'static/resource/images/attachment/single_recommend_text1.png', // 完整地址
                'url' => 'static/resource/images/attachment/single_recommend_text1.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '3664', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'my_cart.png', // 附件名称
                'real_name' => '购物车', // 原始文件名
                'path' => 'static/resource/images/attachment/my_cart.png', // 完整地址
                'url' => 'static/resource/images/attachment/my_cart.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '31921', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'home_delivery.png', // 附件名称
                'real_name' => '送货上门', // 原始文件名
                'path' => 'static/resource/images/attachment/home_delivery.png', // 完整地址
                'url' => 'static/resource/images/attachment/home_delivery.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '30811', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'nav_all_class.png', // 附件名称
                'real_name' => '全部分类', // 原始文件名
                'path' => 'static/resource/images/attachment/nav_all_class.png', // 完整地址
                'url' => 'static/resource/images/attachment/nav_all_class.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '25427', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'nav_balance.png', // 附件名称
                'real_name' => '我的余额', // 原始文件名
                'path' => 'static/resource/images/attachment/nav_balance.png', // 完整地址
                'url' => 'static/resource/images/attachment/nav_balance.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '31437', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'nav_collect.png', // 附件名称
                'real_name' => '我的收藏', // 原始文件名
                'path' => 'static/resource/images/attachment/nav_collect.png', // 完整地址
                'url' => 'static/resource/images/attachment/nav_collect.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '24533', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'nav_coupon_01.png', // 附件名称
                'real_name' => '瓜分好券', // 原始文件名
                'path' => 'static/resource/images/attachment/nav_coupon_01.png', // 完整地址
                'url' => 'static/resource/images/attachment/nav_coupon_01.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '27068', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'nav_leaderboard.png', // 附件名称
                'real_name' => '排行榜', // 原始文件名
                'path' => 'static/resource/images/attachment/nav_leaderboard.png', // 完整地址
                'url' => 'static/resource/images/attachment/nav_leaderboard.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '30098', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'nav_member.png', // 附件名称
                'real_name' => '会员中心', // 原始文件名
                'path' => 'static/resource/images/attachment/nav_member.png', // 完整地址
                'url' => 'static/resource/images/attachment/nav_member.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '30793', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'nav_point.png', // 附件名称
                'real_name' => '我的积分', // 原始文件名
                'path' => 'static/resource/images/attachment/nav_point.png', // 完整地址
                'url' => 'static/resource/images/attachment/nav_point.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '28112', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'nav_shop.png', // 附件名称
                'real_name' => '线上商城', // 原始文件名
                'path' => 'static/resource/images/attachment/nav_shop.png', // 完整地址
                'url' => 'static/resource/images/attachment/nav_shop.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '23057', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'nav_travel.png', // 附件名称
                'real_name' => '旅游出行', // 原始文件名
                'path' => 'static/resource/images/attachment/nav_travel.png', // 完整地址
                'url' => 'static/resource/images/attachment/nav_travel.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '27429', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ],
            [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'nva_group_booking.png', // 附件名称
                'real_name' => '拼团返利', // 原始文件名
                'path' => 'static/resource/images/attachment/nva_group_booking.png', // 完整地址
                'url' => 'static/resource/images/attachment/nva_group_booking.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '30421', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ]
        ];
        $exist_attachment_list = $attachment_model->where([
            [ 'site_id', '=', $site_id ],
            [ 'path', 'in', array_column($attachment_list, 'path', '') ]
        ])->field('path')->select()->toArray();

        if (!empty($exist_attachment_list)) {
            $attachment_path_list = array_column($exist_attachment_list, 'path', '');

            foreach ($attachment_list as $k => $v) {
                if (in_array($v[ 'path' ], $attachment_path_list)) {
                    unset($attachment_list[ $k ]);
                }
            }
            $attachment_list = array_values($attachment_list);
        }
        if (!empty($attachment_list)) {
            $attachment_model->insertAll($attachment_list);
        }

        return true;
    }
}
