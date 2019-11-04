<template>
    <div class="header-block2">
        <div class="wrapper">
            <nav class="h-block2-menu">
                <ul>
                    <li v-for="(item, index) in $ml.get('navbar')" :key="index">
                        <router-link :to="item.route"><span>{{item.title}}</span></router-link>
                    </li>
                </ul>
            </nav>
            <div class="h-block2-geo">
                <div class="h-geo-img">
                    <img src="@/assets/images/Group8956.png" alt="">
                </div>
                <div class="city">
                    <span @click="cityClick=!cityClick">{{city || CITIES[0].name}}</span>
                    <div v-if="cityClick">
                        <div @click="cityClick=false, city=item.name" v-for="(item, index) in CITIES" :key="index">{{item.name}}</div>
                    </div>
                    <i class="fas fa-caret-down"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { MLBuilder } from 'vue-multilanguage'
    export default {
        data() {
            return {
                cityClick: false,
                city: null
            }
        },
        computed: {
            ...mapGetters([
                'CITIES',
            ]),
            // menus(){
            //     return[
            //         {
            //             title: 'Главная',
            //             route: '/'
            //         },
            //         {
            //             title: 'Заказы',
            //             route: '/orders'
            //         },
            //         {
            //             title: 'Товары',
            //             route: '/all'
            //         },
            //         {
            //             title: 'Оплата',
            //             route: '/payment'
            //         },
            //         {
            //             title: 'Контакты',
            //             route: '/about'
            //         },
            //     ]
            // },
            mlmyMessage () {
                return new MLBuilder('header')
            } 
        },
        methods: { 
            product_title(title){
                localStorage.delivery_product_title = title
            },
        },
    }
</script>

<style scoped>
    .city{
        position: relative;
        min-width: 85px;
    }
    .city span{
        line-height: 40px;
        display: block
    }
    .city > div{
        position: absolute;
        z-index: 2;
        right: 0;
        left: 0;
        box-shadow: 1px 10px 10px rgba(0, 0, 0, .5);
    }
    .city > div > div{
        background: #fff;
        border-bottom: 1px solid #F4F5FA;
        padding: 5px 0;
    }
    .city i{
        color: #418DFF;
        position: absolute;
        top: 13px;
        right: 0;
    }
</style>