<template>
    <section class="sect-special">
        <div class="wrapper">
            <div class="page">
                <small>{{$ml.get('msg')}} > <span class="now-page">{{$ml.get('special')}}</span></small>
            </div>
            <h2>{{$ml.get('regisrt')}}</h2>
            <div class="ss-content">
                <img src="../assets/images/Group.png" alt="">
                <div v-if="specialOK" class="ss-content-follow">
                    <h4>{{$ml.get('specialh4')}}</h4>
                    <p>{{$ml.get('specialp')}}</p>
                    <form action="special-ok">
                        <p>{{$ml.get('your_phone')}} <the-mask style="border: none; width: 120px;" mask="+7 (7##) ### ##-##" :value="USER_BY_ID.phone"/> </p>
                        <button @click.prevent="specialOrders()" class="allBtn">{{$ml.get('submit')}}</button>
                    </form>
                </div>
                <div v-if="!specialOK" class="ss-content-follow">
                    <h4>Вы не зарегистрированы!</h4>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {TheMask} from 'vue-the-mask'
    import axios from 'axios'
    import {mapGetters} from 'vuex'
    import { MLBuilder } from 'vue-multilanguage'
    export default {
        data() {
            return {
                specialOK: false,
                inputCheck: false,
                specialName:  null,
                specialPhone: null,
                name: '',
                phone: '',
                status: this.$store.getters.SPECIAL_REQUEST
            }
        },
        methods: {
            specialOrders(){
                this.$store.dispatch('POST_SPECIAL', [
                    {
                        // params: {
                        //     'order_id': 21,
                        //     'accept_bool': 1
                        // }
                    },
                    {
                        name: 'request'
                    }
                ]);
                setTimeout(() => {
                    this.status = this.$store.getters.SPECIAL_REQUEST
                    if(this.status === 200) this.$router.push({path: 'special-ok'})
                }, 500);
                    this.status = this.$store.getters.SPECIAL_REQUEST
            }
        },
        computed: {
            ...mapGetters([
                'USER_BY_ID'
            ]),
            mlmyMessage () {
                return new MLBuilder('header')
            } 
        },
        components: {
            TheMask
        },
        created () {
            if(localStorage.delivery_login === 'false') this.specialOK = false;
            else if(localStorage.delivery_login === 'true') this.specialOK = true;
        },
    }
</script>

<style>
    .ss-content{
        text-align: center;
        width: 40%;
        margin: 0 auto;
    }
    .ss-content h4{
        font-size: 20px;
        margin: 10px 0;
    }
    .ss-content-follow form input{
        padding: 10px 20px;
        max-width: 345px;
        width: 80%;
        border-radius: 8px;
        border: 1px solid #E9E9E9;
        margin-top: 10px;
    }
    .ss-content-follow form input::placeholder{
        text-align: center;
    }
    .ss-content-follow form button{
        margin-top: 10px;
    }
    .ss-content-follow form button:disabled{
        background: rgb(111, 166, 248);
    }
    .sect-special .form-group input{
        width: 100%;
        margin: 10px auto 0;
    }
    @media (max-width: 947px){
        .ss-content {
            width: 50%;
        }       
    }
    @media (max-width: 768px){
        .ss-content {
            width: 60%;
        }       
    }
    @media (max-width: 579px){
        .ss-content {
            width: 70%;
        }       
    }
    @media (max-width: 450px){
        .ss-content {
            width: 80%;
        }       
    }
</style>