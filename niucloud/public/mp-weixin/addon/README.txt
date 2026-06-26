将插件包放在此目录下，每个插件一个子目录，例如：

  mp-addons/shop/components/diy-dynamic-bridge-shop/...
  mp-addons/shop/manifest.json (含 diyBridge.registry)

然后在框架根目录执行（无需 uni 源码，纯拷贝合并）：
  node merge-mp-addon.cjs
  node merge-mp-addon.cjs shop pintuan
