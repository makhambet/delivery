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
                                    <i v-show="item.in_favorite" class="fas fa-heart full_heart"></i>
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
                                                <a @click="add(item.id)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="26.677" height="23.122" viewBox="0 0 26.677 23.122">
                                                        <path :style="{fill: item.in_basket === true ? 'red' : ''}" id="basket" d="M19.664,23.122H7.011a3.384,3.384,0,0,1-3.317-2.735L1.535,9.246H.69a.69.69,0,1,1,0-1.38H5.034L7.5.472A.69.69,0,0,1,8.808.909L6.489,7.867H20.2L17.879.909a.693.693,0,0,1,.437-.873A.68.68,0,0,1,18.535,0a.691.691,0,0,1,.654.472l2.464,7.395h4.334a.69.69,0,0,1,0,1.38h-.847l-2.158,11.14A3.384,3.384,0,0,1,19.664,23.122ZM2.94,9.246,5.048,20.123a2,2,0,0,0,1.963,1.619H19.664a2,2,0,0,0,1.963-1.619L23.734,9.246Zm15.58,10a.806.806,0,0,1-.1-.006.693.693,0,0,1-.579-.786l.919-6.134a.7.7,0,0,1,.69-.586.688.688,0,0,1,.675.791L19.2,18.664A.685.685,0,0,1,18.52,19.25Zm-10.363,0a.685.685,0,0,1-.682-.586l-.919-6.135a.689.689,0,0,1,.58-.784.706.706,0,0,1,.1-.008.691.691,0,0,1,.681.588l.92,6.134a.693.693,0,0,1-.581.786A.72.72,0,0,1,8.157,19.25Zm7.061-.04a.69.69,0,0,1-.69-.689V12.467a.69.69,0,1,1,1.38,0v6.054A.69.69,0,0,1,15.218,19.21Zm-3.76,0a.69.69,0,0,1-.69-.689V12.467a.69.69,0,1,1,1.38,0v6.054A.69.69,0,0,1,11.458,19.21Z" fill="#515c6f"/>
                                                    </svg>
                                                </a>
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
                        this.$store.dispatch('GET_SIMILAR', this.id.toString());
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
                if(localStorage.delivery_login === 'true'){
                    this.$store.dispatch('POST_FAVORITE', {
                        product_id: id
                    })
                    setTimeout(() => {
                        this.$store.dispatch('GET_PRODUCT_SHOW', this.id);
                        this.$store.dispatch('GET_SIMILAR', this.id.toString());
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