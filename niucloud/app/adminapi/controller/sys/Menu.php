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

namespace app\adminapi\controller\sys;

use app\dict\sys\MenuDict;
use app\dict\sys\MenuTypeDict;
use app\dict\sys\MethodDict;
use app\service\admin\install\InstallSystemService;
use app\service\admin\sys\MenuService;
use core\base\BaseAdminController;
use core\exception\AdminException;
use think\Response;

/**
 * 菜单管理
 * Class Menu
 * @description 菜单管理
 * @package app\adminapi\controller\sys
 */
class Menu extends BaseAdminController
{

    /**
     * 菜单列表(todo  限制只有平台端可以访问)
     * @description 菜单列表
     * @return Response
     */
    public function lists($app_type)
    {
        return success(( new MenuService() )->getAllMenuList($app_type, 'all', 1));
    }

    /**
     * 导出菜单(平台/站点)
     * @description 导出平台或站点菜单为JSON树结构文件
     * @param $app_type
     * @return \think\response\File
     */
    public function export($app_type)
    {
        return ( new MenuService() )->exportMenu($app_type, $this->parseExportAddons());
    }

    /**
     * 解析导出范围参数（支持 JSON 字符串 / 逗号分隔 / 数组）
     * 空字符串元素表示系统菜单，空数组表示导出全部
     * @return array
     */
    private function parseExportAddons()
    {
        $addons = $this->request->param('addons', '');
        if (is_string($addons)) {
            if (trim($addons) === '') return [];
            $decoded = json_decode($addons, true);
            $addons = is_array($decoded) ? $decoded : explode(',', $addons);
        }
        if (!is_array($addons)) return [];
        return array_values(array_unique(array_map('strval', $addons)));
    }

    /**
     * 导入菜单(平台/站点)
     * @description 上传导出的菜单JSON文件，增量导入菜单
     * @param $app_type
     * @return Response
     */
    public function importMenu($app_type)
    {
        $menu_service = new MenuService();
        $file = $this->request->file('file');
        if (empty($file)) {
            // post_max_size 超限时 PHP 会直接丢弃整个 POST（$_FILES 为空），此处给出更明确的提示
            $config = $menu_service->getImportConfig();
            $content_length = (int) $this->request->server('CONTENT_LENGTH', 0);
            if ($config[ 'post_max_size_byte' ] > 0 && $content_length > $config[ 'post_max_size_byte' ]) {
                throw new AdminException('validate_menu.import_file_too_large');
            }
        }
        $overwrite = (int) $this->request->param('overwrite', 0);
        return success($menu_service->importMenu($app_type, $file, (bool) $overwrite));
    }

    /**
     * 导入菜单上传限制配置
     * @description 获取当前PHP上传限制，用于导入前校验文件大小
     * @return Response
     */
    public function importConfig()
    {
        return success(( new MenuService() )->getImportConfig());
    }

    /**
     * 菜单信息
     * @description 菜单信息
     * @param $menu_key
     * @return Response
     */
    public function info($app_type, $menu_key)
    {
        return success(( new MenuService() )->get($app_type, $menu_key));
    }

    /**
     * 新增菜单接口
     * @description 新增菜单
     * @return Response
     */
    public function add()
    {
        $data = $this->request->params([
            [ 'app_type', '' ],
            [ 'menu_name', '' ],
            [ 'menu_type', 0 ],
            [ 'menu_key', '' ],
            [ 'parent_key', '' ],
            [ 'icon', '' ],
            [ 'api_url', '' ],
            [ 'view_path', '' ],
            [ 'router_path', '' ],
            [ 'methods', '' ],
            [ 'sort', 0 ],
            [ 'status', MenuDict::ON ],
            [ 'is_show', 0 ],
            [ 'is_blank', 0 ],
            [ 'addon', '' ],
            [ 'menu_short_name', '' ]
        ]);
        $this->validate($data, 'app\validate\sys\Menu.add');
        ( new MenuService() )->add($data);
        return success('ADD_SUCCESS');
    }

    /**
     * 菜单或接口更新
     * @description 菜单或接口更新
     */
    public function edit($app_type, $menu_key)
    {
        $data = $this->request->params([
            [ 'menu_name', '' ],
            [ 'parent_key', '' ],
            [ 'menu_type', 0 ],
            [ 'icon', '' ],
            [ 'api_url', '' ],
            [ 'router_path', '' ],
            [ 'view_path', '' ],
            [ 'methods', '' ],
            [ 'sort', 0 ],
            [ 'status', MenuDict::ON ],
            [ 'is_show', 0 ],
            [ 'is_blank', 0 ],
            [ 'addon', '' ],
            [ 'menu_short_name', '' ]
        ]);
        $this->validate($data, 'app\validate\sys\Menu.edit');
        ( new MenuService() )->edit($app_type, $menu_key, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 获取菜单类型静态资源
     * @description 获取菜单类型静态资源
     * @return Response
     */
    public function getMenuType()
    {
        return success(MenuTypeDict::getMenuType());
    }

    /**
     * 获取请求方式
     * @description 获取请求方式
     * @return Response
     */
    public function getMethodType()
    {
        return success(MethodDict::getMethodType());
    }

    /**
     * 删除菜单
     * @description 删除菜单
     * @param $menu_key
     * @return Response
     */
    public function del($app_type, $menu_key)
    {
        ( new MenuService() )->del($app_type, $menu_key);
        return success('DELETE_SUCCESS');
    }

    /**
     * 刷新菜单
     * @description 刷新菜单
     * @return Response
     */
    public function refreshMenu()
    {
        ( new InstallSystemService() )->install();
        return success('SUCCESS');
    }

    /**
     * 查询菜单信息
     * @description 查询菜单信息
     */
    public function getSystem()
    {
        return success(( new MenuService() )->getSystemMenu('all', 1));
    }

    /**
     * 查询应用权限信息
     * @description 查询应用权限信息
     */
    public function getAddonMenu($app_key)
    {
        return success(( new MenuService() )->getAddonMenu($app_key, 'all', 1));
    }

    /**
     * 查询菜单类型为目录的菜单
     * @description 查询菜单类型为目录的菜单
     * @param $addon
     * @return Response
     */
    public function getMenuByTypeDir($addon = 'system')
    {
        return success(( new MenuService() )->getMenuByTypeDir($addon));
    }
}
