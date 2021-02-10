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
                <router-link :to="'/video/' + item.VDID">
                    <!-- 视频封面 -->
                    <img
                        :src="
                            'http://127.0.0.1:8633/api/video/getposter?poster=' +
                            item.video_poster
                        "
                        alt="封面"
                    />
                    <!-- 视频标题 -->
                    <span class="title">{{ item.video_title }}</span>
                </router-link>
                <!-- 视频作者 -->
                <router-link :to="'/user/' + item.video_owner" class="author">
                    <i class="el-icon-user"></i>
                    {{ item.user_name }}
                </router-link>
                <!-- 视频其他信息 -->
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
a {
    color: #666;
    text-decoration: none;
}

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
        border-bottom: 1px solid rgb(227, 229, 230);

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
            width: 36px;
            height: 23px;
            font-size: 12px;
            line-height: 25px;
            margin: 15px 20px 0 0;
            padding-left: 7px;
            border: 1px solid #666;
            border-radius: 5px;
            cursor: pointer;

            // 小三角
            &::after {
                content: "";
                position: absolute;
                top: 8px;
                right: 5px;
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
            position: relative;
            width: 228px;
            height: 190px;
            margin-right: 15px;
            border-radius: 5px;
            overflow: hidden;

            img {
                width: 100%;
                height: 128px;
            }

            .title {
                position: absolute;
                left: 7px;
                bottom: 65px;
                width: 216px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .author:hover {
                color: rgb(16, 161, 161);
            }
        }

        li:nth-child(-n + 5) {
            margin-bottom: 5px;
        }

        li:nth-child(5n) {
            margin-right: 0;
        }
    }
}
</style>