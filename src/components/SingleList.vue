<template>
  <div style="width: 15vw; margin: 3vw;" @submit="onCreateCard">
    <b-card
        :title="list.name"
        style="max-width: 20rem;"
        class="mb-2"
        bg-variant="light"
    >
      <div v-for="card_s in list.listOfCards"><single-card :card="card_s"></single-card></div>
      <b-button variant="primary" style="margin: 1vw;" type="submit">Add card</b-button>
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
    onCreateCard() {
      list.listOfCards.push({name: this.card.text})
    }
  }
}
</script>

