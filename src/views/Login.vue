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

import {useMutation} from '@vue/apollo-composable';
import {Vue} from 'vue-property-decorator';

import {gql, FetchResult} from "apollo-boost";
import Component from "vue-class-component";

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
    }
`;

interface User {
  id: string;
  name: string;
  lastName: string;
}

interface LoginUser {
  user: User;
  success: boolean;
  token: string;
}

interface Credentials {
  email: string;
  password: string;
}

export default class Login extends Vue {
   credentials: Credentials = {email:'', password: ''};

   mutate(cred: Credentials) {
     const credentials = cred;

     this.$apollo.mutate({
       mutation: LoginMutation,
       variables:{
         email: credentials.email,
         password: credentials.password
       },


     }).then((data) => {
       // Result
       console.debug(data)
     }).catch((error) => {
       // Error
       console.debug(error)
       // We restore the initial user input
       this.credentials = credentials
     })
   };

    public onSubmit ()  {
      console.log('heres')
      console.debug('heres')
      let loginData = this.credentials;
      this.mutate(loginData);
      alert(JSON.stringify(this.credentials))
    };
};


</script>
