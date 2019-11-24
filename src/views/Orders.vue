<template>
    <div class="sect-order">
        <div v-if="!auth && isOrder" class="wrapper">
            <div class="page">
                <small>{{$ml.get('msg')}} > <span class="now-page">{{$ml.get('orders')}}</span></small>
            </div>
            <h2>{{$ml.get('history_order')}}</h2>
            <div v-if="ORDER_COUNT > 0">
                <div class="so-grid">
                    <div style="position: relative;" v-for="(item, i) in filteredPagination" :key="i" class="so-grid-block">
                        <a @click="open(item.id, item.type, item.status_info)">
                            <p v-if="item.delivery_date !== null">
                                {{$ml.get('order')}} №{{item.id}} {{$ml.get('from')}} {{item.delivery_date.slice(0, 10)}} {{item.delivery_hour}}
                            </p>
                            <span :style="coloring(item.status_info, i)">{{item.status_info}}</span>
                            <span v-if="item.type==='special'" class="specialOrder"></span>
                        </a>
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
                <p style="float:right;">{{$ml.get('total')}} {{ORDER_LENGTH}} {{$ml.get('orders_count')}}</p>
            </div>
        </div>
        <div class="wrapper" v-if="auth" style="min-height: 30vh;">
            <h2 style="margin-bottom: 0;"></h2>
            <p>{{$ml.get('orders_show_auth')}}</p>
        </div>
        <div style="min-height: 30vh;" class="wrapper" v-if="ORDER_COUNT === 0">
            <h2 style="margin-bottom: 0;">{{$ml.get('orders_empty')}}</h2>
            <!-- <p></p> -->
        </div>
    </div>
</template>

<script>
    import pagination from '../mixins/pagination'
    import { MLBuilder } from 'vue-multilanguage'
    import user from '../help/user_id'
    import {mapGetters} from 'vuex'
    import config from '../help/config'
    export default {
        mixins: [pagination],
        data() {
            return {
                colorStatus: false,
                pageNumber: 0,
                pageCount: 0,
                currentPage: 0,
                size: 10,
                length: this.$store.getters.ORDER_LENGTH,                
                paginationName: 'ORDERS',
                auth: true,
                isOrder: false,
                url: config.url
            }
        },
        computed: {
            ...mapGetters([
                'ORDER_LENGTH',
                'ORDERS',
                'ORDER_COUNT'
            ]),
            // order() {
            //     return this.$store.getters.ORDERS
            // },
            filteredPagination(){
                let order = this.ORDERS
                // const start = this.pageNumber * this.size,
                //     end = start*1.0 + this.size*1.0;
                this.length = this.$store.getters.ORDER_LENGTH
                this.pageCount = Math.ceil(this.length/this.size)
                this.currentPage = Math.ceil(this.length/this.size)
                return order
            },
            mlmyMessage () {
                return new MLBuilder('header')
            } 
        },
        methods: {
            coloring(message, id) {
                if(message === 'Ожидает подтверждения' || message === 'Ждите звонка' || message === 'Ожидает доставки' || message === 'Ожидает оплаты'){
                    return { color: '#FFC000' };
                }
                else if(message === 'Awaiting delivery' || message === 'Awaiting Confirmation' || message === 'Awaiting payment' || message === 'Awaiting the call'){
                    return { color: '#FFC000' };
                }
                else if(message === 'Доставлен' || 'Delivered'){
                    return { color: '#23DA98' };
                }
                else if(message === 'Отменен' || 'Canseled'){
                    return { color: '#FF3D3D' };
                }
            },
            gets(page){
                this.$store.dispatch('GET_ORDERS', {
                    params: {
                        'page': page
                    },
                    headers:{
                        "token": localStorage.delivery_token
                    }
                })
            },
            prevPage(){
                this.gets(this.pageNumber)
                return this.pageNumber--
            },
            nextPage(){
                this.gets(this.pageNumber + 2)
                return this.pageNumber++
            },
            open(id, type, status){
                if(status === 'Ожидание звонка' || status === 'Awaiting the call') return;
                else if(status === 'Ожидает подтверждения' || status === 'Ожидает оплаты' || status === 'Awaiting Confirmation' || status === 'Awaiting payment') 
                {
                    this.$store.dispatch('POST_ORDER_ID', id)
                    this.$router.push({name: 'special-orders', params: {id:id.toString()}})
                }
                else
                    this.$router.push({name: 'order', params: {id:id.toString(), isSpecial: type==='special' ? true : false}})
            }
        },
        created () {
            this.gets(1)
            if(user.token === null || user.token === 'null'){
                this.auth = true
            }
            else{
                this.auth = false
            }
            if(this.$store.getters.ORDERS){
                this.isOrder = true
            }
        },
        beforeMount () {
            this.pageNumber = parseInt(this.$route.query.page) || 0
        },
        watch: {
            pageNumber(newValue) {
                this.$router.push({path: 'orders', query: {page: this.pageNumber || 0}})
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
    .sect-order .all-pagination button:hover {
        border-color: #2A98FF;
        color: #2A98FF;
    }
    .sect-order .all-pagination .current {
        border-color: #2A98FF;
        color: #2A98FF;
    }
    .specialOrder{
        position: absolute;
        width: 15px;
        height: 15px;
        background: #2A98FF;
        border-radius: 50% 50%;
        top: 40%;
        right: 10px;
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