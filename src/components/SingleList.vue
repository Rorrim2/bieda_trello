<template>
  <div style="width: 15vw; margin: 3vw;">
    <b-card

        header-tag="header"
        style="max-width: 20rem; background-color: rgba(245,245,245, 0.3);"
        class="mb-2"
        text-variant="light">
      <template #header>
        <b-row>
        <h4>{{listModel.title}}</h4>
        <b-dropdown text="..."  no-caret right>
        <b-dropdown-item class="m-1 p-1" text-variant="light" v-b-modal.modal-change-list-name>Edit list name</b-dropdown-item>
      </b-dropdown></b-row></template>


      <b-modal id="modal-change-list-name" @ok="modalOkName" title="Enter new table name">
        <b-form>
          <b-form-group @submit.prevent="handleName">
            <b-form-input id="name-input" v-model="name" required></b-form-input>
          </b-form-group>
        </b-form>
      </b-modal>

      <div v-for="card_s in listModel.cards">
        <single-card :card="card_s"></single-card>
      </div>

      <b-button variant="secondary"
                style="margin: 1vw;" type="button" v-text="`Add Card`"
                v-b-modal.createnewcardmodal/>
    </b-card>



    <b-modal id="createnewcardmodal" class="bg-light"
             title="Create Card" @ok="modalOk($event)">
      <b-form @submit.prevent="onCreateCard" >
        <b-card-header>
          Card title
        </b-card-header>
        <b-form-group class="my-1" label="Title" label-for="titlecard">
          <b-form-input type="text" id="titlecard" required :state="valid_title"
                        v-model="cardName" placeholder="Enter title e.g. FooBar" />
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
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
import {createCard, fetchList} from '@/utils';

@Component({
  components: {
    SingleCard
  },
  watch:{
    list:  {handler(val:SingleListPreview, oldVal: SingleListPreview) {
        (<SingleList>this).listChanged();
    }
  }}
})
export default class SingleList extends Vue {
  @Prop() list!: SingleListPreview;
  private name: string = "";
  private cardName: string = "";
  private listModel: SingleListModel = dummySingleListModel;
  private card: SingleCardModel = dummySingleCardModel;
  mounted(){
    this.listChanged();
  }
  listChanged(){
    fetchList(this.list.id, data => {
      this.listModel = data;
      console.debug("jabadabadu");
    }, error => {
      console.log(error.message);
    })
  }
  onCreateCard(event:Event) {
    //TODO I completely messed it up. I don't even know where. Good luck!
    this.card.title = this.cardName
    createCard({list_id:this.list.id, title:this.card.title}, data => {
      this.listChanged()
    }, error => {console.log(error.message);});
    console.log("single list");
    this.cardName = ''
  }

  get valid_title(): boolean{
    return !!this.card.title && this.card.title !== "";
  }

  modalOk(evt:Event){
    this.onCreateCard(evt);
  }
  handleName() {
    this.listModel.title = this.name;
  }
  modalOkName(evt:Event){
    this.handleName();
  }
}

</script>

