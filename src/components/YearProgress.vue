<template>
  <div class="progressbar">
    <progress :percent="percent" show-info activeColor="#ea5a49" />
    <p>{{year}}已经过去了{{days}}天，{{percent}}%</p>
  </div>
</template>
<script>
export default {
  methods: {
    isLeapYear: function () {
      const year = new Date().getFullYear()
      if (year % 400 === 0) {
        return true
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true
      } else {
        return false
      }
    },
    getDayOfYead: function () {
      return this.isLeapYear() ? 366 : 365
    }
  },
  computed: {
    year: function () {
      return new Date().getFullYear()
    },
    days: function () {
      let start = new Date()
      start.setMonth(0)
      start.setDate(1)
      // start就是今年的第一天
      let offset = new Date().getTime() - start.getTime()
      return parseInt(offset / 1000 / 60 / 60 / 24) + 1
    },
    percent: function () {
      return (this.days / this.getDayOfYead() * 100).toFixed(1)
    }
  }
}
</script>
<style>
  .progressbar {
    text-align: center;
    margin-top: 20rpx;
    margin-bottom: 40rpx;
    width: 100%;
  }
  .progressbar progress {
    margin-bottom: 10rpx;
  }
</style>
