<template>
    <div class="footer">
        <div class="wrapper">
            <div class="footer-block1">
                <nav class="f-block1-menu">
                    <ul>
                        <li v-for="(menu, index) in menus" :key="index">
                            <router-link :to="menu.route">{{menu.title}}</router-link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="footer-block2">
                <p>Телефон доставки в г.Алматы: <br> 
                    <a href="#">+7(727) 346 85 83</a>
                </p>
            </div>
        </div>
        <div class="wrapper">
            <div class="footer-block1">
                <p>Если у вас есть вопрос, пишите нам письмо help@info.kz <br>
                    <span class="copyright">
                        &copy;2019 Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo necessitatibus incidunt vitae deleniti magni totam debitis, sequi dolorum omnis repudiandae?
                    </span>
                </p>
            </div>
            <div class="footer-block2">
                    Website design by <a href="http://1-000.kz/">Thousand Kazakhstan</a>
                <div class="f-block2-social">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
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
                        route: '/good'
                    },
                    {
                        title: 'Оплата',
                        route: '/payment'
                    },
                    {
                        title: 'Избранное',
                        route: '/chosen'
                    },
                    {
                        title: 'Корзина',
                        route: '/cart'
                    },
                    {
                        title: 'Профиль',
                        route: '/profile'
                    },                    
                ]
            }
        }
    }
</script>

<style scoped>

</style>