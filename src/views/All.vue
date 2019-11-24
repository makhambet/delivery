<template>
    <div class="wrapper" id="up">
        <div class="sect1-block">
            <app-menu></app-menu>
            <div class="sect1-block4 all-products">
                <h2>{{$ml.get('products')}}</h2>
                <p>{{$ml.get('change_categories')}}</p>
                <div class="article-products">
                    <div 
                        v-show="item.parent_id !== -1" 
                        v-for="(item, index) in CATS" 
                        :key="index" @click="open(item.id, item.name)" 
                        class="a-products-first"
                        style="background: #fff;"
                    >
                        <div
                            :style="{ backgroundImage: 'url(' + images(item.image_web) + ')'}"
                            style="background-size: contain; background-repeat: no-repeat; background-position: center;"
                        >
                            <!-- <h4>{{item.name}}</h4> -->
                        </div>
                    </div>
                    <div style="background: #fff;"></div>
                    <div style="background: #fff;"></div>
                </div>
                <div class="all-searcBtn">
                    <button @click="SearchProduct()">Найти</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AppMenu from '../components/AppMenu'
    import { MLBuilder } from 'vue-multilanguage'
    import { mapGetters } from 'vuex'
    import config from '../help/config'
    export default {
        // mixins: [pagination],
        data() {
            return {
                page: 1,
                showing: false,
                id: null, 
                title: '',
                url: config.url
            }
        },
        components: {
            AppMenu
        },
        computed: {
            mlmyMessage () {
                return new MLBuilder('header')
            },
            ...mapGetters([
                'CATS'
            ])  
        },
        methods: {
            SearchProduct(){
                localStorage.delivery_product_title = 'Товары'
                localStorage.delivery_product_catid = null
                localStorage.delivery_request = 'GOODS'
                this.$store.dispatch('GET_GOODS', {
                    params: {
                        'page': '1',
                        // 'cats[0]': this.id
                    },
                    headers: {
                        "token": localStorage.delivery_token || 'my_token'
                    }
                })  
                this.$router.push({path: 'products'})
            },
            open(id, title){
                localStorage.delivery_product_title = title
                localStorage.delivery_product_catid = id
                this.$store.dispatch('GET_GOODS', {
                    params: {
                        'page': '1',
                        'cats[0]': id
                    },
                    headers: {
                        "token": localStorage.delivery_token || 'my_token'
                    }
                })  
                this.$router.push({path: 'products'})
            },
            images(img){
                if(img === null) return '../images.png'
                else return this.url + img
            },
        },
        beforeMount() {
            this.page = this.$route.query.page
        }
    }
</script>

<style>
    .sect1-block4{
        width: 75%;
    }
    .all-products{
        width: 100%;
    }
    .all-pagination{
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
    }
    .all-pagination button, .all-pagination .current{
        padding: 0 20px;
        max-width: 160px;
        background-color: transparent;
        border-radius: 4px;
        border: 1px solid #BFBFBF;
        text-decoration: none;
        margin: 0 6px;
        transition: all .2s ease-in-out;
    }
    .all-pagination button, .all-pagination span {
        text-align: center;
        font-family: Helvetica, Arial, sans-serif;
        font-weight: 300;
        line-height: 42px;
        height: 44px;
        color: #BFBFBF;
        font-size: 18px;
    }
    .all-pagination button:hover {
        border-color: #78669E;
        color: #78669E;
    }
    .all-pagination .current {
        border-color: #78669E;
        color: #78669E;
    }
    .all-pagination .left button, .all-pagination .right button{
        border: none;
    }
    #loading {
        position: absolute;
        left: 45%;
        z-index: 9999;
        top: 30%;
        color: #137b85;
        display: inline-block;
        width: 50px;
        height: 50px;
        border: 3px solid #137b85;
        opacity: 3;
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
        -webkit-animation: spin 1s ease-in-out infinite;
    }
    .all-searcBtn{
        margin-top: 20px;
        text-align: right;
    }
    .all-searcBtn button{
        background: #2A98FF;
        color: #fff;
        border-radius: 10px;
        border: #2A98FF;
        padding: 10px 50px;
        /* width: 20%; */
    }

    @keyframes spin {
        to { -webkit-transform: rotate(360deg); }
    }
    @-webkit-keyframes spin {
        to { -webkit-transform: rotate(360deg); }
    }
</style>