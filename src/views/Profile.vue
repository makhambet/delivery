<template>
    <section class="sect-profile">
        <div class="wrapper">
            <small>Главная > <span class="now-page">Профиль</span></small>
            <h2>Профиль</h2>
            <div class="sp-content">
                <div class="sp-content-block1">
                    <p>Имя</p>
                </div>
                <div class="sp-content-block2">
                    <p>{{USER_BY_ID.name}}</p>
                </div>
                <div class="sp-content-block1">
                    <p>Номер:</p>
                </div>
                <div class="sp-content-block2">
                    <p>+7 {{USER_BY_ID.phone}}</p>
                </div>
                <div class="sp-content-block1">
                    <p>E-mail:</p>
                </div>
                <div class="sp-content-block2">
                    <p>{{USER_BY_ID.email}}</p>
                </div>
                <div class="sp-content-block1">
                    <p>Адреса доставки:</p>
                </div>
                <div class="sp-content-block2">
                    <nav>
                        <ul>
                            <li
                                v-for="address in USER_BY_ID.addresses" 
                                :key="address.id"
                            >
                                <p>
                                    ул. {{address.street}} дом {{address.home}} квартира {{address.apartment}}
                                    <a @click="editAddress(address.id, address.street, address.home, address.apartment)" class="changeA">Изменить</a> <a style="float: right" @click.prevent="addressDelete(address.id)" class="deleteA">Удалить</a>
                                </p>
                            </li>
                        </ul>
                    </nav>
                    <button @click="newAddressClick()" class="sp-content-btn">
                        Добавить новый адрес
                    </button>
                    <div v-if="newAddress" class="addNewAddress">
                        <form>
                            <label>Добавление нового адреса</label><br>
                            <input v-model="addNewAddressStreet" type="text" placeholder="Улица"><a @click.prevent="newAddress=false" class="deleteA">Отмена</a><br>
                            <input v-model="addNewAddressHome" type="text" placeholder="Дом">
                            <input v-model="addNewAddressApartment" type="text" placeholder="Квартира"><br>
                            <button @click.prevent="map=true" class="allBtn">Указать на карте</button><br>
                            <p>Вы можете указать ваш адрес на карте. <br>Поставьте маркер на ваше местоположение.</p>
                            <button v-if="!edit" @click.prevent="newAddress=false" class="allBtn">Отмена</button>
                            <button :disabled="addAddress" @click.prevent="addNewAddress()" class="allBtn"><span v-if="!edit">Добавить</span><span v-if="edit">Изменить</span></button>
                        </form>
                    </div>
                </div> 
                <div class="sp-content-block1">
                    <p>Привязанные карты:</p>
                </div>
                <div class="sp-content-block2">
                    <div class="sp-content-block2" v-for="card in USER_BY_ID.cards" :key="card.id">
                        <a @click="cardDelete(card.id)" class="deleteA">Удалить</a>
                        <div class="bankCardVisa">
                            <img src="../assets/images/Icon-Creditcard-Visa1.png" alt="">
                            <p>•••• •••• •••• {{card.number.slice(-4)}}</p> 
                        </div>
                    </div>
                    <a class="deleteA">Удалить</a>
                    <div class="bankCardMasterCard" @click="check=!check">
                        <img src="../assets/images/Icon-MasterCard.png" alt="">
                        <p>•••• •••• •••• 2228</p> 
                    </div>
                    <button @click="newCard = true" class="sp-content-btn">
                        Добавить новую карту
                    </button>
                    <div v-if="newCard" class="addNewCard">
                        <form>
                            <label>Добавление новой карты</label><br>
                            <input id="code" maxlength="19" size="19" ref="cardNumberInput" v-model="addNewCardNumber" placeholder="Введите номер карты: " class="card" type="text">
                            <br>
                            <input v-model="addNewCardMY" placeholder="ММ/ГГ" type="text">
                            <input v-model="addNewCardCode" placeholder="CCV/CVV код" type="text"><br>
                            <button @click.prevent="newCard = false" class="allBtn">Отмена</button>
                            <button @click.prevent="addNewCard()" class="allBtn">Добавить</button>
                        </form>
                    </div>
                </div>
                <div class="sp-content-block1">
                    <p>Бонусы</p>
                </div>
                <div class="sp-content-block2">
                    <p>
                        Накоплено - 1 101 бонус <br>
                        Хотите получить больше бонусов?<br>
                        Введите номер друга, пригласите его установить приложение и получите 100 бонусов
                    </p>
                    <button class="sp-content-btn">
                        Получить бонус
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex'
    import user from '../help/user_id'
    import axios from 'axios'
import { constants } from 'crypto';
    export default {
        data() {
            return {
                addNewAddressStreet: null,
                addNewAddressHome: null,
                addNewAddressApartment: '',
                newAddress: false,
                addAddress: false,
                newCard: false,
                addCard: false,
                addNewCardNumber: '',
                addNewCardMY: null,
                addNewCardCode: null,
                postcardNumber: '',
                map: true,
                edit: false
            }
        },
        computed: {
            ...mapGetters(['USER_BY_ID'])
        },
        mounted () {
            var code = document.getElementById('code');
            document.addEventListener("keydown", this.cardNumber)
        },
        methods: {
            newAddressClick(){
                this.edit=false
                this.newAddress=true
                console.log(this.edit)
                this.addNewAddressStreet = ''
                this.addNewAddressHome = ''
                this.addNewAddressApartment = ''
            },
            editAddress(id, street, home, apartment){
                this.newAddress = true
                this.addNewAddressStreet = street
                this.addNewAddressHome = home
                this.addNewAddressApartment = apartment
                this.edit = true
                this.addressDelete(id)
                console.log(this.edit)
            },
            addressDelete(id){
                if(user.token === null || user.token === 'null'){
                    console.log('Адрес не удален')
                }
                else{
                    axios.post('http://localhost:8080/api/user/address/delete', {
                        "address_id": id
                    },
                    {
                        headers: {
                            "token": user.token
                        },
                    })
                    .then(response => { 
                        console.log(response)
                        this.$store.dispatch('GET_USER_BY_ID')
                    })
                    .catch(error => {
                        console.log(error.response)
                    });
                }
            },
            addNewAddress(){
                if(this.addNewAddressStreet===null || this.addNewAddressHome===null || user.token === null || user.token === 'null'){
                    console.log('Адрес добавлен')
                }
                else{
                    console.log(this.edit)
                    this.addAddress = true
                    this.newAddress = false
                    axios.post('http://localhost:8080/api/user/address/add', {
                        "street": this.addNewAddressStreet,
                        "home": this.addNewAddressHome,
                        "apartment": this.addNewAddressApartment
                    },
                    {
                        headers: {
                            "token": user.token
                        },
                    })
                    .then(response => { 
                        console.log(response)
                        this.$store.dispatch('GET_USER_BY_ID')
                    })
                    .catch(error => {
                        console.log(error.response)
                    });
                    if(this.edit) this.edit = false
                }
            },
            addNewCard(){
                if(this.addNewCardNumber===null || this.addNewCardMY===null || this.addNewCardCode===null || user.token === null || user.token === 'null'){
                    console.log('Карта не добавлена')
                }
                else{
                    this.addAddress = true
                    this.newAddress = false
                    axios.post('http://localhost:8080/api/user/card/add', {
                        "number": this.addNewCardNumber.split('-').join(''),
                        "month": this.addNewCardMY.substr('/')[0],
                        "year": this.addNewCardMY.slice(-4),
                        "code": this.addNewCardCode
                    },
                    {
                        headers: {
                            "token": user.token
                        },
                    })
                    .then(response => { 
                        console.log(response)
                        this.newCard = false
                        this.$store.dispatch('GET_USER_BY_ID')
                    })
                    .catch(error => {
                        console.log(error.response)
                    });
                }
            },
            cardDelete(id){
                if(user.token === null || user.token === 'null'){
                    console.log('Адрес не удален')
                }
                else{
                    axios.post('http://localhost:8080/api/user/card/delete', {
                        "card_id": id
                    },
                    {
                        headers: {
                            "token": user.token
                        },
                    })
                    .then(response => { 
                        console.log(response)
                        this.$store.dispatch('GET_USER_BY_ID')
                    })
                    .catch(error => {
                        console.log(error.response)
                    });
                }
            },
            cardNumber(e){
                if(e.key>=0 && e.key<=9){
                    this.addNewCardNumber +=e.key
                }
                if(this.addNewCardNumber.length > 3 ){
                    let count = this.addNewCardNumber.split('-').join('').length
                    if(count % 4 === 0 && count > 0 && count < 16){
                        this.addNewCardNumber+='-'
                    }
                    this.postcardNumber = this.addNewCardNumber.split('-').join('')
                }
            }
        },
    }
</script>

<style>
    .sp-content .sp-content-block1 > p{
        color: #444444;
        margin: 10px;
    }
    .sp-content .sp-content-block2 > p{
        margin: 0;
    }
    .sp-content > div:nth-child(2n){
        /* grid-area: b; */
        /* width: 60%; */
    }
    .sp-content{
        width: 740px;
        display: grid;
        --auto-grid-min-size: 300px;
        grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr));
        margin-bottom: 10%;
    }
    .sp-content-block1{
        width: 300px;
    }
    .sp-content-block2{
        width: 400px;
    }
    .sp-content-block2 > .deleteA{
        float: right;
        color: #FF4A4A;
        margin-top: 20px;
        cursor: pointer;
    }
    .sp-content-block2 nav ul{
        margin-top: 0;
        padding-left: 18px;
    }
    .sp-content-block2 nav ul p{
        margin-top: 0;
    }
    .sp-content-block2 nav ul li{
        list-style-type: decimal;
    }
    .sp-content-block2 nav .changeA, .sp-content-block2 nav .deleteA{
        text-decoration: underline;
        font-size: 14px;
        cursor: pointer;
    }
    .sp-content-block2 .deleteA{
        color: #FF4A4A;
        float: right;
        cursor: pointer;
    }
    .sp-content-block2 nav .changeA{
        color: #2A98FF;
        margin: 0 10px;
    }
    .sp-content-block2 .bankCardVisa, .sp-content-block2 .bankCardMasterCard{
        background: rgb(226, 226, 235);
        box-shadow: none;
    }
    .sp-content-block2 .bankCardVisa p, .sp-content-block2 .bankCardMasterCard p{
        color: #000;
        letter-spacing: 2px;
    }
    .sp-content-btn{
        width: 70%;
        height: 45px;
        background: #2A98FF;
        color: #fff;
        border:none;
        border-radius: 10px;
        margin-top: 10px;
    }
    .addNewAddress, .addNewCard{
        margin-top: 20px;
    }
    .addNewAddress form > input, .addNewCard input{
        width: 36%;
        padding: 5px;
        margin: 5px 7% 10px 0;
    }
    /* .addNewAddress form > input:first-child{
        width: 90%;
    } */
    .addNewAddress .allBtn, .addNewCard .allBtn{
        width: 40%;
        margin-right: 7%;
    }
    .sect-profile input, .addNewCard input{
        border-radius: 10px;
        border: 2px solid #F4F5FA;
        padding: 5px 10px 5px 20px;
    }
    .addNewAddress input[placeholder="Улица"]{
        width: 330px;
        margin-bottom: 5px;
    }
    .addNewAddress input[placeholder="Квартира"]{
        margin-right: 0;
    }
    .addNewAddress a{
        margin-top: 10px;
    }
    .addNewCard .card{
        padding: 10px 0 10px 20px;
        width: 320px;
    }
    .addNewCard input{
        padding-left: 5px;
        padding-right: 5px;
    }
    @media (max-width: 768px){
        .sp-content{
            width: 600px;
            --auto-grid-min-size: 300px;
            grid-template-columns: 1fr 2fr;
        }
    }
    @media (max-width: 650px){
        .sp-content{
            width: 510px;
        }
    }
    @media (max-width: 579px){
        .sp-content{
            width: 400px;
            --auto-grid-min-size: 400px;
            grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr));
            grid-row-gap: 10px;
        }
    }
    @media (max-width: 450px){
        .sp-content{
            width: 300px;
            --auto-grid-min-size: 300px;
            grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr));
            grid-row-gap: 10px;
        }
        
    }
</style>