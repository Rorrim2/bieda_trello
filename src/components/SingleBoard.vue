<template>
  <div style="width: 15vw; margin: 3vw;">
    <b-card
        :title="board.title"
        :img-src="board.background"
        img-alt="Image"
        img-top
        style="max-width: 20rem;  background-color: rgba(245,245,245, 0.3);"
        class="mb-2"
    text-variant="light">
        <b-button v-bind:to="'/b/'+ board.id +'/view'" variant="primary" style="margin: 1vw;">
          Go to board
        </b-button>
    </b-card>
  </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";
import {BoardPreview} from "@/data_models/types";

@Component
export default class SingleBoard extends Vue{
  @Prop() board!:BoardPreview;
};
</script>

