<template>
  <div class="py-auto bg-primary">
    <!-- Card -->
    <p class="h2 font-weight-bold align-top text-light media-aside-right">Boards</p>
    <b-container fluid="lg md sm" class="flex-row">
      <b-row class="my-5 overflow-hidden " >
        <div style="width: 23rem!important;"
             class="m-0 col-6 col-md-4 col-lg-3 col-sm-6 overflow-hidden text-truncate"
             v-for="board_s in boardsList">
          <single-board :board="board_s" />
        </div>
        <div style="width: 23rem!important;" class="col-6 col-sm-6 col-md-4 col-lg-3">
          <b-card overlay img-src="../assets/add_item.png"
                  footer="Add new board"
                  footer-class="bg-dark text-truncate text-nowrap"
                  class="w-100 m-0 bg-transparent text-light"
                  v-b-modal.createnewboardmodal/>
        </div>
      </b-row>
    </b-container>
    <b-modal id="createnewboardmodal" class="bg-light"
             title="Create Board" @ok="modalOk($event)">
      <b-form @submit.prevent="onCreate" >
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
import {createBoard, decodeUrl, encodeUrl, fetchBoards} from "@/utils";

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
    console.log("persist board");
    createBoard({background:encodeUrl(this.board.background), title:this.board.title},
        data => {
      console.log(data);

      this.boardsList.push(data.board);
    }, error => {
      console.log(error.message);
    })
    //this.boardsList.push({id:this.board.id, title: this.board.title, background: this.board.background})
    this.board.background = ''
    this.board.title = ''
  }

  mounted() {
    fetchBoards(data => {
      console.debug(`data length: ${data.length}`);
      this.boardsList = data;
    }, error => {
      console.log(error.message);
    })
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
    this.onCreate();
  }

}
</script>
<style>
img.card-img {
  object-fit: cover; /* Do not scale the image */
  object-position: center; /* Center the image within the element */
  height: 150px;
  flex: fit-content;
  width: 100%;
}
</style>

