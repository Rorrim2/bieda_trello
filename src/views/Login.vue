<template>
  <div class="about py-auto bg-primary">
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
import {AuthResult, Credentials, StorageDescriptor} from "@/data_models/types";
import dataBus from "@/databus";
import {cacheRefreshToken, loginUser, parseJWT, setToken} from "@/utils";
import {storeInStorage} from "@/store";

@Component
export default class Login extends Vue {

  private credentials: Credentials = <Credentials>{};
  private loginError: string = "";
  private loginResult: AuthResult = <AuthResult>{};

  get loginValidation(): boolean {
    console.debug(`loginValidation is ${!this.loginError || this.loginError === ""}`)
    return !this.loginError || this.loginError === "";
  };

  private loginRequest(cred: Credentials) {
    const credentials = cred;
    const component = this;
    component.credentials = <Credentials>{};
    loginUser(credentials, data => {
      let authResult = data;
      if (authResult.success) {
        setToken(authResult.token)
        let payload = parseJWT(authResult.token)
        storeInStorage("jti", payload.jti, StorageDescriptor.local);
        storeInStorage("exp", payload.exp, StorageDescriptor.local);
        cacheRefreshToken(authResult.refreshToken);
        storeInStorage("active_user", authResult.user, StorageDescriptor.local);
        component.loginResult = authResult;
        dataBus.$emit('updateUser');
        component.$router.push(`u/${component.loginResult.user.id}/boards`)
      }
    }, error => {
      console.debug(error);
      component.credentials = credentials
      component.loginError = error.graphQLErrors[0].message;
    });
  }

  public onSubmit(evt: Event) {
    evt.preventDefault();
    let loginData = this.credentials;
    this.loginRequest(loginData);
  };
};

</script>
