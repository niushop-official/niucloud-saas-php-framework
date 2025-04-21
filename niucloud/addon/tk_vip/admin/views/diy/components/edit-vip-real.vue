
<template>
  <!-- 内容 -->
  <div class="content-wrap" v-show="diyStore.editTab == 'content'">
    <div class="edit-attr-item-wrap">
      <h3 class="mb-[10px]">无需设置</h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { t } from "@/lang";
import useDiyStore from "@/stores/modules/diy";
import { img } from "@/utils/common";
import { ref, reactive } from "vue";

const diyStore = useDiyStore();
diyStore.editComponent.ignore = ["componentBgColor", "componentBgUrl"]; // 忽略公共属性

const selectStyle = reactive({
  title: diyStore.editComponent.styleName,
  value: diyStore.editComponent.style,
});

// 风格样式
const showDialog = ref(false);

const showStyle = () => {
  showDialog.value = true;
  selectStyle.title = diyStore.editComponent.styleName;
  selectStyle.value = diyStore.editComponent.style;
};

const styleList = reactive([
  {
    url: "static/resource/images/diy/member/member_level_style1.jpg",
    title: "风格1",
    value: "style-1",
  },
  {
    url: "static/resource/images/diy/member/member_level_style2.png",
    title: "风格2",
    value: "style-2",
  },

  {
    url: "static/resource/images/diy/member/member_level_style4.png",
    title: "风格3",
    value: "style-4",
  },
]);

const changeStyle = (item: any) => {
  selectStyle.title = item.title;
  selectStyle.value = item.value;
};

const confirmStyle = () => {
  diyStore.editComponent.styleName = selectStyle.title;
  diyStore.editComponent.style = selectStyle.value;
  showDialog.value = false;
};

defineExpose({});
</script>

<style lang="scss" scoped></style>
