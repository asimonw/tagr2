<template>
  <v-app>
    <Toolbar />
    <nuxt />
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar'

export default {
  components: {
    Toolbar
  },
  data () {
    return {}
  }
}
</script>
