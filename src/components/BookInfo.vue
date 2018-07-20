<template>
  <div class="bookinfo">
    <div class="thumb">
      <img class="back" :src="info.image" model="aspectFill">
      <img class="img" :src="info.image" model="aspectFit">
      <div class="info">
        <div class="title">
          {{info.title}}
        </div>
        <div class="author">
          {{info.author}}
        </div>
      </div>
    </div>
    <div class="owner">
      <img class="avatar" :src="userinfo.avatarUrl" model="aspectFit">
      {{userinfo.nickName}}
      <div class="right text-primary">
        {{info.rate}}分
        <Rate :value="info.rate"></Rate>
      </div>
    </div>
    <div class="detail">
      {{info.publisher}}
      <div class="right">
        {{info.price}}
      </div>
    </div>
    <div class="tags">
      <div class="badge" :key="tag" v-for="tag in info.tags">{{tag}}</div>
    </div>
    <div class="summary">
      <p :key="sum" v-for="sum in info.summary">{{sum}}</p>
    </div>
  </div>
</template>
<script>
  import Rate from '@/components/Rate'
  export default {
    components: {
      Rate
    },
    props: ['info'],
    computed: {
      userinfo () {
        return this.info.user_info || {}
      }
    }
  }
</script>
<style>
  .bookinfo {
    font-size: 22rpx;
  }
  .bookinfo .badge {
    display: inline-block;
    margin: 5px;
    border-radius: 10px;
    border: 1px #EA5A49 solid;
    color: #EA5A49;
    padding: 5px;
  }
  .bookinfo .summary {
    margin-top: 10px;
    padding: 0 10px;
  }
  .bookinfo .summary p {
    text-indent: 2em;
    font-size: 14px;
  }
  .bookinfo .owner {
    padding: 5px 10px;
  }
  .bookinfo .right {
    float: right;
  }
  .bookinfo .detail {
    padding: 5px 10px;
  }
  .bookinfo .avatar {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .bookinfo .thumb {
    width: 750rpx;
    height: 500rpx;
    overflow: hidden;
    position: relative;
  }
  .bookinfo .thumb .back {
    filter: blur(15px);
    width: 100%;
  }
  .bookinfo .thumb .img {
    position: absolute;
    width: 200rpx;
    height: 300rpx;
    margin:0 0 0 -100rpx;
    top:30rpx;
    left:50%;
  }
  .info {
    color: white;
    position: absolute;
    width: 200rpx;
    margin:0 0 0 -100rpx;
    left: 50%;
    top: 330rpx;
    text-align: center;
  }
  .info .title {
    font-size: 22rpx;
  }
  .info .author {
    font-size: 20rpx;
  }
</style>
