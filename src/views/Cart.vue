<template>
    <section class="sect-basket">
        <div class="wrapper">
            <small>Главная > <span class="now-page">Корзина</span></small>
            <h2>Корзина</h2>
            <div v-if="!isIfEmpty" class="sb-grid">
                <div class="sb-grid-block1">
                    <div v-for="(item, i) in carts" :key="i">
                        <cart-good :cartGoods="item"></cart-good>
                    </div>
                </div>
                <div class="sb-grid-block2">
                    <div class="sb-block2-bottom">
                        <p>Итоговая сумма: <br> <span class="price">20 000 теңге</span></p>
                        <router-link :to="'/registr'"><button class="allBtn">Оформить заказ</button></router-link>
                    </div>
                </div>
            </div>
            <div v-if="isIfEmpty" class="emptyCart">
                <h2>Ваша корзина пуста</h2>
                <router-link to="/" class="allBtn" tag="button">К покупкам</router-link>
            </div>
        </div>
    </section>
</template>

<script>
    import CartGood from '../components/CartItems.vue'
    import cart from '../help/cart'
    export default {
        data() {
            return {
                isIfEmpty: false,
                counter: 1,
                cartGood: [],
                carts: []
            }
        },
        computed: {
            goods(){
                return this.$store.getters.getGoods
            }
        },
        created () {
            console.log(cart.cart);
        },
        methods: {
            isEmpty() {
                console.log(" cart = " + cart.cart)
                if(this.carts.length <= 0) {
                    this.isIfEmpty = true
                }
                else{
                    this.isIfEmpty = false
                }
            }
        },
        mounted () {
            this.isEmpty();
        },
        components: {
            CartGood,
        },
    }
</script>

<style>
    /* ----------------------------КОРЗИНА--------------------------- */
    .sb-grid, .sb-grid .sb-grid-content{
        display: flex;
        justify-content: space-around;
        color: #515C6F;
    }
    .sb-block1-title{
        position: relative;
    }
    .sb-grid .sb-grid-block1{
        width: 48%;
    }
    .sb-grid .sb-grid-block1>div:nth-child(1){
        grid-area: 'a';
    }
    .sb-grid .sb-grid-block1>div:nth-child(1){
        grid-area: 'b';
    }
    .sb-grid .sb-grid-block1{
        display: grid;
        grid-template-areas: 'a b';
        width: 100%;
        grid-gap: 40px;
    }
    .sb-grid .sb-grid-content{
        box-shadow: 0 8px 15px #E7EAF0;
        padding: 2px 20px 7px 10px;
    }
    .sb-grid .sb-block1-img{
        max-width: 100px;
        width: 44px;
        text-align: center;
        margin-top: 20px;
    }
    .sb-grid .sb-block1-img img{
        width: 100%;
    }
    .sb-grid .sb-block1-title > p{
        font-weight: bold;
        font-size: 18px;
        width: 90%;
        margin-bottom: 5px;
    }
    .delete{
        position: absolute;
        top: 20px;
        right: 0;
        cursor: pointer;
        font-size: 20px;
        color: #FF6969;
    }
    .sb-content-flex{
        display: flex;
        justify-content: space-between;
    }
    .sb-grid .sb-flex-left p{
        margin-top: 0;
    }
    .sb-grid .sb-grid-block2{
        position: relative;
        text-align: right;
        width: 30%;
    }
    .sb-grid .sb-block2-bottom{
        position: absolute;
        bottom: 0;
        right: 0;
    }
    .sb-grid .sb-block2-bottom p{
        font-size: 18px;
        font-weight: bold;
    }
    .sb-grid .sb-block2-bottom .price{
        font-size: 29px;
    }
    .emptyCart{
        text-align: center;
        width: 30%;
        margin: 0 auto;
        height: 40%;
    }
    .emptyCart .allBtn{
        margin: 0 auto;

    }
    .emptyCart .allBtn p{
        margin-top: 5px;        
    }
    @media (max-width: 1052px) {
        .sect-basket .sb-grid .sb-grid-block1 {
            grid-gap: 20px;
        }
        .sect-basket .sb-grid .sb-block2-bottom .price {
            font-size: 25px;
        }
        .sb-grid .sb-block2-bottom p, .sb-grid .sb-block1-title > p{
            font-size: 15px;
        }
        .sect-basket .allBtn{
            width: 150px;
        }
    }
    @media (max-width: 768px){
        .sb-grid .sb-grid-block1 {
            grid-template-areas: 'a' 'b';
            width: 65%;
        }
    }
    @media (max-width: 579px){
        .sb-grid{
            flex-direction: column;
        }
        .sb-grid .sb-grid-block1{
            width: 100%;
        }
        .sb-grid .sb-grid-block2{
            width: 100%;
            text-align: center;
        }
        .sb-grid .sb-block2-bottom{
            position: static;
        }
        .sb-grid .sb-block2-bottom > p{
            margin-bottom: 5px;
        }
        .grid-counter {
            background: #F7F7F7;
            line-height: 35px;
            height: 35px;
            text-align: center;
            width: 80px;
            border-radius: 7px;
        }
    }
</style>