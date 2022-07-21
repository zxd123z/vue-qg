<template>
  <div class="home-list">
    <div class="list-box" v-for="(item, id) in courseList" :key="id">
      <div class="list-item">
        <div class="left-img">
          <img
            class="img"
            :src="item.goodsImage"
          />
        </div>
        <div class="item-content">
          <div class="">
            <div class="item-title oneline">{{ item.goodsName }}</div>
            <div class="item-describe oneline">
              订单编号：{{ item.orderNo }}
            </div>
            <div class="item-describe">
              课时：{{ item.orderNum }}
            </div>
          </div>
          <div class="item-price">
            <div class="item-classtime">
              <span v-if="item.orderStatus == 0">进行中</span>
              <span v-if="item.orderStatus == 1">已结束</span>
              <span v-if="item.orderStatus == 2">未付款</span>
            </div>
            <div class="flex justify-end align-center">
              <div class="price-new">￥{{ item.goodsMoney }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Buy",
  data() {
    return {
        courseList:[]
    };
  },
  mounted() {
    this.getBuyCourse();
  },
  
  methods: {
    getBuyCourse(){
        let params = {
            pageNo:1,
            pageSize:10
        }
        axios.get('api/v1/order/list',{
           headers:{
					'Authorization':localStorage.getItem('user_token')
				}
        }).then(res => {
            if (res.status == 200) {
                this.courseList = res.data.data.records
                // console.log(this.courseList);
            } else {
                console.log('获取已购课程失败');
            }
        }).catch(()=>{
          
        })
    }
  },
};
</script>

<style lang="scss" scoped>
// 课程列表
.home-list {
  width: 100%;
  height: 100%;
  .list-title {
    height: 31px;
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    padding: 15px 15px 0;
    background-color: #ffffff;
    .img {
      width: 17px;
      height: 16px;
      margin-right: 5px;
    }
    // margin-bottom: 34px;
  }
}

.list-box {
  width: 100%;

  .list-item {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 15px 23px 15px 15px;
    border-bottom: 1px solid #e5e5e5;
    .left-img {
      position: relative;
      width: 122px;
      height: 100%;
      border-radius: 5px;
      .img {
        display: block;
        width: 122px;
        height: 100px;
        border-radius: 5px;
        background-color: #efefef;
      }
      .img-title {
        box-sizing: border-box;
        position: absolute;
        left: 0;
        bottom: 0;
        font-size: 10px;
        font-weight: 400;
        color: #ffffff;
        width: 100%;
        height: 21px;
        line-height: 21px;
        text-align: center;
        background: rgba($color: #000000, $alpha: 0.5);
        border-radius: 5px;
      }
    }
    .item-content {
      box-sizing: border-box;
      display: flex;
      height: 105px;
      flex-direction: column;
      justify-content: space-between;
      width: calc(100% - 122px);
      padding-left: 10px;
      .item-title {
        font-size: 15px;
        line-height: 15px;
        text-align: left;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
      }
      .item-describe {
        box-sizing: border-box;
        font-size: 11px;
        text-align: left;
        font-family: PingFang SC;
        font-weight: 500;
        color: #5e5e5e;
        line-height: 18px;
        margin-top: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .item-price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item-classtime {
          border: 1px solid #1399ff;
          border-radius: 15px;
          padding: 1px 6px;
          font-size: 10px;
          text-align: center;
          font-family: PingFang SC;
          font-weight: 500;
          color: #0b9cfe;
        }
        .price-old {
          font-size: 11px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          text-decoration: line-through;
          color: #808080;
        }
        .price-new {
          box-sizing: border-box;
          font-size: 17px;
          padding-left: 6px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: #fc8a26;
        }
      }
    }
  }
}
</style>