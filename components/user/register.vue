<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="登录用户名手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="昵称" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" v-model="form.password" type="password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input placeholder="确认密码" v-model="form.checkPassword" type="password"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      // 表单数据
      form: {
        username: "", //登录用户名/手机
        captcha: "", // 验证码
        nickname: "", // 昵称
        password: "", // 密码
        checkPassword: "" // 确认密码
      },
      // 表单规则
      rules: {
        username: [{ required: true, message: "登录不能为空", trigger: "blur" }],
        captcha: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
        nickname: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
        checkPassword: [{ validator: validatePass, trigger: 'blur' }]
      }
    };
  },
  methods: {
    // 发送手机验证码之前判断手机号码不能为空
    handleSendCaptcha() {
      // 判断手机号码
      if(this.form.username.trim() === ''){
         this.$message.error('手机号码不能为空哦')
         return
      }
         this.$store.dispatch("user/sendCaptcha", this.form.username).then(res=>{
           this.$message.success('验证码已经发生到手机上：000000');
         })
    },

    // 注册
    handleRegSubmit() {
      // console.log(this.form);

      this.$refs.form.validate(valid=>{
        if(valid){
          // props是this.form除了checkPassword以外的其他属性
          const{checkPassword,...props} = this.form;
          this.$store.dispatch('user/register',props).then(res=>{
            if(res){
              this.$message.success('注册成功')
            }
          })
        }
      })
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>