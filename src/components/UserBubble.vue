<template>
  <div class="rounded-circle person bg-info" :title="title">
    <span>{{shortenUser}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {User} from "@/data_models/types";
import {getFromLocalStorage} from "@/utils";

@Component
export default class UserBubble extends Vue{

  public get user(): User {
    return this._user;
  }

  public set user(value: User) {
    console.debug(`user is from value: ${value.id} + ${value.lastName} + ${value.name}`)
    this._user = value;
  }

  get shortenUser(): string{
    return this._user.name.substring(0,1) + this._user.lastName.substring(0,1);
  }

  get title(): string{
    return `${this._user.name} ${this._user.lastName} ,id: ${this._user.id}`;
  }

  created(){
      if(!this.user){
        this.user = <User> getFromLocalStorage("active_user") ?? <User> {};
      }
  }

  private _user: User = <User> {};
}


</script>

<style scoped>
  .person{
    min-width: 3vw;
    min-height: 3vw;
    text-align: center;
    line-height: 3vw;
  }
</style>