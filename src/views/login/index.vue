<template>
   <div data-page="login">
      <div class="user-login">
        <h3 style="text-align:center;margin-bottom:25px;">欢迎登录Q校网</h3>
        <el-form :rules="rules" ref="form" :model="form" style="width: 360px;">
          <el-form-item prop="name">
            <el-input type="text" name="name" v-model="form.name" placeholder="请输入用户名">
              <i slot="prefix" class="el-input__icon el-icon-date"></i>
            </el-input>
          </el-form-item>           
          <el-form-item prop="password">
            <el-input type="password" name="password" v-model="form.password" placeholder="请输入密码">
              <i slot="prefix" class="el-input__icon el-icon-setting"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width:100%;" type="primary" @click="submit">登 陆</el-button>
          </el-form-item>               
        </el-form>     
      </div>        
   </div> 
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      form: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions('account', [
      'login',
      'qxlogin'
    ]),
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.qxlogin({
            vm: this,
            name: this.form.name,
            password: this.form.password
          });
          // this.login({
          //   vm: this,
          //   name: this.form.name,
          //   password: this.form.password
          // });
        }
      });
    },
  },
  created() {
    console.log(this.$store);
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
div[data-page="login"] {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgb(240, 242, 245);
  background-image: url("../../images/TB1kOoAqv1TBuNjy0FjXXajyXXa-600-600.png");
  background-origin: 0 0;
}
.user-login {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 10;
  transform: translate(-50%,-50%);
}
</style>
