<template>
    <section class="sect-choosen">
        <div class="wrapper">
            <small>Главная > <span class="now-page">Избранные</span></small>
            <h2>Избранные</h2>
            <div class="sc-grid">
                <div v-for="(item, i) in filterChosen" :key="i">
                    <chosen-good :chosenGoods="item"></chosen-good>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import ChosenGood from '../components/ChosenItems'
    export default {
        computed: {
            goods(){
                return this.$store.getters.getGoods
            },
            filterChosen(){
                let goods = this.goods;
                goods = goods.filter(b=> b.heart === true)
                return goods
            }
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
        width: 80%;
        grid-gap: 40px;
    }
    .sc-grid .sc-grid-block{
        display: flex;
        box-shadow: 0 8px 15px #E7EAF0;
        padding: 2px 20px 10px 10px;
    }
    .sc-block-img{
        width: 30%;
        text-align: center;
        margin-top: 3%;
    }
    .sc-block-img img{
        width: 50%;
    }
    .sc-grid .sc-grid-content > p{
        width: 90%;
        margin: 5px 0;
        font-weight: bold;
        font-size: 18px;
    }
    .sc-grid-content{
        position: relative;
    }
    .sc-grid-flex{
        display: flex;
        justify-content: space-between;
    }
    .chosen{
        top: 5px;
        right: 0;
        font-size: 20px;
        color: #FF7474;
    }
</style>