<template>
  <div class="swiper-container" id="floor1Swiper" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, id) in bannerList" :key="id">
        <img class="imgs" :src="url+item.rotationUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <!-- <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swiper from "swiper";
export default {
  name: "Swiper",
  data() {
    return {
      url:'http://yw.chengtouji.com/images/'
    }
  },
  props: ["list"],
  watch: {
    list: {
      immediate: true,
      handler() {
        // 用nexttick确定v-for已经动态渲染结构了
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            loop: true,
            pagination: {
              el: ".swiper-pagination",
              // 分页器点击
              clickable: true,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
  computed: {
    ...mapState("home", {
      bannerList: "bannerList",
    }),
  },
  created() {
    this.getBanners();
  },
  methods: {
    getBanners() {
      this.$store.dispatch("home/getBannerList");
    },
  },
};
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}
.imgs{
  width: 100%;
  height: 100%;
}
</style>