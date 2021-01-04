<template>
  <div class="about py-auto bg-primary my-auto overflow-y">
    <b-container class="flex-row">
      <b-row align-v="end"  class="flex-row my-3">
        <b-col lg="6" md="7" sm="7" class="order-1 order-lg-1 ">
          <b-img fluid-grow src="../assets/welcome_back2.png"/>
        </b-col>
        <b-col lg="6" md="5" sm="5" class="order-lg-2 order-2">
          <b-form inline @submit="onSubmit">
            <b-form-row class="m-0">
              <b-input-group class="mx-auto">
                <b-form-input type="email" class="mb-1 mr-1" required v-model="credentials.email" id="inputmailinline"
                              placeholder="E-mail"/>
              </b-input-group>
              <b-input-group class="mx-auto">
                <b-form-input type="password" class="mb-1 mr-1" required v-model="credentials.password" id="inputpasswordinline"
                              placeholder="Password"/>
              </b-input-group>
            </b-form-row>
            <b-form-row class="justify-content-between mx-lg-0 mx-0 mx-md-auto d-flex flex-row">
              <b-button type="submit" class="text-white btn-secondary">Log in</b-button>
              <b-link class="text-light my-auto m-1">Reset password</b-link>
            </b-form-row>
            <b-form-invalid-feedback :state="loginValidation" v-text="loginError"/>
          </b-form>
        </b-col>
      </b-row>

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
