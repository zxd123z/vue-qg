<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
   
    <Tabbar v-if="$route.meta.showFooter"></Tabbar>
  </div>
</template>

<script>
import List from './components/List/List.vue'
import Tabbar from './components/Tabbar/Tabbar.vue'
export default {
  name: 'App',
  
  components:{
    List,
    Tabbar
  },
  created() {

    
		
  },
  methods: {
 
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
