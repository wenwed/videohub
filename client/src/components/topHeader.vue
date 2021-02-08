<template>
    <div class="header">
        <div class="w">
            <!-- header左边 -->
            <div class="header-left fl">
                <ul>
                    <li class="logo">
                        <router-link to="/home"></router-link>
                    </li>
                    <li>
                        <router-link to="/home">首页</router-link>
                    </li>
                    <li>
                        <router-link to="/rank">排行</router-link>
                    </li>
                </ul>
                <div class="search">
                    <input type="text" placeholder="测试" />
                    <span class="el-icon-search"></span>
                </div>
            </div>
            <!-- header右边 -->
            <div class="header-right fr">
                <div v-if="!isLogin">
                    <div class="avatar fl">
                        <img :src="profile" alt="头像" />
                    </div>
                    <!-- 账号操作 -->
                    <div class="account fl">
                        <div class="no-login">
                            <button @click="changeLogin">登录</button>
                            <button @click="changeRegister">注册</button>
                        </div>
                    </div>
                </div>
                <div v-if="isLogin">
                    <router-link :to="'/user/' + $store.state.USID">
                        <div class="avatar fl">
                            <img :src="profile" alt="头像" />
                        </div>
                        <!-- <h3>{{ username }}</h3> -->
                    </router-link>
                    <!-- 账号操作 -->
                    <div class="account fl">
                        <div class="logined">
                            <button @click="exitLogin">注销</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <login
            :changeVisible="changeLogin"
            :loginvisible="loginVisible"
            v-if="loginVisible"
        ></login>

        <register
            :changeVisible="changeRegister"
            :registervisible="registerVisible"
            v-if="registerVisible"
        ></register>
    </div>
</template>

<script>
import login from "./login.vue";
import register from "./register.vue";
export default {
    components: {
        login,
        register,
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
    line-height: 35px;
    background-color: #fff;
    border-bottom: 1px solid rgb(227, 229, 230);

    // header左边
    .header-left {
        ul {
            float: left;
            li {
                float: left;
                width: 70px;
                height: 35px;
                font-size: 16px;
                text-align: center;
            }

            .logo {
                width: 100px;
                background: url(../../public/logo.png) no-repeat center;

                a {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .search {
            float: left;
            width: 200px;
            height: 30px;
            margin: 2px 0 0 30px;
            padding-left: 14px;
            border: 1px solid #ccc;
            border-radius: 15px;
            font-size: 12px;

            input {
                float: left;
                display: block;
                width: 173px;
                height: 30px;
                padding: 0;
                border: 0;
                outline: none;
            }

            span {
                font-size: 14px;
                cursor: pointer;
            }
        }
    }

    // header右边
    .header-right {
        .avatar {
            width: 30px;
            height: 30px;
            margin-top: 3px;
            border-radius: 15px;
            overflow: hidden;

            img {
                width: 100%;
            }
        }
        .account {
            width: 80px;
            font-size: 14px;

            button {
                width: 40px;
                height: 35px;
                border: 0;
                background-color: #fff;
                cursor: pointer;
                outline: none;
            }
        }
    }
}
</style>