<template>
  <div style="width: 15vw; margin: 3vw;">

    <b-card
        :title="board.title"
        :img-src="board.background"
        img-alt="Image"
        img-top
        style="max-width: 20rem;  background-color: rgba(64,81,78, 0.6);"
        class="mb-2"
    text-variant="light">
      <b-row>
        <b-button v-bind:to="'/view'" v-bind:disabled="isBlocked" variant="primary" style="margin: 0.5vw;">
          Open
        </b-button>

      <b-button variant="warning" style="margin: 0.5vw;" @click="onBlockButton">
        {{this.block}}
      </b-button></b-row>
      <template #footer>
      <b-button variant="secondary" v-bind:disabled="isBlocked" style="margin: 0.5vw; align-content: end;">
        Edit
      </b-button>
<!--        <div v-if="this.isVisible">-->
<!--        <b-button variant="danger"  style="margin: 0.5vw; align-content: end;">-->
<!--          Delete-->
<!--        </b-button></div>-->
    </template>
    </b-card>
    <b-modal id="editboardmodal" class="bg-light"
             title="Edit Board" @ok="modalOk($event)">
      <b-form @submit.stop.prevent="onEdit" >
        <b-card-header>
          Board data
        </b-card-header>
        <b-form-group class="my-1" label="Title" label-for="titleboardh">
          <b-form-input type="text" id="titleboardh" required :state="valid_title"
                        v-model="board.title" placeholder="Enter title e.g. FooBar" />
        </b-form-group>
        <b-form-group class="my-1" label="Background-url" label-for="backgroundurlh">
          <b-form-input type="url" id="backgroundurlh" required
                        v-model="board.background" :state="not_empty_url"
                        placeholder="Enter url to image e.g my-website.com/img.png" />
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";
import {BoardPreview} from "@/data_models/types";

@Component
export default class SingleBoard extends Vue{
  @Prop() board!:BoardPreview;

  private isBlocked: boolean = false;
  private block: string = "Block";
  private isVisible: boolean = false;

  onBlockButton() {
      this.isBlocked = !this.isBlocked
      if(this.block == "Block") {
        this.block = "Unblock"
      }
        else {
          this.block = "Block"
      }
      this.isVisible = !this.isVisible
  }
  modalOk(evt:Event){
    evt.preventDefault();
    this.onEdit();
  }
  onEdit() {
    if(!this.valid){
      console.log("invalid input");
      return;
    }
    console.log("persist board")
    this.boardsList.push({id:this.board.id, title: this.board.title, background: this.board.background})
    this.board.background = ''
    this.board.title = ''
  }
};
</script>

