<template>
  <div class="tooltip_html">
    <slot></slot>
    <div class="slot_zi">
      <div class="zi_shan"></div>
      <div class="zi_body">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tooltip",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.tooltip_html {
  width: 12px;
  height: 12px;
  cursor: pointer;
  display: flex;
  position: relative;
  z-index: 5;
}
.tooltip_html:hover .slot_zi {
  display: block;
}
.slot_zi {
  position: absolute;
  display: none;
  top: 18%;
  left: 50%;
  transform: translate(-50%, 0%);
  .zi_shan {
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom: 10px solid #f5f5f5;
    margin: 0px auto;
    position: relative;
  }
  .zi_shan::after {
    content: "";
    position: absolute;
    border: 12px solid transparent;
    border-bottom: 12px solid #ffffff;
    top: -9px;
    left: -12px;
  }
  .zi_body {
    width: 392px;
    // height: 233px;
    background: #ffffff;
    box-shadow: 0px 0px 6px rgba(190, 190, 190, 0.4);
    border-radius: 4px;
    padding: 24px 36px;
    box-sizing: border-box;
  }
}
</style>