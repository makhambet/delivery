<template>
    <nav class="h-block3-menu">
        <ul>
            <li @click="isActive=!isActive" v-for="(menu, index) in menuItems" :key="index">
                <router-link :to="menu.route">{{menu.title}}</router-link>
            </li>
        </ul>
        <div class="h-block1-select">
            <span @click="is_lang = !is_lang">{{USER_BY_ID.lang === 'ru' ? 'Русский' : 'English' || 'Русский'}}</span>
            <div v-if="is_lang">
                <div @click="change(), $ml.change(USER_BY_ID.lang === 'ru' ? 'en' : 'ru')">{{USER_BY_ID.lang === 'ru' ? 'English' : 'Русский' || 'English'}}</div>
            </div>
        </div>
        <br>
        <div class="h-block1-select">
            <span @click="cityClick=!cityClick">{{city || CITIES[0].name}}</span>
            <div v-if="cityClick">
                <div @click="cityClick=false, city=item.name" v-for="(item, index) in CITIES" :key="index">{{item.name}}</div>
            </div>
        </div>
    </nav>
</template>

<script>
    import { mapGetters } from 'vuex'
    import axios from 'axios'
    export default {
        data() {
            return {
                is_lang: false,
                url: 'http://194.4.58.28:9999',
                cityClick: false,
                city: ''
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
        },
        created () {
            this.$store.dispatch('GET_CITIES')
            this.$store.dispatch('GET_USER_BY_ID');
        },
    }
</script>

<style scoped>
    .h-block1-select{
        margin-left: 40px;
        padding: 5px 25px;
    }
</style>