<template>
  <div class="wrapper">
   <!-- <side-bar :backgroundColor = "sideNavBg" type="sidebar" :sidebar-links="$sidebar.sidebarLinks">
      <user-menu></user-menu>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div> -->
  
    <div class="rio-layout">
     <top-navbar></top-navbar>

      <dashboard-content >

      </dashboard-content>
   <content-footer></content-footer>

    </div>

  </div>
</template>

<script>
  import TopNavbar from './TopNavbar.vue'
    import ContentFooter from './ContentFooter.vue'
      import DashboardContent from './Content.vue'
export default {
    components: {
       DashboardContent,
         ContentFooter,
      TopNavbar
 
      
    }
}
</script>

<style scoped>
.rio-layout .content{
  
  min-height: 100vh;
}
.navbar-absolute{
  position: static !important;
}
</style>
