<template>
    <div class="wrapper">
        <div class="sect1-block">
            <app-menu></app-menu>
            <div class="sect1-block4">
                <h2>Самые продаваемые</h2>
                <input type="text" v-model="src">
                <div class="s1-block4-grid">
                    <div v-for="(item, index) in filteredGoods" :key="index">
                        <best-goods :bestGoods="item"></best-goods>
                    </div>
                </div>
                <div class="all-pagination">
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
                <p style="float:right;">Всего {{length}} товаров</p>
            </div>
        </div>
    </div>
</template>

<script>
    import BestGoods from '../components/BestItems'
    import AppMenu from '../components/AppMenu'
    import help from '../help/cart'
    export default {
        data() {
            return {
                searchTerm: '',
                searcing: '',
                src : help.searchInput,
                pageNumber: 0,
                pageCount: 0,
                currentPage: 0,
                size: 8,
                length: 0,
                windowWidth: window.innerWidth
            }
        },
        computed: {
            allGood() {
                return this.$store.getters.getGoods
            },
            filteredGoods(){
                let allGood = this.allGood
                if(this.windowWidth < 947){
                    this.size 
                }
                const start = this.pageNumber * this.size,
                    end = start*1.0 + this.size*1.0;
                this.length = allGood.length
                this.pageCount = Math.ceil(this.length/this.size)
                this.currentPage = Math.ceil(this.length/this.size)
                if(this.src)
                {
                    allGood = allGood.filter(b => 
                    b.title.toLowerCase().indexOf(this.src.toLowerCase()) >= 0)
                    this.pageNumber = 0
                }
                return allGood.slice(start, end)
            },
        },
        mounted () {
            window.onresize = () => {
                this.windowWidth = window.innerWidth
            };
        },
        methods: {
            prevPage(){
                return this.pageNumber--
            },
            nextPage(){
                return this.pageNumber++
            },
        },
        components: {
            BestGoods,
            AppMenu
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
        border: 1px solid #ccc;
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
        color: #999;
        font-size: 18px;
    }
    .all-pagination button:hover {
        border-color: #ea4c89;
        color: #ea4c89;
    }
    .all-pagination .current {
        border-color: #ea4c89;
        color: #ea4c89;
    }
    .all-pagination .left button, .all-pagination .right button{
        border: none;
    }
</style>