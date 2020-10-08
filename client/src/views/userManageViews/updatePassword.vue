<template>
  <el-container>
    <el-main>
      <div>
        <p>输入原密码</p>
        <el-input
          v-model="form.old_password"
          placeholder="请输入内容"
        ></el-input
        ><br />
        <p>输入新密码</p>
        <el-input
          v-model="form.new_password"
          placeholder="请输入内容"
        ></el-input
        ><br />
        <el-button @click="cleanForm">清空</el-button>
        <el-button type="primary" @click="confirmForm">确定</el-button>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      form: {
        old_password: "",
        new_password: "",
      },
    };
  },
  methods: {
    cleanForm() {
      (this.old_password = ""), (this.new_password = "");
    },
    confirmForm() {
      this.$axios.post("/user/updatepass", this.form).then((res) => {
        if (res.data.flag) {
          (this.old_password = ""), (this.new_password = "");
          alert("修改成功");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>