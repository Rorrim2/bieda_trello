<template>
  <b-card
      style="background-color: rgba(200,200,200, 0.6);"
      text-variant="dark">
    <template #header>
      <b-row align-h="between" align-v="center">
        <h6 :title="listModel.title" class="ml-2 text-truncate font-weight-bold" style="max-width: 202px;" >{{ listModel.title }}</h6>
        <b-dropdown variant="dark" no-caret right toggle-class="bg-transparent">
          <template #button-content>
            <b-icon icon="three-dots-vertical">
            </b-icon>
          </template>
          <b-dropdown-item class="m-1 p-1" text-variant="light"
                           v-b-modal.modal-change-list-name>Edit list name
          </b-dropdown-item>
        </b-dropdown>
      </b-row>
    </template>

    <template #footer>
      <b-button v-if="!creatingCard" @click=onAddCardClick variant="secondary"
                style="margin: 1vw;" type="button" v-text="`Add Card`"/>
      <form v-else @submit.prevent="onCreateCard">
        <label :for=editCardModalName  class="grey-text font-weight-light">Card text</label>
        <input type="text" v-model="newCardTitle" :id=editCardModalName class="form-control">
        <div class="text-center" style="margin: 1vw;">
          <input type="submit" value="Save" class="btn bg-primary text-light">
        </div>
      </form>
    </template>

    <div class="overflow-y">
        <Container>
          <Draggable v-for="card_s in listModel.cards" :key="card_s.id">
            <single-card :card="card_s"></single-card>
          </Draggable>
        </Container>
    </div>

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

  </b-card>
</template>
<style scoped>
.card-body{
  margin-top: 0;
  margin-bottom: 0;
  padding-bottom: 1px;
  padding-top: 1px;
}
</style>
<script lang="ts">
import SingleCard from "@/components/SingleCard.vue";
import {Draggable, Container} from "vue-smooth-dnd";
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
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
    SingleCard,
    Draggable,
    Container
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

  @Watch('list', { immediate: true, deep: true })
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

