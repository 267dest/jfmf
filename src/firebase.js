import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyDJA2psldSO_Xj_5tb35WFNOjRtMg9BCIk",
  authDomain: "saproject-10f28.firebaseapp.com",
  databaseURL: "https://saproject-10f28.firebaseio.com",
  projectId: "saproject-10f28",
  storageBucket: "saproject-10f28.appspot.com",
  messagingSenderId: "182007809670",
  appId: "1:182007809670:web:92658b33f4c1d16197b307"
}

const app = firebase.initializeApp(firebaseConfig)

export const db = app.firestore()
export const productCol = db.collection("products")
export const orderCol= db.collection("orders")
export const deliveryCol = db.collection("delivery_orders")
export const staffCol = db.collection("staff")
export const customerCol = db.collection("customers")
