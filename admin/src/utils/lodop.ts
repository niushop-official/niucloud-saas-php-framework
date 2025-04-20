import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'

// Web打印服务CLodop/Lodop7

// 用双端口加载主JS文件Lodop.js(或CLodopfuncs.js兼容老版本)以防其中某端口被占:
const MainJS = "CLodopfuncs.js";
const URL_WS1: any = ref("ws://localhost:{port}/" + MainJS); // ws用8000/18000
const URL_WS2: any = ref("ws://localhost:{port}/" + MainJS);
const URL_HTTP1: any = ref("http://localhost:{port}/" + MainJS); // http用8000/18000
const URL_HTTP2: any = ref("http://localhost:{port}/" + MainJS);
const URL_HTTP3: any = ref("https://localhost.lodop.net:{port}/" + MainJS); // https用8000/8443

const CreatedOKLodopObject: any = ref(null);
const CLodopIsLocal: any = ref(null);
const LoadJsState: any = ref('');

const initPort = (paramas: any) => {
    if (!paramas) {
        paramas = {
            server_port1: 8000,
            server_port2: 18000,
            https_port: 8443
        };
    }
    URL_WS1.value = URL_WS1.value.replace('{port}', paramas.server_port1);
    URL_WS2.value = URL_WS2.value.replace('{port}', paramas.server_port2);

    URL_HTTP1.value = URL_HTTP1.value.replace('{port}', paramas.server_port1);
    URL_HTTP2.value = URL_HTTP2.value.replace('{port}', paramas.server_port2);

    URL_HTTP3.value = URL_HTTP2.value.replace('{port}', paramas.https_port);

}

//==判断是否需要CLodop(那些不支持插件的浏览器):==
const needCLodop = () => {
    try {
        let ua = navigator.userAgent;
        if (ua.match(/Windows\sPhone/i) ||
            ua.match(/iPhone|iPod|iPad/i) ||
            ua.match(/Android/i) ||
            ua.match(/Edge\D?\d+/i))
            return true;
        let verTrident = ua.match(/Trident\D?\d+/i);
        let verIE = ua.match(/MSIE\D?\d+/i);
        let verOPR: any = ua.match(/OPR\D?\d+/i);
        let verFF: any = ua.match(/Firefox\D?\d+/i);
        let x64 = ua.match(/x64/i);
        if ((!verTrident) && (!verIE) && (x64)) return true;
        else if (verFF) {
            verFF = verFF[0].match(/\d+/);
            if ((verFF[0] >= 41) || (x64)) return true;
        } else if (verOPR) {
            verOPR = verOPR[0].match(/\d+/);
            if (verOPR[0] >= 32) return true;
        } else if ((!verTrident) && (!verIE)) {
            let verChrome: any = ua.match(/Chrome\D?\d+/i);
            if (verChrome) {
                verChrome = verChrome[0].match(/\d+/);
                if (verChrome[0] >= 41) return true;
            }
        }
        return false;
    } catch (err) {
        return true;
    }
};

// ==检查加载成功与否，如没成功则用http(s)再试==
// ==低版本CLODOP6.561/Lodop7.043及前)用本方法==
function checkOrTryHttp() {
    if (window.getCLodop) {
        LoadJsState.value = "complete";
        return true;
    }
    if (LoadJsState.value == "loadingB" || LoadJsState.value == "complete") return;
    LoadJsState.value = "loadingB";
    let head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    let JS1 = document.createElement("script")
        , JS2 = document.createElement("script")
        , JS3 = document.createElement("script");
    JS1.src = URL_HTTP1.value;
    JS2.src = URL_HTTP2.value;
    JS3.src = URL_HTTP3.value;
    JS1.onload = JS2.onload = JS3.onload = JS2.onerror = JS3.onerror = function () {
        LoadJsState.value = "complete";
    };
    JS1.onerror = function (e) {
        if (window.location.protocol !== 'https:') {
            head.insertBefore(JS2, head.firstChild);
        } else {
            head.insertBefore(JS3, head.firstChild);
        }
    };
    head.insertBefore(JS1, head.firstChild);
}

// ==加载Lodop对象的主过程:==
const loadCLodop = (paramas: any = null) => {
    if (!needCLodop()) return;

    initPort(paramas);

    CLodopIsLocal.value = !!((URL_WS1.value + URL_WS2.value).match(/\/\/localho|\/\/127.0.0./i));
    LoadJsState.value = "loadingA";
    if (!window.WebSocket && window.MozWebSocket) window.WebSocket = window.MozWebSocket;
    //ws方式速度快(小于200ms)且可避免CORS错误,但要求Lodop版本足够新:
    try {
        let WSK1 = new WebSocket(URL_WS1.value);
        WSK1.onopen = function (e) {
            setTimeout(checkOrTryHttp, 200);
        };
        WSK1.onmessage = function (e) {
            if (!window.getCLodop) eval(e.data);
        };
        WSK1.onerror = function (e) {
            let WSK2 = new WebSocket(URL_WS2.value);
            WSK2.onopen = function (e) {
                setTimeout(checkOrTryHttp, 200);
            };
            WSK2.onmessage = function (e) {
                if (!window.getCLodop) eval(e.data);
            };
            WSK2.onerror = function (e) {
                checkOrTryHttp();
            }
        }
    } catch (e) {
        checkOrTryHttp();
    }
};

//==获取LODOP对象主过程,判断是否安装、需否升级:==
const getLodop = (oOBJECT = null, oEMBED = null) => {
    let strFontTag = "<br>打印控件";
    let strLodopInstall = strFontTag + "未安装!点击这里<a href='http://www.lodop.net/download.html' target='_blank' class='text-primary'>执行安装</a>";
    let strLodopUpdate = strFontTag + "需要升级!点击这里<a href='http://www.lodop.net/download.html' target='_blank' class='text-primary'>执行升级</a>";
    let strCLodopInstallA = "<br>Web打印服务CLodop未安装启动，点击这里<a href='http://www.lodop.net/download.html' target='_blank' class='text-primary'>下载执行安装</a>";
    let strCLodopInstallB = "<br>（若此前已安装过，可<a href='CLodop.protocol:setup' target='_blank' class='text-primary'>点这里直接再次启动</a>）";
    let strCLodopUpdate = "<br>Web打印服务CLodop需升级!点击这里<a href='http://www.lodop.net/download.html' target='_blank' class='text-primary'>执行升级</a>";
    let strLodop7FontTag = "<br>Web打印服务Lodop7";
    let strLodop7HrefX86 = "点击这里<a href='http://www.lodop.net/download.html' target='_blank' class='text-primary'>下载安装</a>(下载后解压，点击lodop文件开始执行)";
    let strLodop7Install_X86 = strLodop7FontTag + "未安装启动，" + strLodop7HrefX86;
    let strLodop7Update_X86 = strLodop7FontTag + "需升级，" + strLodop7HrefX86;
    let strInstallOK = "，成功后请刷新本页面或重启浏览器。";
    let LODOP;
    try {
        let isWinIE = (/MSIE/i.test(navigator.userAgent)) || (/Trident/i.test(navigator.userAgent));
        let isLinuxX86 = (/Linux/i.test(navigator.platform)) && (/x86/i.test(navigator.platform));
        let isLinuxARM = (/Linux/i.test(navigator.platform)) && (/aarch/i.test(navigator.platform));

        if (needCLodop() || isLinuxX86 || isLinuxARM) {
            try {
                LODOP = window.getCLodop();
            } catch (err) {
            }
            if (!LODOP && LoadJsState.value !== "complete") {
                if (!LoadJsState.value) {
                    ElMessageBox.alert('未曾加载Lodop主JS文件，请先调用loadCLodop过程', '提示', { dangerouslyUseHTMLString: true, })
                } else {
                    ElMessageBox.alert('网页还没下载完毕，请稍等一下再操作', '提示', { dangerouslyUseHTMLString: true, })
                }
                return;
            }
            let strAlertMessage;
            if (!LODOP) {
                if (isLinuxX86 || isLinuxARM)
                    strAlertMessage = strLodop7Install_X86;
                else
                    strAlertMessage = strCLodopInstallA + (CLodopIsLocal.value ? strCLodopInstallB : "");

                ElMessageBox.alert(strAlertMessage + strInstallOK, '提示', { dangerouslyUseHTMLString: true, })
                return;
            } else {
                if ((isLinuxX86 || isLinuxARM) && LODOP.CVERSION < "7.0.7.5")
                    strAlertMessage = strLodop7Update_X86;
                else if (CLODOP.CVERSION < "6.5.9.8")
                    strAlertMessage = strCLodopUpdate;

                if (strAlertMessage) {
                    ElMessageBox.alert(strAlertMessage + strInstallOK, '提示', { dangerouslyUseHTMLString: true, })
                }
            }
        } else {
            //==如果页面有Lodop插件就直接使用,否则新建:==
            if (oOBJECT || oEMBED) {
                if (isWinIE) LODOP = oOBJECT;
                else LODOP = oEMBED;
            } else if (!CreatedOKLodopObject.value) {
                LODOP = document.createElement("object");
                LODOP.setAttribute("width", 0);
                LODOP.setAttribute("height", 0);
                LODOP.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;");
                if (isWinIE) LODOP.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
                else LODOP.setAttribute("type", "application/x-print-lodop");
                document.documentElement.appendChild(LODOP);
                CreatedOKLodopObject.value = LODOP;
            } else
                LODOP = CreatedOKLodopObject.value;
            //==Lodop插件未安装时提示下载地址:==
            if ((!LODOP) || (!LODOP.VERSION)) {
                ElMessageBox.alert(strLodopInstall + strInstallOK, '提示', { dangerouslyUseHTMLString: true, })
                return LODOP;
            }
            if (LODOP.VERSION < "6.2.2.6") {
                ElMessageBox.alert(strLodopUpdate + strInstallOK, '提示', { dangerouslyUseHTMLString: true, })
            }
        }

        //===如下空白位置适合调用统一功能(如注册语句、语言选择等):=======================

        //===============================================================================
        return LODOP;
    } catch (err) {
        ElMessage({
            message: "getLodop出错:" + err,
            type: 'error',
            duration: 5000
        })
    }
};

export { loadCLodop, getLodop }
