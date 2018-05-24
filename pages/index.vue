<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-list v-if="people">
        <template v-for="person in people">
          <v-list-tile :key="person.id" avatar @click.prevent="onClickPerson(person.id)">
            <v-list-tile-avatar>
              <img :src="person.avatar" alt="person.name">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{person.name}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  middleware: ['check-auth', 'auth'],
  asyncData (context) {
    return axios.get(`${process.env.baseURL}people.json`)
      .then(res => {
        const data = Object.keys(res.data).reduce(
          (acc, key) => {
            acc.push({ ...res.data[key], id: key })
            return acc
          }, []
        )
        return { people: data }
      })
      .catch(err => ({ people: null }))
  },
  methods: {
    onClickPerson (id) {
      this.$router.push({ name: 'person-id', params: { id } })
    }
  }
}
</script>
