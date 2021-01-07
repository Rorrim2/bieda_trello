<template>
    <div>
      <b-button variant="light" style="margin: 2px;" v-b-modal = "editCardModalName">{{card.title}}</b-button>
      <b-modal :id=editCardModalName ok-only modal-tall>
        <template #modal-header="{ close }">
            <b-button v-show="!isEditingTitle" v-text="card.title"
                      class="text-truncate text-nowrap btn border-0 bg-transparent h2 text-dark m-0 p-0 font-weight-bold"
                      @click="editTitle($event)">
            </b-button>
            <b-form v-show="isEditingTitle" @focusout="onTitleSubmit($event)" @submit.prevent="onTitleSubmit($event)">
              <b-form-input type="text" class="mr-1" v-model="card.title" ref="cardTitle"
                            style="max-width: 150px;"/>
            </b-form>
        </template>
        <h5><b-icon variant="primary" icon="archive-fill" /> Description</h5>
        <div v-if=this.isEditingDescription @focusout="onDescriptionSubmit($event)">
            <b-form-input v-model="card.description" rows="3" max-rows="6"></b-form-input>
          <b-button variant="success" @click="onDescriptionSubmit($event)">Save</b-button>
          <b-button variant="warning" @click="onCancelButton($event)">Cancel</b-button>
        </div>
        <div v-else>
          <p class="my-4">{{card.description}}</p>
          <b-button variant="secondary" @click="editDescription($event)">Edit</b-button>
        </div>

        <hr>
        <h5><b-icon variant="primary" icon="book-half" /> Activities</h5>
        <div v-for="activity in activities">
          <activity-component :activity="activity"></activity-component>
        </div>

      </b-modal>
    </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";
import {ActivityModel, SingleCardModel} from "@/data_models/types";
import {BFormInput} from "bootstrap-vue";
import {editCardsTitleAndDescription} from "@/utils/db_operations/cards";
import {fetchActivitiesByCard} from "@/utils/db_operations/activities";
import ActivityComponent from "@/components/ActivityComponent.vue";
@Component({
  components: {ActivityComponent}
})
export default class SingleCard extends Vue{
  @Prop() card!: SingleCardModel;
  private activities: Array<ActivityModel> = [];

  private editCardModalName = 'edit-modal-card' + this.card.id;
  private isEditingTitle: boolean = false;
  private isEditingDescription: boolean = false;
  private cardName: string = '';
  private description: string = '';

  mounted(): void {
    fetchActivitiesByCard(this.card.id, data => {
      this.activities = data;
    }, error => {
      console.log(error)
    });
  }

  updateCard() {
    editCardsTitleAndDescription(this.card, data => {
      this.card = data.card
    }, error => {
      console.log(error)
    });
  }

  editTitle(event: Event) {
    this.isEditingTitle = true;
    this.cardName = String(this.card.title);
    this.$nextTick(() => {
      const elem: BFormInput = <BFormInput>this.$refs.cardTitle;
      elem.focus();
      console.log(elem);
    })};

  onTitleSubmit(event: Event) {
    event.preventDefault();
    this.isEditingTitle = false;
    console.log(this.card.title);

    if (this.card.title == undefined || this.card.title === "") {
      this.card.title = this.cardName;
    }

    if(this.card.title === this.cardName) {
      this.cardName = "";
      return;
    }
    this.cardName = "";
    this.updateCard();
  }

  editDescription(event: Event) {
    this.isEditingDescription = true;
    this.description = String(this.card.description)
  };

  onDescriptionSubmit(event: Event) {
    event.preventDefault();
    this.isEditingDescription = false;
    console.log(this.card.description);

    if (this.card.description == undefined || this.card.description === "") {
      this.card.description = this.description;
    }

    if(this.card.description === this.description) {
      this.description = "";
      return;
    }
    this.description = "";
    this.updateCard();
  }

  onCancelButton(event: Event) {
    this.isEditingDescription = false;
    this.description = '';
  }
}
</script>

