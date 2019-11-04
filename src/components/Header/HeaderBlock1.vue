<template>
    <div class="header-block1">
        <app-authorization @authorization="author($event)" :auth="auth"></app-authorization>
        <div class="wrapper">
            <router-link tag="div" :to="'/'" class="h-block1-logo" style="cursor: pointer;">ZAKAZ&nbsp;ONLINE</router-link>
            <div class="h-block1-select">
                <span @click="openLangs()">{{langs(USER_BY_ID.lang)}}</span>
                <div v-if="is_lang">
                    <div @click="change(), $ml.change(USER_BY_ID.lang === 'ru' ? 'en' : 'ru')">{{USER_BY_ID.lang === 'ru' ? 'English' : 'Русский' || 'English'}}</div>
                </div>
            </div>
            <form class="h-block1-form" action="search">
                <input ref="input" type="text" v-model="searchModel" :placeholder="$ml.get('search_input')">
                <div v-if="remove" @click="removeSrc()" class="searchExit">x</div>
                <button :disabled="searchModel===null" class="search-btn" @click.prevent="searching()"><i class="fas fa-search"></i></button>
            </form>
            <div class="h-block1-chosen">
                <router-link :to="'/chosen'"><i class="fas fa-heart"></i></router-link>
            </div>
            <div class="h-block1-cart">
                <router-link :to="'/cart'"><img src="@/assets/images/Cart2.svg" alt=""><span class="cart-counter">{{count() }}</span></router-link>
            </div>
            <div v-if="login" class="h-block1-profile">
                <div @click="profile=true" class="h-block1-profile">
                    <div><img src="@/assets/images/Intersection1.png" alt=""></div>
                    <span v-text="$ml.get('myMessage')"></span>
                    <span>,{{USER_BY_ID.name.slice(0, 8)}}!</span> 
                    <span></span>
                </div>
                <i class="fas fa-caret-down"></i>
                <div v-if="profile" class="h-block-exit">
                    <router-link tag="p" :to="'/profile'"><span @click="profile = false">{{$ml.get('profile')}}</span></router-link>
                    <p @click="logout()" >{{$ml.get('exit')}}</p>
                </div>
            </div>
            <div style="cursor: pointer;" v-if="!login" @click="log_in()">{{$ml.get('come_in')}}</div>
        </div>
        <app-alert v-if="visible" :propName="propTitle"></app-alert>
        <div v-if="profile" @click="profile = false" class="close"></div>
    </div>
</template>

<script>
    import AppAuthorization from '@/components/Authorization.vue'
    import { MLBuilder } from 'vue-multilanguage'
    import AppAlert from '@/components/AppAlert.vue'
    import { mapGetters } from 'vuex'
    import authen from '@/help/user_id'
    import axios from 'axios'
    import config from '@/help/config'
    export default {
        data() {
            return {
                searchModel: '',
                auth: false,
                login: false,
                counter: this.$store.getters.BASKET_COUNT,
                visible: false,
                propTitle: this.$ml.get('log_in'),
                remove: false,
                lang: '',
                changeLang: '',
                is_lang: false,
                url: config.url,
                profile: false
            }
        },
        computed:{
            ...mapGetters([
                'USER_BY_ID'
            ]), 
            mlmyMessage () {
                return new MLBuilder('header')
            }    
        },
        methods: {
            count(){
                return this.$store.getters.BASKET_COUNT
            },
            searching(){
                this.$store.dispatch('GET_SEARCH', {
                    params: {
                        text: this.searchModel
                    },
                    headers: {
                        token: 'my_token'
                    }
                })
                localStorage.delivery_product_title = this.$ml.get('products')
                localStorage.delivery_product_catid = null
                this.$router.push({path: 'products'})
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
                this.$store.dispatch('GET_BASKET_LIST')
                this.$router.push({path: '/'})
            },
            author(data){
                this.login = data
                this.auth = false
                if(data){
                    this.$ml.lang = this.$store.getters.USER_BY_ID.lang
                    console.log(this.$ml.lang)
                    this.propTitle = this.$ml.get('log_in')
                    this.visible = true
                    setTimeout(() => {
                        this.visible = false
                    }, 2000);
                }
            },
            removeSrc(){
                this.searchModel = ''
                this.$store.dispatch('GET_SEARCH', {
                    params: {
                        text: this.searchModel
                    },
                    headers: {
                        token: localStorage.delivery_token || 'my_token'
                    }
                })
            },
            change(){
                let lang;
                console.log('sadfjsdf')
                if(localStorage.delivery_login === 'true'){
                    if(this.USER_BY_ID.lang === 'ru') lang = 'en'
                    if(this.USER_BY_ID.lang === 'en') lang = 'ru'
                    console.log(lang)
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
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error.response)
                    });
                    setTimeout(() => {
                        this.$store.dispatch('GET_USER_BY_ID');
                        this.is_lang = false;
                        this.$store.dispatch('GET_CATS');
                        // this.$store.dispatch('GET_FILTER_CATS', [ {id: 2} ])
                    }, 300);
                    
                }
            },
            langs(lang){
                if(lang === 'ru') return 'Русский';
                if(lang === 'en') return 'English';
                else return 'Русский'
            },
            openLangs(){

                if(this.login === 'true' || this.login === true)
                    this.is_lang = !this.is_lang;
                else{
                    this.propTitle = this.$ml.get('not_auth')
                    this.visible = true
                    setTimeout(() => {
                        this.visible = false
                    }, 1000);
                }
            }
        },
        mounted () {
            // this.$store.dispatch('GET_BASKET_LIST')
            this.count();
            this.$ml.lang = this.USER_BY_ID.lang || 'ru'
            setTimeout(() => {
                console.log(this.USER_BY_ID.lang)
                this.$ml.change(this.USER_BY_ID.lang)
            }, 500);
            this.lang = localStorage.delivery_login
        },
        created () {
            this.login = localStorage.delivery_login
            if(this.login === 'false') this.login = false
            if(this.login === 'true') this.login = true
            this.$store.dispatch('GET_CITIES')
            this.$store.dispatch('GET_USER_BY_ID')
        },
        watch: {
            searchModel() {
                if(this.searchModel !== '')
                    this.remove = true
                else if(this.searchModel === '')
                {
                    this.remove = false
                    this.$store.dispatch('GET_SEARCH', {
                        params: {
                            text: this.searchModel
                        },
                        headers: {
                            token: 'my_token'
                        }
                    })
                }
            }
        },
        components: {
            AppAuthorization,
            AppAlert
        },
    }
</script>

<style scoped>
    form{
        position: relative;
    }
    .searchExit{
        position: absolute;
        top: 5px;
        line-height: 18px;
        right: 55px;
        background: rgb(255, 233, 235);
        height: 20px;
        width: 20px;
        color: #FF4252;
        text-align: center;
        border-radius: 50% 50%;
        cursor: pointer;
    }
    .h-block-exit{
        position: absolute;
        top: calc(100% + 2px);
        z-index: 2;
        background: #fff;
        width: 100%;
        left: 4px;
        text-align: center;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, .2);
    }
    .h-block-exit > p:first-child{
        border-bottom: 1px solid rgba(0, 0, 0, .2);
        padding-bottom: 5px;
    }
    .close{
        top: 0;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }
</style>