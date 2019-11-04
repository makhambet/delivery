<template>
    <section class="sect-basket">
        <div class="wrapper">
            <div class="page">
                <small>{{$ml.get('msg')}} > <span class="now-page">{{$ml.get('cart')}}</span></small>
            </div>
            <h2>{{$ml.get('cart')}}</h2>
            <div v-if="total_price()" class="sb-grid">
                <div class="sb-grid-block1">
                    <div v-for="(item, i) in BASKET_LIST" :key="i">
                        <cart-good @remove="removeBasket(item)" :cartGoods="item"></cart-good>
                    </div>
                </div>
                <div class="sb-grid-block2">
                    <div class="sb-block2-bottom">
                        <p>{{$ml.get('total_price')}}: <br> <span class="price">{{total_price()}} {{$ml.get('tenge')}}</span></p>
                        <button @click="toRegistr()" class="allBtn">{{$ml.get('reg')}}</button>
                    </div>
                </div>
            </div>
            <div v-if="!total_price()" class="emptyCart">
                <h2>{{$ml.get('cart_empty')}}</h2>
                <router-link to="/all" class="allBtn" tag="button">{{$ml.get('shopping')}}</router-link>
            </div>
        </div>
        <app-alert v-if="visible" :propName="'Вы удалили товар'"></app-alert>
        <div @click="exceed = false" v-if="exceed" class="modalBox">
            <div class="modalBox-block">
                <h2>{{$ml.get('min_price')}}</h2>
            </div>
        </div>
    </section>
</template>

<script>
    import CartGood from '../components/CartItems.vue'
    import AppAlert from '@/components/AppAlert.vue'
    import {mapGetters} from 'vuex'
    import { MLBuilder } from 'vue-multilanguage'
    import axios from 'axios'
    import user from '../help/user_id'
    import config from '@/help/config'
    export default {
        data() {
            return {
                isIfEmpty: false,
                counter: 1,
                cartGood: [],
                visible: false,
                url: config.url,
                exceed: false
            }
        },
        computed: {
            ...mapGetters([
                'BASKET_LIST',
                'BASKET_COUNT'
            ]),
            filterChosen(){
                let goods = this.BASKET_LIST;
                goods = goods.filter(b=> b.in_basket === true)
                return goods
            },
            mlmyMessage () {
                return new MLBuilder('header')
            }  
        },
        methods: {
            removeBasket(id){
                if(confirm("Вы точно хотите удалить?")){
                    if(user.token === null || user.token === 'null'){
                        return
                    }
                    axios.post(this.url + 'api/basket/delete', {
                        "basket_id": id.basket_id
                    },
                    {
                        headers: {
                            "token": user.token
                        },
                    })
                    .then(response => { 
                        console.log(response)
                        this.$store.dispatch('GET_BASKET_LIST')
                        this.visible = true
                        setTimeout(() => {
                            this.visible = false
                        }, 1000);
                    })
                    .catch(error => {
                        console.log(error.response)
                    });
                }
            },
            total_price(){
                let totalPrice = 0
                if(this.BASKET_COUNT > 0){
                    let len = this.BASKET_LIST.length
                    for(let i=0; i<len; i++){
                        totalPrice += this.BASKET_LIST[i].count * this.BASKET_LIST[i].product.price
                    }
                    localStorage.delivery_totalPrice = totalPrice
                    return totalPrice
                }
                else{
                    return totalPrice
                }
            },
            toRegistr(){
                if(this.total_price() < 5000) {
                    this.exceed = true;
                }
                else{
                    this.$router.push({path: 'registr'});
                }
            }
        },
        components: {
            CartGood,
            AppAlert
        },
        created () {
            this.$store.dispatch('GET_BASKET_LIST')
        },
    }
</script>

<style>
    /* ----------------------------КОРЗИНА--------------------------- */
    .sb-grid{
        display: flex;
        justify-content: space-between;
    }
    .sb-grid-block1{
        width: 75%;
    }
    .sb-grid-block2{
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-end;
    }
    /* .sb-grid-block1 > div:nth-child(1){
        grid-area: one;
    }
    .sb-grid-block1 > div:nth-child(2){
        grid-area: two;
    } */
    .sb-grid-block1{
        display: grid;
        --auto-grid-min-size: 300px;
        --auto-rows-min-size: 500px;
        grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr));
        grid-gap: 20px 30px;
    }
    .sb-grid-block1 > div{
        min-height: 150px;
    }
    .sb-grid-block1 > div > div{
        min-height: 150px;
    }
    .sb-grid-content{
        display: flex;
        max-height: 100%;
        height: 100%;
        width: 100%;
        box-shadow: 0 8px 15px #E7EAF0;
        position: relative;
        justify-content: space-between;
    }
    .sb-block1-title > p{
        max-width: 90%;
        margin-bottom: 10px;
        font-size: 18px;
    }
    .sb-grid-block-img{
        width: 20%;
    }
    .sb-block1-title{
        width: 75%;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        align-items: stretch;
        overflow: hidden;
    }
    .delete{
        position: absolute;
        top: 20px;
        right: 15px;
        color: #FF6969;
    }
    .sb-content-flex{
        display: flex;
        justify-content: space-between;
        width: calc(100% - 15px);
    }
    .sb-content-flex small{
        font-size: 14px;
    }
    .sb-content-flex p{
        font-size: 20px;
        margin: 0;
    }
    .modalBox{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .1);
        z-index: 2;
    }
    .modalBox-block{
        position: absolute;
        width: 500px;
        background: #fff;
        min-height: 200px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }
</style>