<template>
  <div class="about py-auto bg-primary" >
    <b-container class="flex-row h-100">
      <b-col lg="4" class="order-1 order-lg-1 p-0 d-inline-flex">
        <b-img fluid-grow src="../assets/welcome_back2.png"/>
      </b-col>
      <b-col lg="8" class="order-lg-2 order-2 p-0 align-self-center d-inline-flex">
        <b-form inline @submit="onSubmit">
          <b-input-group class="m-1">
            <b-form-input type="email" required v-model="credentials.email" id="inputmailinline" placeholder="E-mail"/>
          </b-input-group>
          <b-input-group class="m-1">
            <b-form-input type="password" required v-model="credentials.password" id="inputpasswordinline"
                          placeholder="Password"/>
          </b-input-group>
          <b-button type="submit" class="text-white btn-secondary m-1">Log in</b-button>
          <b-form-invalid-feedback :state="loginValidation" v-text="loginError"/>
        </b-form>
      </b-col>

    </b-container>

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

  get loginValidation(): boolean {
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

  public onSubmit(evt: Event) {
    evt.preventDefault();
    let loginData = this.credentials;
    this.mutate(loginData);
  };
};


</script>
