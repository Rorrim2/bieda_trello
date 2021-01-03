<template>
  <div id="app" class="h-100 flex-column d-flex"  >
    <div class="bg-darker-primary flex-row d-flex justify-content-between">
      <b-navbar class="w-100 bg-darker-primary flex-row d-flex justify-content-between my-0 py-0" toggleable="lg" v-bind:class="isLoggedIn ? 'd-inline-flex' : ''"
                variant="primary">
        <b-navbar-brand href="/" class="flex-row d-inline-flex my-auto my-xl-1 my-lg-1">
          <b-img width="50px" class="d-inline-flex align-top mr-2 mt-0 mb-0 p-0" src="./assets/racoon.png"/>
          <b-nav-text class="h2 align-self-center d-flex d-inline text-white p-0 m-0" v-text="`BiedaTrello`"/>
        </b-navbar-brand>
        <b-navbar-toggle v-if="!isLoggedIn" target="nav-collapse"></b-navbar-toggle>
        <b-collapse v-if="!isLoggedIn" id="nav-collapse" class="h-100 my-auto" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-button-group>
              <b-button  to="/login" class="btn btn-lg btn-primary ml-md-2 text-light"
                        style="text-decoration: none; 	box-shadow: 0px 0px 4px  #0a97b0;">Log in
              </b-button>
              <b-button to="/signup" class="btn btn-lg btn-light ml-md-2 text-primary"
                        style="text-decoration: none; 	box-shadow: 1px 1px 4px  #0a97b0;">Sign up
              </b-button>
            </b-button-group>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <div class="my-auto mr-3">
        <UserNavBubble class=""
                       v-if="isLoggedIn" v-bind:user="user"
                       @logout="logout($event)"
                       @ProfileChanged="changeProfile($event)"/>
      </div>
    </div>
    <router-view class="position-relative overflow-auto" />
  </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import {
  cacheRefreshToken,
  getToken,
  getTokenFromCache,
  logoutUser,
  parseJWT,
  refreshToken,
  setToken,
  verifyToken
} from "@/utils";
import {dummyUser, StorageDescriptor, User} from "@/data_models/types";
import dataBus from "@/databus";
import UserNavBubble from "@/components/UserNavBubble.vue";
import {getFromStorage, removeFromStorage, storeInStorage} from "@/store";

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
    let r_tkn = this ? getFromStorage('r_tkn', StorageDescriptor.local) : "";
    console.debug(((r_tkn || tkn) && this.user !== dummyUser))
    return ((r_tkn || tkn) && this.user !== dummyUser) as boolean;
  }

  load_user() {
    let item = getFromStorage("active_user", StorageDescriptor.local)
    if (!item || JSON.stringify(item) === '{}') {
      console.debug("item is empty");
      return;
    }
    this.user = <User>item ?? dummyUser;
  }

  logout(evt: Event) {
    const refreshTkn = getTokenFromCache();
    const component = this
    logoutUser(refreshTkn, (value) => {
      console.debug(`data from log out: ${value.success}`);
      component.clear();
      component.$router.push("/login");
    }, error => {
      console.log(error.graphQLErrors[0]);
    });
  }

  changeProfile(evt: Event) {
    const refreshTkn = getTokenFromCache();
    const component = this
    component.$router.push("/settings");
  }

  clear() {
    removeFromStorage("active_user", StorageDescriptor.local);
    removeFromStorage("u_tkn", StorageDescriptor.local);
    removeFromStorage("jti", StorageDescriptor.local);
    this.user = dummyUser;
    removeFromStorage("r_tkn", StorageDescriptor.local);
  }

  refresh() {
    const refreshTkn = getTokenFromCache();

    if (!refreshTkn || refreshTkn === '') {
      return;
    }
    console.debug(`refresh token from timer: ${refreshTkn}`);
    refreshToken(refreshTkn, (value) => {
      console.debug(value.token);
      console.debug(value.refreshToken);
      cacheRefreshToken(value.refreshToken);
      setToken(value.token);
      let payload = parseJWT(value.token);
      console.debug(payload.jti);
      storeInStorage("jti", payload.jti, StorageDescriptor.local);
      console.log(`jwt expires in ${payload.exp - Date.now() / 1000} seconds`)
      this.timer = window.setTimeout(this.refresh, payload.exp * 1000 - Date.now())
    }, (error) => {
      console.log(error.message);
      this.clear();

    })

  }

  created() {
    dataBus.$on('updateUser', () => {
      this.load_user();
    });
    this.load_user();
  }

  mounted() {
    verifyToken(getToken(), data => {
      console.log(`token expires in ${data.exp - Date.now() / 1000} seconds`);
      this.timer = window.setTimeout(this.refresh, data.exp * 1000 - Date.now());
    }, error => {
      console.log(error.message);
      console.log(error.graphQLErrors ?? [0]);
      this.refresh();
    })
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
