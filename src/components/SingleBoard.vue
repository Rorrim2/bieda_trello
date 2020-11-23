<template>
  <div style="width: 15vw; margin: 3vw;">
    <b-card
        :title="board.name"
        :img-src="board.background_url"
        img-alt="Image"
        img-top
        style="max-width: 20rem;  background-color: rgba(245,245,245, 0.3);"
        class="mb-2"
    text-variant="light">
      <router-link to="/board"><b-button variant="primary" style="margin: 1vw;">Go to board</b-button></router-link>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ['board'],
};
</script>

