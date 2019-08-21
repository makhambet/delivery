<template>
    <div class="sect-order">
        <div v-if="!auth" class="wrapper">
            <small>Главная > <span class="now-page">Заказы</span></small>
            <h2>История заказов</h2>
            <div class="so-grid">
                <div v-for="(item, i) in filteredPagination" :key="i" class="so-grid-block">
                    <router-link :to="{name: 'order', params: {id:item.id}}">
                        <p>Заказ №{{item.id}} от {{item.delivery_date}}</p>
                        <span :style="coloring(item.status_info, i)">{{item.status_info}}</span>
                    </router-link>
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
            <p style="float:right;">Всего {{length}} заказов</p>
        </div>
        <div class="wrapper" v-if="auth">
            <h1>Вы не авторизованы</h1>
        </div>
    </div>
</template>

<script>
    import pagination from '../mixins/pagination'
    import user from '../help/user_id'
    export default {
        mixins: [pagination],
        data() {
            return {
                colorStatus: false,
                pageNumber: 0,
                pageCount: 0,
                currentPage: 0,
                size: 8,
                length: 0,                
                paginationName: 'ORDERS',
                auth: true
            }
        },
        methods: {
            coloring(message, id) {
                console.log(message, id)
                if(message === 'Ожидает подтверждения'){
                    console.log(this.filteredPagination[id])
                    return { color: '#FFC000' };
                }
                else if(message === 'Доставлен'){
                    console.log(this.filteredPagination[id])
                    return { color: '#23DA98' };
                }
                else if(message === 'Отменен'){
                    console.log(this.filteredPagination[id])
                    return { color: '#FF3D3D' };
                }
            },
        },
        created () {
            if(user.token === null || user.token === 'null'){
                this.auth = true
            }
            else{
                this.auth = false
            }
        },
    }
</script>

<style>
    .so-grid{
        display: grid;
        margin: auto;
        --auto-grid-min-size: 300px;
        grid-gap: 20px 50px;
        grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr));
    }
    .so-grid > div{
        border: 1px solid #F4F5FA;
        border-radius: 10px;
        padding: 2px 10px 10px;
    }
    .so-grid > div p{
        margin: 5px 0;
        color: #464855;
    }
    .so-grid-block{
        cursor: pointer;
    }
    @media (max-width: 768px){
        .so-grid{
            --auto-grid-min-size: 250px;
            grid-gap: 20px 30px;
        }
    }
    @media (max-width: 579px){
        .so-grid{
            --auto-grid-min-size: 200px;
        }
    }
</style>