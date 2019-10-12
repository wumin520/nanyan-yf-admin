<template>
  <div class="login_bg_">
    <div class="top_header_">
      <img class="logo_" src="../assets/logo1.png" />
    </div>
    <div class="login_container_">
      <div class="login_title_">
        登录
        <a-divider class="line_"></a-divider>
      </div>
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
              'userName',
              {
                rules: [{ required: true, message: '请输入用户名/手机号!' }]
              }
            ]"
            placeholder="请输入用户名/手机号"
            size="large"
          >
            <a-icon slot="suffix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'passWord',
              {
                rules: [{ required: true, message: '请输入密码' }]
              }
            ]"
            type="password"
            placeholder="请输入密码"
            size="large"
          >
            <a-icon slot="suffix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'verificationCode',
              {
                rules: [{ required: true, message: '请输入验证码' }]
              }
            ]"
            placeholder="请输入验证码"
            size="large"
          >
            <!-- <a-icon slot="suffix" type="lock" style="color: rgba(0,0,0,.25)" /> -->
          </a-input>
          <img class="veri_code_" :src="url" @click="changeImgCode"/>
        </a-form-item>
        <a-form-item>
          <!-- <a-checkbox
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true
              }
            ]"
          >
            记住用户名
          </a-checkbox>
          <a class="login-form-forgot" href="">
            记住密码
          </a> -->
          <!-- <a-divider></a-divider> -->
          <a-button
            size="large"
            type="primary"
            html-type="submit"
            class="login-form-button"
          >
            立即登录
          </a-button>
          <!-- 或者
          <a href="">
            立即注册!
          </a> -->
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api";
import { setLogined, cacheUserInfo } from "@/utils/authorized";

export default {
  data () {
    return {
      url: "/api/backstage/user/getVerificationCode/authority"
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  mounted () {
    this.url = "/api/backstage/user/getVerificationCode/authority?" + this.$route.params.num || 80;
  },
  methods: {
    changeImgCode () {
      var num=Math.ceil(Math.random()*10);
      this.url = "/api/backstage/user/getVerificationCode/authority?" + num;
    },
    login(params) {
      api
        .userLogin({
          ...params,
          formEncode: true
        })
        .then(res => res.data)
        .then(data => {
          cacheUserInfo(data.content);
          setLogined(1);
          let path = "/bxOrder";
          if (this.$route.query.redirect) {
            path = this.$route.query.redirect;
          }
          this.$router.push(path);
        }).catch((err) => {
          if(err.data.returnCode !== '0000'){
            this.changeImgCode()
          }
        })
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.login(values);
        }
      });
    }
  }
};
</script>
<style lang="scss">
.login_bg_ {
  height: 100%;
  overflow: hidden;
  background: url("../assets/home_bg.png") no-repeat;
  background-size: 100% 100%;
  background-position: top left;
  .top_header_ {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.8);
    padding: 12px 0 0 43px;
    height: 60px;
    // margin-bottom: 60px;

    .logo_ {
      width: 121px;
      height: auto;
    }
  }
  display: flex;
  justify-content: center;
  align-items: center;
}
.login_container_ {
  width: 438px;
  padding: 31px 58px 0;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0px 5px 20px 0px rgba(121, 118, 118, 0.3);
  * {
    box-sizing: border-box;
  }
  .login_title_ {
    text-align: center;
    font-size: 29px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #1890ff;
    margin-bottom: 32px;
    .line_ {
      width: 29px !important;
      min-width: 29px;
      height: 9px;
      background: #1890ff;
      margin: 0 auto;
    }
  }
  .veri_code_ {
    width: 70px;
    height: 31px;
    background: rgba(239, 242, 255, 1);
    position: absolute;
    top: 50%;
    z-index: 2;
    transform: translateY(-50%);
    line-height: 0;
    right: 12px;
  }
}
// #components-form-demo-normal-login .login-form {
//   max-width: 300px;
// }
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  // display: block;
  width: 100%;
  // width:240px;
  // height:60px;
  background: #1890ff;
  border: 1px solid #1890ff;
  // border-radius:6px;
  margin: 0 auto;
  // font-size:30px;
  // font-family:Source Han Sans CN;
  // font-weight:400;
  // color:rgba(255,255,255,1);
}
</style>
