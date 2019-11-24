<template>
    <section class="sect-auth">
        <div class="wrapper">
            <div class="page">
                <small><span class="now-page">Регистрация</span></small>
            </div>
            <h2>Регистрация</h2>
            <div class="sa-content">
            <facebook-account-kit ref="accountKit"
                appId="193014614575624"
                version="v1.0"
                :fbAppEventsEnabled='true'
                :debug='true'
                state="somecrsf">
                <form>
                    <div class="sa-form-block1">
                        <label>Тип клиента:</label>
                        <select v-model="type_user">
                            <option value="1">Физическое лицо</option>
                            <option value="2">Юридическое лицо</option>
                        </select>
                        <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
                            <label class="form-icon">Имя:<span class="star-red">*</span><i class="far fa-user"></i></label>
                            <input v-model.trim="$v.name.$model" type="text" name="name" placeholder="Введите имя" required>
                        </div>
                        <div class="error" v-if="!$v.name.minLength">Имя должен не меньше {{ $v.name.$params.minLength.min }} символов.</div>
                        <div class="form-group" :class="{ 'form-group--error': $v.phone.$error }">
                            <label class="form-icon">Телефон:<span class="star-red">*</span><i class="fas fa-mobile-alt"></i></label>
                            <the-mask mask="+7 (7##) ### ##-##" v-model="$v.phone.$model" name="phone" placeholder="Введите номер телефона" required></the-mask>
                        </div>
                        <div class="error" v-if="!$v.phone.minLength">Введите корректный номер телефона.</div>
                        <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
                            <label class="form-icon">Придумайте пароль:<span class="star-red">*</span><i class="fas fa-lock"></i></label>
                            <input v-model.trim="$v.password.$model" type="password" name="password" placeholder="Введите пароль" required>
                        </div>
                        <div class="error" v-if="!$v.password.minLength">Пароль должен не меньше {{ $v.password.$params.minLength.min }} символов.</div>
                        <div class="form-group" :class="{ 'form-group--error': $v.repeatPassword.$error }">
                            <label class="form-icon">Придумайте пароль<span class="star-red">*</span><i class="fas fa-lock"></i></label>
                            <input v-model.trim="$v.repeatPassword.$model" type="password" name="password" placeholder="Повторите пароль" required>
                        </div>
                        <div class="error" v-if="!$v.repeatPassword.sameAsPassword">Пароль не идентичен.</div>



                    </div>
                    <div class="sa-form-block2">
                        <label>Введите ваш Email:<span class="star-red">*</span></label>
                        <input v-model="email" type="email" name="email" placeholder="Ваш Email" required>
                        <p><strong>Политика конфиденциальности:</strong></p>
                        <div class="security">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus, iure eos. Corporis, quaerat doloribus, non sint, magnam nobis quisquam saepe a explicabo repellat eos asperiores exercitationem veniam dolores voluptatem velit. Numquam, labore ipsum odit corrupti, doloribus, deserunt cum asperiores eos placeat quaerat enim possimus! Nisi necessitatibus ratione saepe eos mollitia?
                        </div>
                        <div class="sa-block2-auth">
                            <input name="checked" type="checkbox" id="checkbox" required/>
                            <label for="checkbox">
                                Я ознакомился и соглашаюсь с политикой Конфиденциальности
                            </label>
                            <button class="allBtn" @click.prevent="register">Зарегистрироваться</button>
                        </div>
                    </div>
                </form>
            </facebook-account-kit>
            </div>
        </div>
        <app-alert v-if="visible" :propName="propTitle"></app-alert>
    </section>
</template>

<script>
    import AppAlert from '@/components/AppAlert.vue'
    import {TheMask} from 'vue-the-mask'
    import { required, sameAs, minLength } from 'vuelidate/lib/validators'
    import axios from 'axios'
    import config from '@/help/config'
    export default {
        data() {
            return {
                name: '',
                phone: '',
                email: '',
                age: 0,
                submitStatus: null,
                password: '',
                repeatPassword: '',
                visible: false,
                propTitle: '',
                type_user: '1',
                url: config.url
            }
        },
        methods: {
            register() {
                if(!this.$v.$invalid){
                    axios.post(this.url + '/api/user/register', {
                        "name": this.name,
                        "password": this.password,
                        "city_id": "1",
                        "phone": '7' + this.phone.toString(),
                        "email": this.email,
                        "type_user": this.type_user,
                        "props": null,
                        "created_at": Date.now(),
                    })
                    .then(response => { 
                        if(response.status === 200){
                            // this.$refs.accountKit.login(
                            //     {
                            //         countryCode: '+7',
                            //         phoneNumber: this.phone.toString().substring(1, 11),
                            //         display: "modal"
                            //     },
                            //     this.loginCallback
                            // );
                            this.propTitle = 'Вы зарегистрировались'
                            this.visible = true
                            setTimeout(() => {
                                this.visible = false
                                this.$router.push({path: '/'})
                            }, 2000);
                        }
                    })
                    .catch(error => {
                        this.propTitle = error.response.data.message
                        this.visible = true
                        setTimeout(() => {
                            this.visible = false
                        }, 2000);
                    });
                }
            },
            loginCallback(response) {
                if(response.status === 'PARTIALLY_AUTHENTICATED'){
                }
            }
        },
        validations: {
            name: {
                required,
                minLength: minLength(4)
            },
            phone: {
                required,
                minLength: minLength(9)
            },
            password: {
                required,
                minLength: minLength(6)
            },
            repeatPassword: {
                sameAsPassword: sameAs('password')
            }
        },
        created () {
            this.$store.dispatch('GET_USER_BY_ID')
        },
        components: {
            AppAlert,
            TheMask
        },
    }
</script>

<style>
    .sa-content form{
        display: flex;
        justify-content: space-between;
    }
    .sa-content form > div{
        display: flex;
        flex-direction: column;
    }
    .sa-content form .sa-form-block1{
        width: 30%;
    }
    .sa-content form .sa-form-block2{
        width: 55%;
    }
    .sa-content form label{
        font-size: 13px;
    }
    .sa-content form input, .sa-content form select{
        font-size: 17px;
        padding: 7px 10px;
        border-radius: 9px;
        border: 1px solid #707070;
        margin-bottom: 15px;
        max-width: 360px;
    }
    .sa-content form input:focus, .sa-content form select:focus{
        border: 1px solid #418DFF;
    }
    .sa-content form .star-red{
        color: red;
    }
    .form-icon{
        position: relative;
    }
    .form-icon i{
        position: absolute;
        right: 10px;
        font-size: 17px;
        top: 25px;
        color: #418DFF;
    }
    .sa-content form input[type="checkbox"]{
       height: 40px;
    }
    .sa-block2-auth{
        display: flex;
        justify-content: space-between
    }
    .sa-form-block2 strong{
        font-size: 18px;
        color: #000;
    }
    .sa-form-block2 .security{
        font-size: 13px;
    }

    .sa-block2-auth input[type="checkbox"] {
        display: none;
    }
    .sa-block2-auth label {
        cursor: default;
        font-weight: normal;
        line-height: 30px;
        padding: 10px 0;
        vertical-align: middle;
    }
    .sa-block2-auth label:before {
        content: " ";
        color: #FFC000;
        display: inline-block;
        font: 20px/30px Arial;
        margin-right: 15px;
        position: relative;
        text-align: center;
        text-indent: 0px;
        width: 30px;
        height: 30px;
        background: #FFF;
        border: 1px solid #e3e3e3;
        border-image: initial;
        vertical-align: middle;
    }
    .sa-block2-auth input:checked + label:before {
        content: '✔';
    }
    .sa-block2-auth input:disabled + label:before {
        background: #eee;
        color: #aaa;
    }
    .sa-block2-auth .allBtn{
        margin-top: 7px;
    }
    @media (max-width: 947px) {
        .sa-content form .sa-form-block1{
            width: 35%;
        }
        .sa-content form .sa-form-block2{
            width: 60%;
        }
    }
    @media (max-width: 768px) {
        .sa-content form{
            flex-direction: column;
        }
        .sa-content form input{
            width: 218px;
        }
        .sa-content form .sa-form-block1{
            width: 240px;
        }
        .sa-content form .sa-form-block2{
            width: 90%;
        }
    }
    @media (max-width: 579px) {
        .sa-block2-auth{
            display: flex;
            flex-direction: column;
        }
    }


    .form-group{
        display: flex;
        flex-direction: column;
    }
    .error{
        color: red;
        font-weight: bold;
    }
    
</style>