<template>
    <div class="content">
        <!-- 图片 -->
        <ul ref="pics">
            <li v-for="(item, index) of lists" :key="index" class="pic">
                <router-link :to="'/video/' + item.VDID">
                    <!-- item.video_descripe -->
                    <img
                        :src="
                            'http://127.0.0.1:8633/api/video/getposter?poster=' +
                            item.video_poster
                        "
                        alt="轮播图片"
                    />
                </router-link>
            </li>
        </ul>
        <!-- 下方点 -->
        <ul class="dot">
            <li v-for="item in videolist" :key="item.VDID"></li>
        </ul>
        <!-- 上一张按钮 -->
        <div class="before">
            <span></span>
        </div>
        <!-- 下一张按钮 -->
        <div class="after">
            <span></span>
        </div>
    </div>
</template>

<script>
export default {
    props: ["videolist"],
    data() {
        return {
            carousel: {
                // 当前播放的图片
                index: 0,
                // 一张图片的宽度
                picWidth: 480,
                // 动画内部使用定时器
                animateTimer: null,
            },
            // 轮播栏自动播放定时器
            timer: null,
            // 有修改视频列表的需求，prop修改不了
            lists: null,
        };
    },
    methods: {
        // 动画函数
        animate(obj, target) {
            return new Promise((resolve) => {
                clearInterval(this.carousel.animateTimer);
                let used = obj.offsetLeft;
                if (target > 0) {
                    this.carousel.animateTimer = setInterval(() => {
                        if (obj.offsetLeft <= used - this.carousel.picWidth) {
                            clearInterval(this.carousel.animateTimer);
                        } else {
                            obj.style.left = obj.offsetLeft - 5 + "px";
                        }
                    }, 1);
                } else {
                    this.animateTimer = setInterval(() => {
                        if (obj.offsetLeft >= used + this.carousel.picWidth)
                            clearInterval(this.carousel.animateTimer);
                        else obj.style.left = obj.offsetLeft + 5 + "px";
                    }, 1);
                }
                resolve();
            });
        },
        // 自动滚动函数
        autoRoll() {
            if (this.carousel.index !== this.lists.length - 1) {
                this.carousel.index++;
                this.animate(this.$refs.pics, 1);
            } else {
                this.carousel.index = 0;
                this.lists.push(this.lists[0]);
                console.log(this.lists[0]);
                console.log(this.lists[6]);
                this.animate(this.$refs.pics, 1).then(() => {
                    this.lists.pop();
                    this.$refs.pics.style.left = 0;
                });
            }
        },
    },
    created() {},
    mounted() {
        this.timer = setInterval(this.autoRoll, 1000);
    },
    watch: {
        videolist(newVal) {
            this.lists = newVal;
        },
    },
};
</script>

<style lang="scss" scoped>
// 一张图片的宽度
$picWidth: 480px;

ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

.content {
    overflow: hidden;
    position: relative;

    // 轮播图片
    ul {
        position: relative;
        left: 0;
        width: $picWidth * 7;
        height: 100%;

        .pic {
            float: left;
            width: $picWidth;
            height: 100%;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    // 下方小点
    .dot {
        position: absolute;
        left: 240px;
        top: 247px;
        width: 96px;
        transform: translateX(-50%);

        li {
            float: left;
            width: 10px;
            height: 10px;
            margin: 0 3px;
            border-radius: 5px;
            background-color: rgba(0, 0, 0, 0.4);
            cursor: pointer;
        }
    }

    // 前后按钮
    div {
        position: absolute;
        top: 140px;
        width: 25px;
        height: 30px;
        background: rgba(0, 0, 0, 0.4);
        overflow: hidden;
        cursor: pointer;

        span {
            position: absolute;
            width: 10px;
            height: 10px;
            border-top: 2px solid #fff;
            border-right: 2px solid #fff;
        }
    }

    .before {
        left: 10px;
        border-radius: 15px 0 0 15px;

        span {
            top: 9px;
            left: 11px;
            transform: rotateZ(-135deg);
        }
    }

    .after {
        right: 10px;
        border-radius: 0 15px 15px 0;

        span {
            top: 9px;
            right: 11px;
            transform: rotateZ(45deg);
        }
    }
}
</style>