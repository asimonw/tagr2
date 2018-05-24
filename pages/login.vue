<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 sm8>
        <h1 class="display-1">Login</h1>
        <p v-if="loginFailed" class="red--text">Email and/or password are incorrect</p>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12 sm8>
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            name="email"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :append-icon="e1 ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (e1 = !e1)"
            :type="e1 ? 'password' : 'text'"
            name="password"
            label="Enter your password"
            required
            hint="At least 8 characters"
            min="8"
            counter
            autocomplete="new-password"
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            @click="submit"
          >
            submit
          </v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    loginFailed: false,
    valid: false,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length > 7 && v.length < 26) || 'Password must be between 8 and 25 characters'
    ],
    e1: true
  }),
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('authenticate', {
          email: this.email,
          password: this.password,
        })
          .then(() => {
            this.$router.push('/')
          })
          .catch(err => {
            this.loginFailed = true
          })
      }
    },
    clear () {
      this.$refs.form.reset()
      this.loginFailed = false
    }
  }
}
</script>