<template>
  <div style="width: 15vw; margin: 3vw;">
    <b-card
        :title="list.name"
        style="max-width: 20rem; background-color: rgba(245,245,245, 0.3);"
        class="mb-2"
        text-variant="light">
      <div v-for="card_s in list.listOfCards">
        <single-card :card="card_s"></single-card>
      </div>

      <b-button @click="onCreateCard(list)" variant="secondary"
                style="margin: 1vw;" type="button" v-text="`Add Card`" />
    </b-card>
  </div>
</template>

<script lang="ts">
import SingleCard from "@/components/SingleCard.vue";
import {Component, Prop, Vue} from "vue-property-decorator";
import {dummySingleCardModel, SingleCardModel, SingleListModel} from "@/data_models/types";

@Component({
  components: {
    SingleCard
  }
})
export default class SingleList extends Vue {
  @Prop() list!: SingleListModel;

  private card: SingleCardModel = dummySingleCardModel;

  onCreateCard(list: SingleListModel) {
    list.listOfCards.push({text: ""});
    console.log("single list");
  }
}

</script>

