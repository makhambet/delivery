<template>
    <section class="sect-registr">
        <div class="wrapper">
            <small>Главная > Корзина > <span class="now-page">Оформление заказа</span></small>
            <div v-if="cond==='cond'" class="sr-condition">
                <h2>Оформление заказа</h2>
                <div class="sr-content">
                    <div class="sr-content-block">
                        <div class="sr-block1">
                            <h4>Дата и время доставки</h4>
                            <div class="selDate">
                                <select v-model="day">
                                    <option v-for="(item, i) in arr" :key="i">{{item}}</option>
                                </select>
                                <select v-model="hour">
                                    <option>C 10:00 до 12:00</option>
                                    <option>C 13:00 до 15:00</option>
                                    <option>C 16:00 до 1:800</option>
                                </select>
                            </div>
                            <h4>Адрес доставки</h4>
                            <select v-model="address" class="selAddress">
                                <option v-for="(item,i) in USER_BY_ID.addresses" :key="i">Ул.{{item.street}} дом {{item.home}} квартира {{item.apartment}}</option>
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
                                <div class="payMethod">
                                    <label><input v-model="payType" type="radio" value="Наличными" name="payType">Наличными</label>
                                    <label><input v-model="payType" type="radio" value="Картой курьеру (POS - терминал)" name="payType">Картой курьеру<br>(POS - терминал)</label>
                                </div>
                                <div class="payMethod">
                                    <label><input v-model="payType" type="radio" value="Картой" name="payType">Картой</label>
                                    <label><input v-model="payType" type="radio" value="Банковский перевод" name="payType">Банковский перевод</label>
                                </div>
                            </form>
                            <div @click="card(item.id)" v-for="(item, i) in USER_BY_ID.cards" :key="i" class="bankCardVisa">
                                <img src="../assets/images/Icon-Creditcard-Visa2.png" alt="">
                                <p>•••• •••• •••• {{item.number.slice(-4)}}</p> 
                                <i v-if="check" class="fas fa-check"></i>
                            </div>
                            <div class="bankCardMasterCard" @click="check=!check">
                                <img src="../assets/images/Icon-MasterCard.png" alt="">
                                <p>•••• •••• •••• 2228</p> 
                                <i v-if="check" class="fas fa-check"></i>
                            </div>
                            <h4>Бонусы</h4>
                            <div class="block2-radio">
                                <label>
                                    <input v-model="bonus" value="bonus" type="radio">
                                        Потратить бонусы <br>
                                    <small>Накоплено - {{USER_BY_ID.bonus}} бонус</small>
                                </label>
                            </div>
                            <h4 style="margin-bottom: 5px;">Итого: </h4>
                            <div class="block2-totalPrice">
                                <div><p>  {{totalPrice()}} теңге </p><small>Наличными</small></div>
                                <p v-if="bonus!==false">+</p>
                                <div v-if="bonus!==false"><p> {{USER_BY_ID.bonus}} теңге </p><small>Бонусами</small></div>
                            </div>
                        </div>
                    </div>
                    <div class="sr-block3">
                        <div class="sr-block3-bottom">
                            <p>Итоговая сумма: <br> <span class="price">{{totalPrice()}} теңге</span></p>
                            <button @click="total()" class="allBtn">Заказать</button>
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
            <div v-if="cond==='condNO'" class="sr-ok">
                <h2>Что-то пошло не так!</h2>
                <img src="../assets/images/Group8903.png" alt="">
                <p>
                    Попробуйте заново
                </p>
                <router-link to="/registr"><button @click="cond='cond'" class="allBtn">Попробуйте сново</button></router-link>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex'
    import user from '../help/user_id'
    import axios from 'axios'
    export default {
        data() {
            return {
                cond: 'cond',
                selectDate: ['22 мая','23 мая','24 мая','25 мая','26 мая'],
                bonus: '1 101',
                addressFlat: '',
                addressHouse: '',
                addressStreet: '',
                payType: '',
                check: false,
                arr: [],
                day: '',
                hour: 'C 10:00 до 12:00',
                address: '',
                bonus: false,
                card_id: 0
            }
        },
        computed: {
            ...mapGetters(['USER_BY_ID'])
        },
        methods: {
            date() {
                let now = new Date
                let day = now.getDate()
                let month = now.getMonth()
                if(month / 10 < 1) {
                    month='0'+month
                }
                for(let i = 0; i < 5; i++){
                    this.arr.push((day + i) + "." + month)
                }
                this.day = this.arr[0]
                // this.address = 'Ул.'+ this.USER_BY_ID.addresses[0].street + ' дом ' + this.USER_BY_ID.addresses[0].home + ' квартира ' +  this.USER_BY_ID.addresses[0].apartment
                return this.arr
            },
            totalPrice(){
                if(this.bonus === false)
                    return localStorage.totalPrice
                else if(this.bonus === 'bonus')
                    return localStorage.totalPrice - this.USER_BY_ID.bonus
            },
            card(id){
                this.card_id = id
            },
            total(){
                if(localStorage.token !== null){
                    axios.post('http://localhost:8080/api/basket/add',{
                        "delivery_date": this.day + '.2019',
                        "delivery_hour": this.hour,
                        "card_id": this.card_id,
                        "pay_type": this.payType,
                        "bonus_bool": this.bonus === false ? false : true,
                        "street": 'my str',
                        "home": 'my str',
                        "apartment": 'my str'
                    },  
                    {
                        headers: {
                            "token": 'my_token',
                            "Content-Type": 'application/x-www-form-urlencoded'
                        }
                    })
                    .then(response => { 
                        console.log(response)
                        if(response.status === 200){
                            this.cond = 'condOK'
                        }
                    })
                    .catch(error => {
                        console.log(error.response)
                        this.cond = 'condNO'
                    });
                }
            }
        },
        mounted () {
            this.date();
        },
    }
</script>

<style>
    .sect-registr .sr-content, .sr-content-block{
        display: flex;
        justify-content: space-between;
    }
    .sect-registr .sr-content-block{
        width: 75%;
    }
    .sect-registr .sr-block1{
        width: 40%;
    }
    .sect-registr .sr-block2{
        width: 55%;
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
    .sr-block2 .payMethod{
        display: flex;
        justify-content: space-between;
        text-align: left;
    }
    .sr-block2 .payMethod label{
        cursor: pointer;
    }
    .bankCardVisa, .bankCardMasterCard{
        background: #2A98FF;
        border-radius: 15px;
        display: flex;
        padding: 15px 20px;
        width: 60%;
        min-width: 200px;
        margin-top: 10px;
        box-shadow: 0 8px 15px #E7EAF0 inset;
        cursor: pointer;
    }
    .bankCardMasterCard img{
        height: 20px;
        width: 48px;
    }
    .bankCardVisa img, .bankCardMasterCard img{
        margin-right: 20px;
    }
    .bankCardVisa p, .bankCardMasterCard p{
        color: #fff;
        margin: 0;
        margin-right: 10%;
    }
    .bankCardVisa .fa-check, .bankCardMasterCard .fa-check{
        color: #fff;
    }
    .bankCardMasterCard{
        background: #A1ACC9;
    }
    .block2-radio{
        display: flex;
    }
    .block2-radio small{
        margin-left: 25px;
    }
    .block2-totalPrice{
        display: flex;
        justify-content: space-between;
        width: 260px;
    }
    .block2-totalPrice p{
        font-size: 22px;
        margin: 0;
    }
    .block2-totalPrice small{
        font-size: 13px;
    }
    @media (max-width: 947px){
        .sr-content-block{
            flex-direction: column;
        }
        .sect-registr .sr-block1, .sect-registr .sr-block2{
            width: 60%;
            margin: 0 auto;
        }
    }
    @media (max-width: 768px){
        .sect-registr .sr-block1, .sect-registr .sr-block2{
            width: 80%;
        }
    }
    @media (max-width: 579px){
        .block2-totalPrice{
            width: 200px;
        }
    }
    @media (max-width: 450px){
        .sect-registr .sr-content, .sr-content-block{
            flex-direction: column;
        }
        .sect-registr .sr-content-block, .sect-registr .sr-block1, .sect-registr .sr-block2, .sect-registr .sr-block3{
            width: 100%;
        }
        .sr-block3 .sr-block3-bottom{
            position: static;
            text-align: left;
            margin-top: 10px;
        }
        .block2-totalPrice{
            width: 260px;
        }
    }
</style>