<template>
  <div data-page="login">
    <div class="user-login">
      <h3 style="text-align:center;margin-bottom:25px;color: rgba(0,0,0,.43);">欢迎使用Q校网屏端系统</h3>
      <el-form :rules="rules" ref="form" :model="form" style="width: 360px;" @submit.native.prevent>
        <el-form-item prop="userName">
          <el-input
            type="text"
            name="userName"
            v-model="form.userName"
            placeholder="请输入用户名"
            :autofocus="true"
          >
            <i slot="prefix" class="el-input__icon el-icon-setting"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" name="password" v-model="form.password" placeholder="请输入密码">
            <i slot="prefix" class="el-input__icon el-icon-setting"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%;" type="primary" native-type="submit" @click="formSubmit">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    formSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("qxuser/qxLoginByUsername", this.form)
            .then(res => {
              //登录成功
              if (res.errorCode === 0) {
                this.$router.replace({
                  path: "/"
                });
              } else if (res.errorCode === -1) {
                this.$message({ message: `${res.errorMsg}`, type: "warning" });
                return false;
              }
            });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
div[data-page="login"] {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(240, 242, 245);
  background-image: url("../../assets/TVYTbAXWheQpRcWDaDMu.svg");
}
</style>
