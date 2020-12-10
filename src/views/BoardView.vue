<template>
  <div class="bg-primary h-100" style=" background-size: cover;" v-bind:style="{ backgroundImage: 'url(' + decoded + ')' }">
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
  dummyBoardModel,
  dummySingleListModel,
  SingleListModel,
  StorageDescriptor
} from "@/data_models/types";
import {decodeUrl, fetchBoard} from "@/utils";
import {getFromStorage} from "@/store";

@Component({
  components: {
    SingleList,
    SingleCard,
  }
})
export default class BoardView extends Vue {
  private list: SingleListModel = dummySingleListModel;
  private board: BoardModel = dummyBoardModel;

  get decoded() : string{
    if(this.board.background !== undefined)
      return decodeUrl(this.board.background);
    return "";
  }
  onCreate() {
    console.debug("DDDDD");
    //this.listOfLists.push(<SingleListModel>{name: this.list.name, listOfCards: []})
    this.list.title = ''
    console.log("BoardView")
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

