<template>
    <div class="sect1-block1">
        <h3>Продукты</h3>
        <nav class="s1-block1-menu">
            <ul>
                <li v-for="(grand, index) in menuItems" :key="index">
                    <span @click="grand.open=!grand.open"><i class="fas" :class="{'fa-caret-up' : grand.open, 'fa-caret-down' : !grand.open}"></i><span>{{grand.name}}</span></span>
                    <ul v-show="grand.open">
                        <li v-for="(parent, ind) in grand.children" :key="ind">
                            <label><input name="parent" type="radio"><span @click="parent.open=!parent.open">{{parent.name}}<i class="fas fa-angle-down"></i></span></label>
                            <ul v-show="parent.open">
                                <li v-for="(child, index) in parent.children" :key="index">
                                    <label><input name="child" type="radio">{{child.name}}</label>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
        <h3>Бытовая химия</h3>
        <nav class="s1-block1-menu">
            <ul>
                <li v-for="(grand, index) in CATS" :key="index">
                    <span @click="grand.open=!grand.open"><i class="fas" :class="{'fa-caret-up' : grand.open, 'fa-caret-down' : !grand.open}"></i><span>{{grand.name}}</span></span>
                    <ul v-show="grand.open">
                        <!-- <li v-for="(parent, ind) in grand.children" :key="ind">
                            <label><input name="parent" type="radio"><span @click="parent.open=!parent.open">{{parent.name}}<i class="fas fa-angle-down"></i></span></label>
                            <ul v-show="parent.open">
                                <li v-for="(child, index) in parent.children" :key="index">
                                    <label><input name="child" type="radio">{{child.name}}</label>
                                </li>
                            </ul>
                        </li> -->
                    </ul>
                </li>
            </ul>
        </nav>
        <div class="s1-block1-price">
            <h3>Цена</h3>
            <div>
                <div class="s1-price-from">
                    <label><input v-model.number="minPrice" type="number"  min="0" max="90000"/>тенге</label>
                </div>
                <span>&mdash;</span>
                <div class="s1-price-to">
                    <input  v-model.number="maxPrice" type="number"  min="0" max="90000"/>тенге
                </div>
            </div>
            <div class="range-slider">
                <input @change="slider" v-model.number="minPrice" min="0" max="90000" step="500" type="range" />
                <input @change="slider" v-model.number="maxPrice" min="0" max="90000" step="500" type="range" />
                <svg width="100%" height="24"></svg>
            </div>
            <button @click="filter()" class="allBtn">Найти</button>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
                menuItems: [
                    {
                        name: 'Хлебобулочные Изделия',
                        open: false,
                        children:[
                            {
                                name: 'Булочки',
                                open: false,
                                children: [
                                    {
                                        name: 'Сердечки'
                                    },
                                    {
                                        name: 'Куличи'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Колбасы, Сосиска и Деликатесы',
                        open: false,
                        children:[
                            {
                                name: 'Флора',
                                open: false,
                                children: [
                                    {
                                        name: 'Фауна'
                                    },
                                    {
                                        name: 'Роза'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Молочные Продукты',
                        open: false,
                        children:[
                            {
                                name: 'Флора',
                                open: false,
                                children: [
                                    {
                                        name: 'Фауна'
                                    },
                                    {
                                        name: 'Роза'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Продукты быстрого приготовления',
                        open: false,
                        children:[
                            {
                                name: 'Флора',
                                open: false,
                                children: [
                                    {
                                        name: 'Фауна'
                                    },
                                    {
                                        name: 'Роза'
                                    }
                                ]
                            }
                        ]
                    },
                ],
                isGrandActive: false,
                minPrice: "0",
                maxPrice: "90000"
            }
        },
        computed: {
            ...mapGetters(['CATS'])
        },
        methods: {
            slider: function() {
                if (this.minPrice > this.maxPrice) {
                    var tmp = this.maxPrice;
                    this.maxPrice = this.minPrice;
                    this.minPrice = tmp;
                }
            },
            filter(){
                this.$router.push({path: 'all'})
            }
        }
    }
</script>

<style scoped>
    .range-slider {
        height: 30px;
        width: 90%;
        text-align: center;
        position: relative;
    }

    .range-slider svg,
    .range-slider input[type=range] {
        position: absolute;
        left: 0;
        bottom: 0;
    }

    input[type=number] {
        border: none;
        text-align: center;
    }

    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    input[type=number]:invalid,
    input[type=number]:out-of-range {
        color: #ff6347;
    }

    input[type=range] {
        -webkit-appearance: none;
        width: 100%;
        text-align: left;
    }

    input[type=range]:focus {
        outline: none;
    }

    input[type=range]:focus::-webkit-slider-runnable-track {
        background: #2497e3;
    }

    input[type=range]:focus::-ms-fill-lower {
        background: #2497e3;
    }

    input[type=range]:focus::-ms-fill-upper {
        background: #fff;
    }

    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        animation-delay: 0.2s;
        background: #2497e3;
        border-radius: 1px;
        box-shadow: none;
        border: 0;
    }

    input[type=range]::-webkit-slider-thumb {
        z-index: 2;
        position: relative;
        box-shadow: 0px 0px 0px #000;
        border: 2px solid #2497e3;
        height: 18px;
        width: 18px;
        border-radius: 25px;
        background: #fff;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -7px;
    }
</style>