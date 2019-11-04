<template>
    <div class="s1-grid-prod">
        <div class="chosen"  @click="favorite(bestGoods.id, bestGoods.in_favorite)" :class="{'heartActive': bestGoods.heart }">
            <i class="far fa-heart" :class="{'fas': bestGoods.in_favorite}"></i>
        </div>
        <router-link
            tag="div" 
            v-if="bestGoods.images[0] !== undefined"
            :to="{name: 'good', params: {id:bestGoods.id.toString(), page: page, bool: 'false'}}" 
            class="s1-prod-img" 
            :style="{ backgroundImage: 'url(' + url + bestGoods.images[0] + ')', 
            backgroundSize: '100% 100%', 
            backgroundPosition: 'center'}"
        >
            <div class="imgDark"></div>    
        </router-link>
        <router-link
            tag="div" 
            v-if="bestGoods.images[0] === undefined"
            :to="{name: 'good', params: {id:bestGoods.id.toString(), page: page, bool: 'false'}}" 
            class="s1-prod-img" 
            :style="{ backgroundImage: 'url(../images.png)', 
            backgroundSize: '100% 100%', 
            backgroundPosition: 'center'}"
        >
            <div class="imgDark"></div>    
        </router-link>
        <div class="smallName">
            <small>{{bestGoods.name}}</small>
        </div>
        <div class="visible-wrapper">
            <div v-if="isVisible" class="visible">
                <div class="vis">
                    <p>
                        {{bestGoods.description.slice(0, 15)}}
                        <span class="descriptionShow">
                            {{bestGoods.description.slice(15, 100 || -1)}}
                            <span v-if="bestGoods.description.length > 100">...</span>
                        </span>
                    </p>
                </div>
                
                <div class="s1-grid-shopping">
                    <div class="s2-grid-price">
                        {{bestGoods.price}} {{$ml.get('tenge')}}
                    </div>
                    <a @click="added(bestGoods.id)"><img src="../assets/images/basket.png" alt=""></a>
                </div>
            </div>
            <div v-if="!isVisible" class="is-visible">
                <p>
                    {{bestGoods.description.slice(0, 20)}}<span class="descriptionShow"></span>
                </p>
                <div class="s1-grid-shopping">
                    <div class="s2-grid-price">
                        {{bestGoods.price}} {{$ml.get('tenge')}}
                    </div>
                    <a @click="added(bestGoods.id)"><img src="../assets/images/basket.png" alt=""></a>
                </div>
            </div>
        </div>
        <app-alert v-if="visible" :propName="alertTitle"></app-alert>
    </div>
</template>

<script>
    import AppAlert from './AppAlert'
    import config from '@/help/config'
    import { MLBuilder } from 'vue-multilanguage'
    export default {
        props: {
            bestGoods: {
                type: Object,
                required: true
            },
            isVisible: {
                type: Boolean,
                required: true
            },
            page: {
                type: String,
                default: '0'
            }
        },
        data() {
            return {
                showing: false,
                visible: false,
                alertTitle: 'Вы не авторизованы!',
                url: config.url
            }
        },
        methods: {
            added(id) {
                if(localStorage.delivery_login === 'true'){
                    setTimeout(() => {
                        this.$store.dispatch('GET_BASKET_LIST')
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
                        this.$store.dispatch('GET_GOODS', {
                            // params: {
                            //     'page': '1'
                            // },
                            headers: {
                                "token": localStorage.delivery_token || 'my_token'
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
        computed: {
            mlmyMessage () {
                return new MLBuilder('header')
            } 
        },
        components: {
            AppAlert,
        },
    }
</script>

<style scoped>
    .chosen{
        z-index: 9999;
        top: 9px;
    }
    .vis{
        transition: all 3s;
    }
    .vis .descriptionShow{
        display: none;
        height: 0;
        transition: all 3s;
        margin-top: 0;
    }
    .s1-grid-prod{
        transition: all 10s;
    }
    .s1-grid-prod:hover .vis{
        transition: all 3s;
    }
    .s1-grid-prod:hover .vis .descriptionShow{
        display: block;
        height: auto;
        transition: all 3s;
    }
    /* .descriptionShow{
        display: none;
        height: 0;
        transition: all 1s; 
    }
    .s1-grid-prod:hover .descriptionShow{
        display: block;
        height: 100%;
        transition: all 1s; 
    } */
    .s1-grid-prod .visible{
        /* transition: all 1s; */
        background: #fff;
    }
    .s1-grid-prod:hover .visible{
        position: absolute;
        padding: 0 10px 10px;
        color: #515C6F;
        font-size: 15px;
        width: 100%;
        margin-left: -10px;
        /* padding: 0 10px 10px; */
        z-index: 3;
        -webkit-box-shadow: -1px 20px 15px  #E7EAF0;
        box-shadow: -1px 20px 15px #E7EAF0;
    }
    


    .smallName > small{
        grid-area: a;
    }
    .smallName{
        display: grid;
        grid-template-areas: 'a';
        grid-template-columns: 1fr;
    }
</style>