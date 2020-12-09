<template>
  <div id="app" class="w-100 h-100 p-0 m-0">
    <div class="bg-darker-primary">
      <b-navbar class="bg-darker-primary" toggleable="lg" v-bind:class="isLoggedIn ? 'd-inline-flex' : ''"
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
      <UserNavBubble class="d-inline-flex float-right align-self-center mt-sm-2 pt-md-4 pt-lg-3 pt-4 pr-4"
                     v-if="isLoggedIn" v-bind:user="user"
                     @logout="logout($event)"/>
    </div>
    <router-view class="h-100 pt-4"/>
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
      console.debug(value);
      if (value.refreshToken) {
        cacheRefreshToken(value.refreshToken);
        setToken(value.token);
        let payload = parseJWT(value.token);
        storeInStorage("jti", payload.jti, StorageDescriptor.local);
        console.log(`jwt expires in ${payload.exp - Date.now() / 1000} seconds`)
        this.timer = window.setTimeout(this.refresh, payload.exp*1000 - Date.now())
      }
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
      this.timer = window.setTimeout(this.refresh, data.exp*1000 - Date.now());
    }, error => {
      console.log(error.message);
      console.log(error.graphQLErrors??[0]);
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
