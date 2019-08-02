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
                    <p>Баратов Азиз</p>
                </div>
                <div class="sp-content-block1">
                    <p>Номер:</p>
                </div>
                <div class="sp-content-block2">
                    <p>+7 (777) 777-77-77</p>
                </div>
                <div class="sp-content-block1">
                    <p>Адреса доставки:</p>
                </div>
                <div class="sp-content-block2">
                    <nav>
                        <ul>
                            <li><p>Алматы, пр-т Абая 2, кв 39 <a class="changeA">Изменить</a> <a class="deleteA">Удалить</a></p> </li>
                            <li><p>Алматы, пр-т Абая 2, кв 39 <a class="changeA">Изменить</a> <a class="deleteA">Удалить</a></p> </li>
                        </ul>
                    </nav>
                    <button class="sp-content-btn">
                        Добавить новый адрес
                    </button>
                </div> 
                <div class="sp-content-block1">
                    <p>Привязанные карты:</p>
                </div>
                <div class="sp-content-block2">
                    <p>2228</p>
                    <button class="sp-content-btn">
                        Добавить новый адрес
                    </button>
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
    export default {
        
    }
</script>

<style>
    .sp-content > div:nth-child(1){
        grid-area: a;
        z-index: 999;
        /* width: 40%; */
        font-size: 16px;
    }
    .sp-content .sp-content-block1 > p{
        color: #444444;
        margin: 0;
    }
    .sp-content .sp-content-block2 > p{
        margin: 0;
    }
    .sp-content > div:nth-child(2){
        grid-area: b;
        /* width: 60%; */
    }
    .sp-content{
        width: 60%;
        display: grid;
        grid-template-areas: 'a b';
        grid-column-gap: 10%;
        grid-row-gap: 5%;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: 1fr;
        margin-bottom: 10%;
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
    .sp-content-block2 nav .deleteA{
        color: #FF4A4A;
    }
    .sp-content-block2 nav .changeA{
        color: #2A98FF;
        margin: 0 10px;
    }
    .sp-content-btn{
        width: 60%;
        height: 45px;
        background: #2A98FF;
        color: #fff;
        border:none;
        border-radius: 10px;
    }
</style>