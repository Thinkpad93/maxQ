<template>
   <div data-page="login">
      <el-row :gutter="10">
        <el-col :span="5" :offset="9">
          <el-form :rules="rules" ref="form" :model="form">
            <!-- <el-form-item>
                <h3>欢迎登录Q校网</h3>
            </el-form-item> -->
            <el-form-item prop="name">
                <el-input type="text" name="name" v-model="form.name" placeholder="请输入用户名">
                    <i slot="prefix" class="el-input__icon el-icon-date"></i>
                </el-input>
            </el-form-item>           
            <el-form-item prop="password">
                <el-input type="password" name="password" v-model="form.password" auto-complete="off" placeholder="请输入密码">
                    <i slot="prefix" class="el-input__icon el-icon-setting"></i>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button :loading="loading" style="width:100%;" type="primary" @click="submit">登陆</el-button>
            </el-form-item>               
          </el-form>           
        </el-col>
      </el-row>
   </div> 
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: "login",
  data() {
    return {
      loading: false,
      form: {
        name: "",
        password: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate( valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('adminLogin', this.form).then(res => {
            this.$router.push({ path:'/home' });
          })
        }
      });
    }
  },
  created() {
    console.log(this.$store);
  },
  mounted() {
  }
};
</script>
<style lang="less" scoped>
div[data-page='login'] {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgb(240, 242, 245);  
  background-image: url('../../images/TB1kOoAqv1TBuNjy0FjXXajyXXa-600-600.png');
  background-origin: center center;
  background-repeat: no-repeat;
}
.center-card {
  padding: 0 15px;
  position: absolute;
  left: 50%;
  top: 30%;
  z-index: 11;
  transform: translate(-50%, -30%);
  h3 {
    font-size: 20px;
    text-align: center;
  }  
}
</style>
