<template>
  <div class="bg-primary position-relative h-100 flex-column d-flex board-background my-0 py-0" @error="onError"
       v-bind:style="{ backgroundImage: 'url(' + decoded + ')' }">
    <b-overlay variant="dark" :show="fetchLoading" no-wrap/>
    <div v-if="fetchLoading" class="h-100 w-100">
    </div>
    <b-row v-if="!fetchLoading">
      <b-navbar class="w-100 mx-2 px-4 py-0 my-0" style="background-color: rgba(200,200,200, 0.7);">
        <b-navbar-brand class="text-dark py-0 my-0">
          <b-button v-show="!isEditingTitle" style="max-width: 150px; font-size: larger"
                    class="text-truncate text-nowrap btn border-0 bg-transparent h2 text-dark m-0 p-0 font-weight-bold"
                    @click="editTitle($event)" v-text="board.title"/>
          <b-form v-show="isEditingTitle" @focusout="onTitleSubmit($event)" @submit.prevent="onTitleSubmit($event)">
            <b-form-input type="text" class="mr-1" v-model="board.title" ref="boardTitle"
                          style="max-width: 150px;"/>
          </b-form>
        </b-navbar-brand>
        <b-navbar-nav>
          <b-nav-item v-b-modal.modal-change-board-visibility>
            <b-button variant="transparent" class="p-0" @click="setupVisibilityModal($event)">
              <b-icon v-if="board.isVisible" variant="secondary" icon="globe" title="Public"/>
              <b-icon v-if="!board.isVisible" variant="warning" icon="lock" title="Private"/>
            </b-button>
          </b-nav-item>
          <b-nav-item v-b-modal.view-members-of-board>
            <b-button variant="transparent" class="p-0" title="Show members">
              <b-icon variant="primary" icon="person"/>
              Members
            </b-button>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto py-0 my-0">
          <b-nav-item-dropdown no-flip toggle-class="align-top rounded-circle mx-auto px-0 py-0"
                               ref="d_down" @show="show_overlay($event)" text="Board's Menu" no-caret right>
            <b-dropdown-header variant="success" class="m-0 p-0">
              <div class="d-flex flex-row m-0 p-0 justify-content-between">
                <b class="pr-4 pl-5 ml-5 mr-5 my-0 d-inline-flex align-self-center">
                  <b>Menu</b>
                </b>
                <b-button @click="hide_overlay($event)" variant="danger"
                          class="float-right p-0 d-inline-flex flex-column justify-content-between text-center"
                          style="height: 30px; width:30px;">
                  <span aria-hidden="true" class="align-self-center " style="font-size: 1.1rem;">&times</span>
                </b-button>
              </div>
            </b-dropdown-header>
            <b-dropdown-divider class="w-100 "></b-dropdown-divider>
            <b-dropdown-item class="w-100 p-0" v-b-modal.modal-board-about>
              <b-button variant="outline-secondary" class="text-center border-0 w-100">
                About
              </b-button>
            </b-dropdown-item>
            <b-dropdown-divider class="w-100 "></b-dropdown-divider>
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
              <b-button variant="outline-dark" @click="setupVisibilityModal($event)"
                        class="text-center border-0 w-100">
                Edit table visibility
              </b-button>
            </b-dropdown-item>
            <b-dropdown-divider class="w-100 "></b-dropdown-divider>
            <b-dropdown-item class="w-100 p-0" v-b-modal.modal-change-board-visibility>
              <b-button variant="outline-secondary" class="text-center border-0 w-100">
                View board's activity
              </b-button>
            </b-dropdown-item>
            <b-dropdown-divider class="w-100 "></b-dropdown-divider>
            <b-dropdown-item class="w-100 p-0" v-b-modal.modal-board-close>
              <b-button variant="outline-danger" class="text-center border-0 w-100">
                Close
              </b-button>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-navbar>
    </b-row>

    <b-modal id="view-members-of-board" v-bind:title="`Members of ` + board.title.substring(0, 20) + `...`">
      <div>
        <b-container fluid>
          <b-row><h4>Maker:</h4></b-row>
          <b-row align-v="start">
            <UserBubble :user="board.maker" :badge_variant="`warning`" :badge="`star-fill`"/>
          </b-row>
        </b-container>
        <hr>
        <b-container fluid>
          <b-row><h4>Admins:</h4></b-row>
          <b-row align-v="start">
            <div class="mr-1" v-for="boardAdmin in board.admins">
              <UserBubble :user="boardAdmin" :badge_variant="`danger`" :badge="`shield-fill`"/>
            </div>
          </b-row>
        </b-container>
        <hr>
        <b-container fluid>
          <b-row><h4>Users:</h4></b-row>
          <b-row align-v="start">
            <div class="mr-1" v-for="boardUser in board.users">
              <UserBubble :user="boardUser"/>
            </div>
          </b-row>
        </b-container>
        <hr>
      </div>
      <template #modal-footer="{ ok }">
        <div class="w-100">
          <b-button type="ok"
                    variant="primary"
                    @click="ok()"
                    class="float-right" v-text="`OK`"/>
        </div>
      </template>
    </b-modal>

    <b-modal id="modal-change-board-name" @ok="modalOkName" title="Enter new table name">
      <b-form>
        <b-form-group @submit.prevent="handleName">
          <b-form-input id="name-input" v-model="name" required></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>

    <b-modal id="modal-change-board-back" @ok="modalOkBack" title="Enter new back url">
      <b-form>
        <b-form-group>
          <b-form-input id="name-input" v-model="back" type="url" required></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>

    <b-modal id="modal-change-board-visibility" @ok="modalOkVisible" title="Choose visibility option">
      <b-form-radio-group v-model="isVisible" label="Choose visibility option">
        <b-form-radio name="some-radios" value="Private">Private</b-form-radio>
        <b-form-radio name="some-radios" value="Public">Public</b-form-radio>
      </b-form-radio-group>
    </b-modal>

    <b-modal ok-only id="modal-board-about">

    </b-modal>

    <b-modal title="Are you sure to close this board?" cancel-title="No" ok-title="Yes" cancel-variant="success"
             ok-variant="danger" id="modal-board-close" @ok="closeBoard">

    </b-modal>

    <b-container fluid class="position-relative p-0 mx-0 my-auto" style="flex-grow: 1; ">
      <div class="absolute-stretched">
        <b-row align-v="start" align-h="start"
               class="position-relative h-100 mx-auto my-1 flex-nowrap d-flex"
               style="flex-grow: 1;">
          <div class="absolute-stretched no-wrap-and-select mb-2 pb-2 overflow-x">
            <div class="single-list h-100" v-for="list_s in board.lists">
              <single-list :list="list_s"></single-list>
            </div>
            <div class="single-list h-100">
              <b-card class="text-light" style="background-color: rgba(245,245,245, 0.3);"
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
              </b-card>
            </div>
          </div>
        </b-row>
      </div>
    </b-container>
  </div>
</template>
<style>
a.dropdown-item {
  padding: 0;
}

.btn:focus {
  box-shadow: none !important;
  outline: none !important;
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
import {createList, decodeUrl, fetchBoard} from "@/utils/functions";
import {getFromStorage} from "@/store";
import UserBubble from "@/components/UserBubble.vue";
import {BDropdown, BFormInput} from "bootstrap-vue";

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
  private boardName: string = "";
  private isVisible: string = "";
  private isEditingTitle: boolean = false;
  private show: boolean = false;
  private fetchLoading: boolean = true;

  get decoded(): string {
    console.debug("AHAHAHAHAH");
    if (this.board !== dummyBoardModel && this.board.background !== undefined)
      return decodeUrl(this.board.background);
    return require('../assets/temp.png');
  }

  onError(event: Event) {
    console.log("onError");
    (<any>event.target).style = `backgroundImage: 'url(${require('../assets/temp.png')})'`;
  }

  setupVisibilityModal(event: Event) {
    event.preventDefault();
    this.isVisible = this.board.isVisible ? 'Public' : 'Private';
  }

  editTitle(event: Event) {
    console.log("here")
    this.isEditingTitle = true;
    this.boardName = String(this.board.title);
    this.$nextTick(() => {
      const elem: BFormInput = <BFormInput>this.$refs.boardTitle;
      elem.focus();
      console.log(elem);
    });
  }

  onTitleSubmit(event: Event) {
    event.preventDefault();
    console.log(this.board.title);
    if (this.board.title == undefined || this.board.title === "") {
      this.board.title = this.boardName;
    }
    this.isEditingTitle = false;
  }

  onCreate() {
    console.debug("DDDDD");
    this.list.boardId = this.board.id;
    this.list.positionOnBoard = this.board.lists.length;
    createList(this.list, data => {
      this.board.lists.push(data.list);
    }, error => {
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

  modalOkName(evt: Event) {
    this.handleName();
  }

  closeBoard(evt: Event){

  }

  modalOkBack(evt: Event) {
    this.handleBack()
    console.debug("haha");
  }

  modalOkVisible() {
    this.board.isVisible = this.isVisible == "Public";
  }

  mounted() {
    fetchBoard(getFromStorage("opened-board", StorageDescriptor.session), data => {
      this.$nextTick(()=>{
        this.board = data;
      })
      setTimeout(() => {
        this.fetchLoading = false;
      }, 1000)
    }, error => {
      console.debug(error.message);
    });
  }
}
</script>

