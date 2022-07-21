
<template>
    <div class="center-page">
		<div class="top-height">
			<!-- 时间统计 -->
			<div class="course-time">
				<div class="title">我的学习</div>
				<div class="course-time-block">
					<div class="time-item">
						<div class="time-number">0</div>
						<div>总课时</div>
					</div>
					<div class="time-item after">
						<div class="time-number">0</div>
						<div>已上课时</div>
					</div>
					<div class="time-item after">
						<div class="time-number">0</div>
						<div>剩余课时</div>
					</div>
					<div class="time-item after">
						<div class="time-number">0</div>
						<div>赠送课时</div>
					</div>
				</div>
			</div>
			<!-- 课程标题 -->
			<div class="course-title"><div class="title">我的课程记录</div></div>
		</div>
		<!-- 学习中心课程列表 -->
		<!--  -->

			<div class="courser-list">
				<Empty v-if="isLogin == false"/>
				<div class="list-item" v-if="isLogin == true">
					<div class="left-img"><img class="leftimg" src="/static/images/empty/course.png" mode=""></div>
					<div class="item-content">
						<div class="item-title twoline">课程标题咏春拳咏春拳题咏春拳咏春拳</div>
						<div class="item-describe">课程教练：咏春拳</div>
						<div class="item-classtime">上课时间：111</div>
                        <!-- {{ item.createTime ? item.createTime.split('T')[0] : '-' }} -->
						<div class="delete">已销1课时</div>
					</div>
				</div>
			</div>
	
	</div>
</template>

<script>
import Empty from "../../components/Empty/Empty.vue";
import {mapState} from 'vuex'
import axios from 'axios';
export default {
    name:'Center',
	data() {
		return {
			courseList:[],
			isLogin:false
		}
	},
	components:{
		Empty
	},
	computed:{
		...mapState({
			token:'token'
		})
	},
	created() {
		this.getCourseList()
	},
	methods: {
		getCourseList(){
			axios.get('api/v1/goodsBill/list',{
				headers:{
					'Authorization':localStorage.getItem('user_token')
				}
			}).then(res =>{
				if (res.status == 200) {
                this.courseList = res.data.data.records;
				if (this.courseList.length == 0) {
					this.isLogin = false
				}else{
					this.isLogin = true
				}
				
                console.log(this.courseList);
            } else {
                console.log('获取已购课程失败');
				this.isLogin = false
            }
			}).catch(()=>{})
		}
	},
	
   
}
</script>

<style lang="scss" scoped>
   
	.center-page{
        box-sizing: border-box;
        width: 100%;
		padding-bottom: 55px;
        background-color: #fff;
	}
	// 课程时间
	.course-time{
		position: relative;
		width: 100%;
		height: 168px;
		background:url('/static/images/adpicture/learn-bg.png') no-repeat;
		background-size: 100% 140px;
		.title{
            box-sizing: border-box;
			width: 100%;
			// height: 230px;
			// background-color: #418DFB;
			font-size: 22px;
			font-family: PingFang SC;
			font-weight:500;
			color: #FEFEFE;
			padding: 23px 0 0 20px;
            text-align: left;
			// border-radius: 0 0 11% 11%;
		}
		.course-time-block{
			
			width: 347px;
			height: 87px;
			box-shadow: 0px -2px 13px 1px rgba(132, 127, 127, 0.19);
			background-color: #fff;
			box-sizing: border-box;
			padding: 27px 14px 26px;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			text-align: center;
			position: absolute;
			top: 70px;
			left: 14px;
			.time-item{	
                box-sizing: border-box;
				display: flex;
				flex-direction: column;
				font-size: 10px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
				.time-number{
					font-size: 18px;
					font-family: PingFang SC;
					font-weight: bold;
					color: #338AFB;
				}
			}
			.after{
				position: relative;
			}
			.after::after{
				position: absolute; /*绝对定位*/
				top: 50%; /*Y轴方向偏移自身高度的50%*/
				transform: translatey(-40%); /*Y轴方向偏移微调*/
				left: -20px; /*紧靠容器左边缘*/
				content: ''; /*伪元素需要有内容才能显示*/
				width: 1px; /*伪元素宽度*/
				height: 14px; /*伪元素高度*/
				background-color:rgba(132, 127, 127, 0.19) ; /*伪元素颜色*/
			}
		}
	}
	// 课程标题
	.course-title{
        box-sizing: border-box;
		font-size: 15px;
		font-family: PingFang SC;
		font-weight: bold;
		color: #313234;
		line-height: 43px;
		padding: 0 0 0px 30px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		.title{
			position: relative;
			padding-top: 2px;
            text-align: left;
		}
		.title::before{
            box-sizing: border-box;
			position: absolute; /*绝对定位*/
			top: 50%; /*Y轴方向偏移自身高度的50%*/
			transform: translatey(-40%); /*Y轴方向偏移微调*/
			left: -12px; /*紧靠容器左边缘*/
			content: ''; /*伪元素需要有内容才能显示*/
			width: 5px; /*伪元素宽度*/
			height: 17px; /*伪元素高度*/
			border-radius: 3px;
			background-color:#0B9CFE; /*伪元素颜色*/
		}
	}
	// 课程列表
	.courser-list{
        box-sizing: border-box;
		// width: 100%;
		// display: flex;
		// flex-direction: column;
		.list-item{
            box-sizing: border-box;
			flex: auto;
			display: flex;
			width: 100%;
			height: 130px;
			padding: 13px 15px 15px;
			border-bottom: 1px solid #E5E5E5;
				.left-img{
					// float: left;
					width: 122px;
					height: 100px;
					border-radius: 5px;
					.leftimg{
						width: 122px;
						height:100px;
						background-color: #efefef;
					}
				}
				.item-content{
                    box-sizing: border-box;
					position: relative;
					display: flex;
					flex-direction: column;
					// width: 337px;
					width: calc(100% - 122px);
					height: 100px;
					// float: left;
					padding-left: 10px;
                    text-align: left;
					.item-title{
						font-size: 16px;
                        line-height: 24px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #312F32;
					}
					.item-describe{
						// display: block;
						font-size: 13px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #8A8A8A;
						// line-height: 24px;
						padding-top: 13px;
					}
					.item-classtime{
						// display: block;
						font-size: 13px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #8A8A8A;
						line-height: 12px;
						padding-top: 9px;
						
					}
					.delete{
						position: absolute;
						left: 156px;
						top: 74px;
						width: 75px;
						height: 26px;
						text-align: center;
						font-size: 12px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #B7B7B7;
						line-height: 26px;
						background: #EAEAEA;
						border-radius: 13px;
					}
				}
		}
		
	}
	
</style>