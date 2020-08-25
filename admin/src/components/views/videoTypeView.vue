<template>
  <div class="dataContainer">
    <el-header class="vtHeader" style="text-align: right; font-size: 12px">
      <el-input
        class="searchInp"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="search">
      </el-input>
      <el-button plain class="addBtn">添加</el-button>
    </el-header>
    <el-main class="vtMain">
      <el-table
        :data="types"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="描述">
                <span>{{ props.row.type_descripe }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="ID"
          prop="VTID">
        </el-table-column>
        <el-table-column
          label="名称"
          prop="type_tag">
        </el-table-column>
        <el-table-column
          label="操作">
        </el-table-column>
      </el-table>
    </el-main>
  </div> 
</template>

<script>
export default {
  data() {
    return {
      types: [],
      search: ""
    }
  },
  methods: {
    getVideoTypes() {
      this.$axios.get("/tyvideo/all")
      .then(res => {
        this.types = res.data.videotypes
        console.log(this.types)
      })
    }
  },
  created() {
    this.getVideoTypes()
  }
}
</script>

<style lang="scss" scoped>
.dataContainer{
  width: 100%;

  .vtHeader{
    padding-bottom: 5px;
    padding-top: 10px;
    text-align: right;
    font-size: 12px;
    display: flex;
    justify-content: space-between;

    .searchInp{
      width:300px;
    }

    .addBtn{
      height: 40px;
    }
  }

  .vtMain{
    padding-top: 0;
  }
}
</style>