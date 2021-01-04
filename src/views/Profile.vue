<template>
  <div class="about overflow-y py-3 my-auto  bg-primary">
    <b-container class="align-content-center mx-auto offset-4">
      <b-row>
        <p class="h2 font-weight-bold align-top mt-4  text-light media-aside-right">{{user.name}}'s Profile Settings</p>
      </b-row>
      <hr class="w-100">
      <b-row align-v="center">
        <b-col cols="7" order-lg="1" order="1" class="align-self-center d-inline-flex">
          <b-form id="c_form-h" @submit.prevent="onSubmit" class="align-content-center w-100">
            <b-form-group class="m-1" label="Name" label-for="userSettingsName">
              <b-form-input type="email" required v-model="user.name" id="userSettingsName"
                            placeholder="Enter email"/>
            </b-form-group>
            <b-form-group class="m-1" label="Last Name" label-for="userSettingsLastName">
              <b-form-input type="text" required v-model="user.lastName" id="userSettingsLastName"
                            placeholder="Name"/>
            </b-form-group>
            <b-form-group class="m-1" label="Email" label-for="userSettingsEmail">
              <b-form-input type="text" required v-model="user.email" id="userSettingsEmail"
                            placeholder="Last name"/>
            </b-form-group>
            <b-button type="submit" class="text-white btn-secondary m-1">Save</b-button>
          </b-form>
        </b-col>
        <b-col cols="5" order-lg="2" order="2" class="p-1">
          <b-img fluid-grow src="../assets/chibi_r2d2.png"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
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
