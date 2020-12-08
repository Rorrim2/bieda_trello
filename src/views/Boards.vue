<template>
  <div class="about py-auto bg-primary">
    <!-- Card -->

    <b-container class="align-content-center flex-fill" fluid="lg md">
      <b-card-group deck>
        <div v-for="board_s in boardsList">
          <single-board :board="board_s"/>
        </div>
        <b-card overlay img-src="../assets/add_item.png"
                footer="Add new board"
                footer-class="bg-dark"
                class="bg-transparent flex-fill text-light"
                v-b-modal.createnewboardmodal/>
      </b-card-group>
    </b-container>
    <b-modal id="createnewboardmodal" class="bg-light"
             title="Create Board" @ok="modalOk($event)">
      <b-form @submit.stop.prevent="onCreate" >
        <b-card-header>
          Board data
        </b-card-header>
        <b-form-group class="my-1" label="Title" label-for="titleboardh">
          <b-form-input type="text" id="titleboardh" required :state="valid_title"
                        v-model="board.title" placeholder="Enter title e.g. FooBar" />
        </b-form-group>
        <b-form-group class="my-1" label="Background-url" label-for="backgroundurlh">
          <b-form-input type="url" id="backgroundurlh" required
                        v-model="board.background" :state="not_empty_url"
                        placeholder="Enter url to image e.g my-website.com/img.png" />
        </b-form-group>
      </b-form>
    </b-modal>
    <!-- Card -->
  </div>
</template>

<script lang="ts">
import SingleBoard from "@/components/SingleBoard.vue";
import {Vue, Component} from "vue-property-decorator";
import {BoardPreview, dummyBoardPreview, dummyUser, User} from "@/data_models/types";

@Component({
  components: {SingleBoard}
})
export default class Boards extends Vue {

  private board: BoardPreview = dummyBoardPreview;
  private boardsList:Array<BoardPreview> = [];
  private user: User = dummyUser;

  onCreate() {
    if(!this.valid){
      console.log("invalid input");
      return;
    }
    console.log("persist board")
    this.boardsList.push({id:this.board.id, title: this.board.title, background: this.board.background})
    this.board.background = ''
    this.board.title = ''
  }

  created() {

  }

  get valid_title(): boolean{
    return !!this.board.title && this.board.title !== "";
  }

  get not_empty_url():boolean {
    return !!this.board.background && this.board.background !== "";
  }

  get valid(): boolean{
    return this.valid_title && this.not_empty_url;
  }

  modalOk(evt:Event){
    evt.preventDefault();
    this.onCreate();
  }

}
</script>

