<template>
    <div>
        <section class="sect-registr">
            <div class="wrapper">
                <div class="page">
                    <small>{{$ml.get('msg')}} > {{$ml.get('cart')}} > <span class="now-page">{{$ml.get('regisrt')}}</span></small>
                </div>
                <div v-if="cond==='cond'" class="sr-condition">
                    <h2 style="margin-bottom: 0;">{{$ml.get('regisrt')}}</h2>
                    <div class="sr-content">
                        <div class="sr-content-block">
                            <div class="sr-block1">
                                <h4>{{$ml.get('date_delivery')}}</h4>
                                <div class="selDate">
                                    <div class="custom-select">
                                        <i @click="isone=!isone" class="fas fa-angle-down"></i>
                                        <span @click="isone=!isone">{{one}}</span>
                                        <div v-if="isone">
                                            <div @click="isone=!isone, one = item" v-for="(item, i) in arr" :key="i">
                                                {{item}}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="custom-select" style="margin-right: 10px;">
                                        <span @click="istwo=!istwo">{{two}}</span>
                                        <div v-if="istwo">
                                            <div @click="istwo=!istwo, two = item" v-for="(item, index) in hour" :key="index">{{item}}</div>
                                        </div>
                                        <i @click="istwo=!istwo" class="fas fa-angle-down"></i>
                                    </div>
                                </div>
                                <div v-if="!newAddress">
                                    <h4>{{$ml.get('address_delivery')}}</h4>
                                    <div class="selAddress">
                                        <p v-for="(item,i) in USER_BY_ID.addresses" :key="i" :class="{'colorAdress':  selectAdd(i)}">
                                            <label>
                                                {{$ml.get('street')}}{{item.street}} {{$ml.get('home')}} {{item.home}} {{$ml.get('apartment')}} {{item.apartment}}
                                                <input @click="address_id = item.id" v-model="selAddress" :value="i" name="selAddress" type="radio">
                                                <span class="radiobtn"></span>
                                            </label>  
                                        </p>
                                    </div>
                                </div>
                                <p style="font-size: 14px; cursor:pointer;" @click="newAddress = !newAddress">{{$ml.get('other_address')}}</p>
                                <div v-if="newAddress" class="homeAddress">
                                    <form>
                                        <input type="text" v-model="addressStreet" placeholder="Улица"><br>
                                        <input type="text" v-model="addressHouse" placeholder="Дом">
                                        <input type="text" v-model="addressFlat" placeholder="Квартика">
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
                                            <input v-model="payType" type="radio" value="2" name="payType">
                                            <span>{{$ml.get('card_courier')}}</span>
                                            <span class="radiobtn"></span>
                                        </label>
                                    </div>
                                    <div class="payMethod">
                                        <label>
                                            <input v-model="payType" type="radio" value="3" name="payType">
                                        <span> {{$ml.get('card')}}</span>
                                            <span class="radiobtn"></span>
                                        </label>
                                        <label>
                                            <input v-model="payType" type="radio" value="4" name="payType">
                                            <span>{{$ml.get('bank_transfer')}}</span>
                                            <span class="radiobtn"></span>
                                        </label>
                                    </div>
                                </form>
                                <div v-show="payType==='3'" @click="card(i)" v-for="(item, i) in USER_BY_ID.cards" :key="i" class="bankCardVisa">
                                    <img src="../assets/images/Icon-Creditcard-Visa2.png" alt="">
                                    <p>•••• •••• •••• {{item.number.slice(-4)}}</p> 
                                    <i v-if="cardCheck(i)" class="fas fa-check"></i>
                                </div>
                                <!-- <div class="bankCardMasterCard" @click="check=!check">
                                    <img src="../assets/images/Icon-MasterCard.png" alt="">
                                    <p>•••• •••• •••• 2228</p> 
                                    <i v-if="check" class="fas fa-check"></i>
                                </div> -->
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
                                    <div v-if="bonus!==false"><p> {{USER_BY_ID.bonus}} {{$ml.get('tenge')}} </p><small>Бонусами</small></div>
                                </div>
                            </div>
                        </div>
                        <div class="sr-block3">
                            <div class="sr-block3-bottom">
                                <p>{{$ml.get('total_price')}}: <br> <span class="price">{{totalPrice()}} {{$ml.get('tenge')}}</span></p>
                                <button @click="total()" class="allBtn">Заказать</button>
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
                <h4 v-if="cond === 'cond'">Товары</h4>
                <div v-if="cond === 'cond'" class="special-orders-grid">
                    <div class="special-orders-grid-area" v-for="(item, index) in ORDER_ID.products" :key="index">
                        <h4>{{item.name}}</h4>
                        <div class="special-orders-grid-flex">
                            <div>
                                <small>{{$ml.get('price')}}:</small>
                                <p>{{item.all_price}} {{$ml.get('tenge')}}</p>
                            </div>
                            <div>
                                <small>Количество:</small>
                                <p>{{item.count}} {{$ml.get('count')}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <alert-box v-if="visible" :propName="alertTitle"></alert-box>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import user from '../help/user_id'
    import axios from 'axios'
    import config from '@/help/config'
    import { MLBuilder } from 'vue-multilanguage'
    import AlertBox from '../components/AppAlert'
    export default {
        props: {
            id: {
                type: String,
                required: true
            },
        },
        data() {
            return {
                cond: 'cond',
                selectDate: ['22 мая','23 мая','24 мая','25 мая','26 мая'],
                bonus: '1 101',
                addressFlat: '',
                addressHouse: '',
                addressStreet: '',
                payType: '1',
                check: false,
                arr: [],
                day: '',
                hour: ['C 09:00 до 12:00', 'C 12:00 до 15:00', 'C 15:00 до 18:00'],
                address: '',
                bonus: false,
                card_id: 100,
                newAddress: false,
                selAddress: null,
                one: 'Дата',
                isone: false,
                two: 'Время',
                istwo: false,
                url: config.url,
                address_id: 0,
                cards_id: 0,
                visible: false,
                alertTitle: this.$ml.get('not_auth'),
            }
        },
        computed: {
            ...mapGetters([
                'USER_BY_ID',
                'ORDER_ID'
            ]),
            mlmyMessage () {
                return new MLBuilder('header')
            }  
        },
        methods: {
            date() {
                let now = new Date
                let day = now.getDate()
                let month = now.getMonth() + 1
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
                    return this.ORDER_ID.total_price
                else if(this.bonus === true)
                    return this.ORDER_ID.total_price - this.USER_BY_ID.bonus
            },
            card(id){
                this.card_id = id
            },
            total(){
                if(localStorage.delivery_token !== null){
                    let formData = new FormData();
                    formData.append('delivery_date', this.one);
                    formData.append('delivery_hour', this.two);
                    formData.append('pay_type',      this.payType);
                    formData.append('bonus_bool',    this.bonus ? 1 : 0);
                    formData.append('order_type',    'special');
                    formData.append('order_id',      this.id);
                    if(parseInt(this.payType) === 2) formData.append('card_id',   this.cards_id);
                    if(!this.newAddress)   formData.append('address_id',this.address_id);
                    if(this.newAddress){
                        formData.append('street',   this.addressStreet )
                        formData.append('home',     this.addressHouse)
                        formData.append('apartment',this.addressFlat )
                    }
                    this.$store.dispatch('POST_SPECIAL', [
                        {
                            'order_id': this.id,
                            'accept_bool': 1
                        },
                        { name: 'accept' }
                    ])
                    axios.post(this.url + 'api/basket/buy', formData, {
                        headers: {
                            "token": localStorage.delivery_token,
                            "Content-Type": 'application/x-www-form-urlencoded'
                        }
                    })
                    .then(response => { 
                        if(response.status === 200){
                            this.cond = 'condOK'
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

<style scoped>
    .selDate .custom-select {
        width: 47%;
        position: relative;
    }
    .special-orders-grid{
        display: grid;
        --auto-grid-min-size: 270px;
        grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr));
        grid-gap: 10px 20px;
    }
    .special-orders-grid-area{
        padding: 5px 20px;
        border: 1px solid #F4F5FA;
        border-radius: 10px;
    }
    .special-orders-grid-flex{
        display: flex;
        justify-content: space-between;
    }
    .special-orders-grid-area h4{
        font-size: 17px;
        margin: 5px 0;
    }
    .special-orders-grid-flex small{
        font-size: 12px;
    }
    .special-orders-grid-flex p{
        margin: 0;
        font-size: 16px;
        font-weight: bold;
    }
</style>