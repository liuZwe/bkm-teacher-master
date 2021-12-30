<template>
  <div class="stepThree">
      <p class="textP">
        <i class="el-icon-success"></i>
        <span class="successText">提交成功，请耐心等待审核结果</span>
      </p>
      <p class="desText">审核结果将在24小时内通过系统消息通知，如有疑问</p>
      <p class="desText">请联系微信公众号：备考猫</p>
      <button class="btn" @click="understand">我知道了</button>
  </div>
</template>

<script>
export default {
    data: () => ({

    }),
    methods: {
        understand() {
            this.$emit("hide")
            // this.centerDialogVisible3 = true;
        }
    }
};
</script>

<style lang="scss" scoped>
.stepThree {
    // margin-top: 140px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.btn {
    width: 180px;
    height: 40px;
    background: #FF6246;
    opacity: 1;
    border-radius: 5px;
    border: none;
    font-size: 16px;
    font-weight: 600;
    line-height: 40px;
    color: #FFFFFF;
    display: block;
    margin-top: 140px;
    cursor: pointer;
}
.desText {
    &:nth-child(1) {
        margin-top: 36px;
    }
    font-size: 16px;
    font-weight: 400;
    line-height: 35px;
    color: #9E9EA6;
    text-align: center;
}
$color: #40DA97;
::v-deep .el-icon-success{
    color: $color;
    font-size: 60px;
}
.textP {
    display: flex;
    justify-content: center;
    align-content: center;
}
.successText {
    margin-left: 28px;
    color: $color;
    line-height: 60px;
    font-size: 28px;
    font-weight: 600;
    // line-height: 28px;
    color: #40DA97;
}
</style>
