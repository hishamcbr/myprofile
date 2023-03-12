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
    
    <div class="main-panel">
      <top-navbar></top-navbar>
      <side-bar :backgroundColor = "sideNavBg" type="sidebar" :sidebar-links="sidebarLinks">
        <!-- <user-menu></user-menu> -->
      </side-bar>
      <dashboard-content ></dashboard-content>
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
  },
  data(){
    return{
      sideNavBg: 'black',
      sidebarLinks:[
        {
          name: 'Users',
          icon: 'fa fa-users',
          path: '/Users/Users'
        },
        {
          name: 'Login Requests',
          icon: 'fa fa-sign-in ',
          path: '/Users/LoginRequest'
        }
      ]
    }
  }
}
</script>

<style>
.rio-layout .content{
  min-height: 100vh;
}
</style>
