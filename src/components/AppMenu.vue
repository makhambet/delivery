<template>
    <div class="sect1-block1">
        <h3>Продукты</h3>
        <nav class="s1-block1-menu">
            <ul>
                <!-- <li v-for="(grand, index) in menuItems" :key="index">
                    <span @click="grand.clc=!grand.clc"><i class="fas fa-caret-down"></i>{{grand.name}}</span>
                    <ul>
                        <li class="submenu" v-for="(parent, a) in grand.children" :key="a" :class="{subActMenu:grand.clc}">
                            <input type="radio"> <span @click="parent.cls=!parent.cls,ok()">{{parent.name}}<i class="fas fa-angle-down"></i></span>
                            <ul>
                                <li class="grandSubMenu" v-for="(child, b) in parent.grand" :key="b" :class="{grandActSubMenu:parent.cls}">
                                    {{child.name}}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li> -->
            </ul>
        </nav>
        <h3>Бытовая химия</h3>
        <nav class="s1-block1-menu">
            <ul>
                <li>
                    <i class="fas fa-caret-up"></i>Хлебобулочные Изделия
                </li>
                <li>
                    <i class="fas fa-caret-down"></i>Колбасы, Сосиски и Деликатесы
                </li>
                <li>
                    <i class="fas fa-caret-down"></i>Молочные Продукты
                </li>
                <li>
                    <i class="fas fa-caret-down"></i>Продукты быстрого приготовления
                </li>
            </ul>
        </nav>
        <div class="s1-block1-price">
            <h3>Цена</h3>
            <div class="s1-price-from">
                0 теңге
            </div>
            -
            <div class="s1-price-to">
                90 000 теңге
            </div>
            <input type="range" min="0" max="100" step="1" value="50"> 
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>