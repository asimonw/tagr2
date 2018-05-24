<template>
  <div>
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
    <v-container>
      <v-layout row wrap>
        <v-flex sm12>
          <div class="text-xs-center">
            <template v-for="(tag, index) in person.tags">
              <v-chip :key="index" close>{{ tag }}</v-chip>
            </template>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  middleware: ['check-auth', 'auth'],
  asyncData (context) {
    return axios.get(`${process.env.baseURL}people/${context.params.id}.json`)
      .then(res => ({ person: res.data }))
  }
}
</script>
