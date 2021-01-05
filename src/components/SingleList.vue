<template>
    <b-card
        :title="listModel.title"
        style="background-color: rgba(245,245,245, 0.3);"
        text-variant="light">
      <div class="card-body">
      <div v-for="card_s in listModel.cards">
        <single-card :card="card_s"></single-card>
      </div>

      <b-button @click="onCreateCard($event)" variant="secondary"
                style="margin: 1vw;" type="button" v-text="`Add Card`" />
      </div>
    </b-card>
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
  mounted(){
    this.listChanged();
  }
  listChanged(){
    fetchList(this.list.id, data => {
      this.listModel = data;
      console.debug("jabadabadu");
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

