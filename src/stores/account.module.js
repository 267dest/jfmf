import {userService} from '../services/user.service'
import {router} from '../routes'
import { db } from "../firebase";
import firebase from 'firebase'
require('firebase/auth')

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
            db.collection('staffs').get().then(querySnapshot => {
                  querySnapshot.forEach(doc => {
                    if( doc.get('email') == email || doc.get('username') == email){
                          if(doc.get('username') == email){
                              email = doc.get('email')
                          }
                          commit('loginRequest', { email })
            userService.login(email, password)
            .then(user => {
                  commit('loginSuccess', user)
                  dispatch('alert/success','Login successful', {root: true}).then(function () {router.push("/list");})
            })
            .catch(error =>{
                  commit('loginFailure') 
                  dispatch('alert/error', error.message, { root: true })
            })
                          if(doc.get("deleted")){
                              firebase.auth().currentUser.delete()
                              doc.ref.delete()
                                 
                   }
                   
                  db.collection('staffs').doc(doc.get('username')).update({'status': true})
                          
                    }
                  })
                })
                      
               
            

            
            
      },

      logout({ commit }){
            db.collection('staffs').get().then(querySnapshot => {
                  querySnapshot.forEach(doc => {
                    if( doc.get('email') == user.email){
                          db.collection('staffs').doc(doc.get('username')).update({'status': false})
                           userService.logout()
                        commit('logout')
                    }
                  })
                }).then(function () {router.push("/")})
      },

      outto({ commit }){
            commit('logout')
      }
}


export const account = {
      namespaced: true,
      state,
      mutations,
      actions
}