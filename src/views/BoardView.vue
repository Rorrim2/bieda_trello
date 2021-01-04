<template>
  <div class="bg-primary my-0 py-0" style="background-position-x: center; background-size: cover;" @error="onError"
       v-bind:style="{ backgroundImage: 'url(' + decoded + ')' }">
    <b-row>
      <b-navbar class="w-100 mx-2 px-4 py-0 my-0" style="background-color: rgba(200,200,200, 0.7);">
        <b-navbar-brand class="text-dark py-0 my-0">
          <b-nav-text style="font-size: larger" class="h2 text-dark m-0 p-0 font-weight-bold" v-text="board.title"/>
        </b-navbar-brand>
        <b-navbar-nav>

        </b-navbar-nav>
        <b-navbar-nav class="ml-auto py-0 my-0">
          <b-nav-item-dropdown no-flip toggle-class="align-top rounded-circle mx-auto px-0 py-0"
                               ref="d_down"  @show="show_overlay($event)" text="Board's Menu" no-caret right>

            <b-dropdown-header variant="success" class="m-0 p-0">
              <div class="d-flex flex-row m-0 p-0 justify-content-between">
                <b class="pr-4 pl-5 ml-5 mr-5 my-0 d-inline-flex align-self-center">
                  <b>Menu</b>
                </b>
                <b-button @click="hide_overlay($event)" variant="danger"
                          class="float-right p-0 d-inline-flex flex-column justify-content-between text-center" style="height: 30px; width:30px;">
                  <span aria-hidden="true" class="align-self-center " style="font-size: 1.1rem;" >&times</span>
                </b-button>
              </div>
            </b-dropdown-header>
            <b-dropdown-divider class="w-100 "></b-dropdown-divider>
            <b-dropdown-item class="w-100 p-0">
              <b-button variant="outline-dark" class="text-center border-0 w-100">
                About
              </b-button>
              <b-dropdown-divider class="w-100 "></b-dropdown-divider>

            </b-dropdown-item>
            <b-dropdown-item class="w-100 p-0" v-b-modal.modal-change-board-name>
              <b-button variant="outline-dark" class="text-center border-0 w-100">
                Edit board name
              </b-button>
            </b-dropdown-item>
            <b-dropdown-item class="w-100 p-0" v-b-modal.modal-change-board-back>
              <b-button variant="outline-dark" class="text-center border-0 w-100">
                Edit table background
              </b-button>
            </b-dropdown-item>
            <b-dropdown-item class="w-100 p-0" v-b-modal.modal-change-board-visibility>
              <b-button variant="outline-dark" class="text-center border-0 w-100">
                Edit table visibility
              </b-button>
            </b-dropdown-item>
            <b-dropdown-divider class="w-100 "></b-dropdown-divider>

            <b-dropdown-item class="w-100 p-0" href="#">
              <b-button variant="outline-danger" class="text-center border-0 w-100">
                Close
              </b-button>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-navbar>
    </b-row>

    <b-modal id="modal-change-board-name" @ok="modalOkName" title="Enter new table name">
      <b-form>
        <b-form-group @submit.prevent="handleName">
          <b-form-input id="name-input" v-model="name" required></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>

    <b-modal id="modal-change-board-back" @ok="modalOkBack" title="Enter new back url">
      <b-form>
        <b-form-group >
          <b-form-input id="name-input" v-model="back" type="url" required></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>

    <b-modal id="modal-change-board-visibility" @ok="modalOkVisible" title="Choose visibility option">
      <b-form-group label="Choose visibility option">
        <b-form-radio v-model="isVisible" name="some-radios" value="private">Private</b-form-radio>
        <b-form-radio v-model="isVisible" name="some-radios" value="public">Public</b-form-radio>
      </b-form-group>
    </b-modal>

    <b-card-group deck>
      <div v-for="list_s in board.lists">
        <single-list :list="list_s"></single-list>
      </div>
    </b-card-group>
    <div class="card text-light" style="width: 15vw; margin: 3vw; background-color: rgba(245,245,245, 0.3);"
         @submit.prevent="onCreate">
      <div class="card-body">
        <form>
          <p class="h3 text-center">Create list</p>
          <label for="defaultFormCardNameEx" class="font-weight-light">List name</label>
          <input type="text" v-model="list.title" id="defaultFormCardNameEx" class="form-control">
          <br>
          <div class="text-center" style="margin: 1vw;">
            <button class="btn bg-secondary text-light" type="submit">Create list</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style>
a.dropdown-item {
  padding: 0;
}

.btn:focus{
  box-shadow: none!important;
  outline: none!important;
}
</style>
<script lang="ts">

import SingleList from "@/components/SingleList.vue";
import SingleCard from "@/components/SingleCard.vue";
import {Component, Vue} from "vue-property-decorator";
import {
  BoardModel,
  dummyBoardModel, dummySingleListEntry,
  dummySingleListModel, SingleListEntry,
  SingleListModel,
  StorageDescriptor
} from "@/data_models/types";
import {createList, decodeUrl, fetchBoard} from "@/utils";
import {getFromStorage} from "@/store";
import UserBubble from "@/components/UserBubble.vue";
import {BDropdown} from "bootstrap-vue";

@Component({
  components: {
    UserBubble,
    SingleList,
    SingleCard,
  }
})
export default class BoardView extends Vue {
  private list: SingleListEntry = dummySingleListEntry;
  private board: BoardModel = dummyBoardModel;
  private name: string = "";
  private back: string = "";
  private isVisible: string = "";
  private show: boolean = false;
  get decoded(): string {
    console.debug("AHAHAHAHAH");
    if (this.board.background !== undefined)
      return decodeUrl(this.board.background);
    return require('../assets/temp.png');
  }

  onError(event: Event){
    console.log("onError");
    (<any>event.target).style =`backgroundImage: 'url(${require('../assets/temp.png')})'`;
  }

  onCreate() {
    console.debug("DDDDD");
    this.list.boardId = this.board.id;
    this.list.positionOnBoard = this.board.lists.length;
    createList(this.list, data =>{
        this.board.lists.push(data.list);
      }, error=>{
      console.log(error.message);
    });
    //this.listOfLists.push(<SingleListModel>{name: this.list.name, listOfCards: []})
    this.list.title = ''
    console.log("BoardView")
  }

  show_overlay(evt: Event) {
    this.show = true;
  }


  hide_overlay(evt: Event) {
    this.show = false;
    const dropdown = this.$refs.d_down as BDropdown;
    dropdown.hide();
  }

  handleName() {
    this.board.title = this.name;
  }

  handleBack() {
    this.board.background = this.back;
    console.debug(this.board.background)
    this.$forceUpdate();
  }

  modalOkName(evt:Event){
    this.handleName();
  }

  modalOkBack(evt:Event){
    this.handleBack()
    console.debug("haha");
  }

  modalOkVisible() {
    this.board.isVisible = this.isVisible == "public";
  }
mounted() {
    fetchBoard(getFromStorage("opened-board", StorageDescriptor.session), data => {
      this.board = data;
    }, error => {
      console.debug(error.message);
    });
  }
}
</script>

