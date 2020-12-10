<template>
  <div style="width: 15vw; margin: 3vw;">
    <b-card
        :title="listModel.title"
        style="max-width: 20rem; background-color: rgba(245,245,245, 0.3);"
        class="mb-2"
        text-variant="light">
      <div v-for="card_s in listModel.cards">
        <single-card :card="card_s"></single-card>
      </div>

      <b-button @click="onCreateCard($event)" variant="secondary"
                style="margin: 1vw;" type="button" v-text="`Add Card`" />
    </b-card>
  </div>
</template>

<script lang="ts">
import SingleCard from "@/components/SingleCard.vue";
import {Component, Prop, Vue} from "vue-property-decorator";
import {
  dummySingleCardModel,
  dummySingleListModel,
  SingleCardModel,
  SingleListModel,
  SingleListPreview
} from "@/data_models/types";
import {fetchList} from "@/utils";

@Component({
  components: {
    SingleCard
  },
  watch:{
    list:  {handler(val:SingleListPreview, oldVal: SingleListPreview) {
        (<SingleList>this).listChanged();
    }
  }}
})
export default class SingleList extends Vue {
  @Prop() list!: SingleListPreview;

  private listModel: SingleListModel = dummySingleListModel;
  private card: SingleCardModel = dummySingleCardModel;

  listChanged(){
    fetchList(this.list.id, data => {
      this.listModel = data;
    }, error => {
      console.log(error.message);
    })
  }
  onCreateCard(event:Event) {
    //list.listOfCards.push({text: ""});
    console.log("single list");
  }
}

</script>

