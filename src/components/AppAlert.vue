<template>
    <div class="alert-box">
        <span><i class="fas fa-check"></i></span> {{propName}}
    </div>
</template>

<script>
    export default {
        props: {
            propName: {
                type: String,
                default: 'Вы не удалили'
            },
        },
        
    }
</script>

<style scoped>
    /* p{
        color: rgba(255, 0, 0, .8);
        font-weight: bold;
        font-size: 36px;
    } */
    p{
        margin: 0;
    }
    .alert-box{
        position: fixed;
        background: #262F3D;
        top: 15%;
        left: 50%;
        transform: translate(-50%, -20%);
        z-index: 999;
        width: 300px;
        padding: 10px 20px;
        border-radius: 8px;
        color: #fff;
        transition: all 2s;
        animation: alertBoxDown 1s;
    }
    .alert-box span{
        background: #004D40;
        border-radius: 50% 50%;
        padding: 3px 7px;
        margin-right: 20px;
    }
    .alert-box span i{
        color: #fff;
    }
    @keyframes alertBoxDown{
        0%{
            top: 0%;
        }
        100%{
            top: 15%;
        }
    }
</style>