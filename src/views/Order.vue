<template>
    <div v-if="order">
        <div class="wrapper">
            <small>Главная > Заказы > <span class="now-page">Заказ {{order.number}}</span></small>
            <h2>Заказ №{{order.id}} от {{order.delivery_date}}</h2>
            <div class="sect-order-content">
                <div class="sect-order-block1">
                    <h4>Дата доставки</h4>
                    <div class="order-block1-border">
                        <p>Статус: {{order.status_info}}</p>
                    </div>
                    <h4>Адрес</h4>
                    <div class="order-block1-border">
                        <p>Алматы, пр-т {{order.address.street}} {{order.address.home}}, кв {{order.address.apartment}}</p>
                    </div>
                    <h4>Оплачено</h4>
                    <div class="order-block1-border">
                        <p>{{order.pay_type_info}}</p>
                    </div>
                    <h4>Итого</h4>
                    <div class="order-block1-border">
                        <p>19 800 тенге + {{order.bonus}} тенге бонусами</p>
                    </div>
                    <h4>Итоговая сумма: <br><span class="price">{{order.total_price}} тенге</span></h4>
                </div>
                <div class="sect-order-block2">
                    <h4>Товары</h4>
                    <div class="sect-order-grid">
                        <div class="sector-grid-box" v-for="item in 8" :key="item.id">
                            <div class="sector-img">
                                <img src="https://images.unsplash.com/photo-1564582654667-7fa92fcca939?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1057&q=80" alt="">
                            </div>
                            <div class="sector-text">
                                <h5>BB-Cream новая формула</h5>
                                <div class="sector-text-flex">
                                    <small>Стоимость:</small>
                                    <small>Количество:</small>
                                </div>
                                <div class="sector-text-flex">
                                    <p>20 000 тенге</p>
                                    <p>5 штук</p>
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
    export default {
        props: {
            'id': {
                type: Number,
                required: true
            },
        },
        computed: {
            order() {
                return this.$store.getters.ORDERS.find(b=>b.id ==this.id)
            }
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
        display: flex;
    }
    .sector-img{
        width: 30%;
        position: relative;
    }
    .sector-img img{
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        max-width: 95%;
        max-height: 98%;
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