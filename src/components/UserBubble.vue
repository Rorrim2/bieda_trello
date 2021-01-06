<template>
  <div>
    <b-dropdown @hide="check_if_can_hide($event)" no-caret no-flip toggle-class="rounded-circle px-0 py-0"
                ref="d_down" @show="show_overlay($event)">
      <template #button-content>
        <b-avatar badge badge-variant="transparent" size="2.5rem" :title="title" class="bg-secondary text-decoration-none" :id="`user_menu`">
          <span>{{ shortenUser }}</span>
          <template #badge v-if="badge">
            <b-icon :variant="badge_variant ? badge_variant : `primary`" :icon="badge"/>
          </template>
        </b-avatar>
      </template>
      <b-dropdown-header variant="dark" class="m-0 p-0">
        <div class="d-flex flex-row m-0 p-0">
          <b-container class="d-flex flex-row flex-nowrap p-0 m-0">
            <b-avatar size="3em" style="min-width: 0;" :title="title" class="bg-secondary mr-3" :id="`user_menu`">
              <span>{{ shortenUser }}</span>
            </b-avatar>
            <div class="d-flex flex-column">
              <p class="m-0 p-0 text-nowrap text-truncate">
                <b><b v-text="fullName"></b></b>
              </p>
              <span v-text="user.id" class="p-0 m-0 small text-nowrap text-truncate w-100 mx-auto"
                    style="min-width: 100px; max-width: 200px"></span>
            </div>
          </b-container>

          <b-button @click="hide_overlay($event)" variant="danger"
                    class="float-right p-0 d-inline-flex flex-column justify-content-between text-center" style="height: 30px; width:30px;">
            <span aria-hidden="true" class="align-self-center " style="font-size: 1.1rem;" >&times</span>
          </b-button>
        </div>
      </b-dropdown-header>
      <b-dropdown-group>
        <b-dropdown-item class="w-100 p-0">
          <b-button variant="outline-dark" class="text-center border-0 w-100" style="outline: none">
            Change user's permissions
          </b-button>
        </b-dropdown-item>
        <b-dropdown-item class="w-100 p-0">
          <b-button variant="outline-dark" class="text-center border-0 w-100" style="outline: none">
            View user's activity on this board
          </b-button>
        </b-dropdown-item>
        <b-dropdown-item class="w-100 p-0">
          <b-button variant="outline-danger" class="text-center border-0 w-100">
            Leave board :)
          </b-button>
        </b-dropdown-item>
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
  @Prop() badge!: string;
  @Prop() badge_variant!: string;

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
a.dropdown-item {
  padding: 0;
}

.btn:focus{
  box-shadow: none!important;
  outline: none!important;
}
</style>