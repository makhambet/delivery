<template>
    <section class="sect-tovar" v-if="good">
        <div class="wrapper">
            <div class="page">
                <small>
                    {{$ml.get('msg')}} > {{$ml.get('result_search')}} > <span class="now-page">{{good.name}}</span>
                </small>
            </div>
            <div class="goods" id="up">
                <div class="goods-block1">
                    <div :class="{'ImgColor': imgId(index)}" v-for="(img, index) in good.images" :key="index" class="g-block1-img">
                        <img @click="open(index)" :src="url + img" alt="">
                    </div>
                </div>
                <div class="goods-block2">
                    <div
                        v-if="image !== undefined"
                        class="g-block2-img" 
                        :style="{ backgroundImage: 'url(' + url + image + ')', 
                        backgroundSize: '80% 80%', 
                        backgroundRepeat: 'no-repeat', 
                        backgroundPosition: 'center'}">
                    </div>
                    <img v-if="image === undefined" src="@/assets/images.png" alt="">
                </div>
                <div class="goods-block3">
                    <h2>{{good.name}}</h2>
                    <div @click="favorite(good.id, good.in_favorite)" class="heart" :class="{'chosen': good.in_favorite}">
                        <i class="fas fa-heart"></i>
                    </div>
                    <div class="g-block3-content">
                        <div class="g-content-left">
                            <button @click="add(good.id)" class="allBtn">{{$ml.get('btn_add_cart')}}</button>
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
                            <small>{{$ml.get('price')}}</small><br>
                            <span>{{good.price}} {{$ml.get('tenge')}}</span>
                        </div>
                    </div>
                    <h4>{{$ml.get('description')}}</h4>
                    <p>
                        {{good.description}}
                    </p>
                </div>
            </div>
            <p>{{pictures}}</p>
            <h2>{{$ml.get('buy_with')}}</h2>
                <div class="sect1-block2-carousel">
                    <carousel :perPage="1" :perPageCustom="[[360,2], [480, 3], [768, 4], [947,5], [1200,6]]" :touchDrag="false" :paginationSize="0" :mouse-drag="true" :loop="true" :autoplay="true" :navigationEnabled="true">
                        <slide  v-for="(item, index) in SIMILAR" :key="index">
                            <div class="s1-grid-prod">
                                <div class="sect1-carousel-block">
                                    <div class="chosen"  @click="favorite(item.id, item.in_favorite)" :class="{'heartActive': item.heart }">
                                        <i class="far fa-heart" :class="{'fas': item.in_favorite}"></i>
                                    </div>
                                    <div 
                                        v-if="item.images[0] !== undefined"
                                        class="s1-prod-img" 
                                        :style="{ backgroundImage: 'url(' + url + item.images[0] + ')', 
                                                  backgroundSize: '100% 100%', 
                                                  backgroundPosition: 'center'}"
                                        @click="openProduct(item.id)"
                                    >
                                        <div class="imgDark"></div>    
                                    </div>
                                    <div 
                                        v-if="item.images[0] === undefined"
                                        class="s1-prod-img" 
                                        :style="{ backgroundImage: 'url(../images.png)', 
                                                  backgroundSize: '100% 100%', 
                                                  backgroundPosition: 'center'}"
                                        @click="openProduct(item.id)"
                                    >
                                        <div class="imgDark"></div>    
                                    </div>
                                    <div class="smallName">
                                        <small>{{item.name}}</small>
                                    </div>
                                    <div class="visible-wrapper">
                                        <div class="is-visible">
                                            <p>
                                                {{item.description.slice(0, 20)}}<span class="descriptionShow"></span>
                                            </p>
                                            <div class="s1-grid-shopping">
                                                <div class="s2-grid-price">
                                                    {{item.price}} {{$ml.get('tenge')}}
                                                </div>
                                                <a @click="added(item.id)"><img src="../assets/images/basket.png" alt=""></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </slide>
                    </carousel>
                </div>
            </div>
        <app-alert v-if="visible" :propName="alertTitle"></app-alert>
    </section>
</template>

<script>
    import { Carousel, Slide } from 'vue-carousel';
    import nextPredBtn from '../mixins/nextPredBtn'
    import BestGoods from '@/components/BestItems'
    import AppAlert from '@/components/AppAlert'
    import { MLBuilder } from 'vue-multilanguage'
    import {mapGetters} from 'vuex'
    import axios from 'axios'
    import config from '@/help/config'
    export default {
        mixins: [nextPredBtn],
        data() {
            return {
                countBtn: 'good',
                count: 1,
                image: undefined || null,
                img_id: 0,
                visible: false,
                alertTitle: 'Вы не авторизованы!',
                url: config.url
            }
        },
        props:{
            'id':{
                type: String,
                required: true
            }
        },
        computed: {
            good() {
                let good
                good = this.PRODUCT_SHOW
                return good
            },
            pictures(){
                this.image = this.good.images[0];
                this.img_id = 0;
            },
            ...mapGetters([
                'GOODS',
                'SIMILAR',
                'PRODUCT_SHOW'
            ]),
            similarProduct(){
                setTimeout(() => {
                    this.$store.dispatch('GET_SIMILAR', this.id.toString());
                }, 100);
            },
            showCount(){
                if(localStorage.delivery_login === 'true'){
                    axios.get(this.url + 'api/product', {
                        params: {
                            id: this.good.id
                        },
                        headers: {
                            token: localStorage.delivery_token
                        }
                    })
                }
            },
            mlmyMessage () {
                return new MLBuilder('header')
            }  
        },
        methods: {
            imgId(id){
                if(id === this.img_id)
                    return true
            },
            totalPrice(){
                let totalPrice = 0;
                for(let i=0, l=this.good.lenght; i<l; i++){
                    totalPrice+=this.good[i].count*this.good[i].price
                }
                return totalPrice
            },
            add(id){
                if(localStorage.delivery_login === 'true'){
                    setTimeout(() => {
                        this.$store.dispatch('GET_BASKET_LIST')
                    }, 100);
                    this.$store.dispatch('POST_ADD_BASKET', {
                        product_id: id,
                        count: this.count
                    })
                    this.repeat(this.$ml.get('add_cart'))
                }
                else if(localStorage.delivery_login === 'false'){
                    this.repeat(this.$ml.get('not_auth'));
                }  
            },
            open(id){
                this.image = this.good.images[id];
                this.img_id = id;
            },
            pred(){
                this.count--;
            },
            next(){
                this.count++;
            },
            favorite(id, isFav){
                console.log(isFav)
                if(localStorage.delivery_login === 'true'){
                    console.log(id)
                    this.$store.dispatch('POST_FAVORITE', {
                        product_id: id
                    })
                    setTimeout(() => {
                        this.$store.dispatch('GET_PRODUCT_SHOW', this.id)
                    }, 100);
                    let title;
                    if(isFav){
                        title = this.$ml.get('del_fav');
                    }
                    if(!isFav){
                        title = this.$ml.get('add_fav');
                    }
                    this.repeat(title)
                }
                else if(localStorage.delivery_login === 'false'){
                    this.repeat(this.$ml.get('not_auth'));
                }
            },
            repeat(title){
                this.visible = true;
                this.alertTitle = title
                setTimeout(() => {
                    this.visible = false;
                }, 1000);
            },
            openProduct(id){
                this.$store.dispatch('GET_PRODUCT_SHOW', id);
                this.$store.dispatch('GET_SIMILAR', id);
                this.count = 1;
                this.$router.push({name: 'good', params: {id: id.toString()}});
            }
        },
        components: {
            Carousel,
            Slide,
            BestGoods,
            AppAlert
        },
        mounted () {
            this.similarProduct;
        },
        created () {
            let count = parseInt(this.page) + 1
            console.log("count = " + count )
            this.$store.dispatch('GET_PRODUCT_SHOW', this.id);
        },
    }
</script>

<style scoped>
    .heart{
        font-size: 20px;
    }
    #app .sect-tovar .sect1-block2-carousel .VueCarousel-navigation-button{
        /* top: 50%; */
        border: 1px solid #4AB5FA;
        padding: 12px 3px;
        border-radius: 7px;
        cursor: pointer;
        background: #4AB5FA;
        color: #fff;
    }
    .VueCarousel-navigation-button{
        top: 100% !important;
    }
    h4{
        font-size: 20px;
        margin-bottom: 0;
    }
    .sect-tovar .ImgColor{
        border: 1px solid #418DFF;
    }
</style>