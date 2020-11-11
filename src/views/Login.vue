<template>
  <div class="about py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <form class="form-inline" @submit="onSubmit">
            <div class="form-group">
              <input type="email" v-model="login.email" class="form-control" id="inputmailinline" placeholder="E-mail"> </div>
            <div class="form-group">
              <input type="password" v-model="login.password" class="form-control mx-2" id="inputpasswordinline" placeholder="Password"> </div>
            <button type="submit" class="btn text-white btn-secondary">Log in</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    login: {
      email: '',
      password: '',
    },
  }),
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.login))
    },
  }
}
</script>
