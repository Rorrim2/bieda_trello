<template>
    <b-card
        @error="onError"
        :img-src="board.background === '' ? require('../assets/temp.png') : decoded"
        img-alt="Image"
        img-width="2%"
        align="right"
        overlay
        style="background-color: rgba(245,245,245, 0.3);"
        class="mb-2 w-100"
        ref="card"
        text-variant="light"
        footer-bg-variant="dark"
        footer-class="p-1">
      <template #footer>
        <div class="bv-example-row m-0 p-0">
          <b-row class="d-inline p-0 m-0">
            <b-card-text v-bind:title="board.title" class="col-8 text-left float-left pl-2 text-nowrap text-truncate">{{board.title}}</b-card-text>
            <b-button v-bind:to="'/b/'+ board.id +'/view'" variant="primary" class="text-center mt-2 mb-2 p-0 btn-sm col-4 ">
              Open
            </b-button>
          </b-row>
        </div>
      </template>
    </b-card>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";
import {BoardPreview} from "@/data_models/types";
import {decodeUrl} from "@/utils";

@Component
export default class SingleBoard extends Vue{
  @Prop() board!:BoardPreview;

  get decoded(): string {
    return decodeUrl(this.board.background);
  }
  mounted(){
    if(this.$refs.card)
      (<any>this.$refs.card).querySelector('img').onerror = this.onError;
  }
  onError(event: Event){
    console.log("onError");
    (<any>event.target).src = require('../assets/temp.png');
  }
};
</script>
<style>

</style>
