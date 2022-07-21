<template>
  <div class="page_login">
    <div class="login">
      <div class="topLogo">
        <div>验证码登录</div>
        <div class="span">
          <span class="span-text"
            >欢迎来到郑州松科咏春国术馆，未注册的手机号验证通过后将自动注册！</span
          >
        </div>
      </div>
      <!-- input输入框 title-->
      <div class="input-group">
        <div class="input-row" :class="{ 'is-invalid': isErrorPhone }">
          <div class="left">
            <img
              class="img"
              src="/static/images/empty/phone.png"
              mode="aspectFit"
            />

            <input
              class="input"
              maxlength="11"
              type="tel"
              v-model="mobile"
              placeholder="请输入手机号"
              placeholder-style="color:#999999;font-size:14px;margin-top:4px;"
              @input="InputChange($event, 0)"
            />
          </div>
          <div class="right">
            <!-- 验证码 -->
            <button
              class="code-btn"
              :disabled="codeBtnDisabled"
              @click="sendCode()"
            >
              {{ CodeText }}
            </button>
          </div>
        </div>
        <div v-if="isErrorPhone" class="invalid-feedback">
          {{ isErrorPhone }}
        </div>
        <div class="input-row">
          <div class="left">
            <img
              class="img code"
              src="/static/images/empty/password.png"
              mode=""
            />
            <input
              class="input code-input"
              type="number"
              maxlength="6"
			  v-model="code"
              placeholder="请输入验证码"
              placeholder-style="color:#999999; font-size:14px;margin-top:4px;"
              @input="InputChange($event, 1)"
            />
          </div>
        </div>
        <div v-if="isErrorCode" class="invalid-feedback">{{ isErrorCode }}</div>
        <div class="login-btn">
          <div class="subtn">
            <button
              type="primary"
              class="subtn-btn"
              :disabled="disabled"
              @click="loginClick()"
            >
              登录
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      mobile: "15239510249",
      code: "",
      // password: '',
      isErrorPhone: null,
      isErrorCode: null,
      disabled: true,
      CodeText: "验证码",
      CodeNumDown: 60,
      codeBtnDisabled: false,
      loginType: 2, //验证码登录
    };
  },
  mounted() {
    console.log(this.$store);
  },
  methods: {
    // 验证手机号
    checkMobileExist(type, mobile) {
      let obj = {
        event: "login",
        mobile: this.mobile,
      };
      // 发送验证码   同时存储验证到本地，输入验证码的时候进行校验

      axios
        .post("api/v1/sms/aliSend", this.$qs.stringify(obj), {
          headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("codeNum", res.data.data);
            this.downTime(this.CodeNumDown);
          } else {
            console.log("发送验证码失败");
          }
        });
    },
    // 发送验证码倒计时

    downTime(num) {
      if (num === 0) {
        this.codeBtnDisabled = false;
        this.CodeText = "获取验证码";
        num = 60;
        this.CodeNumDown = num;
        return;
      } else {
        this.codeBtnDisabled = true;
        num--;
        this.CodeText = num + "s后发送";
        this.CodeNumDown = num;
      }
      var _this = this;
      setTimeout(function () {
        _this.downTime(num);
      }, 1000);
    },
    // 发送验证码事件
    sendCode() {
      let ph = /^[1][0-9]{10}$/;
      if (ph.test(this.mobile)) {
        this.checkMobileExist(1, this.mobile);
      }
    },
    /**
     * 	输入框值改变 进行输入校验
     *  num:0 手机号
     *  num:1 验证码
     *  num:2 密码
     * */
    InputChange(e, num) {
      switch (num) {
        case 0:
          if (this.mobile) {
            let ph = /^[1][0-9]{10}$/;
            if (ph.test(this.mobile)) {
              this.isErrorPhone = null;
              this.disabledFun();
            } else {
              this.isErrorPhone = "请检查手机号";
              this.disabledFun();
            }
          } else {
            this.isErrorPhone = "请输入手机号";
            this.disabledFun();
          }
          break;
        case 1:
			// 验证码验证
			if (this.code) {
				let codeNum = localStorage.getItem("codeNum")
				if (this.code === codeNum) {
				this.isErrorCode = null;
                this.disabledFun();
			}else{
				this.isErrorCode = "请输入正确的验证码";
       	        this.disabledFun();
			}
			}
			break;
        default:
          break;
      }
    },

    // 校验输入框是否输入完整并正确后开放按钮点击
    disabledFun() {
      // 如果是验证码登录

      if (this.isErrorPhone || this.isErrorCode) {
        this.disabled = true;
      } else {
        this.disabled = true;
        if (this.mobile && this.code) {
          this.disabled = false;
        }
      }
    },
    // 点击登陆
    loginClick() {
      if (this.loginType === 2) {
        let obj = {
          captcha: this.code,
          event: "login",
          mobile: this.mobile,
        };
		axios
        .post("api/v1/qgUser/mobileLogin", this.$qs.stringify(obj), {
          headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("user_token", res.data.token);
			this.$store.dispatch('home/userInfo', res.data.user)
     		this.$store.dispatch('home/usertoken', res.data.token)
			this.$router.push({
				name:"Mine",
				
			})

          } else {
            console.log("登录失败");
          }
        });
       
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page_login {
  position: relative;
  padding: 40px 41px 233px 37px;
  // background-color: #ffaaff;
  height: 100vh;
  .topLogo {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    text-align: left;
    color: #2e2e2e;
    .span {
      // box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      line-height: 16px;
      // height: 53px;
      text-align: left;
      padding: 5px 0 0 0;
      .span-text {
        display: block;
        font-size: 11px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #2e2e2e;
        letter-spacing: normal;
      }
    }
  }
  .login {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  /*input输入框*/
  .input-group {
    padding: 5px 0px 5px 0;

    .input-row {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      // line-height: 100px;
      height: 50px;
      border-bottom: 1px solid #ededed;
      transition: all 0.5s ease-in-out;
      background-size: 120% 100%;
      .left {
        display: flex;
        align-items: center;
        .img {
          width: 21px;
          height: 21px;
        }
        .img.code {
          width: 20px;
          height: 20px;
        }
        .input {
          box-sizing: border-box;
          width: 180px;
          height: 20px;
          font-size: 14px !important;
          font-weight: 400;
          padding-left: 20px;
          outline: none;
        }

        .code-input {
          // width: 200px;
          outline: none;
        }
      }
      .right {
        .code-btn {
          box-sizing: border-box;
          width: 78px;
          height: 23px;
          line-height: 23px;
          font-size: 12px;
          font-weight: 400;
          text-align: center;
          border-radius: 12px;
          color: #409aff;
          // display: block;
          background-color: #ddeeff;
          border-color: #409aff;
        }
      }
    }

    .input-row.is-invalid {
      border-bottom: 2px solid #c7000a;
    }

    .invalid-feedback {
      box-sizing: border-box;
      font-size: 12px;
      color: #c7000a;
      padding-top: 2px;
      padding-left: 10px;
      text-align: left;
    }
  }

  /*登录按钮*/
  .login-btn {
    // box-sizing: border-box;
    padding-top: 118px;

    .subtn {
      // margin-bottom: 467px;

      .subtn-btn {
        box-sizing: border-box;
        font-family: Source Han Sans CN;
        border-radius: 20px;
        border: none;
        padding: 12px 101px;

        margin-bottom: 234px;
        text-align: center;
        font-size: 16px;
        color: #ffffff;
        // line-height: 80px;
        background: linear-gradient(270deg, #34c8fd, #6480ff);
      }
    }

    .tipbtn {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;

      .span-btn {
        color: #666;
        font-size: 14px;
        display: inline-block;
        width: 30%;
        text-align: center;
        position: relative;
      }

      .span-btn:nth-child(1) {
        color: #c7000a;
      }

      .span-btn:nth-child(1)::after {
        position: absolute;
        content: "";
        right: 0;
        top: calc(50% - 5px);
        width: 1px;
        height: 10px;
        background-color: #ccc;
      }
    }
  }
}
</style>