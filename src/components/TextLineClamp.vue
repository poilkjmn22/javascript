<template>
  <div class="text-clamp-box">
    <el-popover :content="text" trigger="hover" :disabled="!overflow"
      ><div slot="reference" :style="objStyle" ref="textBox" class="text-box">
        <slot>{{ text }}</slot>
      </div></el-popover
    >
  </div>
</template>
<script setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  getCurrentInstance,
} from "@vue/composition-api";
const vue = getCurrentInstance().proxy;

const props = defineProps({
  row: {
    type: Number,
    default: 2,
  },
  maxWidth: {
    type: [Number, String],
    default: "auto",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const text = ref("");
const overflow = ref(false);
const objStyle = computed(() => {
  const obj = {
    maxWidth: props.maxWidth,
  };
  if (props.disabled === true) {
    return obj;
  }
  if (overflow.value === true) {
    obj.overflow = "hidden";
  }
  return {
    ...obj,
    display: "-webkit-box",
    ["-webkit-box-orient"]: "vertical",
    lineClamp: props.row,
  };
});

const textBox = ref(null);
let observer = null;
function updateTextBox() {
  const el = textBox.value;
  text.value = el.textContent;
  overflow.value = el.clientHeight < el.scrollHeight;
}
function observeTextBox() {
  const callback = function (mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for (let mutation of mutationsList) {
      if (mutation.type === "characterData") {
        updateTextBox();
      }
    }
  };

  observer = new MutationObserver(callback);
  observer.observe(textBox.value, {
    characterData: true,
    subtree: true,
    childList: true,
  });
}
onMounted(() => {
  updateTextBox();
  observeTextBox();
});
onUnmounted(() => {
  observer && observer.disconnect();
});
</script>
<style lang="scss" scoped>
.text-clamp-box {
}
</style>
