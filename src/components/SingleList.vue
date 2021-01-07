<template>
  <b-card
      style="background-color: rgba(245,245,245, 0.3);"
      text-variant="light">
    <template #header>
      <b-row>
        <h4 class="text-truncate">{{ listModel.title }}</h4>
        <b-dropdown text="..." no-caret right>
          <b-dropdown-item class="m-1 p-1" text-variant="light" v-b-modal.modal-change-list-name>Edit list name
          </b-dropdown-item>
        </b-dropdown>
      </b-row>
    </template>
    <b-modal id="createnewcardmodal" class="bg-light"
             title="Create Card" @ok="modalOk($event)">
      <b-form @submit.prevent="onCreateCard">
        <b-card-header>
          Card title
        </b-card-header>
        <b-form-group class="my-1" label="Title" label-for="titlecard">
          <b-form-input type="text" id="titlecard" required :state="valid_title"
                        v-model="cardName" placeholder="Enter title e.g. FooBar"/>
        </b-form-group>
      </b-form>
    </b-modal>

    <b-modal id="modal-change-list-name" @ok="modalOkName" title="Enter new table name">
      <b-form>
        <b-form-group @submit.prevent="handleName">
          <b-form-input id="name-input" v-model="name" required></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
    <div class="card-body">
      <div v-for="card_s in listModel.cards">
        <single-card :card="card_s"></single-card>
      </div>

      <b-button v-if="!this.creatingCard" @click=onAddCardClick variant="secondary"
                style="margin: 1vw;" type="button" v-text="`Add Card`"/>
      <form v-else @submit.prevent="onCreateCard">
        <label :for=editCardModalName  class="grey-text font-weight-light">Card text</label>
        <input type="text" v-model="newCardTitle" :id=editCardModalName class="form-control">
        <div class="text-center" style="margin: 1vw;">
          <input type="submit" value="Save" class="btn bg-primary text-light">
        </div>
      </form>

    </div>
  </b-card>
</template>

<script lang="ts">
import SingleCard from "@/components/SingleCard.vue";
import {Component, Prop, Vue} from "vue-property-decorator";
import {
  dummySingleCardModel,
  dummySingleListModel,
  SingleCardModel,
  SingleListModel,
  SingleListPreview
} from "@/data_models/types";
import {createCard} from '@/utils/db_operations/cards';
import {fetchList} from '@/utils/db_operations/lists';

@Component({
  components: {
    SingleCard
  },
  watch: {
    list: {
      handler(val: SingleListPreview, oldVal: SingleListPreview) {
        (<SingleList>this).listChanged();
      }
    }
  }
})
export default class SingleList extends Vue {
  @Prop() list!: SingleListPreview;
  private name: string = "";
  private cardName: string = "";
  private listModel: SingleListModel = dummySingleListModel;
  private card: SingleCardModel = dummySingleCardModel;

  private creatingCard: boolean = false;
  private newCardTitle: string = "";
  private editCardModalName: string = "editCardModalName" + this.list.id;

  mounted() {
    this.listChanged();
  }

  listChanged() {
    fetchList(this.list.id, data => {
      this.listModel = data;
      console.debug("jabadabadu");
    }, error => {
      console.log(error.message);
    })
  }

  onAddCardClick(event: Event) {
    this.creatingCard = !this.creatingCard;
  }

  onCreateCard(event: Event) {
    createCard({list_id: this.list.id, title: this.newCardTitle}, data => {
      this.listModel.cards.push(data.card)
    }, error => {
      console.log(error.message);
    });
    console.log("single list");
    this.newCardTitle = ''
    this.creatingCard = false;
  }

  get valid_title(): boolean {
    return !!this.card.title && this.card.title !== "";
  }

  modalOk(evt: Event) {
    this.onCreateCard(evt);
  }

  handleName() {
    this.listModel.title = this.name;
  }

  modalOkName(evt: Event) {
    this.handleName();
  }
}

</script>

