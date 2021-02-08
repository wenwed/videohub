<template>
    <div>
        <!-- 顶部导航 -->
        <top-header></top-header>
        <!-- 排行标题 -->
        <div class="rank-hd w">
            <div class="hd-left">
                <input type="text" placeholder="测试 装饰用" />
            </div>
            <div class="hd-right">
                <i class="el-icon-date"></i>
                <span>分区</span>
            </div>
        </div>
        <!-- 排行主体 -->
        <div class="rank-bd w"></div>
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
};
</script>

<style lang="scss" scoped>
.clearfix::after {
    content: "";
    display: block;
    height: 0;
    line-height: 0;
    visibility: hidden;
    clear: both;
}

.w {
    width: 1200px;
    margin: 0 auto;
}

.rank-hd {
    height: 45px;
    padding: 15px 0 0 10px;
    border-bottom: 1px solid rgb(227, 229, 230);

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
</style>