<?php

namespace app\upgrade\v056;

use app\model\site\Site;
use app\model\sys\Poster;
use app\service\core\poster\CorePosterService;

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
        $site_model = new Site();
        $site_ids = $site_model->column('site_id');

        $poster_model = new Poster();
        $poster = new CorePosterService();
        $template = $poster->getTemplateList('', 'friendspay')[ 0 ];

        $poster_model->where([ ['type','=','friendspay'] ])->delete();
        foreach ($site_ids as $site_id) {
            // 创建默认找朋友帮忙付海报
            $poster->add($site_id, '', [
                'name' => $template[ 'name' ],
                'type' => $template[ 'type' ],
                'value' => $template[ 'data' ],
                'status' => 1,
                'is_default' => 1
            ]);
        }
    }

}
