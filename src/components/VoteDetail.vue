<template>
  <div>
    <van-nav-bar
      title="投票详情"
      left-text="返回大厅"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell title="投票标题" :value="voteTitle" />
    <van-cell title="剩余投票时间" >
      <van-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
    </van-cell>
    <div v-if="multiChoice == 0">
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell
            v-for="item in voteItemList"
            :key="item.id"
            :title="`选项： ${item.itemContext}`"
            clickable
            @click="radioClick(item.id)"
          >
            <template #right-icon>
              <van-radio :name="item.id" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div v-else>
      <van-checkbox-group v-model="result">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in voteItemList"
            clickable
            :key="item.id"
            :title="`选项： ${item.itemContext}`"
            @click="toggle(index)"
          >
            <template #right-icon>
              <van-checkbox :name="item" shape="square" ref="checkboxes" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  props: ["id"],
  data() {
    return {
      voteTitle: "",
      voteItemList: [],
      result: [],
      radio: "",
      multiChoice: 0,
      time: 30 * 60 * 60 * 1000,
    };
  },

  created() {
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
          console.log(response);
          this.voteTitle = response.data.voteTitle;
          let itemJson = JSON.parse(response.data.voteItem);
          this.voteItemList = itemJson;
          this.multiChoice = response.data.multiChoice;
          let differ = Date.parse(response.data.voteEnd) - Date.now()
          if (differ > 0) {
            this.time = differ
          } else {
            Toast("投票已结束");
            this.$router.push({ path: "/votingHall" });
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
      Toast("大厅");
      this.$router.push({ path: "/votingHall" });
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
      console.log(this.result);
    },
    radioClick(index) {
      this.radio = index;
      console.log(index);
    },
  },
};
</script>

<style>
</style>