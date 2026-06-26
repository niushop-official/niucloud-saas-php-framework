/**

 * addon Windi 工具类：扫描源码生成 CSS，并做 uni H5 的 rpx→rem 转换。

 */

const fs = require('fs')

const path = require('path')

const postcss = require('postcss')

const { createUtils } = require('@windicss/plugin-utils')

const { defaultRpx2Unit } = require('@dcloudio/uni-shared')

const uniPostcss = require('@dcloudio/uni-cli-shared/dist/postcss/plugins/uniapp.js').default

const { ROOT } = require('./addon-utils.cjs')



const MARKER = '/* __addonWindiCss */'



async function convertUniCss(css) {

    const { unit, unitRatio, unitPrecision } = defaultRpx2Unit

    const result = await postcss([

        uniPostcss({ unit, unitRatio, unitPrecision })

    ]).process(css, { from: undefined })

    return result.css

}



/**

 * text-[28rpx] 等字号类 Windi 会附带 line-height:1。

 * 分构建多 chunk 分别注入样式时，后加载 chunk 可能只有 text-* 没有 leading-*，

 * 导致 line-height 被覆盖。字号类只保留 font-size，行高交给 leading-* 控制。

 */

function stripTextSizeLineHeight(css) {

    return css.replace(

        /(\.(?:\\!)?text-\\\[[0-9.]+rpx\\\]\s*\{)([^}]*)(\})/g,

        (_, open, body, close) => {

            const next = body.replace(/\s*line-height:\s*[^;]+;?/g, '')

            return open + next + close

        }

    )

}



async function generateAddonWindiCss(addonKey) {

    const addonSrc = path.join(ROOT, 'src', 'addon', addonKey)

    if (!fs.existsSync(addonSrc)) {

        return { ok: false, reason: 'missing addon src' }

    }



    const utils = createUtils({

        root: ROOT,

        scan: {

            dirs: [
                path.join('src', 'addon', addonKey)
            ],

            fileExtensions: ['vue', 'js', 'ts']

        }

    })



    await utils.scan()

    const raw = await utils.generateCSS()

    if (!raw?.trim()) {

        return { ok: false, reason: 'empty windi css' }

    }



    const css = stripTextSizeLineHeight(await convertUniCss(raw))

    return { ok: true, css: `${MARKER}\n${css}\n` }

}



function escapeRegExp(s) {

    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

}



function stripWindiBlock(styleCss) {

    if (!styleCss.includes(MARKER)) return styleCss.trimEnd()

    return styleCss.replace(new RegExp(`\\n?${escapeRegExp(MARKER)}[\\s\\S]*$`), '').trimEnd()

}



async function appendAddonWindiCss(addonDir, addonKey) {

    const stylePath = path.join(addonDir, 'style.css')

    const result = await generateAddonWindiCss(addonKey)

    if (!result.ok) return result



    const existing = fs.existsSync(stylePath)

        ? stripWindiBlock(fs.readFileSync(stylePath, 'utf-8'))

        : ''



    fs.writeFileSync(stylePath, `${existing}\n${result.css}`, 'utf-8')

    return { ok: true, bytes: result.css.length }

}



function readWindiBlock(addonDir) {

    const stylePath = path.join(addonDir, 'style.css')

    if (!fs.existsSync(stylePath)) return ''

    const css = fs.readFileSync(stylePath, 'utf-8')

    const idx = css.indexOf(MARKER)

    if (idx < 0) return ''

    return css.slice(idx + MARKER.length).trim()

}



/** CSS 选择器 .h-\[74rpx\] → class 名 h-[74rpx] */

function selectorToClass(selector) {

    let s = selector.trim()

    if (s.startsWith('.')) s = s.slice(1)

    s = s.split(/[,\s>+~]/)[0]

    return s.replace(/\\([\\[\]:#.()'"!])/g, '$1')

}



/** 解析 Windi CSS 为 class → 完整规则 */

function parseWindiRuleMap(windiCss) {

    const map = new Map()

    if (!windiCss) return map



    const re = /([^{@]+)\{([^}]*)\}/g

    let m

    while ((m = re.exec(windiCss))) {

        const selectorPart = m[1].trim()

        if (!selectorPart.startsWith('.')) continue

        for (const sel of selectorPart.split(',')) {

            const cls = selectorToClass(sel)

            if (!cls || cls.includes(' ')) continue

            map.set(cls, `${sel.trim()}{${m[2]}}`)

        }

    }

    return map

}



module.exports = {

    appendAddonWindiCss,

    generateAddonWindiCss,

    readWindiBlock,

    parseWindiRuleMap,

    convertUniCss,

    stripTextSizeLineHeight,

    MARKER

}



if (require.main === module) {

    const addonDir = process.argv[2]

    const addonKey = process.argv[3] || path.basename(addonDir)

    if (!addonDir) {

        console.error('Usage: node generate-addon-windi-css.cjs <addon-dir> [addon-key]')

        process.exit(1)

    }

    appendAddonWindiCss(path.resolve(addonDir), addonKey).then((r) => {

        console.log('[generate-addon-windi-css]', r)

        process.exit(r.ok ? 0 : 1)

    })

}


