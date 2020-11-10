<template>
  <div class="py-5 w-100 h-75 bg-primary" style="">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 d-flex flex-column align-items-start justify-content-center order-1 order-lg-1">
          <h1 class="text-white text-left">Start being organized</h1>
          <p class="mb-3 text-white pr-3">With our boards you can plan your day, week, month or whole life! No more procrastinating, start being productive today.</p>
        </div>
        <div class="col-lg-8 order-2 order-lg-2 p-0 h-100"> <img class="img-fluid d-block"  style="	border-radius: 20px;	box-shadow: 2px 2px 4px  #0a97b0;" src="../assets/home.jpg"> </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})

export default class Home extends Vue {}
</script>
