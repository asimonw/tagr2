<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-list>
        <template v-for="person in people">
          <v-list-tile :key="person.id" avatar @click.prevent="onClickPerson(person.id)">
            <v-list-tile-avatar>
              <!-- <img :src="person.avatar" alt="person.name"> -->
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
export default {
  data () {
    return {
      people: [
        {
          id: 1,
          avatar: '/img/alex.jpg',
          name: 'Alex'
        },
        {
          id: 2,
          avatar: '/img/fanny.png',
          name: 'Fanny'
        }
      ]
    }
  },
  methods: {
    onClickPerson (id) {
      this.$router.push({ name: 'person-id', params: { id } })
    }
  }
}
</script>
