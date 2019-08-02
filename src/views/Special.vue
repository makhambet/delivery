<template>
    <section class="sect-special">
        <div class="wrapper">
            <small>Главная > <span class="vip">Особый заказ</span></small>
            <h2>Оформление заказа</h2>
            <div class="ss-content">
                <img src="../assets/images/Group.png" alt="">
                <div v-if="!specialOK" class="ss-content-follow">
                    <h4>Не нашли товар в каталоге?</h4>
                    <p>Закажите услугу “Особый заказ” и с вами свяжется наш оператор, с которым вы сможете договориться о заказе товаров отсутствующих в каталоге.</p>
                    <form>
                        <input v-model="specialName" type="text" placeholder="Введите ваше имя"><br>
                        <input v-model="specialPhone" type="text" placeholder="Введите ваш номер"><br>
                        {{check()}}
                        <button :disabled="!inputCheck" @click="specialOK=!specialOK" class="allBtn">Отправить</button>
                    </form>
                </div>
                <div v-if="specialOK" class="ss-content-ok">
                    <h5>Благодарим за заявку!</h5>
                    <p>Наш оператор свяжется с вами в ближайшее время для уточнения деталей заказа</p>
                    <router-link to="/">
                        <button class="allBtn">Готово</button>
                    </router-link>
                </div>
            </div>
            
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                specialOK: false,
                inputCheck: false,
                specialName:  null,
                specialPhone: null
            }
        },
        methods: {
            check() {
                if(this.specialName !== null && this.specialPhone !==null ){
                    this.inputCheck = true
                    console.log(this.specialName)
                }
                console.log(this.specialName)
            }
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
</style>