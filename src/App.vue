<template>
  <div id="app" class="bg-primary flex-fill h-100 " style="min-height: 100vw;">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary" style="	box-shadow: 0px 0px 4px primary;">
      <div class="container"> <a class="navbar-brand mr-5" href="/">
        <img class="img-fluid d-block rounded-circle float-left mr-2" src="./assets/racoon.png" width="100px">
        <b class="h1 mr-10 pr-5 mt-2 align-items-center d-inline-flex"><b class="text-center mr-5 my-2" style="">BiedaTrello</b></b>
      </a> <button class="navbar-toggler navbar-toggler-right border-0" type="button" data-toggle="collapse" data-target="#navbar11" style="">
        <span class="navbar-toggler-icon"></span>
      </button>
        <div class="collapse navbar-collapse ml-5 justify-content-end" id="navbar11">
          <a class="btn btn-primary navbar-btn ml-md-2 text-light btn-lg px-3 m-1 ml-5 mr-1" style="	box-shadow: 1px 1px 4px  #0a97b0;">
            <router-link to="/login"><b class="text-white">Log in</b></router-link>
          </a>
          <a class="btn navbar-btn ml-md-2 btn-light text-primary btn-lg m-1 mx-0 ml-5 px-3 text-center" style="	box-shadow: 0px 0px 4px  #0a97b0;">
            <router-link to="/signup"><b style="" class="text-primary"><b>Sign up</b></b></router-link>
          </a>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

