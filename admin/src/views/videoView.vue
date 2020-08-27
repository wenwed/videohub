<template>
  <div class="videoContainer">
    <el-main class="vdMain">
      <el-table
        :data="videoList"
        style="width: 100%">
        <el-table-column type="expand" class="expandForm">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="标题">
                <span>{{ props.row.video_title }}</span>
              </el-form-item>
              <el-form-item label="视频发表时间">
                <span>{{ props.row.video_date | Dayjs }}</span>
              </el-form-item>
              <el-form-item label="视频作者">
                <span>{{ props.row.video_owner }}</span>
              </el-form-item>
              <el-form-item label="视频种类">
                <span>{{ props.row.video_type }}</span>
              </el-form-item>
              <el-form-item label="描述" class="formDescripe">
                <span>{{ props.row.video_descripe }}</span>
              </el-form-item>
              <el-form-item label="视频封面链接" class="formPoster">
                <span>{{ props.row.video_url }}</span>
              </el-form-item>
              <el-form-item label="视频文件链接" class="formVideo">
                <span>{{ props.row.video_poster }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="ID"
          prop="VDID">
        </el-table-column>
        <el-table-column
          label="标题"
          prop="video_title">
        </el-table-column>
        <el-table-column label="审核">
          <template slot-scope="props">
            <i class="el-icon-success" @click="reviewPass(props.row)"></i>
            <i class="el-icon-error" @click="reviewNotPass(props.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reviewForm: {
        VDID: null,
        video_status: null
      },
      videoList: []
    }
  },
  methods: {
    async getUnreviewVideo() {
      await this.$axios.get('/admin/revideolist')
        .then(res => {
          this.videoList = res.data.videolist
        })
    },
    reviewPass( row ) {
      this.reviewForm.VDID = row.VDID
      this.reviewForm.video_status = 2
      this.confirmReview()
    },
    reviewNotPass( row ) {
      this.reviewForm.VDID = row.VDID
      this.reviewForm.video_status = 3
      this.confirmReview()
    },
    confirmReview() {
      this.$confirm(`确认该视频审核${this.reviewForm.video_status===2?"":"不"}通过？`, '确认信息', {
        distinguishCancelAndClose: false,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.postReview()
        })
        .catch(() => {
          this.reviewForm.VDID = null
          this.reviewForm.video_status = null
        });
    },
    async postReview() {
      await this.$axios.post('/admin/revideo', this.reviewForm)
        .then(res => {
          console.log(res)
          this.getUnreviewVideo()
        })
    },
  },
  created() {
    this.getUnreviewVideo()
  }
}
</script>

<style lang="scss" scoped>
.videoContainer{
  width: 100%;

  .vdMain{
    width: 100%;

    .el-form-item{
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }

    .formPoster, .formVideo, .formDescripe{
      width: 100%;
    }
  }
}
</style>