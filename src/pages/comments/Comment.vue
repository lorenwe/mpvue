<template>
  <div class="container">
    <CommentList type="comment" :comments="comments"></CommentList>
  </div>
</template>

<script>
  import {get} from '@/request'
  import CommentList from '@/components/CommentList'
  import qcloud from '@/utils/login-auth/index'
  export default {
    components: {
      CommentList
    },
    data () {
      return {
        comments: [],
        userinfo: {}
      }
    },
    methods: {
      init () {
        wx.showNavigationBarLoading()
        this.getComments()
        wx.hideNavigationBarLoading()
      },
      async getComments () {
        const comments = await get('/weapp/commentlist',{
          openid: this.userinfo.openId
        })
        // console.log(comments.data.data.list)
        this.comments = comments.data.data.list
      }
    },
    onShow () {
      if (!this.userinfo.openId) {
        const session = qcloud.Session.get()
        if (session) {
          // 判断超时
          let oldTime = session.time
          let curTime = parseInt(new Date().getTime() / 1000)
          if (curTime - oldTime < 60 * 60 * 5) {
            this.userinfo = session.userinfo
            this.init()
          }
        }
      }
    }
  }
</script>

<style>

</style>
