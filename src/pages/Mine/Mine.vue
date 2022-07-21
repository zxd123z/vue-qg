<template>
    <div class="mine-page">
		<!-- 头像区域 -->
		<div class="mine-head" @click="toLogin">
			<div class="head-left">
				<img class="head-left-image" src="/static/images/empty/defaut_userImg.png" mode="">
			</div>
			<div class="head-right">
				<div class="right-name">{{ userInfo && userInfo.userName ? userInfo.userName : '未登录' }}</div>
				<div class="right-phone">{{userInfo && userInfo.phonenumber ? userInfo.phonenumber : '152xxxx8888'}}</div>
			</div>
		</div>
		<!-- 灰色区域 -->

		<div class="mine-gray"></div>
		<div class="mine-buy-box">
			<!-- 已购 -->
			<div class="mine-buy" @click="toBuy()">
				<div class="buy-image"><img class="buy-image1" src="/static/images/empty/yigou.png" mode=""></div>
				<div class="buy-text">我的课程</div>
				<div class="click"><img class="buy-image2" src="/static/images/empty/mine-right.png" mode=""></div>
			</div>
			<div class="line"></div>
			<!-- 分享 -->
			<div class="mine-buy">
				<div class="buy-image"><img class="buy-image1" src="/static/images/empty/yaoqing.png" mode=""></div>
				<div class="buy-text">邀请分享</div>
				<div class="click"><img class="buy-image2" src="/static/images/empty/mine-right.png" mode=""></div>
			</div>
			<div class="line"></div>
		</div>
		<router-link to="/Login" class="login-out">
            <div class="login-btn">
                {{text}}
            </div>
        </router-link>
	</div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default {
    name:'Mine',
    data() {
        return {
            text:'去登录'
        }
    },
	computed:{
		...mapState('home',{
			token:'token',
			userInfo:'userInfo'
	})
	},
	created() {
		this.getUserInfo()
	},
	// mounted() {
	// 	this.getUserInfo()
	// },
	methods: {
		// 登录后获取用户信息
		getUserInfo(){
			axios.get('api/v1/qgUser/queryUserInfo',{
				headers:{
					'Authorization':localStorage.getItem('user_token')
				}
			}).then(res =>{
				if (res.data.code == 200) {
					this.$store.dispatch('home/userInfo',res.data.user)
					console.log('登陆成功');
					this.text = '退出登录'
				}
			})
		},
		toLogin(){
			this.$router.push({
				name:"Login",
				
			})
		},
		toBuy(){
			this.$router.push({
				name:"Buy",
				
			})
			.catch(()=>{})
		}
	},
}
</script>

<style lang="scss" scoped>
.mine-page {
	width: 100%;
	height: 100%;
	background-color: #fff;
}
// <!-- 头像区域 -->
uni-image {
	width: 0;
	height: 0;
}
.mine-head {
    box-sizing: border-box;
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 99px;
	padding: 23px 0 19px 16px;
	background-image: url('/static/images/adpicture/mine-bg.jpg');
	// background: linear-gradient(-23deg, #1481FF 0%, #4091FF 100%);
	.head-left {
		width: 66px;
		height: 66px;
		
		.head-left-image {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}
	.head-right {
        box-sizing: border-box;
		width: calc(100% - 57px);
		display: flex;
		flex-direction: column;
		padding: 8px 0 13px 17px;
        text-align: left;
		.right-name {
            box-sizing: border-box;
			padding-top: 4px;
			font-size: 15px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #ffffff;
		}
		.right-phone {
            box-sizing: border-box;
			font-size: 14px;
			padding-top: 12px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #ffffff;
		}
	}
}
// <!-- 灰色区域 -->
.mine-gray {
	width: 100%;
	height: 10px;
	background: #f5f5f5;
}
// 已购 分享
.mine-buy {
    box-sizing: border-box;
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	height: 44px;
	font-size: 15px;
	padding: 16px 0 15px 20px;
	font-family: Source Han Sans CN;
	font-weight: 400;
	color: #000000;
	.buy-text {
		padding-left: 10px;
	}
	.buy-image {
		width: 24px;
		height: 24px;
		background: linear-gradient(0deg, #f9fafc 0%, #eff6ff 100%);
		border-radius: 50%;
		.buy-image1 {
			width: 24px;
			height: 24px;
		}
	}
	.click {
		width: 15px;
		height: 19px;
		margin-left: 240px;
		.buy-image2 {
			// background: #000;
			// padding-top: 4px;
			// padding-left: 20px;
			width: 14px;
			height: 14px;
		}
	}
}
.line {
    box-sizing: border-box;
	width: 100%;
	height: 7px;
	border-bottom: 1px solid #f5f5f5;
}
.login-out {
    box-sizing: border-box;
	position: fixed;
	width: 100%;
	bottom: var(--window-bottom);
	display: flex;
	justify-content: center;
	padding-bottom: 30px;
	padding: 30px 16px;

	.login-btn {
		// width: 50%;
		// height: 66px;
		// font-size: 26px;
		// font-weight: 300;
		// color: #1399ff;;
		// text-align: center;
		// line-height: 65px;
		// border: 0.5px solid #1399ff;
		// // border: 0.5px solid #ff0000;
		// border-radius: 33px;
		
		font-family: Source Han Sans CN;
		border-radius: 20px;
		border: none;
		padding:12px 101px;
		text-align: center;
		font-size: 16px;
		color:#FFFFFF;
		// line-height: 80px;
		background: linear-gradient(270deg, #34C8FD, #6480FF);
        box-sizing: border-box;
	}
}

</style>