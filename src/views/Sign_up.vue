<template>
  <div class="sign py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <form id="c_form-h" class="">
            <div class="form-group row"> <label for="inputmailh" class="col-2 col-form-label text-white">E-mail</label>
              <div class="col-10">
                <input type="email" class="form-control" id="inputmailh" placeholder="mail@example.com"> </div>
            </div>
            <div class="form-group row"> <label for="inputmailh" class="col-2 col-form-label text-white">Login</label>
              <div class="col-10">
                <input type="email" class="form-control" id="inputlogin" placeholder="Login"> </div>
            </div>
            <div class="form-group row"> <label for="inputpasswordh" class="col-2 col-form-label text-white">Password</label>
              <div class="col-10">
                <input type="password" class="form-control" id="inputpasswordh" placeholder="Password"> </div>
            </div>
            <div class="form-group row"> <label for="inputpasswordh" class="col-2 col-form-label text-white">Repeat password</label>
              <div class="col-10">
                <input type="password" class="form-control" id="inputrepeatpasswordh" placeholder="Repeat password"> </div>
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
name: "Sign_in"
}
</script>

<style scoped>

</style>
