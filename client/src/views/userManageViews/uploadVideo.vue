<template>
  <el-container>
    <el-main>
      <div class="video-container">
        <div class="video-post">
          上传视频
          <el-upload
            drag
            :action="baseUrl + '/video/vdfile'"
            :on-success="handleVideoSuccess"
            multiple
          >
            <div>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
            </div>
          </el-upload>
        </div>
        <div>
          上传封面
          <el-upload
            class="poster-uploader"
            :action="baseUrl + '/video/poster'"
            :show-file-list="false"
            :on-success="handlePosterSuccess"
          >
            <img
              v-if="form.video_poster"
              :src="baseUrl + '/video/getposter?poster=' + form.video_poster"
              class="video_poster"
            />
            <i v-else class="el-icon-plus uploader-icon"></i>
          </el-upload>
        </div>
        <div class="video-info">
          <p>标题：</p>
          <div class="video-title">
            <el-input v-model="form.video_title" placeholder="请输入内容">
            </el-input>
          </div>
          <p>选择分区：</p>
          <div class="video-type">
            <el-select v-model="form.video_type" placeholder="请选择分区">
              <el-option
                v-for="item in tagList"
                :key="item.VTID"
                :label="item.type_tag"
                :value="item.VTID"
              >
              </el-option>
            </el-select>
          </div>
          <p>视频简介：</p>
          <div class="video-descripe">
            <el-input type="textarea" :rows="2" v-model="form.video_descripe">
            </el-input>
          </div>
          <div class="video-operation">
            <el-button type="primary" @click="confirmForm">确定</el-button>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: "http://127.0.0.1:8633/api",
      form: {
        video_poster: "",
        video_url: "",
        video_type: "",
        video_title: "",
        video_descripe: "",
      },
      tagList: [],
    };
  },
  methods: {
    getAllTags() {
      this.$axios.get("/tyvideo/all").then((res) => {
        this.tagList = res.data.videotypes;
      });
    },
    handleVideoSuccess(res) {
      this.form.video_url = res.video;
    },
    handlePosterSuccess(res) {
      this.form.video_poster = res.video_poster;
    },
    confirmForm() {
      this.$axios.post("/video/add", this.form).then((res) => {
        if (res.data.code === 200) {
          this.video_poster = "";
          this.video_url = "";
          this.video_type = "";
          this.video_title = "";
          this.video_descripe = "";
          alert("上传成功");
        }
      });
    },
  },
  created() {
    this.getAllTags();
  },
};
</script>

<style lang="scss" scoped>
.video-container {
  width: 500px;
  .poster-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 360px;
    .video_poster {
      width: 100%;
    }
    .uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 360px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
  }
  .video-info {
    .video-operation {
      margin-top: 15px;
    }
  }
  .poster-uploader:hover {
    border-color: #409eff;
  }
}
</style>