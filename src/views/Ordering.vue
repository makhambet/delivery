<template>
    <div class="sect-order">
        <div class="wrapper">
            <small>Главная > <span class="now-page">Заказы</span></small>
            <h2>История заказов</h2>
            <div class="so-grid">
                <div v-for="(item, i) in order" :key="i" class="so-grid-block">
                    <p>{{item.title}} {{item.number}} от {{item.date}}</p>
                    <span :style="{color: item.statusClass}">{{item.status}}</span>
                </div>
                {{coloring()}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                colorStatus: false
                
            }
        },
        methods: {
            coloring() {
                if(this.colorStatus === 'Отменен')
                {
                    this.colorStatus = 'cansel';
                    //  this.colorStatus = '#FF3D3D'
                    //  console.log(this.colorStatus)
                }
                if(this.colorStatus === 'Доставлен')
                {
                    this.colorStatus = 'ok'
                    // this.colorStatus === '#23DA98'
                    // console.log(this.colorStatus)
                }
                else this.colorStatus = 'wait'
            }
        },
        computed: {
            order() {
                return this.$store.getters.getOrder 
            }
        },
        mounted () {
            this.coloring();
        },
        created () {
            this.coloring();
        },
    }
</script>

<style>
    .so-grid > div:nth-child(1){
        grid-area: a;
    }
    .so-grid > div:nth-child(2){
        grid-area: b;
    }
    .so-grid > div:nth-child(3){
        grid-area: c;
    }
    .so-grid{
        display: grid;
        grid-template-areas: "a b c";
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 20px 40px;
    }
    .so-grid > div{
        border: 1px solid #F4F5FA;
        border-radius: 10px;
        padding: 2px 10px 10px;
    }
    .so-grid > div p{
        margin: 5px 0;
    }
</style>