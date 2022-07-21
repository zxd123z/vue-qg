<template>
  <div class="footer">
    <div class="tabbar">  
      <div class="tolink">
        <img v-if="zhuye" class="imgs" src="./imgs/index-active.png" @click="homeclick" alt="">
        <img v-else class="imgs" @click="homeclick" src="./imgs/index.png"  alt="">
        首页
      </div>
    </div>
   <div class="tabbar">  
      <div class="tolink">
        <img v-if="zhongxin" class="imgs" @click="centerclick" src="./imgs/learn-active.png" alt="">
        <img v-else class="imgs" @click="centerclick" src="./imgs/learn.png" alt="">
        个人中心
      </div>
    </div>
    <div class="tabbar">  
      <div class="tolink">
        <img v-if="wode" class="imgs" @click="wodeclick" src="./imgs/my-active.png" alt="">
        <img v-else class="imgs" @click="wodeclick" src="./imgs/my.png" alt="">
        我的
      </div>
    </div>   
  </div>
</template>

<script>
export default {
    name:'Tabbar',
    data() {
      return {
        zhuye:true,
        zhongxin:false,
        wode:false

      }
    },
    methods: {
      homeclick(){
        // 进行跳转
        this.zhuye = true;
        this.zhongxin = false;
        this.wode = false;
        this.$router.push({
          name:'Home'
        });
      },
      centerclick(){
        // 进行跳转
        this.zhuye = false;
        this.zhongxin = true;
        this.wode = false;
        this.$router.push({
          name:'Center'
        });
      },
      wodeclick(){
        // 进行跳转
        this.zhuye = false;
        this.zhongxin = false;
        this.wode = true;
        this.$router.push({
          name:'Mine'
        });
      },
    },
}
</script>

<style scoped>
  .footer{
    position: fixed;
    bottom: -2px;
    left: 0;
    width:100%;
    height:65px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #fff;
    overflow: hidden;
  
    /* padding: 0 97px; */
  }
  .tabbar{
    width:56px;
    /* height:98px; */
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 0 28px;
  }
  .imgs{
    width: 24px;
    height: 24px;
    padding: 7px;
  }
  .tolink{
    width: 50px;
    height: 22px;
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    /* color: #207DFF; */
    color: #999;
  /* line-height: 48px; */

  }
</style>