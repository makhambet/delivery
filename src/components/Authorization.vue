<template>
    <section v-if="auth" class="sect-authorization">
        <div class="sect-authorization-block">
            <img src="../assets/images/Group8951.png" alt="">
            <h3>Добро пожаловать в Delivery</h3>
            <p>Новый магазин легок и прост в использовании, присоединяйся к нам и узнай о новых предложениях</p>
            <form>
                <h4>Авторизация</h4>
                <label>Телефон</label><br>
                <input v-model="phone" type="phone" placeholder="Введите номер телефона" required><br>
                <label>Пароль</label><br>
                <input v-model="password" type="password" placeholder="Введите пароль" required><br>
                <label style="color: red;" v-if="message !== ''">{{message}}</label>
                <div class="sect-auth-form-content">
                    <a href="#" class="forget">Забыли пароль?</a>
                    <label> 
                        <a href="#" class="forget">
                            Запомнить&nbsp;меня
                        </a>
                        <input type="checkbox">
                    </label>
                </div>
                <div class="sect-auth-form-content">
                    <button>
                        <router-link :to="'/signin'">Регистрация</router-link>
                    </button>
                    <input @click.prevent="authorization()" type="submit" value="Войти">
                </div>
            </form>
        </div>
    </section>
</template>

<script>
    import axios from 'axios'
    import user_id from '../help/user_id'
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
            }
        },
        methods: {
            authorization() {
                axios.post('http://localhost:8080/api/user/login', {
                    "password": this.password,
                    "phone": this.phone,
                })
                .then(response => { 
                    console.log(response)
                    if(response.status === 200){
                        // this.auth = false
                        user_id.id = response.data.result.id
                        user_id.token = response.data.result.token
                        localStorage.user_id = user_id.id
                        localStorage.token = user_id.token
                        // localStorage.auth = false
                        // user_id.auth = false
                        // this.auth = false
                        // localStorage.login = true
                        // this.login = true
                        // this.auth = false
                        // this.$store.dispatch('GET_USER_BY_ID')               //не удалять
                        this.login = true
                        this.$emit('authorization', true)
                    }
                })
                .catch(error => {
                    console.log(error.response)
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
    }
</script>

<style lang="scss" scoped>

</style>