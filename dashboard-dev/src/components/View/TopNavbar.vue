<template>
  <navbar navbarMenuClasses="red" type="primary" :transparent = 'false'  v-model="showNavbar">
    <div class="navbar-wrapper">
        <!-- <div class="navbar-minimize">
        <button id="minimizeSidebar" class="btn btn-icon btn-round btn-rio" @click="minimizeSidebar">
          <i class="nc-icon nc-minimal-right text-center visible-on-sidebar-mini"></i>
          <i class="nc-icon nc-minimal-left text-center visible-on-sidebar-regular"></i>
        </button>
      </div> -->

      <router-link tag="a" class="navbar-brand" :to="homeLink">My Profile</router-link>
    </div>

    <template slot="navbar-menu">

      <ul class="navbar-nav gvghv">
          <li class="nav-item">
            <!-- <a class="nav-link" href="">Hospital</a> -->
          </li>
        <li class="nav-item">
          <router-link tag="a" title="Home" class="nav-link btn-magnify" :to="homeLink">
          <i class="fa fa-home" aria-hidden="true"></i>
            <!-- <p>
              <span class="d-lg-none d-md-block">Stats</span>
            </p> -->
          </router-link>
        </li>
        <!-- <drop-down icon="nc-icon nc-bell-55" tag="li"
                   position="right"
                   direction="none"
                   class="nav-item btn-rotate dropdown">
          <a slot="title"
             slot-scope="{isOpen}"
             class="nav-link dropdown-toggle"
             data-toggle="dropdown"
             aria-haspopup="true"
             :aria-expanded="isOpen">
            <i class="nc-icon nc-bell-55"></i>
            <p>
              <span class="d-lg-none d-md-block">Some Actions</span>
            </p>
          </a>
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </drop-down> -->
         <drop-down icon="nc-icon nc-bell-55" tag="li"
                   position="right"
                   direction="none"
                   class="nav-item btn-rotate dropdown">
          <a slot="title"
             slot-scope="{isOpen}"
             class="nav-link dropdown-toggle usr-top"
             data-toggle="dropdown"
             aria-haspopup="true"
             :aria-expanded="isOpen">
            <div class="user-nav"> <img src="/static/img/faces/face-2.jpg" alt="user avatar"/></div>
            <p>{{userName}}</p>

          </a>
          <!-- <a class="dropdown-item" href="#">Profile</a> -->
          <!-- <a class="dropdown-item" href="#">Change Password</a> -->
          <a @click.prevent="logout()" class="dropdown-item">Logout</a>
        </drop-down>
      </ul>
    </template>
  </navbar>
</template>
<script>
  import { Navbar, NavbarToggleButton } from 'src/components/UIComponents'

  export default {
    components: {
      Navbar,
      NavbarToggleButton
    },
    data() {
      return {
        homeLink: '/home',
        navPos: 'static',
        activeNotifications: false,
        showNavbar: false,
        userName: ''
      }
    },
    methods: {
      logout(){
        let cook = this.$cookies.get(this.cookieVariable)
        this.$cookies.remove(this.cookieVariable, '/')
        this.$router.push('/login')
      },
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown() {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown() {
        this.activeNotifications = false
      },
        minimizeSidebar() {
        this.$sidebar.toggleMinimize()
      },

      toggleNavbar() {
        this.showNavbar = !this.showNavbar;
      }
    },
    created(){
      let cook= this.$cookies.get(this.cookieVariable)
      if(cook.userType == 6){
        this.homeLink = '/Coder/Dashboard'
      }
      else if(cook.userType == 7){
        this.homeLink = '/Hospitals'
      }
      else if(cook.userType == 3 || cook.userType == 4 || cook.userType == 5){
        this.homeLink = '/HospitalLayout/NewRegistration'
      }
      this.userName = cook.name
    }
  }

</script>
<style>
.navbar .navbar-nav
.usr-top{
  color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
}

.usr-top p{
  color: rgb(255, 255, 255);
}
.user-nav {
  margin-right: 10px;
  width: 30px;
  height: 30px;
  overflow: hidden;
  border-radius: 50%;
  float: left;
}
.usr-top.dropdown-toggle:after{
  color: rgb(255, 255, 255);
  margin-left: 15px !important;
}
.btn-rio{
  background-color: transparent !important;
}
.btn-rio:hover{
   background-color: rgba(255, 255, 255, 0.349) !important;
}
</style>
