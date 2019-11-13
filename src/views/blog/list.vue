<template>
  <div>
    <el-table v-loading="loading" :data="blogList" stripe>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="nickName" label="发布人"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 确认删除的对话框 -->
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确定删除该博客吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, del } from '@/api/blog'
import scroll from '@/utils/scroll'
export default {
  data() {
    return {
      blogList: [],
      count: 20,
      loading: false,
      delDialogVisible: false,
      blog: {}
    }
  },
  created() {
    this.getBlogList()
  },
  mounted() {
    scroll.start(this.getBlogList)
  },
  methods: {
    getBlogList() {
      fetchList({
        start: this.blogList.length,
        count: this.count
      }).then(res => {
        const data = res.data
        let _blogList = []
        for (let i = 0, len = data.length; i < len; i++) {
          _blogList.push(JSON.parse(data[i]))
        }
        this.blogList = this.blogList.concat(_blogList)
        if (_blogList.length < this.count) {
          scroll.end()
        }
        this.loading = false

        console.log(this.blogList)
      })
    },
    doDel() {
      this.delDialogVisible = false
      this.loading = true
      del(this.blog).then(res => {
        console.log(res)
        let data = res.data
        if (data.dbResBlog.deleted > 0 && data.storageRes.errcode === 0) {
          this.blogList = []
          this.getBlogList()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    onDel(row) {
      this.blog = row
      this.delDialogVisible = true
      //   console.log(row)
    }
  }
}
</script>

<style>
</style>
