<template>
  <div class="sign py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <form id="c_form-h" class="" @submit="onSubmit">
            <div class="form-group row"> <label for="inputmailh" class="col-2 col-form-label text-white">E-mail</label>
              <div class="col-10">
                <input type="email" v-model="user.email" class="form-control" id="inputmailh" placeholder="mail@example.com"> </div>
            </div>
            <div class="form-group row"> <label for="inputnameh" class="col-2 col-form-label text-white">Name</label>
              <div class="col-10">
                <input type="text" v-model="user.name" class="form-control" id="inputnameh" placeholder="Name"> </div>
            </div>
            <div class="form-group row"> <label for="inputlastnameh" class="col-2 col-form-label text-white">Last name</label>
              <div class="col-10">
                <input type="text" v-model="user.lastName" class="form-control" id="inputlastnameh" placeholder="Last name"> </div>
            </div>
            <div class="form-group row"> <label for="inputpasswordh" class="col-2 col-form-label text-white">Password</label>
              <div class="col-10">
                <input type="password" v-model="user.password" class="form-control" id="inputpasswordh" placeholder="Password"> </div>
            </div>
            <div class="form-group row" @submit.stop.prevent> <label for="inputrepeatpasswordh" class="col-2 col-form-label text-white">Repeat password</label>
              <div class="col-10">
                <input type="password" v-model="user.confirmPassword" :state="validation" class="form-control" id="inputrepeatpasswordh" placeholder="Repeat password">
                <b-form-invalid-feedback :state="validation">Repeated password is not the same</b-form-invalid-feedback>
                <b-form-valid-feedback :state="validation">Repeated password is the same</b-form-valid-feedback>
              </div>

            </div>
            <button type="submit" class="btn btn-secondary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {AuthResult, RegisterCredentials} from "@/data_models/types";
import {Component, Vue} from "vue-property-decorator";
import {RegisterMutation} from "@/data_models/mutations";
import {cacheRefreshToken, setToken} from "@/main";

@Component
export default class Sign_up extends Vue {

  private user: RegisterCredentials = {} as RegisterCredentials;

  private loginResult: AuthResult = {} as AuthResult;

  get validation() : boolean{
    return this.user.password === this.user.confirmPassword
  };

  mutate(){
    const reg_user = this.user;
    const component = this;

    component.user = <RegisterCredentials> {};

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
      if(authResult.success){
          setToken(authResult.token);
          cacheRefreshToken(authResult.refreshToken);
          localStorage.setItem("active_user", JSON.stringify(authResult))

          component.loginResult = authResult;
          component.$router.push(`u/${component.loginResult.user.id}/boards`)
      }
    }).catch((error) => {
      console.debug(error)
      component.user = reg_user;
    })
  }

  public onSubmit(evt: Event) {
      console.debug(evt);
      evt.preventDefault();
      console.debug(this.user);
      this.mutate();
  }

}
</script>

<style scoped>

</style>
