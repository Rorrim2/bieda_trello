<template>
  <div class="about py-auto bg-primary h-100">
    <b-container class="align-content-center flex-fill" fluid="lg md">
      <b-row align-content="center" >

        <b-col cols="7" order-lg="1" order="1" class="align-self-center d-inline-flex">
          <b-form id="c_form-h" @submit.prevent="onSubmit" class="align-content-center w-100">
            <b-form-group class="my-1" label="Email address" label-for="inputmailh">
              <b-form-input type="email" required v-model="user.email" id="inputmailh"
                            placeholder="Enter email"/>
              <b-form-invalid-feedback :state="emailValidation" v-text="registerError"/>
            </b-form-group>
            <b-form-group class="my-1" label="Name" label-for="inputnameh">
              <b-form-input type="text" required v-model="user.name" id="inputnameh"
                            placeholder="Name"/>
            </b-form-group>
            <b-form-group class="my-1" label="Last name" label-for="inputlastnameh">
              <b-form-input type="text" required v-model="user.lastName" id="inputlastnameh"
                            placeholder="Last name"/>
            </b-form-group>
            <b-form-group class="my-1" label="Password" label-for="inputpasswordh">
              <b-form-input type="password" required v-model="user.password" id="inputpasswordh"
                            placeholder="Password"/>
            </b-form-group>
            <b-form-group class="my-1" label="Repeat password" label-for="inputrepeatpasswordh">
              <b-form-input type="password" v-model="user.confirmPassword" required :state="validation"
                            id="inputrepeatpasswordh" placeholder="Repeat password"/>
              <b-form-invalid-feedback :state="validation" v-text="`Repeated password is not the same`"/>
              <b-form-valid-feedback :state="validation" v-text="`Repeated password is the same`"/>

            </b-form-group>
            <b-button type="submit" class="text-white btn-secondary m-1">Submit</b-button>
          </b-form>
        </b-col>
        <b-col cols="5" order-lg="2" order="2" class="p-0">
          <b-img fluid-grow src="../assets/chibi_vader.png"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import {AuthResult, RegisterCredentials} from "@/data_models/types";
import {Component, Vue} from "vue-property-decorator";
import {RegisterMutation} from "@/data_models/mutations";
import {setToken} from "@/main";
import {cacheRefreshToken, storeInLocalStorage} from "@/utils";

@Component
export default class Sign_up extends Vue {

  private user: RegisterCredentials = {} as RegisterCredentials;
  private registerError: string = "";
  private loginResult: AuthResult = {} as AuthResult;

  get form_validation(): boolean {
    console.debug(`is form valid? ${this.emailValidation && this.validation}`);
    return this.emailValidation && this.validation;
  }
  get emailValidation(): boolean {
    console.debug(`emailValidation is ${!this.registerError || this.registerError === ""}`)
    return !this.registerError || this.registerError === "";
  };

  get validation(): boolean {
    console.debug(`is passwords valid? ${this.user.password === this.user.confirmPassword} -> ${this.user.password} === ${this.user.confirmPassword}`);
    return this.user.password === this.user.confirmPassword;
  };

  mutate() {
    const reg_user = this.user;
    const component = this;

    component.user = <RegisterCredentials>{};

    this.$apollo.mutate({
      mutation: RegisterMutation,
      variables: {
        email: reg_user.email,
        password: reg_user.password,
        name: reg_user.name,
        lastName: reg_user.lastName
      }
    }).then((data) => {
      let authResult = <AuthResult>data.data.registeruser;
      if (authResult.success) {
        setToken(authResult.token);
        cacheRefreshToken(authResult.refreshToken);
        storeInLocalStorage("active_user", authResult.user)

        component.loginResult = authResult;
        component.$router.push(`u/${component.loginResult.user.id}/boards`)
      }
    }).catch((error) => {
      console.debug(error)
      component.user = reg_user;
      component.registerError = error.message;
    })
  }

  public onSubmit(evt: Event) {
    console.debug(evt);
    evt.preventDefault();
    if(this.form_validation) {
      console.debug(this.user);
      this.mutate();
      return;
    }
    console.debug("form is invalid, and this message shouldn't be visible");
  }

}
</script>

<style scoped>

</style>
