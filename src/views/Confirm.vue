<template>
    <section class="sect-confirm">
        <div class="wrapper">
            <small>Регистрация > <span class="now-page">Подтверждение</span></small>
            <h2>Подтверждение</h2>
            <div class="scon-content">
                <h5>Ваш номер: +7(707) 185-02-65</h5>
                <p>В целях безопастности и подтверждения того что вы настоящий человек, вам будет отправлен 4-х значный</p>
                <div ref="focuss" id="code" class="scon-content-code">
                    <input autofocus v-model="code[0]" size="1" min="0" max="9" maxlength="1" type="text">
                    <input v-model="code[1]" size="1" min="0" max="9" maxlength="1" type="text">
                    <input v-model="code[2]" size="1" min="0" max="9" maxlength="1" type="text">
                    <input v-model="code[3]" size="1" min="0" max="9" maxlength="1" type="text">
                </div>
                <p class="scan-content-time">Отправить код повторно через: 0:{{time}}</p>
                <router-link to="/">
                    <button @click="confirm()" class="allBtn">Зарегистрироваться</button>
                </router-link>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                code: [],
                phoneC: true,
                time: 49
            }
        },
        methods: {
            phoneCode() {
                if(this.code.length===4 && this.time<=0){
                    this.phoneC = true
                }
                else{
                    this.phoneC = false
                }
                return this.phoneC
                
            },
            confirm(){
                
            },
            goToNextInput(){
                let code = ''
                for(let i=0;i<this.code.length;i++){
                    if(this.code.length<4){
                        this.$refs.focuss.children[i+1].focus()
                    }        
                    else{
                        this.$refs.focuss.children[0].focus()
                    }            
                }
                for(let i=0;i<this.code.length;i++){
                    code += this.code[i]
                }
            },
            onKeyDown(e){
                var key = e.which;
                if (key === 9 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
                    return true;
                }

                e.preventDefault();
                return false;
            },
            timer(){
                if(this.time > 0)
                    this.time = this.time - 1
            },

        },
        mounted () {
            this.phoneCode();
            this.timer()
            var code = document.getElementById('code');
            setInterval(this.timer.bind(this) , 1000)            
            code.addEventListener("keyup", this.goToNextInput)
            code.addEventListener("keydown", this.onKeyDown)
        },
    }
</script>

<style>
    .scon-content{
        text-align: center;
        width: 35%;
        margin: 0 auto;
    }
    .scon-content .scon-content-code{
        display: flex;
    }
    .scon-content .scon-content-code{
        display: flex;
        justify-content: space-around;
    }
    .scon-content .scon-content-code input{
        width: 30px;
        height: 40px;
        border-radius: 9px;
        font-size: 40px;
        padding: 5px 5px 5px 15px;
    }
    .scon-content .scon-content-code input:focus{
        border: 2px solid #2A98FF;
        box-shadow: 0 0 10px #2A98FF inset;
    }
    .scon-content .scon-content-code input::selection{
        background: transparent;
        border: 2px solid #2A98FF;
        box-shadow: 0 0 10px #2A98FF inset;
    }
    .scan-content-time{
        font-size: 13px;
    }
    @media (max-width: 768px) {
          .scon-content{
            width: 40%;
        } 
    }
    @media (max-width: 650px) {
          .scon-content{
            width: 50%;
        } 
    }
    @media (max-width: 579px) {
          .scon-content{
            width: 55%;
        } 
    }
    @media (max-width: 450px) {
          .scon-content{
            width: 65%;
        } 
    }
    @media (max-width: 380px) {
          .scon-content{
            width: 80%;
        } 
    }
</style>