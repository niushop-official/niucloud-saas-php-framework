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

namespace app\service\admin\sys;

use app\dict\sys\AppTypeDict;
use app\dict\sys\MenuDict;
use app\dict\sys\MenuTypeDict;
use app\dict\sys\MethodDict;
use app\model\sys\SysMenu;
use app\service\admin\addon\AddonService;
use app\service\admin\site\SiteService;
use core\base\BaseAdminService;
use core\dict\DictLoader;
use core\exception\AdminException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\facade\Cache;
use think\facade\Db;
use think\Model;

/**
 * 用户服务层
 * Class BaseService
 * @package app\service
 */
class MenuService extends BaseAdminService
{

    public static $cache_tag_name = 'menu_cache';

    /**
     * 导出菜单保留的核心字段
     */
    private const EXPORT_MENU_FIELDS = [
        'menu_key', 'parent_key', 'menu_name', 'menu_type', 'icon',
        'api_url', 'router_path', 'view_path', 'methods', 'sort',
        'status', 'is_show', 'is_blank', 'addon'
    ];

    /**
     * 导入菜单文件大小上限（2M，业务限制）
     */
    private const IMPORT_FILE_MAX_BYTE = 2097152;

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysMenu();
    }

    /**
     * 新增菜单接口
     * @param array $data
     * @return SysMenu|Model
     */
    public function add(array $data)
    {
        $menu = $this->find($data[ 'menu_key' ], $data[ 'app_type' ]);
        if (!$menu->isEmpty()) throw new AdminException('validate_menu.exit_menu_key');//创建失败

        $data = $this->normalizeIsBlank($data);
        $data[ 'source' ] = MenuDict::CREATE;
        $res = $this->model->create($data);
        if (!$res) throw new AdminException('ADD_FAIL');//创建失败

        Cache::tag(self::$cache_tag_name)->clear();
        return $res;
    }


    /**
     * 更新菜单
     * @param string $app_type
     * @param string $menu_key
     * @param array $data
     * @return SysMenu
     */
    public function edit(string $app_type, string $menu_key, array $data)
    {
        $data = $this->normalizeIsBlank($data);
        $where = array(
            [ 'app_type', '=', $app_type ],
            [ 'menu_key', '=', $menu_key ]
        );
        $res = $this->model->update($data, $where);
        Cache::tag(self::$cache_tag_name)->clear();
        return $res;
    }

    /**
     * 仅菜单类型（menu_type=1）支持新窗口打开，目录/按钮一律置为否
     * @param array $data
     * @return array
     */
    private function normalizeIsBlank(array $data): array
    {
        if ((string) ( $data[ 'menu_type' ] ?? '' ) !== MenuTypeDict::MENU) {
            $data[ 'is_blank' ] = 0;
        }
        return $data;
    }

    /**
     * 获取信息
     * @param string $app_type
     * @param string $menu_key
     * @return array
     */
    public function get(string $app_type, string $menu_key)
    {
        return $this->model->where([ [ 'app_type', '=', $app_type ], [ 'menu_key', '=', $menu_key ] ])->findOrEmpty()->toArray();
    }

    /**
     * @param string $menu_key
     * @param string $app_type
     * @return SysMenu|array|mixed|Model
     */
    public function find(string $menu_key, string $app_type = '')
    {
        $where = array(
            [ 'menu_key', '=', $menu_key ]
        );
        if (!empty($app_type)) {
            $where[] = [ 'app_type', '=', $app_type ];
        }
        $menu = $this->model->where($where)->findOrEmpty();
        return $menu;
    }

    /**
     * 菜单删除
     * @param string $app_type
     * @param string $menu_key
     * @return bool
     * @throws DbException
     */
    public function del(string $app_type, string $menu_key)
    {
        //查询是否有下级菜单或按钮
        $menu = $this->find($menu_key, $app_type);
        if ($this->model->where([ [ 'parent_key', '=', $menu_key ], [ 'app_type', '=', $app_type ] ])->count() > 0)
            throw new AdminException('MENU_NOT_ALLOW_DELETE');

        $res = $menu->delete();
        Cache::tag(self::$cache_tag_name)->clear();
        return $res;
    }

    /**
     * 通过菜单menu_key获取
     * @param int $site_id
     * @param array $menu_keys
     * @param string $app_type
     * @param int $is_tree
     * @param string $addon 用于检测插件筛选
     * @param int $is_button
     * @return mixed
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getMenuListByMenuKeys(int $site_id, array $menu_keys, string $app_type, int $is_tree = 0, $addon = 'all', $is_button = 1)
    {
        sort($menu_keys);
        $cache_name = 'menu' . md5(implode("_", $menu_keys)) . $is_tree . $addon . $site_id;
        $menu_list = cache_remember(
            $cache_name,
            function() use ($site_id, $menu_keys, $app_type, $is_tree, $addon) {
                $where = [
                    [ 'menu_key', 'in', $menu_keys ],
                ];
                $addons = ( new AddonService() )->getAddonKeysBySiteId($site_id);
                $addons[] = '';

                $delete_menu_addon = [];
                $addon_loader = new DictLoader("Menu");

                if ($addon != 'all') {
                    $where[] = [ 'addon', '=', $addon ];

                    $delete_menu = $addon_loader->load([ "addon" => $addon, "app_type" => $app_type ])[ 'delete' ] ?? [];
                    if (!empty($delete_menu) && is_array($delete_menu)) $delete_menu_addon[] = $delete_menu;
                } else {
                    $where[] = [ 'addon', 'in', $addons ];

                    foreach ($addons as $addon) {
                        $delete_menu = $addon_loader->load([ "addon" => $addon, "app_type" => $app_type ])[ 'delete' ] ?? [];
                        if (!empty($delete_menu) && is_array($delete_menu)) $delete_menu_addon[] = $delete_menu;
                    }
                }

                // 排除插件中delete的菜单
                if (!empty($delete_menu_addon)) {
                    $delete_intersect = array_intersect(...$delete_menu_addon);
                    if (!empty($delete_intersect)) {
                        $where[] = [ 'menu_key', 'not in', $delete_intersect ];
                    }
                }
                if (!empty($app_type)) {
                    $where[] = [ 'app_type', '=', $app_type ];
                }
                return $this->model->where($where)->order('sort', 'desc')->select()->toArray();
            },
            self::$cache_tag_name
        );
        foreach ($menu_list as &$v) {
            $lang_menu_key = "dict_menu_" . $v[ 'app_type' ] . '.' . $v[ 'menu_key' ];
            $lang_menu_name = get_lang("dict_menu_" . $v[ 'app_type' ] . '.' . $v[ 'menu_key' ]);
            //语言已定义
            if ($lang_menu_key != $lang_menu_name) {
                $v[ 'menu_name' ] = $lang_menu_name;
            }
        }

        return $is_tree ? $this->menuToTree($menu_list, 'menu_key', 'parent_key', 'children', 'auth', '', $is_button) : $menu_list;

    }

    /**
     * 获取所有接口菜单
     * @param string $app_type
     * @param string $status
     * @param int $is_tree
     * @param int $is_button
     * @param array $addons 指定应用范围（空字符串代表系统菜单）；为空时默认"系统菜单 + 当前站点已安装应用"
     */
    public function getAllMenuList($app_type = '', $status = 'all', $is_tree = 0, $is_button = 0, $addons = [])
    {
        $site_id = $this->site_id;
        // 未指定应用范围时，默认系统菜单 + 当前站点已安装应用
        if (empty($addons)) {
            $addons = array_merge([ '' ], get_site_addons($site_id));
        } else {
            $addons = array_values(array_unique(array_map('strval', $addons)));
        }
        $cache_name = 'site_menu_api_' . $app_type . '_' . $status . '_' . $is_tree . '_' . $is_button . '_' . md5(implode('_', $addons)) . '_' . $this->site_id;
        $menu_list = cache_remember(
            $cache_name,
            function() use ($status, $is_tree, $is_button, $app_type, $site_id, $addons) {
                $where = [
                    [ 'app_type', '=', $app_type ],
                    [ 'addon', 'in', $addons ]
                ];
                if ($status != 'all') {
                    $where[] = [ 'status', '=', $status ];
                }

                // 排除菜单
                $delete_menu_addon = [];
                $addon_loader = new DictLoader("Menu");
                foreach ($addons as $addon) {
                    if ($addon === '') continue;
                    $delete_menu = $addon_loader->load([ "addon" => $addon, "app_type" => $app_type ])[ 'delete' ] ?? [];
                    if (!empty($delete_menu) && is_array($delete_menu)) $delete_menu_addon[] = $delete_menu;
                }
                if (!empty($delete_menu_addon)) {
                    $delete_intersect = array_intersect(...$delete_menu_addon);
                    if (!empty($delete_intersect)) {
                        $where[] = [ 'menu_key', 'not in', $delete_intersect ];
                    }
                }

                return $this->model->where($where)->order('sort desc')->select()->toArray();
            },
            [ self::$cache_tag_name, SiteService::$cache_tag_name ]
        );
        foreach ($menu_list as &$v) {
            $lang_menu_key = "dict_menu_" . $v[ 'app_type' ] . '.' . $v[ 'menu_key' ];
            $lang_menu_name = get_lang("dict_menu_" . $v[ 'app_type' ] . '.' . $v[ 'menu_key' ]);
            //语言已定义
            if ($lang_menu_key != $lang_menu_name) {
                $v[ 'menu_name' ] = $lang_menu_name;
            }
        }
        return $is_tree ? $this->menuToTree($menu_list, 'menu_key', 'parent_key', 'children', 'auth', '', $is_button) : $menu_list;
    }

    /**
     * 导出菜单(平台/站点)
     * @param string $app_type
     * @param array $addons 导出范围（空字符串元素代表系统菜单）；为空表示导出全部
     * @return \think\response\File
     * @throws AdminException
     */
    public function exportMenu(string $app_type, array $addons = [])
    {
        if (!in_array($app_type, [ AppTypeDict::ADMIN, AppTypeDict::SITE ], true)) {
            throw new AdminException('validate_menu.app_type_error');
        }

        // 复用菜单树(is_tree=1, is_button=0)，按钮(menu_type=2)会作为 children 嵌套在树中
        $menu_list = $this->getAllMenuList($app_type, 'all', 1, 0, $addons);
        $menus = $this->filterExportMenu($menu_list);

        // 导出内容即菜单树数组，端类型/时间体现在文件名中
        $content = json_encode($menus, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

        return download($content, $this->buildExportFileName($app_type), true)
            ->mimeType('application/octet-stream');
    }

    /**
     * 生成导出文件名：menu_{端类型}_{时间}.json
     * @param string $app_type
     * @return string
     */
    private function buildExportFileName(string $app_type)
    {
        return 'menu_' . $app_type . '_' . date('YmdHis') . '.json';
    }

    /**
     * 递归裁剪菜单节点，仅保留核心字段
     * @param array $menu_list
     * @return array
     */
    private function filterExportMenu(array $menu_list)
    {
        $result = [];
        foreach ($menu_list as $menu) {
            $item = [];
            foreach (self::EXPORT_MENU_FIELDS as $field) {
                if (array_key_exists($field, $menu)) {
                    $item[ $field ] = $menu[ $field ];
                }
            }
            if (!empty($menu[ 'children' ]) && is_array($menu[ 'children' ])) {
                $item[ 'children' ] = $this->filterExportMenu($menu[ 'children' ]);
            }
            $result[] = $item;
        }
        return $result;
    }

    /**
     * 获取导入菜单的PHP上传限制配置（字节，0 表示不限制）
     * @return array
     */
    public function getImportConfig()
    {
        $upload_max_filesize = (string) ini_get('upload_max_filesize');
        $post_max_size = (string) ini_get('post_max_size');
        $upload_max_byte = $this->convertSizeToByte($upload_max_filesize);
        $post_max_byte = $this->convertSizeToByte($post_max_size);

        $max_upload_byte = 0;
        if ($upload_max_byte > 0) $max_upload_byte = $upload_max_byte;
        if ($post_max_byte > 0) $max_upload_byte = $max_upload_byte > 0 ? min($max_upload_byte, $post_max_byte) : $post_max_byte;

        // 导入文件业务上限 2M：PHP 限制更大时按 2M，更小时按 PHP 限制
        $max_import_byte = self::IMPORT_FILE_MAX_BYTE;
        $limit_from_php = $max_upload_byte > 0 && $max_upload_byte < $max_import_byte;
        $limit_byte = $limit_from_php ? $max_upload_byte : $max_import_byte;

        return [
            'upload_max_filesize' => $upload_max_filesize,
            'post_max_size' => $post_max_size,
            'upload_max_filesize_byte' => $upload_max_byte,
            'post_max_size_byte' => $post_max_byte,
            'max_upload_byte' => $max_upload_byte,
            'max_import_byte' => $max_import_byte,
            'limit_byte' => $limit_byte,
            'limit_source' => $limit_from_php ? 'php' : 'system'
        ];
    }

    /**
     * 解析 php.ini 容量配置（如 2M / 512K）为字节数，无法解析或为 0/-1 时返回 0（表示不限制）
     * @param string $size
     * @return int
     */
    private function convertSizeToByte(string $size)
    {
        $size = strtoupper(trim($size));
        if ($size === '' || !preg_match('/^(\d+(?:\.\d+)?)\s*([BKMGTP]?)B?$/', $size, $matches)) {
            return 0;
        }
        $units = [ 'B' => 1, 'K' => 1024, 'M' => 1048576, 'G' => 1073741824, 'T' => 1099511627776, 'P' => 1125899906842624 ];
        $unit = $matches[ 2 ] !== '' ? $matches[ 2 ] : 'B';
        return (int) round((float) $matches[ 1 ] * ( $units[ $unit ] ?? 1 ));
    }

    /**
     * 导入菜单(平台/站点) —— 增量导入
     * @param string $app_type
     * @param mixed $file 上传的json文件
     * @param bool $overwrite 已存在时是否覆盖更新
     * @return array
     * @throws AdminException
     */
    public function importMenu(string $app_type, $file, bool $overwrite = false)
    {
        if (!in_array($app_type, [ AppTypeDict::ADMIN, AppTypeDict::SITE ], true)) {
            throw new AdminException('validate_menu.app_type_error');
        }
        if (empty($file)) {
            throw new AdminException('validate_menu.import_file_require');
        }
        if ($file->getSize() > self::IMPORT_FILE_MAX_BYTE) {
            throw new AdminException('validate_menu.import_file_over_max');
        }

        $data = json_decode((string) file_get_contents($file->getPathname()), true);
        if (!is_array($data) || empty($data)) {
            throw new AdminException('validate_menu.import_file_invalid');
        }
        // 导出文件即菜单树数组，必须是顺序索引数组
        if (array_keys($data) !== range(0, count($data) - 1)) {
            throw new AdminException('validate_menu.import_file_invalid');
        }
        $menu_list = $data;

        $stat = [
            'total' => 0,
            'insert' => 0,
            'update' => 0,
            'skip' => 0,
            'fail' => 0,
            'fail_list' => []
        ];
        // 一次性预载该端已有的菜单标识，导入过程中判重走内存，避免逐条查询
        $exist_keys = $this->getExistMenuKeys($app_type);
        $seen_keys = [];

        // 整批放入一个事务：避免逐条提交的开销（单条失败仍按原逻辑跳过并记录）
        Db::startTrans();
        try {
            $this->importMenuNode($menu_list, $app_type, '', $overwrite, $exist_keys, $seen_keys, $stat);
            Db::commit();
        } catch (\Throwable $e) {
            Db::rollback();
            Cache::tag(self::$cache_tag_name)->clear();
            throw $e;
        }

        Cache::tag(self::$cache_tag_name)->clear();
        return $stat;
    }

    /**
     * 预载指定端已存在的菜单标识（用于导入判重）
     * @param string $app_type
     * @return array
     */
    private function getExistMenuKeys(string $app_type)
    {
        $menu_keys = $this->model->where([ [ 'app_type', '=', $app_type ] ])->column('menu_key');
        return array_fill_keys($menu_keys, true);
    }

    /**
     * 递归导入菜单节点
     * 参考若依：逐条判重，不存在则新增、存在则按需覆盖/跳过，并以当前节点接管子节点的父级
     * @param array $menu_list
     * @param string $app_type
     * @param string $parent_key 遍历上下文中的父级菜单标识
     * @param bool $overwrite
     * @param array $exist_keys 该端已存在的菜单标识（含本次已新增的）
     * @param array $seen_keys 本次导入已处理过的菜单标识
     * @param array $stat
     * @return void
     */
    private function importMenuNode(array $menu_list, string $app_type, string $parent_key, bool $overwrite, array &$exist_keys, array &$seen_keys, array &$stat)
    {
        foreach ($menu_list as $menu) {
            if (!is_array($menu)) {
                $stat[ 'total' ]++;
                $stat[ 'fail' ]++;
                $stat[ 'fail_list' ][] = [ 'menu_key' => '', 'menu_name' => '', 'reason' => get_lang('validate_menu.import_file_invalid') ];
                continue;
            }

            $stat[ 'total' ]++;
            $menu_key = trim((string) ( $menu[ 'menu_key' ] ?? '' ));
            $menu_name = trim((string) ( $menu[ 'menu_name' ] ?? '' ));
            // 子节点父级优先取遍历上下文，顶层节点则沿用文件里的 parent_key
            $menu_parent_key = $parent_key !== '' ? $parent_key : trim((string) ( $menu[ 'parent_key' ] ?? '' ));

            try {
                $this->checkImportMenu($menu, $menu_key, $app_type, $menu_parent_key, $parent_key === '', $exist_keys, $seen_keys);
            } catch (AdminException $e) {
                $stat[ 'fail' ]++;
                $stat[ 'fail_list' ][] = [ 'menu_key' => $menu_key, 'menu_name' => $menu_name, 'reason' => get_lang($e->getMessage()) ];
                // 父级校验失败，跳过整棵子树，避免产生孤儿菜单
                continue;
            }

            $seen_keys[ $menu_key ] = true;
            $menu_data = $this->buildImportMenuData($menu, $app_type, $menu_parent_key);

            try {
                if (!isset($exist_keys[ $menu_key ])) {
                    $menu_data[ 'source' ] = MenuDict::CREATE;
                    $this->model->create($menu_data);
                    // 标记为已存在，供后续节点判重
                    $exist_keys[ $menu_key ] = true;
                    $stat[ 'insert' ]++;
                } elseif ($overwrite) {
                    unset($menu_data[ 'menu_key' ]);
                    $this->model->update($menu_data, [ [ 'menu_key', '=', $menu_key ], [ 'app_type', '=', $app_type ] ]);
                    $stat[ 'update' ]++;
                } else {
                    $stat[ 'skip' ]++;
                }
            } catch (\Throwable $e) {
                $stat[ 'fail' ]++;
                $stat[ 'fail_list' ][] = [ 'menu_key' => $menu_key, 'menu_name' => $menu_name, 'reason' => $e->getMessage() ];
                continue;
            }

            if (!empty($menu[ 'children' ]) && is_array($menu[ 'children' ])) {
                $this->importMenuNode($menu[ 'children' ], $app_type, $menu_key, $overwrite, $exist_keys, $seen_keys, $stat);
            }
        }
    }

    /**
     * 校验单条导入菜单数据
     * @param array $menu
     * @param string $menu_key
     * @param string $app_type
     * @param string $menu_parent_key
     * @param bool $is_root 是否为文件顶层节点
     * @param array $exist_keys 该端已存在的菜单标识
     * @param array $seen_keys 本次导入已处理过的菜单标识
     * @return void
     * @throws AdminException
     */
    private function checkImportMenu(array $menu, string $menu_key, string $app_type, string $menu_parent_key, bool $is_root, array $exist_keys, array $seen_keys)
    {
        if ($menu_key === '') {
            throw new AdminException('validate_menu.import_menu_key_require');
        }
        if (!preg_match('/^[a-zA-Z_][a-zA-Z0-9_]*$/', $menu_key)) {
            throw new AdminException('validate_menu.import_menu_key_format');
        }
        if (isset($seen_keys[ $menu_key ])) {
            throw new AdminException('validate_menu.import_menu_key_duplicate');
        }
        if (trim((string) ( $menu[ 'menu_name' ] ?? '' )) === '') {
            throw new AdminException('validate_menu.menu_name_require');
        }

        $menu_type = (string) ( $menu[ 'menu_type' ] ?? '' );
        if (!isset(MenuTypeDict::getMenuType()[ $menu_type ])) {
            throw new AdminException('validate_menu.not_exit_menu_type');
        }
        if ($menu_type === MenuTypeDict::MENU) {
            if (trim((string) ( $menu[ 'router_path' ] ?? '' )) === '') {
                throw new AdminException('validate_menu.router_path_requireif');
            }
            if (trim((string) ( $menu[ 'view_path' ] ?? '' )) === '') {
                throw new AdminException('validate_menu.view_path_requireif');
            }
        }

        if (trim((string) ( $menu[ 'api_url' ] ?? '' )) !== '') {
            $methods = strtolower(trim((string) ( $menu[ 'methods' ] ?? '' )));
            if (!isset(MethodDict::getMethodType()[ $methods ])) {
                throw new AdminException('validate_menu.methods_requirewith');
            }
        }

        // 顶层节点若指向了本地不存在的父级，则拒绝，避免产生孤儿菜单
        if ($is_root && $menu_parent_key !== '' && !isset($exist_keys[ $menu_parent_key ])) {
            throw new AdminException('validate_menu.import_parent_not_exist');
        }
    }

    /**
     * 组装导入菜单数据
     * @param array $menu
     * @param string $app_type
     * @param string $menu_parent_key
     * @return array
     */
    private function buildImportMenuData(array $menu, string $app_type, string $menu_parent_key)
    {
        return $this->normalizeIsBlank([
            'menu_key' => trim((string) ( $menu[ 'menu_key' ] ?? '' )),
            'parent_key' => $menu_parent_key,
            'menu_name' => trim((string) ( $menu[ 'menu_name' ] ?? '' )),
            'menu_type' => (string) ( $menu[ 'menu_type' ] ?? MenuTypeDict::LIST ),
            'icon' => (string) ( $menu[ 'icon' ] ?? '' ),
            'api_url' => (string) ( $menu[ 'api_url' ] ?? '' ),
            'router_path' => (string) ( $menu[ 'router_path' ] ?? '' ),
            'view_path' => (string) ( $menu[ 'view_path' ] ?? '' ),
            'methods' => strtolower((string) ( $menu[ 'methods' ] ?? '' )),
            'sort' => (int) ( $menu[ 'sort' ] ?? 0 ),
            'status' => (int) ( $menu[ 'status' ] ?? MenuDict::ON ),
            'is_show' => (int) ( $menu[ 'is_show' ] ?? 0 ),
            'is_blank' => (int) ( $menu[ 'is_blank' ] ?? 0 ),
            'addon' => (string) ( $menu[ 'addon' ] ?? '' ),
            'app_type' => $app_type
        ]);
    }

    /**
     * 根据parent_select_key字段重新整理上下级关系

     * @param array $menus
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function moveChildrenToParent(array &$menus) {
        $menuKeyMap = [];
        //处理整个菜单结构，建立menu_key映射
        $flattenMenus = function (&$list) use (&$flattenMenus, &$menuKeyMap) {
            foreach ($list as &$item) {
                if (!empty($item[ 'menu_key' ])) {
                    $menuKeyMap[$item[ 'menu_key' ]] = &$item;
                }
                if (isset($item[ 'children' ]) && is_array($item[ 'children' ])) {
                    $flattenMenus($item[ 'children' ]);
                }
            }
        };
        $flattenMenus($menus);

        //重新分配parent_select_key子项
        $moveList = [];
        $collectMoves = function (&$list, $parentList = null) use (&$collectMoves, &$moveList) {
            foreach ($list as $i => &$item) {
                if (!empty($item[ 'parent_select_key' ])) {
                    $moveList[] = [
                        'item' => &$item,
                        'parent_list' => &$list,
                        'index' => $i,
                        'target_key' => $item['parent_select_key'],
                    ];
                }
                if (isset($item[ 'children' ]) && is_array($item[ 'children' ])) {
                    $collectMoves($item[ 'children' ], $item);
                }
            }
        };
        $collectMoves($menus);

        //迁移
        foreach ($moveList as $move) {
            $item = $move[ 'item' ];
            $targetKey = $move[ 'target_key' ];
            $index = $move[ 'index' ];
            $parentList = &$move[ 'parent_list' ];
            // 从当前children列表中移除
            unset($parentList[ $index ]);

            // 将其添加到目标key的children
            if (isset($menuKeyMap[ $targetKey ])) {
                if (!isset($menuKeyMap[ $targetKey ][ 'children' ]) || !is_array($menuKeyMap[ $targetKey ][ 'children' ])) {
                    $menuKeyMap[ $targetKey ][ 'children' ] = [];
                }
                $menuKeyMap[ $targetKey ][ 'children' ][] = $item;
            }
        }

        //清理index，避免因unset导致的乱序
        $reIndex = function (&$list) use (&$reIndex) {
            $list = array_values($list);
            foreach ($list as $key=> &$item) {
                if (isset($item[ 'children' ]) && is_array($item[ 'children' ])) {
                    $reIndex($item[ 'children' ]);
                }
            }

        };
        $reIndex($menus);
        return $menus;
    }


    /**
     * 通过菜单menu_key组获取接口数组
     * @param array $menu_keys
     * @param string $app_type
     * @return mixed|string
     */
    public function getApiListByMenuKeys(array $menu_keys, string $app_type = '')
    {
        sort($menu_keys);
        $cache_name = 'api' . md5(implode("_", $menu_keys));
        return cache_remember(
            $cache_name,
            function() use ($menu_keys, $app_type) {
                $where = [
                    [ 'menu_key', 'in', $menu_keys ]
                ];
                if (!empty($app_type)) {
                    $where[] = [ 'app_type', '=', $app_type ];
                }
                $menu_list = ( new SysMenu() )->where($where)->order('sort', 'desc')->column('api_url,methods');
                foreach ($menu_list as $v) {
                    $auth_menu_list[ $v[ 'methods' ] ][] = $v[ 'api_url' ];
                }
                return $auth_menu_list ?? [];
            },
            self::$cache_tag_name
        );
    }


    /**
     * 通过菜单menu_key组获取按钮数组
     * @param array $menu_keys
     * @param string $app_type
     * @return mixed
     */
    public function getButtonListBuMenuKeys(array $menu_keys, string $app_type = '')
    {
        sort($menu_keys);
        $cache_name = 'button' . md5(implode("_", $menu_keys));
        return cache_remember(
            $cache_name,
            function() use ($menu_keys, $app_type) {
                $where = [
                    [ 'menu_key', 'in', $menu_keys ],
                    [ 'menu_type', '=', MenuTypeDict::BUTTON ]
                ];
                if (!empty($app_type)) {
                    $where[] = [ 'app_type', '=', $app_type ];
                }
                return $this->model->where($where)->order('sort', 'desc')->column('menu_key');
            },
            self::$cache_tag_name
        );
    }

    /**
     * 获取所有接口菜单权限
     * @param $app_type
     * @param $status
     * @return mixed
     */
    public function getAllApiList($app_type = '', $status = 'all')
    {
        $cache_name = 'all_api' . $app_type . '_' . $status;
        return cache_remember(
            $cache_name,
            function() use ($status, $app_type) {
                $where = [
                    [ 'api_url', '<>', '' ],
                    [ 'app_type', '=', $app_type ],
                ];
                if ($status != 'all') {
                    $where[] = [ 'status', '=', $status ];
                }
                $menu_list = $this->model->where($where)->order('sort', 'desc')->column('methods, api_url');
                $auth_menu_list = [];
                foreach ($menu_list as $v) {
                    $auth_menu_list[ $v[ 'methods' ] ][] = $v[ 'api_url' ];
                }
                return $auth_menu_list;
            },
            self::$cache_tag_name
        );
    }

    /**
     * 通过站点端口获取菜单id
     * @param string $app_type
     * @param $status
     * @return mixed|string
     */
    public function getAllMenuIdsByAppType(string $app_type, $status = 'all')
    {
        $cache_name = 'menu_id_by_app_type_' . $app_type;
        return cache_remember(
            $cache_name,
            function() use ($app_type, $status) {
                $where = [
//
                    [ 'app_type', '=', $app_type ],
                ];
                if ($status != 'all') {
                    $where[] = [ 'status', '=', $status ];
                }
                return $this->model->where($where)->order('sort desc')->column('menu_key');
            },
            self::$cache_tag_name
        );
    }


    /**
     * 获取所有按钮菜单
     */
    public function getAllButtonList($app_type = '', $status = 'all', $is_tree = 0)
    {
        $cache_name = 'menu_api_' . $app_type . '_' . $status . '_' . $is_tree;
        return cache_remember(
            $cache_name,
            function() use ($status, $is_tree, $app_type) {
                $where = [
                    [ 'menu_type', '=', MenuTypeDict::BUTTON ],
                    [ 'app_type', '=', $app_type ],
                ];
                if ($status != 'all') {
                    $where[] = [ 'status', '=', $status ];
                }
                return $this->model->where($where)->order('sort', 'desc')->column('menu_key');
            },
            self::$cache_tag_name
        );
    }

    /**
     * 把返回的数据集转换成Tree(专属于)
     * @param $list 要转换的数据集
     * @param string $pk
     * @param string $pid
     * @param string $child
     * @param int $root
     * @return array
     */
    public function menuToTree($list, $pk = 'id', $pid = 'pid', $child = 'child', $button_name = 'auth', $root = '', $is_button = 0)
    {
        // 创建Tree
        $tree = array();
        if (is_array($list)) {
            // 创建基于主键的数组引用
            $refer = array();
            foreach ($list as $key => $data) {
                $refer[ $data[ $pk ] ] =& $list[ $key ];
            }
            foreach ($list as $key => $data) {
                // 判断是否存在parent
                $parent_id = $data[ $pid ];
                if ($root == $parent_id) {
                    $tree[] =& $list[ $key ];
                } else {
                    if (isset($refer[ $parent_id ])) {
                        $parent =& $refer[ $parent_id ];
                        if ($list[ $key ][ 'menu_type' ] == 2 && $is_button == 1) {
                            $parent[ $button_name ][] =& $list[ $key ][ 'menu_key' ];
                        } else {
                            $parent[ $child ][] =& $list[ $key ];
                        }

                    }
                }
            }
        }
        return $tree;

    }

    /**
     * 获取完整的路由地址
     * @param $menu_key
     * @return string
     */
    public function getFullRouterPath($menu_key)
    {
        $menu = $this->model->where([ [ 'menu_key', '=', $menu_key ] ])->findOrEmpty($menu_key);
        if ($menu->isEmpty()) return '';
        $parents = [];
        $this->getParentDirectory($menu, $parents);
        $parents = array_reverse($parents);
        $router_path = implode('/', $parents);
        if (!empty($router_path)) {
            $router_path .= '/' . $menu[ 'router_path' ];
        } else {
            $router_path = $menu[ 'router_path' ];
        }
        return $router_path;
    }

    /**
     * 递归查询模板集合
     * @param SysMenu $menu
     * @param $parents
     * @return void
     */
    public function getParentDirectory(SysMenu $menu, &$parents)
    {
        if (!$menu->isEmpty() && !empty($menu[ 'parent_key' ])) {
            $parent_menu = $this->model->where([ [ 'menu_key', '=', $menu[ 'parent_key' ] ] ])->findOrEmpty();
            if (!empty($parent_menu)) {
                if (!empty($parent_menu[ 'router_path' ])) $parents[] = $parent_menu[ 'router_path' ];
                $this->getParentDirectory($parent_menu, $parents);
            }
        }

    }

    /**
     * 获取系统菜单(站点权限api极限)
     * @param string $app_type
     * @param array $addons
     * @return mixed|string
     */
    public function getApiListBySystem(string $app_type = '', array $addons = [])
    {
        sort($addons);
        $cache_name = 'system_menu_api_' . $app_type . implode("_", $addons);
        return cache_remember(
            $cache_name,
            function() use ($app_type, $addons) {
                $addons[] = '';
                $where = [
                    [ 'addon', 'in', $addons ]
                ];
                if (!empty($app_type)) {
                    $where[] = [ 'app_type', '=', $app_type ];
                }
                $menu_list = ( new SysMenu() )->where($where)->order('sort', 'desc')->column('api_url,methods');
                foreach ($menu_list as $v) {
                    $auth_menu_list[ $v[ 'methods' ] ][] = $v[ 'api_url' ];
                }
                return $auth_menu_list ?? [];
            },
            self::$cache_tag_name
        );
    }

    /**
     * 站点所拥有的菜单极限
     * @param string $app_type
     * @param array $addons
     * @param int $is_tree
     * @param int $is_button
     * @param string $status
     * @return array|mixed|string
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getMenuListBySystem(string $app_type, array $addons, int $is_tree = 0, int $is_button = 1, $status = 'all')
    {
        sort($addons);
        $cache_name = 'menu' . md5(implode("_", $addons)) . $is_tree . $status;
        $menu_list = cache_remember(
            $cache_name,
            function() use ($addons, $app_type, $is_tree, $status) {
                $where = [
                    [ 'addon', 'in', $addons ]
                ];
                if (!empty($app_type)) {
                    $where[] = [ 'app_type', '=', $app_type ];
                }
                if ($status != 'all') $where[] = [ 'status', '=', $status ];
                // 排除插件中delete的菜单
                $delete_menu_addon = [];
                $addon_loader = new DictLoader("Menu");
                foreach ($addons as $addon) {
                    $delete_menu = $addon_loader->load([ "addon" => $addon, "app_type" => $app_type ])[ 'delete' ] ?? [];
                    if (!empty($delete_menu) && is_array($delete_menu)) $delete_menu_addon[] = $delete_menu;
                }
                if (!empty($delete_menu_addon)) {
                    $delete_intersect = array_intersect(...$delete_menu_addon);
                    if (!empty($delete_intersect)) {
                        $where[] = [ 'menu_key', 'not in', $delete_intersect ];
                    }
                }
                return $this->model->where($where)->order('sort', 'desc')->select()->toArray();
            },
            self::$cache_tag_name
        );

        foreach ($menu_list as &$v) {
            $lang_menu_key = "dict_menu_" . $v[ 'app_type' ] . '.' . $v[ 'menu_key' ];
            $lang_menu_name = get_lang("dict_menu_" . $v[ 'app_type' ] . '.' . $v[ 'menu_key' ]);
            //语言已定义
            if ($lang_menu_key != $lang_menu_name) {
                $v[ 'menu_name' ] = $lang_menu_name;
            }
        }
        return $is_tree ? $this->menuToTree($menu_list, 'menu_key', 'parent_key', 'children', 'auth', '', $is_button) : $menu_list;

    }

    /**
     * 通过站点的应用配置获取所有的keys
     * @param string $app_type
     * @param array $addons
     * @return mixed|string
     */
    public function getMenuKeysBySystem(string $app_type, array $addons)
    {
        sort($addons);
        $cache_name = 'menu_keys_' . $app_type . implode("_", $addons);
        return cache_remember(
            $cache_name,
            function() use ($app_type, $addons) {
                $addons[] = '';
                $where = [
                    [ 'addon', 'in', $addons ]
                ];
                if (!empty($app_type)) {
                    $where[] = [ 'app_type', '=', $app_type ];
                }
                return ( new SysMenu() )->where($where)->order('sort', 'desc')->column('menu_key');
            },
            self::$cache_tag_name
        );
    }

    public function getSystemMenu($status = 'all', $is_tree = 0, $is_button = 0)
    {

        if ($is_button == 0) {
            $where = [
                [ 'menu_type', 'in', [ 0, 1 ] ]
            ];
        }

        if ($status != 'all') {
            $where[] = [ 'status', '=', $status ];
        }
        $where[] = [ 'addon', '=', '' ];
        $menu_list = ( new SysMenu() )->where($where)->order('sort desc')->select()->toArray();
        foreach ($menu_list as &$v) {
            $lang_menu_key = 'dict_menu_admin' . '.' . $v[ 'menu_key' ];
            $lang_menu_name = get_lang($lang_menu_key);
            //语言已定义
            if ($lang_menu_key != $lang_menu_name) {
                $v[ 'menu_name' ] = $lang_menu_name;
            }
        }
        $all_menu_list = $is_tree ? $this->menuToTree($menu_list, 'menu_key', 'parent_key', 'children', 'auth', '', $is_button) : $menu_list;
        return $this->moveChildrenToParent($all_menu_list);
    }

    public function getAddonMenu($app_key, $status = 'all', $is_tree = 0, $is_button = 0)
    {

        if ($is_button == 0) {
            $where = [
                [ 'menu_type', 'in', [ 0, 1 ] ]
            ];
        }

        if ($status != 'all') {
            $where[] = [ 'status', '=', $status ];
        }
        $where[] = [ 'addon', '=', $app_key ];
        $menu_list = ( new SysMenu() )->where($where)->select()->toArray();
        return $is_tree ? $this->menuToTree($menu_list, 'menu_key', 'parent_key', 'children', 'auth', '', $is_button) : $menu_list;
    }

    /**
     * 查询菜单类型为目录的菜单
     * @param string $addon
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getMenuByTypeDir(string $addon = 'system')
    {
        $cache_name = 'menu_api_by_type_dir' . $addon;
        $menu_list = cache_remember(
            $cache_name,
            function() use ($addon) {
                $where = [
                    [ 'menu_type', '=', 0 ],
                    [ 'app_type', '=', 'site' ]
                ];
                //查询应用
                $where[] = [ 'addon', '=', $addon == 'system' ? '' : $addon ];
                return ( new SysMenu() )->where($where)->order('sort desc')->select()->toArray();
            },
            self::$cache_tag_name
        );
        foreach ($menu_list as &$v) {
            $lang_menu_key = 'dict_menu_admin' . '.' . $v[ 'menu_key' ];
            $lang_menu_name = get_lang($lang_menu_key);
            //语言已定义
            if ($lang_menu_key != $lang_menu_name) {
                $v[ 'menu_name' ] = $lang_menu_name;
            }
        }

        return $this->menuToTree($menu_list, 'menu_key', 'parent_key', 'children', 'auth', '', 0);
    }
}
