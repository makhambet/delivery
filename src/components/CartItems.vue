<template>
    <div class="sb-grid-content">
        <div v-for="img in cartGoods.product.images" :key="img.id" class="s-grid-block-img">
            <img :src="img" alt="">
        </div>
        <div class="sb-block1-title">
            <p>{{cartGoods.product.name}}</p>
            <div v-on:click="$emit('remove')" class="delete"><i class="far fa-trash-alt"></i></div>
            <div class="sb-content-flex">
                <div class="sb-flex-left">
                    <small>Стоимость</small>
                    <p><strong>{{cartGoods.product.price}} теңге</strong></p>
                </div>
                <div class="grid-counter">
                    <button 
                        :disabled="cartGoods.count<=1"  
                        @click.prevent="pred()" class="counter"
                    >
                        &lt;
                    </button>{{cartGoods.count}}<button
                        @click="next(), add(cartGoods.product.id)" 
                        class="counter"
                    >&gt;</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import nextPredBtn from '../mixins/nextPredBtn'
    import axios from 'axios'
    export default {
        mixins: [nextPredBtn],
        data() {
            return {
                countBtn: 'cartGoods'
            }
        },
        props: {
            cartGoods: {
                type: Object,
                required: true,
                countDis: false
            }
        },
        methods: {
            counterDisabled(){
                if(this.cartGoods.count <=1){
                    this.countDis = true
                }
            },
            add(id){
                console.log(id)
                this.$store.dispatch('POST_ADD_BASKET', {
                    product_id: id,
                    count: 1
                })
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