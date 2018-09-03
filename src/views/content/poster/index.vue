<template>
    <div class="page">
        <h1>{{  }}</h1>
        <el-row :gutter="10">
          <el-col :span="12" :offset="6">
            <swiper :options="swiperOption" ref="pSwiper">
                <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
                  <img src="@/images/unlc913q91edsg.png" alt="">
                </swiper-slide>
            </swiper>
          </el-col>
        </el-row>
        <el-row :gutter="10">
            <div class="element-box" v-loading="loading">
                <!-- <iframe ref="iframe" src="../static/poster1.html" @load="loaded"></iframe> -->
            </div>
            <div class="page-manage"></div>
        </el-row>
    </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "poster",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      loading: false,
      swiperOption: {
        slidesPerView: "auto",
        slidesPerView: 10,
        spaceBetween: 10
      },
      swiperSlides: [1, 2, 3, 4, 5]
    };
  },
  methods: {
    loaded() {
      const win = this.$refs.iframe.contentWindow.vm;
      console.log(win);
    }
  },
  computed: {
    swiper() {
      return this.$refs.pSwiper.swiper;
    }
  },
  watch: {

  },
  mounted() {
    //this.loaded();
    console.log(this.swiper);
    
  },
  activated() {
    console.log(this.$route.params.id);
  }
};
</script>
<style lang="less">
@import "swiper/dist/css/swiper.css";
.swiper-container {
  height: 100px;
}
.swiper-slide {
  cursor: pointer;
  background-color: #ccc;
}
.element-box {
  width: 400px;
  height: 700px;
  border-radius: 6px;
  margin: 10px auto;
  position: relative;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 4px 20px 0 rgba(28, 31, 33, 0.1);
}
</style>
