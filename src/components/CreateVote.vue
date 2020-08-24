<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        rows="2"
        v-model="voteTitle"
        name="voteTitle"
        autosize
        label="投票主题"
        type="textarea"
        maxlength="200"
        placeholder="请输入投票主题"
        show-word-limit
      />
      <div style="margin: 16px" v-for="(option,index) in optionArray" :key="index">
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
            <van-switch v-model="multiChoice" size="24" />
          </template>
        </van-cell>
        <van-cell center title="匿名投票">
          <template #right-icon>
            <van-switch v-model="anonymous" size="24" />
          </template>
        </van-cell>
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          title="投票截止时间"
          :min-date="minDate"
          :max-date="maxDate"
        />
      </div>

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      multiChoice: "false",
      anonymous: "false",
      voteTitle: "",
      optionId: 1,
      optionArray: [
        {
          id: 0,
          itemContext: "",
        },
        {
          id: 1,
          itemContext: "",
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("date", this.currentDate);
      console.log("submit", this.voteTitle);
      console.log("submit", this.optionArray[0]);
    },
    addOption() {
      this.optionArray.push({
        id: this.optionId++,
        itemContext: "",
      });
    },
    removeOption(option) {
      let index = this.optionArray.indexOf(option);
      if (this.optionArray.length > 2) {
        if (index !== -1) {
          this.optionArray.splice(index, 1);
        }
      }
    },
  },
};
</script>

<style>
</style>