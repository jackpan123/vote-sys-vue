<template>
  <div>
      <van-nav-bar title="投票详情" left-text="返回大厅" left-arrow @click-left="onClickLeft" />
      <van-cell title="投票标题" :value="voteTitle" />
      <van-cell v-for="item in voteItemList" :key="item" :title="item" value="内容" />
      <van-cell-group>
        
        
      </van-cell-group>
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
      voteTitle: "",
      voteItemList: []
    };
  },

  created () {
    this.fetchData();
  },

  methods: {
    fetchData() {
      console.log("fdafa");
      console.log(this.id);

      this.axios
        .get("vote/v1.0/voteDetail/" + this.id, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          console.log(response)
          this.voteTitle = response.data.voteTitle
          this.voteItemList.push(response.data.voteItem)
          // this.total = response.data.total;
          // for (let i = 0; i < response.data.items.length; ++i) {
          //   this.list.push(response.data.items[i]);
          // }

          
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
            Toast("账户未登录");
          } else if (error.response.status >= 500) {
            Toast("服务器繁忙，请稍后尝试");
          }
        });
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