<template>
    <div class="new-password">
        <div class="wrapper">
            <facebook-account-kit ref="accountKit"
                v-show="!ok"
                appId="992075960963748"
                version="v1.0"
                :fbAppEventsEnabled='true'
                redirect="https://google.kz"
                :debug='true'
                :loginType="'PHONE'"
                state="somecrsf">
                <h2>Забыли пароль?</h2>
                <p>Введите номер указанный при регистрации. После вам понадобиться ввести 6-и значный код отправленный на ваш номер. Подтвердив номер вы совершаете переход на страницу где вам придется ввести новый пароль</p>
                <form action="https://www.accountkit.com/v1.0/basic/dialog/sms_login/">
                    <label>Введите ваш номер</label><br>
                        <the-mask mask="+7 (7##) ### ##-##" v-model="$v.phone.$model" name="phone" placeholder="Введите номер телефона" required></the-mask><br>
                    <div class="error" v-if="!$v.phone.minLength">Введите корректный номер телефона.</div>
                    <button @click.prevent="newPassword()">Отправить код</button>
                </form>
             </facebook-account-kit>
            <div v-show="ok">
                <h2>Придумайте новый пароль</h2>
                <form>
                    <input v-model.trim="$v.password.$model" type="password" name="password" placeholder="Введите пароль" required> <br>
                    <div class="error" v-if="!$v.password.minLength">Пароль должен не меньше {{ $v.password.$params.minLength.min }} символов.</div>
                    <input v-model.trim="$v.repeatPassword.$model" type="password" name="password" placeholder="Повторите пароль" required> <br>
                    <div class="error" v-if="!$v.repeatPassword.sameAsPassword">Пароль не идентичен.</div>
                    <button @click.prevent="change()">Сменить</button>
                </form>
            </div>
        </div>
        <app-alert v-if="visible" :propName="alertText"></app-alert>
    </div>
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
                phone: '',
                password: '',
                visible: false,
                ok: false,
                alertText: 'Пароль успешно сменен',
                repeatPassword: '',
                url: config.url
            }
        },
        methods: {
            newPassword(){
                if(this.phone !== '')
                {
                    this.$refs.accountKit.login(
                        {
                            countryCode: '+7',
                            phoneNumber: '7' + this.phone.toString(),
                            display: "modal"
                        },
                        this.loginCallback
                    );
                }
            },
            loginCallback(response) {
                if(response.status === 'PARTIALLY_AUTHENTICATED'){
                    this.alertText = 'Поменяйте пароль'
                    this.visible = true
                    this.ok = true
                    setTimeout(() => {
                        this.visible = false
                    }, 2000);
                }
            },
            change(){
                axios.post(this.url + 'api/user/edit/password', {
                    "phone": this.phone,
                    "password": this.password
                })
                .then(response => { 
                    if(response.status === 200){
                        this.alertText = 'Пароль успешно изменен!'
                        this.visible = true
                        setTimeout(() => {
                            this.$router.push({path: '/'})
                        }, 500);
                    }
                })
                .catch(error => {
                    this.alertText = error.response.data.message;
                    this.visible = true
                     setTimeout(() => {
                            this.visible = false
                        }, 1000);
                });
                
            },
        },
        validations: {
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
        components: {
            AppAlert,
            TheMask
        },
    }
</script>

<style scoped>
    .wrapper{
        width: 50%;
    }
    .wrapper h2{
        text-align: center;
    }
    form{
        text-align: center;
    }
    input{
        padding: 10px 20px;
        width: 150px;
        margin-bottom: 10px;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, .3)
    }
    button{
        padding: 10px 45px;
        background: #418DFF;
        border: #418DFF;
        border-radius: 5px;
        color: #fff;
    }
</style>