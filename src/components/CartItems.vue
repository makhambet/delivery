<template>
    <div class="sb-grid-content">
        <div class="sb-block1-img">
            <img :src="cartGoods.img" alt="">
        </div>
        <div class="sb-block1-title">
            <p>{{cartGoods.title}}</p>
            <div class="delete"><i class="far fa-trash-alt"></i></div>
            <div class="sb-content-flex">
                <div class="sb-flex-left">
                    <small>Стоимость</small>
                    <p><strong>{{cartGoods.price}} теңге</strong></p>
                </div>
                <div class="grid-counter">
                    <button :disabled="cartGoods.count<=1 ? '' : disabled"  @click.prevent="pred()" class="counter">&lt;</button>{{cartGoods.count}}<button @click="next()" class="counter">&gt;</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            cartGoods: {
                type: Object,
                required: true,
                countDis: false
            },
        },
        methods: {
            pred(){
                this.cartGoods.count--;
            },
            next(){
                this.cartGoods.count++;
            },
            counterDisabled(){
                if(this.cartGoods.count <=1){
                    this.countDis = true
                }
            }
        },
    }
</script>

<style>
    .counter{
        border: none;
        background: inherit;
    }
</style>