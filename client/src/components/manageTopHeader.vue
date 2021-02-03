<template>
    <div class="header clearfix">
        <div class="header-left fl">
            <router-link to="/home">
                <div class="logo"></div>
            </router-link>
        </div>
        <div class="header-right fr">
            <div class="welcome">欢迎，{{ personName }}！</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            personName: this.$store.state.name,
        };
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

.header {
    width: 100%;
    height: 35px;
    line-height: 35px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;

    .header-left {
        padding-left: 35px;

        .logo {
            width: 100px;
            height: 35px;
            background: url(../../public/logo.png) no-repeat center;
        }
    }

    .header-right {
        padding-right: 40px;
    }
}
</style>