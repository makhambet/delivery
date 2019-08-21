<template>
    <div class="header">
        <div v-if="!download" class="download">
            <div>&nbsp;</div>
            <p>Скачай наше приложение!</p>
            <div class="download-follow-img">
                <img src="../assets/images/qas.png" alt="">
                <img src="../assets/images/qpm.png" alt="">
            </div>
            <div @click="download = true" class="download-exit">
                ×
            </div>
        </div>
        <div class="header-block1">
            <app-authorization @authorization="author($event)" :auth="auth"></app-authorization>
            <div class="wrapper">
                <router-link tag="div" :to="'/'" class="h-block1-logo">DELIVERY</router-link>
                <select class="h-block1-select">
                    <option>Русский</option>
                    <option>Английский</option>
                </select>
                <form class="h-block1-form" action="search">
                    <input ref="input" type="text" v-model="searchModel" placeholder="Найдите все для повседневной жизни">
                    <router-link :disabled="searchModel===null" tag="button" class="search-btn" to="/all"><i @click="searching()" class="fas fa-search"></i></router-link>
                </form>
                <div class="h-block1-chosen">
                    <router-link :to="'/chosen'"><i class="fas fa-heart"></i></router-link>
                </div>
                <div class="h-block1-cart">
                    <router-link :to="'/cart'"><img src="../assets/images/Cart2.svg" alt=""><span class="cart-counter">{{count() }}</span></router-link>
                </div>
                <div v-if="login" class="h-block1-profile">
                    <router-link tag="div" :to="'/profile'" class="h-block1-profile">
                        <div><img src="../assets/images/Intersection1.png" alt=""></div>
                        <span>Привет, {{USER_BY_ID.name}}!</span> 
                    </router-link>
                    <i class="fas fa-caret-down"><div @click="logout()">Выход</div></i>
                </div>
                <div style="cursor: pointer;" v-if="!login" @click="log_in">Войти</div>
            </div>
        </div>
        <div class="header-block2">
            <div class="wrapper">
                <nav class="h-block2-menu">
                    <ul>
                        <li v-for="(menu, index) in menus" :key="index">
                            <router-link :to="menu.route"><span @click="product_title('Товары')">{{menu.title}}</span></router-link>
                        </li>
                    </ul>
                </nav>
                <div class="h-block2-geo">
                    <div class="h-geo-img">
                        <img src="../assets/images/Group8956.png" alt="">
                    </div>
                    <select>
                        <option v-for="(item, index) in CITIES" :key="index">{{item.name}}</option>
                    </select>
                </div>
            </div>
        </div>
        <div :class="{'h-block3': isActive}" class="header-block3">
            <nav class="h-block3-menu">
                <ul>
                    <li @click="isActive=!isActive" v-for="(menu, index) in menuItems" :key="index">
                        <router-link :to="menu.route">{{menu.title}}</router-link>
                    </li>
                </ul>
                <select>
                    <option>Русский</option>
                    <option>Қазақша</option>                    
                </select>
                <br>
                <select name="">
                    <option>Алматы</option>
                    <option>Шымкент</option>
                    <option>Астана</option>
                </select>
            </nav>
        </div>
        <div v-if="isActive" @click="isActive=!isActive" class="resize"></div>
        <div class="header-block5">
            <div class="wrapper">
                <div @click="isActive=!isActive" class="toggle">
                    <div id="one" class="span"></div>
                    <div id="two" class="span"></div>
                    <div id="three" class="span"></div>
                </div>
                <div class="h-block5-content">
                    <div class="h-block5-search">
                        <router-link tag="form" class="search-btn" to="/all"><input v-model="searchModel" type="text" placeholder="🔍Поиск"></router-link>
                    </div>
                    <div class="h-block5-img">
                        <router-link :to="'/cart'"><img src="../assets/images/Cart2.svg" alt=""><span style="width: 20px;height: 20px;" class="cart-counter">{{count()}}</span></router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import counter from '../help/cart'
    import authen from '../help/user_id'
    import AppAuthorization from '@/components/Authorization.vue'
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                searchModel: '',
                counter: 0,
                isActive: false,
                download: localStorage.download || true,
                login: false,
                auth: false
            }
        },
        computed:{
            ...mapGetters([
                'CITIES',
                'USER_BY_ID',
                'BASKET_COUNT'
            ]),
            menus(){
                return[
                    {
                        title: 'Главная',
                        route: '/'
                    },
                    {
                        title: 'Заказы',
                        route: '/orders'
                    },
                    {
                        title: 'Товары',
                        route: '/all'
                    },
                    {
                        title: 'Оплата',
                        route: '/payment'
                    },
                    {
                        title: 'Контакты',
                        route: '/about'
                    },
                ]
            },
            menuItems(){
                return [
                    {
                        title: 'Главная',
                        route: '/'
                    },
                    {
                        title: 'Заказы',
                        route: '/orders'
                    },
                    {
                        title: 'Товары',
                        route: '/all'
                    },
                    {
                        title: 'Оплата',
                        route: '/payment'
                    },
                    {
                        title: 'Контакты',
                        route: '/about'
                    },
                    {
                        title: 'Профиль',
                        route: '/profile'
                    },
                    {
                        title: 'Избранные',
                        route: '/chosen'
                    },
                    {
                        title: 'Особый заказ',
                        route: '/special'
                    }
                ]
            }
            
        },
        methods: {
            searching(){
                counter.searchInput = this.searchModel
                // this.searchModel = ''
            },
            count(){
                this.$store.dispatch('GET_BASKET_LIST')
                return this.BASKET_COUNT
            },
            product_title(title){
                localStorage.product_title = title
            },
            log_in(){
                this.auth = true
                localStorage.login = true
                authen.auth = true
                console.log(localStorage)
                this.$store.dispatch('GET_USER_BY_ID')
            },
            logout(){
                localStorage.login = false
                this.login = false
                authen.token = null
                localStorage.token = null
                localStorage.id = null
                localStorage.user_id = null
                authen.id = null
                console.log(localStorage)
                console.log(authen)
                this.$router.push({path: '/'})
            },
            author(data){
                this.login = data
                this.auth = !data
            },
            // search(e){
            //     counter.searchInput += e.key
            //     console.log('header - >    '   + counter.searchInput)
            // }
        },
        mounted () {
            this.count()
            let input = this.$refs.input
            // input.addEventListener('keydown', this.search)
            // this.$store.dispatch('GET_SEARCHING', this.searchModel)
            this.$store.dispatch('GET_BASKET_LIST')
        },
        created () {
            this.$store.dispatch('GET_BASKET_LIST')
            this.login = localStorage.login
            if(this.login === 'false') this.login = false
            if(this.login === 'true') this.login = true
            this.counter = counter.counter;
            this.$store.dispatch('GET_CITIES')
            if (localStorage.download) {
                this.download = localStorage.download;
            }
            else{
                this.download = false
            }
        },
        watch: {
            download(newName) {
                localStorage.download = newName;
            }
        },
        components: {
            AppAuthorization,
        },
    }
</script>

<style scoped>
    .h-block1-profile, .h-block1-logo{
        cursor: pointer;
    }
</style>