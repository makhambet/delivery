<template>
    <section class="sect-profile">
        <div class="wrapper">
            <div class="page">
                <small>{{$ml.get('msg')}} > <span class="now-page">{{$ml.get('profile')}}</span></small>
            </div>
            <h2>{{$ml.get('profile')}}</h2>
            <div class="sp-content">
                <div class="sp-content-block1">
                    <p>{{$ml.get('name')}}</p>
                </div>
                <div class="sp-content-block2">
                    <p>{{USER_BY_ID.name}}</p>
                </div>
                <div class="sp-content-block1">
                    <p>{{$ml.get('phone')}}:</p>
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
                    <p>{{$ml.get('address_delivery')}}:</p>
                </div>
                <div class="sp-content-block2">
                    
                        
                <app-map @alerted="alertBox('Адрес добавлен!')"></app-map>
                </div> 
                <div class="sp-content-block1">
                    <p>{{$ml.get('tied_cards')}}:</p>
                </div>
                <div class="sp-content-block2">
                    <div class="sp-content-block2" v-for="card in USER_BY_ID.cards" :key="card.id">
                        <a @click="cardDelete(card.id)" class="deleteA hideDelete">Удалить</a>
                        <a class="deleteA showDelete"><i class="fas fa-trash-alt"></i></a>
                        <div class="bankCardVisa">
                            <img src="../assets/images/Icon-Creditcard-Visa1.png" alt="">
                            <p>•••• •••• •••• {{card.number.slice(-4)}}</p> 
                        </div>
                    </div>
                    <button @click="newCard = true" class="sp-content-btn">
                        {{$ml.get('new_card')}}
                    </button>
                    <div v-if="newCard" class="addNewCard">
                        <form style="position: relative;">
                            <label>{{$ml.get('adding_new_card')}}</label><br>
                            <div style="position: relative;">
                                <the-mask mask="####-####-####-#####" data-cp="cardNumber" id="coder" maxlength="19" size="19" v-model="addNewCardNumber" :placeholder="$ml.get('card_name')" class="card" type="text" />
                                <div v-if="addNewCardNumber.length > 3">
                                    <div v-if="addNewCardNumber.length > 3 && addNewCardNumber.slice(0,4) === '4052'" class="cardImg"><img src="../assets/images/Icon-Creditcard-Visa1.png" alt=""></div>
                                    <div v-if="addNewCardNumber.length > 3 && addNewCardNumber.slice(0,4) === '5169'" class="cardImg"><img src="../assets/images/Icon-MasterCard.png" alt=""></div>
                                </div>
                            </div>
                            <input style="text-transform: uppercase;" v-model="fullname" :placeholder="$ml.get('enter_fullname')" type="text" class="card"><br>
                            <the-mask mask="##/##" data-cp="expDateMonth expDateYear" maxlength="5" v-model="addNewCardMY" :placeholder="$ml.get('card_year')" type="text" />
                            <input maxlength="4" data-cp="cvv" v-model="addNewCardCode" :placeholder="$ml.get('cvv')" type="text"><br>
                            <button @click.prevent="newCard = false" class="allBtn">{{$ml.get('cancel')}}</button>
                            <button @click.prevent="asd()" class="allBtn">{{$ml.get('add')}}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <app-alert v-if="visible" :propName="propTitle"></app-alert>
    </section>
</template>

<script>
    import AppMap from '@/components/Maps'
    import {mapGetters} from 'vuex'
    import user from '../help/user_id'
    import axios from 'axios'
    import AppAlert from '@/components/AppAlert'
    import { MLBuilder } from 'vue-multilanguage'
    import {TheMask} from 'vue-the-mask'
    import config from '@/help/config'
    export default {
        data() {
            return {
                newCard: false,
                addCard: false,
                addNewCardNumber: '',
                addNewCardMY: null,
                addNewCardCode: null,
                postcardNumber: '',
                edit: false,
                visible: false,
                propTitle: '',
                fullname: '',
                friend: false,
                new_friend: '',
                url: config.url
            }
        },
        computed: {
            ...mapGetters(['USER_BY_ID']),
            mlmyMessage () {
                return new MLBuilder('header')
            }  
        },
        methods: {
            alertBox(title){
                this.propTitle = title
                this.visible = true
                setTimeout(() => {
                    this.visible = false
                }, 2000);
            },
            addNewCard(){
                if(this.addNewCardNumber===null || this.addNewCardMY===null || this.addNewCardCode===null || user.token === null || user.token === 'null'){
                    return
                }
                this.alertBox('Карта добавлена!')
                this.addAddress = true
                this.newAddress = false
                axios.post(this.url + 'api/user/card/add', {
                    "number": this.addNewCardNumber.split('-').join(''),
                    "fullname": this.fullname,
                    "month": this.addNewCardMY.substr('/')[0],
                    "year": this.addNewCardMY.slice(-2),
                    "code": this.addNewCardCode
                },
                {
                    headers: {
                        "token": user.token
                    },
                })
                .then(response => { 
                    this.newCard = false
                    this.$store.dispatch('GET_USER_BY_ID')
                })
                .catch(error => {
                    // console.log(error.response)
                });
            },
            cardDelete(id){
                if(confirm('Вы хотите удалить карту?')){
                    this.alertBox('Карта удалена!')
                    axios.post(this.url + 'api/user/card/delete', {
                        "card_id": id
                    },
                    {
                        headers: {
                            "token": user.token
                        },
                    })
                    .then(response => { 
                        this.$store.dispatch('GET_USER_BY_ID')
                    })
                    .catch(error => {
                        // console.log(error.response)
                    });
                }
            },
            newFriend(){
                let vm = this
                axios.post(this.url + 'api/user/invite', {
                    "phone": '7' + this.new_friend
                },
                {
                    headers: {
                        "token": user.token
                    },
                })
                .then(response => { 
                    vm.alertBox(response.data.message)
                    this.friend = false
                })
                .catch(error => {
                    // console.log(error.response)
                });
            },
            asd(){

            }
        },
        mounted () {
            if(this.newCard){
                var coder = document.getElementById('coder');
                // console.log($refs);
                // document.addEventListener("keyup", this.cardNumber)
            }
            
            
        },
        components: {
            AppAlert,
            AppMap,
            TheMask
        },
    }
</script>

<style>
    .sp-content .sp-content-block1 > p{
        color: #444444;
        margin: 10px;
    }
    .sp-content .sp-content-block2 > p{
        margin: 10px;
    }
    .sp-content > div:nth-child(1){
        grid-area: a;
    }
    .sp-content > div:nth-child(2){
        grid-area: b;
    }
    .sp-content{
        width: 740px;
        display: grid;
        /* --auto-grid-min-size: 300px;
        grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr)); */
        grid-template-areas: 'a b';
        margin-bottom: 10%;
        grid-template-columns: 1fr 2fr;
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
        width: 140px;
        padding: 5px;
        margin: 5px 7% 10px 0;
    }
    /* .addNewAddress form > input:first-child{
        width: 90%;
    } */
    .addNewAddress .allBtn, .addNewCard .allBtn{
        width: 155px;
        margin-right: 7%;
        margin-bottom: 10px;
    }
    .sect-profile input, .addNewCard input{
        border-radius: 10px;
        border: 2px solid #F4F5FA;
        padding: 5px 10px 5px 20px;
    }
    .addNewAddress input[placeholder="Ул."], .addNewAddress input[placeholder="Street"]{
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
    .cardImg{
        position: absolute;
        left: 350px;
        top: 10px;
    }
    .showDelete{
        display: none;
    }
    @media (max-width: 1400px){
        .addresses-map-block {
            position: static;
            margin-left: 0;
            /* top: 0;
            width: 100%;
            height: 400px;
            margin-left: 105%; */
        }
    }
    @media (max-width: 768px){
        .sp-content{
            width: 100%;
            grid-template-areas: 'a'
                                 'b';
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr;
            grid-gap: 0;
        }
        /* .sp-content .sp-content-block1, .sp-content .sp-content-block1 p{
            width: 90%;
        }
        .sp-content .sp-content-block2, .sp-content .sp-content-block2 p{
            width: 90%;
        } */
    }
    @media (max-width: 650px){
        .sp-content{
            /* width: 510px; */
        }
        .addresses-map-block {
            width: 90%;
        }
    }
    @media (max-width: 579px){
        .sp-content{
            /* width: 400px;
            --auto-grid-min-size: 400px;
            grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr));
            grid-row-gap: 10px; */
        }
    }
    @media (max-width: 450px){
        .showDelete{
            display: block;
        }
        .hideDelete{
            display: none;
        }
        .addNewCard .card{
            width: 280px;
        }
        .sp-content-block2 .bankCardVisa, .sp-content-block2 .bankCardMasterCard{
            padding: 10px 0 10px 10px;
            max-width: 250px;
        }
        .sp-content-block2 > .deleteA{
            margin-top: 10px;
        }
        .addNewAddress input[placeholder="Улица"]{
            width: 280px;
            padding-left: 15px;
        }
        .addNewAddress form > input, .addNewCard input{
            width: 125px;
        }
        .addNewAddress .allBtn, .addNewCard .allBtn{
            width: 139px;
        }
        
    }
    @media (max-width: 359px){
        .sp-content .sp-content-block2 > p{
            max-width: 90%;
        }
        .addNewAddress form > input, .addNewCard input{
            width: 280px;
            padding-left: 15px;
        }
    }
</style>