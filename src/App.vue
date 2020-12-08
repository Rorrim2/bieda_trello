<template>
  <div id="app" class="w-100 h-100 p-0 m-0">
    <div class="bg-darker-primary">
      <b-navbar class="bg-darker-primary" toggleable="lg"  v-bind:class="isLoggedIn ? 'd-inline-flex' : ''"
                variant="primary">
        <b-navbar-brand href="/" class="flex-row p-0">
          <b-img width="80px" class="mr-2" src="./assets/racoon.png"/>
          <b-nav-text class="h1 text-white" v-text="`BiedaTrello`"/>
        </b-navbar-brand>
        <b-navbar-toggle v-if="!isLoggedIn" target="nav-collapse"></b-navbar-toggle>
        <b-collapse v-if="!isLoggedIn" id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-button-group>
              <b-button to="/login" class="btn btn-lg btn-primary ml-md-2 text-light"
                        style="text-decoration: none; 	box-shadow: 0px 0px 4px  #0a97b0;">Log in
              </b-button>
              <b-button to="/signup" class="btn btn-lg btn-light ml-md-2 text-primary"
                        style="text-decoration: none; 	box-shadow: 1px 1px 4px  #0a97b0;">Sign up
              </b-button>
            </b-button-group>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <UserNavBubble class="d-inline-flex float-right align-self-center mt-sm-2 pt-md-4 pt-lg-3 pt-4 pr-4" v-if="isLoggedIn" v-bind:user="user"
                     @logout="logout($event)"/>
    </div>
    <router-view class="h-100 pt-4"/>
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
