<template>
  <div>
    <form v-if="this.creatingCard" @submit.prevent="onCardCreate">
      <label for="defaultFormCardNameEx"  class="grey-text font-weight-light">Card text</label>
      <input type="text" v-model="card.title" id="defaultFormCardNameEx" class="form-control">
      <br>
      <div class="text-center" style="margin: 1vw;">
        <button class="btn bg-primary text-light" type="submit">Save</button>
      </div>
    </form>
    <div v-else>
<!--      TODO modal-to-card must be replaced with valid card id - and check if this works-->
      <b-button variant="light" style="margin: 2px;" v-b-modal.modal-to-card>{{card.title}}</b-button>
      <b-modal id="modal-to-card" ok-only>
<!--        :title=card.text-->
        <template #modal-header="{ close }">
          <div>
            <h4 class="modal-title">{{ card.title }}</h4>
            <b-button variant="danger" type="button" @click="close()">
              Close
            </b-button>
            <b-button variant="secondary" type="button" >
              Edit title
            </b-button>
          </div>
        </template>

        <h3>Description</h3>
        <div v-if="this.editing">

            <b-form-textarea
                id="textarea" v-model="inputText" rows="3" max-rows="6"
            ></b-form-textarea>
          <b-button variant="success" @click="onSaveButton">Save</b-button>
          <b-button variant="warning" @click="onCancelButton">Cancel</b-button>
        </div>
        <div v-else>
          <p class="my-4">{{this.descriptionText}}</p>

          <b-button variant="secondary" @click="onEditButton">Edit</b-button>
        </div>

      </b-modal>
    </div>
  </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";
import {SingleCardModel} from "@/data_models/types";

@Component
export default class SingleCard extends Vue{
  @Prop() card!: SingleCardModel;

  private creatingCard: boolean = true;
  private descriptionText: string = "Enter some text";
  private editing: boolean = true;
  private inputText: string = '';
  onCardCreate() {
      this.creatingCard = false
  }
  onEditButton() {
      this.inputText = this.descriptionText
      this.editing = true
  }
  onSaveButton() {
      this.descriptionText = this.inputText
      this.editing = false
  }
  onCancelButton() {
      this.editing = false
  }
}
</script>

