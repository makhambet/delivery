<template>
    <div class="sect1-block1">
        <div class="block1-content">
            <div v-for="(grand, index) in CATS" :key="index">
                <h3 v-if="grand.parent_id !== -1" @click="openNav(grand.id, index)">{{grand.name}}</h3>
                <nav class="s1-block1-menu">
                    <ul v-if="id === index">
                        <li v-for="(parent, ind) in FILTER_CATS" :key="ind">
                            <span @click.prevent="openMenu(parent.id, ind)"><i class="fas" :class="{'fa-caret-up' : subid===ind, 'fa-caret-down' : subid!==ind}"></i><span>{{parent.name}}</span></span>
                            <ul v-show="subid === ind">
                                <li v-for="(child, i) in FILTER_SUBCATS" :key="i">
                                    <label style="position: relative;">
                                        <input style="opacity: 0; position:absolute; visibility: hidden;" v-model="cat_id" :value="child.id" name="parent" type="checkbox">
                                        <span style="margin-left: 10px;" @click="openSubMenu(child.id, i)">{{child.name}}
                                            <i class="fas" :class="{'fa-angle-up' : name_id === i, 'fa-angle-down' : name_id !== i}"></i>
                                        </span>
                                        <span class="radiobtn"></span>
                                    </label>
                                    <ul v-if="name_id === i">
                                        <li v-for="(item, a) in FILTER_SUB_SUBCATS" :key="a">
                                            <label style="position: relative;">
                                                <input style="opacity: 0" v-model="cat_id" type="checkbox" :value="item.id">
                                                {{item.name}}
                                                <span class="radiobtn"></span>
                                            </label>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="s1-block1-price">
                <h3 v-text="$ml.get('menu_price')"></h3>
                <div>
                    <div class="s1-price-from">
                        <label><input v-model.number="minPrice" type="number"  :min="min" :max="max"/>{{$ml.get('tenge')}}</label>
                    </div>
                    <span>&mdash;</span>
                    <div class="s1-price-to">
                        <input  v-model.number="maxPrice" type="number"  :min="min" :max="max"/>{{$ml.get('tenge')}}
                    </div>
                </div>
                <div class="range-slider">
                    <input @change="slider" v-model.number="minPrice" :min="min" :max="max" step="500" type="range" />
                    <input @change="slider" v-model.number="maxPrice" :min="min" :max="max" step="500" type="range" />
                    <svg width="100%" height="24"></svg>
                </div>
                <button @click="filter()" class="allBtn">{{$ml.get('menu_btn')}}</button><br>
                <button v-if="reserted" @click="reset()" class="allBtn">Сбросить</button>
            </div>
        </div>
        <div class="closed" @click="$emit('closed')"></div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import { MLBuilder } from 'vue-multilanguage'
    export default {
        data() {
            return {
                isGrandActive: false,
                minPrice: this.$store.getters.PRICEMIN,
                maxPrice: this.$store.getters.PRICEMAX,
                id: null,
                reserted: this.$store.getters.RESERTED,
                cat_id: [],
                sub_cat_id: [],
                menuCount: 0,
                subid: null,
                name_id: null
            }
        },
        computed: {
            ...mapGetters([
                'CATS',
                'FILTER_CATS',
                'FILTER_SUBCATS',
                'PRICEMIN', 
                'PRICEMAX',
                'FILTER_SUB_SUBCATS'
            ]),
            min(){
                return this.$store.getters.PRICEMIN;
            },
            max(){
                return this.$store.getters.PRICEMAX + 635;
            },
            mlmyMessage () {
                return new MLBuilder('header')
            }   
        },
        methods: {
            slider: function() {
                // if (this.minPrice > this.maxPrice) {
                //     var tmp = this.maxPrice;
                //     this.maxPrice = this.minPrice;
                //     this.minPrice = tmp;
                // }
            },
            filter(){
                console.log('sdkfnbsdkf')
                let arr = {
                    'price_min': this.minPrice,
                    'price_max': this.maxPrice,
                    'page': 1
                };
                for (let i = 0; i < this.cat_id.length; i++) {
                    arr['cats[' + i + ']'] = this.cat_id[i];
                }
                console.log(arr)
                this.$store.dispatch('GET_GOODS', {
                    params: arr,
                    headers: {
                        "token": localStorage.delivery_token || 'my_token'
                    }
                })
                this.reserted = true;
                localStorage.delivery_product_title = this.$ml.get('products');
                localStorage.delivery_product_catid = null;
                localStorage.delivery_request = 'GOODS'
                this.$emit('closed')
                this.$router.push({path: 'products'})
            },
            reset(){
                this.minPrice = this.min;
                this.maxPrice = this.max;
                this.reserted = false
                this.cat_id = [];
                this.name_id = null;
                this.subid = null;
                this.$store.dispatch('GET_GOODS', {
                    params: {
                        'page': '1',
                    },
                    headers: {
                        "token": localStorage.delivery_token || 'my_token'
                    }
                })
            },
            openMenu(id, index){
                if(this.subid !== index)
                {
                    this.$store.dispatch('GET_FILTER_SUBCATS', [
                        {id: id}
                    ])
                    setTimeout(() => {
                        this.subid = index;
                    }, 300);
                    this.name_id = null;
                }
                else{
                    this.subid = null
                }
            },
            openSubMenu(id, index){
                if(this.name_id !== index)
                {
                    this.$store.dispatch('GET_FILTER_SUB_SUBCATS', [
                        { id: id}
                    ])
                    setTimeout(() => {
                        this.name_id = index;
                    }, 500);
                }
                else{
                    this.name_id = null
                }
            },
            openNav(id, index){
                if(this.id !== index)
                {
                    this.id = index;
                    this.$store.dispatch('GET_FILTER_CATS', [
                        {id: id}
                    ])
                    this.subid = null;
                    this.name_id = null;
                }
                else{
                    this.id = null
                }
            }
        },
        created () {
            this.$store.dispatch('GET_PRICE');
            // this.openNav(2, 0)
            setTimeout(() => {
                this.minPrice = this.$store.getters.PRICEMIN;
                this.maxPrice = this.$store.getters.PRICEMAX;
            }, 200);
        },
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
    .closed{
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 3;
        width: 100%;
        height: 100%; 
        /* display: none; */
    }
    .sect1-block1 label input:checked ~ .radiobtn {
        background-color: #fff;
    }
    .sect1-block1 label input:checked ~ .radiobtn:after{
        background-color: #2196F3;
    }
    .sect1-block1 .radiobtn {
        left: -10px;
        top: 3px;
        width: 15px;
        height: 15px;
    }
    .sect1-block1 label .radiobtn:after {
        top: 3px;
        left: 3px;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: white;
    }
</style>