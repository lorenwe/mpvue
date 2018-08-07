<template>
  <div>
    <BookInfo :info="info"></BookInfo>
    <CommentList :comments="comments"></CommentList>
    <div class="comment" v-if="showwAdd">
      <textarea v-model="comment"
                class="textarea"
                :maxlength="100"
                placeholder="请输入评论"
      ></textarea>
      <div class="location">
        地理位置:
        <switch color="#EA5A49" :checked="location" @change="getGeo"></switch>
        <span class="text-primary">{{location}}</span>
      </div>
      <div class="phone">
        手机型号:
        <switch color="#EA5A49" :checked="phone" @change="getPhone"></switch>
        <span class="text-primary">{{phone}}</span>
      </div>
      <button class="btn" @click="addComment">评论</button>
    </div>
    <div v-else class="text-footer">
      {{tips}}
    </div>
  </div>
</template>
<script>
  import {get, post} from '@/request'
  import {showModel} from '@/util'
  import BookInfo from '@/components/BookInfo'
  import CommentList from '@/components/CommentList'
  import qcloud from '@/utils/login-auth/index'
  export default {
    components: {
      BookInfo,
      CommentList
    },
    data () {
      return {
        userinfo: {},
        bookid: 0,
        info: {},
        comment: '',
        location: '',
        phone: '',
        comments: [],
        tips: ''
      }
    },
    computed: {
      showwAdd () {
        // 没登入
        if (!this.userinfo.openId) {
          this.tips = '未登入'
          return false
        }
        // 已经评论过的
        if (this.comments.filter(v => v.openid === this.userinfo.openId).length) {
          this.tips = '已经评论过啦'
          return false
        }
        return true
      }
    },
    mounted () {
      this.bookid = this.$root.$mp.query.id
      this.getDetail()
      this.getComments()
      this.getUserInfo()
    },
    methods: {
      async addComment () {
        if (!this.comment) {
          return
        }
        try {
          await post('/weapp/addcomment', {
            openid: this.userinfo.openid,
            comment: this.comment,
            phone: this.phone,
            location: this.location,
            bookid: this.bookid
          })
          this.comment = ''
          this.getComments()
        } catch (e) {
          showModel('失败', e.msg)
        }
      },
      async getComments () {
        const comments = await get('/weapp/commentlist', {bookid: this.bookid})
        // console.log(comments.data.data.list)
        this.comments = comments.data.data.list
        // console.log(this.comments)
      },
      getGeo (e) {
        if (e.target.value) {
          wx.getLocation({
            success: geo => {
              console.log(geo)
              this.location = '深圳市'
            }
          })
        } else {
          this.location = ''
        }
      },
      getPhone (e) {
        if (e.target.value) {
          const phoneInfo = wx.getSystemInfoSync()
          this.phone = phoneInfo.model
        } else {
          // 没选中
          this.phone = ''
        }
      },
      async getDetail () {
        const info = await get('/weapp/bookdetail', {id: this.bookid})
        wx.setNavigationBarTitle({
          title: info.data.data.title
        })
        this.info = info.data.data
      },
      getUserInfo () {
        const session = qcloud.Session.get()
        if (session) {
          // console.log(session)
          // 判断超时
          let oldTime = session.time
          let curTime = parseInt(new Date().getTime() / 1000)
          if (curTime - oldTime < 60 * 60 * 5) {
            this.userinfo = session.userinfo
          }
        }
      }
    }
  }
</script>
<style>
  .comment .textarea {
    width: 730rpx;
    height: 200rpx;
    background: #eee;
    padding: 10px;
  }
  .location {
    margin-top: 10px;
    padding: 5px 10px;
  }
  .phone {
    margin-top: 10px;
    padding: 5px 10px;
  }
</style>
