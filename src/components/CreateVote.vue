<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        rows="2"
        autosize
        label="投票主题"
        type="textarea"
        maxlength="200"
        placeholder="请输入投票主题"
        show-word-limit
      />
      <div style="margin: 16px" v-for="(option,index) in optionArray" :key="index">
        <van-row type="flex" justify="center">
          <van-col span="2">
            <van-icon size="26" name="close" />
          </van-col>
          <van-col span="22">
            <van-field
              name="option.itemContext"
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
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
    data() {
        return {
            optionId: 1,
            optionArray: [
                {
                    id: 0,
                    itemContext: "",
                },
                {
                    id: 1,
                    itemContext: "",
                }
            ]
        }
    },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    addOption() {
        this.optionArray.push({
            id: this.optionId++,
            itemContext: "",
        });
    },
  },
};
</script>

<style>
</style>