<template>
    <div v-if="!download" class="download">
        <div>&nbsp;</div>
        <p>Скачай наше приложение!</p>
        <div class="download-follow-img">
            <img src="@/assets/images/qas.png" alt="">
            <img src="@/assets/images/qpm.png" alt="">
        </div>
        <div @click="download = true" class="download-exit">
            ×
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                download: localStorage.delivery_download || true,
            }
        },
        created () {
            if (localStorage.delivery_download) {
                this.download = localStorage.delivery_download;
            }
            else{
                this.download = false
            }
        },
        watch: {
            download(newName) {
                localStorage.delivery_download = newName;
            }
        },
    }
</script>

<style scoped>

</style>