<template>
  <div>
    <TopSwiper :tops="tops"></TopSwiper>
    <Card :key="book.id" v-for="book in books" :book="book"></Card>
    <p class="text-footer" v-if="!more">没有更多数据</p>
  </div>
</template>

<script>
  import {showModel} from '@/util'
  import {get} from '@/request'
  import Card from '@/components/Card'
  import TopSwiper from '@/components/TopSwiper'

  export default {
    components: {
      Card,
      TopSwiper
    },
    data () {
      return {
        tops: [],
        books: [],
        page: 0,
        more: true
      }
    },
    mounted () {
      this.getList(true)
      this.getTop()
    },
    methods: {
      async getList (init) {
        if (init) {
          this.page = 0
          this.more = true
        }
        wx.showNavigationBarLoading()
        try {
          const books = await get('/weapp/booklist',{page: this.page})
          if (books.data.code === 0) {
            if (books.data.data.list.length < 10 && this.page > 0) {
              this.more = false
            }
            if (init) {
              // 初始化刷新
              this.books = books.data.data.list
              wx.stopPullDownRefresh()
            } else {
              // 下拉刷新
              this.books = this.books.concat(books.data.data.list)
            }
          } else {
            showModel('错误提示', '加载失败')
          }
        } catch (e) {
          showModel('添加失败', e.data.data.msg)
        }
        wx.hideNavigationBarLoading()
      },
      async getTop () {
        const tops = await get('/weapp/top')
        console.log(tops)
        this.tops = tops.data.data.list
      }
    },
    // 下拉加载
    onPullDownRefresh () {
      this.getList(true)
      this.getTop()
    },
    // 到底加载
    onReachBottom () {
      if (!this.more) {
        // 没有更多了
        return false
      }
      this.page = this.page+1
      this.getList(false)
    }
  }
</script>
<style>

</style>
