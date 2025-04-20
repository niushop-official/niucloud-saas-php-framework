<?php
// +----------------------------------------------------------------------
// | Author: TK
// +----------------------------------------------------------------------

namespace addon\tk_vip\app\api\controller\member;

use addon\tk_vip\app\service\admin\real\RealService;
use addon\tk_vip\app\service\admin\vip\VipService;
use addon\tk_vip\app\service\api\MemberService;
use app\service\admin\member\MemberAccountService;
use core\base\BaseApiController;

class Member extends BaseApiController
{
    /**
     * @Notes:获取会员列表
     * @Interface getMemberLists
     * @return \think\Response
     * @author: TK
     * @Time: 2024/11/20   上午12:51
     */
    public function getMemberLists()
    {
        $data = $this->request->params([
            ["sex", ""],
            ["nickname", ""],
        ]);
        return success((new MemberService())->getPage($data));
    }

    /**
     * @Notes:获取会员信息
     * @Interface getMemberInfo
     * @param $id
     * @return \think\Response
     * @throws \think\Exception
     * @author: TK
     * @Time: 2024/11/20   上午12:52
     */
    public function getMemberInfo($id)
    {
        return success((new MemberService())->getInfo($id));
    }

    /**
     * @Notes:调整积分
     * @Interface adjustPoint
     * @return \think\Response
     * @author: TK
     * @Time: 2024/11/20   上午1:10
     */
    public function adjustPoint()
    {
        $data = $this->request->params([
            ['member_id', ''],
            ['account_data', 0],
            ['memo', ''],
        ]);
        $res = (new MemberService())->adjustPoint($data);
        return success('SUCCESS', ['id' => $res]);
    }

    /**
     * @Notes:调整余额
     * @Interface adjustBalance
     * @return \think\Response
     * @author: TK
     * @Time: 2024/11/21   下午11:40
     */
    public function adjustBalance()
    {
        $data = $this->request->params([
            ['member_id', ''],
            ['account_data', 0],
            ['memo', ''],
        ]);
        $res = (new MemberService())->adjustBalance($data);
        return success('SUCCESS', ['id' => $res]);
    }

    /**
     * @Notes:调整会员等级
     * @Interface edit
     * @param int $id
     * @return \think\Response
     * @throws \think\Exception
     * @author: TK
     * @Time: 2024/11/21   下午2:41
     */
    public function edit(int $id)
    {
        $data = $this->request->params([
            ["member_id", 0],
            ["level_id", 0],
            ["over_time", 0],
        ]);
        if ($data['over_time'] != 0) {
            $data['over_time'] = strtotime($data['over_time']);
        }
        $this->validate($data, 'addon\tk_vip\app\validate\vip\Vip.edit');
        (new VipService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * @Notes:新增实名认证
     * @Interface addReal
     * @return \think\Response
     * @throws \think\Exception
     * @author: TK
     * @Time: 2024/11/22   上午8:31
     */
    public function addReal(){
        $data = $this->request->params([
            ["member_id",0],
            ["real_name",""],
            ["mobile",""],
            ["card_num",""],
            ["sex",""],
            ["birthday",""],
            ["field",""],
            ["status",0],
            ["real_num",0],
            ['card_img_back',[]],
            ['card_img_front',[]],
        ]);
        $this->validate($data, 'addon\tk_vip\app\validate\real\Real.add');
        $id = (new RealService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * @Notes:编辑实名认证
     * @Interface editReal
     * @param int $id
     * @return \think\Response
     * @throws \think\Exception
     * @author: TK
     * @Time: 2024/11/22   上午8:32
     */
    public function editReal(int $id){
        $data = $this->request->params([
            ["member_id",0],
            ["status",0],
        ]);
        $this->validate($data, 'addon\tk_vip\app\validate\real\Real.edit');
        (new RealService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }
}
