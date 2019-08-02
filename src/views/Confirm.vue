<template>
    <section class="sect-confirm">
        <div class="wrapper">
            <small>Регистрация > <span class="now-page">Подтверждение</span></small>
            <h2>Подтверждение</h2>
            <div class="scon-content">
                <h5>Ваш номер: +7(707) 185-02-65</h5>
                <p>В целях безопастности и подтверждения того что вы настоящий человек, вам будет отправлен 4-х значный</p>
                <div class="scon-content-code">
                    <input type="text" v-model.number="code">
                    <input type="text" v-model.number="code">
                    <input type="text" v-model.number="code">
                    <input type="text" v-model.number="code">
                </div>
                <p class="scan-content-time">Отправить код повторно через: 0:48</p>
                <router-link to="/">
                    <button class="allBtn">Зарегистрироваться</button>
                </router-link>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                code: ''
            }
        },
    }
</script>

<style>
    .scon-content{
        text-align: center;
        width: 35%;
        margin: 0 auto;
    }
    .scon-content .scon-content-code{
        display: flex;
    }
    .scon-content .scon-content-code{
        display: flex;
        justify-content: space-around;
    }
    .scon-content .scon-content-code input{
        width: 30px;
        height: 40px;
        border-radius: 9px;
        font-size: 40px;
        padding: 5px 5px 5px 15px;
    }
    .scan-content-time{
        font-size: 13px;
    }
</style>