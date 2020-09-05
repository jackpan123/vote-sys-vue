<template>
  <div>
    <van-nav-bar
      title="投票大厅"
      left-text="返回主页"
      right-text="创建投票"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        @click="viewVote(item.id)"
        v-for="item in list"
        :key="item.id"
        :title="item.voteTitle"
        value="投票进行中"
      />
    </van-list>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 0,
      count: 20,
      total: 0,
    };
  },
  methods: {
    onLoad() {
      this.page++;
      let url = "/vote/v1.0/center?page=" + this.page + "&count=" + this.count;
      this.axios
        .get(url, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          this.total = response.data.total;
          for (let i = 0; i < response.data.items.length; ++i) {
            this.list.push(response.data.items[i]);
          }

          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.page * this.count >= this.total) {
            this.finished = true;
          }
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
      this.$router.push({ path: "/" });
    },
    onClickRight() {
      this.$router.push({ path: "/createVote" });
    },
    viewVote(id) {
      this.axios
        .get("/vote/v1.0/voteDetail/" + id, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
            this.modal.message = "账户未登录";
            this.modal.show = true;
          } else if (error.response.status >= 500) {
            this.modal.message = "服务器繁忙，请稍后尝试";
            this.modal.show = true;
          }
        });
    },
  },
};
</script>

<style>
</style>