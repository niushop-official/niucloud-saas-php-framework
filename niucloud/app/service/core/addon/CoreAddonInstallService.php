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

namespace app\service\core\addon;

use app\model\site\Site;
use app\model\site\SiteGroup;
use app\service\admin\sys\MenuService;
use app\service\core\menu\CoreMenuService;
use app\service\core\schedule\CoreScheduleInstallService;
use core\exception\AddonException;
use core\exception\CommonException;
use core\util\niucloud\CloudService;
use core\util\Terminal;
use EasyWeChat\Kernel\Exceptions\Exception;
use think\db\exception\DbException;
use think\db\exception\PDOException;
use think\facade\Cache;
use think\facade\Db;
use think\facade\Log;

/**
 * 安装服务层
 * Class CoreInstallService
 * @package app\service\core\install
 */
class CoreAddonInstallService extends CoreAddonBaseService
{
    use WapTrait;

    public static $instance;
    /**
     * 需要迁移的文件，用于检测是否冲突
     * @var array[]
     */
    public $install_files = [
        'admin' => [],
        'web' => [],
        'wap' => [],
    ];
    private $files = [
        'niucloud' => [],
        'admin' => [],
        'web' => [],
        'wap' => [],
        'resource' => []
    ];
    private $flow_path = [
        'file',
        'sql',
        'menu',
        'diy'
    ];
    private $addon;
    private $install_addon_path;

    private $cache_key = '';

    private $install_task = null;

    private $addon_list = [];

    public function __construct($addon)
    {
        parent::__construct();
        $this->addon_list = explode(',', $addon);
        $this->addon = $this->addon_list[0];
        $this->install_addon_path = $this->addon_path . $this->addon . DIRECTORY_SEPARATOR;

        $this->cache_key = "install_{$addon}";

        $this->install_task = Cache::get('install_task');
    }

    /**
     * 初始化实例
     * @param string $addon
     * @return static
     */
    public static function instance(string $addon)
    {
        if (is_null(self::$instance)) {
            self::$instance = new static($addon);
        }
        return self::$instance;
    }

    /**
     * 安装前检测
     * @return array
     */
    public function installCheck()
    {
        // 放入的文件
        $to_admin_dir = $this->root_path . 'admin' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'addon'. DIRECTORY_SEPARATOR;
        $to_web_dir = $this->root_path . 'web' . DIRECTORY_SEPARATOR;
        $to_wap_dir = $this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'addon'. DIRECTORY_SEPARATOR;

        $to_resource_dir = public_path() . 'addon' . DIRECTORY_SEPARATOR;

        if (!is_dir($this->root_path . 'admin' . DIRECTORY_SEPARATOR)) throw new CommonException('ADMIN_DIR_NOT_EXIST');
        if (!is_dir($this->root_path . 'web' . DIRECTORY_SEPARATOR)) throw new CommonException('WEB_DIR_NOT_EXIST');
        if (!is_dir($this->root_path . 'uni-app' . DIRECTORY_SEPARATOR)) throw new CommonException('UNIAPP_DIR_NOT_EXIST');

        $data = [
            // 目录检测
            'dir' => [
                // 要求可读权限
                'is_readable' => [],
                // 要求可写权限
                'is_write' => []
            ]
        ];

        if (is_dir($this->addon_path)) $data['dir']['is_readable'][] = ['dir' => str_replace(project_path(), '', $this->addon_path), 'status' => is_readable($this->addon_path)];

        $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $to_admin_dir), 'status' => is_dir($to_admin_dir) ? is_write($to_admin_dir) : mkdir($to_admin_dir, 0777, true)];
        $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $to_web_dir), 'status' => is_dir($to_web_dir) ? is_write($to_web_dir) : mkdir($to_web_dir, 0777, true)];
        $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $to_wap_dir), 'status' => is_dir($to_wap_dir) ? is_write($to_wap_dir) : mkdir($to_wap_dir, 0777, true)];
        $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $to_resource_dir), 'status' => is_dir($to_resource_dir) ? is_write($to_resource_dir) : mkdir($to_resource_dir, 0777, true)];

        // 校验niucloud/public下 wap web admin 目录及文件是否可读可写
        $check_res = checkDirPermissions($this->addon_path);
        $check_res = array_merge2($check_res, checkDirPermissions(public_path() . 'wap'));
        $check_res = array_merge2($check_res, checkDirPermissions(public_path() . 'admin'));
        $check_res = array_merge2($check_res, checkDirPermissions(public_path() . 'web'));

        if (!empty($check_res['unreadable'])) {
            foreach ($check_res['unreadable'] as $item) {
                $data['dir']['is_readable'][] = ['dir' => str_replace(project_path(), '', $item),'status' => false];
            }
        }
        if (!empty($check_res['not_writable'])) {
            foreach ($check_res['not_writable'] as $item) {
                $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $item),'status' => false];
            }
        }

        // 检测插件
        $framework_version = config('version.version');
        $framework_version_arr = explode('.', $framework_version);

        $data['addon_check'] = [];
        foreach ($this->addon_list as $addon) {
            $install_data = $this->getAddonConfig($addon);
            if (empty($install_data)) {
                $data['addon_check'][] = [
                    'msg' => "未找到插件{$addon}的info.json文件",
                    'status' => false
                ];
                continue;
            }
            $core_addon_service = new CoreAddonService();
            if (!empty($core_addon_service->getInfoByKey($addon))) {
                $data['addon_check'][] = [
                    'msg' => $install_data['title'] . '插件已安装,不能重复安装',
                    'status' => false
                ];
                continue;
            }
            if (isset($install_data['support_app']) && !empty($install_data['support_app']) &&
                empty($core_addon_service->getInfoByKey($install_data['support_app'])) && !in_array($install_data['support_app'], $this->addon_list)) {
                $support_app_data = $this->getAddonConfig($install_data['support_app']);
                $data['addon_check'][] = [
                    'msg' => $install_data['title'] . '插件的主应用'. (empty($support_app_data) ? $install_data['support_app'] : $support_app_data['title']) .'插件还未安装，请先安装主应用',
                    'status' => false
                ];
                continue;
            }
            if (!isset($install_data['support_version']) || empty($install_data['support_version'])) {
                $data['addon_check'][] = [
                    'msg' => $install_data['title'] . '插件的info.json文件中未检测到匹配框架当前版本['. $framework_version_arr[0].'.'.$framework_version_arr[1] .'.*]的信息无法安装，<a style="text-decoration: underline;" href="https://doc.press.niucloud.com/php/saas-framework/use/installFAQ/pluginNotCompatible.html" target="blank">点击查看相关手册</a>',
                    'status' => false
                ];
                continue;
            }
            $support_framework_arr = explode('.', $install_data['support_version']);
            if ($framework_version_arr[0].$framework_version_arr[1] != $support_framework_arr[0].$support_framework_arr[1]) {
                if ((float) "$support_framework_arr[0].$support_framework_arr[1]" < (float) "$framework_version_arr[0].$framework_version_arr[1]") {
                    $data['addon_check'][] = [
                        'msg' => $install_data['title'] . '插件的info.json文件中检测到支持的框架版本['. $install_data['support_version'] .']低于当前框架版本['. $framework_version_arr[0].'.'.$framework_version_arr[1] .'.*]无法安装，<a style="text-decoration: underline;" href="https://doc.press.niucloud.com/php/saas-framework/use/installFAQ/pluginNotCompatible.html" target="blank">点击查看相关手册</a>',
                        'status' => false
                    ];
                }
            }
        }

        // 是否通过校验
        $data['is_pass'] = !in_array(false, array_merge(
            array_column($data['dir']['is_readable'], 'status'),
            array_column($data['dir']['is_write'], 'status'),
            array_column($data['addon_check'], 'status')
        ));
        $data['file_permission_is_pass'] = !in_array(false, array_merge(
            array_column($data['dir']['is_readable'], 'status'),
            array_column($data['dir']['is_write'], 'status'),
        ));
        Cache::set($this->cache_key . '_install_check', $data['is_pass']);
        return $data;
    }

    /**
     * 插件安装
     * @return true
     */
    public function install(string $mode = 'local')
    {
        $check_res = Cache::get($this->cache_key . '_install_check');
        if (!$check_res) throw new CommonException('INSTALL_CHECK_NOT_PASS');

        if ($this->install_task) throw new CommonException('ADDON_INSTALLING');
        $this->install_task = [ 'mode' => $mode, 'addon' => $this->addon, 'addon_list' => $this->addon_list, 'step' => [], 'fail_addon' => [], 'timestamp' => time() ];
        Cache::set('install_task', $this->install_task);

        set_time_limit(0);

        // 备份前端目录
        $this->backupFrontend();

        $tips = [];
        if ($mode != 'cloud') {
            $tips[] = get_lang('dict_addon.install_after_update');
        } else {
            try {
                (new CloudService())->checkLocal();
            } catch (\Exception $e) {
                Cache::set('install_task', null);
                throw new CommonException($e->getMessage(), $e->getCode());
            }
        }

        foreach ($this->addon_list as $addon) {
            $this->install_task['addon'] = $addon;
            Cache::set('install_task', $this->install_task);

            $this->addon = $addon;
            $this->install_addon_path = $this->addon_path . $this->addon . DIRECTORY_SEPARATOR;
            $install_data = $this->getAddonConfig($addon);

            $install_step = ['installDir','installDepend'];

            // 检测插件是否存在编译内容
            if (!empty($install_data['compile'])) {
                $install_step[] = 'coverCompile';
            }

            if ($mode != 'cloud') {
                // 配置文件
                $package_path = $this->install_addon_path . 'package' . DIRECTORY_SEPARATOR;
                $package_file = [];
                search_dir($package_path, $package_file);
                $package_file = array_map(function ($file) use ($package_path) {
                    return str_replace($package_path . DIRECTORY_SEPARATOR, '', $file);
                }, $package_file);

                if (in_array('admin-package.json', $package_file) && !in_array(get_lang('dict_addon.install_after_admin_update'), $tips)) $tips[] = get_lang('dict_addon.install_after_admin_update');
                if (in_array('composer.json', $package_file) && !in_array(get_lang('dict_addon.install_after_composer_update'), $tips)) $tips[] = get_lang('dict_addon.install_after_composer_update');
                if (in_array('uni-app-package.json', $package_file) && !in_array(get_lang('dict_addon.install_after_wap_update'), $tips)) $tips[] = get_lang('dict_addon.install_after_wap_update');
                if (in_array('web-package.json', $package_file) && !in_array(get_lang('dict_addon.install_after_web_update'), $tips) ) $tips[] = get_lang('dict_addon.install_after_web_update');
            }

            try {
                $this->install_task['step'] = [];
                foreach ($install_step as $step) {
                    $this->install_task['step'][] = $step;
                    Cache::set('install_task', $this->install_task);
                    $this->$step();
                }
            } catch (\Exception $e) {
                $this->install_task['fail_addon'] = $this->addon;
                $this->installExceptionHandle($addon);
                if (count($this->addon_list) == 1) {
                    throw new CommonException($e->getMessage());
                }
                Log::write($install_data['title'] . '插件安装失败');
                Log::write($e->getTrace());
                $tips[] = $install_data['title'] . '插件安装失败';
            }
        }

        $this->installWap();

        if ($mode == 'cloud') {
            $this->install_task['tips'] = $tips;
            Cache::set('install_task', $this->install_task);
            $this->cloudInstall();
        } else {
            $this->handleAddonInstall();
        }
        return empty($tips) ? true : $tips;
    }

    /**
     * 安装异常处理
     * @return void
     */
    public function installExceptionHandle($name = '') {
        $install_task = Cache::get('install_task');

        foreach ($this->addon_list as $addon) {
            if (!empty($name) && $name != $addon) continue;
            @$this->uninstallDir();
            @$this->uninstallWap();
        }

        @$this->revertFrontendBackup();
    }

    /**
     * 取消安装任务
     * @return void
     */
    public function cancleInstall() {
        if (Cache::get('install_task')) {
            $this->installExceptionHandle();
            Cache::set('install_task', null);
        }
    }

    /**
     * 获取安装任务
     * @return mixed
     */
    public function getInstallTask() {
        return $this->install_task;
    }

    /**
     * 安装迁移复制文件
     * @return bool
     */
    public function installDir()
    {
        $from_admin_dir = $this->install_addon_path . 'admin' . DIRECTORY_SEPARATOR;
        $from_web_dir = $this->install_addon_path . 'web' . DIRECTORY_SEPARATOR;
        $from_wap_dir = $this->install_addon_path . 'uni-app' . DIRECTORY_SEPARATOR;
        $from_resource_dir = $this->install_addon_path . 'resource' . DIRECTORY_SEPARATOR;

        // 放入的文件
        $to_admin_dir = $this->root_path . 'admin' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'addon' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        $to_web_dir = $this->root_path . 'web' . DIRECTORY_SEPARATOR . 'addon' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        $to_wap_dir = $this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'addon' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        $to_resource_dir = public_path() . 'addon' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;

        // 安装admin管理端
        if (file_exists($from_admin_dir)) {
            dir_copy($from_admin_dir, $to_admin_dir, $this->files['admin'], exclude_dirs:['icon']);
            // 判断图标目录是否存在
            if (is_dir($from_admin_dir . 'icon')) {
                $addon_icon_dir = $this->root_path . 'admin' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'styles' . DIRECTORY_SEPARATOR . 'icon' . DIRECTORY_SEPARATOR . 'addon' . DIRECTORY_SEPARATOR . $this->addon;
                dir_copy($from_admin_dir . 'icon', $addon_icon_dir);
            }
            // 编译后台图标库文件
            $this->compileAdminIcon();
        }

        // 安装电脑端
        if (file_exists($from_web_dir)) {
            // 安装布局文件
            $layout = $from_web_dir . 'layouts';
            if (is_dir($layout)) {
                dir_copy($layout, $this->root_path . 'web' . DIRECTORY_SEPARATOR . 'layouts');
                del_target_dir($layout, true);
            }
            dir_copy($from_web_dir, $to_web_dir, $this->files['web']);
        }

        // 安装手机端
        if (file_exists($from_wap_dir)) {
            dir_copy($from_wap_dir, $to_wap_dir, $this->files['wap']);
        }

        //安装资源文件
        if (file_exists($from_resource_dir)) {
            dir_copy($from_resource_dir, $to_resource_dir, $this->files['resource']);
        }

        return true;
    }

    /**
     * 编译后台图标库文件
     * 图标开发注意事项，不能占用  iconfont、icon 关键词（会跟系统图标冲突），建议增加业务前缀，比如 旅游业：recharge
     * @return bool
     */
    public function compileAdminIcon()
    {
        $compile_path = $this->root_path . str_replace('/', DIRECTORY_SEPARATOR, 'admin/src/styles/icon/');

        $content = "";
        $root_path = $compile_path . 'addon'; // 插件图标根目录
        $file_arr = getFileMap($root_path);
        if (!empty($file_arr)) {
            foreach ($file_arr as $ck => $cv) {
                if (str_contains($cv, '.css')) {
                    $path = str_replace($root_path . '/', '', $ck);
                    $path = str_replace('/.css', '', $path);
                    $content .= "@import \"addon/{$path}\";\n";
                }
            }
        }
        file_put_contents($compile_path . 'addon-iconfont.css', $content);
        return true;
    }

    public function installSql()
    {
        $sql = $this->install_addon_path . 'sql' . DIRECTORY_SEPARATOR . 'install.sql';
        $this->executeSql($sql);
        return true;
    }

    /**
     * 执行sql
     * @param string $sql_file
     * @return bool
     */
    public static function executeSql(string $sql_file): bool
    {
        if (is_file($sql_file)) {
            $sql = file_get_contents($sql_file);
            // 执行sql
            $sql_arr = parse_sql($sql);
            if (!empty($sql_arr)) {
                $prefix = config('database.connections.mysql.prefix');
                try {
                    $default_collation = Db::query("SHOW VARIABLES LIKE 'collation_database'")[0]['Value'] ?? 'utf8mb4_general_ci';
                } catch (\Exception $e) {
                    $default_collation = 'utf8mb4_general_ci';
                }
                Db::startTrans();
                try {
                    foreach ($sql_arr as $sql_line) {
                        $sql_line = trim($sql_line);
                        if (!empty($sql_line)) {
                            $sql_line = str_ireplace('{{prefix}}', $prefix, $sql_line);
                            $sql_line = str_ireplace('INSERT INTO ', 'INSERT IGNORE INTO ', $sql_line);
                            // 处理成默认排序规则
                            $sql_line = preg_replace_callback(
                                '/\bCOLLATE\s*(=)?\s*[`"\']?([a-zA-Z0-9_]+)[`"\']?/i',
                                function ($matches) use ($default_collation) {
                                    return "COLLATE " . $default_collation;
                                },
                                $sql_line
                            );
                            Db::execute($sql_line);
                        }
                    }
                    Db::commit();
                    return true;
                } catch ( PDOException $e ) {
                    Db::rollback();
                    throw new AddonException($e->getMessage());
                }
            }
        }
        return true;
    }

    /**
     * 执行插件install方法
     * @return true
     */
    public function handleAddonInstall()
    {
        $core_addon_service = new CoreAddonService();

        $fail_addon = $this->install_task['fail_addon'] ?? [];

        foreach ($this->addon_list as $addon) {
            if (in_array($addon, $fail_addon)) continue;

            $this->addon = $addon;
            $this->install_addon_path = $this->addon_path . $this->addon . DIRECTORY_SEPARATOR;

            // 执行安装sql
            $this->installSql();
            // 安装菜单
            $this->installMenu();
            // 安装计划任务
            $this->installSchedule();

            $install_data = $this->getAddonConfig($this->addon);
            $install_data['icon'] = 'addon/' . $this->addon . '/icon.png';
            $core_addon_service->set($install_data);

            //执行插件安装方法
            $class = "addon\\" . $this->addon . "\\" . 'Addon';
            if (class_exists($class)) {
                (new $class())->install();
            }
        }

        //清理缓存
        Cache::tag(self::$cache_tag_name)->clear();

        // 清除插件安装中标识
        Cache::delete('install_task');
        Cache::delete($this->cache_key . '_install_check');
        return true;
    }

    /**
     * 合并依赖
     * @return void
     */
    public function installDepend()
    {
        (new CoreDependService())->installDepend($this->addon);
    }

    /**
     * 备份前端页面
     * @return void
     */
    public function backupFrontend() {
        $backup_dir = runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'frontend' . DIRECTORY_SEPARATOR;
        if (is_dir($backup_dir)) del_target_dir($backup_dir, true);

        foreach (['admin', 'wap', 'web'] as $port) {
            $to_dir = public_path() . $port;
            if (is_dir($to_dir)) {
                if (is_dir($backup_dir . $port)) del_target_dir($backup_dir . $port, true);
                // 备份原目录
                dir_copy($to_dir, $backup_dir . $port);
            }
        }
    }

    /**
     * 还原被覆盖前的文件
     * @return void
     */
    public function revertFrontendBackup() {
        $backup_dir = runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'frontend' . DIRECTORY_SEPARATOR;
        $backup_file = [];

        search_dir($backup_dir, $backup_file);

        if (!empty($backup_file)) {
            dir_copy(public_path(), $backup_dir);
            @del_target_dir($backup_dir, true);
        }
    }

    /**
     * 插件编译文件覆盖
     * @return void
     */
    public function coverCompile() {
        $compile = $this->getAddonConfig($this->addon)['compile'];
        foreach ($compile as $port) {
            $to_dir = public_path() . $port;
            $from_dir = $this->addon_path . 'compile' . DIRECTORY_SEPARATOR . $port;

            if (is_dir($from_dir) && is_dir($to_dir)) {
                // 删除后覆盖目录
                del_target_dir($to_dir, true);
                dir_copy($from_dir, $to_dir . $port);
            }
        }
    }

    /**
     * 云安装
     * @return void
     */
    public function cloudInstall() {
        (new CoreAddonCloudService())->cloudBuild($this->addon);
    }

    /**
     * 插件卸载环境检测
     * @return array|array[]
     */
    public function uninstallCheck() {
        $data = [
            // 目录检测
            'dir' => [
                // 要求可读权限
                'is_readable' => [],
                // 要求可写权限
                'is_write' => []
            ]
        ];

        // 将要删除的根目录
        $to_admin_dir = $this->root_path . 'admin' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        $to_web_dir = $this->root_path . 'web' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        $to_wap_dir = $this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        $to_resource_dir = public_path() . 'addon' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;

        if (is_dir($to_admin_dir)) $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $to_admin_dir), 'status' => is_write($to_admin_dir)];
        if (is_dir($to_web_dir)) $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $to_web_dir), 'status' => is_write($to_web_dir)];
        if (is_dir($to_wap_dir)) $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $to_wap_dir), 'status' => is_write($to_wap_dir)];
        if (is_dir($to_resource_dir)) $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $to_resource_dir), 'status' => is_write($to_resource_dir)];

        $check_res = array_merge(
            array_column($data['dir']['is_readable'], 'status'),
            array_column($data['dir']['is_write'], 'status')
        );

        // 是否通过校验
        $data['is_pass'] = !in_array(false, $check_res);
        return $data;
    }

    /**
     * 卸载插件
     * @return true
     */
    public function uninstall()
    {
        $site_groups = (new SiteGroup())->where([ ['app|addon', 'like', "%\"$this->addon\"%"] ])->column("group_id");
        if (!empty($site_groups)) {
            $site_num = (new Site())->where([ ['group_id', 'in', $site_groups] ])->count('site_id');
            if ($site_num) throw new CommonException('APP_NOT_ALLOW_UNINSTALL');
        }

        (new CoreAddonDevelopBuildService())->build($this->addon);

        //执行插件卸载方法
        $class = "addon\\" . $this->addon . "\\" . 'Addon';
        if (class_exists($class)) {
            (new $class())->uninstall();
        }
        $core_addon_service = new CoreAddonService();
        $addon_info = $core_addon_service->getInfoByKey($this->addon);
        if (empty($addon_info)) throw new AddonException('NOT_UNINSTALL');
        if (!$this->uninstallSql()) throw new AddonException('ADDON_SQL_FAIL');
        if (!$this->uninstallDir()) throw new AddonException('ADDON_DIR_FAIL');

        // 卸载菜单
        $this->uninstallMenu();

        // 卸载计划任务
        $this->uninstallSchedule();

        // 卸载wap
        $this->uninstallWap();

        // 还原备份
        if (!empty($addon_info['compile'])) (new CoreAddonCompileHandleService())->revertBackup();

        $core_addon_service = new CoreAddonService();
        $core_addon_service->delByKey($this->addon);

        //清理缓存
        Cache::tag(self::$cache_tag_name)->clear();
        return true;
    }

    /**
     * 卸载数据库
     * @return true
     */
    public function uninstallSql()
    {
        $sql = $this->install_addon_path . 'sql' . DIRECTORY_SEPARATOR . 'uninstall.sql';
        $this->executeSql($sql);
        return true;
    }

    /**
     * 卸载插件
     * @return true
     */
    public function uninstallDir()
    {
        // 将要删除的根目录
        $to_admin_dir = $this->root_path . 'admin' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'addon' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        $to_web_dir = $this->root_path . 'web' . DIRECTORY_SEPARATOR . 'addon' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        $to_web_layouts = $this->root_path . 'web' . DIRECTORY_SEPARATOR . 'layouts' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        $to_wap_dir = $this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'addon' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        $to_resource_dir = public_path() . 'addon' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;

        // 卸载admin管理端
        if (is_dir($to_admin_dir)) del_target_dir($to_admin_dir, true);
        // 移除admin图标
        $addon_icon_dir = $this->root_path . 'admin' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'styles' . DIRECTORY_SEPARATOR . 'icon' . DIRECTORY_SEPARATOR . 'addon' . DIRECTORY_SEPARATOR . $this->addon;
        if (is_dir($addon_icon_dir)) del_target_dir($addon_icon_dir, true);

        // 编译后台图标库文件
        $this->compileAdminIcon();

        // 卸载pc端
        if (is_dir($to_web_dir)) del_target_dir($to_web_dir, true);
        if (is_dir($to_web_layouts)) del_target_dir($to_web_layouts, true);

        // 卸载手机端
        if (is_dir($to_wap_dir)) del_target_dir($to_wap_dir, true);

        //删除资源文件
        if (is_dir($to_resource_dir)) del_target_dir($to_resource_dir, true);

        //todo  卸载插件目录涉及到的空文件
        return true;
    }

    /**
     * 卸载菜单
     * @return true
     * @throws DbException
     */
    public function uninstallMenu()
    {
        $core_menu_service = new CoreMenuService();
        $core_menu_service->deleteByAddon($this->addon);
        Cache::tag(MenuService::$cache_tag_name)->clear();
        return true;
    }

    /**
     * 卸载计划任务
     * @return true
     */
    public function uninstallSchedule()
    {
        (new CoreScheduleInstallService())->uninstallAddonSchedule($this->addon);
        return true;
    }

    /**
     * 卸载手机端
     * @return void
     */
    public function uninstallWap()
    {
        // 编译 diy-group 自定义组件代码文件
        $this->compileDiyComponentsCode($this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR, $this->addon);

        // 编译 pages.json 页面路由代码文件
        $this->uninstallPageCode($this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR);

        // 编译 加载插件标题语言包
        $this->compileLocale($this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR, $this->addon);

    }

    /**
     * 安装插件菜单
     * @return true
     */
    public function installMenu()
    {
        (new CoreMenuService)->refreshAddonMenu($this->addon);
        Cache::tag(MenuService::$cache_tag_name)->clear();
        return true;
    }

    /**
     * 安装手机端
     * @return void
     */
    public function installWap()
    {

        // 编译 diy-group 自定义组件代码文件
        $this->compileDiyComponentsCode($this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR, $this->addon_list);

        // 编译 pages.json 页面路由代码文件
        $this->installPageCode($this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR, $this->addon_list);

        // 编译 加载插件标题语言包
        $this->compileLocale($this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR, $this->addon_list);

    }

    public function download()
    {

    }

    public function edit()
    {

    }

    /**
     * 更新composer依赖
     * @return true
     */
    public function updateComposer()
    {
        $result = Terminal::execute(root_path(), 'composer update');
        if ($result !== true) {
            throw new CommonException($result);
        }
        return $result;
    }

    /**
     * 更新admin端依赖
     * @return true
     */
    public function updateAdminDependencies()
    {
        $result = Terminal::execute(root_path() . '../admin/', 'npm install');
        if ($result !== true) {
            throw new CommonException($result);
        }
        return $result;
    }

    /**
     * 更新手机端依赖
     * @return true
     */
    public function updateWapDependencies()
    {
        $result = Terminal::execute(root_path() . '../uni-app/', 'npm install');
        if ($result !== true) {
            throw new CommonException($result);
        }
        return $result;
    }

    /**
     * 更新web端依赖
     * @return true
     */
    public function updateWebDependencies()
    {
        $result = Terminal::execute(root_path() . '../web/', 'npm install');
        if ($result !== true) {
            throw new CommonException($result);
        }
        return $result;
    }

    /**
     * 安装完成 销毁插件实例
     * @return true
     */
    public function installComplete()
    {
        return true;
    }

    /**
     * 安装计划任务
     * @return true
     */
    public function installSchedule()
    {
        (new CoreScheduleInstallService())->installAddonSchedule($this->addon);
        return true;
    }

    /**
     * 处理编译之后的文件
     * @return true
     */
    public function handleBuildFile() {
        return true;
    }
}
