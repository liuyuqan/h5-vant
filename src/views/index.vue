/**
* @Notes:主页
* @Author: liuyuquan
* @Date: 2020/6/15 14:47
*/
<template>
    <div id="index" class="index">
      <van-row >
        <van-col :span="24" class="item">
          欢迎使用demo
        </van-col>
        <van-col :span="24" class="item">
          联系方式： 101265345@qq.com
        </van-col>
        <van-col :span="24" class="item">
          <van-uploader
            :after-read="beforeRead"
            multiple
            :max-count="5"
            :max-size="3 * 1024 * 1024"
            accept="image/*" />
        </van-col>
        <van-col  :span="24" class="item">
          <van-button @click="$router.push('/home')" > daochu</van-button>
          <van-button @click="loginOut" > 退出登錄</van-button>
        </van-col>
      </van-row>
    </div>
</template>

<script>
  import { upload_file } from '@/api/user'

    export default {
        name: 'index',
        components: {},
        data() {
            return {}
        },
      created() {
          this.initData()
      },
      methods: {
        loginOut() {
          this.$store.dispatch('user/loginOut')
          this.$router.push('/login')
        },
        beforeRead(files) {
          const FormData = new window.FormData()
          console.log(FormData)
          for (const file  of files) {
            console.log(file)
            FormData.append('file', file.file)
          }
          console.log('file', FormData)
          upload_file(FormData).then(res => {
            console.log(res)
          })
        },
        initData() {
        }
      }
    }
</script>

<style  scoped>
.index {
  position: relative;
}
.item {
  padding: 20px 0 ;
  text-align: center;
}
</style>
