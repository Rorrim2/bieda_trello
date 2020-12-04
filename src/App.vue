<template>
  <div id="app" class="bg-primary flex-fill h-100 " style="min-height: 100vw;">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary" style="	box-shadow: 0px 0px 4px primary;">
      <div class="container-fluid">
        <a class="navbar-brand float-left ml-0 mr-5" href="/">
          <img class="img-fluid d-block rounded-circle float-left mr-2" src="./assets/racoon.png" width="100px">
          <b class="h1 mr-10 pr-5 mt-2 align-items-center d-inline-flex"><b class="text-center mr-5 my-2" style="">BiedaTrello</b></b>
        </a>
        <button class="navbar-toggler navbar-toggler-right border-0" type="button" data-toggle="collapse"
                data-target="#navbar11" style="">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse ml-5 justify-content-end" id="navbar11">
          <router-link to="/login" v-if="!isLoggedIn">
            <b class="text-white">
              <a class="btn btn-primary navbar-btn ml-md-2 text-light btn-lg px-3 m-1 ml-5 mr-1"
                 style="	box-shadow: 1px 1px 4px  #0a97b0;">
                Log in
              </a>
            </b>
          </router-link>
          <router-link style="text-decoration: none" to="/signup" v-if="!isLoggedIn">
            <b style="text-decoration: none" class="text-primary">
              <b>
                <a class="btn navbar-btn ml-md-2 btn-light text-primary btn-lg m-1 mx-0 ml-5 px-3 text-center"
                   style="text-decoration: none; 	box-shadow: 0px 0px 4px  #0a97b0;">
                  Sign up
                </a>
              </b>
            </b>
          </router-link>
          <UserNavBubble v-if="isLoggedIn" v-bind:user="user"></UserNavBubble>

        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import {cacheRefreshToken, getFromLocalStorage, getTokenFromCache, logoutUser, refreshToken} from "@/utils";
import {getToken, setToken} from "@/main";
import {dummyUser, Tokens, User} from "@/data_models/types";
import UserBubble from "@/components/UserBubble.vue";
import dataBus from "@/databus";
import UserNavBubble from "@/components/UserNavBubble.vue";


@Component({
  components: {UserNavBubble}
})
export default class App extends Vue {

  private timer: number = 0;
  private user: User = dummyUser;

  get isLoggedIn(): boolean {
    if (this.user === dummyUser) {
      this.load_user();
    }
    let tkn = getToken();
    let r_tkn = this ? getFromLocalStorage('r_tkn') : "";
    console.debug(((r_tkn || tkn) && this.user !== dummyUser))
    return ((r_tkn || tkn) && this.user !== dummyUser) as boolean;
  }

  load_user() {
    let item = getFromLocalStorage("active_user")
    if (!item || JSON.stringify(item) === '{}') {
      console.debug("item is empty");
      return;
    }
    this.user = <User>item ?? dummyUser;
  }

  logout(evt: Event) {
    const refreshTkn = getTokenFromCache();
    const component = this
    logoutUser(refreshTkn, (value: any) => {
      console.debug(`data from log out: ${value}`);
      localStorage.removeItem("active_user");
      setToken("");
      component.user = dummyUser;
      localStorage.removeItem("r_tkn");
      component.$router.push("/login");
    });
  }

  checkToken() {
    let tok = getToken()
    console.debug('======= check whether token is empty/null =======')
    if (!tok || tok === "") {
      const refreshTkn = getTokenFromCache();

      if (!refreshTkn || refreshTkn === '') {
        return;
      }
      console.debug(`refresh token from timer: ${refreshTkn}`);
      refreshToken(refreshTkn, (value: Tokens) => {
        console.debug(value);
        if (value.refreshToken) {
          cacheRefreshToken(value.refreshToken);
          setToken(value.token);
        }
      })
    }
  }

  created() {
    dataBus.$on('updateUser', () => {
      this.load_user();
    });
    this.load_user();
  }

  mounted() {
    this.timer = window.setInterval(this.checkToken, 1000);
  }
}

</script>
<style scoped>
li a {
  text-decoration: none;
}

span {
  text-decoration: none;
}
</style>
