<template>
  <v-jumbotron height="240px">
    <v-container>
      <v-layout align-center>
        <v-flex text-xs-center>
          <v-avatar :size="128">
            <img :src="person.avatar" alt="Alex">
          </v-avatar>
          <h3 class="display-3">{{ person.name }}</h3>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
import axios from 'axios'

export default {
  asyncData (context) {
    return axios.get(`${process.env.baseURL}people/${context.params.id}.json`)
      .then(res => ({ person: res.data }))
  }
}
</script>
