<template>
  <div class="about py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 order-lg-2 order-2 align-self-center">
          <form class="form-inline" @submit="onSubmit">
            <div class="form-group">
              <input type="email" v-model="credentials.email" class="form-control" id="inputmailinline" placeholder="E-mail"> </div>
            <div class="form-group">
              <input type="password" v-model="credentials.password" class="form-control mx-2" id="inputpasswordinline" placeholder="Password"> </div>
            <button type="submit" class="btn text-white btn-secondary">Log in</button>
          </form>
          <b-form-invalid-feedback :state="loginValidation" v-text="loginError"></b-form-invalid-feedback>
        </div>
        <div class="col-lg-4 order-1 order-lg-1 p-0"> <img class="img-fluid d-block" src="../assets/welcome_back.png"></div>
      </div>
    </div>

  </div>
</template>
<script lang="ts">

import {Component, Vue} from 'vue-property-decorator';
import {setToken} from "@/main";
import {Credentials, AuthResult} from "@/data_models/types";
import {LoginMutation} from "@/data_models/mutations";
import dataBus from "@/databus";
import {cacheRefreshToken, parseJWT, storeInLocalStorage} from "@/utils";

@Component
export default class Login extends Vue {

  private credentials: Credentials = <Credentials>{};
  private loginError: string = "";
  private loginResult: AuthResult = <AuthResult>{};

  get loginValidation(): boolean{
    console.debug(`loginValidation is ${!this.loginError || this.loginError === ""}`)
    return !this.loginError || this.loginError === "";
  };

  mutate(cred: Credentials) {
     const credentials = cred;
     const component = this;
     component.credentials = <Credentials>{};

     this.$apollo.mutate({
       mutation: LoginMutation,
       variables: {
         email: credentials.email,
         password: credentials.password
       },
     }).then((data) => {
       let authResult = <AuthResult>data.data.loginuser;
       if (authResult.success) {
         setToken(authResult.token)
         let payload = parseJWT(authResult.token)
         storeInLocalStorage("jti", payload.jti);
         storeInLocalStorage("exp", payload.exp)
         cacheRefreshToken(authResult.refreshToken)
         storeInLocalStorage("active_user", authResult.user)

         component.loginResult = authResult;
         dataBus.$emit('updateUser');

         component.$router.push(`u/${component.loginResult.user.id}/boards`)
       }
     }).catch((error) => {
       console.debug(error)
       component.credentials = credentials
       component.loginError = error.message;
     })
   };

    public onSubmit (evt: Event)  {
      evt.preventDefault();
      let loginData = this.credentials;
      this.mutate(loginData);
    };
};


</script>
