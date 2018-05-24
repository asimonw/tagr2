import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      token: null
    },
    mutations: {
      setToken(state, token) {
        state.token = token
      },
      clearToken(state, token) {
        state.token = null
      }
    },
    actions: {
      authenticate(vuexContext, authData) {
        const authUrl =
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='
        return axios
          .post(authUrl + process.env.fbApiKey, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(result => {
            const tokenExpiration =
              new Date().getTime() +
              Number.parseInt(result.data.expiresIn) * 1000
            const token = result.data.idToken

            vuexContext.commit('setToken', token)
            Cookie.set('token', token)
            Cookie.set('tokenExpiration', tokenExpiration)
          })
          .catch(err => {
            throw Error(err)
          })
      },
      initAuth(vuexContext, req) {
        let token, tokenExpiration

        if (req) {
          // on the server
          if (!req.headers.cookie) {
            return
          }
          const jwtCookie = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('token='))
          if (!jwtCookie) {
            return
          }
          token = jwtCookie.split('=')[1]
          tokenExpiration = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('tokenExpiration='))
            .split('=')[1]
        } else {
          token = Cookie.get('token')
          tokenExpiration = Cookie.get('tokenExpiration')
        }

        if (!token || new Date().getTime() > +tokenExpiration) {
          vuexContext.dispatch('logout')
          return
        }
        vuexContext.commit('setToken', token)
      },
      logout(vuexContext) {
        console.log('times up!')
        vuexContext.commit('clearToken')
        Cookie.remove('token')
        Cookie.remove('tokenExpiration')
      }
    },
    getters: {
      isAuthenticated(state) {
        return state.token != null
      }
    }
  })
}

export default createStore
