<template>
    <div>
        <!-- 顶部导航栏 -->
        <top-header></top-header>
        <!-- 导航区域 -->
        <div class="nav w">
            <!-- 轮播栏 -->
            <div class="carousel"></div>
            <!-- 推荐 -->
            <ul class="recommend">
                <li v-for="item in lastAllRank" :key="item.VDID">
                    <router-link :to="'/video/' + item.VDID">
                        <img
                            :src="
                                baseUrl +
                                '/video/getposter?poster=' +
                                item.video_poster
                            "
                            alt="封面"
                        />
                        <span>{{ item.video_title }}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import topHeader from "../components/topHeader.vue";
// import carousel from "../components/carousel.vue";
// import typeRank from "../components/typeRank.vue";
export default {
    components: {
        // carousel,
        topHeader,
        // typeRank,
    },
    data() {
        return {
            baseUrl: "http://127.0.0.1:8633/api",
            allRank: [],
            allTypes: [],
        };
    },
    methods: {
        getAllRank() {
            this.$axios
                .get("/video/rank/all?index=1&pnum=6&date=-1")
                .then((res) => {
                    this.allRank = res.data.videolist;
                });
        },
        getVideoTypeRank() {
            this.$axios.get("/tyvideo/all").then((res) => {
                this.allTypes = res.data.videotypes;
            });
        },
    },
    created() {
        this.getAllRank();
        this.getVideoTypeRank();
    },
    computed: {
        lastAllRank() {
            return this.allRank.slice(-6);
        },
    },
};
</script>

<style lang="scss" scoped>
a {
    color: #666;
    text-decoration: none;
}

.nav {
    width: 1200px;
    margin: 3px auto 0;

    // 轮播栏
    .carousel {
        float: left;
        width: 480px;
        height: 270px;
        margin-right: 10px;
        background-color: aqua;
    }

    //推荐信息
    .recommend {
        float: left;
        width: 710px;
        height: 270px;
        margin: 0;
        padding: 0;
        list-style: none;

        li {
            position: relative;
            float: left;
            width: 230px;
            height: 130px;
            margin-right: 10px;
            border-radius: 10px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
            }

            span {
                position: absolute;
                left: 10px;
                bottom: 3px;
                width: 210px;
                color: #666;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        &:nth-child(-n + 3) li {
            margin-bottom: 10px;
        }

        li:nth-child(3n) {
            margin-right: 0;
        }
    }
}
</style>