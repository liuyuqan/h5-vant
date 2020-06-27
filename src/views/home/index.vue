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
      <!--    进度显示-->
      <span>导出进度:</span><span
        id="progressText"
        style="font-size: 20px;font-weight: bold"
      >{{ progressText }}%</span>
      <br>
      <button ref="export_btn" class="btn btn-primary" style="float:none;margin-left:0;" type="button" @click="exportExcel">
        <span v-show="progressText==-1">下载报表</span>
        <span v-show="progressText!=-1">导出中:{{progressText}}%</span>
      </button>
      <div v-show="progressText!=-1" class="progress" style="margin:10px;">
        <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" :style="{width:progressText+'%'}"></div>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
  import XLSX from 'xlsx'
  import axios from 'axios'
  import FileSaver from 'file-saver'
  console.log(FileSaver)
  export default {
        name: 'Index',
        components: {},
        data() {
            return {
              totalRows: 50000,
              size: 1000,
              page: 1,
              progressText: 0.00
            }
        },
      created() {
        this.initData()
      },
      methods: {
          initData() {

          },
          loginOut() {
            this.$store.dispatch('use/loginOut')
          },
        exportExcel() {
          var self = this
          var request_times = Math.ceil(this.totalRows / 1000) // 计算分几次请求
          var funcs = [] // Promise.all要用到的参数, 存放每次请求的Promise对象
          var complete_count = 0 // 成功请求次数
          this.progressText = 0 // 设置当前进度百分比为0
          for (var i = 1; i <= request_times; i++) { // 循环请求次数，构造请求的Promise对象并插入funcs数组
            var func = new Promise(function(resolve, reject) { // 定义Promise并处理请求逻辑
              var data = []
              axios.get(
                'a.php',
                { params: { page: i }}
              ).then(function(response) {
                if (response.body.code == 200) {
                  for (var i = 0; i < response.body.data.length; i++) { // 将后台返回中需要的字段取出
                    var item = []
                    item.push(response.body.data[i].id)
                    item.push(response.body.data[i].name)
                    data.push(item)
                  }
                  complete_count++ // 成功请求次数+1
                  self.progressText = 100 * complete_count / request_times // 设置当前进度百分比
                  resolve(data)
                } else {
                  reject()
                }
              }).catch(_ => {
                for (let i = 0; i < 1000; i++) {
                  data.push([
                    'const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象',
                    'const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象',
                    'const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象',
                    'const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象',
                    'const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象',
                    'const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象',
                    'const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象',
                    'const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象',
                    'const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象',
                    'const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象',
                    'const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象',
                    'const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象'
                  ])
                }
                complete_count++ // 成功请求次数+1
                self.progressText = 100 * complete_count / request_times // 设置当前进度百分比
                console.log(self.progressText)
                resolve(data)
              })
            })
            funcs.push(func)
          }
          Promise.all(funcs).then(function(values) { // 使用Promise.all调用funcs里面的函数，并合并数据，最后给js-xlsx生成Excel
            var aoa = [
              ['ID', '名称'] // 第一行标题
            ]
            // 将数据合并
            for (var i = 0; i < values.length; i++) {
              for (var j = 0; j < values[i].length; j++) {
                aoa.push(values[i][j])
              }
            }
            var ws = XLSX.utils.aoa_to_sheet(aoa)
            var wb = XLSX.utils.book_new()
            wb.SheetNames.push('sheet1')
            wb.Sheets['sheet1'] = ws
            var wopts = { bookType: 'csv', bookSST: false, type: 'array' }
            var wbout = XLSX.write(wb, wopts)
            // eslint-disable-next-line no-undef
            FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'data.csv')
            self.progressText = -1
          })
      },
        exportExcel1() {
          // 初始化
          const { workSheet, workBook } = this.initWorkBook()
          console.log('导出开始!')
          this.getTotal(workSheet, workBook)
        },
        initWorkBook() {
          const workBook = XLSX.utils.book_new() // 创建一个工作簿
          const ws_data = [
            ['S', 'h', 'e', 'e', 't', 'J', 'S', 'S', 'S', 'S', 'S', 'S', 'S']

          ]
          const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象
          XLSX.utils.book_append_sheet(workBook, workSheet, '工作表名称')// 向工作簿追加一个工作表
          return { workSheet, workBook }
        },
        getTotal(workSheet, workBook) {
            // 接收到总行数
            // 开始接收数据
            this.getRowsFromServer(workSheet, workBook)
        },
        /** 发送Ajax请求分批从服务器拿数据
         * @param offset 从第几行数据开始
         * @param limit 每次取出多少行
         */
        getRowsFromServer(workSheet, workBook) {
          const list = []
          for (let i = 0; i < 1000; i++) {
            list.push(['const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象',
              'const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象',
              'const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象',
              'const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象',
              'const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象',
              'const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象',
              'const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象',
              'const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象',
              'const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象',
              'const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象',
              'const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象',
              'const workSheet = XLSX.utils.aoa_to_sheet(ws_data)// 使用二维数组创建一个工作表对象'
            ])
          }
          // 写入到excel sheet
          XLSX.utils.sheet_add_aoa(workSheet, list, { origin: -1 })
          console.log('获取完数据-', list.length)
          // 拼接get字段
            const hasGetNum = this.size * this.page // 当前已取到的行数
          console.log(`已写入${hasGetNum}行`)
            // 更新进度显示
            this.updateProgress(hasGetNum, this.totalRows)
            // 如果没取完,递归获取下一批数据
          console.log('hasGetNum < totalRows', hasGetNum < this.totalRows)
          if (hasGetNum < this.totalRows) {
              // 剩余没传行数
              // 计算下一批数据的数量
              // 获取下一批数据
             this.page++
             this.getRowsFromServer(workSheet, workBook)
          } else {
              // 收取完成，下载excel
              // 总行数制0
            XLSX.writeFile(workBook, this.page + 'export.xlsx')
            this.totalRows = 0
            return
          }
        },
        /** 更新进度显示
         *
         * @param now   当前已更新行数
         * @param total 总行数
         */
        updateProgress(now, total) {
          // 计算百分比
          this.progressText =  (now / total * 100).toFixed(2)
          this.$forceUpdate()
          console.log(this.progressText)
          // 更新dom
       },
        getTotal1() {

        },
        beforeRead(file) {
          console.log(file)
        }
      }

    }
</script>

<style scoped>

</style>
