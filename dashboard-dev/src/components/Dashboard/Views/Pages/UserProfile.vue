<template>
<div class="login-page">
    <app-navbar></app-navbar>
    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page">
        <div class="content">
          <div class="container">
            <div class="row">
              <div class="col-lg-4 col-md-5">
                <user-card :user_data="user_data">

                </user-card>
              </div>
              <div class="col-lg-8 col-md-7">
                <edit-profile-form :user_data="user_data">

                </edit-profile-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>
<script>
  import EditProfileForm from './UserProfile/EditProfileForm.vue'
  import UserCard from './UserProfile/UserCard.vue'
  import MembersCard from './UserProfile/MembersCard.vue'
  import AppNavbar from './Layout/AppNavbar'

  export default {
    components: {
      EditProfileForm,
      UserCard,
      MembersCard,
      AppNavbar
    },
    data(){
      return {
        user_data: {}
      }
    },
    methods: {
      get_user_data(){
        let cook = this.$cookies.get(this.cookieVariable)
        this.$http.get('auth/user-profile')
        .then(response => {
          let res = response.body
          if(res){
            let user = res
            this.user_data = user
          }        
        }).catch(err => {
          this.$notify({
            title: err.statusText,
            message: err.bodyText,
            type: 'danger'
          });
        });
      }
    },
    created(){
      this.get_user_data();
    }
  }

</script>
<style>

</style>
