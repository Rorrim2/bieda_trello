<template>
  <div style="width: 15vw; margin: 3vw;">
    <b-card
        :title="list.name"
        style="max-width: 20rem; background-color: rgba(245,245,245, 0.3);"
        class="mb-2"
        text-variant="light"
    >
      <div v-for="card_s in list.listOfCards"><single-card :card="card_s"></single-card></div>

      <b-button @click="onCreateCard(list)" variant="secondary" style="margin: 1vw;" type="button">Add card</b-button>
    </b-card>
  </div>
</template>

<script>
import SingleCard from "@/components/SingleCard";
export default {
  props: ['list'],
  components: {
    SingleCard,
  },
  data: () => ({
    card: {
      text: '',
    },
  }),
  methods: {
    onCreateCard(list) {
      list.listOfCards.push({text: ""})
      console.log("Single list")
    }
  }
}
</script>

