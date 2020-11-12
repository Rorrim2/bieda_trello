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

import {Prop, Vue} from 'vue-property-decorator';
import {setToken} from "@/main";
import {gql} from "apollo-boost";
import {Credentials, LoginUser} from "@/types";

const LoginMutation = gql`
    mutation LoginUser($email: String!, $password: String!) {
        loginuser(email: $email, password: $password) {
            user {
                id
                name
                lastName
            }
            success
            token
        }
    }`;

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
     token:''
   };

   async mutate(cred: Credentials) {
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
         component.loginResult = {
           token: loginUser.token,
           success: loginUser.success,
           user: {
             id:loginUser.user.id,
             name:loginUser.user.name,
             lastName:loginUser.user.lastName
           }};
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
