<template>
    <div class="content">
        <!-- 图片 -->
        <ul>
            <li v-for="item in videolist" :key="item.VDID" class="pic">
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
        <div class="before">
            <span></span>
        </div>
        <div class="after">
            <span></span>
        </div>
    </div>
</template>

<script>
export default {
    props: ["videolist"],
};
</script>

<style lang="scss" scoped>
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
        .pic {
            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    // 下方小点
    .dot {
        position: absolute;
        left: 50%;
        top: 247px;
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