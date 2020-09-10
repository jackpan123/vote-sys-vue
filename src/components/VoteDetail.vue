<template>
  <div>
      <van-nav-bar title="投票详情" left-text="返回大厅" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {},

  methods: {
    onClickLeft() {
      this.$router.push({ path: "/votingHall" });
    },
  },
};
</script>

<style>
</style>