<template>
  <div class="swiper">
    <swiper
      :indicator-dots="true"
      indicator-color="#EA5149"
      :autoplay="true"
      :interval="6000"
      :duration="1000"
      :circular="true">
      <div :key="imgindex" v-for="(top, imgindex) in imgUrls">
        <swiper-item>
          <img mode="aspectFit"
               @click="bookDetail(img)"
               v-for="img in top"
               :key="img.id"
               :src="img.image"
               class="slide-image">
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>
<script>
  export default {
    props: ['tops'],
    methods: {
      bookDetail (item) {
        wx.navigateTo({
          url: '/pages/detail/main?id=' + item.id
        })
      }
    },
    computed: {
      imgUrls () {
        let res = this.tops
        return [res.slice(0,3),res.slice(3,6),res.slice(6)]
      }
    }
  }
</script>
<style>
  .swiper {
    margin-top: 5rpx;
  }
  .slide-image {
    width: 33%;
    height: 250rpx;
  }
</style>
