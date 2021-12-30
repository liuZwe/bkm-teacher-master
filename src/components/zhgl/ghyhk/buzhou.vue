<template>
  <div class="step">
        <div class="step1" >
          <span :class="{ active1: progress === 1 }">1</span>
          <span :class="{ activeText: progress === 1 }">更换银行卡账户信息</span>
          <div class="line"></div>
        </div>
<!--    <div class="step1 " >-->
<!--      <span class="actived">1</span>-->
<!--      <span class="activetext1">更换银行卡账户信息</span>-->
<!--      <div class="line"></div>-->
<!--    </div>-->
    <div class="step2">
      <span :class="{ active1: progress === 2 }">2</span>
      <span :class="{ activeText: progress === 2 }">提交审核</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "step",
    props: {
      progress: {
        default: 1,
        type: Number
      }
    }
  }
</script>

<style scoped lang="scss">
  .step {
    display: flex;
    height: 86px;
    /*background: #F5F5FA;*/
    opacity: 1;
    border-radius: 10px 10px 0px 0px;
    align-items: center;
    position: relative;
    padding:0 74px;
    justify-content: center;
    div {
      white-space: nowrap;
      display: flex;
      align-items: center;
      span {
        &:nth-child(1) {
          display: block;
          width: 31px;
          height: 31px;
          border-radius: 50%;
          opacity: 1;
          text-align: center;
          line-height: 31px;
          border:1px solid #C8C8D3;
          color: #C8C8D3;
        }
        &:nth-child(2) {
          font-size: 16px;
          font-weight: 700;
          color: #C8C8D3;
          line-height: 22px;
          opacity: 1;
          margin-left: 10px;
          margin-right: 18px;
        }
      }

      .line{
        width: 92px;
        height: 0px;
        border: 1px solid #C8C8D3;
        opacity: 1;
        margin-right: 10px;
      }

    }
    .activeText {
      color: #FF6246!important;
    }
    .active1{
      background: #FF6246;
      border: none!important;
      color: white!important;
    }

  }
</style>