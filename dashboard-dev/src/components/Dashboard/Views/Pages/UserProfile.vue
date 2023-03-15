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
                <div class="card">
                  <!-- <div class="card-header">
                    <h4 class="title">Upload Image</h4>
                  </div> -->
                  <!-- <div class="card-body">
                    <a href="#" class="facebook-signup" @click.prevent="loginWithFacebook">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#3578E5"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                        Facebook
                    </a>
                    <p>Access Token: {{accesstoken}}</p>
                  </div> -->
                </div>
                
                <!-- <p v-if="accesstoken">{{accesstoken}}</p> -->
                <edit-profile-form @user_data_changed="get_user_data()"  :user_data="user_data" :access_token="accesstoken">

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
import { initFbsdk } from '@/config/fb.js'
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
        user_data: {},
        accesstoken: ''
      }
    },
    methods: {
      loginWithFacebook () {
        window.FB.login(response => {
          this.accesstoken = response.authResponse.accessToken
        }, this.params)
      },
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
    },
    mounted () {
      initFbsdk()
    },
  }

</script>
<style>

</style>
