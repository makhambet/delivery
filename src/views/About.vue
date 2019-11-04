<template>
    <section class="sect-about">
        <div class="wrapper">
            <div class="page">
                <small>{{$ml.get('msg')}} > <span class="now-page">{{$ml.get('payment')}}</span></small>
            </div>
            <div v-html="OFFICES"></div>
        </div>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex'
    import { MLBuilder } from 'vue-multilanguage'
    export default {
        computed: {
            ...mapGetters(['OFFICES']),
            mlmyMessage () {
                return new MLBuilder('header')
            }  
        },
        created () {
            this.$store.dispatch('GET_OFFICES');
        },
    }
</script>

<style scoped>
    .sect-about strong{
        color: #515C6F;
    }
</style>