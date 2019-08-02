<template>
    <section class="sect-basket">
        <div class="wrapper">
            <small>Главная > <span class="now-page">Корзина</span></small>
            <h2>Корзина</h2>
            <div v-if="!isEmpty" class="sb-grid">
                <div class="sb-grid-block1">
                    <div v-for="(item, i) in goods" :key="i">
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
            <div v-if="isEmpty" class="emptyCart">
                <h2>Ваша корзина пуста</h2>
                <router-link to="/" class="allBtn" tag="button">К покупкам</router-link>
            </div>
        </div>
    </section>
</template>

<script>
    import CartGood from '../components/CartItems.vue'
    export default {
        data() {
            return {
                isEmpty: false,
                counter: 1,
                cartGood: []
            }
        },
        computed: {
            goods(){
                return this.$store.getters.getGoods
            }
        },
        components: {
            CartGood,
        },
    }
</script>

<style>
    .emptyCart{
        text-align: center;
        width: 30%;
        margin: 0 auto;
    }
    .emptyCart .allBtn{
        margin: 0 auto;

    }
    .emptyCart .allBtn p{
        margin-top: 5px;        
    }
</style>