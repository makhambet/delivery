<template>
    <div class="sect-special">
        <div class="wrapper">
            <div class="page">
                <small>{{$ml.get('msg')}} > <span class="now-page">Особый заказ</span></small>
            </div>
            <h2>{{$ml.get('regisrt')}}</h2>
            <div class="ss-content">
                <img src="@/assets/images/Group.png" alt="">
                <div class="ss-content-ok">
                    <h5>Благодарим за заявку!</h5>
                    <p>Наш оператор свяжется с вами в ближайшее время для уточнения деталей заказа</p>
                    <router-link to="/">
                        <button class="allBtn">Готово</button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { MLBuilder } from 'vue-multilanguage'
    export default {
        computed: {
            mlmyMessage () {
                return new MLBuilder('header')
            }  
        },
    }
</script>

<style scoped>

</style>