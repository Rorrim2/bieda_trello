<template>
  <div>
    <b-dropdown @hide="check_if_can_hide($event)" right no-caret no-flip toggle-class="rounded-circle px-0 py-0" ref="d_down" @show="show_overlay($event)">
      <template #button-content>
        <b-avatar :title="title" class="bg-secondary" :id="`user_menu`">
          <span>{{ shortenUser }}</span>
        </b-avatar>
      </template>
      <b-dropdown-header variant="success" class="m-0 p-0">
        <div class="container-fluid m-0 p-0">
          <p class="p-0 pl-5 m-0">Account</p>

          <b-button @click="hide_overlay($event)"
                    class="close pl-1 pb-2 pr-1"
                    aria-label="Close">
            <span aria-hidden="true" style="display: block;">&times</span>
          </b-button>
        </div>
      </b-dropdown-header>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item>

      </b-dropdown-item>
    </b-dropdown>

  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {User} from "@/data_models/types";
import { BDropdown } from 'bootstrap-vue';

@Component({
  components: {}
})
export default class UserBubble extends Vue {

  @Prop() user!: User;
  private show: boolean = false;

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

  check_if_can_hide(evt: Event){
    if(this.show){
      evt.preventDefault();
    }
  }

  show_overlay(evt: Event) {
    this.show = true;
  }

}
</script>

<style scoped>
header {
  padding: 1px;
  margin: 1px;
  flex-direction: row;
  flex: 1 1 content !important;
}

</style>