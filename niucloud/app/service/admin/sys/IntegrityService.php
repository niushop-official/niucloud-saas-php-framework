<?php
declare(strict_types=1);

namespace app\service\admin\sys;

use core\base\BaseAdminService;
use core\exception\CommonException;
use core\integrity\BaselineManager;
use core\integrity\CloudPackageMissingException;
use core\integrity\CodeIntegrityChecker;
use core\integrity\FileRestorer;
use core\integrity\FileScanner;
use Throwable;

/**
 * 代码完整性检测服务层
 *
 * @package app\service\admin\sys
 */
class IntegrityService extends BaseAdminService
{
    /**
     * 进度粒度的分界：文件总数超过这个值时按「每 10 个文件一行」推，否则逐个文件推
     *
     * 同一条固定规则在大目标和小目标上的观感完全不同：
     *   - 62 个文件的插件：逐个推也只有 62 行，正好看得清；
     *   - 6404 个文件的框架：逐个推就是 6404 行，既没必要也刷屏。
     * 另外这里只管「推多密」，不再顺手决定「每次算多少」——
     * 旧实现里两者是同一个常量，结果是小目标也只能 200 个一跳，进度条半天不动一下。
     */
    private const PROGRESS_FILE_THRESHOLD = 100;

    /** 文件数超过分界值时，每这么多文件推一行进度 */
    private const PROGRESS_STEP_LARGE = 10;

    /** 文件数不超过分界值时，逐个文件推一行进度 */
    private const PROGRESS_STEP_SMALL = 1;

    /**
     * 进度帧数上限
     *
     * 极端站点（文件数上万）按「每 10 个一行」会推出上万帧，对连接和浏览器都是无谓负担。
     * 超过这个上限就把步长抬到 ceil(总数/上限)，保证帧数始终有界。
     * 以本站点为准（框架目标约 6400 个文件）永远碰不到这条兜底。
     */
    private const PROGRESS_MAX_FRAMES = 2000;

    /**
     * 差异明细的攒批大小
     *
     * 明细帧与进度帧的密度是两回事，不能跟着一起变细：
     * 几千个差异会因此产生几百个碎片帧，而前端每收一帧就要往长列表里追一次并重渲染。
     * 攒够这么多行再推一帧，帧数与重渲染次数都降一个数量级。
     */
    private const DETAIL_FLUSH_SIZE = 200;

    /**
     * 目标列表（含各自版本与清单状态）
     *
     * @param string|null $algorithm 算法（对外名），不传取配置默认
     * @param bool|null   $isBom     是否忽略 BOM，不传取配置
     * @param bool|null   $isCrlfLf  是否忽略行尾，不传取配置
     */
    public function getTargets(?string $algorithm = null, ?bool $isBom = null, ?bool $isCrlfLf = null): array
    {
        $checker = $this->makeChecker($algorithm, $isBom, $isCrlfLf);
        $list    = [];

        foreach ($checker->getTargets() as $item) {
            $row = [
                'key'             => $item['key'],
                'name'            => $item['name'],
                'base'            => $item['base'],
                'paths'           => $item['paths'],
                'type'            => $item['type'] ?? '',
                'version'         => $item['version'],
                'profile'         => $checker->getProfile(),
                'algorithm'       => $checker->getAlgorithm(),
                'rules_version'   => '',
                'baseline_file'   => '',
                'baseline_status' => '',
                'baseline_root'   => '',
            ];

            try {
                $status = $checker->baselineStatus($item);

                $row['rules_version']   = $status['rules_version'];
                $row['baseline_file']   = $status['file'];
                $row['baseline_status'] = $status['status'];
                $row['baseline_root']   = $status['baseline_root'];
            } catch (Throwable $e) {
                // 插件版本读不到等情况：如实标记，不让整个列表打不开
                $row['baseline_status'] = 'version_unknown';
            }

            $list[] = $row;
        }

        return $list;
    }

    /**
     * 可选算法
     */
    public function getAlgorithms(): array
    {
        return [
            ['value' => 'crc32',  'name' => 'CRC32（最快，日常首选）'],
            ['value' => 'md5',    'name' => 'MD5（兼容用）'],
            ['value' => 'sha256', 'name' => 'SHA-256（安全审计推荐）'],
            ['value' => 'sha512', 'name' => 'SHA-512（最高强度）'],
        ];
    }

    /**
     * 页面配置（前端初始化用）
     */
    public function getConfig(): array
    {
        $normalize = (array) config('integrity.normalize');
        $isBom     = (bool) ($normalize['is_bom'] ?? true);
        $isCrlfLf  = (bool) ($normalize['is_crlf_lf'] ?? true);

        return [
            'default_algorithm' => (string) config('integrity.default_algorithm'),
            'algorithms'        => array_values((array) config('integrity.algorithms')),
            'chunk_size'        => (int) config('integrity.chunk_size', 500),
            'product'           => (string) config('niucloud.product'),
            'version'           => (string) config('version.version'),
            'version_code'      => (string) config('version.code'),
            'baseline_root'     => str_replace('\\', '/', (string) config('integrity.baseline_dir')),
            'is_bom'            => $isBom,
            'is_crlf_lf'        => $isCrlfLf,
            'profile'           => FileScanner::normalizeProfile(['is_bom' => $isBom, 'is_crlf_lf' => $isCrlfLf]),
            'profiles'          => BaselineManager::PROFILES,
        ];
    }

    /**
     * 单个目标的清单状态
     *
     * @throws CommonException
     */
    public function getBaselineStatus(string $target, ?string $algorithm = null, ?bool $isBom = null, ?bool $isCrlfLf = null): array
    {
        $checker = $this->makeChecker($algorithm, $isBom, $isCrlfLf);

        return $checker->baselineStatus($checker->resolveTarget($target));
    }

    /**
     * 分片检测
     *
     * @param string      $target       应用或插件名
     * @param string|null $path         自定义目录（优先于 target）
     * @param string|null $algorithm    算法（对外名）
     * @param bool|null   $isBom        是否忽略 BOM
     * @param bool|null   $isCrlfLf     是否忽略行尾
     * @param int         $cursor       游标（从第几个文件开始）
     * @param bool        $allowDownload 是否允许云端下载
     * @return array 正常时是分片结果；云端没有该目标的包体时 skipped=true、明细为空、
     *               原因在 skip_reason（前端据此显示「已跳过」而不是「无差异」）
     * @throws CommonException
     */
    public function check(
        string $target,
        ?string $path,
        ?string $algorithm,
        ?bool $isBom,
        ?bool $isCrlfLf,
        int $cursor = 0,
        bool $allowDownload = true
    ): array {
        $checker = $this->makeChecker($algorithm, $isBom, $isCrlfLf);

        $chunkSize = (int) config('integrity.chunk_size', 500);

        try {
            $context = $checker->prepare($target, $path, $allowDownload);
        } catch (CloudPackageMissingException $e) {
            // 云端没有该目标的包体（该版本未发布 / 发布到了别的产品库 / 解压结构不符）。
            // 这不是一次失败：该目标本来就检测不了，如实说明原因即可，
            // 别把一个绝对路径当异常甩到界面上，也别让整页看起来像出故障了。
            return $this->skippedResult($checker, $target, $path, $e);
        }

        $chunk = $checker->scanChunk($context, $cursor, $chunkSize);

        return [
            'target'          => $context['target']['key'],
            'target_name'     => $context['target']['name'],
            'base'            => $context['base'],
            'paths'           => $context['target']['paths'],
            'product'         => $context['product'],
            'version'         => $context['target']['version'],
            'profile'         => $context['profile'],
            'algorithm'       => $context['algorithm'],
            'rules_version'   => $context['rules_version'],
            'baseline_file'   => $checker->baselineRelativePath($context['target']),
            'baseline_source' => $context['source'],
            'warnings'        => $checker->takeWarnings(),
            'changed'         => $chunk['changed'],
            'deleted'         => $chunk['deleted'],
            // 明细：文件名 + 状态 + 大小 + 两侧哈希（文件差异弹框要用）
            'details'         => $chunk['details'],
            'scanned'         => $chunk['scanned'],
            'total'           => $chunk['total'],
            'cursor'          => $chunk['cursor'],
            'next_cursor'     => $chunk['next_cursor'],
            'done'            => $chunk['done'],
        ];
    }

    /**
     * 流式检测（SSE 用）
     *
     * 与 check() 做的是同一件事，区别只在「谁来驱动分片」：
     * check() 由前端一片一片地请求，这里由服务端自己循环、每跑完一批就推一次进度，
     * 前端因此能一边看进度一边看执行记录，不用等整轮结束才有反馈。
     *
     * 服务层不碰任何 SSE 细节（响应头、缓冲、是否断开都在控制器里），
     * 只通过 $emit 回调往外送结构化事件；$emit 返回 false 表示客户端已经走了，
     * 这时立刻收工 —— 别把一个没人要的检测跑完。
     *
     * 事件一览（文案由前端翻译，这里只发结构，中英文界面都能正确显示）：
     *   meta    {target, target_name, version, product, algorithm, rules_version, total}
     *   log     {stage, ...}     stage: baseline | ready | scanning | finish
     *   warning {text}           服务端产生的告警（规则降级、两端规则版本不一致等）
     *   detail  {rows}           差异明细，攒够 DETAIL_FLUSH_SIZE 行推一条（与进度粒度解耦）
     *   done    {skipped, skip_reason, scanned, total, summary, diff}
     *
     * 进度粒度不是固定值：按目标文件总数自适应（见 progressStep()），
     * 文件多的目标每 10 个一行、文件少的目标逐个一行。
     *
     * @param callable $emit 推帧回调：function (string $event, array $data): bool
     */
    public function stream(
        string $target,
        ?string $path,
        ?string $algorithm,
        ?bool $isBom,
        ?bool $isCrlfLf,
        callable $emit
    ): void {
        $checker = $this->makeChecker($algorithm, $isBom, $isCrlfLf);

        // 告警是「取出即清空」的，所以每到一个节点就收一次，同时留一份给 done
        $warnings = [];
        $collect  = function () use ($checker, &$warnings, $emit): bool {
            $alive = true;

            foreach ($checker->takeWarnings() as $warning) {
                $warnings[] = $warning;

                if ($emit('warning', ['text' => $warning]) === false) {
                    $alive = false;
                }
            }

            return $alive;
        };

        // 准备阶段（解析目标 → 读规则 → 取清单）可能要联网，先给一行记录，别让界面干等
        $emit('log', ['stage' => 'baseline']);

        try {
            $context = $checker->prepare($target, $path, true);
        } catch (CloudPackageMissingException $e) {
            // 与分片接口同一套语义：云端没有这份包体不算「失败」，说明原因后正常收尾
            $emit('warning', ['text' => $e->getMessage()]);
            $emit('done', [
                'skipped'     => true,
                'skip_reason' => $e->getMessage(),
                'scanned'     => 0,
                'total'       => 0,
                'summary'     => ['new' => 0, 'modified' => 0, 'deleted' => 0],
                'diff'        => 0,
                'warnings'    => array_merge($warnings, [$e->getMessage()]),
            ]);

            return;
        }

        $total = count($context['files']);

        $alive = $emit('meta', [
            'target'        => (string) $context['target']['key'],
            'target_name'   => (string) $context['target']['name'],
            'version'       => (string) $context['target']['version'],
            'product'       => (string) $context['product'],
            'algorithm'     => (string) $context['algorithm'],
            'rules_version' => (string) $context['rules_version'],
            'total'         => $total,
        ]);

        if ($emit('log', ['stage' => 'ready', 'total' => $total]) === false) {
            $alive = false;
        }

        $collect();

        if ($alive === false) {
            return;
        }

        // 「一次算多少」与「推多密」是同一个步长：按总数自适应（见 progressStep）。
        // 小批量反复调用不会退化成 O(n²) —— hashChunk 内部只对切片做哈希，不重扫目录，
        // 换来的是进度条一步一步往前走，而不是几秒钟跳一格。
        $step = $this->progressStep($total);

        $scanned = 0;
        $cursor  = 0;
        $summary = ['new' => 0, 'modified' => 0, 'deleted' => 0];
        // 明细攒批用：攒够一批推一帧，不跟着进度粒度一起变碎
        $pending = [];

        while (true) {
            $chunk = $checker->scanChunk($context, $cursor, $step);

            $scanned += (int) $chunk['scanned'];

            foreach ($chunk['details'] as $detail) {
                $status = (string) ($detail['status'] ?? '');
                if (isset($summary[$status])) {
                    $summary[$status]++;
                }

                $pending[] = $detail;
            }

            // ★ 每一帧的返回值都要收下：客户端关掉弹框后，服务端就靠它立刻停手。
            //   漏掉任何一帧，都会白扫一批（$step 个文件的哈希）才发现没人要。
            $alive = true;

            if (count($pending) >= self::DETAIL_FLUSH_SIZE) {
                $alive   = $emit('detail', ['rows' => $pending]);
                $pending = [];
            }

            if ($alive !== false) {
                $alive = $emit('log', [
                    'stage'   => 'scanning',
                    'scanned' => $scanned,
                    'total'   => (int) $chunk['total'],
                    'percent' => $chunk['total'] > 0 ? min(100, (int) floor($scanned / $chunk['total'] * 100)) : 100,
                ]);
            }

            if ($alive === false || $collect() === false) {
                return;
            }

            if ($chunk['done']) {
                break;
            }

            $cursor = (int) $chunk['next_cursor'];
        }

        // 零头也要推：否则最后不足一批的差异前端永远拿不到
        if ($pending !== [] && $emit('detail', ['rows' => $pending]) === false) {
            return;
        }

        $diff = $summary['new'] + $summary['modified'] + $summary['deleted'];

        // 收尾只发 done 一帧：done 里已经带了 diff，前端据此记「比对完成…」那一行。
        // 这里再补一帧 log(stage=finish) 会让界面出现两条一模一样的收尾记录。

        $emit('done', [
            'skipped'  => false,
            'scanned'  => $scanned,
            'total'    => (int) $chunk['total'],
            'summary'  => $summary,
            'diff'     => $diff,
            'warnings' => $warnings,
        ]);
    }

    /**
     * 单个文件的文本比对（官方 vs 本地）
     *
     * 只读，任何一侧读不到都不影响另一侧的展示。
     *
     * @return array
     * @throws CommonException
     */
    public function getFileDiff(
        string $target,
        string $file,
        ?string $algorithm = null,
        ?bool $isBom = null,
        ?bool $isCrlfLf = null
    ): array {
        $checker = $this->makeChecker($algorithm, $isBom, $isCrlfLf);
        $context = $checker->resolveBaselineContext($target);

        $result = (new FileRestorer())->compare(
            $context['name'],
            $context['version'],
            $context['base'],
            $file
        );

        // ★ 官方版到底有没有这个文件，以清单为准：
        //   不在清单里 = 本地新增的文件，官方没有对应内容，比对与写回都无从谈起。
        $result['in_baseline'] = array_key_exists($result['file'], $context['baseline']);
        $result['target']      = $context['target']['key'];
        $result['target_name'] = $context['target']['name'];

        return $result;
    }

    /**
     * 用官方内容写回本地文件（覆盖前逐文件备份）
     *
     * 这是本功能里唯一会改动业务文件的操作，所以规矩定得比较死：
     *   1) 只允许写回**清单里存在**的键（官方版确实有该文件）——挡住本地新增文件与越界路径；
     *   2) 单次数量有上限（config('integrity.diff.restore_max_files')），防止误勾选造成大批量覆盖；
     *   3) 每个文件覆盖前先备份到 backup_dir，失败逐个记录、不中断整批。
     *
     * @param array $files 相对检测基准的文件键列表
     * @return array{target: string, target_name: string, total: int, restored: array, skipped: array, failed: array, backup_dir: string, warnings: array}
     * @throws CommonException
     */
    public function restoreFiles(
        string $target,
        array $files,
        ?string $algorithm = null,
        ?bool $isBom = null,
        ?bool $isCrlfLf = null
    ): array {
        $checker = $this->makeChecker($algorithm, $isBom, $isCrlfLf);
        $context = $checker->resolveBaselineContext($target);

        if (($context['target']['type'] ?? '') === 'custom') {
            throw new CommonException('自定义目录没有对应的官方包，无法写回');
        }

        // 先做键校验与去重（校验不通过的直接抛错，不进入写回流程）
        $keys = [];
        foreach ($files as $file) {
            $key        = FileRestorer::assertRelativeKey((string) $file);
            $keys[$key] = true;
        }
        $keys = array_keys($keys);

        if ($keys === []) {
            throw new CommonException('未选择要写回的文件');
        }

        $max = (int) config('integrity.diff.restore_max_files', 200);
        if ($max > 0 && count($keys) > $max) {
            throw new CommonException('单次最多写回 ' . $max . ' 个文件，本次选中 ' . count($keys) . ' 个，请分批处理');
        }

        $restorer = new FileRestorer();
        $targetKey = (string) $context['target']['key'];
        $stamp    = date('YmdHis');

        $restored = [];
        $skipped  = [];
        $failed   = [];

        foreach ($keys as $key) {
            // ★ 白名单：清单是「官方版有哪些文件」的唯一判据
            if (!array_key_exists($key, $context['baseline'])) {
                $skipped[] = [
                    'file'    => $key,
                    'message' => '不在官方清单内（本地新增的文件），没有可写回的官方内容',
                ];
                continue;
            }

            try {
                $item       = $restorer->restore(
                    $targetKey,
                    (string) $context['name'],
                    (string) $context['version'],
                    (string) $context['base'],
                    $key,
                    $stamp
                );
                $restored[] = [
                    'file'   => $key,
                    'size'   => $item['size'],
                    'backup' => $item['backup'],
                ];
            } catch (Throwable $e) {
                $failed[] = ['file' => $key, 'message' => $e->getMessage()];
            }
        }

        return [
            'target'      => $targetKey,
            'target_name' => $context['target']['name'],
            'total'       => count($keys),
            'restored'    => $restored,
            'skipped'     => $skipped,
            'failed'      => $failed,
            'backup_dir'  => $restorer->backupDir($stamp, $targetKey),
            'warnings'    => $checker->takeWarnings(),
        ];
    }

    /**
     * 「云端没有该目标的包体」时的返回体
     *
     * 结构与正常分片结果保持一致（前端不用为它写一套分支），只是明细为空、
     * done 直接为 true，并用 skipped / skip_reason 说明「这个目标被跳过了」。
     * 原因文本由 CloudBaselineClient 统一生成（见 packageMissingMessage），
     * 这里只负责搬运，避免同一句话在两端各写一遍。
     */
    private function skippedResult(
        CodeIntegrityChecker $checker,
        string $target,
        ?string $path,
        CloudPackageMissingException $e
    ): array {
        try {
            $resolved = $checker->resolveTarget($target, $path);
        } catch (Throwable $ignore) {
            // 目标本身也解析不了（例如插件版本号读不到）：退回最小信息，保证响应结构完整
            $resolved = [
                'key'     => $target,
                'name'    => $target,
                'base'    => '',
                'paths'   => [],
                'version' => '',
            ];
        }

        return [
            'target'          => (string) $resolved['key'],
            'target_name'     => (string) $resolved['name'],
            'base'            => (string) ($resolved['base'] ?? ''),
            'paths'           => (array) ($resolved['paths'] ?? []),
            'product'         => (string) config('niucloud.product'),
            'version'         => (string) ($resolved['version'] ?? ''),
            'profile'         => $checker->getProfile(),
            'algorithm'       => $checker->getAlgorithm(),
            'rules_version'   => $checker->getRulesVersion(),
            // 没有清单可谈：留空并标明来源，避免前端把它当成一份可用清单
            'baseline_file'   => '',
            'baseline_source' => 'unavailable',
            'warnings'        => $checker->takeWarnings(),
            'skipped'         => true,
            'skip_reason'     => $e->getMessage(),
            'changed'         => [],
            'deleted'         => [],
            'details'         => [],
            'scanned'         => 0,
            'total'           => 0,
            'cursor'          => 0,
            'next_cursor'     => 0,
            'done'            => true,
        ];
    }

    /**
     * 构造检查器：优先用传入参数，缺省回落配置
     *
     * @throws CommonException
     */
    private function makeChecker(?string $algorithm, ?bool $isBom, ?bool $isCrlfLf): CodeIntegrityChecker
    {
        return new CodeIntegrityChecker($algorithm ?: null, $this->normalizeParams($isBom, $isCrlfLf));
    }

    /**
     * 把前端的两个开关转成归一化配置；两个都没传时返回 null（交给检查器用配置默认值）
     */
    private function normalizeParams(?bool $isBom, ?bool $isCrlfLf): ?array
    {
        if ($isBom === null && $isCrlfLf === null) {
            return null;
        }

        $base = (array) config('integrity.normalize');

        return [
            'is_bom'     => $isBom ?? (bool) ($base['is_bom'] ?? true),
            'is_crlf_lf' => $isCrlfLf ?? (bool) ($base['is_crlf_lf'] ?? true),
        ];
    }

    /**
     * 按目标文件总数决定「几个文件推一行进度」
     *
     * 规则：总数大于 100 用 10，不超过 100 用 1。
     * 边界说明：总数正好 100 时取「逐个」—— 需求只描述了大于 / 小于两种情况，
     * 这里取偏细的一侧（100 行进度不算多，但看得更清楚）。
     * 末尾按帧数上限兜底，保证任何规模下帧数都有界。
     */
    private function progressStep(int $total): int
    {
        $step = $total > self::PROGRESS_FILE_THRESHOLD ? self::PROGRESS_STEP_LARGE : self::PROGRESS_STEP_SMALL;

        if ($total > self::PROGRESS_MAX_FRAMES * $step) {
            $step = (int) ceil($total / self::PROGRESS_MAX_FRAMES);
        }

        return max(1, $step);
    }
}
