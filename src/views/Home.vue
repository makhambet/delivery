<template>
    <div>
        <app-article></app-article>
        <section class="sect-download">
        </section>
        <section class="sect1"  id="app">
            <div class="wrapper">
                <div class="page">
                    <small>
                        {{$ml.get('msg')}} > <span class="now-page">Самые продаваемые</span>
                    </small>
                </div>
                <div class="sect1-block">
                    <app-menu v-if="showing"></app-menu>
                    <div class="sect1-block2">
                        <div v-for="(item, index) in CATS" :key="index">
                            <h2>{{item.name}}</h2>
                            <div class="sect1-block2-carousel">
                                <div class="all" @click="product_title(item.name, item.id)">{{$ml.get('allBtn')}}</div>
                                <carousel :perPage="5" :perPageCustom="[[0,1], [480, 2], [768, 3], [947,4], [1200,5]]" :paginationEnabled="false" :navigationPrevLabel="'&lt;'" :navigationNextLabel="'&gt;'" :touchDrag="true" :mouse-drag="true" :navigationEnabled="true">
                                    <slide v-for="(product, i) in item.products" :key="i">
                                        <div class="sect1-carousel-block">
                                            <div class="s1-grid-prod">
                                                <div class="chosen"  @click="favorite(product.id, product.in_favorite)" :class="{'heartActive': product.heart }">
                                                    <i class="far fa-heart" :class="{'fas': product.in_favorite}"></i>
                                                </div>
                                                <i v-show="product.in_favorite" class="fas fa-heart full_heart"></i>
                                                <router-link
                                                    v-if="product.images[0] !== undefined"
                                                    tag="div" 
                                                    :to="{name: 'good', params: {id:product.id.toString()}}" 
                                                    class="s1-prod-img" 
                                                    :style="{ backgroundImage: 'url(' + url + product.images[0] + ')', 
                                                    backgroundSize: '100% 100%', 
                                                    backgroundPosition: 'center'}"
                                                >
                                                    <div class="imgDark"></div>    
                                                </router-link>
                                                <router-link
                                                    v-if="product.images[0] === undefined"
                                                    tag="div" 
                                                    :to="{name: 'good', params: {id:product.id.toString()}}" 
                                                    class="s1-prod-img" 
                                                    :style="{ backgroundImage: 'url(../images.png)', 
                                                    backgroundSize: '100% 100%', 
                                                    backgroundPosition: 'center'}"
                                                >
                                                    <div class="imgDark"></div>    
                                                </router-link>
                                                <div class="smallName">
                                                    <small>{{product.name}}</small>
                                                </div>
                                                <div class="visible-wrapper">
                                                    <div class="is-visible">
                                                        <p>
                                                            {{product.description.slice(0, 20)}}<span class="descriptionShow"></span>
                                                        </p>
                                                        <div class="s1-grid-shopping">
                                                            <div class="s2-grid-price">
                                                                {{product.price}} {{$ml.get('tenge')}}
                                                            </div>
                                                            <a style="color: red;" @click="added(product.id)">
                                                                <!-- <img style="background-color: #fff; color: red; fill: red;" src="../assets/images/basket.svg" alt=""> -->
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="26.677" height="23.122" viewBox="0 0 26.677 23.122">
                                                                    <path :style="{fill: product.in_basket === true ? 'red' : ''}" id="basket" d="M19.664,23.122H7.011a3.384,3.384,0,0,1-3.317-2.735L1.535,9.246H.69a.69.69,0,1,1,0-1.38H5.034L7.5.472A.69.69,0,0,1,8.808.909L6.489,7.867H20.2L17.879.909a.693.693,0,0,1,.437-.873A.68.68,0,0,1,18.535,0a.691.691,0,0,1,.654.472l2.464,7.395h4.334a.69.69,0,0,1,0,1.38h-.847l-2.158,11.14A3.384,3.384,0,0,1,19.664,23.122ZM2.94,9.246,5.048,20.123a2,2,0,0,0,1.963,1.619H19.664a2,2,0,0,0,1.963-1.619L23.734,9.246Zm15.58,10a.806.806,0,0,1-.1-.006.693.693,0,0,1-.579-.786l.919-6.134a.7.7,0,0,1,.69-.586.688.688,0,0,1,.675.791L19.2,18.664A.685.685,0,0,1,18.52,19.25Zm-10.363,0a.685.685,0,0,1-.682-.586l-.919-6.135a.689.689,0,0,1,.58-.784.706.706,0,0,1,.1-.008.691.691,0,0,1,.681.588l.92,6.134a.693.693,0,0,1-.581.786A.72.72,0,0,1,8.157,19.25Zm7.061-.04a.69.69,0,0,1-.69-.689V12.467a.69.69,0,1,1,1.38,0v6.054A.69.69,0,0,1,15.218,19.21Zm-3.76,0a.69.69,0,0,1-.69-.689V12.467a.69.69,0,1,1,1.38,0v6.054A.69.69,0,0,1,11.458,19.21Z" fill="#515c6f"/>
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
                        <div class="special">
                            <div class="special-block1">
                                    <h2>{{$ml.get('special')}}</h2>
                                    <h4>{{$ml.get('specialh4')}}</h4>
                                    <p>{{$ml.get('specialp')}}</p>
                                    <router-link :disabled="true" tag="button" :to="'/special'">{{$ml.get('specialBtn')}}</router-link>
                            </div>
                            <div class="special-block2">
                                <img src="../assets/images/Group8757.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <app-alert v-if="visible" :propName="alertTitle"></app-alert>
        </section>
    </div>
</template>

<script>
    import BestGoods from '../components/BestItems'
    import AppArticle from '../components/Article'
    import AppMenu from '../components/AppMenu'
    import nextPredBtn from '../mixins/nextPredBtn'
    import { Carousel, Slide } from 'vue-carousel'
    import AppAlert from '@/components/AppAlert'
    import {mapGetters} from 'vuex'
    import config from '@/help/config'
    import { MLBuilder } from 'vue-multilanguage'
    export default {
        mixins: [nextPredBtn],
        data() {
            return {
                page: 0,
                nextEnd: false,
                bests: [],
                size: 5,
                showing: true,
                visible: false,
                alertTitle: this.$ml.get('not_auth'),
                url: config.url
            }
        },
        computed: {
            ...mapGetters([
                'CATS'
            ]),
            goods() {
                return this.$store.getters.GOODS
            },
            cats(){
                let products = this.goods
                products = products.filter(b =>
                    b.cat_id > 58
                )
                return products
            },
            mlmyMessage () {
                return new MLBuilder('header')
            }  
        },
        methods: {
            product_title(title, id) {
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
            added(id) {
                if(localStorage.delivery_login === 'true'){
                    setTimeout(() => {
                        this.$store.dispatch('GET_BASKET_LIST')
                        this.$store.dispatch('GET_CATS', {
                            headers: {
                                "token": localStorage.delivery_token
                            }
                        })
                    }, 100);
                    this.$store.dispatch('POST_ADD_BASKET', {
                        product_id: id,
                        count: 1
                    })
                    this.repeat(this.$ml.get('add_cart'))
                }
                else if(localStorage.delivery_login === 'false'){
                    this.repeat(this.$ml.get('not_auth'));
                }                
            },
            favorite(id, isFav){
                if(localStorage.delivery_login === 'true'){
                    setTimeout(() => {
                        this.$store.dispatch('GET_CATS', {
                            // params: {
                            //     'page': '1'
                            // },
                            headers: {
                                "token": localStorage.delivery_token
                            }
                        })
                    }, 100);
                    this.$store.dispatch('POST_FAVORITE', {
                        product_id: id
                    })
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
            }
            
        },
        components: {
            BestGoods,
            AppMenu,
            Carousel,
            Slide,
            AppArticle,
            AppAlert
        },
    }
</script>

<style scoped>
    select{
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
    }
    .sect1-block2-carousel{
        position: relative;
        width: 88%;
        margin: 0 auto;
    }
    .special-block1 button:disabled{
        background: #9e9e9e;
    }
</style>