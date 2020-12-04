<template>
  <div>
    <b-dropdown @hide="check_if_can_hide($event)" right no-caret no-flip toggle-class="rounded-circle px-0 py-0"
                ref="d_down" @show="show_overlay($event)">
      <template #button-content>
        <b-avatar :title="title" class="bg-secondary text-decoration-none" :id="`user_menu`">
          <span>{{ shortenUser }}</span>
        </b-avatar>
      </template>
      <b-dropdown-header variant="success" class="m-0 p-0">
        <div class="d-flex flex-row m-0 p-0">
          <p class="p-0 mx-auto my-auto align-middle">Account</p>

          <b-button @click="hide_overlay($event)"
                    class="close pl-1 pb-2 pr-1 m-0 float-right"
                    aria-label="Close">
            <span aria-hidden="true" style="display: block;">&times</span>
          </b-button>
        </div>
      </b-dropdown-header>
      <b-dropdown-divider class="w-100 "></b-dropdown-divider>
      <b-dropdown-item class="m-0 p-0">
        <b-container class="d-flex flex-row flex-nowrap p-0 m-0">
          <b-avatar size="3em" style="min-width: 0;" :title="title" class="bg-secondary mr-3" :id="`user_menu`">
            <span>{{ shortenUser }}</span>
          </b-avatar>
          <div class="d-flex flex-column">
            <p class="m-0 p-0">
              <b><b v-text="fullName"></b></b>
            </p>
            <span v-text="user.email" class="p-0 m-0 small w-100 mx-auto"
                  style="min-width: 100px; max-width: 200px"></span>
          </div>
        </b-container>
      </b-dropdown-item>
      <b-dropdown-divider class="w-100"></b-dropdown-divider>
      <b-dropdown-item class="text-center">
        Settings
      </b-dropdown-item>
      <b-dropdown-divider class="w-100"></b-dropdown-divider>
      <b-dropdown-item variant="danger" class="bg-info text-center btn-info info">
        Logout
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
  created(){
    console.debug(this.show)
  }
}
</script>

<style>

</style>