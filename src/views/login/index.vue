/**
* @Notes:login
* @Author: liuyuquan
* Date: 2020/6/19 15:25
*/
<template>
  <div id="index" class="login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.account"
        name="用户名"
        label="用户名"
        placeholder="用户名"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  export default {
      name: 'index',
      components: {},
      data() {
          return {
            form: {
              account: '刘玉全',
              password: '123456a'
            },
            redirect: ''
          }
      },
    watch: {
      $route: {
        handler: function(route) {
          const query = route.query
          if (query) {
            this.redirect = query.redirect
          }
        },
        immediate: true
      }
    },
    methods: {
      onSubmit() {
        this.login()
      },
      async login() {
        console.log(1)
        const data = await this.$store.dispatch('user/login', this.form)
        console.log(data)
        if (data) {
           this.$router.push({ path: this.$route.query.redirect || '/' })
        }
      }
    }
  }
</script>

<style scoped>
  .login{
    height: calc(100vh);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .van-form {
    width: 80%;
  }

</style>
