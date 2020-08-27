<template>
  <div class="temAdd">
    <!-- 修改框 -->
    <el-dialog title="修改分区" :visible.sync="dialogFormVisible">
      <el-form :model="addForm">
        <el-form-item label="分区名称" :label-width="formLabelWidth">
          <el-input v-model="addForm.type_tag" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分区描述" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" v-model="addForm.type_descripe" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="childCloseAdd">取 消</el-button>
        <el-button type="primary" @click="addVT">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLabelWidth: '120px',
      dialogFormVisible: true,
      addForm: {
        type_tag: "",
        type_descripe: ""
      }
    }
  },
  methods: {
    async addVT() {
      await this.$axios.post('/tyvideo/add', this.addForm)
        .then(res => {
          console.log(res)
          this.$emit('getVideoTypes')
          this.$emit('closeAdd')
        })
    },
    childCloseAdd() {
      this.$emit('closeAdd')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>