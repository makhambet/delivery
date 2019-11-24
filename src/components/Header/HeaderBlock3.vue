<template>
    <nav class="h-block3-menu">
        <ul>
            <li @click="isActive=!isActive" v-for="(menu, index) in menuItems" :key="index">
                <router-link :to="menu.route">{{menu.title}}</router-link>
            </li>
        </ul>
        <div style="margin: 20px 0 20px 40px;" class="h-block1-select">
            <span @click="log_in()" v-if="!login">{{$ml.get('come_in')}}</span>
            <span @click="logout()" v-if="login">{{$ml.get('exit')}}</span>
        </div>
        <div class="h-block1-select">
            <span @click="is_lang = !is_lang">{{USER_BY_ID.lang === 'ru' ? 'Русский' : 'English' || 'Русский'}}</span>
            <div v-if="is_lang">
                <div @click="change(), $ml.change(USER_BY_ID.lang === 'ru' ? 'en' : 'ru')">{{USER_BY_ID.lang === 'ru' ? 'English' : 'Русский' || 'English'}}</div>
            </div>
        </div>
        <br>
        <div style="margin-bottom: 40px;" class="h-block1-select">
            <span @click="cityClick=!cityClick">{{city || CITIES[0].name}}</span>
            <div v-if="cityClick">
                <div @click="cityClick=false, city=item.name" v-for="(item, index) in CITIES" :key="index">{{item.name}}</div>
            </div>
        </div>
        <app-authorization @authorization="author($event)" :auth="auth"></app-authorization>
        <app-alert v-if="visible" :propName="propTitle"></app-alert>
    </nav>
</template>

<script>
    import AppAuthorization from '@/components/Authorization.vue'
    import { MLBuilder } from 'vue-multilanguage'
    import { mapGetters } from 'vuex'
    import AppAlert from '@/components/AppAlert.vue'
    import authen from '@/help/user_id'
    import axios from 'axios'
    export default {
        data() {
            return {
                is_lang: false,
                url: 'http://server.zakaz-online.kz:9999/',
                cityClick: false,
                city: '',
                login: false,
                auth: false,
                visible: false
            }
        },
        computed:{
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
            },
            ...mapGetters([
                'USER_BY_ID',
                'CITIES'
            ])
            
        },
        methods: {
            change(){
                let lang;
                if(localStorage.delivery_login === 'true'){
                    if(this.USER_BY_ID.lang === 'ru') lang = 'en'
                    if(this.USER_BY_ID.lang === 'en') lang = 'ru'
                    axios.post(this.url + 'api/user/edit', 
                    {
                        lang: lang
                    },
                    {
                        headers: {
                            token: localStorage.delivery_token
                        }
                    })
                    .then(response => { 
                        
                    })
                    .catch(error => {
                        
                    });
                    setTimeout(() => {
                        this.$store.dispatch('GET_USER_BY_ID');
                        this.is_lang = false;
                        this.$store.dispatch('GET_CATS');
                        // this.$store.dispatch('GET_FILTER_CATS', [ {id: 2} ])
                    }, 300);
                    
                }
            },
            log_in(){
                this.auth = true
                localStorage.delivery_login = true
                authen.auth = true
                this.$store.dispatch('GET_USER_BY_ID')
                this.$store.dispatch('GET_BASKET_LIST')
            },
            logout(){
                this.propTitle = this.$ml.get('log_out')
                this.visible = true
                setTimeout(() => {
                    this.visible = false
                }, 2000);
                localStorage.delivery_login = false;
                this.login = false
                // authen.token = localStorage.delivery_token = localStorage.delivery_id = localStorage.delivery_user_id = authen.id = null
                
                // this.$store.dispatch('GET_USER_BY_ID');
                localStorage.clear();
                this.profile = false;
                setTimeout(() => {
                    this.$store.dispatch('GET_BASKET_LIST')
                }, 500);
                this.$router.push({path: '/'})
            },
            author(data){
                this.login = data
                this.auth = false
                if(data){
                    this.$ml.lang = this.$store.getters.USER_BY_ID.lang
                    this.propTitle = this.$ml.get('log_in')
                    this.visible = true
                    setTimeout(() => {
                        this.visible = false
                    }, 2000);
                }
            },
        },
        created () {
            this.login = localStorage.delivery_login
            if(this.login === 'false') this.login = false
            if(this.login === 'true') this.login = true
            this.$store.dispatch('GET_CITIES')
            this.$store.dispatch('GET_USER_BY_ID');
        },
        components: {
            AppAuthorization,
            AppAlert
        },
    }
</script>

<style scoped>
    .h-block1-select{
        margin-left: 40px;
        padding: 5px 25px;
    }
</style>