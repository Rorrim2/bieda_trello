<template>
  <div class="bg-primary flex-column my-auto d-flex overflow-y">
    <b-container   class="mx-auto align-self-center flex-row d-flex
                          justify-content-between  bv-example-row">
      <b-row align-v="center" class="flex-row my-3">
        <b-col xl="3" sm="12" lg="4" order="1" order-lg="1" >
          <h1 class="text-white text-left">Start being organized</h1>
          <p class="mb-3 text-white pr-3">With our boards you can plan your day, week,
            month or whole life! No more procrastinating, start being productive today.</p>
        </b-col>
        <b-col :col="true" sm="*" xl="*" md="*" align-self="center"
               lg="*" order-lg="2" order="2" class="p-0 mx-2">
          <b-img fluid-grow class="d-block"
               style="border-radius: 2vw;box-shadow: 2px 2px 4px #0a97b0;"
               src="../assets/home.jpg"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})

export default class Home extends Vue {
}
</script>
