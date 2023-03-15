<template>
  <div class="login-page">
    <app-navbar></app-navbar>
    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page section-image">
        <!--   you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple" -->
        <div class="content">
          <div class="container">
            <div class="col-lg-4 col-md-6 ml-auto mr-auto">
              <form>
                <card type="login">
                  <h3 slot="header" class="header text-center">Login</h3>

                  <fg-input v-validate="'required'" name="email" v-model="form.email" addon-left-icon="nc-icon nc-single-02"
                            placeholder="Email"></fg-input>
                            <small class="text-danger">
                              {{errors.first('email')}}
                            </small>

                  <fg-input style="margin-bottom:5px" v-validate="'required'" name="Password" v-model="form.password" addon-left-icon="nc-icon nc-key-25" placeholder="Password"
                            type="password"></fg-input>
                            <small class="text-danger">
                              {{errors.first('Password')}}
                            </small>
                    <button style="width:100%;padding:10px" @click.prevent="validate()" slot="footer" type="submit" round block class="mb-3 btn btn-success btn-sm">Login</button>
                    <br>
                    <router-link slot="footer" tag="a" to="/register">Create New Account</router-link>
                  
                </card>
              </form>
            </div>
            <!-- <div class="col-md-4 ml-auto mr-auto">
              <center><button class="btn btn-primary btn-sm">Request For Login</button></center>
            </div> -->
          </div>
        </div>
        
        <div class="clearfix"></div>
        <app-footer></app-footer>
        <div class="full-page-background" style="background-image: url(static/img/background/background-2.jpg) "></div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Card, Checkbox, Button } from 'src/components/UIComponents';
  import AppNavbar from './Layout/AppNavbar'
  import AppFooter from './Layout/AppFooter'
  import swal from 'sweetalert2'
  import jwt_decode from 'jwt-decode';

  export default {
    components: {
      Card,
      AppNavbar,
      AppFooter,
      [Button.name]: Button
    },
    data() {
      return {
        form: {
          email: '',
          password: ''
        },
        userId: ''
      }
    },
    methods: {
      
      validate(){
        this.$validator.validateAll().then(isValid => {
          if(isValid){
            this.login()
          }
        })
      },
      login(){
        this.$http.post('auth/login',
        {
          'email': this.form.email,
          'password': this.form.password,
        })
        .then(response => {
          let res = response.body
          if(res.user){
            let user = res.user
            user.token = res.access_token
            this.$cookies.set(this.cookieVariable, JSON.stringify(user), '2h', '/')
            this.$router.push('/profile')
          }        
        }).catch(err => {
          this.$notify({
            title: err.statusText,
            message: err.bodyText,
            type: 'danger'
          });
        });
      },
      toggleNavbar() {
        document.body.classList.toggle('nav-open')
      },
      closeMenu() {
        document.body.classList.remove('nav-open')
        document.body.classList.remove('off-canvas-sidebar')
      }
    },
    created(){
      let cook = this.$cookies.get(this.cookieVariable)
      if(cook.email){
        // let decoded = jwt_decode(cook.token)
        // console.log(decoded)
        // this.form.email = cook.email ? cook.email : ''
      }
    },
    beforeDestroy() {
      this.closeMenu()
    }
  }
</script>
<style>
</style>
