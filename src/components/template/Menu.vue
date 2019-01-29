<template>
         <!--sidebar-menu :menu="menu" /-->
      <aside class="menu-area" v-show="isMenuVisible" >
        <nav class="menu">
           <router-link to='/' > <i class="fa fa-home"></i> Home </router-link>
           <router-link to='/admin' > <i class="fa fa-cogs"></i> Administração </router-link>
        </nav>
     </aside>
</template>

<script>
import {mapState} from 'vuex'

export default {
   name: 'Menu',
   computed: mapState(['isMenuVisible']),
   methods: {  
    }
}
</script>

<style>

.aside.menu-area{
  background-color:rgb(15, 55, 90);
  box-shadow: 
    2px 0 10px 0 rgba(0, 0, 0, 0.12),
    2px 0 15px 0 rgba(0, 0, 0, 0.09)
}
.menu a{
  display: block;
  text-decoration: none;
  color: #fff;
  font-weight: 300;
  padding: 7px;
}

.menu a:hover{
  background: linear-gradient(135deg,#0d698a 0%, #98c9c2 100%);
  color: #fff;
   text-decoration: none;
}

.menu i {
  color: #fff;
}
.menu-area{
   background: linear-gradient(to right, #1e469a, #158aaa);
}

</style>
