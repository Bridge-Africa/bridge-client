<template>
  <div>
    <b-jumbotron>
      <template #header>Bridge Shop</template>

      <template #lead>
        {{ $t('message.hero_title') }}
      </template>

      <hr class="my-4">

      <p>
        {{ $t('message.hero_subtitle') }}
      </p>
      <span v-if="!loggedIn">
        <b-button variant="primary" :to="{name: 'login'}" href="#">{{ $t('button.sign_in') }}</b-button>
        <b-button variant="success" :to="{name: 'register'}" href="#">{{ $t('login.register') }}</b-button>
        <hr>
      </span>

      <b-button v-if="loggedIn" variant="info" :to="{name: 'articles'}" href="#">Visit Articles</b-button>
    </b-jumbotron>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: 'Home',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      username: 'Auth/getUsername',
      loggedIn: 'Auth/loggedIn'
    })
  },
  methods: {},
  mounted () {
  }
}
</script>

<style scoped>

</style>
