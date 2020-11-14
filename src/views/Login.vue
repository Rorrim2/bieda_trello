<template>
  <div class="about py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <form class="form-inline" @submit="onSubmit()">
            <div class="form-group">
              <input type="email" v-model="credentials.email" class="form-control" id="inputmailinline" placeholder="E-mail"> </div>
            <div class="form-group">
              <input type="password" v-model="credentials.password" class="form-control mx-2" id="inputpasswordinline" placeholder="Password"> </div>
            <button type="submit" class="btn text-white btn-secondary">Log in</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

import {Component, Prop, Vue} from 'vue-property-decorator';
import {setToken, cacheRefreshToken} from "@/main";
import {Credentials, LoginUser} from "@/data_models/types";
import {LoginMutation} from "@/data_models/mutations";

@Component
export default class Login extends Vue {

  @Prop()
   credentials: Credentials = {
     email:'',
     password: ''
   };

  @Prop()
   loginResult: LoginUser = {
     user: {
       id: '',
       name: '',
       lastName: ''
     },
     success: false,
     token:'',
     refreshToken:''
   };

   mutate(cred: Credentials) {
     const credentials = cred;
     const component = this;
     component.credentials = {
       email:"",
       password:""
     };

     this.$apollo.mutate({
       mutation: LoginMutation,
       variables: {
         email: credentials.email,
         password: credentials.password
       },
     }).then((data) => {
       let loginUser = data.data.loginuser;
       console.debug(loginUser.success);
       if (loginUser.success === true) {
         setToken(loginUser.token)
         cacheRefreshToken(loginUser.refreshToken)
         component.loginResult = {
           token: loginUser.token,
           refreshToken: loginUser.refreshToken,
           success: loginUser.success,
           user: {
             id:loginUser.user.id,
             name:loginUser.user.name,
             lastName:loginUser.user.lastName
           }};

         localStorage.setItem("active_user", JSON.stringify(component.loginResult.user));

         component.$router.push(`u/${component.loginResult.user.id}/boards`)
       }
     }).catch((error) => {
       console.debug(error)
       component.credentials = credentials

     })
   };

    public onSubmit ()  {
      let loginData = this.credentials;
      this.mutate(loginData);
      this.$forceUpdate();
    };
};


</script>
