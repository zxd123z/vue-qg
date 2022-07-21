<template>
  <div class="home-list">
    <div class="list-title">
      <img class="img" src="/static/images/empty/course.png" />
      <span class="span">课程列表</span>
    </div>
    <div class="list-box">
      <div
        class="list-item"
        v-for="(item, id) in courseList"
        :key="id"
        @click="toDetail(item.id)"
      >
        <div class="left-img">
          <img class="img" :src="item.goodsImage" />
          <div class="img-title">{{ item.registrationNum }}人报名</div>
        </div>
        <div class="item-content">
          <div class="">
            <div class="item-title">
              {{ item.goodsName }}
            </div>
            <div class="item-describe twoline threeline">
              {{ item.introduce }}
            </div>
          </div>
          <div class="item-price">
            <div class="item-classtime">{{ item.classHour }}课时</div>
            <div class="item-flex">
              <div class="price-old">￥{{ item.goodsPrice }}</div>
              <div class="price-new">￥{{ item.discountPrice }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

// import {getCourseList} from '@/request/api.js'
export default {
  name: "List",
  data() {
    return {
      courseList: [],
    };
  },
  computed: {},
  created() {
    this.getCourse();
  },
  methods: {
    getCourse() {
      axios.get("/api/v1/goods/list",{
      params:{
         pageNo:1,
         pageSize:10
      }
    }).then( res => {
          if (res.status == 200) {
           this.courseList = res.data.data.records;
             console.log("获取列表数据成功");
             console.log(res);
            console.log(this.courseList);
          }else{
            console.log("获取列表数据失败");
          }  
        });
    },
    // 跳转到详情页
    toDetail(id) {
      this.$router.push({
        name: "detail",
        params: {
          id: id,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
/* // 课程列表 */
.home-list {
  width: 100%;
  height: 100%;
  padding-bottom: var(--window-bottom);

  .list-title {
    height: 31px;
    // width: 100%;
    display: flex;
    align-items: center;
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    padding: 15px 18px 0;
    background-color: #ffffff;
    .img {
      width: 17px;
      height: 16px;
      margin-right: 5px;
    }
    /* // margin-bottom: 34px; */
  }
}

.list-box {
  width: 100%;
  box-sizing: border-box;

  .list-item {
    box-sizing: border-box;
    display: flex;
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
        /* border-radius: 10px; */
      }
    }
    .item-content {
      display: flex;
      height: 105px;
      flex-direction: column;
      justify-content: space-between;
      width: 207px;
      padding-left: 10px;
      box-sizing: border-box;
      .item-title {
        font-size: 15px;
        line-height: 15px;
        margin-top: 3px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .item-describe {
        font-size: 11px;
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
      .item-flex {
        display: flex;
        justify-content: end;
        text-align: center;
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
          font-size: 17px;
          padding-left: 6px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: #fc8a26;
        }
      }
    }
  }
  .list-box:last-child {
    padding-bottom: 50px;
  }
}
</style>