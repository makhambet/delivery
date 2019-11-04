<template>
    <section class="sect-choosen">
        <div class="wrapper">
            <div class="page">
                <small>{{$ml.get('msg')}} > <span class="now-page">{{$ml.get('chosen')}}</span></small>
            </div>
            <h2>{{$ml.get('chosen')}}</h2>
            <div v-if="FAVORITE_COUNT>0" class="sc-grid">
                <div v-for="(item, i) in FAVORITE_LIST" :key="i">
                    <chosen-good :chosenGoods="item"></chosen-good>
                </div>
            </div>
            <div v-if="FAVORITE_COUNT===0">
                <h2>У вас еще нет избранных товаров</h2>
            </div>
        </div>
    </section>
</template>

<script>
    import ChosenGood from '../components/ChosenItems'
    import { MLBuilder } from 'vue-multilanguage'
    import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
                isChosen: false
            }
        },
        mounted () {
            this.$store.dispatch('GET_FAVORITE_LIST')
        },
        computed: {
            ...mapGetters([
                'FAVORITE_LIST',
                'FAVORITE_COUNT'
            ]),
            mlmyMessage () {
                return new MLBuilder('header')
            }  
        },
        created () {
            this.$store.dispatch('GET_FAVORITE_LIST')
            
        },
        components: {
            ChosenGood,
        },
    }
</script>

<style>
    .sect-choosen .sc-grid > div:nth-child(1){
        grid-area: one;
    }
    .sect-choosen .sc-grid > div:nth-child(2){
        grid-area: two;
    }
    .sect-choosen .sc-grid{
        display: grid;
        grid-template-areas: 'one two';
        grid-template-columns: 1fr 1fr;
        width: 80%;
        grid-gap: 40px;
    }
    .sc-grid .sc-grid-block{
        display: flex;
        box-shadow: 0 8px 15px #E7EAF0;
        padding: 2px 20px 10px 10px;
        height: calc(100% - 12px);
    }
    .s-grid-block-img{
        width: 30%;
        text-align: center;
        margin-top: 3%;
        position: relative;
    }
    .s-grid-block-img img{
        width: 80%;
        max-height: 110px;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
    }
    .sc-grid .sc-grid-content > p{
        width: 90%;
        margin: 5px 0;
        font-weight: bold;
        font-size: 18px;
    }
    .sc-grid-content {
        width: 60%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .sc-grid-flex{
        display: flex;
        justify-content: space-between;
    }
    #app .chosen{
        color: #FF7474;
    }
    .chosen{
        top: 5px;
        right: 0;
        font-size: 20px;
        color: #FF7474;
    }
    .sc-grid-block{
        max-width: 430px;
    }
    .s-grid-block-img img{
        min-width: 60px;
    }
    .s-grid-block-img{
        min-width: 90px;
        width: 40%;
    }

    @media (max-width: 1400px){
        .sect-choosen .sc-grid{
            width: 90%;
        }
    }
    @media (max-width: 1200px){
        .sect-choosen .sc-grid{
            width: 100%;
        }
        
    }
    @media (max-width: 1052px){
        .s-grid-block-img img{
            width: 95%;
        }
        .sect-choosen .sc-grid {
            grid-gap: 20px;
        }
        .sect-choosen .allBtn{
            width: 150px;
        }
        .sect-choosen .grid-counter{
            width: 70px;
        }
    }
    @media (max-width: 947px){
        .sect-choosen .allBtn{
            width: 135px;
        }
    }
    @media (max-width: 579px) {
        .sect-choosen .sc-grid{
            grid-template-areas: 'one' 'two';
            grid-template-columns: 1fr;
        }
        .sc-grid .sc-grid-block{
            margin: 0 auto;
        }
    }
</style>