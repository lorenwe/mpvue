<script>
    import config from '@/config'
    import qcloud from '@/utils/login-auth/index'

    export default {
      async created () {
        qcloud.setLoginUrl(config.host + '/weapp/login')
      }
    }
</script>

<style>
  .text-primary {
    color: #EA5149;
  }
  .text-footer {
    text-align: center;
    font-size: 20rpx;
  }
  /*.container {*/
    /*height: 100%;*/
    /*display: flex;*/
    /*flex-direction: column;*/
    /*align-items: center;*/
    /*justify-content: space-between;*/
    /*padding: 200rpx 0;*/
    /*box-sizing: border-box;*/
  /*}*/
  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }
  .page-title {
    padding-left: 20px;
    background: #eee;
    line-height: 40px;
    font-size: 14px;
  }
  .right {
    float: right;
  }
  .btn {
    color: white;
    background: #ea5a49;
    margin-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 2px;
    font-size: 16px;
    line-height: 40px;
    height: 40px;
    width: 100%;
  }
  .btn:active {
    background: #ea5a49;
  }
</style>
