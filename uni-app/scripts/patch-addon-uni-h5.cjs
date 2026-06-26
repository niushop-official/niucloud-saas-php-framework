/**
 * addon 构建产物中的 uni-h5 副本使用独立路由 / App 运行时，
 * getApp()、getCurrentPages()、navigateTo 等与 Core 不一致。
 * 将关键 API 委托给 Core 已挂载的 globalThis.*。
 */
const fs = require('fs')
const path = require('path')
const { ROOT } = require('./addon-utils.cjs')

const DELEGATE_PREFIX = `function __wapDelegateUniApi(name){
return function(arg){
var u=globalThis.uni;
if(u&&typeof u[name]==="function")return u[name](arg);
return Promise.reject({errMsg:name+":fail page not found"});
};
}
function __wapGetCurrentPages(){
var fn=globalThis.getCurrentPages;
if(typeof fn==="function"){try{return fn()}catch(e){}}
return [];
}
var __wapNavigateTo=__wapDelegateUniApi("navigateTo");
var __wapRedirectTo=__wapDelegateUniApi("redirectTo");
var __wapSwitchTab=__wapDelegateUniApi("switchTab");
var __wapReLaunch=__wapDelegateUniApi("reLaunch");
var __wapNavigateBack=__wapDelegateUniApi("navigateBack");
var __wapSetNavigationBarTitle=__wapDelegateUniApi("setNavigationBarTitle");
var __wapPageScrollTo=__wapDelegateUniApi("pageScrollTo");
var __wapSetLocale=__wapDelegateUniApi("setLocale");
`

const NAV_EXPORT_APIS = [
    ['navigateTo', '__wapNavigateTo'],
    ['redirectTo', '__wapRedirectTo'],
    ['switchTab', '__wapSwitchTab'],
    ['reLaunch', '__wapReLaunch'],
    ['navigateBack', '__wapNavigateBack'],
    ['setNavigationBarTitle', '__wapSetNavigationBarTitle'],
    ['pageScrollTo', '__wapPageScrollTo'],
    ['getCurrentPages$1', '__wapGetCurrentPages']
]

const PATCHED_MARK = '/* __wap-addon-uni-h5-patched */'

const GET_CURRENT_PAGES_DELEGATE = `function getCurrentPages$1() {
  var ext = globalThis.getCurrentPages;
  if (typeof ext === "function") {
    try {
      var extPages = ext();
      if (extPages) return extPages;
    } catch (e) {
    }
  }
  const curPages = [];`

function fixBrokenDelegateOrder(code) {
    if (!code.startsWith('function __wapDelegateUniApi')) return code
    const importStart = code.indexOf('import {')
    if (importStart === -1) return code
    const importEnd = code.indexOf('\n', importStart) + 1
    const delegateBlock = code.slice(0, importStart)
    return code.slice(importStart, importEnd) + delegateBlock + code.slice(importEnd)
}

function insertDelegateAfterImports(code) {
    if (code.includes(PATCHED_MARK)) return code
    let end = 0
    while (true) {
        const slice = code.slice(end)
        if (!slice.startsWith('import ')) break
        const lineEnd = code.indexOf('\n', end)
        if (lineEnd === -1) break
        end = lineEnd + 1
    }
    return code.slice(0, end) + PATCHED_MARK + '\n' + DELEGATE_PREFIX + code.slice(end)
}

function patchGetAppFunction(code) {
    if (code.includes('globalThis.getApp')) return code
    return code.replace(
        /function getApp\$1\(\)\s*\{\s*return appVm;\s*\}/,
        `function getApp$1() {
  var fn = globalThis.getApp;
  if (typeof fn === "function") {
    try {
      var app = fn();
      if (app) return app;
    } catch (e) {
    }
  }
  return appVm;
}`
    )
}

/** 修复已错误注入 var pages 与下方 const pages 冲突 */
function fixDuplicatePagesVar(code) {
    return code.replace(
        /var pages = ext\(\);\s*\n\s*if \(pages\) return pages;/g,
        'var extPages = ext();\n      if (extPages) return extPages;'
    )
}

function patchGetCurrentPagesFunction(code) {
    code = fixDuplicatePagesVar(code)
    // DELEGATE_PREFIX 已含 globalThis.getCurrentPages，不能据此跳过 getCurrentPages$1 本体补丁
    if (code.includes('var extPages = ext()')) return code
    return code.replace(
        /function getCurrentPages\$1\(\)\s*\{\s*const curPages = \[\];/,
        GET_CURRENT_PAGES_DELEGATE
    )
}

function coreRouterResolve(getAppFn) {
    return `(function(){var g=globalThis;if(typeof g.getApp==="function"){try{var ga=g.getApp();if(ga&&ga.$router)return ga.$router}catch(e){}}var a=${getAppFn}();return a&&a.$router})()`
}

/** uni-h5 代码拆分到 resize-sensor 等 chunk 时，须统一走 Core 的 getApp().$router */
function patchCoreRouterAccess(code) {
    if (!code.includes('$router')) return code

    let next = code
    next = next.replace(
        /const router\s*=\s*(getApp(?:\$\d+)?)\(\)\.\$router;/g,
        (_, fn) => `const router = ${coreRouterResolve(fn)};`
    )
    next = next.replace(
        /(getApp(?:\$\d+)?)\(\)\.\$router\.go\(/g,
        (_, fn) => `${coreRouterResolve(fn)}.go(`
    )
    next = next.replace(
        /\(function\(\)\{var a=(getApp(?:\$\d+)?)\(\);return a&&a\.\$router\}\)\(\)/g,
        (_, fn) => coreRouterResolve(fn)
    )
    return next
}

function patchUnsafeGetAppAccess(code) {
    return code
        .replace(/const appVm2 = getApp\$1\(\)\.\$vm;/g, 'const _wapApp = getApp$1(); const appVm2 = _wapApp && _wapApp.$vm;')
        .replace(/(getApp(?:\$\d+)?)\(\)\.\$router/g, (_, fn) => coreRouterResolve(fn))
}

function patchNavExports(code) {
    let next = code
    for (const [from, to] of NAV_EXPORT_APIS) {
        const re = new RegExp(`\\b${from.replace(/\$/g, '\\$')} as ([A-Za-z0-9_$]+)`, 'g')
        next = next.replace(re, `${to} as $1`)
    }
    return next
}

function patchUniH5File(filePath) {
    let code = fs.readFileSync(filePath, 'utf-8')
    if (!code.includes('function getApp$1()') && !code.includes('export {')) return false

    code = fixBrokenDelegateOrder(code)
    const before = code

    if (!code.includes('function __wapDelegateUniApi')) {
        code = insertDelegateAfterImports(code)
    }
    code = patchGetAppFunction(code)
    code = patchGetCurrentPagesFunction(code)
    code = patchCoreRouterAccess(code)
    code = patchUnsafeGetAppAccess(code)
    if (code.includes('export {')) {
        code = patchNavExports(code)
    }

    if (code === before) return false
    fs.writeFileSync(filePath, code, 'utf-8')
    return true
}

function patchAddonAssetChunk(filePath) {
    let code = fs.readFileSync(filePath, 'utf-8')
    if (!code.includes('$router') && !code.includes('function getApp$1()')) return false

    const before = code
    code = patchCoreRouterAccess(code)
    code = patchGetAppFunction(code)
    code = patchUnsafeGetAppAccess(code)

    if (code === before) return false
    fs.writeFileSync(filePath, code, 'utf-8')
    return true
}

function patchExportHelper(filePath) {
    let code = fs.readFileSync(filePath, 'utf-8')
    if (code.includes('__wapExportHelperPatched')) return false

    // 直接覆盖 navigateTo/redirectTo/reLaunch 局部变量（不能用 exports，ESM 不存在）
    const navDelegate = [
        '',
        '/* __wapExportHelperPatched */',
        '(function(){',
        'var re=new RegExp("^\\\\/?addon\\\\/([^/]+)\\\\/pages\\\\/(.+)");',
        'var _wapOrigNavTo=navigateTo,_wapOrigRedir=redirectTo,_wapOrigReLaunch=reLaunch;',
        'navigateTo=function(args){',
        'var p=args&&args.url||"";var m=p.match(re);',
        'if(m&&typeof getApp==="function"){',
        'try{var r=getApp().$router;if(r){',
        'var q=m[0].startsWith("/")?p:"/"+p;var rs=r.resolve(q);',
        'if(rs&&rs.matched&&rs.matched.length===0){',
        'args=Object.assign({},args,{url:"/app/pages/addon-universal/index?addon="+m[1]+"&page=pages/"+m[2]})',
        '}}}catch(e){}}',
        'return _wapOrigNavTo.call(this,args)};',
        'redirectTo=function(args){',
        'var p=args&&args.url||"";var m=p.match(re);',
        'if(m){args=Object.assign({},args,{url:"/app/pages/addon-universal/index?addon="+m[1]+"&page=pages/"+m[2]})}',
        'return _wapOrigRedir.call(this,args)};',
        'reLaunch=function(args){',
        'var p=args&&args.url||"";var m=p.match(re);',
        'if(m){args=Object.assign({},args,{url:"/app/pages/addon-universal/index?addon="+m[1]+"&page=pages/"+m[2]})}',
        'return _wapOrigReLaunch.call(this,args)};',
        '})();',
        ''
    ].join('\n');

    fs.writeFileSync(filePath, code + navDelegate, 'utf-8')
    return true
}

function patchAddonDir(addonDir) {
    const assetsDir = path.join(addonDir, 'assets')
    if (!fs.existsSync(assetsDir)) return 0

    let count = 0
    for (const name of fs.readdirSync(assetsDir)) {
        if (!name.endsWith('.js')) continue
        const filePath = path.join(assetsDir, name)
        let patched = false
        if (/^uni-h5\.es\.[^.]+\.js$/.test(name)) {
            patched = patchUniH5File(filePath)
        } else {
            patched = patchAddonAssetChunk(filePath)
        }
        if (patched) {
            console.log(`[patch-addon-uni-h5] patched ${path.relative(ROOT, filePath)}`)
            count++
        }
    }
    return count
}

function patchAddonUniH5(key) {
    const staging = path.join(ROOT, 'dist', '.addons', key)
    const assembled = path.join(ROOT, 'dist', 'build', 'h5', 'assets', 'addons', key)
    let count = 0
    if (fs.existsSync(staging)) count += patchAddonDir(staging)
    if (fs.existsSync(assembled)) count += patchAddonDir(assembled)
    return count
}

function patchAllAddonUniH5() {
    const addonsRoot = path.join(ROOT, 'dist', 'build', 'h5', 'assets', 'addons')
    if (!fs.existsSync(addonsRoot)) return 0
    let count = 0
    for (const name of fs.readdirSync(addonsRoot)) {
        const dir = path.join(addonsRoot, name)
        if (fs.statSync(dir).isDirectory()) count += patchAddonDir(dir)
    }
    const stagingRoot = path.join(ROOT, 'dist', '.addons')
    if (fs.existsSync(stagingRoot)) {
        for (const name of fs.readdirSync(stagingRoot)) {
            const dir = path.join(stagingRoot, name)
            if (fs.statSync(dir).isDirectory()) count += patchAddonDir(dir)
        }
    }
    return count
}

if (require.main === module) {
    const key = process.argv[2] || process.env.ADDON_KEY
    if (key) {
        const n = patchAddonUniH5(key)
        console.log(`[patch-addon-uni-h5] done (${n} file(s))`)
    } else {
        const n = patchAllAddonUniH5()
        console.log(`[patch-addon-uni-h5] patched all (${n} file(s))`)
    }
}

module.exports = {
    patchAddonUniH5,
    patchAddonDir,
    patchExportHelper,
    patchUniH5File,
    patchAddonAssetChunk,
    patchCoreRouterAccess,
    patchAllAddonUniH5,
    fixDuplicatePagesVar
}
