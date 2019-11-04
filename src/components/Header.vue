<template>
    <div class="header">
        <header-download></header-download>
        <header-block1></header-block1>
        <header-block2></header-block2>
        <header-block3 :class="{'h-block3': isActive}" class="header-block3"></header-block3>

        
        <div v-if="isActive" @click="isActive=!isActive" class="resize"></div>
        <header-block5 @active="actived()"></header-block5>
    </div>
</template>

<script>
    import HeaderDownload from './Header/Download'
    import HeaderBlock1 from './Header/HeaderBlock1'
    import HeaderBlock2 from './Header/HeaderBlock2'
    import HeaderBlock3 from './Header/HeaderBlock3'
    import HeaderBlock5 from './Header/HeaderBlock5'
    export default {
        data() {
            return {
                // counter: this.$store.getters.BASKET_COUNT,
                searchModel: '',
                isActive: false,
            }
        },
        
        methods: {  
            actived(){
                this.isActive = !this.isActive
            }
        },
        components: {
            HeaderDownload,
            HeaderBlock1,
            HeaderBlock2,
            HeaderBlock3,
            HeaderBlock5
        },
    }
</script>

<style scoped>
    .h-block1-profile, .h-block1-logo{
        cursor: pointer;
    }
</style>