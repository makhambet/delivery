<template>
    <div class="wrapper">
        <div class="sect1-block">
            <app-menu></app-menu>
            <div class="sect1-block4">
                <h2>Самые продаваемые</h2>
                <input type="text" v-model="src">
                <div class="s1-block2-grid">
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
                <p>Всего {{length}} товаров</p>
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
                length: 0
            }
        },
        computed: {
            allGood() {
                return this.$store.getters.getGoods
            },
            filteredGoods(){
                let allGood = this.allGood
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
                
                console.log(allGood.length)
                return allGood.slice(start, end)
            },
            // pageCount(){
            //     let l = this.length;
            //     return Math.floor(l/5);
            // },
            // currentPage(){
            //     return Math.floor(this.length/this.size)
            // }
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
        display: flex;
    }
</style>