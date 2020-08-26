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
        <el-table-column label="操作">
          <template slot-scope="props">
            <el-button
              size="mini"
              @click="handleEdit(props.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <edit-video-type v-if="editFormVisible" @getVideoTypes="getVideoTypes" :ID="editID"></edit-video-type>
  </div> 
</template>

<script>
import editVideoType from "../components/editVideoType.vue"
export default {
  components: {
    editVideoType
  },
  data() {
    return {
      types: [],
      search: "",
      editFormVisible: false,
      editID: null,
      addFormVisible: false
    }
  },
  methods: {
    getVideoTypes() {
      this.$axios.get("/tyvideo/all")
      .then(res => {
        this.types = res.data.videotypes
      })
    },
    handleEdit( row ) {
      this.editID = row.VTID
      console.log( row.VTID )
      this.editFormVisible = true
      console.log(this.editFormVisible)
    },
    handleDelete( row ) {
      console.log( row )
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