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
                    <a>+7(727) 346 85 83</a>
                </p>
            </div>
        </div>
        <div class="wrapper">
            <div class="footer-block1">
                <p>{{$ml.get('write_message')}} <br>
                    <span class="copyright">
                        &copy;2019 Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo necessitatibus incidunt vitae deleniti magni totam debitis, sequi dolorum omnis repudiandae?
                    </span>
                </p>
            </div>
            <div class="footer-block2">
                    Website design by <a href="http://1-000.kz/">Thousand Kazakhstan</a>
                <div class="f-block2-social">
                    <a target="_blank" href="https://www.instagram.com/"><img src="../assets/images/instagram.png" alt=""></a>
                    <a target="_blank" href="https://www.vk.com/all_feed"><img src="../assets/images/vk-social-network-logo.png" alt=""></a>
                    <a target="_blank" href="https://play.google.com/store"><img src="../assets/images/qpm.png" alt=""></a>
                    <a target="_blank" href="https://www.apple.com/ru/ios/app-store/"><img src="../assets/images/qas.png" alt=""></a>
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

</style>