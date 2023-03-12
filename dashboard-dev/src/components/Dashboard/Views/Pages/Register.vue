<template>
  <div class="register-page">
    <app-navbar></app-navbar>
    <div class="wrapper wrapper-full-page ">
      <div style="margin-top:0" class="full-page register-page section-image" filter-color="black">
        <div class="content">
          <div class="container">
            <div class="row">
              <div class="col-lg-4 col-md-4"></div>
              <div class="col-lg-4 col-md-4 mr-auto">
                <card type="signup">
                  <template slot="header">
                    <h4 class="card-title">Register</h4>
                  </template>

                  <el-input name="name" v-validate="'required'" placeholder="Name" v-model="form.name"></el-input>
                  <small class="text-danger">
                    {{errors.first('name')}}
                  </small>
                  <br><br>
                  <el-input name="email" v-validate="'required|email'" placeholder="Email" v-model="form.email"></el-input>
                  <small class="text-danger">
                    {{errors.first('email')}}
                  </small>
                  <br><br>
                  <el-input name="password" v-validate="'required'"  placeholder="Password" v-model="form.password" show-password></el-input>
                  <small class="text-danger">
                    {{errors.first('password')}}
                  </small>
                  <br><br>
                  <el-input name="confirm password" v-validate="{ is: form.password, required: true }"  placeholder="Confirm Password" v-model="cpassword" show-password></el-input>
                  <small class="text-danger">
                    {{errors.first('confirm password')}}
                  </small>

                  <p-button @click.prevent="validate()" slot="footer" type="info" round>Register</p-button>
                </card>
              </div>
            </div>
          </div>
        </div>
        <app-footer></app-footer>
        <div class="full-page-background"
             style="background-image: url(static/img/background/jan-sendereks.jpg) "></div>
      </div>
    </div>
  </div>
</template>
<script>
  import AppNavbar from './Layout/AppNavbar'
  import AppFooter from './Layout/AppFooter'
  import { Card, Checkbox, Button, InfoSection } from 'src/components/UIComponents';

  export default {
    components: {
      Card,
      AppNavbar,
      AppFooter,
      InfoSection,
      [Checkbox.name]: Checkbox,
      [Button.name]: Button
    },
    data(){
      return {
        form: {
          name: '',
          email: '',
          password: '',
        },
        cpassword: ''
      }
    },
    methods: {
      validate(){
        this.$validator.validateAll().then(isValid => {
          if(isValid){
            this.register()
          }
        })
      },
      register(){
        this.$http.post('auth/register',
        {
          'name': this.form.name,
          'password': this.form.password,
          'email': this.form.email
        })
        .then(response => {
        let res = response.body
          if(res.user && res.user.id ){
            this.$notify({
              title: 'Success',
              message: res.message,
              type: 'success'
            });
            this.$router.push('/login')
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
    beforeDestroy() {
      this.closeMenu()
    }
  }
</script>
<style>
</style>
