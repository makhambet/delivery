<template>
    <div class="s1-grid-prod">
        <div class="chosen"  @click="favorite(bestGoods.id, bestGoods.in_favorite)" :class="{'heartActive': bestGoods.heart }">
            <i class="far fa-heart" :class="{'fas': bestGoods.in_favorite}"></i>
        </div>
        <i v-show="bestGoods.in_favorite" class="fas fa-heart full_heart"></i>
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
                    <a @click="added(bestGoods.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26.677" height="23.122" viewBox="0 0 26.677 23.122">
                            <path :style="{fill: bestGoods.in_basket === true ? 'red' : ''}" id="basket" d="M19.664,23.122H7.011a3.384,3.384,0,0,1-3.317-2.735L1.535,9.246H.69a.69.69,0,1,1,0-1.38H5.034L7.5.472A.69.69,0,0,1,8.808.909L6.489,7.867H20.2L17.879.909a.693.693,0,0,1,.437-.873A.68.68,0,0,1,18.535,0a.691.691,0,0,1,.654.472l2.464,7.395h4.334a.69.69,0,0,1,0,1.38h-.847l-2.158,11.14A3.384,3.384,0,0,1,19.664,23.122ZM2.94,9.246,5.048,20.123a2,2,0,0,0,1.963,1.619H19.664a2,2,0,0,0,1.963-1.619L23.734,9.246Zm15.58,10a.806.806,0,0,1-.1-.006.693.693,0,0,1-.579-.786l.919-6.134a.7.7,0,0,1,.69-.586.688.688,0,0,1,.675.791L19.2,18.664A.685.685,0,0,1,18.52,19.25Zm-10.363,0a.685.685,0,0,1-.682-.586l-.919-6.135a.689.689,0,0,1,.58-.784.706.706,0,0,1,.1-.008.691.691,0,0,1,.681.588l.92,6.134a.693.693,0,0,1-.581.786A.72.72,0,0,1,8.157,19.25Zm7.061-.04a.69.69,0,0,1-.69-.689V12.467a.69.69,0,1,1,1.38,0v6.054A.69.69,0,0,1,15.218,19.21Zm-3.76,0a.69.69,0,0,1-.69-.689V12.467a.69.69,0,1,1,1.38,0v6.054A.69.69,0,0,1,11.458,19.21Z" fill="#515c6f"/>
                        </svg>
                    </a>
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
                    <a @click="added(bestGoods.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26.677" height="23.122" viewBox="0 0 26.677 23.122">
                            <path :style="{fill: bestGoods.in_basket === true ? 'red' : ''}" id="basket" d="M19.664,23.122H7.011a3.384,3.384,0,0,1-3.317-2.735L1.535,9.246H.69a.69.69,0,1,1,0-1.38H5.034L7.5.472A.69.69,0,0,1,8.808.909L6.489,7.867H20.2L17.879.909a.693.693,0,0,1,.437-.873A.68.68,0,0,1,18.535,0a.691.691,0,0,1,.654.472l2.464,7.395h4.334a.69.69,0,0,1,0,1.38h-.847l-2.158,11.14A3.384,3.384,0,0,1,19.664,23.122ZM2.94,9.246,5.048,20.123a2,2,0,0,0,1.963,1.619H19.664a2,2,0,0,0,1.963-1.619L23.734,9.246Zm15.58,10a.806.806,0,0,1-.1-.006.693.693,0,0,1-.579-.786l.919-6.134a.7.7,0,0,1,.69-.586.688.688,0,0,1,.675.791L19.2,18.664A.685.685,0,0,1,18.52,19.25Zm-10.363,0a.685.685,0,0,1-.682-.586l-.919-6.135a.689.689,0,0,1,.58-.784.706.706,0,0,1,.1-.008.691.691,0,0,1,.681.588l.92,6.134a.693.693,0,0,1-.581.786A.72.72,0,0,1,8.157,19.25Zm7.061-.04a.69.69,0,0,1-.69-.689V12.467a.69.69,0,1,1,1.38,0v6.054A.69.69,0,0,1,15.218,19.21Zm-3.76,0a.69.69,0,0,1-.69-.689V12.467a.69.69,0,1,1,1.38,0v6.054A.69.69,0,0,1,11.458,19.21Z" fill="#515c6f"/>
                        </svg>
                    </a>
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
                        this.$store.dispatch('GET_GOODS', {
                            params: {
                                'cats[0]': localStorage.delivery_product_catid
                            },
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
                        this.$store.dispatch('GET_GOODS', {
                            params: {
                                'cats[0]': localStorage.delivery_product_catid
                            },
                            headers: {
                                "token": localStorage.delivery_token
                            }
                        })
                    }, 200);
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