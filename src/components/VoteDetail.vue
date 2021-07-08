<template>
  <div>
    <van-nav-bar
      title="投票详情"
      left-text="返回大厅"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell title="投票标题" :value="voteTitle" />
    <div v-if="voteStatus == 1">
      <van-cell title="剩余投票时间">
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
    <div style="margin: 16px;">
        <van-row type="flex" justify="center">
          <van-button type="primary" @click="submitVote" >提交投票</van-button>
        </van-row>
        
      </div>
    </div>
    <div v-else>
      <div>
        <ve-line :data="chartData"></ve-line>
      </div>
    </div>
    
  </div>
</template>

<script>
import { Toast } from "vant";
import { VeLine } from "v-charts";
export default {
  components: {
    VeLine
  },
  props: ["id"],
  data() {
    return {
      voteTitle: "",
      voteItemList: [],
      result: [],
      radio: "",
      multiChoice: 0,
      time: 30 * 60 * 60 * 1000,
      submitVoteResult: {
        voteId: "",
        voteItemId: ""
      },
      voteStatus: 1,
      chartData: {
            columns: ['日期', '销售额'],
            rows: [
              { '日期': '1月1日', '销售额': 123 },
              { '日期': '1月2日', '销售额': 1223 },
              { '日期': '1月3日', '销售额': 2123 },
              { '日期': '1月4日', '销售额': 4123 },
              { '日期': '1月5日', '销售额': 3123 },
              { '日期': '1月6日', '销售额': 7123 }
            ]
          }
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      console.log(this.id);

      this.axios
        .get("vote/v1.0/voteDetail/" + this.id, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          let data = response.data.message;
          this.voteTitle = data.voteTitle;
          let itemJson = JSON.parse(data.voteItem);
          this.voteItemList = itemJson;
          this.multiChoice = data.multiChoice;
          let differ = Date.parse(data.voteEnd) - Date.now();
          if (differ > 0) {
            this.time = differ;
          } else {
            Toast("投票已结束");
            this.voteStatus = 0;
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

        this.axios
        .get("vote/v1.0/getVoteItems/" + this.id, {
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
      this.submitVoteResult.voteItemId = index;
    },
    submitVote() {
      this.submitVoteResult.voteId = this.id;

      this.axios
        .post("vote/v1.0/submitVote/", this.submitVoteResult, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          console.log(response);
          Toast("提交投票成功");
        })
        .catch((error) => {
          if (error.response.status === 401) {
            Toast("账户未登录");
          } else if (error.response.status >= 500) {
            Toast("服务器繁忙，请稍后尝试");
          }
        });
    }
  },
};
</script>

<style>
</style>