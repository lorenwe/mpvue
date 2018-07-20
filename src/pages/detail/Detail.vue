<template>
  <div>
    <BookInfo :info="info"></BookInfo>
    <div class="comment">
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
  </div>
</template>
<script>
  import {get, post} from '@/request'
  import BookInfo from '@/components/BookInfo'
  export default {
    components: {
      BookInfo
    },
    data () {
      return {
        bookid: 0,
        info: {},
        comment: '',
        location: '',
        phone: '',
        comments: []
      }
    },
    mounted () {
      this.bookid = this.$root.$mp.query.id
      this.getDetail()
      this.getComments()
    },
    methods: {
      async addComment () {
        const info = await post('/weapp/addcomment', {
          comment: this.comment,
          phone: this.phone,
          location: this.location,
          bookid: this.bookid
        })
        console.log(info)
      },
      async getComments () {
        const comments = await get('/weapp/commentlist', {bookid: this.bookid})
        this.comments = comments
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
