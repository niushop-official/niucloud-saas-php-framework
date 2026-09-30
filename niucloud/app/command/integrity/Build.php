<?php
declare(strict_types=1);

namespace app\command\integrity;

use core\integrity\BaselineManager;
use core\integrity\CodeIntegrityChecker;
use core\integrity\FileScanner;
use think\console\Command;
use think\console\Input;
use think\console\input\Option;
use think\console\Output;
use Throwable;

/**
 * 服务端清单出包命令（仅官方 / 服务端使用）
 *
 * 用法：
 *   php think integrity:build -t framework
 *   php think integrity:build -t addon:shop
 *   php think integrity:build -p app/service -a sha256
 *   php think integrity:build -t framework --normalize=none
 */
class Build extends Command
{
    protected function configure()
    {
        $this->setName('integrity:build')
            ->setDescription('生成指定目标的清单文件与 .sha256（可选，仅纯 PHP 离线场景使用）')
            ->addOption('target', 't', Option::VALUE_REQUIRED, '应用或插件名，如 framework、addon:shop')
            ->addOption('path', 'p', Option::VALUE_REQUIRED, '自定义目录（相对站点根）')
            ->addOption('algorithm', 'a', Option::VALUE_REQUIRED, '校验算法，默认取配置')
            ->addOption('normalize', null, Option::VALUE_REQUIRED, '归一化开关，逗号列表：is_bom,is_crlf_lf；也接受 none / all')
            ->addOption('no-normalize', null, Option::VALUE_NONE, '快捷写法，等价于 --normalize=none');
    }

    protected function execute(Input $input, Output $output)
    {
        try {
            $checker = new CodeIntegrityChecker(
                $input->getOption('algorithm') ?: null,
                $this->resolveNormalize($input)
            );

            $target    = $checker->resolveTarget($input->getOption('target'), $input->getOption('path'));
            $product   = $checker->getProduct();
            $profile   = $checker->getProfile();
            $algorithm = $checker->getAlgorithm();
            // ★ 清单目录名必须用纯标识（shop / framework），与检测端 targetName() 保持一致，
            //   否则这里写到 addon_shop，检测端却去读 shop，本地自比永远对不上
            $name      = $checker->targetName($target);

            // ★ 必须用与检测端同一套排除规则，否则生成的清单和检测结果对不上。
            //   离线环境下会降级到内置兜底规则（此时会打印警告）。
            $rules = $checker->ensureRules();

            $scanner = new FileScanner();
            $files   = $scanner->listFiles((string) $target['base'], (array) $target['paths'], $rules);
            $list    = $scanner->hashChunk($files, (string) $target['base'], $algorithm, $checker->getNormalize());

            $baseline = new BaselineManager();
            $baseline->cleanOtherVersions($product, $name, $target['version']);
            $baseline->save(
                $product,
                $name,
                $target['version'],
                $profile,
                $algorithm,
                $list,
                // ★ 缓存签名 = 规则版本 + 归一化白名单版本，必须与检测端算法一致，
                //   否则本地自比会永远「未命中」→ 每次都重新下载
                $checker->cacheSignature((string) $rules['version'])
            );
        } catch (Throwable $e) {
            $output->writeln('<error>' . $e->getMessage() . '</error>');
            return 2;
        }

        foreach ($checker->takeWarnings() as $warning) {
            $output->writeln('<comment>[警告] ' . $warning . '</comment>');
        }

        $output->writeln('<info>出包完成</info>');
        $output->writeln('目标：' . $target['key'] . '（' . $target['name'] . '）');
        $output->writeln('产品：' . $product . '    版本：' . $target['version']);
        $output->writeln('规则：' . $profile . '    算法：' . $algorithm);
        $output->writeln('排除规则版本：' . (string) $rules['version']);
        $output->writeln('文件数：' . count($list));
        $output->writeln('清单文件：' . $baseline->relativePath($product, $name, $target['version'], $profile, $algorithm));
        $output->writeln('校验和：' . $baseline->relativePath($product, $name, $target['version'], $profile, $algorithm) . '.sha256');

        return 0;
    }

    /**
     * 解析 --normalize / --no-normalize（与 integrity:check 保持完全一致的语义）
     */
    private function resolveNormalize(Input $input): ?array
    {
        if ($input->getOption('no-normalize')) {
            return ['is_bom' => false, 'is_crlf_lf' => false];
        }

        $raw = $input->getOption('normalize');
        if ($raw === null || trim((string) $raw) === '') {
            return null;
        }

        $raw = strtolower(trim((string) $raw));
        if ($raw === 'none') {
            return ['is_bom' => false, 'is_crlf_lf' => false];
        }
        if ($raw === 'all') {
            return ['is_bom' => true, 'is_crlf_lf' => true];
        }

        $flags = array_values(array_filter(array_map('trim', explode(',', $raw)), static fn ($v) => $v !== ''));

        return [
            'is_bom'     => in_array('is_bom', $flags, true),
            'is_crlf_lf' => in_array('is_crlf_lf', $flags, true),
        ];
    }
}
