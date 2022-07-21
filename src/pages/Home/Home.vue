<template>
  <div class="home" id="home">
    <MescrollVue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <div class="swiper">
        <Swiper />
      </div>
      <!-- 主页课程列表 -->
      <div class="home-list">
    <div class="list-title">
      <img class="img" src="/static/images/empty/course.png" />
      <span class="span">课程列表</span>
    </div>
    <div class="list-box">
      <div
        class="list-item"
        v-for="(item, id) in dataList"
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
            <div class="item-describe">
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
    </MescrollVue>
  </div>
</template>

<script>
import Swiper from "../../components/Swiper/Swiper.vue";
// import List from "../../components/List/List.vue";
import MescrollVue from "mescroll.js/mescroll.vue";
import axios from 'axios'
export default {
  components: { Swiper, MescrollVue },
  name: "Home",
    data() {
    return {
      mescroll: null, // mescroll实例对象
      mescrollDown: {}, //下拉刷新的配置. 
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: 
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 10, 
        },
        noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
        empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          // warpId: "home", //父布局的id (1.3.5版本支持传入dom元素)
          icon: "/static/images/empty/empty_list@2x.png", //图标,默认null,支持网络图
          tip: "暂无相关数据~", //提示
        },
      },
      dataList: [], // 列表数据
    };
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      // 联网请求
      axios.get("/api/v1/goods/list", {
          params: {
            num: page.num, // 页码
            size: page.size, // 每页长度
          },
        })
        .then((res) => {
          if (res.status == 200) {
             // 请求的列表数据
          // let arr = res.data.data.records;
          // 如果是第一页需手动置空列表
          if (page.num === 1) this.dataList = res.data.data.records;
          // 把请求到的数据添加到列表
          // this.dataList = this.dataList(arr);
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(this.dataList.length);
          });
          } 
        })
        .catch((e) => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
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
  }
};
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.swiper {
  width: 100%;
  height: 170px;
  background-color: #fff;
}
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
    padding: 15px 15px 15px 15px;
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
      width: 100%;
      padding-left: 10px;
      box-sizing: border-box;
      .item-title {
        font-size: 15px;
        line-height: 15px;
        text-align: left;
        margin-top: 3px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .item-describe {
        text-align: left;
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