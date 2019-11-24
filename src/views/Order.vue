<template>
    <div v-if="order">
        <div class="wrapper">
            <div class="page">
                <small>{{$ml.get('msg')}} > {{titles()}} > <span class="now-page">{{$ml.get('order')}} {{order.delivery_date}}</span></small>
            </div>
            <h2>{{titles()}} №{{order.id}} {{$ml.get('from')}} {{order.delivery_date.slice(0, 10)}} {{order.delivery_hour}}</h2>
            <div class="sect-order-content">
                <div class="sect-order-block1">
                    <h4>{{$ml.get('delivery_date')}}</h4>
                    <div class="order-block1-border">
                        <p>{{$ml.get('status')}}: {{order.status_info}}</p>
                    </div>
                    <h4>{{$ml.get('address')}}</h4>
                    <div class="order-block1-border">
                        <p>Нур-султан, {{$ml.get('street')}} {{order.address.street}} {{order.address.home}}, {{$ml.get('apartment')}} {{order.address.apartment}}</p>
                    </div>
                    <h4>{{$ml.get('paid')}}</h4>
                    <div class="order-block1-border">
                        <p>{{order.pay_type_info}}</p>
                    </div>
                    <h4>{{$ml.get('total')}}</h4>
                    <div class="order-block1-border">
                        <p>{{bonusPrice}}</p>
                    </div>
                    <h4>{{$ml.get('total_price')}}: <br><span class="price">{{order.total_price}} {{$ml.get('tenge')}}</span></h4>
                </div>
                <div class="sect-order-block2">
                    <h4>{{$ml.get('products')}}</h4>
                    <div class="sect-order-grid">
                        <div class="sector-grid-box" v-for="item in order.products" :key="item.id">
                            <div class="sector-img">
                                <img :src="url + item.images[0]" alt="">
                            </div>
                            <div class="sector-text">
                                <h5>{{item.name}}</h5>
                                <div class="sector-text-flex">
                                    <small>{{$ml.get('price')}}:</small>
                                    <small>{{$ml.get('amount')}}:</small>
                                </div>
                                <div class="sector-text-flex">
                                    <p>{{item.all_price}} {{$ml.get('tenge')}}</p>
                                    <p>{{item.count}} {{$ml.get('count')}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import config from '@/help/config'
    import { MLBuilder } from 'vue-multilanguage'
    export default {
        data() {
            return {
                title: 'Заказ',
                url: config.url
            }
        },
        props: {
            'id': {
                type: String,
                required: true,
                // default: this.$router
            },
            'isSpecial': {
                type: Boolean,
                
            }
        },
        computed: {
            order() {
                return this.$store.getters.ORDERS.find(b=>b.id ==this.id)
            },
            bonusPrice(){
                let str = this.order.total_price + this.$ml.get('tenge');
                if(this.order.bonus){
                    if(this.order.bonus >= this.order.total_price)
                        return this.order.bonus + ' бонусами';
                    let allPrice = this.order.total_price - this.order.bonus;
                    str = allPrice + this.$ml.get('tenge') + this.order.bonus + ' бонусами';
                    return str;
                }
                return str;
            },
            mlmyMessage () {
                return new MLBuilder('header')
            }  
        },
        methods: {
            titles(){
                if(this.isSpecial === 'true' || this.isSpecial) return this.$ml.get('special')
                else return this.$ml.get('order');
            }
        },
        created () {
            this.titles();
        },
    }
</script>

<style>
    .sect-order-content{
        display: flex;
        justify-content: space-between;
    }
    .sect-order-block1{
        width: 30%;
    }
    .sect-order-block2{
        width: 60%;
    }
    .sect-order-block1 h4{
        font-size: 18px;
        margin: 5px 0;
    }
    .sect-order-block1 .order-block1-border{
        border: 1px solid #F4F5FA;
        padding-left: 10px
    }
    .price{
        font-size: 29px;
    }
    .sect-order-grid{
        display: grid;
        margin: auto;
        grid-gap: 20px;
        --auto-grid-min-size: 250px;
        grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr));
    }
    .sector-grid-box{
        border: 1px solid #F4F5FA;
        display: flex;
        justify-content: space-around;
    }
    .sector-img{
        width: 30%;
        position: relative;
        text-align: center;
    }
    .sector-text{
        width: 50%;
    }
    .sector-img img{
        width: 90%;
        height: 90%;
        margin-top: 5%;
    }
    .sector-text h5{
        font-size: 17px;
        margin: 5px 0 15px;
    }
    .sector-text .sector-text-flex{
        display: flex;
        justify-content: space-between;
    }
    .sector-text .sector-text-flex p{
        font-weight: bold;
        margin: 5px 0 0;
    }
    @media (max-width: 768px){
        .sect-order-content{
            flex-direction: column;
        }
        .sect-order-content > div{
            width: 100%;
            margin: 0 auto;
        }
    }
</style>