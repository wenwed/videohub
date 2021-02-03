<template>
    <div class="header clearfix">
        <div class="w">
            <!-- header左边 -->
            <div class="header-left fl">
                <ul>
                    <li></li>
                    <li>
                        <router-link to="/home">首页</router-link>
                    </li>
                    <li>
                        <!-- <router-link to="/home">排行</router-link> -->
                        排行
                    </li>
                </ul>
            </div>
            <!-- header右边 -->
            <div class="header-right fr"></div>
        </div>
    </div>
</template>

<script>
// import login from "./login.vue";
// import register from "./register.vue";
export default {
    components: {
        // login,
        // register,
    },
    data() {
        return {
            loginVisible: false,
            registerVisible: false,
        };
    },
    methods: {
        changeLogin() {
            this.loginVisible = !this.loginVisible;
        },
        changeRegister() {
            this.registerVisible = !this.registerVisible;
        },
        exitLogin() {
            localStorage.removeItem("userToken");
            localStorage.removeItem("USID");
            localStorage.removeItem("user_name");
            localStorage.removeItem("user_poster");
            localStorage.removeItem("register_date");
            localStorage.removeItem("user_descripe");
            localStorage.removeItem("isLogin");
            this.$store.commit("setToken", null);
            this.$store.commit("setUSID", null);
            this.$store.commit("setName", "");
            this.$store.commit("setPoster", "");
            this.$store.commit("setDate", "");
            this.$store.commit("setDescripe", "");
            this.$store.commit("setLogin", false);
        },
    },
    computed: {
        profile() {
            let tem = this.$store.state.poster
                ? this.$store.state.poster
                : "default.jpg";
            return "http://127.0.0.1:8633/api/user/getposter?poster=" + tem;
        },
        username() {
            return this.$store.state.name;
        },
        isLogin() {
            return this.$store.state.isLogin;
        },
    },
};
</script>

<style lang="scss" scoped>
a {
    color: #666;
    text-decoration: none;
}
ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

.clearfix::after {
    content: "";
    display: block;
    visibility: hidden;
    height: 0;
    line-height: 0;
    clear: 0;
}

.w {
    width: 1200px;
    margin: 0 auto;
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
    background-color: #fff;

    // header左边
    .header-left {
        ul {
            li {
                float: left;
                width: 70px;
                height: 35px;
                line-height: 35px;
                font-size: 16px;
                text-align: center;
            }

            li:nth-child(1) {
                width: 100px;
                background: url(../../public/logo.png) no-repeat center;
            }
        }
    }

    // header右边
}
</style>