<template>
  <div>
    <b-card-group deck><div v-for="list_s in listOfLists"><single-list :list="list_s"></single-list></div></b-card-group>
  <div class="card bg-light text-primary" style="width: 15vw; margin: 3vw;" @submit="onCreate">
    <div class="card-body">
      <form>
        <p class="h3 text-center">Create list</p>
        <!-- Default input name -->
        <label for="defaultFormCardNameEx"  class="grey-text font-weight-light">List name</label>
        <input type="text" v-model="list.name" id="defaultFormCardNameEx" class="form-control">
        <br>
        <div class="text-center" style="margin: 1vw;">
          <button class="btn bg-primary text-light" type="submit">Create list</button>
        </div>
      </form>
    </div>
    <!-- Card body -->
  </div>
  </div>
</template>

<script>
import SingleList from "@/components/SingleList";

export default {
name: "BoardView",
  components: {
  SingleList
  },
  data: () => ({
    listOfLists: [],
    list: {
      name: '',
      listOfCards: [],
    }
  }),
  methods: {
    onCreate() {
      this.listOfLists.push({name: this.list.name, listOfCards: this.list.listOfCards})
      this.list.listOfCards = []
      this.list.name = ''
    }
  }
}
</script>

