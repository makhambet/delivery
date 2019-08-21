<template>
    <section class="sect-tovar" id="app" v-if="good">
        <div class="wrapper">
            <small>
                Главная > Результат поиска > <span class="now-page">{{good.name}}</span>
            </small>
            <div class="goods" id="up">
                <div class="goods-block1">
                    <div v-for="img in good.images" :key="img.id" class="g-block1-img">
                        <img :src="img" alt="">
                    </div>
                </div>
                <div class="goods-block2">
                    <div 
                        class="g-block2-img" 
                        :style="{ backgroundImage: 'url(' + good.images[0] + ')', 
                        backgroundSize: '100% 100%', 
                        backgroundRepeat: 'no-repeat', 
                        backgroundPosition: 'center'}">
                    </div>
                </div>
                <div class="goods-block3">
                    <h2>{{good.name}}</h2>
                    <div @click="good.heart = !good.heart" class="heart" :class="{chosen: good.in_favorite}">
                        <i class="fas fa-heart"></i>
                    </div>
                    <div class="g-block3-content">
                        <div class="g-content-left">
                            <button @click="add(good.id)" class="allBtn">В корзину</button>
                            <div class="grid-counter">
                                <button 
                                    :disabled="count<=1"  
                                    @click.prevent="pred()" 
                                    class="counter"
                                >
                                    &lt;
                                </button>
                                {{count}}
                                <button 
                                    @click="next()" 
                                    class="counter"
                                    >
                                    &gt;
                                </button>
                            </div>
                        </div>
                        <div class="g-block3-price">
                            <small>Цена</small><br>
                            <span>{{good.price}} теңге</span>
                        </div>
                    </div>
                    <h4>Описание</h4>
                    <p>
                        {{good.description}}
                    </p>
                </div>
            </div>
            <h2>С этим покупают</h2>
            <div class="sg-block2-grid">
                <carousel :perPage="1" :perPageCustom="[[360,1], [480, 2], [768, 3], [947,4], [1200,5]]" :touchDrag="false" :paginationSize="0" :mouse-drag="true" :loop="true" :autoplay="false" :navigationEnabled="true">
                    <slide class="s1-grid-prod" v-for="(item, index) in 6" :key="index">
                        <div class="chosen"  @click="good.heart=!good.heart" :class="{heartActive: good.heart }">
                            <i class="fas fa-heart"></i>
                        </div>
                        <img src="../assets/images/image.png" alt=""><br>
                        <small>Крем</small>
                        <p>BB-cream для рук</p>
                        <div class="s1-grid-shopping">
                            <div class="s2-grid-price">
                                2 000 теңге
                            </div>
                            <a href="#"><img src="../assets/images/Cart2.svg" alt=""></a>
                        </div>
                    </slide>
                </carousel>
            </div>
        </div>
    </section>
</template>

<script>
    import { Carousel, Slide } from 'vue-carousel';
    import nextPredBtn from '../mixins/nextPredBtn'
    export default {
        mixins: [nextPredBtn],
        data() {
            return {
                countBtn: 'good',
                count: 1
            }
        },
        props:{
            'id':{
                type: Number,
                required: true
            }
        },
        computed: {
            good() {
                return this.$store.getters.GOODS.find(b=>b.cat_id ==this.id)
            }
        },
        methods: {
            totalPrice(){
                let totalPrice = 0;
                for(let i=0, l=this.good.lenght; i<l; i++){
                    totalPrice+=this.good[i].count*this.good[i].price
                }
                return totalPrice
            },
            add(id){
                this.$store.dispatch('POST_ADD_BASKET', {
                    product_id: id,
                    count: this.count
                })
            },
            pred(){
                this.count--;
            },
            next(){
                this.count++;
            }
        },
        components: {
            Carousel,
            Slide
        },
    }
</script>

<style scoped>
    .heart{
        font-size: 20px;
    }
</style>