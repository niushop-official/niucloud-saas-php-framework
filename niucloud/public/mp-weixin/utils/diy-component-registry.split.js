"use strict";
const MERGED_REGISTRY = require("../components/diy-dynamic-bridge/diy-registry.merged.js");

function toMeta(name, raw) {
  if (!raw) return null;
  return {
    vueComponentName: name,
    scope: raw.scope || (raw.addonKey ? "addon" : "app"),
    folder: raw.folder,
    addonKey: raw.addonKey,
    scrollBool: !!raw.scrollBool,
    formRef: !!raw.formRef
  };
}

exports.resolveDiyMeta = function (componentName) {
  if (!componentName) return null;
  return toMeta(componentName, MERGED_REGISTRY[componentName]) || null;
};

exports.listDiyComponentNames = function () {
  return Object.keys(MERGED_REGISTRY || {});
};
