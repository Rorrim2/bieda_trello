<template>
  <div class="about py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <form class="form-inline">
            <div class="form-group">
              <input type="email" class="form-control" id="inputmailinline" placeholder="E-mail"> </div>
            <div class="form-group">
              <input type="password" class="form-control mx-2" id="inputpasswordinline" placeholder="Password"> </div>
            <button type="submit" class="btn text-white btn-secondary">Log in</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import gql from 'graphql-tag'
import UserBubble from "@/components/UserBubble.vue";
import {Vue} from 'vue-property-decorator';

// const UsersQuery = gql`
//     query {
//         users{
//             id
//             name
//             lastName
//         }
//     }
// `;
//
// export default {
//   components: {UserBubble},
//   data(){
//     return {
//       users: '',
//     }
//   },
//
//   apollo: {
//     users: UsersQuery
//   }
// }
export default class Login extends Vue {}
</script>
