<template>
    <div class="sc-grid-block">
        <div class="sc-block-img">
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
                    <button :disabled="chosenGoods.count<=1 ? '' : disabled"  @click.prevent="pred()" class="counter">&lt;</button>{{chosenGoods.count}}<button @click="next()" class="counter">&gt;</button>
                </div>
                <button class="allBtn">В корзину</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            chosenGoods: {
                type: Object,
                required: true,
                countDis: false
            },
        },
        methods: {
            pred(){
                this.chosenGoods.count--;
            },
            next(){
                this.chosenGoods.count++;
            }
        },
    }
</script>

<style scoped>
    .sc-grid-block{
        max-width: 430px;
    }
</style>