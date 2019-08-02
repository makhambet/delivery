<template>
    <div class="s1-grid-prod">
        <div class="chosen"  @click="bestGoods.heart=!bestGoods.heart" :class="{'heartActive': bestGoods.heart }">
            <i class="fas fa-heart"></i>
        </div>
        <router-link 
            tag="div" 
            :to="{name: 'good', params: {id:bestGoods.id}}" 
            class="s1-prod-img" 
            :style="{ backgroundImage: 'url(' + bestGoods.img + ')', 
            backgroundSize: '100% 100%', 
            backgroundPosition: 'center'}"
        >
            <div class="imgDark">
                
            </div>    
        </router-link>
        <small>Крем{{bestGoods.id}}</small>
        <p @click="showing=!showing">
            {{bestGoods.title}} <span v-show="showing">{{bestGoods.showing}}</span>
        </p>
        <div class="s1-grid-shopping">
            <div class="s2-grid-price">
                {{bestGoods.price}} теңге
            </div>
            <a @click="added()"><img src="../assets/images/Cart2.svg" alt=""></a>
        </div>
    </div>
</template>

<script>
    import counter from '../help/cart'
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
            added() {
                counter.counter++;
                console.log(counter.counter)
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