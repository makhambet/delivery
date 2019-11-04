<template>
    <div>
        <div id="paymentFormSample">
            <input v-model="cardNumber" type="text" data-cp="cardNumber" placeholder="cardNumber">
            <input v-model="expDateMonth" type="text" data-cp="expDateMonth" placeholder="expDateMonth">
            <input v-model="expDateYear" type="text" data-cp="expDateYear" placeholder="expDateYear">
            <input v-model="cvv" type="text" data-cp="cvv" placeholder="cvv">
            <button @click="asd()">Оплатить 100 р.</button>
        </div>
        <!-- <form name="createCard" id="createCard" method="POST" action="http://194.4.58.28:9999/api/card/create/web" autocomplete="off" target="_blank">
            <input type="hidden" name="token" value="CfiBmkoIbaaMHsXwvtD4P27q1rxE5i">
            <input id="cryptoInput" type="hidden" name="cardCrypto" placeholder="CardCrypto">
        </form> -->
    </div>
</template>

<script>

    import axios from 'axios'
    
    export default {
        data() {
            return {
                cardNumber: '4242424242424242',
                expDateMonth: '12',
                expDateYear: '23',
                cvv: '145'
            }
        },
        methods: {
            asd() {
                let checkout = new cp.Checkout()
                console.log(checkout)
                var result = checkout.createCryptogramPacket();
                console.log(result.packet);
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>