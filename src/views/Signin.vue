<template>
    <section class="sect-auth">
        <div class="wrapper">
            <small><span class="now-page">Регистрация</span></small>
            <h2>Регистрация</h2>
            <div class="sa-content">
                <form action="confirm.html">
                    <div class="sa-form-block1">
                        <label>Тип клиента:</label>
                        <select>
                            <option>Физическое лицо</option>
                            <option>Юридическое лицо</option>
                        </select>
                        <label class="form-icon">Имя:<span class="star-red">*</span><i class="fas fa-user-alt"></i></label>
                        <input v-model="name" type="text" name="name" placeholder="Введите ваше имя" required>
                        <label class="form-icon">Телефон:<span class="star-red">*</span><i class="fas fa-mobile-alt"></i></label>
                        <input v-model="phone" type="text" name="phone" placeholder="Введите ваш телефон" required>
                        <label class="form-icon">Придумайте пароль:<span class="star-red">*</span><i class="fas fa-lock"></i></label>
                        <input v-model="password" type="password" name="password" placeholder="Введите пароль" required>
                        <label class="form-icon">Повторите пароль:<span class="star-red">*</span><i class="fas fa-lock"></i></label>
                        <input type="password" name="password" placeholder="Повторите пароль" required>
                    </div>
                    <div class="sa-form-block2">
                        <label>Введите ваш Email:<span class="star-red">*</span></label>
                        <input v-model="email" type="email" name="email" placeholder="Ваш Email" required>
                        <p><strong>Политика конфиденциальности:</strong></p>
                        <div class="security">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus, iure eos. Corporis, quaerat doloribus, non sint, magnam nobis quisquam saepe a explicabo repellat eos asperiores exercitationem veniam dolores voluptatem velit. Numquam, labore ipsum odit corrupti, doloribus, deserunt cum asperiores eos placeat quaerat enim possimus! Nisi necessitatibus ratione saepe eos mollitia?
                        </div>
                        <div class="sa-block2-auth">
                            <input type="checkbox" id="checkbox" />
                            <label for="checkbox">
                                Я ознакомился и соглашаюсь с политикой Конфиденциальности
                            </label>
                            <button class="allBtn" @click.prevent="register()">Зарегистрироваться</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                name: '',
                password: '',
                phone: '',
                email: ''
            }
        },
        methods: {
            register() {
                axios.post('http://localhost:8080/api/user/register', {
                    "name": this.name,
                    "password": this.password,
                    "city_id": "1",
                    "phone": this.phone,
                    "email": this.email,
                    "type_user": "1",
                    "props": null,
                    // "token": "qwerty1234",
                    "updated_at": "2019-08-16 04:16:14",
                    "created_at": Date.now(),
                    "id": 4
                })
                .then(response => { 
                    console.log(response)
                    if(response.status === 200){
                        this.$router.push({path: 'confirm'})
                    }
                })
                .catch(error => {
                    console.log(error.response)
                });
            }
        },
        created () {
            this.$store.dispatch('GET_USER_BY_ID')
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
</style>