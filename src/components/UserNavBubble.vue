<template>
  <div>
    <b-dropdown right no-caret no-flip toggle-class="align-top rounded-circle px-0 py-0"
                ref="d_down" @show="show_overlay($event)">
      <template #button-content>
        <b-avatar :title="title" size="2.5em" style="font-size: smaller"
                  class="d-block bg-secondary text-decoration-none" :id="`user_menu`">
          <span>{{ shortenUser }}</span>
        </b-avatar>
      </template>
      <b-dropdown-header variant="success" class="m-0 p-0">
        <div class="d-flex flex-row m-0 p-0">
          <b class="p-0 pl-5 mx-auto my-0 d-inline-flex align-self-center">
            <b>Account</b>
          </b>
          <b-button @click="hide_overlay($event)" variant="danger"
                    class="float-right p-0 d-inline-flex flex-column justify-content-between
                     text-center" style="height: 30px; width:30px;">
            <span aria-hidden="true" class="align-self-center " style="font-size: 1.1rem;" >
              &times
            </span>
          </b-button>
        </div>
      </b-dropdown-header>
      <b-dropdown-divider class="w-100 "></b-dropdown-divider>
      <b-dropdown-header class="m-0 p-0">
        <b-container class="d-flex flex-row flex-nowrap p-0 m-0">
          <b-avatar size="3em" style="min-width: 0;" :title="title" class="bg-secondary mr-3 float-left" :id="`user_menu`">
            <span>{{ shortenUser }}</span>
          </b-avatar>
          <div class="d-flex flex-column mr-5 pr-5 float-left">
            <p class="m-0 p-0 text-nowrap text-dark text-truncate">
              <b><b v-text="fullName"></b></b>
            </p>
            <span v-text="user.email" class="p-0 m-0 small text-nowrap text-truncate mx-auto"
                  style="min-width: 100px; max-width: 200px"></span>
          </div>
        </b-container>
      </b-dropdown-header>
      <b-dropdown-divider class="w-100"></b-dropdown-divider>
      <b-dropdown-item class="w-100 p-0">
        <b-button @click="changeProfile($event)" variant="outline-dark" class="text-center border-0 w-100" style="outline: none">
          Settings
        </b-button>
      </b-dropdown-item>
      <b-dropdown-divider class="w-100"></b-dropdown-divider>
      <b-dropdown-item class="w-100 p-0">
        <b-button @click="logout($event)" variant="outline-danger" class="text-center border-0 w-100">
          Logout
        </b-button>
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import UserBubble from "@/components/UserBubble.vue";

@Component({
  components: {}
})
export default class UserNavBubble extends UserBubble {
  created() {
    console.debug(this.show)
  }

  logout(evt: Event) {
    this.$emit('logout');
  }

  changeProfile(evt: Event) {
    this.$emit('ProfileChanged')
  }
}
</script>

<style>
  a.dropdown-item {
    padding: 0;
  }

  .btn:focus{
    box-shadow: none!important;
    outline: none!important;
  }
</style>
