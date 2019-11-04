<template>
    <article>
        <div class="wrapper">
            <carousel :perPage="1" :autoplay="true" :loop="true" :touchDrag="false" :autoplayTimeout="2000">
                <slide v-for="(item, index) in news" :key="index">
                    <!-- <div class="article-content">
                        <div>
                            <h1><span>Праздник осени</span><br>20% скидки на все продукты</h1>
                            <router-link tag="button" to="all">К продуктам</router-link>
                        </div>
                    </div> -->
                    <a :href="item.link">
                        <img :src="url + item.image" alt="">
                    </a>
                </slide>
            </carousel>
            <div class="article-products">
                <div 
                    v-show="item.parent_id !== -1" 
                    v-for="(item, index) in CATS" 
                    :key="index" @click="open(item.id, item.name)" 
                    class="a-products-first"
                    :style="{ backgroundImage: 'url(' + images(item.image_web) + ')'}"
                >
                    <div>
                        <h4>{{item.name}}</h4>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
    import { Carousel, Slide } from 'vue-carousel';
    import { MLBuilder } from 'vue-multilanguage'
    import { mapGetters } from 'vuex'
    import config from '../help/config'
    export default {
        data() {
            return {
                url: config.url
            }
        },
        components: {
            Carousel,
            Slide
        },
        computed: {
            mlmyMessage () {
                return new MLBuilder('header')
            },
            ...mapGetters([
                'CATS',
                'NEWS'
            ]),
            news(){
                let news = this.NEWS;
                news = news.filter(b=> (
                    b.type === 1
                ))
                return news;
            }
        },
        methods: {
            open(id, title){
                localStorage.delivery_product_title = title
                localStorage.delivery_product_catid = id
                this.$store.dispatch('GET_GOODS', {
                    params: {
                        'page': '1',
                        'cats[0]': id
                    },
                    headers: {
                        "token": localStorage.delivery_token || 'my_token'
                    }
                })
                localStorage.delivery_request = 'GOODS'
                this.$router.push({path: 'products'})
            },
            openBanner(link){
                console.log(link)
                this.$router.push({path: link});
            },
            images(img){
                if(img === null) return '../images.png'
                else return this.url + img
            },
        },
    }
</script>

<style scoped>
    img{
        width: 100%;
        max-height: 400px;
    }
</style>