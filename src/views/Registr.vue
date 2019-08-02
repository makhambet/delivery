<template>
    <section class="sect-registr">
        <div class="wrapper">
            <small>Главная > Корзина > <span class="now-page">Оформление заказа</span></small>
            <div v-if="cond==='cond'" class="sr-condition">
                <h2>Оформление заказа</h2>
                <div class="sr-content">
                    <div class="sr-block1">
                        <h4>Дата и время доставки</h4>
                        <div class="selDate">
                            <select>
                                <option v-for="(item, i) in selectDate" :key="i">{{item}}</option>
                            </select>
                            <select>
                                <option>C 10:00 до 12:00</option>
                                <option>C 13:00 до 15:00</option>
                                <option>C 16:00 до 1:800</option>
                            </select>
                        </div>
                        <h4>Адрес доставки</h4>
                        <select class="selAddress">
                            <option v-for="(item,i) in selectAddress" :key="i">{{item}}</option>
                        </select>
                        <p>Указать другой адрес</p>
                        <div class="homeAddress">
                            <form>
                                <input type="text" v-model="addressStreet" placeholder="Улица"><br>
                                <input type="text" v-model="addressHouse" placeholder="Дом">
                                <input type="text" v-model="addressFlat" placeholder="Квартика">
                            </form>
                        </div>
                    </div>
                    <div class="sr-block2">
                        <h4>Способ оплаты</h4>
                        <form>
                            <label><input type="radio" name="regPay">Наличными</label>
                            <label><input type="radio" name="regPay">Картой курьеру(POS - терминал)</label>
                            <label><input type="radio" name="regPay">Картой</label>
                            <label><input type="radio" name="regPay">Банковский перевод</label>
                        </form>
                        <h4>Бонусы</h4>
                        <form>
                            <div class="block2-radio">
                                <input type="radio">
                                <div class="block2-bonus">
                                    <p>Потратить бонусы</p>
                                    <small>Накоплено - {{bonus}} бонус</small>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="sr-block3">
                        <div class="sr-block3-bottom">
                            <p>Итоговая сумма: <br> <span class="price">20 000 теңге</span></p>
                            <router-link :to="'/'"><button class="allBtn">Заказать</button></router-link>
                        </div>
                    </div>

                </div>
            </div>
            <div v-if="cond==='condOK'" class="sr-ok">
                <h2>Благодарим за покупку!</h2>
                <img src="../assets/images/checked1.png" alt="">
                <p>
                    Наш администратор оформит ваш заказ в ближайшее время и курьер доставит его к указанному адресу. <br>
                    Вы можете посмотреть статус вашего заказа во вкладке "Заказы". <br>
                    Если у вас остались вопросы, вы можете позвонить по данному номеру: +7 (777) 777-77-77
                </p>
                <router-link to="/"><button class="allBtn">К покупкам</button></router-link>
            </div>
            <div v-if="cond==='condOK'" class="sr-ok">
                <h2>Что-то пошло не так!</h2>
                <img src="../assets/images/Group8903.png" alt="">
                <p>
                    Попробуйте заново
                </p>
                <router-link to="/special"><button class="allBtn">Попробуйте сново</button></router-link>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                cond: 'cond',
                selectDate: ['22 мая','23 мая','24 мая','25 мая','26 мая'],
                selectAddress: ['Алматы, пр-т Абая 2, кв 39', 'Алматы, пр-т Абая 2, кв 39'],
                bonus: '1 101',
                addressFlat: '',
                addressHouse: '',
                addressStreet: ''
            }
        },
    }
</script>

<style>
    .sect-registr .sr-content{
        display: flex;
        justify-content: space-between;
    }
    .sect-registr .sr-block1{
        width: 30%;
    }
    .sect-registr .sr-block2{
        width: 39%;
    }
    .sect-registr .sr-block1 select{
        width: 45%;
        padding: 12px 10px;
        border-color: #F4F5FA;
    }
    .sect-registr .sr-block1 .selDate{
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .sect-registr .selAddress option{
        height: 40px;
    }
    .sect-registr .selDate select{
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
    }
    .sect-registr .sr-block1 .selAddress{
        width: 100%;
    }
    .homeAddress form > input:not(:first-child){
        width: 42%;
    }
    .homeAddress form > input:last-child{
        margin-left: 2%;
    }
    .homeAddress form > input:first-child{
        width: 93%;
        padding: 12px 10px;
        margin-bottom: 10px;
    }
    .homeAddress form > input{
        border-radius: 10px;
        border: 1px solid #F4F5FA;
        padding: 12px 10px;
    }
    .sect-registr .sr-block3{
        position: relative;
        width: 20%;
    }
    .sr-block3 .sr-block3-bottom{
        position: absolute;
        bottom: 0;
        right: 0;
        text-align: right;
    }
    .sr-block3 .sr-block3-bottom p{
        font-size: 18px;
        font-weight: bold;
        margin: 0;
    }
    .sr-block3 .sr-block3-bottom .price{
        font-size: 29px;
        font-weight: bold;
    }
    .sr-ok{
        width: 40%;
        text-align: center;
        margin: 0 auto;
    }
</style>