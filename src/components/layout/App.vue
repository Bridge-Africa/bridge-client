<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <router-link :to="{name: 'home'}" is="b-navbar-brand">Bridge Shop</router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#" @click.prevent="changeLang('en')" :active="$i18n.locale === 'en'">
              <img src="static/img/lang/en.png" alt="En"> EN
            </b-dropdown-item>
            <b-dropdown-item href="#" @click.prevent="changeLang('fr')" :active="$i18n.locale === 'fr'">
              <img src="static/img/lang/fr.png" alt="Fr"> FR
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em v-if="loggedIn">{{ username }}</em>
              <em v-else>Guest</em>
            </template>
            <b-dropdown-item v-if="loggedIn" @click="logout" href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <transition name="slide-fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Auth',
  data () {
    return {}
  },
  methods: {
    changeLang (lang) {
      this.setLanguage(lang)
    },
    logout () {
      this.$authService.logout()
    }
  },
  computed: {
    ...mapGetters({
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      username: 'Auth/getUsername',
      loggedIn: 'Auth/loggedIn'
    })
  },
  mounted () {
  }
}
</script>

<style>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */
  {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
