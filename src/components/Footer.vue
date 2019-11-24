<template>
    <div class="footer">
        <div class="wrapper">
            <div class="footer-block1 f-blc1">
                <nav class="f-block1-menu">
                    <ul>
                        <li v-for="(menu, index) in $ml.get('navbar')" :key="index">
                            <router-link :to="menu.route">{{menu.title}}</router-link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="footer-block2 f-blc2">
                <p>{{$ml.get('delivery_phone')}}: <br> 
                    <a>8(717) 248-09-28, 8-701-768-12-12</a><br>
                    <a>8(717) 267-76-62, 8-778-700-48-41</a>
                </p>
            </div>
        </div>
        <div class="wrapper">
            <div class="footer-block1">
                <p>{{$ml.get('write_message')}} <br>
                </p>
            </div>
            <div class="footer-block2">
                    Website design by <a href="https://thousand.group/">Thousand Kazakhstan</a>
                <div class="f-block2-social">
                    <a target="_blank" href="https://www.instagram.com/zakazonline.kz"><img src="../assets/images/instagram.png" alt=""></a>
                    <a target="_blank" href="https://www.facebook.com/zakazonline.kz/"><img src="../assets/images/vk-social-network-logo.png" alt=""></a>
                    <router-link to="/"><img src="../assets/images/web.png" alt=""></router-link>
                    <a class="app" target="_blank" href="https://play.google.com/store"><img class="app" src="../assets/images/qpm.png" alt=""></a>
                    <a class="app" target="_blank" href="https://www.apple.com/ru/ios/app-store/"><img class="app" src="../assets/images/qas.png" alt=""></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { MLBuilder } from 'vue-multilanguage'
    export default {
        computed:{
            mlmyMessage () {
                return new MLBuilder('header')
            }  
        }
    }
</script>

<style scoped>
    .f-block2-social img{
        width: 24px;
        margin-right: 10px;
        margin-left: 0;
    }
    .f-block2-social a{
        width: 24px;
    }
    .f-block2-social .app img{
        width: 94px;
    }
    .f-block2-social > .app:last-child img{
        margin: 0;
    }
</style>