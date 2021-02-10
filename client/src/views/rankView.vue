<template>
    <div>
        <!-- 顶部导航 -->
        <top-header></top-header>
        <!-- 排行标题 -->
        <div class="rank-hd w">
            <div class="hd-left">
                <!-- 搜索框 -->
                <input type="text" placeholder="测试 装饰用" />
            </div>
            <div class="hd-right">
                <!-- 日期 -->
                <i class="el-icon-date"></i>
                <span>分区</span>
            </div>
        </div>
        <!-- 排行主体 -->
        <div class="rank-bd w">
            <ul>
                <!-- 排行列表 -->
                <li v-for="(item, i) in rankList" :key="item.VTID">
                    <!-- 排名 -->
                    <span class="num">
                        {{ i + 1 }}
                    </span>

                    <!-- 视频信息 -->
                    <router-link :to="'/video/' + item.VDID" class="content">
                        <router-link :to="'/video/' + item.VDID" class="img">
                            <img
                                :src="
                                    baseUrl +
                                    '/video/getposter?poster=' +
                                    item.video_poster
                                "
                                alt="封面"
                            />
                        </router-link>
                        <div class="info">
                            <!-- 标题 -->
                            <router-link
                                :to="'/video/' + item.VDID"
                                class="title"
                            >
                                {{ item.video_title }}
                            </router-link>

                            <!-- 视频其他信息 -->
                            <div class="detail">
                                <router-link :to="'/user/' + item.video_owner">
                                    <i class="el-icon-user"></i>
                                    {{ item.user_name }}
                                </router-link>
                            </div>

                            <!-- 热度 -->
                            <div class="hot">
                                <h3>
                                    {{ item.video_num }}
                                </h3>
                                <p>播放</p>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- 底部版权信息 -->
        <copy-right></copy-right>
    </div>
</template>

<script>
import topHeader from "../components/topHeader.vue";
import copyRight from "../components/copyRight.vue";
export default {
    components: {
        topHeader,
        copyRight,
    },
    data() {
        return {
            baseUrl: "http://127.0.0.1:8633/api",
            isTypeRank: false, //是否是分区排行
            allTypes: null, //所有分区
            rankList: null, //排行列表
            typeID: null, //分区id
        };
    },
    methods: {
        // 获取排行
        getRank() {
            if (this.isTypeRank) {
                this.$axios
                    .get(
                        `/video/rank/type?type=${this.typeID}&index=1&pnum=10&date=10`
                    )
                    .then((res) => {
                        this.rankList = res.data.videolist;
                    });
            } else {
                this.$axios
                    .get(`/video/rank/all?index=1&pnum=10&date=10`)
                    .then((res) => {
                        this.rankList = res.data.videolist;
                    });
            }
        },
        // 获取分区列表
        getVideoType() {
            this.$axios.get("/tyvideo/all").then((res) => {
                this.allTypes = res.data.videotypes;
            });
        },
    },
    created() {
        this.getVideoType();
        this.getRank();
    },
};
</script>

<style lang="scss" scoped>
a {
    color: #666;
    text-decoration: none;
}

a:hover {
    color: rgb(16, 161, 161);
}

.w {
    width: 1200px;
    margin: 0 auto;
}

// 排行标题
.rank-hd {
    height: 45px;
    padding: 15px 0 0 10px;

    .hd-left {
        float: left;
        width: 400px;
        height: 25px;
        border-radius: 15px;
        border: 1px solid #666;
        font-size: 14px;

        input {
            width: 360px;
            margin: 4px 0 0 10px;
            border: 0;
            outline: none;
        }
    }

    .hd-right {
        float: right;
        font-size: 15px;
        margin-right: 200px;
        margin-top: 8px;

        span {
            display: inline-block;
            margin: 0 6px;

            &::after {
                content: "";
                display: inline-block;
                width: 0;
                height: 0;
                margin-left: 1px;
                border: 6px solid transparent;
                border-top-color: #666;
                transform: translateY(4px);
            }
        }
    }
}

// 排行主体
.rank-bd {
    ul {
        padding: 0;
        margin: 0;
        list-style: none;

        li {
            height: 70px;
            padding: 15px 0;
            border-top: 1px solid rgb(227, 229, 230);

            //排名
            .num {
                float: left;
                width: 70px;
                height: 70px;
                color: #666;
                font-size: 36px;
                font-weight: 700;
                line-height: 70px;
                text-align: center;
            }

            //排行信息
            .content {
                float: left;
                position: relative;
                width: 1086px;
                height: 70px;

                //封面
                .img {
                    display: block;
                    float: left;
                    width: 114px;
                    height: 70px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                //视频信息
                .info {
                    margin: 0 0 0 124px;

                    //视频标题
                    .title {
                        display: block;
                        height: 35px;
                        color: black;
                        font-size: 16px;
                        font-weight: 700;
                        overflow: hidden;
                    }

                    //视频其它信息
                    .detail {
                        height: 33px;
                        padding-top: 2px;

                        a {
                            display: block;
                            float: left;
                            margin-right: 5px;
                        }
                    }

                    //视频热度
                    .hot {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        text-align: center;

                        h3 {
                            margin: 0;
                            font-size: 20px;
                            color: rgb(6, 104, 250);
                        }

                        p {
                            margin: 7px 0 0 0;
                            font-size: 12px;
                            color: #666;
                        }
                    }
                }
            }
        }
    }
}
</style>