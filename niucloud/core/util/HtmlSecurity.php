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

namespace core\util;

use DOMDocument;
use DOMElement;
use DOMNode;

/**
 * HTML 安全过滤（XSS 防护）
 *
 * 富文本内容（如补丁 description）会以前端 v-html 方式渲染，
 * 必须在入库前/输出前过滤：仅保留白名单标签与属性，剔除脚本、事件属性与危险协议。
 *
 * Class HtmlSecurity
 * @package core\util
 */
class HtmlSecurity
{
    /** 允许的标签白名单 */
    const ALLOW_TAGS = [
        'p', 'br', 'div', 'span', 'section', 'article',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'b', 'strong', 'i', 'em', 'u', 's', 'del', 'ins', 'sub', 'sup', 'small', 'mark',
        'ul', 'ol', 'li', 'dl', 'dt', 'dd', 'blockquote', 'pre', 'code', 'hr',
        'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'colgroup', 'col',
        'a', 'img', 'figure', 'figcaption', 'abbr'
    ];

    /** 各标签允许的属性；'*' 为所有标签通用 */
    const ALLOW_ATTRS = [
        '*'   => [ 'class', 'style', 'title' ],
        'a'   => [ 'href', 'target', 'rel' ],
        'img' => [ 'src', 'alt', 'width', 'height', 'loading' ],
        'td'  => [ 'colspan', 'rowspan', 'align', 'valign', 'width' ],
        'th'  => [ 'colspan', 'rowspan', 'align', 'valign', 'width' ],
        'col' => [ 'span', 'width' ]
    ];

    /** 允许出现在 href / src 中的协议 */
    const ALLOW_SCHEMES = [ 'http', 'https', 'mailto', 'ftp' ];

    /** 需连同内容一并移除的危险标签 */
    const DROP_TAGS = [
        'script', 'style', 'iframe', 'frame', 'frameset', 'object', 'embed', 'applet',
        'link', 'meta', 'base', 'form', 'input', 'textarea', 'select', 'option', 'button',
        'svg', 'math', 'template', 'noscript', 'audio', 'video', 'source', 'track', 'canvas'
    ];

    /**
     * 过滤富文本，返回安全的 HTML
     * @param string $html
     * @return string
     */
    public static function filter(string $html): string
    {
        $html = trim($html);
        if ($html === '') return '';

        // 无 DOM 扩展时退化为纯文本：宁可丢格式，也不能放过风险内容
        if (!class_exists(DOMDocument::class)) {
            return self::toPlainText($html);
        }

        $use_error = libxml_use_internal_errors(true);

        $dom = new DOMDocument('1.0', 'UTF-8');
        // 前置编码声明，避免中文乱码；NOIMPLIED/NODEFDTD 避免自动补 html/body
        $loaded = $dom->loadHTML('<?xml encoding="UTF-8">' . $html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        if ($loaded === false) {
            libxml_clear_errors();
            libxml_use_internal_errors($use_error);
            return self::toPlainText($html);
        }

        // 顶层节点逐个清洗（先取快照，清洗过程会改动 DOM 结构）
        $top_nodes = [];
        foreach ($dom->childNodes as $node) {
            $top_nodes[] = $node;
        }
        foreach ($top_nodes as $node) {
            self::cleanNode($node);
        }

        $out = '';
        foreach ($dom->childNodes as $node) {
            $out .= $dom->saveHTML($node);
        }

        libxml_clear_errors();
        libxml_use_internal_errors($use_error);

        return trim($out);
    }

    /**
     * 富文本转安全纯文本（无 DOM 扩展或解析失败时的兜底，也用于摘要场景）
     * @param string $html
     * @return string
     */
    public static function toPlainText(string $html): string
    {
        return htmlspecialchars(trim(strip_tags($html)), ENT_QUOTES, 'UTF-8');
    }

    /**
     * 递归清洗节点
     * @param DOMNode $node
     * @return void
     */
    private static function cleanNode(DOMNode $node): void
    {
        // 注释与处理指令（含前置的 xml 编码声明）直接移除
        if (in_array($node->nodeType, [ XML_PI_NODE, XML_COMMENT_NODE ], true)) {
            if ($node->parentNode) $node->parentNode->removeChild($node);
            return;
        }

        if ($node->nodeType !== XML_ELEMENT_NODE) return;

        $tag = strtolower($node->nodeName);

        // 危险标签：连同内容一起丢弃
        if (in_array($tag, self::DROP_TAGS, true)) {
            if ($node->parentNode) $node->parentNode->removeChild($node);
            return;
        }

        // 先清洗子节点（取快照，避免遍历时结构变化）
        $children = [];
        foreach ($node->childNodes as $child) {
            $children[] = $child;
        }
        foreach ($children as $child) {
            self::cleanNode($child);
        }

        // 非白名单标签：保留文本内容，去掉标签本身
        if (!in_array($tag, self::ALLOW_TAGS, true)) {
            self::unwrap($node);
            return;
        }

        self::cleanAttributes($node, $tag);
    }

    /**
     * 去掉标签本身，保留子节点（如 <font>文本</font> → 文本）
     * @param DOMNode $node
     * @return void
     */
    private static function unwrap(DOMNode $node): void
    {
        $parent = $node->parentNode;
        if (!$parent) return;

        while ($node->firstChild) {
            $parent->insertBefore($node->firstChild, $node);
        }
        $parent->removeChild($node);
    }

    /**
     * 清洗属性：仅保留白名单属性，剔除事件属性与危险协议
     * @param DOMNode $node
     * @param string  $tag
     * @return void
     */
    private static function cleanAttributes(DOMNode $node, string $tag): void
    {
        if (!$node->hasAttributes()) return;

        $allow = array_merge(self::ALLOW_ATTRS[ '*' ] ?? [], self::ALLOW_ATTRS[ $tag ] ?? []);

        $names = [];
        foreach ($node->attributes as $attr) {
            $names[] = $attr->nodeName;
        }

        foreach ($names as $name) {
            $lower = strtolower($name);

            // 事件属性（onclick/onerror/onload...）一律移除
            if (strpos($lower, 'on') === 0) {
                $node->removeAttribute($name);
                continue;
            }

            // 非白名单属性移除
            if (!in_array($lower, $allow, true)) {
                $node->removeAttribute($name);
                continue;
            }

            $value = $node->getAttribute($name);

            // 链接与资源地址校验协议，拦截 javascript: / data: / vbscript: 等
            if (in_array($lower, [ 'href', 'src' ], true) && !self::isSafeUrl($value)) {
                $node->removeAttribute($name);
                continue;
            }

            // style 中的 expression / javascript: / url(data:) 等
            if ($lower === 'style' && self::hasRiskyStyle($value)) {
                $node->removeAttribute($name);
            }
        }

        // 新窗口打开时强制 noopener，防止 window.opener 劫持
        if ($tag === 'a' && $node->hasAttribute('target')) {
            $node->setAttribute('rel', 'noopener noreferrer');
        }
    }

    /**
     * 地址是否安全：仅允许白名单协议与相对地址
     * @param string $url
     * @return bool
     */
    private static function isSafeUrl(string $url): bool
    {
        $url = trim($url);
        if ($url === '') return false;

        // 剔除空白与控制字符，拦截 "java\tscript:" 类绕过
        $url = (string) preg_replace('/[\x00-\x20\x7f]/u', '', $url);
        if ($url === '') return false;

        // 协议相对地址（//host/path）按 https 处理
        if (strpos($url, '//') === 0) $url = 'https:' . $url;

        // 站内相对地址 / 锚点
        if (isset($url[ 0 ]) && ( $url[ 0 ] === '/' || $url[ 0 ] === '#' )) return true;

        $scheme = parse_url($url, PHP_URL_SCHEME);
        // 无协议视为相对地址
        if ($scheme === null || $scheme === false || $scheme === '') return true;

        return in_array(strtolower($scheme), self::ALLOW_SCHEMES, true);
    }

    /**
     * style 值是否含可执行内容
     * @param string $style
     * @return bool
     */
    private static function hasRiskyStyle(string $style): bool
    {
        return (bool) preg_match('/(expression|javascript\s*:|vbscript\s*:|url\s*\(\s*[\'"]?\s*(javascript|data))/i', $style);
    }
}
