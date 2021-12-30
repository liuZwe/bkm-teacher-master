<template>
  <div class="messages_html">
    <ul>
      <li v-for="(val, inde) in messageArr" :key="inde">
        <div class="mess_top">
          <!--   T-color: #55B158;  F-#FF6246 -->
          <div
            class="mess_top_title"
            :style="val.is_success > 0 ? 'color: #55B158' : 'color: #FF6246'"
          >
            {{ val.title }}
          </div>
          <div class="mess_top_time">{{ val.add_time }}</div>
        </div>
        <div class="mess_bottom">
          {{ val.content }}
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "messages",
  data() {
    return {};
  },
  props: ["messageArr"],
};
</script>
<style lang="scss" scoped>
li {
  list-style: none;
}
.messages_html {
  width: 100%;
  height: 100%;
  padding: 20px;
  font-family: PingFang SC;
  box-sizing: border-box;
  li {
    width: 100%;
    // height: 115px;
    background: #ffffff;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 16px;
    .mess_top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .mess_top_title {
        font-weight: 600;
        font-size: 14px;
      }
      .mess_top_time {
        color: #999999;
        font-size: 12px;
        font-weight: 500;
      }
    }
    .mess_bottom {
      margin-top: 14px;
      line-height: 20px;
    }
  }
}
</style>