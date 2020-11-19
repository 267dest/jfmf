import firebase from 'firebase'
require('firebase/auth')

function login(email, password) {
      return firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
            localStorage
            .setItem('user', JSON.stringify(data.user))
            return data.user
      })
}

function logout() {
      localStorage.removeItem('user')
}

function register(user){
      if(user.email == firebase.auth().currentUser.email){
            return firebase.auth()
            .currentUser.updatePassword(user.password)
      }
      return firebase.auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(data => {
            data.user.updateProfile({
                  uid: user.username
            })
            return data.user
      })
}

export const userService = {
      login,
      logout,
      register
}