<template>
    <section class="sect-tovar" id="app" v-if="good">
        <div class="wrapper">
            <small>
                Главная > Результат поиска > <span class="now-page">{{good.title}}</span>
            </small>
            <div class="goods">
                <div class="goods-block1">
                    <div class="g-block1-img">
                        <img :src="good.img" alt="">
                    </div>
                    <div class="g-block1-img">
                        <!-- <img :src="good.img" alt=""> -->
                    </div>
                    <div class="g-block1-img">
                        <!-- <img :src="good.img" alt=""> -->
                    </div>
                    <div class="g-block1-img">
                        <!-- <img :src="good.img" alt=""> -->
                    </div>
                </div>
                <div class="goods-block2">
                    <div class="g-block2-img">
                        <!-- <img :src="good.img" alt=""> -->
                    </div>
                </div>
                <div class="goods-block3">
                    <h2>{{good.title}}</h2>
                    <div @click="good.heart = !good.heart" class="heart" :class="{chosen: good.heart}">
                        <i class="fas fa-heart"></i>
                    </div>
                    <div class="g-block3-content">
                        <div class="g-content-left">
                            <button class="allBtn">В корзину</button>
                            <div class="grid-counter">
                                <span :disabled="good.count<=1"  @click.prevent="pred()" class="counter">&lt;</span>{{good.count}}<span @click="next()" class="counter">&gt;</span>
                            </div>
                        </div>
                        <div class="g-block3-price">
                            <small>Цена</small><br>
                            <span>{{good.price}} теңге</span>
                        </div>
                    </div>
                    <h4>Описание</h4>
                    <p>
                        BB-cream для рук увлажняющий<br>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel turpis gravida, 
                        pulvinar sem ultricies, laoreet elit. Proin ligula nibh, dignissim eget leo vel,  accumsan posuere est. Nulla volutpat vestibulum ligula in lacinia. Vivamus metus 
                        nulla, imperdiet et porttitor nec, feugiat ut sapien. Integer sed sollicitudin nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel turpis gravida, 
                        pulvinar sem ultricies, laoreet elit. Proin ligula nibh, dignissim eget leo vel, accumsan posuere est. Nulla volutpat vestibulum ligula in lacinia. Vivamus metus 
                        nulla, imperdiet et porttitor nec, feugiat ut sapien. Integer sed sollicitudin nisi.
                    </p>
                </div>
            </div>
            <h2>С этим покупают</h2>
            <div class="s1-block2-grid">
                <div class="pred">&lt;</div>
                <div class="s1-grid-prod" v-for="(item, index) in 6" :key="index">
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
                </div>
                <div class="next">&gt;</div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        props:{
            'id':{
                type: String,
                required: true
            }
        },
        computed: {
            good() {
                return this.$store.getters.getGoods.find(b=>b.id ==this.id)
            }
        },
        methods: {
            next() {
                this.good.count++
            },
            pred() {
                this.good.count--
            }
        },
    }
</script>

<style scoped>
    .heart{
        font-size: 20px;
    }
</style>