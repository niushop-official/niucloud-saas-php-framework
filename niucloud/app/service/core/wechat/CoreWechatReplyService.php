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

namespace app\service\core\wechat;

use app\dict\channel\ReplyDict;
use app\dict\channel\WechatDict;
use app\model\wechat\WechatReply;
use core\base\BaseCoreService;
use core\exception\AdminException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\facade\Log;
use think\Model;


/**
 * 微信回复
 * Class WechatConfigService
 * @package app\service\core\wechat
 */
class CoreWechatReplyService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new WechatReply();
    }

    /**
     *关键字回复列表
     * @return array
     */
    public function getKeywordPage(int $site_id, array $data = [])
    {
        $where = [
            ['site_id', '=', $site_id],
            ['reply_type', '=', WechatDict::REPLY_KEYWORD]
        ];
        if (!empty($data['keyword'])) {
            $where[] = ['keyword', 'like', '%' . $data['keyword'] . '%'];
        }
        if (!empty($data['name'])) {
            $where[] = ['name', 'like', '%' . $data['name'] . '%'];
        }
        return $this->getPageList($this->model, $where, '*', 'id desc');
    }

    /**
     * 获取关键词回复信息
     * @param int $site_id
     * @param int $id
     * @return array
     */
    public function getKeywordInfo(int $site_id, int $id)
    {
        return $this->model->where([
            ['site_id', '=', $site_id],
            ['id', '=', $id],
            ['reply_type', '=', WechatDict::REPLY_KEYWORD]]
        )->findOrEmpty()->toArray();
    }

    /**
     * 通过关键词查询回复
     * @param int $site_id
     * @param string $keyword
     * @return void
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getKeywordInfoByKeyword(int $site_id, string $keyword)
    {
        $list = $this->model->where([
            ['site_id', '=', $site_id],
            ['keyword', 'like', '%' . $keyword . '%'],
            ['reply_type', '=', WechatDict::REPLY_KEYWORD]],
        )->order('sort asc')->select()->toArray();
        if (!empty($list)) {
            foreach ($list as $v) {
                $item_keyword = $v['keyword'];
                switch ($v['matching_type']) {
                    case ReplyDict::MATCHING_TYPE_FULL://全匹配
                        $item_keyword === $keyword && $reply_content = $item_keyword;
                        break;
                    case ReplyDict::MATCHING_TYPE_LIKE://模糊匹配
                        stripos($item_keyword, $keyword) !== false && $reply_content = $item_keyword;
                        break;
                }
                if (!empty($reply_content)) {
                    return $v;
                }
            }
        }
        return [];


    }

    /**
     * 新增关键词回复
     * @param int $site_id
     * @param string $data
     * @return true
     */
    public function addKeyword(int $site_id,array $data)
    {
        $data['site_id'] = $site_id;
        $data['reply_type'] = WechatDict::REPLY_KEYWORD;
        $this->model->create($data);
        return true;
    }

    /**
     * 更新关键词回复
     * @param int $site_id
     * @param int $id
     * @param array $data
     * @return WechatReply
     */
    public function editKeyword(int $site_id, int $id, array $data)
    {
        $where = [
            ['site_id', '=', $site_id],
            ['id', '=', $id],
            ['reply_type', '=', WechatDict::REPLY_KEYWORD]
        ];
        return $this->model->update($data, $where);
    }

    /**
     * 删除关键词回复
     * @return void
     */
    public function delKeyword(int $site_id, int $id)
    {
        $where = array(
            ['site_id', '=', $site_id],
            ['id', '=', $id],
            ['reply_type', '=', WechatDict::REPLY_KEYWORD]
        );
        $reply = $this->find($where);
        if ($reply->isEmpty())
            throw new AdminException('KEYWORDS_NOT_EXIST');
        return $reply->delete();
    }

    /**
     *
     * @param array|string $where
     * @return WechatReply|array|mixed|Model
     */
    public function find(array|string $where)
    {
        return $this->model->where($where)->findOrEmpty();
    }


    /**
     * 获取默认回复
     * @param int $site_id
     * @return array
     */
    public function getDefault(int $site_id)
    {
        return $this->model->where([
                ['site_id', '=', $site_id],
                ['reply_type', '=', WechatDict::REPLY_DEFAULT]
            ]
        )->findOrEmpty()->toArray();
    }

    /**
     * 更新默认回复
     * @param int $site_id
     * @param array $data
     * @return void
     */
    public function editDefault(int $site_id, array $data)
    {
        $where = [
            ['site_id', '=', $site_id],
            ['reply_type', '=', WechatDict::REPLY_DEFAULT]
        ];
        $reply = $this->find($where);
        //如果不存在,则创建一条默认回复记录
        if ($reply->isEmpty()) {
            $data['reply_type'] = WechatDict::REPLY_DEFAULT;
            $data['site_id'] = $site_id;
            return $this->model->create($data);
        } else {
            return $reply->save($data);
        }
    }


    /**
     * 获取关注回复
     * @param int $site_id
     * @return array
     */
    public function getSubscribe(int $site_id)
    {
        return $this->model->where([
                ['site_id', '=', $site_id],
                ['reply_type', '=', WechatDict::REPLY_SUBSCRIBE]
            ]
        )->findOrEmpty()->toArray();
    }

    /**
     * 更新关注回复
     * @param int $site_id
     * @param array $data
     * @return void
     */
    public function editSubscribe(int $site_id, array $data)
    {
        $where = [
            ['site_id', '=', $site_id],
            ['reply_type', '=', WechatDict::REPLY_SUBSCRIBE]
        ];
        $reply = $this->find($where);
        //如果不存在,则创建一条关注回复记录
        if ($reply->isEmpty()) {
            $data['reply_type'] = WechatDict::REPLY_SUBSCRIBE;
            $data['site_id'] = $site_id;
            return $this->model->create($data);
        } else {
            return $reply->save($data);
        }


    }

    /**
     * 回复
     * @param int $site_id
     * @param string $event
     * @param string $content
     * @return void
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function reply(int $site_id, string $event = '', string $content = '', string $openid = '')
    {
        switch ($event) {
            case WechatDict::REPLY_SUBSCRIBE://关注回复
                $info = $this->getSubscribe($site_id);
                break;
            case WechatDict::REPLY_KEYWORD://关键词回复
                $info = $this->getKeywordInfoByKeyword($site_id, $content);
                break;
        }
        //没有配置相关回复的话默认启用默认回复
        if(empty($info)){
            $info = $this->getDefault($site_id);
        }
        if(!empty($info)){
            // 关键字回复
            if ($info['reply_type'] == WechatDict::REPLY_KEYWORD) {
                if ($info['reply_method'] == 'all') {
                    foreach ($info['content'] as $item) {
                        $this->sendCustomMessage($site_id, array_merge(['touser' => $openid ], $item));
                    }
                } else {
                    $content = count($info['content']) > 1 ? $info['content'][mt_rand(0, count($info['content']) - 1)] : $info['content'][0];
                    $this->sendCustomMessage($site_id, array_merge(['touser' => $openid ], $content));
                }
            } else {
                 $this->sendCustomMessage($site_id, array_merge(['touser' => $openid ], $info['content']));
            }
        }
    }


    /**
     * 发送客服消息
     * @param array $options
     * @return true
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public function sendCustomMessage($site_id, array $options) {
        $send_res = CoreWechatService::appApiClient($site_id)->post('/cgi-bin/message/custom/send', [
            'json' => $options
        ]);
        if (isset($send_res['errcode']) && $send_res['errcode'] != 0) {
            Log::write($send_res['errmsg']);
        }
    }


}
