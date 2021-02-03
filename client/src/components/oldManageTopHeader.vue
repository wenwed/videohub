<template>
    <div class="header-container">
        <div class="header-left">
            <div class="header-logo">
                <router-link to="/home"> logo </router-link>
            </div>
        </div>
        <div class="header-right">
            <div class="header-name">欢迎，{{ personName }}！</div>
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
.header-container {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: space-between;
    .header-left {
        margin-left: 30px;
        .header-logo {
            line-height: 35px;
        }
    }
    .header-right {
        margin-right: 30px;
        display: inline-block;
        vertical-align: middle;
        .header-name {
            line-height: 35px;
        }
    }
}
</style>