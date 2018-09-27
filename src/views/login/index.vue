<template>
   <div data-page="login">
      <div class="user-login">
        <h3 style="text-align:center;margin-bottom:25px;">欢迎登录Q校网</h3>
        <el-form :rules="rules" ref="form" :model="form" style="width: 360px;">
          <el-form-item prop="userName">
            <el-input type="text" name="userName" v-model="form.userName" placeholder="请输入用户名">
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
import filterAsyncRouter from "@/utils/filterAsyncRouter";
let routers = [];
export default {
  name: "login",
  data() {
    return {
      form: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // ...mapActions('qxuser' [
    //   'qxLoginByUsername'
    // ]),
    // ...mapActions('account', [
    //   'login',
    //   'qxlogin'
    // ]),
    submit() {
      //console.log(menu);
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch('qxuser/qxLoginByUsername', this.form).then(res => {
            //登录成功
            console.log(res);
            console.log("登录成功");
            if (res.errorCode === 0) {
              //this.$router.push({ path: '/' });
              this.$router.replace({
                path: '/'
              })
            }else if (res.errorCode === -1) {
              this.$message({ message: `${res.errorMsg}`, type: "warning" });
              return false;
            }
          })
          // this.qxLoginByUsername(this.form).then((res) => {
          //   console.log(res);
          // });
          // this.qxlogin({
          //   vm: this,
          //   name: this.form.name,
          //   password: this.form.password
          // }).then(res => {
          //    let data = res.router; //返回的数据信息
          //    let r = filterAsyncRouter(data);
          //    this.$router.addRoutes(r);
          //    this.$router.replace({
          //      path: "/"
          //    })
          // });
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
