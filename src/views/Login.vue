<template>
  <div class="about py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 order-lg-2 order-2 align-self-center">
          <form class="form-inline" @submit="onSubmit">
            <div class="form-group">
              <input type="email" v-model="login.email" class="form-control" id="inputmailinline" placeholder="E-mail"> </div>
            <div class="form-group">
              <input type="password" v-model="login.password" class="form-control mx-2" id="inputpasswordinline" placeholder="Password"> </div>
            <button type="submit" class="btn text-white btn-secondary">Log in</button>
          </form>
        </div>
        <div class="col-lg-4 order-1 order-lg-1 p-0"> <img class="img-fluid d-block" src="../assets/welcome_back.png"></div>

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
