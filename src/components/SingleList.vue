<template>
  <b-card header-class="list-drag-header py-0" footer-class="py-1 my-0"
          style="background-color: rgba(200,200,200, 0.6);"
          text-variant="dark">
    <template #header>
      <b-row align-h="between" align-v="center">
        <b-button v-show="!isEditingTitle" @click="editTitle($event)" :title="listModel.title" class="text-left btn border-0 bg-transparent
          text-dark py-0 px-auto mx-0 px-1" style="max-width: 207px">
          <h6 class="mx-0 text-truncate font-weight-bold"
              style="max-width: 205px;">{{ listModel.title }}</h6>
        </b-button>
        <b-form v-show="isEditingTitle" @focusout="onTitleSubmit($event)" @submit.prevent="onTitleSubmit($event)">
          <b-form-input type="text" class="mr-1" v-model="listName" ref="listTitle"
                        style="max-width: 207px;"/>
        </b-form>
        <b-dropdown variant="dark" no-caret right toggle-class="bg-transparent">
          <template #button-content>
            <b-icon icon="three-dots-vertical">
            </b-icon>
          </template>
          <b-dropdown-header>List options</b-dropdown-header>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item class="m-1 p-1" text-variant="light"
                           v-b-modal.modal-change-list-name>Edit list name
          </b-dropdown-item>
          <b-dropdown-item class="m-1 p-1">
            Add card
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item class="m-1 p-1">
            Move list
          </b-dropdown-item>
          <b-dropdown-item class="m-1 p-1">
            Copy list
          </b-dropdown-item>
          <b-dropdown-divider v-if="!listModel.isHidden"></b-dropdown-divider>
          <b-dropdown-item class="m-1 p-1" v-if="!listModel.isHidden">
            Hide list
          </b-dropdown-item>
        </b-dropdown>
      </b-row>
    </template>

    <template #footer>
      <b-button v-show="!creatingCard" @click=onAddCardClick variant="secondary"
                class="w-100" type="button" v-text="`Add Card`"/>
      <b-form  class="py-0" v-show="creatingCard" @submit.prevent="onCreateCard">
          <b-row align-v="center" align-h="center" class="flex-nowrap flex-row d-flex">
            <b-form-input ref="cardCreator" v-model="newCardTitle" :id=editCardModalName type="text"/>
            <b-button title="Save" type="submit" value="" class="p-0 ml-1 btn bg-primary border-0 text-light">
              <b-icon icon="plus-square-fill" class="p-0 m-0"/>
            </b-button>
          </b-row>
      </b-form>
    </template>

    <div class="overflow-y">
      <Container>
        <Draggable v-for="card_s in listModel.cards" :key="card_s.id">
          <single-card :card="card_s"></single-card>
        </Draggable>
      </Container>
    </div>
    <b-modal id="modal-change-list-name" @ok="modalOkName" title="Enter new list name">
      <b-form>
        <b-form-group @submit.prevent="handleName">
          <b-form-input id="name-input" v-model="name" required></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>

  </b-card>
</template>
<style scoped>
.card-body {
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
  dummySingleListModel,
  SingleListModel,
  SingleListPreview
} from "@/data_models/types";
import {createCard} from '@/utils/db_operations/cards';
import {fetchList, updateTitleOfList} from '@/utils/db_operations/lists';
import {BFormInput} from "bootstrap-vue";

@Component({
  components: {
    SingleCard,
    Draggable,
    Container
  }
})

export default class SingleList extends Vue {
  @Prop() list!: SingleListPreview;
  @Prop() canBeEdited!: boolean;
  private name: string = "";
  private listModel: SingleListModel = dummySingleListModel;
  private listName: string = "";
  private isEditingTitle: boolean = false;
  private creatingCard: boolean = false;
  private newCardTitle: string = "";
  private editCardModalName: string = "editCardModalName" + this.list.id;

  mounted() {
    this.listChanged();
  }

  @Watch('list', {immediate: true, deep: true})
  listChanged() {
    fetchList(this.list.id, data => {
      this.listModel = data;
      console.debug("jabadabadu");
    }, error => {
      console.log(error.message);
    })
  }

  setupNameModal(event: Event) {
    event.preventDefault();
    this.listName = String(this.listModel.title);
  }

  editTitle(event: Event) {
    console.log('clicked list header')
    this.isEditingTitle = true;
    this.listName = String(this.listModel.title);
    this.$nextTick(() => {
      const elem: BFormInput = <BFormInput>this.$refs.listTitle;
      elem.focus();
      console.log(elem);
    });
  }

  onTitleSubmit(event: Event) {
    event.preventDefault();
    this.isEditingTitle = false;
    console.log(this.listModel.title);

    if (this.listName == undefined || this.listName === "") {
      return;
    }

    if (this.listModel.title === this.listName) {
      this.listName = "";
      return;
    }

    this.listModel.title = this.listName;

    this.listName = "";
    this.updateListName();
  }

  updateListName() {
    updateTitleOfList(this.listModel.id, this.listModel.title, data => {
      console.log(`updated list ${data}`)
    }, error => {
      console.log(error)
    })
  }

  onAddCardClick(event: Event) {
    this.creatingCard = true;
    this.$nextTick(() => {
      const elem: BFormInput = <BFormInput>this.$refs.cardCreator;
      elem.focus();
      console.log(elem);
    });
  }

  onCreateCard(event: Event) {
    if(!this.valid_title) {
      this.newCardTitle = ''
      this.creatingCard = false;
      return;
    }
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
    return !!this.newCardTitle && this.newCardTitle !== "";
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

