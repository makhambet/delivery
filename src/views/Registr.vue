<template>
    <section class="sect-registr">
        <div class="wrapper">
            <div class="page">
                <small>{{$ml.get('msg')}} > {{$ml.get('cart')}} > <span class="now-page">{{$ml.get('regisrt')}}</span></small>
            </div>
            <div v-if="cond==='cond'" class="sr-condition">
                <h2>{{$ml.get('regisrt')}}</h2>
                <div class="sr-content">
                    <div class="sr-content-block">
                        <div class="sr-block1">
                            <h4>{{$ml.get('date_delivery')}}</h4>
                            <div class="selDate">
                                <div class="custom-select">
                                    <i @click="isone=!isone" class="fas fa-angle-down"></i>
                                    <span @click="isone=!isone">{{one}}</span>
                                    <div v-if="isone">
                                        <div @click="isone=!isone, one = item, getHour()" v-for="(item, i) in arr" :key="i">
                                            {{item}}
                                        </div>
                                    </div>
                                </div>
                                <div class="custom-select" style="margin-right: 10px;">
                                    <span @click="istwo=!istwo,getHour()">{{two}}</span>
                                    <div v-if="istwo">
                                        <div @click="istwo=!istwo, two = item.time, pricing = item.id" v-for="(item, index) in hour" :key="index">{{item.time}}</div>
                                    </div>
                                    <i @click="istwo=!istwo" class="fas fa-angle-down"></i>
                                </div>
                                <span style="color: red; font-size: 12px;" v-if="pricing===0||pricing===1||pricing===6">{{$ml.get('is_night')}}</span>
                                <span style="color: red; font-size: 12px;">{{errorDateText}}</span>
                            </div>
                            <div>
                                <h4>{{$ml.get('address_delivery')}}</h4>
                                <div class="selAddress">
                                    <p v-if="!newAddress" @click="newAddress = !newAddress">{{$ml.get('other_address')}}</p>
                                    <p v-if="newAddress" @click="newAddress = !newAddress">{{$ml.get('your_address')}}</p>
                                    <p v-show="!newAddress" v-for="(item,i) in USER_BY_ID.addresses" :key="i" :class="{'colorAdress':  selectAdd(i)}">
                                        <label>
                                            {{$ml.get('street')}}{{item.street}} {{$ml.get('home')}} {{item.home}} {{$ml.get('apartment')}} {{item.apartment}}
                                            <input @click="address_id = item.id" v-model="selAddress" :value="item.id" name="selAddress" type="radio">
                                            <span class="radiobtn"></span>
                                        </label>  
                                    </p>
                                    <p style="color: red;" v-if="USER_BY_ID.addresses.length === 0">{{$ml.get('another_address')}}</p>
                                </div>
                            </div>
                            <!-- <p style="font-size: 14px; cursor:pointer;" @click="newAddress = !newAddress">{{$ml.get('other_address')}}</p> -->
                            <div style="margin-top: 10px;" v-if="newAddress" class="homeAddress">
                                <form>
                                    <input type="text" v-model="addressStreet" :placeholder="$ml.get('street')"><br>
                                    <input type="text" v-model="addressHouse" :placeholder="$ml.get('home')">
                                    <input type="text" v-model="addressFlat" :placeholder="$ml.get('apartment')">
                                </form>
                            </div>
                        </div>
                        <div class="sr-block2">
                            <h4>{{$ml.get('payment_method')}}</h4>
                            <form>
                                <div class="payMethod">
                                    <label>
                                        <input v-model="payType" type="radio" value="1" name="payType">
                                        <span>{{$ml.get('in_cash')}}</span>
                                        <span class="radiobtn"></span>
                                    </label>
                                    <label>
                                        <input v-model="payType" type="radio" value="3" name="payType">
                                        <span>{{$ml.get('card_courier')}}</span>
                                        <span class="radiobtn"></span>
                                    </label>
                                </div>
                                <div class="payMethod">
                                    <label>
                                        <input v-model="payType" type="radio" value="2" name="payType">
                                       <span>{{$ml.get('card')}}</span>
                                        <span class="radiobtn"></span>
                                    </label>
                                    <label>
                                        <input v-model="payType" type="radio" value="4" name="payType">
                                        <span>{{$ml.get('bank_transfer')}}</span>
                                        <span class="radiobtn"></span>
                                    </label>
                                </div>
                            </form>
                            <div v-show="payType==='2'" @click="card(i, item.id)" v-for="(item, i) in USER_BY_ID.cards" :key="i" class="bankCardVisa">
                                <img src="../assets/images/Icon-Creditcard-Visa2.png" alt="">
                                <p>•••• •••• •••• {{item.number.slice(-4)}}</p> 
                                <i v-if="cardCheck(i)" class="fas fa-check"></i>
                            </div>
                            <p style="color: red; font-size: 12px;" v-show="USER_BY_ID.cards.length === 0 && payType === '2'">{{$ml.get('empty_card')}}</p>
                            <h4>{{$ml.get('bonus')}}</h4>
                            <div class="block2-radio">
                                <label>
                                    <input v-model="bonus" value="bonus" type="checkbox">
                                    {{$ml.get('spend_bonus')}} <br>
                                    <span class="radiobtn"></span>
                                    <small>{{$ml.get('spend')}} - {{USER_BY_ID.bonus}} {{$ml.get('bonus')}}</small>
                                </label>
                            </div>
                            <h4 style="margin-bottom: 5px;">{{$ml.get('total')}}: </h4>
                            <div class="block2-totalPrice">
                                <div><p>  {{totalPrice()}} {{$ml.get('tenge')}} </p><small>{{$ml.get('in_cash')}}</small></div>
                                <p v-if="bonus!==false">+</p>
                                <div v-if="bonus!==false"><p> {{USER_BY_ID.bonus}} {{$ml.get('tenge')}} </p><small>{{$ml.get('bonus')}}</small></div>
                            </div>
                        </div>
                    </div>
                    <div class="sr-block3">
                        <div class="sr-block3-bottom">
                            <p>{{$ml.get('total_price')}}: <br> <span class="price">{{totalPrice()}} {{$ml.get('tenge')}}</span></p>
                            <button @click="total()" class="allBtn">{{$ml.get('registr')}}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="cond==='condOK'" class="sr-ok">
                <h2>{{$ml.get('thanks_for_sale')}}!</h2>
                <img src="../assets/images/checked1.png" alt="">
                <p>
                    Наш администратор оформит ваш заказ в ближайшее время и курьер доставит его к указанному адресу. <br>
                    Вы можете посмотреть статус вашего заказа во вкладке "Заказы". <br>
                    Если у вас остались вопросы, вы можете позвонить по данному номеру: +7 (777) 777-77-77
                </p>
                <router-link to="/"><button class="allBtn">{{$ml.get('shopping')}}</button></router-link>
            </div>
            <div v-if="cond==='condNO'" class="sr-ok">
                <h2>Что-то пошло не так!</h2>
                <img src="../assets/images/Group8903.png" alt="">
                <p>
                    {{$ml.get('upps')}}
                </p>
                <router-link to="/registr"><button @click="cond='cond'" class="allBtn">{{$ml.get('upps')}}</button></router-link>
            </div>
        </div>
        <alert-box v-if="visible" :propName="alertTitle"></alert-box>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex'
    import user from '../help/user_id'
    import axios from 'axios'
    import config from '@/help/config'
    import { MLBuilder } from 'vue-multilanguage'
    import AlertBox from '../components/AppAlert'
    export default {
        data() {
            return {
                cond: 'cond',
                selectDate: ['22 мая','23 мая','24 мая','25 мая','26 мая'],
                addressFlat: '',
                addressHouse: '',
                addressStreet: '',
                payType: '1',
                check: false,
                arr: [],
                day: '',
                hour: [],
                address: '',
                bonus: false,
                card_id: 100,
                newAddress: false,
                selAddress: 0,
                one: this.$ml.get('date'),
                isone: false,
                two: this.$ml.get('hour'),
                istwo: false,
                url: config.url,
                address_id: 0,
                cards_id: 0,
                visible: false,
                alertTitle: this.$ml.get('not_auth'),
                pricing: '',
                errorDateText: '',
                nowCheckDate: 'Дата'
            }
        },
        computed: {
            ...mapGetters(['USER_BY_ID']),
            mlmyMessage () {
                return new MLBuilder('header')
            }  
        },
        methods: {
            getDaysInMonth(month,year) {
                // Here January is 1 based
                //Day 0 is the last day in the previous month
                return new Date(year, month, 0).getDate();
                // Here January is 0 based
                // return new Date(year, month+1, 0).getDate();
            },
            date() {
                let now = new Date
                


                let day = now.getDate()
                let year = now.getFullYear();
                let month = now.getMonth() + 1;
                let next_month_day = 1;
                if(month / 10 < 1) {
                    month='0'+month
                }
                let end_month = this.getDaysInMonth(month, year)
                for(let i = 0; i < 10; i++){
                    if(day + i <= end_month)
                        this.arr.push((day + i) + "." + month)
                    else {
                        this.arr.push(next_month_day + "." + parseInt(month + 1));
                        next_month_day++;
                    }
                }
                this.day = this.arr[0]

                return this.arr
            },
            totalPrice(){
                let price = 0;
                let night;
                if(this.pricing === 0 || this.pricing === 1 || this.pricing === 7){
                    price = this.USER_BY_ID.night_extra_percent/100
                }
                else price = 0
                if(this.bonus === false)
                    return parseInt(localStorage.delivery_totalPrice) + localStorage.delivery_totalPrice * price
                else if(this.bonus === true)
                    return parseInt(localStorage.delivery_totalPrice - this.USER_BY_ID.bonus) + (localStorage.delivery_totalPrice - this.USER_BY_ID.bonus) * price
            },
            card(id, card_id){
                this.card_id = id;
                this.cards_id = card_id;
            },
            total(){
                let date = new Date;
                if(localStorage.delivery_token !== null){
                    let formData = new FormData();
                    formData.append('delivery_date', this.one + '.' + date.getFullYear());
                    formData.append('delivery_hour', this.two);
                    formData.append('pay_type',      this.payType);
                    formData.append('bonus_bool',    this.bonus ? 1 : 0);
                    formData.append('order_type',    'order');
                    formData.append('is_night',    (this.pricing === 0 || this.pricing === 1 || this.pricing === 7) ? 1 : 0);
                    if(parseInt(this.payType) === 2) formData.append('card_id',   this.cards_id);
                    if(!this.newAddress)   formData.append('address_id',this.address_id);
                    if(this.newAddress){
                        formData.append('street',   this.addressStreet )
                        formData.append('home',     this.addressHouse)
                        formData.append('apartment',this.addressFlat )
                    }




                    axios.post(this.url + 'api/basket/buy', formData,  
                    {
                        headers: {
                            "token": localStorage.delivery_token,
                            // "Content-Type": 'application/x-www-form-urlencoded'
                        }
                    })
                    .then(response => { 
                        if(response.status === 200){
                            this.cond = 'condOK';
                            this.$store.dispatch('GET_BASKET_LIST')
                        }
                    })
                    .catch(error => {
                        this.alertTitle = error.response.data.message;
                        this.visible = true;
                        setTimeout(() => {
                            this.visible = false;
                        }, 1500);
                    });
                }
            },
            selectAdd(id){
                if(id === this.selAddress)
                    return true
                else false
            },
            cardCheck(i){
                if(i === this.card_id)
                    return true;
                else return false;
            },
            close(){
                this.isone = false;
                this.istwo = false;
            },
            getHour(){
                if(this.one === 'Дата') {
                    this.errorDateText = 'Выберите дату';
                    return;
                }
                this.errorDateText = '';
                let now = new Date;
                let end_hour = 3;
                this.hour = [];
                this.two = this.$ml.get('hour');
                let this_hour = now.getHours();
                for (let index = 0; index < 7; index++) {
                    if(parseInt(this.one) !== now.getDate())
                    { 
                        this.hour.push({
                            id: index,
                            time: 'C ' + end_hour + ':00 до ' + (end_hour + 3) + ':00'
                        });
                    }
                    else if(parseInt(this.one) === now.getDate() && this_hour < end_hour)
                    {
                        this.hour.push({
                            id: index,
                            time: 'C ' + end_hour + ':00 до ' + (end_hour + 3) + ':00'
                        });
                    }
                    end_hour += 3;
                }
            }
        },
        mounted () {
            this.date();
        },
        components: {
            AlertBox,
        },
    }
</script>

<style>
    .sr-content{
        width: 97%;
        margin: 0 auto;
    }
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
    .sect-registr .sr-block1 h4, .sect-registr .sr-block2 h4{
        font-size: 18px;
    }
    .sect-registr .sr-block2{
        width: 55%;
    }
    .sect-registr .sr-block1 select{
        width: 100%;
        padding: 12px 10px;
        border-color: #F4F5FA;
    }
    .sect-registr .sr-block1 .selDate{
        display: flex;
        justify-content: space-between;
        width: 100%;
        flex-wrap: wrap;
    }
    .sect-registr .selAddress p{
        height: 40px;
        border: 1px solid #F4F5FA;
        margin: 0;
        line-height: 40px;
        padding-left: 20px;
        position: relative;
    }
    .sect-registr .selAddress > p:first-child{
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .sect-registr .selAddress > p:last-child{
        border-bottom-right-radius: 10px 10px;
        border-bottom-left-radius: 10px 10px;
    }
    .sect-registr .selAddress p input{
        /* position: absolute;
        top: 10px;
        right: 10px;
        color: #2A98FF; */
        opacity: 0;
    }
    .sect-registr .selAddress p .radiobtn{
        top: 10px;
        right: 10px;
        left: auto;
        width: 15px;
        height: 15px;
    }
    .sect-registr .selAddress p .radiobtn:after {
        top: 4px;
        left: 4px;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: white;
    }
    .sect-registr .selAddress p input:checked ~ .radiobtn {
        background-color: #fff;
    }
    .sect-registr .selAddress p input:checked ~ .radiobtn:after{
        background-color: #2196F3;
    }
    .sect-registr .selDate select{
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
    }
    .sect-registr .sr-block1 .selAddress{
        width: 100%;
        max-width: 345px;
        overflow: hidden;
    }
    .sect-registr .selAddress .colorAdress label{
        max-width: 85%;
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
        /* justify-content: space-between; */
        text-align: left;
        flex-wrap: wrap;
    }
    .sr-block2 .payMethod label{
        cursor: pointer;
        position: relative;
        padding-left: 10px;
        margin-bottom: 10px;
    }
    .sr-block2 .payMethod > label:first-child{
        width: 120px;
    }
    .sr-block2 .payMethod label input{
        opacity: 0;
    }
    .bankCardVisa, .bankCardMasterCard{
        background: #67B5FF;
        border-radius: 15px;
        display: flex;
        padding: 15px 20px;
        /* width: 60%; */
        max-width: 270px;
        min-width: 200px;
        margin-top: 10px;
        /* box-shadow: 0 8px 15px #E7EAF0 inset; */
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
        letter-spacing: 2px;
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
    .block2-radio label{
        position: relative;
    }
    .block2-radio label input{
        opacity: 0;
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
    .selDate .custom-select{
        width: 157px;
        position: relative;
        margin-bottom: 10px;
        border: 1px solid #F4F5FA;
        text-align: center;
        border-radius: 10px;
    }
    .selDate .custom-select span{
        text-align: center;
        line-height: 40px;
        display: block;
    }
    .selDate .custom-select > div{
        position: absolute;
        width: 100%;
        top: 90%;
        height: auto;
        border: 1px solid #F4F5FA;
        z-index: 3;
    }
    .selDate .custom-select > div > div{
        padding: 5px;
        background: #fff;
        cursor: pointer;
    }
    .selDate .custom-select i{
        position: absolute;
        right: 5px;
        top: 13px;
        background: #fff;
        font-size: 18px;
        color: #2A98FF;
    }
    .sect-registr .selAddress p.colorAdress{
        background: #EBF6FF;
    }
    .radiobtn {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        background-color: #fff;
        border: 1px solid #bdbec6;
        border-radius: 50%;
    }
    .radiobtn:after {
        content: "";
        position: absolute;
        display: none;
    }
    label input:checked ~ .radiobtn:after {
        display: block;
    }
    label .radiobtn:after {
        top: 5px;
        left: 5px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: white;
    }
    label input:checked ~ .radiobtn {
        background-color: #2196F3;
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