import { ref as s, computed as p, onMounted as w, nextTick as c, onActivated as v, onBeforeUnmount as h } from "vue";
function b() {
  const a = s(), i = s(0), d = p(() => i.value ? { height: `${i.value}px` } : void 0);
  let o = null, r = 0;
  const g = () => {
    const e = a.value;
    if (!e)
      return;
    const n = e.closest(".el-scrollbar__wrap"), m = (n == null ? void 0 : n.getBoundingClientRect().bottom) ?? window.innerHeight, u = e.parentElement && Number.parseFloat(window.getComputedStyle(e.parentElement).paddingBottom) || 0, l = Math.floor(m - e.getBoundingClientRect().top - u);
    l > 0 && (i.value = l);
  }, t = () => {
    window.cancelAnimationFrame(r), r = window.requestAnimationFrame(g);
  };
  return w(async () => {
    var n;
    await c(), t(), window.addEventListener("resize", t);
    const e = (n = a.value) == null ? void 0 : n.closest(".el-scrollbar__wrap");
    e && (o = new ResizeObserver(t), o.observe(e));
  }), v(() => {
    c(t);
  }), h(() => {
    window.removeEventListener("resize", t), o == null || o.disconnect(), window.cancelAnimationFrame(r);
  }), {
    pageRef: a,
    pageStyle: d,
    /** 容器或内容变化后可手动触发重新计算 */
    refreshTablePageHeight: t
  };
}
export {
  b as u
};
