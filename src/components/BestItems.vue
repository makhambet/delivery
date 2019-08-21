<template>
    <div class="s1-grid-prod">
        <div class="chosen"  @click="bestGoods.heart=!bestGoods.heart" :class="{'heartActive': bestGoods.heart }">
            <i class="fas fa-heart"></i>
        </div>
        <router-link
            v-for="(img, index) in bestGoods.images"
            :key="index"
            tag="div" 
            :to="{name: 'good', params: {id:bestGoods.cat_id}}" 
            class="s1-prod-img" 
            :style="{ backgroundImage: 'url(' + img + ')', 
            backgroundSize: '100% 100%', 
            backgroundPosition: 'center'}"
        >
            <div class="imgDark">
                
            </div>    
        </router-link>
        <small>{{bestGoods.name}}</small>
        <p @click="showing=!showing">
            {{bestGoods.name}} <span v-show="showing">{{bestGoods.description}}</span>
        </p>
        <div class="s1-grid-shopping">
            <div class="s2-grid-price">
                {{bestGoods.price}} теңге
            </div>
            <a @click="added(bestGoods.id)"><img src="../assets/images/Cart2.svg" alt=""></a>
        </div>
    </div>
</template>

<script>
    import counter from '../help/user_id'
    import axios from 'axios'
    export default {
        props: {
            bestGoods: {
                type: Object,
                required: true
            },
        },
        data() {
            return {
                showing: false
            }
        },
        methods: {
            added(id) {
                this.$store.dispatch('POST_ADD_BASKET', {
                    product_id: id,
                    count: 1
                })
            }   
        },
    }
</script>

<style scoped>
    .chosen{
        z-index: 9999;
        top: 9px;
    }
</style>