<template>
  <el-container>
    <el-main>
      <div class="video-post">
        上传视频
        <el-upload
          drag
          :action="headurl+'/video/vdfile'"
          :on-success="handleVideoSuccess"
          multiple>
          <p v-if="form.video_url">{{ videofilename }}</p>
          <div v-else>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </div>
        </el-upload>
      </div>
      <div class="poster-post">
        <el-upload
          :action="headurl+'/video/poster'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="form.video_poster" :src="headurl+form.video_poster" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="video-info">
        <p>标题：</p>
        <div class="video-title">
          <el-input
            v-model="form.video_title"
            placeholder="请输入内容">
          </el-input>
        </div>
        <p>选择分区：</p>
        <div class="video-type">
          <el-select v-model="form.video_type" placeholder="请选择分区">
            <el-option
              v-for="item in tagList"
              :key="item.VTID"
              :label="item.type_tag"
              :value="item.VTID">
            </el-option>
          </el-select>
        </div>
        <p>视频简介：</p>
        <div class="video-descripe">
          <el-input
            type="textarea"
            :rows="2"
            v-model="form.video_descripe">
          </el-input>
        </div>
        <div class="video-operation">
          <el-button type="primary" @click="confirmForm">确定</el-button>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      headurl: "http://127.0.0.1:8633/api",
      posterfilename: "",
      videofilename: "",
      form: {
        video_poster: "",
        video_url: "",
        video_type: "",
        video_title: "",
        video_descripe: "",
      },
      tagList: []
    }
  },
  methods: {
    getAllTags() {
      this.$axios.get('/tyvideo/all')
        .then(res => {
          this.tagList = res.data.videotypes;
        })
    },
    handleVideoSuccess(res) {
      this.form.video_url = res.data.video;
    },
    handleAvatarSuccess(res) {
      this.form.video_poster = res.data.poster;
    },
    confirmForm() {
      this.$axios.post('/video/add', this.form)
        .then(res => {
          if(res.code === 200){
            alert("上传成功");
          }
        })
    }
  },
  created() {
    this.getAllTags();
  }
}
</script>
<style lang="scss" scoped>
</style>