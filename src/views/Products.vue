<template>
    <div class="wrapper" id="up">
        <div class="sect1-block">
            <app-menu @closed="showing = false" :class="{menuActive: showing}"></app-menu>
            <div class="sect1-block4">
                <button class="block1-show" @click="open()">Подобрать по параметрам</button>
                <h2>{{product_title}}</h2>
                <div class="s1-block4-grid">
                    <div v-show="search_found" v-for="(item, index) in filteredPagination" :key="index">
                        <best-goods :page="pageNumber.toString()" :isVisible="true" :bestGoods="item"></best-goods>
                    </div>
                </div>
                <div v-if="search_found" class="all-pagination">
                    <div class="left">
                        <button :disabled="pageNumber === 0" @click.prevent="prevPage()">&lt;</button>
                    </div>
                    <div class="middle">
                        <button v-if="pageNumber!==0" @click="pageNumber=0">1</button>
                        <span v-if="pageNumber>=2">...</span>
                        <button class="current">{{pageNumber+1}}</button>
                        <span v-if="pageNumber<currentPage-2">...</span>
                        <button v-if="pageNumber<currentPage-1" @click="pageNumber=currentPage-1">{{currentPage}}</button>
                    </div>
                    <div class="right">
                        <button @click.prevent="nextPage()" :disabled="pageNumber >= pageCount -1" >&gt;</button>
                    </div>
                </div>
                <p v-if="search_found" style="float:right;">Всего {{length}} товаров</p>
                <p v-if="!search_found">Ничего не найдено</p>
            
            </div>
        </div>
    </div>
</template>

<script>
    import BestGoods from '../components/BestItems'
    import {mapGetters} from 'vuex'
    import AppMenu from '../components/AppMenu'
    import help from '../help/cart'
    import pagination from '../mixins/pagination'
    import user from '../help/user_id'
    import { MLBuilder } from 'vue-multilanguage'
    export default {
        mixins: [pagination],
        data() {
            return {
                searchTerm: '',
                src: '',
                pageNumber: 0,
                pageCount: 0,
                currentPage: 0,
                size: 10,
                length: 0,
                paginationName: 'GOODS',
                name: [],
                product_title: 'Товары',
                page: 1,
                showing: false,
                search_found: true,
                request: ''
            }
        },
        components: {
            BestGoods,
            AppMenu,
        },
        computed: {
            ...mapGetters([
                'PRICEMIN',
                'PRICEMAX',
                'GOODS',
                'CAT_ID',
                'SEARCH',
                'GOODS_LENGTH',
                'CATS'
            ]),
            filteredPagination(){
                let order = [], found = true;
                let src = this.SEARCH
                if(src === 404)
                {
                    this.search_found = false
                    order = [];
                    found = this.search_found
                }
                else if(src === 400){
                    order = this.GOODS
                    this.search_found = true
                }
                else
                {
                    order = this.SEARCH
                    this.search_found = true
                }
                this.length = this.GOODS_LENGTH
                this.pageCount = Math.ceil(this.length/this.size)
                this.currentPage = Math.ceil(this.length/this.size)
                if(this.length === 0) this.search_found = false;
                else this.search_found = true;
                this.search_found = found
                this.pageNumber = parseInt(this.$route.query.page)
                return order
            },
            mlmyMessage () {
                return new MLBuilder('header')
            }  
        },
        methods: {
            prevPage() {
                this.pageNumber --;
                this.gets(this.pageNumber + 1)
            },
            nextPage() {
                this.pageNumber ++
                this.gets(this.pageNumber + 1)
            },
            open(){
                this.showing = true
            },
            gets(page){
                if(localStorage.delivery_product_catid == 'null'){
                    this.$store.dispatch('GET_SEARCH', {
                        params: {
                            text: localStorage.delivery_search,
                            page: page || 1
                        },
                        headers: {
                            token: 'my_token'
                        }
                    })
                }
                else if(localStorage.delivery_product_catid == 'NaN'){
                    let array = JSON.parse(localStorage.getItem("arr"));
                    array['page'] = page || 1;
                    this.$store.dispatch('GET_GOODS', {
                        params: array,
                        headers: {
                            token: 'my_token'
                        }
                    })
                }
                else {
                    this.$store.dispatch('GET_GOODS', {
                        params: {
                            'page': page || 1,
                            'cats[0]': parseInt(localStorage.delivery_product_catid)
                        },
                        headers:{
                            "token": localStorage.delivery_token || 'my_token'
                        }
                    })
                }
            }
        },
        beforeMount () {
            this.pageNumber = parseInt(this.$route.query.page) || 0
        },
        created () {
            this.$store.dispatch('GET_CATS')
            this.product_title = localStorage.delivery_product_title || 'Товары'
            this.request = localStorage.delivery_request || 'CATS'
        },
        watch: {
            pageNumber(newValue) {
                this.$router.push({path: 'products', query: {page: this.pageNumber || 0}})
                this.gets(this.pageNumber + 1)
            }
        },
    }
</script>

<style>
    .sect1-block4{
        width: 75%;
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

    @keyframes spin {
        to { -webkit-transform: rotate(360deg); }
    }
    @-webkit-keyframes spin {
        to { -webkit-transform: rotate(360deg); }
    }
</style>