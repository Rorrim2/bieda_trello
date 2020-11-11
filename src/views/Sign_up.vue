<template>
  <div class="sign py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <form id="c_form-h" class="" @submit="onSubmit">
            <div class="form-group row"> <label for="inputmailh" class="col-2 col-form-label text-white">E-mail</label>
              <div class="col-10">
                <input type="email" v-model="user.email" class="form-control" id="inputmailh" placeholder="mail@example.com"> </div>
            </div>
            <div class="form-group row"> <label for="inputmailh" class="col-2 col-form-label text-white">Login</label>
              <div class="col-10">
                <input type="text" v-model="user.login" class="form-control" id="inputlogin" placeholder="Login"> </div>
            </div>
            <div class="form-group row"> <label for="inputpasswordh" class="col-2 col-form-label text-white">Password</label>
              <div class="col-10">
                <input type="password" v-model="user.password" class="form-control" id="inputpasswordh" placeholder="Password"> </div>
            </div>
            <div class="form-group row" @submit.stop.prevent> <label for="inputpasswordh" class="col-2 col-form-label text-white">Repeat password</label>
              <div class="col-10">
                <input type="password" v-model="user.confirmPassword" :state="validation" class="form-control" id="inputrepeatpasswordh" placeholder="Repeat password">
                <b-form-invalid-feedback :state="validation">Repeated password is not the same</b-form-invalid-feedback>
                <b-form-valid-feedback :state="validation">Repeated password is the same</b-form-valid-feedback>
              </div>

            </div>
            <button type="submit" class="btn btn-secondary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sign_up",
  data: () => ({
    user: {
      email: '',
      login: '',
      password: '',
      confirmPassword: '',
    },
  }),
  computed: {
    validation() {
      return this.user.password === this.user.confirmPassword
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.user))
    },
  }
}
</script>

<style scoped>

</style>
