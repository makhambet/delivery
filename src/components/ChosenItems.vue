<template>
    <div class="sc-grid-block">
        <div class="s-grid-block-img">
            <img :src="chosenGoods.img" alt="">
        </div>
        <div class="sc-grid-content">
            <p>{{chosenGoods.title}}</p>
            <small>Стоимость</small>
            <div class="chosen" @click="chosenGoods.heart = !chosenGoods.heart">
                <i class="fas fa-heart"></i>
            </div>
            <p>{{chosenGoods.price}} теңге</p>
            <div class="sc-grid-flex">
                <div class="grid-counter">
                    <button :disabled="chosenGoods.count<=1"  @click.prevent="pred()" class="counter">&lt;</button>{{chosenGoods.count}}<button @click="next()" class="counter">&gt;</button>
                </div>
                <button @click="add(chosenGoods)" class="allBtn">В корзину</button>
            </div>
        </div>
    </div>
</template>

<script>
    import cart from '../help/cart'
    import nextPredBtn from '../mixins/nextPredBtn'
    export default {
        mixins: [nextPredBtn],
        data() {
            return {
                countBtn: 'chosenGoods'
            }
        },
        props: {
            chosenGoods: {
                type: Object,
                required: true,
                countDis: false
            },
        },
        methods: {
            add(e){
                cart.cart.push(e)
                cart.counter++
            }
        },
    }
</script>

<style scoped>
    
</style>