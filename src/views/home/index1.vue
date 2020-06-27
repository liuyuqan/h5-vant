/**
* @Notes:
* @Author: liuyuquan
* @Date: 2020/6/18 22:59
*/
<template>
  <div
    id="index"
    class="index"
  >
    <div style="position: relative;display: flex">
      home
    </div>
  </div>
</template>

<script>
  export default {
        name: 'Index',
        components: {},
        data() {
            return {
              totalRows: 30000,
              size: 1000,
              page: 1,
              progressText: 0.00
            }
        },
      created() {
      },
      methods: {
        loginOut() {
          this.$store.dispatch('use/loginOut')
        }
      }

    }
</script>

<style scoped>

</style>
