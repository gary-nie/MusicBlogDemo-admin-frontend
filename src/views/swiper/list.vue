<template>
  <div>
    <div class="filter-container">
      <el-upload
        class="upload-demo"
        action="http://127.0.0.1:3000/swiper/upload"
        :on-success="uploadSuccess"
        :show-file-list="false"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>

    <el-table v-loading="loading" :data="swiperList" stripe>
      <el-table-column type="index" width="50" />
      <el-table-column label="封面" width="400">
        <template slot-scope="scope">
          <img :src="scope.row.download_url" alt height="50" />
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 确认删除的对话框 -->
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确认删除图片吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, del } from '@/api/swiper'
export default {
  data() {
    return {
      swiperList: [],
      loading: false,
      swiper: {},
      delDialogVisible: false
    }
  },

  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      fetchList().then(res => {
        // console.log(res)
        this.swiperList = res.data
        this.loading = false
      })
    },
    uploadSuccess(res) {
    //   console.log('res', res)
      if (res.data.length > 0) {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      } else {
        this.$message.error('上传失败')
      }
      this.getList()
    },
    onDel(res) {
    //   console.log(res)
      this.swiper = res
      this.delDialogVisible = true
    },
    doDel() {
      del(this.swiper).then(res => {
        this.delDialogVisible = false
        // console.log(res)
        let resData = res.data
        if (
          resData.delDBRes.deleted > 0 &&
          resData.delStorage.delete_list.length > 0
        ) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message.error('删除失败')
        }
        this.getList()
      })
    }
  }
}
</script>

<style>
</style>
