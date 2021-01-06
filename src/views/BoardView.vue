<template>
  <div class="bg-primary position-relative h-100 flex-column d-flex board-background my-0 py-0" @error="onError"
       v-bind:style="{ backgroundImage: 'url(' + decoded + ')' }">
    <b-overlay variant="dark" :show="fetchLoading" no-wrap/>
    <div v-if="fetchLoading" class="h-100 w-100">
    </div>

    <b-row v-if="!fetchLoading&&!board.isClosed">
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
              <b-button variant="outline-dark" @click="setupNameModal($event)" class="text-center border-0 w-100">
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
          <b-form-input id="name-input" v-model="board.title" required></b-form-input>
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
      You can reopen it again, whenever you want to, unless you delete it permanently.
    </b-modal>
    <b-container v-if="!fetchLoading&&board.isClosed">
      <div class="absolute-stretched">
        <b-container fluid class="position-relative h-100 align-self-center mx-0 my-auto d-flex overflow-y">
          <b-row align-v="center" align-h="center"
                 class="position-relative mx-auto my-1 flex-nowrap d-flex"
                 style="flex-grow: 1;">
            <b-jumbotron bg-variant="lighter" border-variant="dark" text-variant="dark">
              <template #header>
                <h2>{{ board.title }} is currently closed.</h2>
                <hr>
              </template>
              <template #lead>
                <p>This board is currently closed and you cannot show its contents. If you want to restore board from
                  archived items, press 'Reopen' button. If you want to permanently delete board, press 'Kill board'</p>
              </template>
              <hr>
              <b-container fluid>
                <b-row align-h="end">
                  <b-button variant="success" class="mr-1" @click="reopenBoard($event)">Reopen</b-button>
                  <b-button v-b-modal.close-board variant="danger">Kill board</b-button>
                </b-row>
              </b-container>
            </b-jumbotron>
            <b-modal id="close-board" title="Are you sure to delete this board?" cancel-title="Nope" ok-title="Yes. Kill!" cancel-variant="success"
                     ok-variant="danger"  @ok="deleteBoard">
              The whole history of board's activity and all board's data would be removed. Please take in consideration, that this action cannot be undone.
            </b-modal>

          </b-row>
        </b-container>
      </div>
    </b-container>
    <b-container v-if="!fetchLoading&&!board.isClosed" fluid class="position-relative p-0 mx-0 my-auto"
                 style="flex-grow: 1; ">
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
  dummyBoardModel,
  dummySingleListEntry,
  SingleListEntry,
  StorageDescriptor
} from "@/data_models/types";
import {
  changeBoardVisibility,
  closeBoard,
  createList,
  decodeUrl,
  deleteBoard,
  fetchBoard,
  reopenBoard,
  updateBoard
} from "@/utils/functions";
import {getFromStorage, removeFromStorage} from "@/store";
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
  private back: string = "";
  private boardName: string = "";
  private isVisible: string = "";
  private isEditingTitle: boolean = false;
  private show: boolean = false;
  private fetchLoading: boolean = true;

  get decoded(): string {
    if (this.board !== dummyBoardModel && this.board.background !== undefined)
      return decodeUrl(this.board.background);
    return require('../assets/temp.png');
  }

  onError(event: Event) {
    console.log("onError");
    (<any>event.target).style = `backgroundImage: 'url(${require('../assets/temp.png')})'`;
  }

  setupNameModal(event: Event) {
    event.preventDefault();
    this.boardName = String(this.board.title);
  }

  reopenBoard(event: Event) {
    event.preventDefault();
    reopenBoard(this.board.id, data => {
      this.board.isClosed = data.isClosed;
    }, error => {
      console.log(error);
    });
  }

  deleteBoard(event: Event){
    event.preventDefault();
    deleteBoard(this.board.id, data => {
      console.log(`is board of id: ${data.board.id} deleted? ${data.success}`);
      if(data.success){
        removeFromStorage('opened-board', StorageDescriptor.session);
        this.$router.push('/');
      }
    }, error => {
        console.log(error);
    });
  }

  setupVisibilityModal(event: Event) {
    event.preventDefault();
    this.isVisible = this.board.isVisible ? 'Public' : 'Private';
  }

  editTitle(event: Event) {
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
    this.isEditingTitle = false;
    console.log(this.board.title);

    if (this.board.title == undefined || this.board.title === "") {
      this.board.title = this.boardName;
    }

    if (this.board.title === this.boardName) {
      this.boardName = "";
      return;
    }
    this.boardName = "";
    this.updateBoard();
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
    if (this.board.title == undefined || this.board.title === "") {
      this.board.title = this.boardName;
    }
    if (this.board.title === this.boardName) {
      this.boardName = "";
      return;
    }
    this.boardName = "";
    this.updateBoard();
  }

  handleBack() {
    this.board.background = this.back;
    console.debug(this.board.background);

  }

  modalOkName(evt: Event) {
    this.handleName();
  }

  updateBoard() {
    updateBoard(this.board, data => {
      this.board = data;
    }, error => {
      console.log(error)
    });
  }

  closeBoard(evt: Event) {
    closeBoard(this.board.id, data => {
      this.board.isClosed = data.isClosed;
    }, error => {
      console.log(error);
    });
  }

  modalOkBack(evt: Event) {
    this.handleBack()
    console.debug("haha");
  }

  modalOkVisible() {
    this.board.isVisible = this.isVisible == "Public";
    changeBoardVisibility(this.board.id, this.board.isVisible, data => {
      this.board = data;
    }, error => {
      console.log(error)
    });
  }

  mounted() {
    fetchBoard(getFromStorage("opened-board", StorageDescriptor.session), data => {
      this.$nextTick(() => {
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

