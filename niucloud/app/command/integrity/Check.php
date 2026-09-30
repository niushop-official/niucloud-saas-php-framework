<?php
declare(strict_types=1);

namespace app\command\integrity;

use core\exception\CommonException;
use core\integrity\BaselineManager;
use core\integrity\CodeIntegrityChecker;
use think\console\Command;
use think\console\Input;
use think\console\input\Option;
use think\console\Output;
use think\console\Table;
use Throwable;

/**
 * 代码完整性检测命令
 *
 * 用法：
 *   php think integrity:check                          # 交互式选择目标
 *   php think integrity:check -t framework             # 检测系统框架
 *   php think integrity:check -t addon:shop            # 检测商城插件
 *   php think integrity:check -p app/service           # 检测指定目录
 *   php think integrity:check -t framework -a sha256   # 指定算法
 *   php think integrity:check -t framework --no-normalize
 *   php think integrity:check -t framework --normalize=is_bom
 *   php think integrity:check --status                 # 只看清单状态
 *   php think integrity:check -t framework --json      # 输出 JSON
 *
 * 退出码：0=完全一致 / 1=存在差异 / 2=执行失败
 */
class Check extends Command
{
    protected function configure()
    {
        $this->setName('integrity:check')
            ->setDescription('代码完整性检测：与云端清单比对，输出新增/修改/删除清单')
            ->addOption('target', 't', Option::VALUE_REQUIRED, '应用或插件名，如 framework、addon:shop')
            ->addOption('path', 'p', Option::VALUE_REQUIRED, '自定义检测目录（相对站点根）')
            ->addOption('algorithm', 'a', Option::VALUE_REQUIRED, '校验算法：crc32|md5|sha256|sha512')
            ->addOption('normalize', null, Option::VALUE_REQUIRED, '归一化开关，逗号列表：is_bom,is_crlf_lf；也接受 none / all')
            ->addOption('no-normalize', null, Option::VALUE_NONE, '快捷写法，等价于 --normalize=none')
            ->addOption('status', null, Option::VALUE_NONE, '只查看清单状态，不执行检测')
            ->addOption('no-download', null, Option::VALUE_NONE, '禁用云端下载，未命中即失败')
            ->addOption('json', null, Option::VALUE_NONE, '以 JSON 输出结果')
            ->addOption('limit', null, Option::VALUE_REQUIRED, '文本模式最多展示的差异条数');
    }

    protected function execute(Input $input, Output $output)
    {
        $target        = $input->getOption('target');
        $path          = $input->getOption('path');
        $algorithm     = $input->getOption('algorithm');
        $statusOnly    = (bool) $input->getOption('status');
        $allowDownload = !$input->getOption('no-download');
        $asJson        = (bool) $input->getOption('json');
        $limit         = (int) ($input->getOption('limit') ?: 0);

        // ---------- 解析归一化开关 ----------
        try {
            $normalize = $this->resolveNormalize($input);
        } catch (Throwable $e) {
            return $this->fail($output, $e->getMessage(), $asJson);
        }

        // ---------- 构造检查器 ----------
        try {
            $checker = new CodeIntegrityChecker($algorithm ?: null, $normalize);
        } catch (Throwable $e) {
            return $this->fail($output, $e->getMessage(), $asJson);
        }

        // ---------- 只查看清单状态 ----------
        if ($statusOnly) {
            return $this->showStatus($output, $checker, $target);
        }

        // ---------- 交互式选择目标 ----------
        if (!$target && !$path) {
            if (!$input->isInteractive()) {
                return $this->fail($output, '非交互模式下必须指定 --target 或 --path', $asJson);
            }

            try {
                $target = $this->chooseTarget($input, $output, $checker);
                if ($target === null) {
                    $output->writeln('<comment>已取消</comment>');
                    return 0;
                }

                if (!$algorithm) {
                    $answer = (string) $output->ask($input, '校验算法 (crc32/md5/sha256/sha512)', 'crc32');
                    $checker->setAlgorithm(trim($answer));
                }

                if (!$output->confirm($input, '即将检测 ' . $target . '，是否继续？', true)) {
                    $output->writeln('<comment>已取消</comment>');
                    return 0;
                }
            } catch (Throwable $e) {
                return $this->fail($output, $e->getMessage(), $asJson);
            }
        }

        // ---------- 执行检测 ----------
        try {
            $result = $checker->check($target, $path, $allowDownload);
        } catch (Throwable $e) {
            return $this->fail($output, $e->getMessage(), $asJson);
        }

        if ($asJson) {
            $output->writeln((string) json_encode(
                ['code' => 1, 'msg' => '', 'data' => $result],
                JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
            ));
        } else {
            $this->render($output, $result, $limit);
        }

        $diffTotal = $result['summary']['new'] + $result['summary']['modified'] + $result['summary']['deleted'];

        return $diffTotal > 0 ? 1 : 0;
    }

    /**
     * 解析 --normalize / --no-normalize
     *
     * 优先级：--no-normalize > --normalize > 配置文件
     *
     * @return array|null null 表示交给检查器使用配置默认值
     * @throws CommonException
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
        $allow = ['is_bom', 'is_crlf_lf'];

        foreach ($flags as $flag) {
            if (!in_array($flag, $allow, true)) {
                throw new CommonException(
                    '--normalize 取值非法: ' . $flag . '（可选 ' . implode(' / ', $allow) . '，或 none / all）'
                );
            }
        }

        return [
            'is_bom'     => in_array('is_bom', $flags, true),
            'is_crlf_lf' => in_array('is_crlf_lf', $flags, true),
        ];
    }

    /**
     * 交互式选择目标：先打印表格，再让用户输入序号
     *
     * @throws CommonException
     */
    private function chooseTarget(Input $input, Output $output, CodeIntegrityChecker $checker): ?string
    {
        $targets = $checker->getTargets();

        if ($targets === []) {
            throw new CommonException('当前没有任何可检测目标');
        }

        $rows = [];
        foreach ($targets as $index => $item) {
            $rows[] = [
                $index + 1,
                $item['key'],
                $item['name'],
                (string) ($item['version'] ?? '未知'),
                implode(', ', $item['paths']),
            ];
        }

        $table = new Table();
        $table->setHeader(['序号', '应用名', '名称', '版本', '目录']);
        $table->setRows($rows);
        $this->table($table);

        $answer = (string) $output->ask($input, '请选择检测目标（输入序号）', '1');

        if (trim($answer) === '') {
            return null;
        }

        $index = (int) trim($answer) - 1;
        if (!isset($targets[$index])) {
            throw new CommonException('无效的序号：' . $answer);
        }

        return $targets[$index]['key'];
    }

    /**
     * 打印清单状态
     */
    private function showStatus(Output $output, CodeIntegrityChecker $checker, ?string $targetKey): int
    {
        $targets = $checker->getTargets();

        if ($targetKey) {
            $targets = array_values(array_filter(
                $targets,
                static fn (array $item): bool => $item['key'] === $targetKey
            ));

            if ($targets === []) {
                $output->writeln('<error>未找到检测目标: ' . $targetKey . '</error>');
                return 2;
            }
        }

        $rows = [];
        foreach ($targets as $item) {
            try {
                $status = $checker->baselineStatus($item);
                $rows[] = [
                    $item['key'],
                    (string) $item['version'],
                    $status['profile'] . ' / ' . $status['algorithm'],
                    $status['file'],
                    ((string) $status['rules_version']) !== '' ? (string) $status['rules_version'] : '-',
                    $this->statusText($status['status']),
                ];
            } catch (Throwable $e) {
                // 插件版本读不到时，列表里如实显示，不中断整张表
                $rows[] = [$item['key'], '未知', '-', '-', '-', '版本读取失败'];
            }
        }

        $table = new Table();
        $table->setHeader(['应用名', '版本', '规则/算法', '清单文件', '规则版本', '状态']);
        $table->setRows($rows);
        $this->table($table);

        try {
            $output->writeln('<comment>清单根目录：' . $checker->baselineRoot() . '</comment>');
        } catch (Throwable $e) {
            // 根目录拿不到就算了，不影响状态表
        }

        return 0;
    }

    private function statusText(string $status): string
    {
        $map = [
            BaselineManager::STATUS_READY            => '就绪',
            BaselineManager::STATUS_MISSING          => '未下载',
            BaselineManager::STATUS_VERSION_MISMATCH => '版本不匹配',
            BaselineManager::STATUS_CONFIG_MISMATCH  => '规则/算法未下载',
            BaselineManager::STATUS_RULES_MISMATCH   => '排除规则已变化',
            BaselineManager::STATUS_CORRUPTED        => '文件损坏',
        ];

        return $map[$status] ?? $status;
    }

    /**
     * 渲染文本结果
     */
    private function render(Output $output, array $result, int $limit): void
    {
        $sourceText = $result['baseline_source'] === 'cache' ? '本地缓存' : '云端下载';

        $output->writeln('');
        $output->writeln('<info>目标：' . $result['target_name'] . '（' . $result['target'] . '）</info>');
        $output->writeln('目录：' . implode(', ', $result['paths']));
        $output->writeln('产品：' . $result['product'] . '    版本：' . $result['version']);
        $output->writeln('规则：' . $result['profile'] . '    算法：' . $result['algorithm'] . '    清单来源：' . $sourceText);
        $output->writeln('排除规则版本：' . (((string) ($result['rules_version'] ?? '')) !== '' ? $result['rules_version'] : '（未校验）'));
        $output->writeln('清单：' . $result['baseline_file']);

        // 告警必须打出来，尤其是「规则降级到内置兜底」——它会影响结果的可信度
        foreach ((array) ($result['warnings'] ?? []) as $warning) {
            $output->writeln('<comment>[警告] ' . $warning . '</comment>');
        }
        $output->writeln('');
        $output->writeln('扫描文件：' . $result['scanned'] . '    耗时：' . $result['elapsed_ms'] . ' ms');
        $output->writeln('新增：' . $result['summary']['new'] . '    修改：' . $result['summary']['modified'] . '    删除：' . $result['summary']['deleted']);
        $output->writeln('');

        $rows = $this->diffRows($result, $limit);

        if ($rows === []) {
            $output->writeln('<info>该目录与完整版本完全一致</info>');
            return;
        }

        $table = new Table();
        $table->setHeader(['文件', '变更']);
        $table->setRows($rows);
        $this->table($table);

        $total = $result['summary']['new'] + $result['summary']['modified'] + $result['summary']['deleted'];
        if ($limit > 0 && $total > $limit) {
            $output->writeln('<comment>仅展示前 ' . $limit . ' 条，共 ' . $total . ' 条差异；使用 --json 可获取完整清单</comment>');
        }
    }

    private function diffRows(array $result, int $limit): array
    {
        $labelMap = ['new' => '新增', 'modified' => '修改'];
        $rows     = [];

        foreach ($result['changed'] as $file => $status) {
            $rows[] = [$file, $labelMap[$status] ?? $status];
        }

        foreach ($result['deleted'] as $file) {
            $rows[] = [$file, '删除'];
        }

        return $limit > 0 ? array_slice($rows, 0, $limit) : $rows;
    }

    /**
     * 统一的失败输出，返回退出码 2
     */
    private function fail(Output $output, string $message, bool $asJson): int
    {
        if ($asJson) {
            $output->writeln((string) json_encode(
                ['code' => 0, 'msg' => $message, 'data' => []],
                JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
            ));
        } else {
            $output->writeln('<error>' . $message . '</error>');
        }

        return 2;
    }
}
