<template>
  <a :href="detailUrl">
    <div class="book-card">
      <div class="thumb" @click.stop="preview">
        <img :src="book.image" mode="aspectFit" class="image">
      </div>
      <div class="detail">
        <div class="row text-primary">
          <div class="left">
            {{book.title}}
          </div>
          <div class="right">
            {{book.rate}} <Rate :value="book.rate"></Rate>
          </div>
        </div>
        <div class="row">
          <div class="left">
            {{book.author}}
          </div>
          <div class="right text-primary">
            浏览量：{{book.count}}
          </div>
        </div>
        <div class="row">
          <div class="left">
            {{book.publisher}}
          </div>
          <div class="right">
            {{book.user_info.nickName}}
          </div>
        </div>
      </div>
    </div>
  </a>
</template>
<script>
  import Rate from '@/components/Rate'
  export default {
    components: {
      Rate
    },
    props: ['book'],
    computed: {
      detailUrl () {
        return '/pages/detail/main?id=' + this.book.id
      }
    },
    methods: {
      preview () {
        wx.previewImage({
          current: this.book.image,
          urls: [this.book.image]
        })
      }
    }
  }
</script>
<style>
  .book-card {
    padding: 10rpx;
    overflow: hidden;
    margin-top: 10rpx;
    margin-bottom: 10rpx;
  }
  .book-card .thumb {
    width: 120rpx;
    height: 120rpx;
    float: left;
    margin: 0 auto;
    overflow: hidden;
  }
  .book-card .thumb .image {
    max-width: 100%;
    max-height: 100%;
  }
  .book-card .detail {
    margin-left: 130rpx;
    height: 120rpx;
    overflow:hidden;
  }
  .book-card .detail .row {
    font-size: 22rpx;
    line-height: 22rpx;
    margin-top: 10rpx;
    margin-bottom: 10rpx;
    height: 22rpx;
    border:1px solid transparent;
  }
  .book-card .detail .row .left {
    float: left;
    margin-right: 100rpx;
    width: 350rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .book-card .detail .row .right {
    float: right;
  }
</style>
