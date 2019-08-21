<template>
    <div class="wrapper" id="up">
        <div v-if="!auth" class="sect1-block">
            <!-- <div id="loading"></div> -->
            <app-menu></app-menu>
            <div class="sect1-block4">
                <h2>{{product_title}}</h2>
                <input ref="src" type="text" v-model="src">
                <div class="s1-block4-grid">
                    <div v-for="(item, index) in filteredPagination" :key="index">
                        <best-goods :bestGoods="item"></best-goods>
                    </div>
                </div>
                <div class="all-pagination">
                    <div class="left">
                        <button :disabled="pageNumber === 0" @click.prevent="prevPage()"><a href="#up">&lt;</a></button>
                    </div>
                    <div class="middle">
                        <button v-if="pageNumber!==0" @click="pageNumber=0">1</button>
                        <span v-if="pageNumber>=2">...</span>
                        <button class="current">{{pageNumber+1}}</button>
                        <span v-if="pageNumber<currentPage-2">...</span>
                        <button v-if="pageNumber<currentPage-1" @click="pageNumber=currentPage-1">{{currentPage}}</button>
                    </div>
                    <div class="right">
                        <a><button @click.prevent="nextPage()" :disabled="pageNumber >= pageCount -1" >&gt;</button></a>
                    </div>
                </div>
                <p style="float:right;">Всего {{length}} товаров</p>
            </div>
        </div>
        <div v-if="auth">
            <h1>Вы не авторизованы</h1>
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
    export default {
        mixins: [pagination],
        data() {
            return {
                searchTerm: '',
                searcing: '',
                // src : help.searchInput,
                src: '',
                pageNumber: 0,
                pageCount: 0,
                currentPage: 0,
                size: 8,
                length: 0,
                paginationName: 'GOODS',
                name: [],
                product_title: 'Товары',
                auth: true
            }
        },
        components: {
            BestGoods,
            AppMenu
        },
        created () {
            if(user.token === null || user.token === 'null'){
                this.auth = true
            }
            else{
                this.auth = false
            }
            this.$store.dispatch('GET_GOODS')
        },
        mounted () {
            this.product_title = localStorage.product_title || 'Товары'
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