<template>
    <div class="s1-grid-prod">
        <div class="chosen"  @click="bestGoods.heart=!bestGoods.heart" :class="{'heartActive': bestGoods.heart }">
            <i class="fas fa-heart"></i>
        </div>
        <div>
            <img :src="bestGoods.img" alt=""><br>
            <small>Крем</small>
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
    .s1-grid-prod{
        max-width: 132px;
    }
    .chosen{
        z-index: 9999;
    }
</style>