<template>
  <div>
    <van-nav-bar title="创建投票" left-text="返回" left-arrow @click-left="onClickLeft" />
    <Modal :show="modal.show" :title="modal.title" @hideModal="hideModal" @submit="submit">
        <p>{{ modal.message }}</p>
    </Modal>
    <van-form @submit="onSubmit">
      <van-field
        rows="2"
        v-model="voteIncrementDTO.voteTitle"
        name="voteTitle"
        autosize
        label="投票主题"
        type="textarea"
        maxlength="200"
        placeholder="请输入投票主题"
        show-word-limit
      />
      <div style="margin: 16px" v-for="(option,index) in voteIncrementDTO.voteItemList" :key="index">
        <van-row type="flex" justify="center">
          <van-col @click="removeOption(option)" span="4">
            <van-button plain size="small" icon="close" type="info" />
          </van-col>
          <van-col span="20">
            <van-field
              v-model="option.itemContext"
              placeholder="输入选项"
              :rules="[{ required: true, message: '输入选项' }]"
            />
          </van-col>
        </van-row>
      </div>
      <div style="margin: 16px">
        <van-button plain icon="add-o" size="normal" type="info" @click="addOption">添加选项</van-button>
      </div>
      <div style="margin: 16px">
        <van-cell center title="投票项多选">
          <template #right-icon>
            <van-switch v-model="voteIncrementDTO.multiChoice" size="24" />
          </template>
        </van-cell>
        <van-cell center title="匿名投票">
          <template #right-icon>
            <van-switch v-model="voteIncrementDTO.anonymous" size="24" />
          </template>
        </van-cell>
        <van-cell is-link @click="showPopup" title="投票截止时间" :value="voteEndString"></van-cell>
        <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
          <van-datetime-picker
            v-model="voteIncrementDTO.voteEnd"
            type="datetime"
            title="投票截止时间"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="cancel"
            @confirm="confirm"
          />
        </van-popup>
      </div>

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import moment from "moment";
import { Toast } from "vant";
export default {
  data() {
    return {
      voteEndString: "",
      show: false,
      minDate: new Date(),
      maxDate: new Date(2025, 10, 1),
      optionId: 2,
      voteIncrementDTO: {
        voteTitle: "",
        voteItemList: [
          {
            id: 0,
            itemContext: "",
          },
          {
            id: 1,
            itemContext: "",
          },
        ],
        multiChoice: "false",
        anonymous: "false",
        voteEnd: new Date(),
      },
      modal: {
        title: "友情提示",
        show: false,
        message: "",
      },
    };
  },
  components: {
    Modal,
  },
  methods: {
    onSubmit() {
      this.axios
        .post("/vote/v1.0/increment", this.voteIncrementDTO)
        .then((response) => {
          console.log(response);
            this.modal.message = "创建投票成功";
            this.modal.show = true;
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.modal.message = "投票信息格式错误";
            this.modal.show = true;
          }
        });
    },
    addOption() {
      this.voteIncrementDTO.voteItemList.push({
        id: this.optionId++,
        itemContext: "",
      });
    },
    removeOption(option) {
      let index = this.voteIncrementDTO.voteItemList.indexOf(option);
      if (this.voteIncrementDTO.voteItemList.length > 2) {
        if (index !== -1) {
          this.voteIncrementDTO.voteItemList.splice(index, 1);
        }
      }
    },
    showPopup() {
      this.show = true;
    },

    cancel() {
      this.show = false;
      this.voteIncrementDTO.voteEnd = new Date();
      console.log(this.show);
    },
    confirm(value) {
      this.show = false;
      this.voteEndString = this.format_date(value);
      console.log(value);
    },
    format_date(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD HH:mm");
      }
    },
    onClickLeft() {
      Toast("返回");
      this.$router.push({ path: "/votingHall" });
    },
    hideModal() {
      // 取消弹窗回调
      this.modal.show = false;
    },
    submit() {
      // 确认弹窗回调
      this.modal.show = false;
    },
  },
};
</script>

<style>
</style>