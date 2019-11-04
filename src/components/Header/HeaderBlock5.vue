<template>
    <div class="header-block5">
        <div class="wrapper">
            <div @click="$emit('active')" class="toggle">
                <div id="one" class="span"></div>
                <div id="two" class="span"></div>
                <div id="three" class="span"></div>
            </div>
            <div class="h-block5-content">
                <div class="h-block5-search">
                    <form @submit.prevent="search">
                        <input v-model="searchModel" type="text" placeholder="🔍Поиск">
                    </form>
                </div>
                <div class="h-block5-img">
                    <div class="h-block1-cart">
                        <router-link :to="'/cart'"><img src="@/assets/images/Cart2.svg" alt=""><span class="cart-counter">{{count() }}</span></router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchModel: '',
            }
        },
        methods: {
            count(){
                return this.$store.getters.BASKET_COUNT
            },
            search(){
                this.$store.dispatch('GET_SEARCH', {
                    params: {
                        text: this.searchModel
                    },
                    headers: {
                        token: 'my_token'
                    }
                })
                localStorage.delivery_product_title = this.$ml.get('products')
                localStorage.delivery_product_catid = null
                this.$router.push({path: 'products'})
            }
        },
    }
</script>

<style scoped>
    .h-block5-img{
        margin-right: 5px;
    }
</style>