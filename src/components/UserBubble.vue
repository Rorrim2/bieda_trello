<template>
  <div>
    <b-dropdown @hide="check_if_can_hide($event)" no-caret no-flip toggle-class="rounded-circle px-0 py-0"
                ref="d_down" @show="show_overlay($event)">
      <template #button-content>
        <b-avatar :title="title" class="bg-secondary text-decoration-none" :id="`user_menu`">
          <span>{{ shortenUser }}</span>
        </b-avatar>
      </template>
      <b-dropdown-header variant="dark" class="m-0 p-0">
        <div class="d-flex flex-row m-0 p-0">
          <b-container class="d-flex flex-row flex-nowrap p-0 m-0">
            <b-avatar size="3em" style="min-width: 0;" :title="title" class="bg-secondary mr-3" :id="`user_menu`">
              <span>{{ shortenUser }}</span>
            </b-avatar>
            <div class="d-flex flex-column">
              <p class="m-0 p-0">
                <b><b v-text="fullName"></b></b>
              </p>
              <span class="p-0 m-0 small w-100 mx-auto"
                    style="min-width: 100px; max-width: 200px"> @{{user.id}}</span>

            </div>
          </b-container>

          <b-button @click="hide_overlay($event)"
                    class="close p-0 m-0 ml-4 float-right"
                    aria-label="Close" style="width: 25px; height:25px">
            <span aria-hidden="true" style="alignment: top" class="text-center mx-auto my-auto">&times</span>
          </b-button>
        </div>
      </b-dropdown-header>
      <b-dropdown-divider class="w-100 "></b-dropdown-divider>
      <b-dropdown-group>
        <b-dropdown-item>Change user's permissions</b-dropdown-item>
        <b-dropdown-item>View user's activity on this board</b-dropdown-item>
        <b-dropdown-item variant="danger">Leave board :)</b-dropdown-item>
      </b-dropdown-group>
    </b-dropdown>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {User} from "@/data_models/types";
import {BDropdown} from 'bootstrap-vue';

@Component({
  components: {}
})
export default class UserBubble extends Vue {

  @Prop() user!: User;
  protected show: boolean = false;

  get fullName(): string {
    return `${this.user.name} ${this.user.lastName}`;
  }

  get shortenUser(): string {
    return this.user.name.substring(0, 1) + this.user.lastName.substring(0, 1);
  }

  get title(): string {
    return `${this.user.name} ${this.user.lastName} ,id: ${this.user.id}`;
  }

  hide_overlay(evt: Event) {
    this.show = false;
    const dropdown = this.$refs.d_down as BDropdown;
    dropdown.hide();
  }

  check_if_can_hide(evt: Event) {
    if (this.show) {
      evt.preventDefault();
    }
  }

  show_overlay(evt: Event) {
    this.show = true;
  }

}
</script>

<style>

</style>