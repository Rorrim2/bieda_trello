<template>
  <div>
    <b-card-group deck><div v-for="list_s in listOfLists"><single-list :list="list_s"></single-list></div></b-card-group>
  <div class="card text-light" style="width: 15vw; margin: 3vw; background-color: rgba(245,245,245, 0.3);" @submit="onCreate">
    <div class="card-body">
      <form>
        <p class="h3 text-center">Create list</p>
        <label for="defaultFormCardNameEx"  class="font-weight-light">List name</label>
        <input type="text" v-model="list.name" id="defaultFormCardNameEx" class="form-control">
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
import {dummySingleListModel, SingleListModel} from "@/data_models/types";

@Component({
  components: {
    SingleList,
    SingleCard,
  }
})
export default class BoardView extends Vue{
  private listOfLists: Array<SingleListModel> = [];
  private list: SingleListModel = dummySingleListModel;


  onCreate() {
      this.listOfLists.push({name: this.list.name, listOfCards: this.list.listOfCards})
      this.list.listOfCards = []
      this.list.name = ''
      console.log("BoardView")
  }

}
</script>

