import { defineComponent as T, ref as x, watch as L, resolveComponent as r, resolveDirective as I, withDirectives as M, openBlock as R, createElementBlock as H, createElementVNode as t, createVNode as l, withCtx as i, createTextVNode as F, pushScopeId as O, popScopeId as q, createStaticVNode as h } from "vue";
import { ElMessage as o } from "element-plus";
import { M as G, t as d, az as E, gc as J, gd as K, ge as P, _ as Q } from "./core-shared-c8d7774e.js";
import W from "./index-1f60a818.js";
import X from "./index-0cd3442c.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
import "./success_icon-605a2b43.js";
import "./module-fd14206b.js";
import "./dark-3dd028d8.js";
import "./icon-addon-one-2b9cfff5.js";
import "./addon-db4625f4.js";
const e = (m) => (O("data-v-d03eaabf"), m = m(), q(), m), Y = { class: "main-container w-full" }, Z = { class: "p-5 bg-[#fff] overflow-hidden" }, tt = { class: "bg-[#fff] w-[100%] overflow-hidden" }, et = { class: "flex items-center justify-between mb-[20px]" }, st = /* @__PURE__ */ e(() => /* @__PURE__ */ t("div", { class: "text-[#1D1F3A] text-[16px] font-bold ml-[4px]" }, "云编译", -1)), at = { class: "flex ml-[20px]" }, lt = /* @__PURE__ */ e(() => /* @__PURE__ */ t("div", { class: "btn-time w-[181px] h-[36px] rounded-[4px] text-[#9699B6] text-[12px] ml-[10px]" }, [
  /* @__PURE__ */ t("span", null, "云编译执行时间大约"),
  /* @__PURE__ */ t("span", { class: "text-[14px] text-[#DA203E] mx-[3px]" }, "5"),
  /* @__PURE__ */ t("span", null, "分钟")
], -1)), pt = /* @__PURE__ */ h('<div class="panel-title bg-[#F4F5F7] border-[#E6E6E6] border-solid border-b-[1px] h-[40px] flex items-center p-[10px]" data-v-d03eaabf><span class="text-[16px] font-500 text-[#1D1F3A]" data-v-d03eaabf>云编译</span><span class="text-[12px] text-[#9699B6] ml-[10px]" data-v-d03eaabf>云编译不需要本地安装node环境即可进行，针对使用者方便快捷</span></div><div class="mt-[20px] flex mb-[14px] items-center" data-v-d03eaabf><span class="flex ml-[20px] font-500 text-[16px] items-center text-[#1D1F3A]" data-v-d03eaabf> 温馨提示 </span><span class="text-[12px] text-[#9699B6] ml-[10px]" data-v-d03eaabf> 以下情况可以进行云编译</span></div><div class="ml-[40px] text-[14px] text-[#4F516D] mb-[18px]" data-v-d03eaabf>1、系统或插件，每次安装或升级完成后，需要云编译</div><div class="ml-[40px] text-[14px] text-[#4F516D] mb-[18px]" data-v-d03eaabf>2、开发者编写完前端代码之后，可以使用云编译进行源码编译</div><div class="ml-[40px] text-[14px] text-[#4F516D] mb-[18px]" data-v-d03eaabf>3、由于云编译不是针对某个插件进行编译，而是系统整体编译，因此如果同时需要安装多个插件时，往往需要安装到最后一个插件才整体进行云编译</div><div class="mt-[21px] flex mb-[21px] text-[16px] text-[#1D1F3A] font-500 items-center" data-v-d03eaabf><span class="flex ml-[20px] items-center" data-v-d03eaabf> 云编译流程 </span></div>', 6), nt = { class: "ml-[40px]" }, ot = /* @__PURE__ */ e(() => /* @__PURE__ */ t("div", { class: "text-[16px] text-[#1D1F3A]" }, "编译admin代码", -1)), it = /* @__PURE__ */ e(() => /* @__PURE__ */ t("div", { class: "p-[10px] bg-[#F9F9FB] mt-[10px] text-[#4F516D] text-[14px] w-[1085px] border-[#F1F1F8] border-solid border-[1px] h-[40px] flex items-center rounded-[4px]" }, [
  /* @__PURE__ */ t("span", null, "云编译会将admin端的vue代码编译为对应的html文件，同时将生成的代码下载到系统 niucloud 下的"),
  /* @__PURE__ */ t("span", { class: "text-[#F09000] mx-[3px] font-bold" }, "public/admin"),
  /* @__PURE__ */ t("span", null, "目录中。后台的访问路径将变为"),
  /* @__PURE__ */ t("span", { class: "text-primary ml-[3px] font-500" }, "https://域名/admin")
], -1)), xt = /* @__PURE__ */ e(() => /* @__PURE__ */ t("div", { class: "text-[16px] text-[#1D1F3A]" }, "编译uniapp代码", -1)), dt = /* @__PURE__ */ e(() => /* @__PURE__ */ t("div", { class: "p-[10px] bg-[#F9F9FB] mt-[10px] text-[#4F516D] text-[14px] w-[1085px] border-[#F1F1F8] border-solid border-[1px] h-[40px] flex items-center rounded-[4px]" }, [
  /* @__PURE__ */ t("span", null, "云编译会将uniapp端的vue代码编译为对应的html文件，同时将生成的代码下载到系统 niucloud下的"),
  /* @__PURE__ */ t("span", { class: "text-[#F09000] mx-[3px] font-bold" }, "public/wap"),
  /* @__PURE__ */ t("span", null, "目录中，这样手机端网页的访问路径将变为"),
  /* @__PURE__ */ t("span", { class: "text-primary ml-[3px] font-500" }, " https://域名/wap")
], -1)), ct = /* @__PURE__ */ e(() => /* @__PURE__ */ t("div", { class: "text-[16px] text-[#1D1F3A]" }, "编译web代码", -1)), rt = /* @__PURE__ */ e(() => /* @__PURE__ */ t("div", { class: "p-[10px] bg-[#F9F9FB] mt-[10px] text-[#4F516D] text-[14px] w-[1085px] border-[#F1F1F8] border-solid border-[1px] h-[40px] flex items-center rounded-[4px]" }, [
  /* @__PURE__ */ t("span", null, "云编译会将web端的vue代码编译为对应的html文件，同时将生成的代码下载到系统 niucloud下的"),
  /* @__PURE__ */ t("span", { class: "text-[#F09000] mx-[3px] font-bold" }, "public/web"),
  /* @__PURE__ */ t("span", null, "目录中，这样电脑端网页的访问路径将变为"),
  /* @__PURE__ */ t("span", { class: "text-primary ml-[3px] font-500" }, " https://域名/web")
], -1)), mt = { class: "mt-[10px]" }, ut = { class: "panel-title bg-[#F4F5F7] border-[#E6E6E6] border-solid border-b-[1px] h-[40px] flex items-center p-[10px]" }, vt = /* @__PURE__ */ e(() => /* @__PURE__ */ t("span", { class: "text-[16px] font-500 text-[#1D1F3A]" }, "第三方云编译", -1)), bt = /* @__PURE__ */ e(() => /* @__PURE__ */ t("span", { class: "ml-[10px] text-[#9699B6] text-[12px]" }, "自己搭建第三方云编译服务器，无需等待", -1)), ft = { class: "mt-[20px] flex mb-[14px] text-[16px] items-center text-[#1D1F3A]" }, _t = /* @__PURE__ */ e(() => /* @__PURE__ */ t("span", { class: "flex ml-[20px] items-center" }, " 温馨提示 ", -1)), Ft = /* @__PURE__ */ e(() => /* @__PURE__ */ t("span", { class: "text-[12px] text-[#9699B6] ml-[10px]" }, "运行环境要求：需预先配置 Nodejs 环境", -1)), ht = { class: "ml-[40px] text-[14px] text-[#4F516D] mb-[18px]" }, wt = /* @__PURE__ */ e(() => /* @__PURE__ */ t("span", null, "1、下载第三方云编译服务器搭建程序包", -1)), gt = /* @__PURE__ */ h('<div class="ml-[40px] text-[14px] text-[#4F516D] mb-[18px]" data-v-d03eaabf><span data-v-d03eaabf>2、请在指定目录（不能包含中文）下执行 npm install 命令安装依赖包</span></div><div class="ml-[40px] text-[14px] text-[#4F516D] mb-[18px]" data-v-d03eaabf><span data-v-d03eaabf>3、启动编译服务器：执行 node niucloud-compile-server.js 命令</span></div><div class="ml-[40px] text-[14px] text-[#4F516D] mb-[18px]" data-v-d03eaabf><span data-v-d03eaabf>4、填写服务器地址并成功连通测试后，点击开启即可享受自己搭建的云编译服务器，编译将无需排队等待。</span></div><div class="mt-[20px] flex mb-[14px] text-[16px] items-center text-[#1D1F3A]" data-v-d03eaabf><span class="flex ml-[20px] items-center" data-v-d03eaabf> 云编译服务器设置 </span></div><div class="mt-[20px] flex mb-[14px] text-[16px] items-center text-[#1D1F3A] ml-[20px]" data-v-d03eaabf><span class="flex ml-[20px] items-center" data-v-d03eaabf> 服务器地址 </span></div>', 5), yt = { class: "flex ml-[40px] mb-[30px] items-center" }, Dt = { class: "mt-[10px]" }, Bt = /* @__PURE__ */ h('<div class="panel-title bg-[#F4F5F7] border-[#E6E6E6] border-solid border-b-[1px] h-[40px] flex items-center p-[10px]" data-v-d03eaabf><span class="text-[16px] font-500 text-[#1D1F3A]" data-v-d03eaabf>本地编译</span></div><div class="mt-[20px] flex mb-[14px] text-[16px] items-center text-[#1D1F3A]" data-v-d03eaabf><span class="flex ml-[20px] items-center" data-v-d03eaabf> 温馨提示 </span></div><div class="ml-[40px] text-[14px] text-[#4F516D] mb-[18px]" data-v-d03eaabf><span data-v-d03eaabf>1、如果本地安装了Node环境，可以进行本地编译，要求</span><span class="text-[#DA203E] ml-[3px] font-500" data-v-d03eaabf>Node版本&gt;=18</span></div><div class="ml-[40px] text-[14px] text-[#4F516D] mb-[18px]" data-v-d03eaabf>2、默认本地编译流程与云编译相同，执行本地编译命令后，会将编译后的代码移动到系统niucloud下的public下的对应端口目录下</div><div class="ml-[40px] text-[14px] text-[#4F516D] mb-[18px]" data-v-d03eaabf>3、由于云编译配置的访问路径是固定的，针对客户有独立部署admin，wap，web等个性化端口名称配置需求，需要进行本地编译</div><div class="mt-[20px] flex mb-[14px] text-[16px] items-center text-[#1D1F3A]" data-v-d03eaabf><span class="flex ml-[20px] items-center" data-v-d03eaabf> 本地编译命令参考 </span></div>', 6), Ct = /* @__PURE__ */ e(() => /* @__PURE__ */ t("div", { class: "ml-[40px] text-[#374151] text-[14px] italic" }, [
  /* @__PURE__ */ t("span", { class: "text-[16px] italic font-500" }, "#安装依赖："),
  /* @__PURE__ */ t("span", { class: "italic" }, "进入admin端与uniapp端以及web端目录都可执行")
], -1)), At = { class: "ml-[40px] w-[1085px] h-[40px] bg-[#F9F9FB] rounded-[4px] mt-[10px] flex items-center justify-between border-[#F1F1F8] border-solid border-[1px] px-[10px]" }, Et = /* @__PURE__ */ e(() => /* @__PURE__ */ t("span", { class: "text-[14px] text-[#374151]" }, "npm install", -1)), kt = { class: "mt-[21px]" }, Vt = /* @__PURE__ */ e(() => /* @__PURE__ */ t("div", { class: "ml-[40px] text-[14px] text-[#374151] italic" }, [
  /* @__PURE__ */ t("span", { class: "text-[16px] italic font-500" }, "#后台admin端口打包："),
  /* @__PURE__ */ t("span", null, "进入admin目录下执行，执行后编译代码默认移动到系统的niucloud下的"),
  /* @__PURE__ */ t("span", { class: "text-[#F09000] mx-[3px] font-bold" }, "public/admin"),
  /* @__PURE__ */ t("span", null, "目录下")
], -1)), jt = { class: "ml-[40px] w-[1085px] h-[40px] bg-[#F9F9FB] rounded-[4px] mt-[10px] flex items-center justify-between border-[#F1F1F8] border-solid border-[1px] px-[10px]" }, Nt = /* @__PURE__ */ e(() => /* @__PURE__ */ t("span", { class: "text-[14px] text-[#374151]" }, "npm run build", -1)), St = { class: "mt-[21px]" }, Ut = /* @__PURE__ */ e(() => /* @__PURE__ */ t("div", { class: "ml-[40px] text-[14px] text-[#374151] italic" }, [
  /* @__PURE__ */ t("span", { class: "text-[16px] italic font-500" }, "#使用uniapp打包H5："),
  /* @__PURE__ */ t("span", null, "进入uniapp目录下执行，执行后编译代码默认移动到系统niucloud下的"),
  /* @__PURE__ */ t("span", { class: "text-[#F09000] mx-[3px] font-bold" }, "public/wap"),
  /* @__PURE__ */ t("span", null, "目录下")
], -1)), $t = { class: "ml-[40px] w-[1085px] h-[40px] bg-[#F9F9FB] rounded-[4px] mt-[10px] flex items-center justify-between border-[#F1F1F8] border-solid border-[1px] px-[10px]" }, zt = /* @__PURE__ */ e(() => /* @__PURE__ */ t("span", { class: "text-[14px] text-[#374151]" }, "npm run build:h5", -1)), Tt = { class: "mt-[21px]" }, Lt = /* @__PURE__ */ e(() => /* @__PURE__ */ t("div", { class: "ml-[40px] text-[14px] text-[#374151] italic" }, [
  /* @__PURE__ */ t("span", { class: "text-[16px] italic font-500" }, "#使用uniapp打包微信小程序："),
  /* @__PURE__ */ t("span", null, "进入uniapp目录下执行，执行后编译代码默认移动到系统niucloud下的"),
  /* @__PURE__ */ t("span", { class: "text-[#F09000] mx-[3px] font-bold" }, "uni-app/dist/build/mp-weixin"),
  /* @__PURE__ */ t("span", null, "目录")
], -1)), It = { class: "ml-[40px] w-[1085px] h-[40px] bg-[#F9F9FB] rounded-[4px] mt-[10px] flex items-center justify-between border-[#F1F1F8] border-solid border-[1px] px-[10px]" }, Mt = /* @__PURE__ */ e(() => /* @__PURE__ */ t("span", { class: "text-[14px] text-[#374151]" }, "npm run build:mp-weixin", -1)), Rt = { class: "mt-[21px]" }, Ht = /* @__PURE__ */ e(() => /* @__PURE__ */ t("div", { class: "ml-[40px] text-[14px] text-[#374151] italic" }, [
  /* @__PURE__ */ t("span", { class: "text-[16px] italic font-500" }, "#前台web(pc)端打包:："),
  /* @__PURE__ */ t("span", null, "进入web目录下执行，执行后编译代码默认移动到系统niucloud下的"),
  /* @__PURE__ */ t("span", { class: "text-[#F09000] mx-[3px] font-bold" }, "public/web"),
  /* @__PURE__ */ t("span", null, "目录下")
], -1)), Ot = { class: "ml-[40px] w-[1085px] h-[40px] bg-[#F9F9FB] rounded-[4px] mt-[10px] flex items-center justify-between border-[#F1F1F8] border-solid border-[1px] px-[10px]" }, qt = /* @__PURE__ */ e(() => /* @__PURE__ */ t("span", { class: "text-[14px] text-[#374151]" }, "npm run generate", -1)), Gt = /* @__PURE__ */ T({
  __name: "cloud_compile",
  setup(m) {
    const k = x(!1), w = x(!1), u = x(!1), b = x(null), g = () => {
      ElMessageBox.confirm(d("cloudBuildTips"), d("warning"), {
        confirmButtonText: d("confirm"),
        cancelButtonText: d("cancel"),
        type: "warning"
      }).then(() => {
        var a;
        (a = b.value) == null || a.open();
      });
    }, { copy: V, isSupported: j, copied: y } = G(), c = (a) => {
      if (!j.value) {
        o({
          message: d("notSupportCopy"),
          type: "warning"
        });
        return;
      }
      V(a);
    };
    L(y, () => {
      y.value && o({
        message: d("copySuccess"),
        type: "success"
      });
    });
    const D = (a) => {
      window.open(a, "_blank");
    }, v = x(0), n = x(""), N = async () => {
      if (n.value != "" && !E.url(n.value)) {
        o({
          message: "请输入正确的服务器地址，必须以http://或https://开头",
          type: "warning"
        });
        return;
      }
      u.value = !0, J({
        url: n.value
      }).then((a) => {
        a.data == !1 ? o({
          message: "连通测试失败",
          type: "error"
        }) : o({
          message: "连通测试成功",
          type: "success"
        }), u.value = !1;
      }).catch(() => {
        u.value = !1;
      });
    }, B = async () => {
      if (n.value != "" && !E.url(n.value)) {
        o({
          message: "请输入正确的服务器地址，必须以http://或https://开头",
          type: "warning"
        });
        return;
      }
      w.value = !0, K({
        url: n.value,
        is_open: v.value
      }).then((a) => {
        a.data == 1 && (o({
          message: "保存成功",
          type: "success"
        }), C());
      }).catch(() => {
        o({
          message: "保存失败",
          type: "error"
        });
      }).finally(() => {
        w.value = !1;
      });
    }, C = async () => {
      P({}).then((a) => {
        n.value = a.data.baseUri, v.value = a.data.isOpen;
      });
    };
    return C(), (a, s) => {
      var A;
      const f = r("el-button"), _ = r("el-timeline-item"), S = r("el-timeline"), U = r("el-switch"), $ = r("el-input"), z = I("loading");
      return M((R(), H("div", Y, [
        t("div", Z, [
          t("div", tt, [
            t("div", et, [
              st,
              t("div", at, [
                lt,
                l(f, {
                  class: "w-[98px] !h-[36px]",
                  type: "primary",
                  onClick: g,
                  loading: (A = b.value) == null ? void 0 : A.loading
                }, {
                  default: i(() => [
                    F("云编译")
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ]),
            pt,
            t("div", nt, [
              l(S, null, {
                default: i(() => [
                  l(_, { hollow: !0 }, {
                    default: i(() => [
                      ot,
                      it
                    ]),
                    _: 1
                  }),
                  l(_, { hollow: !0 }, {
                    default: i(() => [
                      xt,
                      dt
                    ]),
                    _: 1
                  }),
                  l(_, { hollow: !0 }, {
                    default: i(() => [
                      ct,
                      rt
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ])
          ]),
          t("div", mt, [
            t("div", ut, [
              vt,
              l(U, {
                modelValue: v.value,
                "onUpdate:modelValue": s[0] || (s[0] = (p) => v.value = p),
                "active-value": 1,
                "inactive-value": 0,
                class: "ml-[10px]",
                onChange: B
              }, null, 8, ["modelValue"]),
              bt
            ]),
            t("div", ft, [
              _t,
              Ft,
              t("span", {
                class: "text-[14px] text-primary cursor-pointer ml-[10px] border-b-[1px] border-solid border-primary",
                onClick: s[1] || (s[1] = (p) => D("https://doc.press.niucloud.com/php/saas-framework/use/other/third-party-cloud-compilation.html"))
              }, "搭建教程")
            ]),
            t("div", ht, [
              wt,
              t("span", {
                class: "text-primary cursor-pointer",
                onClick: s[2] || (s[2] = (p) => D("https://gitee.com/niucloud-team/niucloud-compile-server"))
              }, " niucloud-compile-server")
            ]),
            gt,
            t("div", yt, [
              l($, {
                clearable: "",
                placeholder: "请输入服务器地址",
                class: "!w-[520px]",
                maxlength: "200",
                modelValue: n.value,
                "onUpdate:modelValue": s[3] || (s[3] = (p) => n.value = p)
              }, null, 8, ["modelValue"]),
              l(f, {
                type: "primary",
                class: "ml-[10px]",
                onClick: B
              }, {
                default: i(() => [
                  F("确定")
                ]),
                _: 1
              }),
              l(f, {
                type: "primary",
                plain: "",
                class: "ml-[10px]",
                onClick: N,
                loading: u.value
              }, {
                default: i(() => [
                  F("连通测试")
                ]),
                _: 1
              }, 8, ["loading"])
            ])
          ]),
          t("div", Dt, [
            Bt,
            t("div", null, [
              Ct,
              t("div", At, [
                Et,
                t("span", {
                  class: "iconfont iconfuzhiV6xx1 !text-[#252B3A] cursor-pointer",
                  onClick: s[4] || (s[4] = (p) => c("npm install"))
                })
              ])
            ]),
            t("div", kt, [
              Vt,
              t("div", jt, [
                Nt,
                t("span", {
                  class: "iconfont iconfuzhiV6xx1 !text-[#252B3A] cursor-pointer",
                  onClick: s[5] || (s[5] = (p) => c("npm run build"))
                })
              ])
            ]),
            t("div", St, [
              Ut,
              t("div", $t, [
                zt,
                t("span", {
                  class: "iconfont iconfuzhiV6xx1 !text-[#252B3A] cursor-pointer",
                  onClick: s[6] || (s[6] = (p) => c("npm run build:h5"))
                })
              ])
            ]),
            t("div", Tt, [
              Lt,
              t("div", It, [
                Mt,
                t("span", {
                  class: "iconfont iconfuzhiV6xx1 !text-[#252B3A] cursor-pointer",
                  onClick: s[7] || (s[7] = (p) => c("npm run build:mp-weixin"))
                })
              ])
            ]),
            t("div", Rt, [
              Ht,
              t("div", Ot, [
                qt,
                t("span", {
                  class: "iconfont iconfuzhiV6xx1 !text-[#252B3A] cursor-pointer",
                  onClick: s[8] || (s[8] = (p) => c("npm run build"))
                })
              ])
            ])
          ])
        ]),
        l(W, {
          ref: "upgradeRef",
          onCloudbuild: g
        }, null, 512),
        l(X, {
          ref_key: "cloudBuildRef",
          ref: b
        }, null, 512)
      ])), [
        [z, k.value]
      ]);
    };
  }
});
const oe = /* @__PURE__ */ Q(Gt, [["__scopeId", "data-v-d03eaabf"]]);
export {
  oe as default
};
