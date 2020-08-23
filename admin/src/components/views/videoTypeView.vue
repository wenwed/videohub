<template>
  <div>
    <el-container>
      <el-table
        :data="types.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column
          label="ID"
          prop="VTID">
        </el-table-column>
        <el-table-column
          label="分区名称"
          prop="type_tag">
        </el-table-column>
        <el-table-column
          align="right">
          <template slot="header" slot-scope="{}">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
  </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      types: []
    }
  },
  methods: {
    getVideoTypes() {
      this.$axios.get("/tyvideo/all")
      .then(res => {
        console.log(res.data.videotypes)
        this.types = res.data.videotypes
      })
    }
  },
  created() {
    this.getVideoTypes()
  },
}
</script>

<style lang="scss" scoped>
</style>