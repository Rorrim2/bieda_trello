<template>
  <div>
  <!-- Card -->
    <b-card-group deck><div v-for="board_s in boardsList"><single-board :board="board_s"></single-board></div></b-card-group>
  <div class="card text-primary" style="width: 15vw; margin: 3vw; background-color: rgba(245,245,245, 0.3);" @submit="onCreate">
    <div class="card-body">
      <form>
        <p class="h3 text-center">Create board</p>
        <!-- Default input name -->
        <label for="defaultFormCardNameEx"  class="grey-text font-weight-light">Board name</label>
        <input type="text" v-model="board.name" id="defaultFormCardNameEx" class="form-control">
        <br>
        <label for="defaultFormCardUrl" class="font-weight-light">Background url</label>
        <input type="url" v-model="board.background_url" id="defaultFormCardUrl" class="form-control">

        <div class="text-center" style="margin: 1vw;">
          <button class="btn bg-primary text-light" type="submit">Create board</button>
        </div>
      </form>
    </div>
    <!-- Card body -->
  </div>

  <!-- Card -->
  </div>
</template>

<script>
import SingleBoard from "@/components/SingleBoard";

export default {
  name: "Boards",
  components: {
   SingleBoard,
  },
  data: () => ({
   boardsList: [],
   board: {
     name: '',
     background_url: '',
   }
  }),
  methods: {
   onCreate() {
    this.boardsList.push({name: this.board.name, background_url: this.board.background_url})
    this.board.background_url = ''
    this.board.name = ''
   }
  }
}
</script>

