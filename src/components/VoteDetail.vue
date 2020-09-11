<template>
  <div>
      <van-nav-bar title="投票详情" left-text="返回大厅" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  props: [
    "id"
  ],
  data() {
    return {

    };
  },

  created () {
    this.fetchData();
  },

  methods: {
    fetchData() {
      console.log("fdafa");
      console.log(this.id);
    },
    onClickLeft() {
      Toast("大厅");
      this.$router.push({ path: "/votingHall" });
    },
  },
};
</script>

<style>
</style>