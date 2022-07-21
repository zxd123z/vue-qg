<template>
   <div class="mask" v-if="showEasy">
        <div class="content">
            报名成功！
        </div>
    </div>
</template>

<script>
export default {
    name:'EasyDialog',
    model: {
        prop:'showEasy'
    },
    props:{
        showEasy:{
            type:Boolean,
            default:false
        }
    },
    mounted() {
        this.toBuy()
    },
    methods: {
        toBuy(){
            this.$emit('input',false)
            // if (this.showEasy = true) {
            //     this.$router.push({
            //     name:"Buy",
            //     })
            // }
            
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
    // background-color: rgba(0,0,0,.5);
    .content{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 100px;
        height: 30px;
        font-size: 12px;
        line-height: 30px;
        border-radius: 5px;
        color: #fff;
        background-color: rgba(0,0,0,.5);
        
    }
   } 
</style>