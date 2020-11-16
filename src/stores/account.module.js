import {userService} from '../services/user.service'
import {router} from '../routes'

const user = JSON.parse(localStorage.getItem('user'))

const state = user
      ? { status: {loggedIn: true}, user}
      : { status: {}, user: null }

const mutations = {
      registerRequest(state){
            state.status = {registering: true}
      },
      registerSuccess(state){
            state.status = {}
      },
      registerFailure(state){
            state.status = {}
      }, // login
      loginRequest(state, user){
            state.status = { loggingIn : true }
            state.user = user
      },
      loginSuccess(state, user){
            state.status = { loggedIn : true }
            state.user = user
      },
      loginFailure(state){
            state.status = {}
            state.user = null
      }, // logout
      logout(state){
            state.status = {}
            state.user = null 
      }
}

const actions = {
      register({dispatch, commit}, user){
            commit('registerRequest')

            userService.register(user)
            .then(user => {
                  commit('registerSuccess')
                  setTimeout(() => {
                        dispatch('alert/success','Registration successful', {root: true})
                  }, 1000);
            })
            .catch(error => {
                  commit('registerFailure')
                  dispatch('alert/error', error.message, {root: true})
            })
      },
      
      login( { dispatch,commit }, { email, password }){
            commit('loginRequest', { email })
            userService.login(email, password)
            .then(user => {
                  commit('loginSuccess', user)
                  dispatch('alert/success','Login successful', {root: true})
                  router.push({ name : 'List' })
            })
            .catch(error =>{
                  commit('loginFailure') 
                  dispatch('alert/error', error.message, { root: true })
            })
      },

      logout({ commit }){
            userService.logout()
            commit('logout').then(this.$router.push('/'))
      }
}


export const account = {
      namespaced: true,
      state,
      mutations,
      actions
}