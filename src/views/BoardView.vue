<template>
  <div class="bg-primary h-100 pt-0" style=" background-size: cover;" @error="onError"
       v-bind:style="{ backgroundImage: 'url(' + decoded + ')' }">
    <b-row>
      <b-navbar class="w-100 mx-2 px-4" style="background-color: rgba(200,200,200, 0.7);">
        <b-navbar-brand class="text-dark">
          <b-nav-text class="h2 text-dark font-weight-bold" v-text="board.title"/>
        </b-navbar-brand>
        <b-navbar-nav>

        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Edit" no-caret right>
            <b-dropdown-item class="m-1 p-1"  v-b-modal.modal-change-board-name>Edit table name</b-dropdown-item>
            <b-dropdown-item class="m-1 p-1" v-b-modal.modal-change-board-back>Edit table background</b-dropdown-item>
            <b-dropdown-item class="m-1 p-1" v-b-modal.modal-change-board-visibility>Edit table visibility</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item href="#">Close</b-nav-item>
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

