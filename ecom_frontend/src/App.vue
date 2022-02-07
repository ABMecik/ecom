<template>
  <div id="app">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item"
          ><strong>ECOM</strong></router-link
        >

        <a
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-menu"
          @click="isMobile = !isMobile"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        class="navbar-menu"
        id="navbar-menu"
        v-bind:class="{ 'is-active': isMobile }"
      >
        <div class="navbar-start">
          <div class="navbar-item">
            <el-input
              placeholder="Type something"
              prefix-icon="el-icon-search"
              v-model="searchInput"
              @keyup.enter="search()"
            >
            </el-input>
          </div>

            <router-link v-for="category in $store.state.categories" :key="`categort~~${category.id}`" :to="{ name: 'Category', params: {id:category.id} }" class="navbar-item" style="color:#fff;">{{ category.name }}</router-link>


        </div>

        <div class="navbar-end">


              <template v-if="$store.state.isAuthenticated">
                  <div class="navbar-item">
                <router-link to="/Favorites" class="navbar-item" style="color:#fff;">
                    <span class="icon"><p>Favorites</p></span>
                </router-link>
                  </div>

                <div class="navbar-item">
                    <button class="button is-light" @click="logout">Logout</button>
                </div>
              </template>

              <template v-else>
                  <div class="navbar-item">
                <router-link to="/Login" class="button is-light">Log in</router-link>
                  </div>
              </template>

          </div>

      </div>
    </nav>

    <section class="section" v-loading="$store.state.isLoading">
      <keep-alive>
        <router-view :key="$route.path"></router-view>
      </keep-alive>
    </section>

    <footer class="footer">
      <p class="has-text-centered">Copyright (c) 2022</p>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import _ from "lodash";
export default {
  name: "app",
  data() {
        return {
            isMobile: true,
            activeIndex: "Home",
            isCollapse: true,
            searchInput: ''
        }
    },
    beforeCreate(){
        this.$store.commit('initializeStore');

        const token = this.$store.state.token

        if(token){
            axios.defaults.headers.common['Authorization'] = "Token " + token;
        }else{
            axios.defaults.headers.common['Authorization'] = "";
        }
    },
    methods: {
        search() {
            if(this.searchInput.length != 0){
                try {
                    this.$router.push({ name: 'Search', params: {'query':this.searchInput} });
                } catch (error) {
                    this.activeIndex = "Home";
                    this.$router.push({ name: "Home", params: {} });
                }
            }
        },
        logout(){
            axios.defaults.headers.common["Authorization"] = ""
            localStorage.removeItem("token")
            localStorage.removeItem("username")
            localStorage.removeItem("userid")
            this.$store.commit('removeToken')
            this.$router.push('/')
        }
  },
  created() {
    this.$store.commit("getAllCategories");
    console.log(this.$store.state);
  },
};
</script>

<style lang="scss">
@import "../node_modules/bulma";

.ddButton{
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    color: #fff;
}
</style>
