<template>
    <div class="rank">
        <!-- 分区标题 -->
        <div class="rank-hd">
            <h3>{{ typeInfo[0].type_tag }}</h3>
            <span>更多</span>
        </div>
        <!-- 分区视频 -->
        <ul class="rank-bd">
            <li v-for="item in videoRank" :key="item.VDID">
                <img
                    :src="
                        'http://127.0.0.1:8633/api/video/getposter?poster=' +
                        item.video_poster
                    "
                    alt="封面"
                />
                <!-- 作者 -->
                <div>
                    <span class="el-icon-user"></span>
                    {{ item.user_name }}
                </div>
                <!-- 其他信息 -->
                <div>
                    <span class="fl">
                        <i class="el-icon-video-play"></i>
                        {{ item.video_num | ViewCounts }}
                    </span>
                    <span class="fr">
                        <i class="el-icon-timer"></i>
                        {{ item.video_date | Dayjs("YYYY-MM-DD") }}
                    </span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ["typetag"],
    data() {
        return {
            typeInfo: [
                {
                    VTID: null,
                    type_tag: "分区",
                    type_descripe: "分区描述",
                },
            ],
            videoRank: [
                {
                    VDID: null,
                    video_poster: "default.jpg",
                    video_num: 0,
                    video_title: "视频标题",
                    video_owner: 0,
                    user_name: "作者",
                    video_date: "2020-08-19T04:39:40.000Z",
                },
            ],
        };
    },
    methods: {},
    created() {
        this.$axios
            .get(`/tyvideo/one?id=${this.typetag}`)
            .then((res) => {
                this.typeInfo = res.data.videotype;
                return this.$axios.get(
                    `/video/rank/type?type=${this.typetag}&index=1&pnum=8&date=-1`
                );
            })
            .then((res) => {
                this.videoRank = res.data.videolist;
            });
    },
};
</script>


<style lang="scss" scoped>
.fl {
    float: left;
}

.fr {
    float: right;
}

.rank {
    width: 1200px;
    margin: 10px auto 0;

    // 分区标题
    .rank-hd {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #ccc;

        h3 {
            float: left;
            height: 50px;
            margin: 0 0 0 15px;
            font-size: 25px;
            line-height: 50px;
        }

        span {
            float: right;
            position: relative;
            width: 35px;
            height: 23px;
            font-size: 12px;
            line-height: 23px;
            margin-top: 15px;
            margin-right: 20px;
            padding-left: 3px;
            border: 1px solid #666;
            border-radius: 5px;
            cursor: pointer;

            // 小三角
            &::after {
                content: "";
                position: absolute;
                top: 7px;
                right: 4px;
                width: 6px;
                height: 6px;
                border-top: 1px solid #666;
                border-right: 1px solid #666;
                transform: rotateZ(45deg);
            }
        }
    }

    // 分区主体
    .rank-bd {
        margin: 10px 0 0 0;
        padding: 0;
        color: rgb(109, 102, 102);
        font-size: 15px;
        line-height: 23px;
        list-style: none;

        li {
            float: left;
            width: 228px;
            height: 190px;
            margin-right: 15px;
            border-radius: 5px;
            overflow: hidden;

            img {
                width: 100%;
                height: 128px;
            }
        }

        li:nth-child(5n) {
            margin-right: 0;
        }
    }
}
</style>