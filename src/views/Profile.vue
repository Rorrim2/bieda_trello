<template>
  <b-container class="align-content-center col-md-4 offset-4">
    <div v-if="this.user !== undefined">
      <div @submit.prevent="onSubmit">
        <form>
          <p class="h4">Edit Profile</p>
          <label for="userSettingsName"  class="font-weight-light">Name</label>
          <input type="text" v-model="user.name" id="userSettingsName" class="form-control">
          <br>
          <label for="userSettingsLastName"  class="font-weight-light">Last Name</label>
          <input type="text" v-model="user.lastName" id="userSettingsLastName" class="form-control">
          <br>
          <label for="userSettingsEmail"  class="font-weight-light">Email</label>
          <input type="text" v-model="user.email" id="userSettingsEmail" class="form-control">
          <br>
          <div class="text-right" style="margin: 1vw;">
            <button class="btn bg-secondary text-light" type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  </b-container>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {getFromStorage, storeInStorage} from "@/store";
  import {StorageDescriptor, User} from "@/data_models/types";
  import dataBus from "@/databus";
  import {editProfile} from "@/utils";

  @Component
  export default class Settings extends Vue {
    private user: User = getFromStorage("active_user", StorageDescriptor.local);

    onSubmit = () => {
        editProfile(this.user, value => {
            console.log(value);
            storeInStorage("active_user", this.user, StorageDescriptor.local);
            dataBus.$emit('updateUser');
          }, reason => {console.log(reason)}
        );
      }
    }
</script>

<style scoped>

</style>
