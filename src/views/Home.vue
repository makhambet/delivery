<template>
    <div>
        <article>
            <div class="wrapper">
                <div class="article-content">
                    <div>
                        <h1><span>Праздник осени</span><br>20% скидки на все продукты</h1>
                        <button>К продуктам</button>
                    </div>
                </div>
                <div class="article-products">
                    <div class="a-products-first">
                        <div>
                            <h4>Продукты</h4>
                        </div>
                    </div>
                    <div class="a-products-second">
                        <div>
                            <h4>Бытовая химия</h4>
                        </div>
                    </div>
                    <router-link tag="div" :to="'/special'"  class="a-products-third">
                        <div>
                            <h4>Особый заказ</h4>
                        </div>
                    </router-link>
                </div>
            </div>
        </article>
        <section class="sect-authorization">
            <div class="sect-authorization-block">
                <img src="../assets/images/Group8951.png" alt="">
                <h3>Добро пожаловать в Delivery</h3>
                <p>Новый магазин легок и прост в использовании, присоединяйся к нам и узнай о новых предложениях</p>
                <form action="send.php">
                    <h4>Авторизация</h4>
                    <label>Телефон</label><br>
                    <input type="phone" placeholder="Введите номер телефона" required><br>
                    <label>Пароль</label><br>
                    <input type="password" placeholder="Введите пароль" required><br>
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
                        <input type="submit" value="Войти">
                    </div>
                </form>
            </div>
        </section>
        <section class="sect1"  id="app">
            <div class="wrapper">
                <small>
                    Главная > <span class="now-page">Самые продаваемые</span>
                </small>
                <div class="sect1-block">
                    <app-menu></app-menu>
                    <div class="sect1-block2">
                        <h2>Самые продаваемые</h2>
                        <div class="s1-block2-rel">
                            <div class="all"><router-link to="/all">Все</router-link></div>
                            <button  :disabled="page<=0"  @click.prevent="pred()" class="pred">&lt;</button>
                            <div class="s1-block2-grid">
                                <div v-for="(item, index) in bests" :key="index">
                                    <best-goods :bestGoods="item"></best-goods>
                                </div>
                            </div>
                            <button :disabled="nextEnd" @click="next()" class="next">&gt;</button>
                        </div>
                        <div class="s1-block2-rel">
                            <div class="all"><router-link to="/all">Все</router-link></div>
                            <button  :disabled="page<=0"  @click.prevent="pred()" class="pred">&lt;</button>
                            <div class="s1-block2-grid">
                                <div v-for="(item, index) in allGoods" :key="index">
                                    <best-goods :bestGoods="item"></best-goods>
                                </div>
                            </div>
                            <button :disabled="nextEnd" @click="next()" class="next">&gt;</button>
                        </div>
                        <h2>Бытовая химия</h2>
                        <div class="s1-block2-rel">
                            <div class="all"><router-link to="/all">Все</router-link></div>
                            <button  :disabled="page<=0"  @click.prevent="pred()" class="pred">&lt;</button>
                            <div class="s1-block2-grid">
                                <div v-for="(item, index) in allGoods" :key="index">
                                    <best-goods :bestGoods="item"></best-goods>
                                </div>
                            </div>
                            <button :disabled="nextEnd" @click="next()" class="next">&gt;</button>
                        </div>
                        <div class="special">
                            <div class="special-block1">
                                    <h2>Особый заказ</h2>
                                    <h4>Не нашли товар в каталоге?</h4>
                                    <p>Закажите услугу "Особый заказ" и с вами свяжется наш оператор, 
                                        с которым вы сможете договориться о заказе 
                                        товаров отсутствующих в каталоге.</p>
                                    <router-link tag="button" :to="'/special'">Заказать</router-link>
                            </div>
                            <div class="special-block2">
                                <img src="../assets/images/Group8757.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import BestGoods from '../components/BestItems'
    import AppMenu from '../components/AppMenu'
    export default {
        data() {
            return {
                page: 0,
                nextEnd: false,
                bests: []
            }
        },
        methods: {            
            next(){
                this.page++
            },
            pred(){
                this.page--
            }
        },
        computed: {
            goods() {
                return this.$store.getters.getGoods
            },
            allGoods(){
                let goods = this.goods;
                let lenght = goods.length;
                let a = this.page*5;
                let b = this.page*5 + 5;
                if(b>=lenght) {
                    this.nextEnd = true
                    console.log(this.nextEnd)
                }
                else{
                    this.nextEnd = false
                }
                this.bests = goods.filter(b=>b.type==='best')
                this.bests = this.bests.slice(a,b)
                return goods.slice(a,b);
            },
        },
        components: {
            BestGoods,
            AppMenu
        },
    }
</script>

<style scoped>
    select{
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
    }
</style>