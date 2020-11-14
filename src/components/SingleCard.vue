<template>
<div><b-form-textarea
    id="textarea"
    v-model="text"
    placeholder="Enter something..."
    rows="3"
    max-rows="6"
></b-form-textarea></div>
</template>

<script>
export default {
  props: ['card'],
  data: () => ({
    text: '',
  }),
}
</script>

