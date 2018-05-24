<template>
  <v-toolbar dark>
    <v-toolbar-title>
      <nuxt-link to="/" class="link-unstyled">tagr</nuxt-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat @click="onLogout">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    onLogout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>


<style scoped>
.link-unstyled {
  text-decoration: none;
  color: white;
}
</style>
