<template>
  <div class="rounded-circle person bg-info" :title="title">
    <span>{{shortenUser}}</span>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {User} from "@/data_models/types";

@Component
export default class UserBubble extends Vue {

  @Prop() user!: User;

  get shortenUser(): string {
    return this.user.name.substring(0, 1) + this.user.lastName.substring(0, 1);
  }

  get title(): string {
    return `${this.user.name} ${this.user.lastName} ,id: ${this.user.id}`;
  }
}
</script>

<style scoped>
  .person{
    min-width: 3vw;
    min-height: 3vw;
    text-align: center;
    line-height: 3vw;
    font-size: 1vw;
  }
</style>