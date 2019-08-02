<template>
    <div class="header">
        <div class="header-block1">
            <div class="wrapper">
                    {{cartCount()}}
                <router-link tag="div" :to="'/'" class="h-block1-logo">DELIVERY</router-link>
                <select class="h-block1-select">
                    <option>Русский</option>
                    <option>Қазақша</option>
                </select>
                <form class="h-block1-form" action="search">
                    <input type="text" v-model="searchModel" placeholder="Найдите все для повседневной жизни">
                    <router-link :disabled="searchModel===null" tag="button" class="search-btn" to="/all"><i @click="searching()" class="fas fa-search"></i></router-link>
                </form>
                <div class="h-block1-chosen">
                    <router-link :to="'/chosen'"><i class="fas fa-heart"></i></router-link>
                </div>
                <div class="h-block1-cart">
                    {{cartCount()}}
                    <router-link :to="'/cart'"><img src="../assets/images/Cart2.svg" alt=""><span class="cart-counter">{{counter }}</span></router-link>
                </div>
                <router-link tag="div" :to="'/profile'" class="h-block1-profile">
                    <div><img src="../assets/images/Intersection1.png" alt=""></div>
                    <span>Привет, Эшли! <i class="fas fa-caret-down"></i></span>
                    
                </router-link>
            </div>
        </div>
        <div class="header-block2">
            <div class="wrapper">
                <nav class="h-block2-menu">
                    <ul>
                        <li v-for="(menu, index) in menus" :key="index">
                            <router-link :to="menu.route">{{menu.title}}</router-link>
                        </li>
                    </ul>
                </nav>
                <div class="h-block2-geo">
                    <div class="h-geo-img">
                        <img src="../assets/images/Group8956.png" alt="">
                    </div>
                    <select name="">
                        <option>Алматы</option>
                        <option>Шымкент</option>
                        <option>Астана</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import counter from '../help/cart'
    export default {
        data() {
            return {
                searchModel: null,
                counter: counter.counter
            }
        },
        computed:{
            menus(){
                return[
                    {
                        title: 'Главная',
                        route: '/'
                    },
                    {
                        title: 'Заказы',
                        route: '/'
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
            
        },
        methods: {
            cartCount(){
                this.counter = counter.counter
            },
            searching(){
                counter.searchInput = this.searchModel
                this.searchModel = ''
            }
        },
        mounted () {
            this.cartCount();
        },
    }
</script>

<style scoped>
    .h-block1-profile, .h-block1-logo{
        cursor: pointer;
    }
</style>