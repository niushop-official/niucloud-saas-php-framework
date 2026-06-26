const fs = require('fs')
const { spawn } = require('child_process');
const path = require('path');

const main = () => {
    const params = process.argv.slice(2) || []
    const port = params[0] || ''
    const mode = params[1] || ''

    switch (port) {
        case 'h5':
            publish()
            break;
        case 'mp-weixin':
            if (mode == 'build') {
                handleWeappPostProcess(mode)
            } else if (mode == 'dev') {
                listenWeappRunDev()
            }
            break;
    }
}

const publish = () => {
    const src = './dist/build/h5'
    const dest = '../niucloud/public/wap'

    solve()

    // 目标目录不存在停止复制
    try {
        const dir = fs.readdirSync(dest)
    } catch (e) {
        return
    }

    // 删除目标目录下文件
    fs.rm(dest, { recursive: true }, err => {
        if(err) {
            console.log(err)
            return
        }

        fs.cp(src, dest, { recursive: true }, (err) => {
            if (err) {
                console.error(err)
            }
        })
    })
}

const { applyRouterBase } = require('./scripts/apply-router-base.cjs')

const solve = () => {
    applyRouterBase('./dist/build/h5/assets')
}

const getMpWeixinDir = (mode) => path.join(__dirname, 'dist', mode, 'mp-weixin')

const handleWeappDiyGroupInline = (mode) => {
    const mpDir = getMpWeixinDir(mode)
    if (!fs.existsSync(path.join(mpDir, 'addon/components/diy/group/index.wxml'))) {
        return
    }
    try {
        const { applyMpWeixinDiyGroupInline } = require('./scripts/mp-diy-group-inline.cjs')
        const result = applyMpWeixinDiyGroupInline(mpDir)
        if (!result.skipped) {
            console.log(`[publish] diy-group inlined ${result.count} component(s) -> ${path.relative(__dirname, mpDir)}`)
        }
    } catch (err) {
        console.error('[publish] diy-group inline failed:', err.message || err)
    }
}

const handleWeappDiyDynamicBridge = (mode) => {
    const src = `./dist/${mode}/mp-weixin/components/diy-dynamic-bridge/diy-dynamic-bridge.json`
    try {
        const data = JSON.parse(fs.readFileSync(src, 'utf8'))
        data.componentPlaceholder = data.componentPlaceholder || {}
        for (const key of Object.keys(data.usingComponents || {})) {
            if (!data.componentPlaceholder[key]) {
                data.componentPlaceholder[key] = 'view'
            }
        }
        fs.writeFileSync(src, JSON.stringify(data))
    } catch (err) {
    }
}

const handleWeappLanguage = (mode) => {
    const src = `./dist/${mode}/mp-weixin/locale/language.js`

    try {
        let content = fs.readFileSync(src, 'utf8');
        content = content.replace(/Promise\.resolve\(require\(("[^"]+")\)\)/g, 'require.async($1)')
        fs.writeFileSync(src, content)
    } catch (err) {
        console.log(err)
    }
}

const handleProjectConfig = (mode) => {
    const src = `./dist/${mode}/mp-weixin/project.config.json`

    try {
        let content = fs.readFileSync(src, 'utf8');
        const config = JSON.parse(content)
        config.setting.minifyWXML = false
        fs.writeFileSync(src, JSON.stringify(config))
    } catch (err) {
        console.log(err)
    }
}

/** dev / build 编译完成后：内联 diy-group + 语言/bridge/工程配置 */
const handleWeappPostProcess = (mode) => {
    handleWeappLanguage(mode)
    handleWeappProjectConfigSafe(mode)
    handleWeappDiyGroupInline(mode)
    handleWeappDiyDynamicBridge(mode)
}

const handleWeappProjectConfigSafe = (mode) => {
    try {
        handleProjectConfig(mode)
    } catch (err) {
        console.log(err)
    }
}

const listenWeappRunDev = () => {
    const devProcess = spawn('npm', ['run', 'dev:niu-mp-weixin'], {
        stdio: ['pipe', 'pipe', 'pipe'],
        shell: true
    });

    // 每次编译完成都内联 diy-group（watch 热更新会重新生成 bridge 版 wxml）
    devProcess.stdout.on('data', (data) => {
        const message = data.toString();
        console.log(message)
        if (message.includes('DONE  Build complete')) {
            handleWeappPostProcess('dev')
        }
    });

    // 监听 stderr 输出，用于捕获错误信息
    devProcess.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    // 监听子进程退出事件
    devProcess.on('close', (code) => {
        if (code !== 0) { // 如果退出码不是0，则认为发生了错误
            console.error(`Child process exited with code ${code}`);
        } else {
            console.log('Child process exited successfully.');
        }
    });
}

main()
