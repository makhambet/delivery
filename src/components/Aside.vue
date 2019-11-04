<template>
    <div class="aside">
        <div class="wrapper">
            <carousel :autoplay="true" :autoplayTimeout="2000" :perPage="1" :loop="true" :paginationEnabled="false">
                <slide v-for="(item, index) in news" :key="index">
                    <a :href="item.link"><img :src="url + item.image" alt=""></a>
                </slide>
            </carousel>
        </div>
    </div>
</template>

<script>
    import { Carousel, Slide } from 'vue-carousel'
    import {mapGetters} from 'vuex'
    import config from '@/help/config'
    export default {
        data() {
            return {
                url: config.url
            }
        },
        computed: {
            ...mapGetters([
                'NEWS'
            ]),
            news(){
                let news = this.NEWS;
                news = news.filter(b=> (
                    b.type === 2
                ))
                return news;
            }
        },
        components: {
            Carousel,
            Slide,
        },
        created () {
            this.$store.dispatch('GET_NEWS');
        },
    }
</script>

<style scoped>

</style>