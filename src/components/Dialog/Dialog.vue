<template>
    <div class="mask" v-if="showDialog">
        <div class="content">
            <img class="imgs" src="/static/images/empty/key.png" alt="">
            <div class="whitebg">
                <p class="msg">您还没登录</p>
                <p class="msgs">请先绑定手机号!</p>
                <p class="msgs">登录即可获得免费试课的机会。</p>
                <div class="btns">
                    <div class="closebtn" @click="close">取消</div>
                    <div class="okbtn" @click="toLogin">确定</div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name:'Dialog',
    model: {
        prop:'showDialog'
    },
    props:{
        showDialog: {
            type:Boolean,
            default:false
        }
    },
    methods: {
        close(){
           this.$emit('input',false)
        },
        toLogin(){
            this.$router.push({
                name:"Login",
            })
        }
    },
}
</script>

<style lang="scss" scoped>
   .mask{
    z-index: 3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    .content{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 293px;
        height: 307px;
        border-radius: 5px;
        .imgs{
            width: 186px;
            height: auto;
        }
    .whitebg{
        box-sizing: border-box;
        width: 293px;
        height: 249px;
        margin-top: -89px;
        border-radius: 5px;
        background-color: #fff;
        .msg{
            font-size: 18px;
            line-height: 30px;
            padding-top: 80px;
            color: #333;
        }
        .msgs{
            box-sizing: border-box;
            font-size: 14px;
            line-height: 34px;
            padding-bottom: 10px;
            color: #999;
        }
    }
    .btns{
        display: flex;
        flex-direction: row;
        border-top: 1px solid #ccc;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        
        .closebtn{
            width: 50%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: #5A5A5A;
            box-sizing: border-box;
            border-right: 1px solid #ccc;
        }
        .okbtn{
            width: 50%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: #2795FE;
            box-sizing: border-box;
        }
    }
    }
   } 
</style>