<?php

namespace app\upgrade\v100;

use app\model\site\Site;
use app\model\sys\SysAttachment;
use app\model\sys\SysAttachmentCategory;

class Upgrade
{

    public function handle()
    {
        $addon_dir = root_path() . 'addon';
        if (is_dir($addon_dir)) {
            $addons = array_diff(scandir($addon_dir), [ '.', '..' ]);
            foreach ($addons as $addon) {
                $this->handleAddonUniappPages($addon);
            }
        }
        $this->addDefaultData();
    }

    private function handleAddonUniappPages($addon)
    {
        $addon_uniapp_pages = str_replace('/', DIRECTORY_SEPARATOR, project_path() . "niucloud/addon/{$addon}/package/uni-app-pages.php");
        if (file_exists($addon_uniapp_pages)) {
            $content = file_get_contents($addon_uniapp_pages);

            // 正则表达式用于捕获每个页面配置项
            $pagePattern = '/\{(?:[^{}]|(?R))*\}/';

            // 提取所有页面配置
            preg_match_all($pagePattern, $content, $matches);

            $addon_pages = [];

            foreach ($matches[ 0 ] as $match) {
                $addon_pages[] = "				" . str_replace("$addon/pages/", "pages/", $match);
            }

            $content = '<?php' . PHP_EOL;
            $content .= 'return [' . PHP_EOL . "    'pages' => <<<EOT" . PHP_EOL . '        // PAGE_BEGIN' . PHP_EOL;
            $content .= '        {' . PHP_EOL . '            "root": "addon/' . $addon . '", ' . PHP_EOL . '            "pages": [' . PHP_EOL;
            $content .= implode("," . PHP_EOL, $addon_pages);
            $content .= PHP_EOL . '			]' . PHP_EOL . '        },' . PHP_EOL . '// PAGE_END' . PHP_EOL . 'EOT' . PHP_EOL . '];';

            file_put_contents($addon_uniapp_pages, $content);
        }
    }

    public function addDefaultData()
    {
        $site_model = new Site();
        $category_model = new SysAttachmentCategory();
        $attachment_model = new SysAttachment();
        $site_ids = $site_model->column('site_id');

        foreach ($site_ids as $site_id) {
            // 创建素材
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

            $attachment_list = [
                'site_id' => $site_id,
                'name' => time() . $site_id . $category_id . 'nav_sow_community.png', // 附件名称
                'real_name' => '种草社区', // 原始文件名
                'path' => 'static/resource/images/attachment/nav_sow_community.png', // 完整地址
                'url' => 'static/resource/images/attachment/nav_sow_community.png', // 网络地址
                'dir' => 'static/resource/images/attachment', // 附件路径
                'att_size' => '24576', // 附件大小
                'att_type' => 'image', // 附件类型image,video
                'storage_type' => 'local', // 图片上传类型 local本地  aliyun  阿里云oss  qiniu  七牛 ....
                'cate_id' => $category_id, // 素材分类id
                'create_time' => time()
            ];
            $exist_attachment_list = $attachment_model->where([
                [ 'site_id', '=', $site_id ],
                [ 'path', '=', 'static/resource/images/attachment/nav_sow_community.png' ]
            ])->field('path')->findOrEmpty()->toArray();

            if (empty($exist_attachment_list)) {
                $attachment_model->create($attachment_list);
            }

        }
    }
}
