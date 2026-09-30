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

use app\model\addon\Addon;
use core\exception\AddonException;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use ZipArchive;

/**
 * 插件开发服务层
 */
class CoreAddonDevelopDownloadService extends CoreAddonBaseService
{


    public $base_addon_dir;


    private $key;

    public function __construct(string $key)
    {
        parent::__construct();
        $this->model = new Addon();
        $this->key = $key;
        $this->base_addon_dir = $this->addon_path . DIRECTORY_SEPARATOR . $this->key;

    }


    /**
     * 下载插件
     * @return \think\response\File
     */
    public function download()
    {
        if (!is_dir($this->base_addon_dir)) throw new AddonException('ADDON_IS_NOT_EXIST');//当前目录中不存在此项插件
        $form_dir = $this->base_addon_dir;
        $to_dir = root_path() . 'runtime' . DIRECTORY_SEPARATOR . 'addon_download' . DIRECTORY_SEPARATOR;
        $file_name = $this->key . '.zip';
        $file_path = $to_dir . $file_name;
        if (!$this->compressToZip($form_dir, $file_path)) throw new AddonException('ADDON_ZIP_ERROR');//下载失败
        $content = file_get_contents($file_path);
        @unlink($file_path);
        return download($content, $file_name, true);
    }


    /**
     * @param $source_dir 是待压缩的文件夹路径
     * @param $zip_file 是目标压缩文件的路径和名称
     * @return bool
     */
    public function compressToZip($source_dir, $zip_file)
    {
        $zip = new ZipArchive();
        $zip_dir = dirname($zip_file);
        if (!is_dir($zip_dir) && !mkdir($zip_dir, 0777, true) && !is_dir($zip_dir)) {
            throw new AddonException(sprintf('Directory "%s" was not created', $zip_dir));
        }
        // 打包前清理残留 zip 文件：PHP8.3+ 对已存在的空文件执行 ZipArchive::open 会异常，
        // 且并发任务可能在打包过程中删除该文件导致 close() 报「Can't open file」
        if (is_file($zip_file)) @unlink($zip_file);
        if ($zip->open($zip_file, ZipArchive::CREATE) !== true) {
            return false;
        }
        $source_dir = str_replace('\\',  '/', realpath($source_dir));
        if (is_dir($source_dir) === true) {
            $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($source_dir), RecursiveIteratorIterator::LEAVES_ONLY);
            foreach ($files as $file) {
                if (!$file->isDir()) {
                    $file_path = str_replace('\\',  '/', $file->getRealPath());
                    $relative_path = substr($file_path, strlen($source_dir) + 1);
                    $zip->addFile($file_path, $relative_path);
                }
            }
        } else if (file_exists($source_dir) === true) {
            $zip->addFile($source_dir, basename($source_dir));
        }
        // close 时若 zip 文件已被并发任务删除会产生警告并中断流程，容错处理并记录日志
        if (@$zip->close() !== true) {
            \think\facade\Log::write('compressToZip 关闭压缩包失败：' . $zip_file);
            return false;
        }
        return file_exists($zip_file);
    }

}
