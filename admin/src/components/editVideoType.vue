<template>
  <div class="temEdit" v-if="dialogFormVisible">
    <!-- 修改框 -->
    <el-dialog title="修改分区" :visible.sync="dialogFormVisible">
      <el-form :model="editForm">
        <el-form-item label="分区名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.type_tag" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分区描述" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" v-model="editForm.type_descripe" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: [ "ID" ],
  data: function() {
    return {
      formLabelWidth: '120px',
      dialogFormVisible: true,
      editForm: {
        type_tag: "",
        type_descripe: "",
        VTID: this.ID
      }
    }
  },
  methods: {
    async getOneType() {
      await this.$axios.get(`/tyvideo/one?id=${this.ID}`)
        .then(res => {
          console.log(res.data.videotype[0])
          this.editForm.type_tag = res.data.videotype[0].type_tag
          this.editForm.type_descripe = res.data.videotype[0].type_descripe
        })
    },
    async editBtn() {
      await this.$axios.post('/tyvideo/update', this.editForm)
        .then(res => {
          console.log(res)
          this.$emit('getVideoTypes')
          this.dialogFormVisible = false
        })
    }
  },
  created() {
    this.getOneType()
  }
}
</script>

<style lang="scss" scoped>
</style>