<template>
    <section v-if="auth" class="sect-authorization">
        <div class="sect-authorization-block">
            <!-- <img src="../assets/images/Group8951.png" alt=""> -->
            <h3>Добро пожаловать в <br> ZAKAZ ONLINE</h3>
            <p>Новый магазин легок и прост в использовании, присоединяйся к нам и узнай о новых предложениях</p>
            <form @submit="authorization()">
                <h4>Авторизация</h4>
                 <div class="form-group" :class="{ 'form-group--error': $v.phone.$error }">
                    <label class="form-icon">Телефон:</label>
                    <the-mask mask="+7 (7##) ### ##-##" v-model="$v.phone.$model" name="phone" placeholder="Введите номер телефона" required></the-mask>
                </div>
                <div class="error" v-if="!$v.phone.minLength">Введите корректный номер телефона.</div>
                <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
                    <label class="form-icon">Пароль:</label>
                    <input autocomplete="off" v-model.trim="$v.password.$model" type="password" name="password" placeholder="Введите пароль" required>
                </div>
                <div class="error" v-if="!$v.password.minLength">Пароль должен не меньше {{ $v.password.$params.minLength.min }} символов.</div>
                <label style="color: red;" v-if="message !== ''">{{message}}</label>
                <div class="sect-auth-form-content">
                    <a class="forget"><span @click="authen()">Забыли пароль?</span></a>
                    <label> 
                        <a href="#" class="forget">
                            Запомнить&nbsp;меня
                        </a>
                        <input type="checkbox" value="on">
                    </label>
                </div>
            </form>
            <div class="sect-auth-form-content">
                <button>
                    <router-link :to="'/signin'"><span @click="$emit('authorization', false)">Регистрация</span></router-link>
                </button>
                <button @click.prevent="authorization()">Войти</button>
            </div>
        </div>
        <div class="closed" @click="$emit('authorization', false)"></div>
    </section>
</template>

<script>
    import axios from 'axios'
    import {TheMask} from 'vue-the-mask'
    import user_id from '../help/user_id'
    import { required, minLength } from 'vuelidate/lib/validators'
    import config from '@/help/config'
    export default {
        props: {
            'auth': {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                password: '',
                phone: '',
                login: false,
                message: '',
                url: config.url
            }
        },
        methods: {
            authen(){
                this.$emit('authorization', false)
                this.$router.push({path: 'new-password'})
            },
            authorization() {
                axios.post(this.url + 'api/user/login', {
                    "password": this.password,
                    "phone": '7' + this.phone.toString().slice(-10),
                })
                .then(response => { 
                    if(response.status === 200){
                        // this.auth = false
                        user_id.id = response.data.result.id
                        user_id.token = response.data.result.token
                        localStorage.delivery_user_id = user_id.id
                        localStorage.delivery_token = response.data.result.token
                        // localStorage.auth = false
                        // user_id.auth = false
                        // this.auth = false
                        // localStorage.login = true
                        // this.login = true
                        // this.auth = false
                        this.$store.dispatch('GET_USER_BY_ID')               //не удалять
                        this.$store.dispatch('GET_GOODS', {
                            params: {
                                'page': '1',
                            },
                            headers: {
                                "token": localStorage.delivery_token
                            }
                        })
                        this.$store.dispatch('GET_CATS')
                        this.$store.dispatch('GET_BASKET_LIST')
                        setTimeout(() => {
                            this.$ml.lang = this.$store.getters.USER_BY_ID.lang
                            this.login = true
                            this.$emit('authorization', true)
                        }, 100);
                    }
                })
                .catch(error => {
                    this.message = error.response.data.message
                    this.password = ''
                    if(this.message === 'Польватель не найден'){
                        this.phone = ''
                    }
                    if(this.message === 'The phone must be 10 characters.'){
                        this.message = 'Телефон должен содержать 10 символов'
                    }
                });
                
            }
        },
        validations: {
            phone: {
                required,
                minLength: minLength(9)
            },
            password: {
                required,
                minLength: minLength(4)
            },
        },
        components: {
            TheMask,
        },
    }
</script>

<style scoped>
    .closed{
        position: absolute;
        height: 100vh;
        width: 100%;
        top: 0;
        left: 0;
    }
</style>