<?php
#######################################################################
# File Name: Turntable.php
# Desc:
# Author: hd
# Created Time: 2024/6/21 15:34
#######################################################################
namespace addon\turntable\app\adminapi\controller\turntable;
use addon\turntable\app\service\admin\PromotionTurntableGamesService;
use core\base\BaseAdminController;

class Turntable extends BaseAdminController{
    public function search(){
        $data = $this->request->params([
            [ "game_name",      "" ],
            [ "status",         "" ],
            [ "create_time",    "" ],
            [ "order",          "",false],
            [ "sort",           ""]
        ]);
        return success(( new PromotionTurntableGamesService() )->searchList($data));
    }

    public function create(){
        $data = $this->request->params([
            ["game_name",       "" ],
            ["level_id",        "" ],
            ["template_name",   "" ],
            ["banner_show",     "" ],
            ["level_name",      "" ],
            ['points',          "" ],
            ["start_time",      "" ],
            ["end_time",        "" ],
            ["remark",          "" ],
            ["winning_rate",    "" ],
            ["no_winning_desc", "" ],
            ["no_winning_img",  "" ,false],
            ["is_show_winner",  "" ],
            ["join_type",       "" ],
            ["join_frequency",  "" ],
            ["games_award",     "" ],
            ["games_banner",    "" ]
        ]);
        $this->validate($data, 'addon\turntable\app\validate\TurntableValidate.add');
        $response = (new PromotionTurntableGamesService())->create($data);
        return success('SUCCESS',$response);
    }
    public function update(){
        $data = $this->request->params([
            ["game_id",         ""],
            ["game_name",       "" ],
            ["level_id",        "" ],
            ["template_name",   "" ],
            ["level_name",      "" ],
            ['points',          "" ],
            ["start_time",      "" ],
            ["end_time",        "" ],
            ["remark",          "" ],
            ["winning_rate",    "" ],
            ["no_winning_desc", "" ],
            ["no_winning_img",  "" ,false],
            ["is_show_winner",  "" ],
            ["join_type",       "" ],
            ["banner_show",     "" ],
            ["join_frequency",  "" ],
            ["games_award",     "" ],
            ["games_banner",    "" ]
        ]);
        $this->validate($data, 'addon\turntable\app\validate\TurntableValidate.edit');
        $response = (new PromotionTurntableGamesService())->update($data);
        return success('SUCCESS',$response);
    }
    //获取游戏新增、修改数据
    public function init(){
        $data = $this->request->params([
            [ "game_id", 0 ],
        ]);
        return success((new PromotionTurntableGamesService())->getInit($data));
    }
    public function delete(){
        $data = $this->request->params([
            [ "game_id", 0 ],
        ]);
        return success('SUCCESS',(new PromotionTurntableGamesService())->delete($data));
    }
    public function detail(){
        $data = $this->request->params([
            [ "game_id", 0 ],
            [ "is_winning", 0 ],
            [ "member_nick_name", '' ],
            [ "draw_start_create_time",""],
            [ "draw_end_create_time",""],
            [ "order",          "",false],
            [ "sort",           ""]
        ]);
        return success('SUCCESS',(new PromotionTurntableGamesService())->detail($data));
    }
    public function close(){
        $data = $this->request->params([
            [ "game_id",0 ]
        ]);
        return success('SUCCESS',(new PromotionTurntableGamesService())->close($data));
    }
    public function open(){
        $data = $this->request->params([
            [ "game_id",0 ]
        ]);
        return success('SUCCESS',(new PromotionTurntableGamesService())->open($data));
    }
    public function calculate(){
        $data = $this->request->params([
            [ "dynamicWeight",[] ],
            [ "number",0]
        ]);
        return success('SUCCESS',(new PromotionTurntableGamesService())->calculate($data));
    }
}