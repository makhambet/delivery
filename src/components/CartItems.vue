<template>
    <div class="sb-grid-content">
        <div class="s-grid-block-img">
            <img v-if="cartGoods.product.images[0] !== undefined" :src="url + cartGoods.product.images[0]" alt="">
            <img v-if="cartGoods.product.images[0] === undefined" src="@/assets/images.png" alt="">
        </div>
        <div class="sb-block1-title">
            <p>{{cartGoods.product.name}}</p>
            <div style="cursor: pointer;" v-on:click="$emit('remove')" class="delete"><i class="far fa-trash-alt"></i></div>
            <div class="sb-content-flex">
                <div class="sb-flex-left">
                    <small>{{$ml.get('price')}}</small>
                    <p><strong>{{cartGoods.product.price}} {{$ml.get('tenge')}}</strong></p>
                </div>
                <div class="grid-counter">
                    <button 
                        :disabled="cartGoods.count<=1"  
                        @click.prevent="pred(), subscribe(cartGoods.product.id)" class="counter"
                    >
                        &lt;
                    </button>{{cartGoods.count}}<button
                        @click="next(), add(cartGoods.product.id)" 
                        class="counter"
                        :disabled="cartGoods.count>=10"
                    >&gt;</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import nextPredBtn from '../mixins/nextPredBtn'
    import config from '@/help/config'
    import { MLBuilder } from 'vue-multilanguage'
    import axios from 'axios'
    export default {
        mixins: [nextPredBtn],
        data() {
            return {
                countBtn: 'cartGoods',
                url: config.url
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
                this.$store.dispatch('POST_ADD_BASKET', {
                    product_id: id,
                    count: 1
                })
            },
            subscribe(id){
                this.$store.dispatch('POST_SUBSCRIBE_BASKET', {
                    product_id: id,
                    count: 1
                })
            },
        },
        computed: {
            mlmyMessage () {
                return new MLBuilder('header')
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