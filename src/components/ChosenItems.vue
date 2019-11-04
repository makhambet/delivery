<template>
    <div class="sc-grid-block">
        <div class="s-grid-block-img">
            <router-link :to="{name: 'good', params: {id:chosenGoods.id}}" >
                <img v-if="chosenGoods.images[0] !== undefined" :src="url + chosenGoods.images[0]" alt="">
                <img v-if="chosenGoods.images[0] === undefined" src="@/assets/images.png" alt="">
            </router-link>
        </div>
        <div class="sc-grid-content">
            <p>{{chosenGoods.name}}</p>
            <small>{{$ml.get('price')}}</small>
            <div class="chosen" @click="favorite(chosenGoods.id)">
                <i class="far fa-heart" :class="{'fas': chosenGoods.in_favorite}"></i>
            </div>
            <p>{{chosenGoods.price}} {{$ml.get('tenge')}}</p>
            <div class="sc-grid-flex">
                <!-- <div class="grid-counter">
                    <button :disabled="chosenGoods.count<=1"  @click.prevent="pred()" class="counter">&lt;</button>{{chosenGoods.count}}<button @click="next()" class="counter">&gt;</button>
                </div> -->
                <button @click="add(chosenGoods)" class="allBtn">В корзину</button>
            </div>
        </div>
    </div>
</template>

<script>
    import cart from '../help/cart'
    import nextPredBtn from '../mixins/nextPredBtn'
    import config from '@/help/config'
    import { MLBuilder } from 'vue-multilanguage'
    export default {
        mixins: [nextPredBtn],
        data() {
            return {
                countBtn: 'chosenGoods',
                url: config.url
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
            },
            favorite(id){
                // this.bestGoods.id.heart=!this.bestGoods.id.heart
                setTimeout(() => {
                    this.$store.dispatch('GET_FAVORITE_LIST')
                }, 100);
                this.$store.dispatch('POST_FAVORITE', {
                    product_id: id
                })
            },
            isFavorite(){
                
            } 
        },
        computed: {
            mlmyMessage () {
                return new MLBuilder('header')
            }
        },
    }
</script>

<style scoped>
    
</style>