<template>
  <div class="container">
    <div class="user">
      <div class="userinfo" v-if="isLogin">
        <img :src="userinfo.avatarUrl" alt="头像" >
        <p>{{userinfo.nickName}}</p>
      </div>
      <div class="userinfo" v-else>
        <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">点击登入</button>
        <p>未登入</p>
      </div>
    </div>
    <YearProgress></YearProgress>
    <button v-if="isLogin" class="btn add_book" @click="scanBook">添加图书</button>
  </div>
</template>

<script>
  import {showBusy, showSuccess, showModel} from '@/util'
  import {post} from '@/request'
  import qcloud from '@/utils/login-auth/index'
  import YearProgress from '@/components/YearProgress'

  export default {
    components: {
      YearProgress
    },
    data () {
      return {
        userinfo: {},
        isLogin: false
      }
    },
    created () {
      const session = qcloud.Session.get()
      // console.log(session)
      if (session) {
        // 判断超时
        let oldTime = session.time
        let curTime = parseInt(new Date().getTime() / 1000)
        if (curTime - oldTime < 60 * 60 * 5) {
          this.userinfo = session.userinfo
          this.isLogin = true
        }
      }
    },
    methods: {
      async addBook (isbn) {
        try {
          const res = await post('/weapp/addbook', {
            isbn,
            openid: this.userinfo.openId
          })
          if (res.data.code === 0 && res.data.data.title) {
            showSuccess(`${res.data.data.title}添加成功`)
          } else {
            showModel(res.data.data.msg)
          }
        } catch (e) {
          showModel('添加失败', e.data.data.msg)
        }
      },
      scanBook: function () {
        // 允许从相机和相册扫码
        wx.scanCode({
          success: (res) => {
            if (res.result) {
              this.addBook(res.result)
            }
          },
          fail: () => {
            showModel('扫描失败')
          }
        })
      },
      doLogin: function () {
        showBusy('正在登录!')
        const session = qcloud.Session.get()
        if (session) {
          // 第二次登录
          // 或者本地已经有登录态
          // 可使用本函数更新登录态
          console.log('第二次登录')
          qcloud.loginWithCode({
            success: res => {
              this.isLogin = true
              this.userinfo = res
              showSuccess('登录成功')
            },
            fail: err => {
              console.error(err)
              showModel('登录错误', err.message)
            }
          })
        } else {
          // 首次登录
          console.log('首次登入')
          qcloud.login({
            success: res => {
              this.isLogin = true
              this.userinfo = res
              showSuccess('登录成功')
            },
            fail: err => {
              console.error(err)
              showModel('登录错误', err.message)
            }
          })
        }
      }
    }
  }
</script>

<style>
  .container {
    padding: 0 30rpx;
    width: 100%;
  }
  .user {
    width: 100%;
    height: 350rpx;
    text-align: center;
  }
  .user .userinfo {
    margin-top: 100rpx;
    text-align: center;
  }
  .user .userinfo img {
    width: 150rpx;
    height: 150rpx;
    margin: 20rpx;
    border-radius: 50%;
  }
  .user .userinfo button {
    display: block;
    border: none;
    width: 150rpx;
    height: 150rpx;
    margin: 20rpx auto;
    border-radius: 50%;
    font-size: 25rpx;
    text-align: center;
    line-height: 150rpx;
  }
  .user .userinfo p {
    font-size: 30rpx;
  }
  .add_book {
    margin-top: 20rpx;
  }
</style>
