<template>
  <div class="detail-page">
    <div class="datail-share">
      <div class="share-s">
        <img class="share-image" src="/static/images/empty/share.png" />
        <div class="share-span">分享</div>
      </div>
    </div>
    <div class="swiper">
      <Swiper />
    </div>

    <!-- 标题 -->
    <div class="detail-title">
      <!-- <div class="left"> -->
      <div class="top">{{courseDetail.goodsName}}</div>
      <div class="bottom">
        <div class="bottom-nprice">￥{{courseDetail.goodsPrice}}</div>
        <div class="bottom-oprice">￥{{courseDetail.discountPrice}}</div>
        <div class="bottom-btn">
          限时优惠
        </div>
        <div class="bottom-person">
          {{courseDetail.registrationNum}}人报名
        </div>
      </div>
      <!-- </div> -->
    </div>
    <!-- 灰色分隔区 -->
    <div class="grayline"></div>
    <!-- 课程描述 -->
    <div class="detail-description">
      <div class="course-title"><div class="course-t">课程描述</div></div>
      <div class="course-detail">
        <!-- <rich-text :nodes="courseDetail.goodsDetails" class="course-p"></rich-text> -->
        <p class="course-p" v-html="courseDetail.goodsDetails"></p>
      </div>
      <div class="course-title2"><span class="course-t">导师简介</span></div>
      <div class="course-detail">
        <!-- <rich-text :nodes="courseDetail.teacherDetails" class="course-p"></rich-text> -->
        <p class="course-p" v-html="courseDetail.teacherDetails"></p>
      </div>
      <div class="join">
        <img
          class="join-image"
          src="/static/images/adpicture/detail-join.png"
          mode=""
        />
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="footer-btn detail-btn">
      <button class="btn-now" @click="baoMing">立即报名</button>
      <button class="btn-share">分享得奖励</button>
    </div>
    <!-- 分享海报弹窗 -->
    <!-- <u-popup v-model="showShareImg" height="100%" mode="bottom" :safeAreaInsetBottom="true" :mask-click="true">
		
			<qg-content-share :codeString="codeString" :shareImgArr="shareImgArr" :textArr="textArr" @closeSharePopop="closeSharePopop"></qg-content-share>
		</u-popup> -->
    <!-- 登录弹框 -->
    <!-- <u-popup class="popups" mode="center" v-model="show">
			<div class="popup-div">
				<div class="top-img"><img class="popus-image" src="/static/images/empty/key.png" mode=""></div>
				<div class="content">
					<div class="content-title">您还没登录</div>
					<div class="content-msg">请先绑定手机号！</div>
					<div class="content-msg">登录即可获得免费试课的机会。</div>
				</div>
				<div class="btns">
					<div class="closebtn" @tap="close">取消</div>
					<div class="okbtn" @tap="toLogin">确定</div>
				</div>
			</div>
		</u-popup> -->
    <Dialog v-model="showDialog"/>
    <EasyDialog v-model="showEasy"/>
  </div>
</template>

<script>
import Dialog from "../../../components/Dialog/Dialog.vue"
import EasyDialog from "../../../components/easyDialog/easyDialog.vue"
import Swiper from "../../../components/Swiper/Swiper.vue";
import { mapState} from "vuex";
import axios from "axios";
export default {
  components: { Swiper,Dialog,EasyDialog },
  name: "Detail",
  data() {
    return {
      showEasy:false,
      showDialog:false,
      id: this.$route.params.id,
      courseDetail:{}  
    };
  },
  mounted() {
  //  console.log(this.$route.params.id);
  },
  computed: {
    ...mapState({
      token:'token'
    })
  },
 created() {
    this.getcourseDetail();
  },
  methods: {
    getcourseDetail() {
      axios
        .get("/api/v1/goods/getById", {
          params: {
            id: this.id,
          },
        })
        .then(res => {
          if (res.status == 200) {
            this.courseDetail = res.data.data;
            console.log(this.courseDetail);
            
          } else {
          }
        });
      // this.$store.dispatch("home/getCourseDetail",this.param)
    },
    baoMing(){
      let token = localStorage.getItem('user_token')
      if (token == '' || this.$store.state.token == '') {
        this.showDialog = true
      }else{
        // this.showEasy = true
        // let objs = {
				// id: this.id
			  // };
        // axios.post('api/v1/order/creatOrder',this.$qs.stringify(objs),{
        //   headers:{
				// 	'Authorization':localStorage.getItem('user_token')
				// }
        // }).then(res => {
        //   if (res.status == 200) {
        //          this.$router.push({
        //         name:"Buy",
        //         })      
        //   }
        // })
      }
    },
    toBuy(){
     
    }
  },
};
</script>

<style lang="scss" scoped>
page {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
// 详情头部图片
.swiper {
  position: relative;
  width: 100%;
  height: 167px;
  .swiper-item {
    width: 100%;
    height: 167px;
    .img {
      width: 100%;
      height: 167px;
      background-color: #efefef;
    }
  }
}
.datail-share {
  box-sizing: border-box;
  // width: 108px;
  position: fixed;
  right: 0px;
  top: 20px;
  background: #f3f3f3;
  opacity: 0.8;
  z-index: 999;
  border-radius: 20px 3px 3px 20px;

  .share-s {
    display: flex;
    flex-direction: row;
    padding: 7px 5px 5px 11px;

    .share-image {
      width: 13px;
      height: 15px;
    }
    .share-span {
      font-size: 11px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
      // padding-left: 10px;
      // line-height: 47px;
      padding: 0 0 2px 5px;
    }
  }
}
// 标题
.detail-title {
  box-sizing: border-box;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 22px 11px 15px;

  .top {
    box-sizing: border-box;
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    line-height: 23px;
    padding-bottom: 14px;
    text-align: left;
  }
  .bottom {
    box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    width: 100%;
    position: relative;
    .bottom-nprice {
      box-sizing: border-box;
      font-size: 25px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #fc8a26;
      padding-left: 6px;
    }
    .bottom-oprice {
      box-sizing: border-box;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      text-decoration: line-through;
      color: #808080;
      padding: 0 11px 0 12px;
    }
    .bottom-btn {
      
      background: #1399ff;
      border-radius: 9px;
      font-size: 12px;
      transform: scale(0.83, 0.83);
      transform-origin: left;
      *font-size: 10px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      // line-height: 40px;
      // width: 102px;
      // height: 30px;
      padding: 2px 7px;
    }
    .bottom-person {
      position: absolute;
      right: 0;
      top: 12px;
      font-size: 13px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #808080;
      // padding: 96px 0 0 0;
    }
  }
}
// 灰色分割区域
.grayline {
  width: 100%;
  height: 10px;
  background-color: #f5f5f5;
}
// 详情简介
.detail-description {
  box-sizing: border-box;
  // 课程标题
  .course-title {
    text-align: left;
    box-sizing: border-box;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    // line-height: 90px;
    padding: 15px 0 12px 15px;
    .course-t {
      position: relative;
      padding: 2px 0 0 5px;
    }
    .course-t::before {
      position: absolute; /*绝对定位*/
      top: calc(50% - 1px); /*Y轴方向偏移自身高度的50%*/
      transform: translatey(-40%); /*Y轴方向偏移微调*/
      left: -4px; /*紧靠容器左边缘*/
      content: ""; /*伪元素需要有内容才能显示*/
      width: 5px; /*伪元素宽度*/
      height: 17px; /*伪元素高度*/
      border-radius: 2px;
      background-color: #0b9cfe; /*伪元素颜色*/
    }
  }
  .course-title2 {
    text-align: left;
    box-sizing: border-box;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    // line-height: 90px;
    padding: 24px 0 26px 15px;
    .course-t {
      position: relative;
      padding: 2px 0 0 5px;
    }
    .course-t::before {
      position: absolute; /*绝对定位*/
      top: calc(50% - 1px); /*Y轴方向偏移自身高度的50%*/
      transform: translatey(-40%); /*Y轴方向偏移微调*/
      left: -4px; /*紧靠容器左边缘*/
      content: ""; /*伪元素需要有内容才能显示*/
      width: 5px; /*伪元素宽度*/
      height: 17px; /*伪元素高度*/
      border-radius: 2px;
      background-color: #0b9cfe; /*伪元素颜色*/
    }
  }
  //简介
  .course-detail {
    box-sizing: border-box;
    width: 100%;
    padding: 0 20px 0px 20px;
    .course-p {
      // text-align: justify;
      // text-indent: 2em;
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 24px;
      >>> p{
        font-size: 13px;
      }
     >>> img {
      box-sizing: border-box;
      width: 335px;
      height: 215px;
      margin-top: 26px;
    }

    .image-title {
      box-sizing: border-box;
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
      line-height: 23px;
      padding: 8px 0 10px 0;
      text-align: center;
      .title-text {
        // padding-left: 12px;
      }
    }
    }
    
  }
  .join {
    box-sizing: border-box;
    width: 100%;
    padding: 17px 80px 100px 103px;
    .join-image {
      width: 193px;
      height: 182px;
    }
  }
}
.detail-btn {

  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 13px 23px 11px;
  border-top: 1px solid #dcdcdc;
  background-color: #fff;
  .btn-now {
    border: 0;
    width: 100%;
    height: 37px;
    line-height: 37px;
    text-align: center;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #1399ff;
    background: #e0f2ff;
    // padding: 18px 100px;
    border-radius: 19px 0px 0px 19px;
  }
  .btn-share {
    border: 0;
    box-sizing: border-box;
    width: 100%;
    height: 37px;
    line-height: 37px;
    text-align: center;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    background: #1399ff;
    // padding: 18px 85px;
    border-radius: 0px 19px 19px 0px;
  }
}

// 图片分享
/deep/.uni-popup__wrapper.uni-custom.center .uni-popup__wrapper-box {
  background-color: transparent;
  position: relative;
  max-width: 80%;
  max-height: 80%;
  overflow-y: visible;
  .popup {
    width: 100%;
    .icon-close {
      display: block;
      text-align: right;
      margin-right: -30px;
    }
    .QRcode {
      width: 225px;
      display: block;
    }
    .btn-savecode {
      margin: 10px 50px;
      border-radius: 25px;
      font-size: 15px;
    }
  }
}
// 弹窗
.popup-view {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: none;
  width: 293px;
  // height: 614px;
  border-radius: 5px;
  .top-img {
    width: 100%;
    height: 153px;
    padding: 0 55px;
    .popus-image {
      width: 100%;
      height: 100%;
      // margin:0 100px 0 100px ;
    }
  }
  .content {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 210px;
    padding: 5px 48px 25px;
    margin-top: -94px;
    text-align: center;
    background: #ffffff;
    border-radius: 5px 5px 0 0;
    border-bottom: 1px solid #dcdcdc;
    .content-title {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
      padding-top: 85px;
    }
    .content-msg {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999999;
      line-height: 32px;
    }
  }
  .btns {
    background: #ffffff;
    // border-top: 1px solid #dcdcdc;
    display: flex;
    flex-direction: row;
    height: 100px;
    border-radius: 0 0 5px 5px;
    .closebtn {
      width: 50%;
      height: 50px;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #5a5a5a;
      box-sizing: border-box;
      border-right: 1px solid #dcdcdc;
      line-height: 50px;
      text-align: center;
    }
    .okbtn {
      box-sizing: border-box;
      width: 50%;
      height: 50px;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #2795fe;
      line-height: 50px;
      text-align: center;
    }
  }
}
</style>